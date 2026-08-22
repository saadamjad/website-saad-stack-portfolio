import ChatMessageBubble from '@/features/chat/components/ChatMessageBubble';
import ChatTypingIndicator from '@/features/chat/components/ChatTypingIndicator';

export default function ChatMessageList({ messages, isLoading, bottomRef, isHydrating }) {
  return (
    <div
      className="chat-transcript flex-1 overflow-y-auto overscroll-y-contain px-4 py-3 space-y-3 min-h-0"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {isHydrating && (
        <p className="text-xs text-muted-foreground text-center py-2">Loading conversation…</p>
      )}
      {messages.map((msg) => (
        <ChatMessageBubble
          key={msg.id}
          role={msg.role}
          content={msg.content}
          status={msg.status}
          simulated={msg.simulated}
          animate={msg.animate}
        />
      ))}
      {isLoading && <ChatTypingIndicator />}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
