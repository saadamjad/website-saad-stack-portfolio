import React from 'react';
import { Smartphone, Globe, Server, Zap, Cloud, Bot } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const ServicesSection = () => {
  const services = [{
    title: 'AI Agents & LLM Integration',
    description: 'Tool-using agents, RAG pipelines and LLM features built into real products, plus the data infrastructure behind them.',
    icon: Bot,
    color: 'text-primary'
  }, {
    title: 'Full-Stack Web Development',
    description: 'Scalable web applications built with React, TypeScript and Node.js, from polished interfaces to production APIs.',
    icon: Globe,
    color: 'text-accent'
  }, {
    title: 'Backend Architecture',
    description: 'Event-driven microservices and serverless APIs on AWS Lambda, SQS and SNS, built with Node.js.',
    icon: Server,
    color: 'text-primary'
  }, {
    title: 'Performance Optimization',
    description: 'Audits and fixes for web and mobile apps: faster load times, smoother frame rates, fewer crashes.',
    icon: Zap,
    color: 'text-accent'
  }, {
    title: 'Mobile App Development',
    description: 'iOS and Android apps with React Native, my original specialty: smooth animations, offline support and complex integrations.',
    icon: Smartphone,
    color: 'text-primary'
  }, {
    title: 'Cloud Infrastructure',
    description: 'Scalable infrastructure on AWS with automated CI/CD pipelines.',
    icon: Cloud,
    color: 'text-accent'
  }];
  return <section id="services" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          What I <span className="text-primary">do</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          End-to-end engineering, from AI agents and APIs to the apps people use
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => <Card key={index} className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-smooth hover:shadow-premium-lg hover:-translate-y-1 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-smooth">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl leading-snug mb-2 group-hover:text-primary transition-smooth">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default ServicesSection;