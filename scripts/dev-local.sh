#!/usr/bin/env bash
# Local dev: Vite :3000 + PocketBase :8090
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Load secrets from .env (gitignored) — see .env.example
if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env"
  set +a
fi

export PB_ENCRYPTION_KEY="${PB_ENCRYPTION_KEY:-01234567890123456789012345678901}"
export PB_SUPERUSER_EMAIL="${PB_SUPERUSER_EMAIL:-admin@local.dev}"
export PB_SUPERUSER_PASSWORD="${PB_SUPERUSER_PASSWORD:-localdevpassword123}"

bash "$ROOT/scripts/install-pocketbase.sh"

echo "→ Portfolio dev"
echo "   Site:       http://localhost:3000"
echo "   PocketBase: http://localhost:8090/_/"
echo "   API proxy:  http://localhost:3000/hcgi/platform/chat/"
echo ""
echo "   Tip: add OPENAI_API_KEY (or ANTHROPIC_API_KEY) + ZIZKADB_API_KEY to .env for smart agent"
echo ""

export ZIZKADB_API_KEY="${ZIZKADB_API_KEY:-}"
export ZIZKADB_HOST="${ZIZKADB_HOST:-https://db.zizka.ai}"
export ZIZKADB_AGENT_ID="${ZIZKADB_AGENT_ID:-chat-agent-saad-portfolio}"
export OPENAI_API_KEY="${OPENAI_API_KEY:-}"
export OPENAI_MODEL="${OPENAI_MODEL:-gpt-4o-mini}"
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-}"
export ANTHROPIC_MODEL="${ANTHROPIC_MODEL:-claude-3-5-haiku-20241022}"
export CHAT_AUTO_LEARN="${CHAT_AUTO_LEARN:-true}"
export CHAT_LEARN_MIN_CHARS="${CHAT_LEARN_MIN_CHARS:-40}"
export CHAT_ADMIN_SECRET="${CHAT_ADMIN_SECRET:-local-dev-admin-secret}"

npm run dev
