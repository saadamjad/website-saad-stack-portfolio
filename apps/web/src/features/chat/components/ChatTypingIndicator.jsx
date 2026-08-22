export default function ChatTypingIndicator() {
  return (
    <div className="flex justify-start" role="status" aria-label="Assistant is typing">
      <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:0ms]" aria-hidden="true" />
        <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:150ms]" aria-hidden="true" />
        <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:300ms]" aria-hidden="true" />
      </div>
    </div>
  );
}
