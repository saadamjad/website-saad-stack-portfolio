var COLLECTION_NAME = "chat_messages";
var MAX_CONTENT_CHARS = 4000;

// The DB's auto-set `created` timestamp is only millisecond-precision, and
// two messages appended within the same handleTurn() call (user then
// assistant) can land in the same millisecond — sorting by `created` alone
// then produced non-deterministic order for ties (observed: assistant reply
// sorted before the user message that prompted it). `seq` is a strictly
// increasing counter seeded from wall-clock time, guaranteeing correct
// chronological order regardless of DB timestamp resolution.
//
// KNOWN RISK: same module-level-state assumption as rate_limit.js/
// budget_guard.js — this only stays monotonic across requests if PocketBase
// reuses one JS VM per process. Because `nextSeq()` is seeded from
// `Date.now()` each call (not purely incremented from 0), a VM restart or
// pool-swap mid-session would still produce a *plausible* real-time value,
// not a collision with old data — so the worst case under that scenario is
// two messages in the same millisecond sorting arbitrarily relative to each
// other again, not silently wrong history for the whole session.
var lastSeq = 0;

function nextSeq() {
  var now = Date.now();
  lastSeq = now > lastSeq ? now : lastSeq + 1;
  return lastSeq;
}

function appendMessage(sessionId, role, content, eventId) {
  if (!sessionId || !content) {
    return null;
  }
  try {
    var collection = $app.findCollectionByNameOrId(COLLECTION_NAME);
    var record = new Record(collection);
    record.set("session_id", sessionId);
    record.set("role", role);
    record.set("content", String(content).substring(0, MAX_CONTENT_CHARS));
    record.set("seq", nextSeq());
    if (eventId) {
      record.set("event_id", eventId);
    }
    $app.save(record);
    return record;
  } catch (err) {
    $app.logger().warn("Local chat history write failed", "error", String(err));
    return null;
  }
}

function getRecentMessages(sessionId, limit) {
  if (!sessionId) {
    return [];
  }
  try {
    var records = $app.findRecordsByFilter(
      COLLECTION_NAME,
      "session_id = {:sessionId}",
      "-seq",
      limit || 12,
      0,
      { sessionId: sessionId }
    );
    if (!records || !records.length) {
      return [];
    }
    var messages = records.map(function (r) {
      return {
        id: r.id,
        role: r.getString("role"),
        content: r.getString("content"),
        timestamp: r.getString("created"),
      };
    });
    // findRecordsByFilter sorted newest-first (by seq, not the
    // millisecond-precision `created`); reverse to chronological order.
    return messages.reverse();
  } catch (err) {
    $app.logger().warn("Local chat history read failed", "error", String(err));
    return [];
  }
}

module.exports = {
  appendMessage: appendMessage,
  getRecentMessages: getRecentMessages,
};
