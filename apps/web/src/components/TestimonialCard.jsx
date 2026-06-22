import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialCard = ({ text, author, role, company, rating = 5 }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-smooth hover:shadow-premium-lg h-full flex flex-col">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>
        <p className="text-foreground/90 leading-relaxed mb-6 italic flex-1">"{text}"</p>
        <div className="mt-auto pt-4 border-t border-border/50">
          <p className="text-base font-semibold text-primary">{author}</p>
          <p className="text-sm text-foreground/70">
            {role} {company && <span className="text-accent">@ {company}</span>}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;