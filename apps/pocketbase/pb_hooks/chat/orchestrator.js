var portfolio = require(__hooks + "/chat/portfolio_context.js");
var llm = require(__hooks + "/chat/llm.js");
var moderation = require(__hooks + "/chat/moderation.js");
var history = require(__hooks + "/chat/history.js");
var budgetGuard = require(__hooks + "/chat/budget_guard.js");

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

function handleTurn(sessionId, message) {
  var start = Date.now();
  var validation = validateMessage(message);
  if (!validation.ok) {
    return { ok: false, status: 400, code: "INVALID_REQUEST", error: validation.error };
  }
  if (!validateSessionId(sessionId)) {
    return { ok: false, status: 400, code: "INVALID_REQUEST", error: "invalid sessionId" };
  }

  var userText = validation.message;

  var mod = moderation.classifyMessage(userText);
  if (mod.shortCircuit && mod.reply) {
    var quickUserRecord = history.appendMessage(sessionId, "user", userText, null);
    var quickAssistantRecord = history.appendMessage(sessionId, "assistant", mod.reply, null);
    return {
      ok: true,
      status: 200,
      reply: mod.reply,
      sessionId: sessionId,
      messageId: quickAssistantRecord ? quickAssistantRecord.id : null,
      parentMessageId: quickUserRecord ? quickUserRecord.id : null,
      simulated: true,
      llmEnabled: llm.isConfigured(),
      latencyMs: Date.now() - start,
    };
  }

  var userRecord = history.appendMessage(sessionId, "user", userText, null);
  var convoHistory = history.getRecentMessages(sessionId, 12);

  var llmResult;
  if (llm.isConfigured() && !budgetGuard.checkAndRecord()) {
    $app.logger().warn("Chat fallback", "code", "LLM_BUDGET_EXCEEDED", "status", budgetGuard.status());
    llmResult = {
      ok: false,
      code: "LLM_BUDGET_EXCEEDED",
      reply: portfolio.portfolioFallbackReply(userText, ""),
      simulated: true,
      provider: llm.provider(),
    };
  } else {
    var systemPrompt = portfolio.portfolioSystemPrompt();
    llmResult = llm.chatCompletion(systemPrompt, userText, "", convoHistory);
  }

  var assistantRecord = history.appendMessage(sessionId, "assistant", llmResult.reply, null);

  return {
    ok: true,
    status: 200,
    reply: llmResult.reply,
    sessionId: sessionId,
    messageId: assistantRecord ? assistantRecord.id : null,
    parentMessageId: userRecord ? userRecord.id : null,
    simulated: llmResult.simulated || false,
    fallbackReason: llmResult.simulated ? llmResult.code || null : null,
    llmEnabled: llm.isConfigured(),
    llmProvider: llmResult.provider || llm.provider(),
    latencyMs: Date.now() - start,
  };
}

function getHistory(sessionId, limit) {
  if (!validateSessionId(sessionId)) {
    return { ok: false, status: 400, code: "INVALID_REQUEST", error: "invalid sessionId" };
  }
  var messages = history.getRecentMessages(sessionId, limit || 20);
  return { ok: true, status: 200, sessionId: sessionId, messages: messages };
}

module.exports = {
  handleTurn: handleTurn,
  getHistory: getHistory,
};
