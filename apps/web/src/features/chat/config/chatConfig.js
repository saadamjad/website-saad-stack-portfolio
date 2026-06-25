const API_BASE = '/hcgi/platform/chat';

export default {
  apiBase: API_BASE,
  maxMessageLength: 2000,
  historyLimit: 20,
  placeholder: "Ask about Saad's education, career, projects, hobbies, travel, or hiring…",
  welcomeMessage:
    "Hello! I'm Saad's personal representative — here for visitors, recruiters, and interviewers. Ask about his education, career timeline, projects, skills, hobbies, countries visited, or how to get in touch.",
  agentDisplayName: "Saad's Representative",
  sessionStorageKey: 'portfolio_chat_session_id',
  panelDismissedKey: 'portfolio_chat_panel_dismissed',
  openOnLoad: true,
  openDelayMs: 500,
  enabled: true,
};
