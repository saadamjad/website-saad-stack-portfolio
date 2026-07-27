var portfolio = require(__hooks + "/chat/portfolio_context.js");

function parseBody(response) {
  if (response.json) {
    return response.json;
  }
  if (!response.body) {
    return null;
  }
  if (typeof response.body === "string") {
    return JSON.parse(response.body);
  }
  var str = String.fromCharCode.apply(null, response.body);
  return JSON.parse(str);
}

function openaiKey() {
  return $os.getenv("OPENAI_API_KEY") || "";
}

function anthropicKey() {
  return $os.getenv("ANTHROPIC_API_KEY") || "";
}

// Trust env-var presence, not key content — pattern-sniffing the key format
// (e.g. requiring a "sk-" prefix) silently disables the LLM if a provider
// ever changes its key format, with no error, just a quiet fallback to the
// other provider or to "none". An explicit CHAT_LLM_PROVIDER override takes
// precedence when both keys happen to be set.
function provider() {
  var forced = ($os.getenv("CHAT_LLM_PROVIDER") || "").toLowerCase();
  if (forced === "openai" && openaiKey().length > 0) {
    return "openai";
  }
  if (forced === "anthropic" && anthropicKey().length > 0) {
    return "anthropic";
  }
  if (openaiKey().length > 0) {
    return "openai";
  }
  if (anthropicKey().length > 0) {
    return "anthropic";
  }
  return "none";
}

function isConfigured() {
  return provider() !== "none";
}

function model() {
  if (provider() === "anthropic") {
    return $os.getenv("ANTHROPIC_MODEL") || "claude-haiku-4-5";
  }
  return $os.getenv("OPENAI_MODEL") || "gpt-4o-mini";
}

function parseOpenAI(res) {
  var parsed = parseBody(res);
  if (res.statusCode === 200 && parsed && parsed.choices && parsed.choices.length) {
    return parsed.choices[0].message.content || "";
  }
  return null;
}

function parseAnthropic(res) {
  var parsed = parseBody(res);
  if (res.statusCode === 200 && parsed && parsed.content && parsed.content.length) {
    for (var i = 0; i < parsed.content.length; i++) {
      if (parsed.content[i].type === "text") {
        return parsed.content[i].text || "";
      }
    }
  }
  return null;
}

// Single request-building/sending path shared by complete() and
// chatCompletion() — previously each had its own separate copy of this logic
// with slightly different literal defaults (0.5 vs 0.55 temperature), a DRY
// violation that would silently drift further if only one copy was updated.
function sendToProvider(messages, maxTokens, temperature) {
  var prov = provider();
  if (prov === "none") {
    return { reply: null, provider: prov, statusCode: null };
  }

  if (prov === "openai") {
    var res = $http.send({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers: {
        Authorization: "Bearer " + openaiKey(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model(),
        messages: messages,
        max_tokens: maxTokens,
        temperature: temperature,
      }),
      timeout: 45,
    });
    return { reply: parseOpenAI(res), provider: prov, statusCode: res.statusCode };
  }

  var sysParts = [];
  var convo = [];
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].role === "system") {
      sysParts.push(messages[i].content);
    } else {
      convo.push(messages[i]);
    }
  }
  var ares = $http.send({
    url: "https://api.anthropic.com/v1/messages",
    method: "POST",
    headers: {
      "x-api-key": anthropicKey(),
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model(),
      max_tokens: maxTokens,
      system: sysParts.join("\n\n"),
      messages: convo,
      temperature: temperature,
    }),
    timeout: 45,
  });
  return { reply: parseAnthropic(ares), provider: prov, statusCode: ares.statusCode };
}

function complete(systemPrompt, userMessage, maxTokens, temperature) {
  if (!isConfigured()) {
    return null;
  }
  var result = sendToProvider(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    maxTokens || 900,
    temperature != null ? temperature : 0.5
  );
  return result.reply;
}

function healthCheck() {
  if (!isConfigured()) {
    return { status: "not_configured", provider: "none", model: null };
  }
  var prov = provider();
  var mdl = model();
  try {
    var reply = complete("Reply with exactly one word: ok", "ping", 10, 0);
    if (reply) {
      return { status: "ok", provider: prov, model: mdl };
    }
    $app.logger().warn("LLM health check unreachable", "provider", prov, "model", mdl);
    return { status: "unreachable", provider: prov, model: mdl };
  } catch (err) {
    $app.logger().warn("LLM health check error", "provider", prov, "model", mdl, "error", String(err));
    return { status: "unreachable", provider: prov, model: mdl, error: String(err) };
  }
}

// Rough char-based token budgeting (~4 chars/token). Caps both context-window
// risk and per-request cost from a large retrieved memory blob or a long
// history — neither was previously bounded once memory/history reached the
// real LLM call (only the *fallback* reply path had a length cap).
var MAX_MEMORY_CHARS = 6000;
var MAX_HISTORY_CHARS = 6000;

function capMemoryContext(memoryContext) {
  if (!memoryContext || memoryContext.length <= MAX_MEMORY_CHARS) {
    return memoryContext;
  }
  return memoryContext.substring(0, MAX_MEMORY_CHARS) + "\n...(truncated)";
}

// Keeps the most recent turns that fit within the char budget, dropping the
// oldest first — never truncates a message mid-sentence.
function capHistory(history) {
  if (!history || !history.length) {
    return [];
  }
  var kept = [];
  var used = 0;
  for (var i = history.length - 1; i >= 0; i--) {
    var len = (history[i].content || "").length;
    if (used + len > MAX_HISTORY_CHARS && kept.length > 0) {
      break;
    }
    kept.unshift(history[i]);
    used += len;
  }
  return kept;
}

function chatCompletion(systemPrompt, userMessage, memoryContext, history) {
  if (!isConfigured()) {
    $app.logger().warn("Chat fallback", "code", "LLM_NOT_CONFIGURED");
    return {
      ok: false,
      code: "LLM_NOT_CONFIGURED",
      reply: portfolio.portfolioFallbackReply(userMessage, memoryContext),
      simulated: true,
      provider: "none",
    };
  }

  var cappedMemory = capMemoryContext(memoryContext);
  var cappedHistory = capHistory(history);

  var messages = [{ role: "system", content: systemPrompt }];
  if (cappedMemory) {
    messages.push({
      role: "system",
      content: "Relevant knowledge from Saad's memory (prioritize these facts):\n" + cappedMemory,
    });
  }

  if (cappedHistory && cappedHistory.length) {
    for (var i = 0; i < cappedHistory.length; i++) {
      var h = cappedHistory[i];
      if (h.role === "user" || h.role === "assistant") {
        messages.push({ role: h.role, content: h.content });
      }
    }
  }

  messages.push({ role: "user", content: userMessage });

  try {
    var result = sendToProvider(messages, 900, 0.55);

    if (result.reply) {
      return {
        ok: true,
        reply: result.reply,
        simulated: false,
        provider: result.provider,
      };
    }

    $app.logger().error(
      "Chat fallback",
      "code",
      "LLM_UNAVAILABLE",
      "provider",
      result.provider,
      "status",
      result.statusCode
    );
    return {
      ok: false,
      code: "LLM_UNAVAILABLE",
      reply: portfolio.portfolioFallbackReply(userMessage, memoryContext),
      simulated: true,
      provider: result.provider,
    };
  } catch (err) {
    $app.logger().error("Chat fallback", "code", "LLM_UNAVAILABLE", "provider", provider(), "error", String(err));
    return {
      ok: false,
      code: "LLM_UNAVAILABLE",
      reply: portfolio.portfolioFallbackReply(userMessage, memoryContext),
      simulated: true,
      provider: provider(),
    };
  }
}

module.exports = {
  isConfigured: isConfigured,
  provider: provider,
  model: model,
  healthCheck: healthCheck,
  chatCompletion: chatCompletion,
};
