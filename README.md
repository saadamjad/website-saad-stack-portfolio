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

If chat requests fail from production with a CORS error in the browser console, check
that the agent's `CORS_ALLOWED_ORIGINS` includes the *exact* origin the browser sent —
apex and `www` are different origins, and if your host serves both without redirecting
one to the other, both need to be listed on the agent side (this has broken chat in
production once already; see the agent repo's `DEPLOYMENT.md`).

## Analytics

Page views and chat engagement are tracked via a self-hosted
[Umami](https://umami.is) instance (deployed on Railway, alongside the agent — see the
agent repo's `DEPLOYMENT.md`). No third-party script, no cookie banner needed.

- The tracking script is a single `<script>` tag in `apps/web/index.html`, pointed at
  the Umami instance's URL and `data-website-id`.
- `apps/web/src/lib/analytics.js` exports `trackEvent(name, data)`, a thin wrapper
  around `window.umami.track()` that swallows any error so a slow/blocked/down
  analytics script can never break the app.
- Custom events fired today: `chat_opened` (manual open),
  `chat_auto_opened` (the delayed auto-popup, see `chatConfig.openOnLoad`), and
  `chat_message_sent` (fired once per message send) — see
  `apps/web/src/features/chat/components/ChatWidget.jsx` and
  `apps/web/src/features/chat/hooks/useChatMessages.js`. No message content or PII is
  ever sent, only event names.
- To add a new tracked interaction elsewhere in the site, call
  `trackEvent('your_event_name')` at the point the interaction happens — no other
  wiring needed.

**Deploy gap to know about:** this repo has no CI/CD auto-deploy to the live site —
merging a PR only updates GitHub. The production site (Hostinger) must be rebuilt and
redeployed manually for any change, analytics included, to actually go live.

## Commit hygiene

Never commit `.env`, `pb_data/`, or the `pocketbase` binary.
