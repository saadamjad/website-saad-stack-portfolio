import { Button } from '@/components/ui/button';
import { AlertCircle, X } from 'lucide-react';

export default function ChatErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      className="mx-4 mb-2 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground"
      role="alert"
    >
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
}
