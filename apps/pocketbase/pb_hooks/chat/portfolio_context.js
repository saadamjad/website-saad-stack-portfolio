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
    "- Talk like a genuine, warm human being — not a corporate script or a robotic FAQ bot",
    "- Vary your phrasing naturally; don't repeat the same stock sentence for every reply",
    "- Always positive, respectful, and constructive — even when users are rude or off-topic",
    "- Never insult, argue, swear, or mirror hostility",
    "- For abuse: stay calm, set a gentle boundary, redirect to Saad's background",
    "- Be enthusiastic but honest — like a knowledgeable colleague recommending Saad for a role",
    "- Stay professional and confident: answer direct yes/no questions with a clear 'Yes,' / 'No,' before elaborating (e.g. 'Yes, Saad is happily married.' not just 'Saad is married.')",
    "- Keep answers short and directly on point: 1-3 sentences for a simple factual question (e.g. 'What's his experience?' → one or two sentences on years + current role, not the entire résumé). Only give the full detailed profile/summary when the user explicitly asks for a full summary, resume, or complete background.",
    "- If a message is gibberish, keyboard-mashing, or genuinely doesn't make sense (e.g. 'SDSDSDSDS'), say so plainly and kindly — e.g. 'Sorry, I didn't quite catch that — could you rephrase? I'm happy to answer anything about Saad.' Don't guess at meaning or pretend to understand.",
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
    "Education: " +
      [edu.degree, edu.field, edu.university, edu.graduationYear ? "Class of " + edu.graduationYear : ""]
        .filter(Boolean)
        .join(" — "),
    edu.notes,
    "",
    "Contact:",
    "- Phone / WhatsApp: " + p.contact.phone,
    "- Email: " + p.contact.emailPrimary + " | " + p.contact.emailSecondary,
    "- GitHub: " + p.contact.github,
    "- LinkedIn: " + p.contact.linkedin,
    "- Portfolio: " + p.contact.website,
    "",
    "Logistics:",
    "- Work authorization: " + p.workAuthorization,
    "- Employment type: " + p.employmentTypePreference,
    "- References: " + p.references,
    "- Live/published products shipped: " + life.liveAppsCount,
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

  if (/\b(full summary|complete background|resume|cv|profile summary|full profile|tell me everything|tell me about him)\b/.test(q)) {
    return canned.hrSummary;
  }
  if (/\b(hr|recruiter|recruit|hiring|hire him|interview|candidate)\b/.test(q)) {
    return (
      "Saad has 7+ years as a Senior React Native Engineer — currently Founding Engineer at Zizka AI, previously de facto React Native tech lead at Washmen (Dubai), scaling apps to 1M+ active users. " +
      "Ask me for his full summary, education, projects, or contact info any time."
    );
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
    var timeline = life.careerTimeline || [];
    var startJob = timeline[timeline.length - 1];
    var currentJob = timeline[0];
    var startText = startJob ? startJob.description : "";
    var currentText = currentJob
      ? " He's currently " + currentJob.role + " at " + currentJob.company + " (" + currentJob.period + ")."
      : "";
    return (startText + currentText).trim() || canned.hrSummary;
  }
  if (/\b(github)\b/.test(q)) {
    return "Yes, here's Saad's GitHub: " + life.profile.contact.github + ".";
  }
  if (/\b(linkedin)\b/.test(q)) {
    return "Yes, here's Saad's LinkedIn: " + life.profile.contact.linkedin + ".";
  }
  if (/\b(contact|email|phone|whatsapp|reach|call)\b/.test(q)) {
    return (
      "You can reach Saad at " +
      life.profile.contact.phone +
      " (WhatsApp) or " +
      life.profile.contact.emailPrimary +
      ". He's also on GitHub (" + life.profile.contact.github + ") and LinkedIn (" + life.profile.contact.linkedin + "). Happy to discuss roles and projects."
    );
  }
  if (/\b(visa|sponsorship|work authoriz|authorization|work permit)\b/.test(q)) {
    return life.profile.workAuthorization || canned.unknownPersonal;
  }
  if (/\b(contract|full[\s-]?time|part[\s-]?time|employment type)\b/.test(q)) {
    return "Saad is looking for " + (life.profile.employmentTypePreference || "full-time roles") + ".";
  }
  if (/\b(reference|references)\b/.test(q)) {
    return life.profile.references || canned.unknownPersonal;
  }
  if (/\b(how many.*(app|apps|product|products)|number of (apps|products)|apps.*live|live apps)\b/.test(q)) {
    return (
      "Saad has shipped " + (life.liveAppsCount || life.projects.length) + " live products — including Washmen, Retailo, Hao, " +
      "and ZizkaDB. Ask me for the full list if you'd like details on each."
    );
  }
  if (/\b(contribution|contributions|accomplish|achievement|impact|what did he do|his role)\b/.test(q)) {
    return (
      "At Washmen he's de facto React Native tech lead, built a shared design system, and owns 99.9% crash-free releases. " +
      "At TekRevol he cut app re-render overhead ~50%. At Retailo he launched the B2B marketplace end-to-end. Happy to go deeper on any of those."
    );
  }
  if (/\b(available|availability|notice period|join|relocate)\b/.test(q)) {
    return life.profile.availability + " Feel free to reach out to discuss timing.";
  }
  if (/\b(rate|price|cost|charge|salary|compensation|package|budget)\b/.test(q)) {
    return "Compensation depends on role scope and location. Saad discusses those details directly during HR or client conversations — reach out via email or WhatsApp.";
  }
  if (/\b(where|location|based|live|nationality)\b/.test(q)) {
    return "Saad is based in " + life.profile.location + " (" + life.profile.nationality + ").";
  }
  if (/\b(who are you|what are you|are you saad|bot|ai)\b/.test(q)) {
    return "I'm Saad's AI representative on this portfolio — I share his education, career, projects, and contact info accurately for visitors and recruiters.";
  }
  if (/\b(react|stack|tech|skills?|technology|framework)\b/.test(q)) {
    return "His main stack: React Native, React, Next.js, TypeScript, Node.js/Sails.js, and AWS (Lambda, SQS, DynamoDB). Ask me for a full skills breakdown if you'd like more detail.";
  }
  if (/\b(projects?|work|portfolio|washmen|careem|retailo|hao|gestor|zizka)\b/.test(q)) {
    var projectTitles = life.projects.map(function (proj) {
      return proj.title;
    });
    return "Yes, here are his key projects: " + projectTitles.join(", ") + ".";
  }
  if (/\b(experience|years of experience|how long)\b/.test(q)) {
    return "Saad has 7+ years of experience as a Senior React Native Engineer. He's currently Founding Engineer at Zizka AI, and was previously working at Washmen as Full Stack Software Engineer in Dubai.";
  }
  if (/\b(background|freelance)\b/.test(q)) {
    return "Saad started freelancing in 2019, then worked at Hao Saudi, Retailo, and TekRevol before becoming de facto React Native tech lead at Washmen (Dubai). He's now Founding Engineer at Zizka AI.";
  }
  if (/\b(why hire|why should|strength|strong|best at|good at)\b/.test(q)) {
    return "Top strengths: " + life.hrProfile.strengths.slice(0, 2).join(" ") + " " + life.hrProfile.whyHire[0];
  }
  if (/\b(fintech|startup|enterprise|remote|lead|senior enough|good fit|would he|mobile lead)\b/.test(q)) {
    return (
      "Yes, Saad is a strong fit for senior mobile and full-stack roles — 7+ years experience, de facto React Native tech lead at Washmen, and 1M+ user platforms via Careem/InstaShop/RIZEK. " +
      life.hrProfile.whyHire[0]
    );
  }
  if (/\b(married|marriage|wife|husband)\b/.test(q)) {
    return personal.maritalStatus
      ? "Yes, Saad is happily " + personal.maritalStatus.toLowerCase() + ". Happy to share more about his career and projects if you're curious!"
      : canned.unknownPersonal;
  }
  if (/\b(family|kids|children|religion)\b/.test(q)) {
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

  return canned.offTopic;
}

module.exports = {
  portfolioSystemPrompt: portfolioSystemPrompt,
  portfolioFallbackReply: portfolioFallbackReply,
};
