import React from 'react';
import { Card } from '@/components/ui/card';

const TechCard = ({ icon: Icon, name }) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group">
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground/90">{name}</span>
      </div>
    </Card>
  );
};

export default TechCard;