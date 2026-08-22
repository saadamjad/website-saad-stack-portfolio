import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Mail } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground.jsx';
const HeroSection = ({
  scrollToSection
}) => {
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1671377971962-762c386d3194?w=1600&q=60&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)'
      }} />
        <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1690509616470-25f1608a3adc?w=1600&q=60&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
        mixBlendMode: 'overlay'
      }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <ParticleBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6" style={{
          letterSpacing: '-0.02em'
        }}>
            Building scalable
            <br />
            <span className="glow-text-blue">mobile & web systems</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Full-stack engineer with 7 years of experience crafting high-performance applications for millions of users
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection('work')} className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] text-lg px-8">
              View work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] text-lg px-8">
              <Mail className="mr-2 w-5 h-5" />
              Contact me
            </Button>

            <Button asChild size="lg" variant="outline" className="border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] text-lg px-8">
              <a href="https://github.com/saadamjad" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-5 h-5" />
                View GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>;
};
export default HeroSection;