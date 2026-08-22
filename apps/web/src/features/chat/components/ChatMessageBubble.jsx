import { cn } from '@/lib/utils';
import { Fragment, memo, useEffect, useRef, useState } from 'react';

const URL_PATTERN = /https?:\/\/[^\s]+/g;
// Sentence punctuation that commonly follows a URL with no space before it
// ("...see https://saadstack.com.") — [^\s]+ above has no way to know where
// the URL actually ends, so it swallows this into the match. Stripped back
// out of the link and re-attached as plain text after it.
const TRAILING_PUNCTUATION = /[).,;:!?'"\]}]+$/;

// Chat replies are plain text (no markdown rendering), but URLs should still be
// clickable rather than inert text — this finds URLs and wraps just those
// segments in real anchors, leaving everything else (including any trailing
// punctuation trimmed off a match) as plain text.
function linkifyText(text) {
  const nodes = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    let url = match[0];
    const trailingMatch = url.match(TRAILING_PUNCTUATION);
    const trailing = trailingMatch ? trailingMatch[0] : '';
    if (trailing) {
      url = url.slice(0, url.length - trailing.length);
    }
    if (!url) continue; // whole "match" was punctuation — nothing to link

    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    nodes.push(
      <a
        key={key++}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-primary break-all"
      >
        {url}
      </a>
    );
    if (trailing) {
      nodes.push(<Fragment key={key++}>{trailing}</Fragment>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
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
