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

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Word-boundary + normalized matching instead of raw substring search: avoids
// false positives from a listed word appearing *inside* an unrelated word
// (e.g. "dumbbell" no longer matches "dumb"). Note this does NOT disambiguate
// a listed word used in a genuinely unrelated phrase (e.g. "trash pickup"
// still matches "trash" — it's a real whole-word hit, just a different
// sense of the word). Multi-word phrases (e.g. "shut up") still match across
// normalized whitespace. Repeated-character runs collapse to a single char
// (e.g. "stuuupid" / "suckkkk" → "stupid" / "suck") so simple letter-doubling
// evasion doesn't slip past the word-boundary patterns below — the pattern
// list is collapsed the same way (see containsAny) so words with genuine
// doubled letters, like "asshole", still match correctly on both sides.
function normalize(text) {
  return text
    .replace(/[^\w\s]/g, " ")
    .replace(/(.)\1+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(text, patterns) {
  var normalized = normalize(text);
  for (var i = 0; i < patterns.length; i++) {
    var pattern = normalize(patterns[i]);
    var re = new RegExp("\\b" + escapeRegExp(pattern).replace(/ /g, "\\s+") + "\\b", "i");
    if (re.test(normalized)) {
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

// Catches keyboard-mash / gibberish input (e.g. "SDSDSDSDS", "asdkjasdkj")
// so it gets a warm "didn't catch that" reply instead of being sent to the
// LLM or falling through to a generic off-topic canned response.
function isRepeatingPattern(word) {
  var upper = word.toUpperCase();
  for (var unitLen = 1; unitLen <= 4; unitLen++) {
    if (upper.length % unitLen === 0 && upper.length / unitLen >= 3) {
      var unit = upper.slice(0, unitLen);
      var rebuilt = new Array(upper.length / unitLen + 1).join(unit);
      if (rebuilt === upper) {
        return true;
      }
    }
  }
  return false;
}

function hasNoVowels(word) {
  return word.length >= 5 && !/[aeiou]/i.test(word);
}

function isGibberishWord(word) {
  return isRepeatingPattern(word) || hasNoVowels(word);
}

function isGibberish(text) {
  var lettersOnly = text.replace(/[^a-zA-Z\s]/g, " ").trim();
  var alnum = text.replace(/[^a-zA-Z0-9]/g, "");

  // No letters at all (just symbols/emoji/punctuation) and too short to be
  // a real question (phone numbers, dates, etc. are longer than this).
  if (!lettersOnly && alnum.length > 0 && alnum.length < 10) {
    return true;
  }

  var words = lettersOnly.split(/\s+/).filter(Boolean);
  if (!words.length) {
    return false;
  }

  var gibberishCount = 0;
  for (var i = 0; i < words.length; i++) {
    if (words[i].length >= 4 && isGibberishWord(words[i])) {
      gibberishCount++;
    }
  }
  return words.length <= 6 && gibberishCount / words.length >= 0.6;
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

  if (isGibberish(text)) {
    return {
      type: "unclear",
      shortCircuit: true,
      reply: life.cannedResponses.unclear,
    };
  }

  return { type: "normal", shortCircuit: false };
}

module.exports = {
  classifyMessage: classifyMessage,
};
