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
echo ""
echo "   The AI chat agent runs as a separate service (Langchain-AI-Agent)."
echo "   Set VITE_CHAT_API_BASE in apps/web/.env to point the chat widget at it."
echo ""

npm run dev
