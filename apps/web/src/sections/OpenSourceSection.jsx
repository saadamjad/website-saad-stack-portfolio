import React from 'react';
import { GitPullRequest, Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading.jsx';
import { openSource, published } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';

const OpenSourceSection = () => {
  const items = published(openSource);
  if (!items.length) return null;

  return (
    <section id="open-source" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Open" accent="source" subtitle="Contributions to tools and projects the community depends on" />
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('oss_click', { project: item.project })}
                className="group flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-smooth"
              >
                <GitPullRequest className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold break-all group-hover:text-primary transition-colors">{item.project}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.role}</span>
                  </div>
                  <p className="text-muted-foreground mt-1">{item.description}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-primary shrink-0" />
              </a>
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <a href="https://github.com/saadamjad" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
            <Github className="w-5 h-5" /> More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
