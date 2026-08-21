const API_BASE = import.meta.env.VITE_CHAT_API_BASE || '/hcgi/platform/chat';

export default {
  apiBase: API_BASE,
  maxMessageLength: 2000,
  historyLimit: 20,
  placeholder: "Ask about Saad's education, career, projects, hobbies, travel, or hiring…",
  welcomeMessage:
    "Welcome! I'm an AI assistant that can answer questions about Saad's professional background, experience, projects, technical expertise, and how to connect with him.",
  agentDisplayName: "Saad's Representative",
  sessionStorageKey: 'portfolio_chat_session_id',
  panelDismissedKey: 'portfolio_chat_panel_dismissed',
  openOnLoad: true,
  openDelayMs: 500,
  enabled: true,
};
