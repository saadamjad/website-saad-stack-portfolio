#!/usr/bin/env bash
# Seed Saad's knowledge facts into ZizkaDB (run after editing life_knowledge.js).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -f "$ROOT/.env" ]]; then set -a; source "$ROOT/.env"; set +a; fi

SECRET="${CHAT_ADMIN_SECRET:-local-dev-admin-secret}"
curl -s -X POST "http://127.0.0.1:8090/admin/seed-portfolio" \
  -H "X-Admin-Secret: $SECRET" \
  -H "Content-Type: application/json" | python3 -m json.tool
