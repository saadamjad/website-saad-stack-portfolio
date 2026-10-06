import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Play } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground.jsx';
const stats = [
  { value: '7+', label: 'years shipping' },
  { value: '1M+', label: 'users served' },
  { value: '6', label: 'production apps' },
];
const HeroSection = ({
  scrollToSection,
  hasIntro
}) => {
  return <section id="hero" className="relative min-h-[100svh] scroll-mt-20 flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="animate-fade-in">
          <p className="inline-flex flex-wrap items-center justify-center gap-x-2 px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-foreground/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            M. Saad Amjad · Founding Engineer @ ZIZKA AI
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6" style={{
          letterSpacing: '-0.02em'
        }}>
            Full-stack engineer
            <br />
            <span className="glow-text-blue">building for the AI era</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            I design and ship AI agent infrastructure, scalable backends and web and mobile products, end to end
          </p>

          <dl className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10">
            {stats.map(stat => <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-bold text-primary">{stat.value}</dd>
                <dd className="text-sm text-foreground/60">{stat.label}</dd>
              </div>)}
          </dl>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection('work')} className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] text-lg px-8 min-w-[12.5rem]">
              View work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {hasIntro && <Button size="lg" onClick={() => scrollToSection('intro')} className="h-12 border-2 border-primary bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] text-lg px-8 min-w-[12.5rem]">
                <Play className="mr-2 w-5 h-5" />
                Watch intro
              </Button>}
            
            <Button asChild size="lg" className="h-12 border-2 border-primary bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] text-lg px-8 min-w-[12.5rem]">
              <a href="https://www.linkedin.com/in/saad-amjad-0b398116b/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 w-5 h-5" />
                LinkedIn
              </a>
            </Button>

            <Button asChild size="lg" className="h-12 border-2 border-primary bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] text-lg px-8 min-w-[12.5rem]">
              <a href="https://github.com/saadamjad" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-5 h-5" />
                GitHub
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