import React from 'react';
import { Button } from '@/components/ui/button';

const SocialLink = ({ icon: Icon, href, label }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
      asChild
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon className="w-5 h-5" />
      </a>
    </Button>
  );
};

export default SocialLink;