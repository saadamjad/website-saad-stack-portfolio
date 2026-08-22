import chatConfig from '@/features/chat/config/chatConfig';

const REQUEST_TIMEOUT_MS = 30000;

function formatApiError(detail, fallback) {
  if (typeof detail === 'string') return detail;
  if (detail && typeof detail === 'object' && detail.error) return detail.error;
  return fallback;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out — please try again.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseJson(res) {
  let data;
  let parseFailed = false;
  try {
    data = await res.json();
  } catch {
    parseFailed = true;
    data = {};
  }
  if (!res.ok) {
    throw new Error(formatApiError(data.error || data.detail, `Request failed (${res.status})`));
  }
  if (parseFailed) {
    throw new Error('Received an invalid response from the server.');
  }
  return data;
}

export async function sendChatMessage(sessionId, message) {
  const res = await fetchWithTimeout(chatConfig.apiBase, {
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
  const res = await fetchWithTimeout(`${chatConfig.apiBase}/history?${params}`);
  return parseJson(res);
}
