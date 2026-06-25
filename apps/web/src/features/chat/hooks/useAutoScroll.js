import { useCallback, useEffect, useRef } from 'react';

export function useAutoScroll(deps) {
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, deps);

  return { bottomRef, scrollToBottom };
}
