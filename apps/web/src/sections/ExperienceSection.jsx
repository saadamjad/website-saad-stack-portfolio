import React from 'react';
import { Briefcase, Code2 } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      period: 'Jun 2026 - Present',
      role: 'Founding Engineer',
      company: 'ZIZKA AI, Remote',
      description: 'Building ZizkaDB, an open-source operational database designed for AI agents. Architecting both frontend and backend systems as a founding engineer.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: 'Sep 2023 - Jul 2026',
      role: 'Software Engineer, Customer App',
      company: 'Washmen, Dubai',
      description: 'Delivered end-to-end features for 1M+ user apps (Careem, InstaShop). Designed scalable microservices with AWS Lambda, SQS, and SNS, and optimized mobile performance.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: 'Mar 2023 - Aug 2023',
      role: 'React Native Engineer (Contract)',
      company: 'TekRevol, Remote',
      description: 'Delivered mobile features for Android & iOS using React Native, TypeScript, and JavaScript on scalable, production-grade apps.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: 'Jan 2022 - Apr 2023',
      role: 'Software Engineer, React Native & React.js',
      company: 'Retailo Technologies, Riyadh',
      description: 'Built frontend features for a B2B marketplace startup across the MENAP region, implementing APIs, Redux, and admin panels.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: 'Jan 2020 - Jan 2022',
      role: 'Software Engineer / React Native Developer',
      company: 'Hao Saudi, Riyadh',
      description: 'Owned the full product lifecycle from MVP to App Store and Google Play release. Maintained a 99.2% crash-free session rate over 2+ years.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: 'Jan 2020 - Jan 2022',
      role: 'Software Engineer, React Native & React.js',
      company: 'Sitgo Travels, Karachi',
      description: 'Developed mobile and web features for an intercity ride-booking app using React Native (Expo & CLI) and TypeScript.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      period: 'Jan 2019 - Dec 2020',
      role: 'Freelance React Native Developer',
      company: 'Fiverr / Upwork',
      description: 'Delivered custom React Native mobile apps for diverse international clients as a Level 1 seller, gaining experience across multiple industries.',
      icon: Code2,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    }
  ];

  return (
    <section id="experience" className="py-24 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Career <span className="text-primary">journey</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          Roles I have held and the work I owned in each one
        </p>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-accent before:to-transparent">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background ${exp.bgColor} ${exp.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-smooth group-hover:scale-110`}>
                <exp.icon className="w-4 h-4" />
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-smooth hover:shadow-premium-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-xl leading-snug text-foreground">{exp.role}</h3>
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
