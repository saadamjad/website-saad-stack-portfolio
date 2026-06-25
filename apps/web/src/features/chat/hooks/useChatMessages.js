import chatConfig from '@/features/chat/config/chatConfig';
import { fetchChatHistory, sendChatMessage } from '@/features/chat/services/chatApi';
import { useCallback, useEffect, useState } from 'react';

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useChatMessages(sessionId) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: chatConfig.welcomeMessage,
      status: 'sent',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setIsHydrating(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await fetchChatHistory(sessionId);
        if (cancelled) return;
        if (data.messages && data.messages.length > 0) {
          setMessages(
            data.messages.map((m) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              status: 'sent',
              timestamp: m.timestamp,
            }))
          );
        }
      } catch {
        // Keep welcome message on history failure
      } finally {
        if (!cancelled) setIsHydrating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || !sessionId) return;

      setError(null);
      const userMsg = {
        id: makeId('user'),
        role: 'user',
        content: trimmed,
        status: 'sent',
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const data = await sendChatMessage(sessionId, trimmed);
        setMessages((prev) => [
          ...prev,
          {
            id: data.messageId || makeId('assistant'),
            role: 'assistant',
            content: data.reply,
            status: 'sent',
            simulated: data.simulated,
          },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message');
        setMessages((prev) => [
          ...prev,
          {
            id: makeId('error'),
            role: 'assistant',
            content: "Sorry, I couldn't respond right now. Please try again.",
            status: 'error',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    isHydrating,
    error,
    sendMessage,
    clearError,
  };
}
