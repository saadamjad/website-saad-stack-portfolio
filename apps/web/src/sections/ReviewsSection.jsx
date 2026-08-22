import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Quote, Star } from 'lucide-react';

const UPWORK_PROFILE = 'https://www.upwork.com/freelancers/~01c06b62a204fa';

const insights = ['Clear Communicator', 'Committed to Quality', 'Detail Oriented'];

const stats = [
  { value: '5.0', label: 'Latest rating' },
  { value: '4', label: 'Completed jobs' },
  { value: '60', label: 'Hours billed' },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-card/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-3">
            Verified on Upwork
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Client <span className="text-primary">reviews</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Recent client feedback from completed work — open the profile to read the full review.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-stretch">
          <article className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-8 md:p-10 flex flex-col">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="flex items-center gap-2 text-amber-400 mb-5" aria-label="5.0 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-1 text-sm font-semibold text-foreground">5.0</span>
            </div>

            <Quote className="w-8 h-8 text-primary/40 mb-4" aria-hidden="true" />
            <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90">
              “Saad came well prepared for the interview and took care to answer each question
              thoroughly. He shared valuable insights into building secure software based on his
              experience as a full-stack…”
            </blockquote>

            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="font-semibold text-foreground">
                Interview study on software supply-chain threats
              </p>
              <p className="text-sm text-muted-foreground mt-1">Jun 6 – Jun 12, 2026 · Upwork</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {insights.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {label}
                </span>
              ))}
            </div>

            <dl className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
              {stats.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <Button
              size="lg"
              className="mt-8 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:shadow-premium-lg active:scale-[0.98]"
              asChild
            >
              <a href={UPWORK_PROFILE} target="_blank" rel="noopener noreferrer">
                View full review on Upwork
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </article>

          <a
            href={UPWORK_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-border/50 bg-card/40 overflow-hidden shadow-premium-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open Saad's Upwork work history"
          >
            <img
              src="/reviews/upwork-work-history.jpg"
              alt="Upwork work history showing a 5.0 client review and completed-job insights"
              className="h-full w-full object-cover object-top min-h-[280px] lg:min-h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <span className="absolute bottom-5 left-5 right-5 inline-flex items-center justify-center gap-2 rounded-lg bg-background/85 backdrop-blur-sm border border-border/60 px-4 py-2.5 text-sm font-semibold text-foreground">
              See it on Upwork
              <ExternalLink className="w-4 h-4 text-primary" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
