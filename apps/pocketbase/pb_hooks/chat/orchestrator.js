var portfolio = require(__hooks + "/chat/portfolio_context.js");
var zizka = require(__hooks + "/chat/zizkadb.js");
var llm = require(__hooks + "/chat/llm.js");
var moderation = require(__hooks + "/chat/moderation.js");
var retrieval = require(__hooks + "/chat/retrieval.js");
var learning = require(__hooks + "/chat/learning.js");

var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validateSessionId(sessionId) {
  return sessionId && UUID_RE.test(String(sessionId));
}

function validateMessage(message) {
  if (!message || typeof message !== "string") {
    return { ok: false, error: "message is required" };
  }
  var trimmed = message.trim();
  if (!trimmed.length) {
    return { ok: false, error: "message cannot be empty" };
  }
  if (trimmed.length > 2000) {
    return { ok: false, error: "message exceeds 2000 characters" };
  }
  return { ok: true, message: trimmed };
}

function eventsToHistory(events) {
  var history = [];
  if (!events || !events.length) {
    return history;
  }
  var sorted = events.slice().sort(function (a, b) {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  for (var i = 0; i < sorted.length; i++) {
    var ev = sorted[i];
    if (ev.event === "user_message" && ev.data && ev.data.text) {
      history.push({ role: "user", content: ev.data.text });
    } else if (ev.event === "llm_response" && ev.data && ev.data.text) {
      history.push({ role: "assistant", content: ev.data.text });
    }
  }
  return history.slice(-12);
}

function handleTurn(sessionId, message) {
  var start = Date.now();
  var validation = validateMessage(message);
  if (!validation.ok) {
    return { ok: false, status: 400, code: "INVALID_REQUEST", error: validation.error };
  }
  if (!validateSessionId(sessionId)) {
    return { ok: false, status: 400, code: "INVALID_REQUEST", error: "invalid sessionId" };
  }

  var agent = zizka.agentId(sessionId);
  var userText = validation.message;

  var mod = moderation.classifyMessage(userText);
  if (mod.shortCircuit && mod.reply) {
    var quickUserEvent = zizka.logEvent(agent, "user_message", { text: userText }, null, sessionId);
    var quickAssistantEvent = zizka.logEvent(
      agent,
      "llm_response",
      { text: mod.reply, simulated: true, model: "moderation", moderation_type: mod.type },
      quickUserEvent ? quickUserEvent.event_id : null,
      sessionId
    );
    return {
      ok: true,
      status: 200,
      reply: mod.reply,
      sessionId: sessionId,
      messageId: quickAssistantEvent ? quickAssistantEvent.event_id : null,
      parentEventId: quickUserEvent ? quickUserEvent.event_id : null,
      simulated: true,
      zizkaEnabled: zizka.isConfigured(),
      llmEnabled: llm.isConfigured(),
      latencyMs: Date.now() - start,
    };
  }

  var userEvent = zizka.logEvent(agent, "user_message", { text: userText }, null, sessionId);

  var memory = retrieval.gatherMemory(zizka, agent, userText, sessionId);
  var priorEvents = zizka.queryEvents(agent, 24, sessionId);
  var history = eventsToHistory(priorEvents);

  var systemPrompt = portfolio.portfolioSystemPrompt();
  var llmResult = llm.chatCompletion(systemPrompt, userText, memory.context, history);

  var assistantEvent = zizka.logEvent(
    agent,
    "llm_response",
    {
      text: llmResult.reply,
      simulated: llmResult.simulated || false,
      model: llm.isConfigured() ? llm.model() : "fallback",
      provider: llmResult.provider || "none",
      retrieval_queries: memory.queriesUsed,
      retrieval_chunks: memory.chunkCount,
    },
    userEvent ? userEvent.event_id : null,
    sessionId
  );

  var learnedEvent = null;
  if (!llmResult.simulated && llmResult.ok !== false) {
    learnedEvent = learning.recordLearnedQA(
      agent,
      userText,
      llmResult.reply,
      sessionId,
      assistantEvent ? assistantEvent.event_id : null
    );
  }

  return {
    ok: true,
    status: 200,
    reply: llmResult.reply,
    sessionId: sessionId,
    messageId: assistantEvent ? assistantEvent.event_id : null,
    parentEventId: userEvent ? userEvent.event_id : null,
    simulated: llmResult.simulated || false,
    zizkaEnabled: zizka.isConfigured(),
    llmEnabled: llm.isConfigured(),
    llmProvider: llmResult.provider || llm.provider(),
    learned: !!learnedEvent,
    latencyMs: Date.now() - start,
  };
}

function getHistory(sessionId, limit) {
  if (!validateSessionId(sessionId)) {
    return { ok: false, status: 400, error: "invalid sessionId" };
  }
  var agent = zizka.agentId(sessionId);
  var events = zizka.queryEvents(agent, limit || 20, sessionId);
  var messages = [];
  var sorted = events.slice().sort(function (a, b) {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  for (var i = 0; i < sorted.length; i++) {
    var ev = sorted[i];
    if (ev.event === "user_message" && ev.data && ev.data.text) {
      messages.push({
        id: ev.event_id,
        role: "user",
        content: ev.data.text,
        timestamp: ev.timestamp,
      });
    } else if (ev.event === "llm_response" && ev.data && ev.data.text) {
      messages.push({
        id: ev.event_id,
        role: "assistant",
        content: ev.data.text,
        timestamp: ev.timestamp,
      });
    }
  }
  return { ok: true, status: 200, sessionId: sessionId, messages: messages };
}

module.exports = {
  handleTurn: handleTurn,
  getHistory: getHistory,
};
