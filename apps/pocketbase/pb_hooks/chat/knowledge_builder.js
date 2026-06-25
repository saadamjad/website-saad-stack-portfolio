/**
 * Builds flat ZizkaDB seed facts + prompt sections from structured profile data.
 */
function pushFact(facts, topic, text) {
  if (text) {
    facts.push({ topic: topic, text: text });
  }
}

function buildFacts(data) {
  var facts = [];
  var p = data.profile;
  var edu = data.education;
  var career = data.careerTimeline || [];
  var hobbies = data.hobbies || [];
  var countries = data.countriesVisited || [];
  var hr = data.hrProfile || {};
  var projects = data.projects || [];

  pushFact(facts, "identity", p.fullName + " is a " + p.title + " and " + p.specialty + " with " + p.experience + ".");
  pushFact(facts, "identity", p.summary);

  if (edu.degree || edu.university) {
    pushFact(
      facts,
      "education",
      "Education: " +
        [edu.degree, edu.field, edu.university, edu.graduationYear ? "graduated " + edu.graduationYear : ""]
          .filter(Boolean)
          .join(", ") +
        (edu.notes ? ". " + edu.notes : "") +
        "."
    );
  }
  if (edu.highlights) {
    for (var e = 0; e < edu.highlights.length; e++) {
      pushFact(facts, "education", edu.highlights[e]);
    }
  }

  for (var c = 0; c < career.length; c++) {
    var job = career[c];
    pushFact(
      facts,
      "career",
      job.period + ": " + job.role + " at " + job.company + ". " + job.description
    );
  }

  for (var j = 0; j < projects.length; j++) {
    var proj = projects[j];
    pushFact(facts, "project", proj.title + ": " + proj.description + " Stack: " + proj.stack + ".");
  }

  if (hobbies.length) {
    pushFact(facts, "hobbies", "Saad's hobbies and interests include: " + hobbies.join(", ") + ".");
    for (var h = 0; h < hobbies.length; h++) {
      pushFact(facts, "hobbies", "Saad enjoys " + hobbies[h] + ".");
    }
  }

  if (countries.length) {
    pushFact(
      facts,
      "travel",
      "Countries Saad has lived in, worked in, or visited: " + countries.map(function (c) { return c.name + (c.context ? " (" + c.context + ")" : ""); }).join("; ") + "."
    );
    for (var t = 0; t < countries.length; t++) {
      pushFact(facts, "travel", "Saad has been to " + countries[t].name + (countries[t].context ? " — " + countries[t].context : "") + ".");
    }
  }

  if (p.personal && p.personal.birthDate) {
    pushFact(
      facts,
      "personal",
      "Saad was born on " + p.personal.birthDate + (p.personal.birthPlace ? " in " + p.personal.birthPlace : "") + "."
    );
  }

  pushFact(facts, "personal", "Saad is based in " + p.location + ".");
  pushFact(facts, "contact", "Contact Saad: " + p.contact.phone + " (phone/WhatsApp), " + p.contact.emailPrimary + ", " + p.contact.emailSecondary + ".");

  if (hr.strengths) {
    for (var s = 0; s < hr.strengths.length; s++) {
      pushFact(facts, "hr", "Strength: " + hr.strengths[s]);
    }
  }
  if (hr.whyHire) {
    for (var w = 0; w < hr.whyHire.length; w++) {
      pushFact(facts, "hr", hr.whyHire[w]);
    }
  }
  if (hr.interviewTips) {
    for (var i = 0; i < hr.interviewTips.length; i++) {
      pushFact(facts, "interview", hr.interviewTips[i]);
    }
  }

  var extra = data.extraFacts || [];
  for (var x = 0; x < extra.length; x++) {
    facts.push(extra[x]);
  }

  return facts;
}

function buildPromptSections(data) {
  var lines = [];
  var edu = data.education;
  var career = data.careerTimeline || [];
  var hobbies = data.hobbies || [];
  var countries = data.countriesVisited || [];

  if (edu.degree || edu.university) {
    lines.push("Education: " + [edu.degree, edu.field, edu.university, edu.graduationYear].filter(Boolean).join(" — "));
  }
  if (career.length) {
    lines.push("", "Career timeline:");
    for (var i = 0; i < career.length; i++) {
      lines.push("- " + career[i].period + ": " + career[i].role + ", " + career[i].company);
    }
  }
  if (hobbies.length) {
    lines.push("", "Hobbies: " + hobbies.join(", "));
  }
  if (countries.length) {
    lines.push("", "Countries (lived/worked/visited): " + countries.map(function (c) { return c.name; }).join(", "));
  }
  return lines.join("\n");
}

module.exports = {
  buildFacts: buildFacts,
  buildPromptSections: buildPromptSections,
};
