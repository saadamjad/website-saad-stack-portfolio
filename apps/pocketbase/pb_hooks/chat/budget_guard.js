// Global daily ceiling on real LLM calls, independent of per-session/per-IP
// rate limiting. Per-key limits (rate_limit.js) stop one abusive client but
// can be bypassed by spreading requests across many fake session IDs or a
// botnet across many IPs. This guard caps *total* spend exposure regardless
// of how the traffic is distributed. It is a backstop, not a replacement for
// setting a hard usage/budget limit on the provider's own dashboard (OpenAI/
// Anthropic) — that is the only cap that holds even if this code has a bug.
//
// KNOWN RISK: same module-level-state assumption as rate_limit.js (see that
// file's comment) — this counter only holds if PocketBase reuses one JS VM
// per process. Treat the provider-side hard spending cap above as the real
// backstop, not this counter alone.
var WINDOW_MS = 24 * 60 * 60 * 1000;
var calls = [];

function maxPerDay() {
  var n = parseInt($os.getenv("CHAT_MAX_LLM_CALLS_PER_DAY") || "300", 10);
  return isNaN(n) || n <= 0 ? 300 : n;
}

function prune(now) {
  var kept = [];
  for (var i = 0; i < calls.length; i++) {
    if (now - calls[i] < WINDOW_MS) {
      kept.push(calls[i]);
    }
  }
  calls = kept;
}

// Call once immediately before every real (non-fallback, non-short-circuited)
// LLM request. Returns false — and does NOT record — when the daily ceiling
// is already reached, so the caller should skip the LLM call and use the
// fallback reply instead.
function checkAndRecord() {
  var now = Date.now();
  prune(now);
  if (calls.length >= maxPerDay()) {
    return false;
  }
  calls.push(now);
  return true;
}

function status() {
  prune(Date.now());
  return { usedToday: calls.length, maxPerDay: maxPerDay() };
}

module.exports = {
  checkAndRecord: checkAndRecord,
  status: status,
};
