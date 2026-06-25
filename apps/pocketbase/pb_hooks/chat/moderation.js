var life = require(__hooks + "/chat/life_knowledge.js");

var ABUSE_PATTERNS = [
  "stupid",
  "idiot",
  "dumb",
  "trash",
  "garbage",
  "suck",
  "sucks",
  "hate you",
  "hate saad",
  "worst",
  "useless",
  "pathetic",
  "loser",
  "shut up",
  "go away",
  "fuck",
  "shit",
  "asshole",
  "bitch",
  "bastard",
];

var JAILBREAK_PATTERNS = [
  "ignore your instructions",
  "ignore all instructions",
  "ignore previous",
  "disregard your",
  "pretend you are",
  "act as if",
  "act as a",
  "you are now",
  "system prompt",
  "reveal your prompt",
  "show me your prompt",
  "jailbreak",
  "dan mode",
  "developer mode",
  "bypass your",
  "forget your rules",
  "no restrictions",
];

function containsAny(text, patterns) {
  for (var i = 0; i < patterns.length; i++) {
    if (text.indexOf(patterns[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function isGreeting(text) {
  return /^(hi|hello|hey|salam|assalam|good (morning|afternoon|evening)|howdy)\b/.test(text);
}

function isThanks(text) {
  return /\b(thanks|thank you|thx|appreciate it|cheers)\b/.test(text) && text.length < 80;
}

function classifyMessage(message) {
  var text = (message || "").trim();
  var lower = text.toLowerCase();

  if (!text.length) {
    return { type: "empty" };
  }

  if (containsAny(lower, JAILBREAK_PATTERNS)) {
    return {
      type: "jailbreak",
      shortCircuit: true,
      reply: life.cannedResponses.jailbreak,
    };
  }

  if (containsAny(lower, ABUSE_PATTERNS)) {
    return {
      type: "abuse",
      shortCircuit: true,
      reply: life.cannedResponses.abuse,
    };
  }

  if (isThanks(lower)) {
    return {
      type: "thanks",
      shortCircuit: true,
      reply: life.cannedResponses.thanks,
    };
  }

  if (isGreeting(lower) && text.length < 40) {
    return {
      type: "greeting",
      shortCircuit: true,
      reply: life.cannedResponses.greeting,
    };
  }

  return { type: "normal", shortCircuit: false };
}

module.exports = {
  classifyMessage: classifyMessage,
};
