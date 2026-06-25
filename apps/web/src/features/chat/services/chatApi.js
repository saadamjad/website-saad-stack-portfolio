import chatConfig from '@/features/chat/config/chatConfig';

function formatApiError(detail, fallback) {
  if (typeof detail === 'string') return detail;
  if (detail && typeof detail === 'object' && detail.error) return detail.error;
  return fallback;
}

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(formatApiError(data.error || data.detail, `Request failed (${res.status})`));
  }
  return data;
}

export async function fetchChatHealth() {
  const res = await fetch(`${chatConfig.apiBase}/health`);
  return parseJson(res);
}

export async function sendChatMessage(sessionId, message) {
  const res = await fetch(chatConfig.apiBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  });
  return parseJson(res);
}

export async function fetchChatHistory(sessionId) {
  const params = new URLSearchParams({
    sessionId,
    limit: String(chatConfig.historyLimit),
  });
  const res = await fetch(`${chatConfig.apiBase}/history?${params}`);
  return parseJson(res);
}
