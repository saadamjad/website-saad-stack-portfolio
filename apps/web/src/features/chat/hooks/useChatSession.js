import chatConfig from '@/features/chat/config/chatConfig';
import { useMemo } from 'react';

function createSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useChatSession() {
  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return '';
    let id = sessionStorage.getItem(chatConfig.sessionStorageKey);
    if (!id) {
      id = createSessionId();
      sessionStorage.setItem(chatConfig.sessionStorageKey, id);
    }
    return id;
  }, []);

  return { sessionId };
}
