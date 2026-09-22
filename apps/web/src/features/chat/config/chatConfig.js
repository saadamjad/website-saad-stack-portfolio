const API_BASE = import.meta.env.VITE_CHAT_API_BASE || '/hcgi/platform/chat';

export default {
  apiBase: API_BASE,
  maxMessageLength: 2000,
  historyLimit: 20,
  placeholder: "Ask about experience, projects, or hiring…",
  welcomeMessage:
    "Hi — I'm Saad's personal assistant. I can tell you about his experience, the work he's shipped, and how to get in touch. Ask anything you're curious about.",
  agentDisplayName: "Saad's AI Assistant",
  agentSubtitle: "Experience, projects, and hiring",
  avatarUrl: '/saad-assistant.jpg',
  sessionStorageKey: 'portfolio_chat_session_id',
  panelDismissedKey: 'portfolio_chat_panel_dismissed',
  openOnLoad: true,
  openDelayMs: 500,
  enabled: true,
};
