# website-saad-stack-portfolio

Saad's portfolio — React (Vite) + PocketBase + ZizkaDB smart personal representative.

## Local development

```bash
npm install
cp .env.example .env   # add ZIZKADB_API_KEY + OPENAI_API_KEY (or ANTHROPIC_API_KEY)
bash scripts/dev-local.sh
```

| Service | URL |
|---------|-----|
| Site | http://localhost:3000 |
| PocketBase admin | http://localhost:8090/_/ |
| Chat health | http://localhost:8090/chat/health |

## Smart agent architecture

```
User question
  → moderation (abuse/greetings)
  → query rewrite (LLM) + dual ZizkaDB semantic search
  → LLM answer (OpenAI or Anthropic) with memory + history
  → auto-learn Q&A to ZizkaDB (CHAT_AUTO_LEARN=true)
```

**Requires an LLM key** for smart paraphrase understanding. Without it, falls back to keyword + ZizkaDB memory snippets.

### Setup

1. `ZIZKADB_API_KEY` + `ZIZKADB_AGENT_ID=chat-agent-saad-portfolio`
2. `OPENAI_API_KEY=sk-...` **or** `ANTHROPIC_API_KEY=...`
3. Seed knowledge: `bash scripts/seed-zizkadb.sh`
4. Restart PocketBase after hook changes

### Teach new facts

```bash
bash scripts/teach.sh --text "Saad graduated from XYZ University"
bash scripts/teach.sh --question "Does Saad know Docker?" --answer "Yes — used Docker on Retailo B2B."
```

### Edit knowledge base

`apps/pocketbase/pb_hooks/chat/life_knowledge.js` → reseed.

### Health check

```bash
curl http://localhost:8090/chat/health
# llm: true, autoLearn: true, llmProvider: "openai"
```

## Commit hygiene

Never commit `.env`, `pb_data/`, or the `pocketbase` binary.
