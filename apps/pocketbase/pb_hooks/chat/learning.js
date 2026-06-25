var zizka = require(__hooks + "/chat/zizkadb.js");

function autoLearnEnabled() {
  var v = ($os.getenv("CHAT_AUTO_LEARN") || "true").toLowerCase();
  return v !== "false" && v !== "0" && v !== "no";
}

function minAnswerLength() {
  var n = parseInt($os.getenv("CHAT_LEARN_MIN_CHARS") || "40", 10);
  return isNaN(n) ? 40 : n;
}

function shouldLearn(question, answer, simulated) {
  if (!autoLearnEnabled() || !zizka.isConfigured() || simulated) {
    return false;
  }
  if (!question || !answer) {
    return false;
  }
  if (answer.length < minAnswerLength()) {
    return false;
  }
  if (answer.indexOf("I'm Saad's personal representative") === 0 && answer.length < 120) {
    return false;
  }
  return true;
}

function recordLearnedQA(agent, question, answer, sessionId, parentId) {
  if (!shouldLearn(question, answer, false)) {
    return null;
  }
  return zizka.logEvent(
    agent,
    "learned_qa",
    {
      topic: "learned",
      question: question,
      text: "Q: " + question + "\nA: " + answer,
    },
    parentId,
    sessionId
  );
}

function teachFact(topic, text, question, answer) {
  if (!zizka.isConfigured()) {
    return { ok: false, error: "ZIZKADB_API_KEY not configured" };
  }
  var agent = zizka.agentId(null);
  var data = { topic: topic || "taught" };

  if (question && answer) {
    data.question = question;
    data.text = "Q: " + question + "\nA: " + answer;
  } else if (text) {
    data.text = text;
  } else {
    return { ok: false, error: "provide text or question+answer" };
  }

  var logged = zizka.logEvent(agent, "learned_fact", data, null, "admin-teach");
  if (!logged) {
    return { ok: false, error: "failed to log to ZizkaDB" };
  }
  return { ok: true, event_id: logged.event_id, agent: agent };
}

module.exports = {
  autoLearnEnabled: autoLearnEnabled,
  recordLearnedQA: recordLearnedQA,
  teachFact: teachFact,
};
