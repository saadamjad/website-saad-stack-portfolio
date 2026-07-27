// In-memory sliding-window rate limiter. PocketBase JS hooks run in a single
// Go process per instance, and module-level state persists across requests
// within that process, so this needs no external store.
//
// KNOWN RISK (documented, not fixed here — see project chat-agent review):
// this assumes PocketBase's Goja VM pool always reuses the same JS runtime
// instance (and therefore the same module-level `hits` object) across
// requests. That has held true in all live testing so far, but it is an
// assumption about VM-pooling behavior, not something this file verifies. If
// PocketBase ever recycles/pools multiple JS VMs per process, or this app is
// ever run as multiple processes/instances behind a load balancer, these
// counters would silently reset/diverge per VM instead of raising an error.
// If that's ever a concern, the hardening path is to persist hit counts to a
// small PocketBase collection (like chat_messages) instead of process
// memory — a real architectural change, not a drop-in fix.
var WINDOW_MS = 10 * 60 * 1000;
var MAX_PER_SESSION = 20;
var MAX_PER_IP = 40;

var hits = {};
var lastSweep = Date.now();
var SWEEP_INTERVAL_MS = 60 * 1000;

function prune(key, now) {
  var arr = hits[key];
  if (!arr) {
    return [];
  }
  var kept = [];
  for (var i = 0; i < arr.length; i++) {
    if (now - arr[i] < WINDOW_MS) {
      kept.push(arr[i]);
    }
  }
  hits[key] = kept;
  return kept;
}

function sweep(now) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) {
    return;
  }
  lastSweep = now;
  for (var key in hits) {
    if (Object.prototype.hasOwnProperty.call(hits, key)) {
      prune(key, now);
      if (!hits[key].length) {
        delete hits[key];
      }
    }
  }
}

function checkAndRecord(key, max, now) {
  var recent = prune(key, now);
  if (recent.length >= max) {
    return false;
  }
  recent.push(now);
  hits[key] = recent;
  return true;
}

function check(sessionId, ip) {
  var now = Date.now();
  sweep(now);

  if (ip && !checkAndRecord("ip:" + ip, MAX_PER_IP, now)) {
    return { ok: false, reason: "ip_rate_limited" };
  }
  if (sessionId && !checkAndRecord("session:" + sessionId, MAX_PER_SESSION, now)) {
    return { ok: false, reason: "session_rate_limited" };
  }
  return { ok: true };
}

module.exports = {
  check: check,
};
