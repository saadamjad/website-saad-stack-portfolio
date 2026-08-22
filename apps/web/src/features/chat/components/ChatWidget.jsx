import { Button } from '@/components/ui/button';
import ChatErrorBanner from '@/features/chat/components/ChatErrorBanner';
import ChatInput from '@/features/chat/components/ChatInput';
import ChatMessageList from '@/features/chat/components/ChatMessageList';
import chatConfig from '@/features/chat/config/chatConfig';
import { useAutoScroll } from '@/features/chat/hooks/useAutoScroll';
import { useChatMessages } from '@/features/chat/hooks/useChatMessages';
import { useChatSession } from '@/features/chat/hooks/useChatSession';
import { MessageCircle, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

function wasDismissedThisSession() {
  try {
    return sessionStorage.getItem(chatConfig.panelDismissedKey) === '1';
  } catch {
    return false;
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  // The FAB button unmounts while the panel is open (see the `{!open && ...}`
  // guard below), so a ref pointing at it would already be null by the time
  // close() runs. Capturing document.activeElement instead survives that.
  const previousFocusRef = useRef(null);
  const { sessionId } = useChatSession();
  const { messages, isLoading, isHydrating, error, sendMessage, clearError } =
    useChatMessages(sessionId);
  const { bottomRef } = useAutoScroll([messages, isLoading, open]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(chatConfig.panelDismissedKey, '1');
    } catch {
      // ignore private browsing / storage errors
    }
    previousFocusRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!chatConfig.openOnLoad || wasDismissedThisSession()) return;
    const timer = window.setTimeout(() => setOpen(true), chatConfig.openDelayMs ?? 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  // Move focus into the dialog when it opens (so keyboard/screen-reader
  // users land directly on the message input instead of focus staying on
  // whatever was behind the now-covered page), and remember what was
  // focused beforehand so close() can restore it.
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement;
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!chatConfig.enabled) return null;

  return (
    <>
      {!open && (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg shadow-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:bg-black/10"
            aria-label="Close chat"
            onClick={close}
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-widget-heading"
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 bottom-6 right-6 w-[min(380px,calc(100vw-3rem))] h-[min(560px,70vh)] max-sm:bottom-4 max-sm:right-4 max-sm:h-[min(520px,65vh)]"
          >
            <header className="flex shrink-0 items-start justify-between gap-2 border-b border-border/60 px-4 py-3">
              <div className="min-w-0 pr-2">
                <h2 id="chat-widget-heading" className="text-base font-semibold text-left leading-tight">
                  {chatConfig.agentDisplayName}
                </h2>
                <p className="text-xs text-muted-foreground text-left font-normal mt-0.5">
                  Education · career · projects · HR &amp; interview info
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={close}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            <ChatErrorBanner message={error} onDismiss={clearError} />

            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              isHydrating={isHydrating}
              bottomRef={bottomRef}
            />

            <ChatInput ref={inputRef} onSend={sendMessage} isLoading={isLoading} disabled={!sessionId} />
          </div>
        </>
      )}
    </>
  );
}
