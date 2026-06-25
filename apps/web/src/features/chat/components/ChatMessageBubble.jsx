import { cn } from '@/lib/utils';

export default function ChatMessageBubble({ role, content, status }) {
  const isUser = role === 'user';

  return (
    <div
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
      role="listitem"
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card border border-border/60 text-foreground rounded-bl-md',
          status === 'error' && 'border-destructive/50 text-destructive-foreground bg-destructive/10'
        )}
      >
        {content}
      </div>
    </div>
  );
}
