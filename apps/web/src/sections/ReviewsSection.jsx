import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const UPWORK_PROFILE = 'https://www.upwork.com/freelancers/~01c06b62a204fa';
const FIVERR_PROFILE = 'https://www.fiverr.com/saadamjad365';

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Client <span className="text-primary">reviews</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          What freelance clients said about working with me
        </p>

        <div className="rounded-2xl border border-border/60 bg-white p-3 sm:p-5 shadow-premium-xl">
          <div className="flex flex-col gap-3">
            <img
              src="/reviews/upwork-profile-header.jpg"
              alt="Saad Amjad's verified Upwork profile, based in Karachi and available now"
              className="w-full h-auto rounded-lg"
            />
            <img
              src="/reviews/upwork-work-history.jpg"
              alt="Upwork work history: four completed jobs and a 5.0-star review praising Saad's full-stack experience"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto sm:min-w-[13.5rem] bg-[#14A800] text-white hover:bg-[#108a00] transition-smooth hover:shadow-lg hover:shadow-[#14A800]/30 active:scale-[0.98]"
            asChild
          >
            <a href={UPWORK_PROFILE} target="_blank" rel="noopener noreferrer">
              View Upwork profile
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto sm:min-w-[13.5rem] bg-[#1DBF73] text-white hover:bg-[#19a564] transition-smooth hover:shadow-lg hover:shadow-[#1DBF73]/30 active:scale-[0.98]"
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
