import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-blue-purple opacity-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1671377971962-762c386d3194')] bg-cover bg-center mix-blend-overlay opacity-5" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
          Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">amazing?</span>
        </h2>
        <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Let's discuss your project and how I can help scale your application to the next level.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:shadow-premium-lg active:scale-[0.98] text-lg px-8 h-14"
            asChild
          >
            <a href="#contact">
              Start a Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent transition-smooth hover:shadow-premium-lg active:scale-[0.98] text-lg px-8 h-14"
            asChild
          >
            <a href="https://wa.me/923362065663" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 w-5 h-5 text-accent" />
              Schedule a Call
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;