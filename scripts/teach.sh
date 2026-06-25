#!/usr/bin/env bash
# Teach the agent a new fact or Q&A pair (stored in ZizkaDB for semantic retrieval).
# Usage:
#   bash scripts/teach.sh --text "Saad speaks English and Urdu fluently"
#   bash scripts/teach.sh --question "Does Saad know Arabic?" --answer "Saad works with Arabic-market apps but primarily communicates in English and Urdu."
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -f "$ROOT/.env" ]]; then set -a; source "$ROOT/.env"; set +a; fi

SECRET="${CHAT_ADMIN_SECRET:-local-dev-admin-secret}"
HOST="${POCKETBASE_URL:-http://127.0.0.1:8090}"

TOPIC="taught"
TEXT=""
QUESTION=""
ANSWER=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --topic) TOPIC="$2"; shift 2 ;;
    --text) TEXT="$2"; shift 2 ;;
    --question) QUESTION="$2"; shift 2 ;;
    --answer) ANSWER="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

if [[ -n "$QUESTION" && -n "$ANSWER" ]]; then
  BODY=$(python3 -c "import json; print(json.dumps({'topic':'$TOPIC','question':'''$QUESTION''','answer':'''$ANSWER'''}))")
elif [[ -n "$TEXT" ]]; then
  BODY=$(python3 -c "import json; print(json.dumps({'topic':'$TOPIC','text':'''$TEXT'''}))")
else
  echo "Provide --text OR --question + --answer"
  exit 1
fi

curl -s -X POST "$HOST/admin/teach" \
  -H "X-Admin-Secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d "$BODY" | python3 -m json.tool
