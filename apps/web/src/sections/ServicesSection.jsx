import React from 'react';
import { Smartphone, Globe, Server, Zap, Cloud, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const ServicesSection = () => {
  const services = [{
    title: 'Mobile App Development',
    description: 'Native-quality iOS and Android applications using React Native. Focus on smooth animations, offline support, and complex integrations.',
    icon: Smartphone,
    color: 'text-primary'
  }, {
    title: 'Full-Stack Web Development',
    description: 'Scalable web applications built with React, Next.js, Node.js.',
    icon: Globe,
    color: 'text-accent'
  }, {
    title: 'Backend Architecture',
    description: 'Robust microservices and AWS Lambda–based APIs, with expertise in Node.js, Sails.js.',
    icon: Server,
    color: 'text-primary'
  }, {
    title: 'Performance Optimization',
    description: 'Deep-dive audits and optimizations for web and mobile apps. Reducing load times, improving frame rates.',
    icon: Zap,
    color: 'text-accent'
  }, {
    title: 'Cloud Infrastructure',
    description: 'Deploying and managing scalable infrastructure on AWS and automated CI/CD pipelines.',
    icon: Cloud,
    color: 'text-primary'
  }, {
    title: 'Technical Leadership',
    description: 'Consulting for startups and enterprises. Code reviews, architecture planning.',
    icon: Users,
    color: 'text-accent'
  }];
  return <section id="services" className="py-24 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          My <span className="text-primary">services</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          Comprehensive technical solutions for modern businesses
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-smooth hover:shadow-premium-lg hover:-translate-y-1 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-smooth">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-smooth">
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