/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/chat/health", (e) => {
  try {
    var llm = require(__hooks + "/chat/llm.js");
    var llmHealth = llm.healthCheck();
    return e.json(200, {
      ok: true,
      llm: llmHealth.status,
      llmProvider: llmHealth.provider,
      llmModel: llmHealth.model,
    });
  } catch (err) {
    return e.json(500, { ok: false, code: "INTERNAL_ERROR", error: String(err) });
  }
});

routerAdd("POST", "/chat", (e) => {
  try {
    var chat = require(__hooks + "/chat/orchestrator.js");
    var rateLimit = require(__hooks + "/chat/rate_limit.js");
    var body = e.requestInfo().body || {};
    var sessionId = body.sessionId || body.session_id || "";
    var message = body.message || "";

    var limited = rateLimit.check(sessionId, e.realIP());
    if (!limited.ok) {
      return e.json(429, { ok: false, code: "RATE_LIMITED", error: "Too many messages — please slow down." });
    }

    var result = chat.handleTurn(sessionId, message);
    if (!result.ok) {
      return e.json(result.status || 400, {
        ok: false,
        code: result.code || "INVALID_REQUEST",
        error: result.error,
      });
    }

    return e.json(200, {
      ok: true,
      reply: result.reply,
      sessionId: result.sessionId,
      messageId: result.messageId,
      parentMessageId: result.parentMessageId,
      simulated: result.simulated,
      fallbackReason: result.fallbackReason,
      llmEnabled: result.llmEnabled,
      llmProvider: result.llmProvider,
      latencyMs: result.latencyMs,
    });
  } catch (err) {
    return e.json(500, { ok: false, code: "INTERNAL_ERROR", error: String(err) });
  }
});

routerAdd("GET", "/chat/history", (e) => {
  try {
    var chat = require(__hooks + "/chat/orchestrator.js");
    var sessionId = e.requestInfo().query.sessionId || e.requestInfo().query.session_id || "";
    var limit = parseInt(e.requestInfo().query.limit || "20", 10);
    var result = chat.getHistory(sessionId, limit);

    if (!result.ok) {
      return e.json(result.status || 400, { ok: false, code: result.code || "INVALID_REQUEST", error: result.error });
    }

    return e.json(200, {
      ok: true,
      sessionId: result.sessionId,
      messages: result.messages,
    });
  } catch (err) {
    return e.json(500, { ok: false, code: "INTERNAL_ERROR", error: String(err) });
  }
});
