import React from 'react';
import { Award, Trophy, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading.jsx';
import { certifications, achievements, published } from '@/data/profile';

const Column = ({ icon: Icon, heading, children }) => (
  <div>
    <h3 className="flex items-center gap-2 text-xl font-bold mb-6">
      <Icon className="w-5 h-5 text-primary" /> {heading}
    </h3>
    <ul className="space-y-4">{children}</ul>
  </div>
);

const CredentialsSection = () => {
  const certs = published(certifications);
  const wins = published(achievements);
  if (!certs.length && !wins.length) return null;

  return (
    <section id="credentials" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Credentials &" accent="achievements" subtitle="Certifications and results I'm proud of" />
        <div className={`grid grid-cols-1 gap-12 ${certs.length && wins.length ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
          {wins.length > 0 && (
            <Column icon={Trophy} heading="Achievements">
              {wins.map((a) => (
                <li key={a.title} className="p-5 rounded-xl border border-border/50 bg-card/50">
                  <div className="font-bold text-primary">{a.title}</div>
                  <p className="text-muted-foreground mt-1">{a.description}</p>
                </li>
              ))}
            </Column>
          )}
          {certs.length > 0 && (
            <Column icon={Award} heading="Certifications">
              {certs.map((c) => (
                <li key={c.name} className="p-5 rounded-xl border border-border/50 bg-card/50 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold">{c.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{c.issuer}{c.date && ` · ${c.date}`}</div>
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline shrink-0">
                      Verify <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </li>
              ))}
            </Column>
          )}
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
