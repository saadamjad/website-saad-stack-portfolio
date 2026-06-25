/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/chat/health", (e) => {
  var zizka = require(__hooks + "/chat/zizkadb.js");
  var llm = require(__hooks + "/chat/llm.js");
  var learning = require(__hooks + "/chat/learning.js");
  return e.json(200, {
    ok: true,
    zizka: zizka.isConfigured(),
    llm: llm.isConfigured(),
    llmProvider: llm.provider(),
    llmModel: llm.model(),
    autoLearn: learning.autoLearnEnabled(),
  });
});

routerAdd("POST", "/chat", (e) => {
  try {
    var chat = require(__hooks + "/chat/orchestrator.js");
    var body = e.requestInfo().body || {};
    var sessionId = body.sessionId || body.session_id || "";
    var message = body.message || "";

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
      parentEventId: result.parentEventId,
      simulated: result.simulated,
      zizkaEnabled: result.zizkaEnabled,
      llmEnabled: result.llmEnabled,
      llmProvider: result.llmProvider,
      learned: result.learned || false,
      latencyMs: result.latencyMs,
    });
  } catch (err) {
    return e.json(500, { ok: false, error: String(err) });
  }
});

routerAdd("GET", "/chat/history", (e) => {
  try {
    var chat = require(__hooks + "/chat/orchestrator.js");
    var sessionId = e.requestInfo().query.sessionId || e.requestInfo().query.session_id || "";
    var limit = parseInt(e.requestInfo().query.limit || "20", 10);
    var result = chat.getHistory(sessionId, limit);

    if (!result.ok) {
      return e.json(result.status || 400, { ok: false, error: result.error });
    }

    return e.json(200, {
      ok: true,
      sessionId: result.sessionId,
      messages: result.messages,
    });
  } catch (err) {
    return e.json(500, { ok: false, error: String(err) });
  }
});

routerAdd("POST", "/admin/seed-portfolio", (e) => {
  try {
    var auth = require(__hooks + "/chat/admin_auth.js");
    if (!auth.checkAdminSecret(e)) {
      return e.json(403, { ok: false, error: "forbidden" });
    }
    var zizka = require(__hooks + "/chat/zizkadb.js");
    var seed = zizka.seedPortfolioFacts();
    if (!seed.ok) {
      return e.json(503, seed);
    }
    return e.json(200, seed);
  } catch (err) {
    return e.json(500, { ok: false, error: String(err) });
  }
});

routerAdd("POST", "/admin/teach", (e) => {
  try {
    var auth = require(__hooks + "/chat/admin_auth.js");
    if (!auth.checkAdminSecret(e)) {
      return e.json(403, { ok: false, error: "forbidden" });
    }
    var learning = require(__hooks + "/chat/learning.js");
    var body = e.requestInfo().body || {};
    var result = learning.teachFact(
      body.topic || "taught",
      body.text || "",
      body.question || "",
      body.answer || body.reply || ""
    );
    if (!result.ok) {
      return e.json(400, result);
    }
    return e.json(200, result);
  } catch (err) {
    return e.json(500, { ok: false, error: String(err) });
  }
});
