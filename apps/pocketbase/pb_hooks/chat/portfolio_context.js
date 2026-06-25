var life = require(__hooks + "/chat/life_knowledge.js");

function portfolioSystemPrompt() {
  var p = life.profile;
  var edu = life.education;
  var lines = [
    "You are Saad's personal representative — a warm, professional AI ambassador on his portfolio website.",
    "You speak on behalf of " + p.fullName + ", a " + p.title + " and " + p.specialty + ".",
    "You help visitors, recruiters, HR professionals, and interviewers learn about Saad accurately.",
    "",
    "PERSONALITY:",
    "- Always positive, respectful, and constructive — even when users are rude or off-topic",
    "- Never insult, argue, swear, or mirror hostility",
    "- For abuse: stay calm, set a gentle boundary, redirect to Saad's background",
    "- Be enthusiastic but honest — like a knowledgeable colleague recommending Saad for a role",
  "",
    "INTERPRETATION (critical):",
    "- Understand paraphrases, slang, typos, and indirect questions — map them to Saad-related facts",
    "- Examples: 'uni' → education, 'stack' → skills, 'trips' → countries visited, 'fit for startup' → strengths + freelance history",
    "- For comparison or opinion questions (e.g. 'is he senior enough?'): reason from facts — years, scale, projects — do not invent credentials",
    "- For partially related questions: answer the Saad-relevant part, then offer to elaborate",
    "- For unrelated topics (weather, homework, other people): politely redirect to Saad's background",
    "- Use learned Q&A from memory when present — those are verified past answers",
    "",
    "ACCURACY:",
    "- Only use facts from the knowledge below and 'Relevant knowledge' memory context",
    "- Never invent university names, dates, salaries, or private details",
    "- If unsure, say so warmly and offer related facts you do know",
    "",
    "HR & INTERVIEW MODE:",
    "- When asked by recruiters/HR: give structured answers — education, timeline, skills, projects, strengths, availability",
    "- Highlight scale (1M+ users), full-stack range, and international client experience",
    "- Offer contact details when hiring or interview is implied",
    "",
    "PROFILE:",
    "Name: " + p.fullName,
    "Title: " + p.title + " | " + p.specialty,
    "Experience: " + p.experience,
    "Location: " + p.location,
    "Nationality: " + p.nationality,
    "Languages: " + p.languages.join(", "),
    "Availability: " + p.availability,
    "Summary: " + p.summary,
    "",
    "Education: " + [edu.degree, edu.field, edu.university, edu.graduationYear ? "Class of " + edu.graduationYear : ""].filter(Boolean).join(" — "),
    edu.notes,
    "",
    "Contact:",
    "- Phone / WhatsApp: " + p.contact.phone,
    "- Email: " + p.contact.emailPrimary + " | " + p.contact.emailSecondary,
    "",
    life.buildPromptSections(),
    "",
    "Values:",
  ];

  for (var v = 0; v < p.values.length; v++) {
    lines.push("- " + p.values[v]);
  }

  if (life.hrProfile && life.hrProfile.strengths) {
    lines.push("", "Key strengths for employers:");
    for (var s = 0; s < life.hrProfile.strengths.length; s++) {
      lines.push("- " + life.hrProfile.strengths[s]);
    }
  }

  lines.push("", "Featured projects:");
  for (var j = 0; j < life.projects.length; j++) {
    var proj = life.projects[j];
    lines.push("- " + proj.title + ": " + proj.description + " (" + proj.stack + ")");
  }

  return lines.join("\n");
}

function portfolioFallbackReply(message, memoryContext) {
  var q = (message || "").toLowerCase();
  var canned = life.cannedResponses;
  var personal = life.profile.personal || {};
  var edu = life.education;
  memoryContext = memoryContext || "";

  if (/\b(hr|recruiter|recruit|hiring|hire him|interview|candidate|resume|cv|profile summary)\b/.test(q)) {
    return canned.hrSummary;
  }
  if (/\b(born|birth|birthday|dob|date of birth|when.*born|how old|what age|his age)\b/.test(q)) {
    if (personal.birthDate) {
      return "Saad was born on " + personal.birthDate + (personal.birthPlace ? " in " + personal.birthPlace : "") + ".";
    }
    if (personal.age) {
      return "Saad is " + personal.age + " years old.";
    }
    return canned.unknownBirth;
  }
  if (/\b(education|graduate|graduated|university|college|degree|studied|school|engineering|software engineering)\b/.test(q)) {
    var eduLine = "Saad holds a " + edu.degree + " in " + edu.field + ", graduated in " + edu.graduationYear + ".";
    if (edu.university) {
      eduLine = "Saad graduated from " + edu.university + " with a " + edu.degree + " in " + edu.field + " (" + edu.graduationYear + ").";
    }
    return eduLine + " " + (edu.notes || "");
  }
  if (/\b(hobby|hobbies|interest|interests|free time|passion|like to do)\b/.test(q)) {
    return "Saad's hobbies and interests include: " + life.hobbies.join(", ") + ".";
  }
  if (/\b(countr|travel|traveled|visited|trip|tour|abroad|dubai|pakistan|saudi|uae|ksa)\b/.test(q)) {
    var countryList = life.countriesVisited
      .map(function (c) {
        return c.name + (c.context ? " (" + c.context + ")" : "");
      })
      .join("; ");
    return "Saad has lived, worked, or traveled in: " + countryList + ".";
  }
  if (/\b(when.*start|career start|started career|first job|begin.*career|how.*start)\b/.test(q)) {
    return "Saad started his professional software career in 2018 as a freelance React Native developer on Fiverr and Upwork, while completing his Software Engineering degree (graduated 2020). He's been at Washmen Dubai as Senior Engineer since 2023.";
  }
  if (/\b(contact|email|phone|whatsapp|reach|call)\b/.test(q)) {
    return (
      "Reach Saad at " +
      life.profile.contact.phone +
      " (WhatsApp) or " +
      life.profile.contact.emailPrimary +
      ". Open to discussing roles and projects."
    );
  }
  if (/\b(available|availability|notice period|join|relocate)\b/.test(q)) {
    return life.profile.availability + " Contact him to discuss timing and notice period.";
  }
  if (/\b(rate|price|cost|charge|salary|compensation|package|budget)\b/.test(q)) {
    return "Compensation depends on role scope and location. Saad discusses details directly during HR or client conversations — reach out via email or WhatsApp.";
  }
  if (/\b(where|location|based|live|nationality)\b/.test(q)) {
    return "Saad is based in Pakistan (" + life.profile.nationality + ") and works internationally with clients in UAE and Saudi Arabia. Currently engineering at Washmen, Dubai.";
  }
  if (/\b(who are you|what are you|are you saad|bot|ai)\b/.test(q)) {
    return "I'm Saad's AI representative on this portfolio — I share his education, career, projects, and contact info accurately for visitors and recruiters.";
  }
  if (/\b(react|stack|tech|skill|technology|framework)\b/.test(q)) {
    return "Core stack: React Native, React, Node.js, Sails.js, AWS Lambda, TypeScript, MongoDB, Redis. Also Expo, NestJS, Jest, Cypress, and CI/CD on AWS.";
  }
  if (/\b(project|work|portfolio|washmen|careem|retailo|hao|sitgo|gestor)\b/.test(q)) {
    return "Key projects: Washmen Dubai, Careem PWA, Retailo B2B, Hao Saudi, Sitgo Pakistan, TheGestor fintech — React Native + Node/AWS at scale.";
  }
  if (/\b(experience|background|freelance|washmen|years)\b/.test(q)) {
    return canned.hrSummary;
  }
  if (/\b(why hire|why should|strength|strong|best at|good at)\b/.test(q)) {
    return "Top strengths: " + life.hrProfile.strengths.slice(0, 3).join(" ") + " " + life.hrProfile.whyHire[0];
  }
  if (/\b(fintech|startup|enterprise|remote|lead|senior enough|good fit|would he|mobile lead)\b/.test(q)) {
    return (
      "Saad is a strong fit for senior mobile and full-stack roles — 7 years experience, 1M+ user platforms at Washmen, " +
      "Careem/InstaShop integrations, and 10+ freelance apps. He works remotely with UAE/KSA clients. " +
      life.hrProfile.whyHire[0]
    );
  }
  if (/\b(married|wife|husband|family|kids|children|religion)\b/.test(q)) {
    return canned.unknownPersonal;
  }

  if (memoryContext && memoryContext.length > 80) {
    var snippet = memoryContext;
    if (snippet.length > 1400) {
      snippet = snippet.substring(0, 1400) + "...";
    }
    return (
      "Based on Saad's profile and memory, here's what's relevant:\n\n" +
      snippet +
      "\n\nAsk a follow-up for more detail, or contact Saad at " +
      life.profile.contact.emailPrimary +
      "."
    );
  }

  return canned.greeting;
}

function allSeedFacts() {
  return life.facts.slice();
}

module.exports = {
  portfolioSystemPrompt: portfolioSystemPrompt,
  portfolioFallbackReply: portfolioFallbackReply,
  allSeedFacts: allSeedFacts,
};
