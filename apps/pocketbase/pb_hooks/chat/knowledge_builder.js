/**
 * Builds prompt sections from structured profile data, for injection into
 * the LLM system prompt. Education is deliberately NOT built here — it's
 * assembled once in portfolio_context.js (which also includes edu.notes) to
 * avoid injecting a duplicate Education section into the same prompt.
 */
function buildPromptSections(data) {
  var lines = [];
  var career = data.careerTimeline || [];
  var hobbies = data.hobbies || [];
  var countries = data.countriesVisited || [];

  if (career.length) {
    lines.push("Career timeline:");
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
  buildPromptSections: buildPromptSections,
};
