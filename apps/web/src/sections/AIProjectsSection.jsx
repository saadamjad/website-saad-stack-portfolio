import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionHeading from '@/components/SectionHeading.jsx';
import { aiProjects, published } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';

const statusStyles = {
  Live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Building: 'bg-primary/15 text-primary border-primary/30',
  Research: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

const AIProjectsSection = () => {
  const projects = published(aiProjects);
  if (!projects.length) return null;

  return (
    <section id="ai" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Building with" accent="AI agents" subtitle="What I'm building now at the edge of agents, LLMs and data infrastructure" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Card key={p.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-smooth hover:shadow-premium-lg hover:-translate-y-1 group h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-300">{p.title}</CardTitle>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[p.status] || statusStyles.Building}`}>{p.status}</span>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-secondary/50 text-secondary-foreground">{t}</Badge>
                  ))}
                </div>
                {(p.repo || p.demo) && (
                  <div className="mt-auto pt-4 border-t border-border/50 flex gap-4">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('ai_project_click', { title: p.title, kind: 'repo' })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('ai_project_click', { title: p.title, kind: 'demo' })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                        Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIProjectsSection;
