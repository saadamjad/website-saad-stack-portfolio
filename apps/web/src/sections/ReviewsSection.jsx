import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const ReviewsSection = () => {

  return (
    <section id="reviews" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-5 text-center">
          Client <span className="text-primary">reviews</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:shadow-premium-lg active:scale-[0.98]"
            asChild
          >
            <a href="https://www.fiverr.com/saadamjad365" target="_blank" rel="noopener noreferrer">
              View Fiverr profile
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/50 hover:border-accent hover:bg-accent/10 transition-smooth hover:shadow-premium-lg active:scale-[0.98]"
            asChild
          >
            <a href="https://www.upwork.com/freelancers/~01c06b62a204fa" target="_blank" rel="noopener noreferrer">
              View Upwork profile
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;