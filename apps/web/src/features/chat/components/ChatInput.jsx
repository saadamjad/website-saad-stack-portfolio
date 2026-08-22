import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import chatConfig from '@/features/chat/config/chatConfig';
import { Loader2, Send } from 'lucide-react';
import { forwardRef, useState } from 'react';

const ChatInput = forwardRef(function ChatInput({ onSend, disabled, isLoading }, ref) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled || isLoading) return;
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border/60 p-3 bg-background/95 backdrop-blur shrink-0"
    >
      <div className="flex gap-2 items-end">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={chatConfig.placeholder}
          disabled={disabled || isLoading}
          maxLength={chatConfig.maxMessageLength}
          rows={2}
          className="min-h-[44px] max-h-28 resize-none bg-card/50 border-border/50 text-sm"
          aria-label="Message input"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || isLoading || !value.trim()}
          className="shrink-0 h-11 w-11 bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </form>
  );
});

export default ChatInput;
