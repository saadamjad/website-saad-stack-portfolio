import React from 'react';
import TechCard from '@/components/TechCard.jsx';
import { Smartphone, Globe, Server, Cloud, Database, TestTube, BarChart } from 'lucide-react';
const TechStackSection = () => {
  const techCategories = [{
    title: 'Mobile development',
    icon: Smartphone,
    technologies: [{
      name: 'React Native',
      icon: Smartphone
    }, {
      name: 'Expo',
      icon: Smartphone
    }, {
      name: 'iOS',
      icon: Smartphone
    }, {
      name: 'Android',
      icon: Smartphone
    }]
  }, {
    title: 'Frontend',
    icon: Globe,
    technologies: [{
      name: 'React',
      icon: Globe
    }, {
      name: 'Next.js',
      icon: Globe
    }, {
      name: 'TypeScript',
      icon: Globe
    }, {
      name: 'Tailwind CSS',
      icon: Globe
    }]
  }, {
    title: 'Backend',
    icon: Server,
    technologies: [{
      name: 'Node.js',
      icon: Server
    }, {
      name: 'Express',
      icon: Server
    }, {
      name: 'NestJS',
      icon: Server
    }, {
      name: 'Sails.js',
      icon: Server
    }]
  }, {
    title: 'Cloud & DevOps',
    icon: Cloud,
    technologies: [{
      name: 'AWS',
      icon: Cloud
    }, {
      name: 'GitHub Actions',
      icon: Cloud
    }, {
      name: 'Docker',
      icon: Cloud
    }, {
      name: 'CI/CD',
      icon: Cloud
    }]
  }, {
    title: 'Databases',
    icon: Database,
    technologies: [{
      name: 'DynamoDB',
      icon: Database
    }, {
      name: 'MongoDB',
      icon: Database
    }, {
      name: 'Redis',
      icon: Database
    }, {
      name: 'Firebase',
      icon: Database
    }]
  }, {
    title: 'Testing',
    icon: TestTube,
    technologies: [{
      name: 'Jest',
      icon: TestTube
    }, {
      name: 'Cypress',
      icon: TestTube
    }, {
      name: 'Detox',
      icon: TestTube
    }]
  }, {
    title: 'Analytics',
    icon: BarChart,
    technologies: [{
      name: 'Mixpanel',
      icon: BarChart
    }, {
      name: 'CleverTap',
      icon: BarChart
    }, {
      name: 'Google Analytics',
      icon: BarChart
    }, {
      name: 'Sentry',
      icon: BarChart
    }]
  }];
  return <section id="tech-stack" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Tech <span className="text-primary">stack</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          The tools I use to design, build, and ship production systems
        </p>

        <div className="space-y-16">
          {techCategories.map((category, categoryIndex) => <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.technologies.map((tech, techIndex) => <TechCard key={techIndex} icon={tech.icon} name={tech.name} />)}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TechStackSection;