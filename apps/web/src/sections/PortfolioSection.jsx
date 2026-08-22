import React from 'react';
import ProjectCard from '@/components/ProjectCard.jsx';

const PortfolioSection = () => {
  const projects = [
    {
      title: 'Washmen Dubai',
      description: 'Washmen is the UAE\'s leading app-based laundry, dry cleaning, ShoeCare, and Bag Care service. Book pickup in minutes and enjoy fast, professional laundry.',
      techStack: ['React Native', 'Sails.js', 'AWS Lambda', 'SQS', 'SNS'],
      impact: 'https://apps.apple.com/pk/app/washmen-the-finery/id1037965236'
    },
    {
      title: 'PWA Careem',
      description: 'Built PWA integration enabling order placement and payments within Careem.',
      techStack: ['React Native', 'Sails.js', 'AWS', 'Redis'],
      impact: 'https://careem.washmen.com'
    },
    {
      title: 'Retailo B2B Marketplace — KSA & UAE startup',
      description: 'Retailo is a rapidly growing B2B marketplace and digital distribution platform designed to streamline the retail supply chain across the MENAP (Middle East, North Africa, Afghanistan, and Pakistan) region',
      techStack: ['React Native', 'Express', 'MongoDB', 'Redis', 'Docker'],
      impact:'https://apps.apple.com/pk/app/retailo-b2b-retailer-app/id1607963433'
    },
    {
      title: 'Hao — B2C service app, Riyadh KSA startup',
      description: 'Founded in 2018, Hao Saudi is a digital platform dedicated to redefining how people spend their free time in Saudi Arabia. It serves as a marketplace for local "experiences," aiming to eliminate boredom by connecting users with unique activities.',
      techStack: ['React Native', 'Node.js', 'AWS'],
      impact: 'https://apps.apple.com/pk/app/hao/id1589763997'
    },
    {
      title: 'Sitgo Ride-Hailing App',
      description: 'Sitgo Travels (often referred to as Sitgo) is a transport company based in Pakistan that specializes in app-based intercity ride-booking.',
      techStack: ['React Native', 'Node.js', 'AWS Lambda', 'SQS'],
      impact: 'https://apkpure.com/sitgo/com.hexagonal.sitgouser'
    },
    {
      title: 'TheGestor Fintech',
      description: 'TheGestor was a cloud-based fintech platform specifically designed to simplify billing, accounting, and taxation for freelancers and small-to-medium enterprises (SMEs).',
      techStack: ['React Native', 'Node.js', 'AWS Lambda', 'SQS'],
      impact: 'https://www.crunchbase.com/organization/thegestor'
    }
  ];

  return (
    <section id="work" className="py-24 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured <span className="text-primary">work</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          Real-world projects that demonstrate scalability and impact
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;