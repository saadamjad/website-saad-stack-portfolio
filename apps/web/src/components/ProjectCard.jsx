import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ title, description, techStack, impact }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 group h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-secondary/50 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-200"
            >
              {tech}
            </Badge>
          ))}
        </div>
        {impact && (
          <div className="mt-auto pt-4 border-t border-border/50">
            <p className="text-sm font-semibold text-primary">{impact}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;