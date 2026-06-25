function baseUrl() {
  var host = $os.getenv("ZIZKADB_HOST") || "https://db.zizka.ai";
  return host.replace(/\/$/, "");
}

function apiKey() {
  return $os.getenv("ZIZKADB_API_KEY") || "";
}

function headers() {
  return {
    Authorization: "Bearer " + apiKey(),
    "Content-Type": "application/json",
  };
}

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

function isConfigured() {
  return apiKey().length > 10;
}

function agentId(sessionId) {
  return $os.getenv("ZIZKADB_AGENT_ID") || "chat-agent-saad-portfolio";
}

function logEvent(agent, eventType, data, parentId, sessionId) {
  if (!isConfigured()) {
    return null;
  }
  var payload = {
    agent: agent,
    event: eventType,
    data: data || {},
  };
  if (parentId) {
    payload.parent_id = parentId;
  }
  if (sessionId) {
    payload.session_id = sessionId;
  }
  try {
    var res = $http.send({
      url: baseUrl() + "/v1/events",
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
      timeout: 15,
    });
    if (res.statusCode === 201) {
      return parseBody(res);
    }
    $app.logger().warn("ZizkaDB log failed", "status", res.statusCode, "event", eventType);
  } catch (err) {
    $app.logger().warn("ZizkaDB log error", "error", String(err));
  }
  return null;
}

function queryEvents(agent, limit, sessionId) {
  if (!isConfigured()) {
    return [];
  }
  try {
    var url = baseUrl() + "/v1/events?agent=" + encodeURIComponent(agent) + "&limit=" + (limit || 20);
    if (sessionId) {
      url += "&session_id=" + encodeURIComponent(sessionId);
    }
    var res = $http.send({
      url: url,
      method: "GET",
      headers: headers(),
      timeout: 15,
    });
    if (res.statusCode === 200) {
      return parseBody(res) || [];
    }
  } catch (err) {
    $app.logger().warn("ZizkaDB query error", "error", String(err));
  }
  return [];
}

function contextFor(agent, task, sessionId) {
  if (!isConfigured()) {
    return "";
  }
  try {
    var body = {
      agent: agent,
      task: task,
      max_tokens: 2500,
      recent_limit: 12,
      semantic_limit: 10,
    };
    if (sessionId) {
      body.session_id = sessionId;
    }
    var res = $http.send({
      url: baseUrl() + "/v1/memory/context",
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
      timeout: 20,
    });
    if (res.statusCode === 200) {
      var parsed = parseBody(res);
      return (parsed && parsed.context) || "";
    }
  } catch (err) {
    $app.logger().warn("ZizkaDB context error", "error", String(err));
  }
  return "";
}

function seedPortfolioFacts() {
  if (!isConfigured()) {
    return { ok: false, error: "ZIZKADB_API_KEY not configured" };
  }
  var portfolio = require(__hooks + "/chat/portfolio_context.js");
  var agent = $os.getenv("ZIZKADB_AGENT_ID") || "chat-agent-saad-portfolio";
  var count = 0;
  var facts = portfolio.allSeedFacts();
  for (var k = 0; k < facts.length; k++) {
    var logged = logEvent(agent, "life_fact", facts[k], null, "seed");
    if (logged) {
      count++;
    }
  }
  return { ok: true, agent: agent, events_logged: count, facts_total: facts.length };
}

module.exports = {
  parseBody: parseBody,
  isConfigured: isConfigured,
  agentId: agentId,
  logEvent: logEvent,
  queryEvents: queryEvents,
  contextFor: contextFor,
  seedPortfolioFacts: seedPortfolioFacts,
};
