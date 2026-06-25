var portfolio = require(__hooks + "/chat/portfolio_context.js");
var zizka = require(__hooks + "/chat/zizkadb.js");

function openaiKey() {
  return $os.getenv("OPENAI_API_KEY") || "";
}

function anthropicKey() {
  return $os.getenv("ANTHROPIC_API_KEY") || "";
}

function provider() {
  var ok = openaiKey();
  if (ok.length > 10 && ok.indexOf("sk-") === 0) {
    return "openai";
  }
  var ak = anthropicKey();
  if (ak.length > 10) {
    return "anthropic";
  }
  return "none";
}

function isConfigured() {
  return provider() !== "none";
}

function model() {
  if (provider() === "anthropic") {
    return $os.getenv("ANTHROPIC_MODEL") || "claude-3-5-haiku-20241022";
  }
  return $os.getenv("OPENAI_MODEL") || "gpt-4o-mini";
}

function parseOpenAI(res) {
  var parsed = zizka.parseBody(res);
  if (res.statusCode === 200 && parsed && parsed.choices && parsed.choices.length) {
    return parsed.choices[0].message.content || "";
  }
  return null;
}

function parseAnthropic(res) {
  var parsed = zizka.parseBody(res);
  if (res.statusCode === 200 && parsed && parsed.content && parsed.content.length) {
    for (var i = 0; i < parsed.content.length; i++) {
      if (parsed.content[i].type === "text") {
        return parsed.content[i].text || "";
      }
    }
  }
  return null;
}

function complete(systemPrompt, userMessage, maxTokens, temperature) {
  var prov = provider();
  if (prov === "none") {
    return null;
  }

  if (prov === "openai") {
    var ores = $http.send({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers: {
        Authorization: "Bearer " + openaiKey(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model(),
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: maxTokens || 900,
        temperature: temperature != null ? temperature : 0.5,
      }),
      timeout: 45,
    });
    return parseOpenAI(ores);
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
      max_tokens: maxTokens || 900,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
      temperature: temperature != null ? temperature : 0.5,
    }),
    timeout: 45,
  });
  return parseAnthropic(ares);
}

function rewriteForSearch(userMessage) {
  if (!isConfigured()) {
    return null;
  }
  try {
    var text = complete(
      "You help search a knowledge base about Saad Amjad (Senior Full-Stack / React Native engineer, Pakistan, Washmen Dubai).\n" +
        "Rewrite the user's message into 1-2 short search queries that would find relevant facts about Saad.\n" +
        "Include synonyms (e.g. job=career, uni=education, stack=skills, trip=countries visited).\n" +
        "Output ONLY the search queries, one per line. No numbering, no explanation.",
      userMessage,
      120,
      0.1
    );
    return text ? text.trim() : null;
  } catch (err) {
    $app.logger().warn("Query rewrite failed", "error", String(err));
    return null;
  }
}

function chatCompletion(systemPrompt, userMessage, memoryContext, history) {
  if (!isConfigured()) {
    return {
      ok: false,
      code: "LLM_NOT_CONFIGURED",
      reply: portfolio.portfolioFallbackReply(userMessage, memoryContext),
      simulated: true,
      provider: "none",
    };
  }

  var messages = [{ role: "system", content: systemPrompt }];
  if (memoryContext) {
    messages.push({
      role: "system",
      content:
        "Relevant knowledge from Saad's memory (prioritize these facts; includes auto-learned Q&A):\n" +
        memoryContext,
    });
  }

  if (history && history.length) {
    for (var i = 0; i < history.length; i++) {
      var h = history[i];
      if (h.role === "user" || h.role === "assistant") {
        messages.push({ role: h.role, content: h.content });
      }
    }
  }

  messages.push({ role: "user", content: userMessage });

  try {
    var prov = provider();
    var reply = null;

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
          max_tokens: 900,
          temperature: 0.55,
        }),
        timeout: 45,
      });
      reply = parseOpenAI(res);
      if (!reply) {
        $app.logger().error("OpenAI error", "status", res.statusCode);
      }
    } else {
      var sysParts = [];
      for (var m = 0; m < messages.length; m++) {
        if (messages[m].role === "system") {
          sysParts.push(messages[m].content);
        }
      }
      var convo = [];
      for (var c = 0; c < messages.length; c++) {
        if (messages[c].role === "user" || messages[c].role === "assistant") {
          convo.push(messages[c]);
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
          max_tokens: 900,
          system: sysParts.join("\n\n"),
          messages: convo,
          temperature: 0.55,
        }),
        timeout: 45,
      });
      reply = parseAnthropic(ares);
      if (!reply) {
        $app.logger().error("Anthropic error", "status", ares.statusCode);
      }
    }

    if (reply) {
      return {
        ok: true,
        reply: reply,
        simulated: false,
        provider: prov,
      };
    }

    return {
      ok: false,
      code: "LLM_UNAVAILABLE",
      reply: portfolio.portfolioFallbackReply(userMessage, memoryContext),
      simulated: true,
      provider: prov,
    };
  } catch (err) {
    $app.logger().error("LLM request failed", "error", String(err));
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
  rewriteForSearch: rewriteForSearch,
  chatCompletion: chatCompletion,
};
