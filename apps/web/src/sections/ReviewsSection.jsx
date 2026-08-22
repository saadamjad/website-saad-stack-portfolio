import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const UPWORK_PROFILE = 'https://www.upwork.com/freelancers/~01c06b62a204fa';
const FIVERR_PROFILE = 'https://www.fiverr.com/saadamjad365';

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-card/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-3">
            Verified on Upwork
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Client <span className="text-primary">reviews</span>
          </h2>
        </div>

        <a
          href={UPWORK_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-border/60 bg-white p-3 sm:p-5 shadow-premium-xl hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open Saad's Upwork profile"
        >
          <img
            src="/reviews/upwork-profile-header.jpg"
            alt="Saad A. on Upwork — verified, Karachi, available now"
            className="w-full h-auto rounded-lg"
          />
          <img
            src="/reviews/upwork-work-history.jpg"
            alt="Upwork work history with a 5.0 client review and completed-job insights"
            className="w-full h-auto rounded-lg mt-3"
          />
        </a>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:shadow-premium-lg active:scale-[0.98]"
            asChild
          >
            <a href={UPWORK_PROFILE} target="_blank" rel="noopener noreferrer">
              View Upwork profile
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            size="lg"
            className="border-2 border-primary bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth hover:shadow-premium-lg active:scale-[0.98]"
            asChild
          >
            <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer">
              View Fiverr profile
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
