import React from 'react';
import { Briefcase, Code2 } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      period: '2023 - Present',
      role: 'Senior React Native & Full-Stack Engineer',
      company: 'Washmen, Dubai',
      description: 'Leading development for 1M+ user apps (Careem, InstaShop, RIZEK). Architecting scalable microservices and optimizing mobile performance.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: '2018 - 2022',
      role: 'Freelance React Native Developer',
      company: 'Fiverr / Upwork',
      description: 'Built 10+ apps for international clients. Specialized in cross-platform mobile development, API integrations, and UI/UX implementation.',
      icon: Code2,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    }
  ];

  return (
    <section id="experience" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Career <span className="text-primary">journey</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center">
          My professional experience over the years
        </p>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-accent before:to-transparent">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background ${exp.bgColor} ${exp.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-smooth group-hover:scale-110`}>
                <exp.icon className="w-4 h-4" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-smooth hover:shadow-premium-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-xl text-foreground">{exp.role}</h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${exp.bgColor} ${exp.color} w-fit`}>
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-foreground/80 mb-4">{exp.company}</h4>
                <p className="text-foreground/70 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;