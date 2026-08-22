const API_BASE = import.meta.env.VITE_CHAT_API_BASE || '/hcgi/platform/chat';

export default {
  apiBase: API_BASE,
  maxMessageLength: 2000,
  historyLimit: 20,
  placeholder: "Ask about experience, projects, or hiring…",
  welcomeMessage:
    "I can answer questions about Saad's experience, the work he's shipped, and how to get in touch.",
  agentDisplayName: "Saad's Assistant",
  agentSubtitle: "Experience, projects, and hiring",
  avatarUrl: '/saad-assistant.jpg',
  sessionStorageKey: 'portfolio_chat_session_id',
  panelDismissedKey: 'portfolio_chat_panel_dismissed',
  openOnLoad: true,
  openDelayMs: 500,
  enabled: true,
};
