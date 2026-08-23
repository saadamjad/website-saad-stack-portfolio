# website-saad-stack-portfolio

Saad's portfolio — React (Vite) + PocketBase.

The AI chat agent that powers the site's chat widget lives in a separate repository
([personal-assistant](https://github.com/saadamjad/personal-assistant), Python + FastAPI
+ CrewAI) and is deployed independently. This repo only owns the site itself and the
chat widget's UI — see `apps/web/src/features/chat/`.

PocketBase (`apps/pocketbase`) is still used, but only for two narrow features: the
contact form (`contact_submissions` collection) and an internal video-upload admin tool
(`videos` collection, gated behind authentication) — it no longer has anything to do
with the chat agent.

## Local development

```bash
npm install
cp .env.example .env
bash scripts/dev-local.sh
```

| Service | URL |
|---------|-----|
| Site | http://localhost:3000 |
| PocketBase admin | http://localhost:8090/_/ |

## Connecting the chat widget to the agent

The chat widget calls whatever URL `VITE_CHAT_API_BASE` is set to (see
`apps/web/src/features/chat/config/chatConfig.js`). Set it in `apps/web/.env` to the
running personal-assistant service's `/api/v1/chat` endpoint — see that repo's
`DEPLOYMENT.md` for details. Without it set, the chat widget has nothing to talk to.

## Commit hygiene

Never commit `.env`, `pb_data/`, or the `pocketbase` binary.
