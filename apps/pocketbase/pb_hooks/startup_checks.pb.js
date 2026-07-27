/// <reference path="../pb_data/types.d.ts" />

// Boot-time validation for the chat agent's config. Surfaces misconfiguration
// immediately in logs at startup instead of only on the first real request
// (or, worse, silently degrading to fallback mode with no signal at all).
onBootstrap((e) => {
  e.next();

  var RETIRED_ANTHROPIC_MODELS = [
    "claude-3-5-haiku-20241022",
    "claude-3-5-sonnet-20241022",
    "claude-3-5-sonnet-20240620",
    "claude-3-sonnet-20240229",
    "claude-3-opus-20240229",
    "claude-2.1",
    "claude-2.0",
  ];

  var openaiKey = $os.getenv("OPENAI_API_KEY") || "";
  var anthropicKey = $os.getenv("ANTHROPIC_API_KEY") || "";
  var anthropicModel = $os.getenv("ANTHROPIC_MODEL") || "";
  var openaiModel = $os.getenv("OPENAI_MODEL") || "";
  var forcedProvider = ($os.getenv("CHAT_LLM_PROVIDER") || "").toLowerCase();

  if (!openaiKey && !anthropicKey) {
    $app.logger().warn("Chat agent config: no LLM provider key set — running in fallback-only mode");
  }

  if (openaiKey && openaiKey.indexOf("sk-") !== 0) {
    $app.logger().warn("Chat agent config: OPENAI_API_KEY is set but doesn't look like a standard OpenAI key (expected sk- prefix) — double-check it");
  }

  if (anthropicKey && anthropicModel && RETIRED_ANTHROPIC_MODELS.indexOf(anthropicModel) !== -1) {
    $app.logger().error("Chat agent config: ANTHROPIC_MODEL is set to a RETIRED model (" + anthropicModel + ") — requests will fail. Update ANTHROPIC_MODEL.");
  }

  if (anthropicKey && !anthropicModel) {
    $app.logger().warn("Chat agent config: ANTHROPIC_API_KEY is set but ANTHROPIC_MODEL is empty — a default will be used, set it explicitly");
  }

  if (openaiKey && !openaiModel) {
    $app.logger().warn("Chat agent config: OPENAI_API_KEY is set but OPENAI_MODEL is empty — a default (gpt-4o-mini) will be used, set it explicitly");
  }

  if (forcedProvider && forcedProvider !== "openai" && forcedProvider !== "anthropic") {
    $app.logger().warn(
      "Chat agent config: CHAT_LLM_PROVIDER is set to an unrecognized value (" +
        forcedProvider +
        ") — expected 'openai' or 'anthropic'; the override will be ignored and normal key-presence detection used instead"
    );
  }

  var maxCalls = $os.getenv("CHAT_MAX_LLM_CALLS_PER_DAY") || "300 (default)";
  $app.logger().info("Chat agent config: daily LLM call budget = " + maxCalls);
});
