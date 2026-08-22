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
          <h2 className="text-4xl md:text-5xl font-bold">
            Client <span className="text-primary">reviews</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white p-3 sm:p-5 shadow-premium-xl">
          <img
            src="/reviews/upwork-profile-header.jpg"
            alt="Client profile and availability"
            className="w-full h-auto rounded-lg"
          />
          <img
            src="/reviews/upwork-work-history.jpg"
            alt="Client review and completed work history"
            className="w-full h-auto rounded-lg mt-3"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-[#14A800] text-white hover:bg-[#108a00] transition-smooth hover:shadow-lg hover:shadow-[#14A800]/30 active:scale-[0.98]"
            asChild
          >
            <a href={UPWORK_PROFILE} target="_blank" rel="noopener noreferrer">
              View Upwork profile
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            size="lg"
            className="bg-[#1DBF73] text-white hover:bg-[#19a564] transition-smooth hover:shadow-lg hover:shadow-[#1DBF73]/30 active:scale-[0.98]"
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
