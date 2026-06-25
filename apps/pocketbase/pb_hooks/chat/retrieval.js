var llm = require(__hooks + "/chat/llm.js");

function uniqueQueries(userText) {
  var queries = [userText];
  var seen = {};
  seen[userText.toLowerCase()] = true;

  if (llm.isConfigured()) {
    var rewritten = llm.rewriteForSearch(userText);
    if (rewritten) {
      var lines = rewritten.split("\n");
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/^[\d\.\)\-\*]+\s*/, "").trim();
        if (line.length < 4) {
          continue;
        }
        var key = line.toLowerCase();
        if (!seen[key] && queries.length < 3) {
          seen[key] = true;
          queries.push(line);
        }
      }
    }
  }

  return queries;
}

function gatherMemory(zizka, agent, userText, sessionId) {
  var queries = uniqueQueries(userText);
  var chunks = [];
  var chunkSeen = {};

  for (var q = 0; q < queries.length; q++) {
    var ctx = zizka.contextFor(agent, queries[q], sessionId);
    if (!ctx || ctx.length < 10) {
      continue;
    }
    var fingerprint = ctx.substring(0, Math.min(ctx.length, 200));
    if (chunkSeen[fingerprint]) {
      continue;
    }
    chunkSeen[fingerprint] = true;
    chunks.push(ctx);
  }

  return {
    context: chunks.join("\n\n---\n\n"),
    queriesUsed: queries,
    chunkCount: chunks.length,
  };
}

module.exports = {
  gatherMemory: gatherMemory,
  uniqueQueries: uniqueQueries,
};
