import { cn } from '@/lib/utils';
import { Fragment, memo, useEffect, useRef, useState } from 'react';

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

// Chat replies are plain text (no markdown rendering), but URLs should still be
// clickable rather than inert text — this splits on URLs and wraps just those
// segments in real anchors, leaving everything else as plain text.
//
// text.split() with a capturing group alternates: [text, match, text, match, ...],
// so odd indices are always the captured URLs — no need to re-test each part
// (re-testing with a global regex's stateful .test() would misfire anyway).
function linkifyText(text) {
  const parts = text.split(URL_PATTERN);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-primary break-all"
      >
        {part}
      </a>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}

// Backend responses are fully buffered (no real token streaming — see chat
// architecture notes), so this reveals the finished reply progressively on
// the client to soften the "dead wait then everything appears" feel.
const REVEAL_CHARS_PER_TICK = 3;
const REVEAL_INTERVAL_MS = 12;

function useTypewriter(text, enabled) {
  const [visibleChars, setVisibleChars] = useState(enabled ? 0 : text.length);
  const indexRef = useRef(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      setVisibleChars(text.length);
      return undefined;
    }
    indexRef.current = 0;
    setVisibleChars(0);
    const id = setInterval(() => {
      indexRef.current = Math.min(indexRef.current + REVEAL_CHARS_PER_TICK, text.length);
      setVisibleChars(indexRef.current);
      if (indexRef.current >= text.length) {
        clearInterval(id);
      }
    }, REVEAL_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled]);

  return text.slice(0, visibleChars);
}

function ChatMessageBubble({ role, content, status, simulated, animate }) {
  const isUser = role === 'user';
  const displayedContent = useTypewriter(content || '', Boolean(animate) && !isUser);

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card border border-border/60 text-foreground rounded-bl-md',
          status === 'error' && 'border-destructive/50 text-destructive-foreground bg-destructive/10'
        )}
      >
        {linkifyText(displayedContent)}
        {!isUser && simulated && (
          <div className="mt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground/70">
            Limited mode — smart assistant unavailable
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ChatMessageBubble);
