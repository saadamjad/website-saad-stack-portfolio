import React from 'react';
import ProjectCard from '@/components/ProjectCard.jsx';

const PortfolioSection = () => {
  const projects = [
    {
      title: 'Washmen',
      description: 'UAE laundry and garment-care platform. Built mobile and backend features for pickup, payments, and high-volume order flows.',
      techStack: ['React Native', 'Sails.js', 'AWS Lambda', 'SQS', 'SNS'],
      impact: 'https://apps.apple.com/pk/app/washmen-the-finery/id1037965236'
    },
    {
      title: 'Careem PWA',
      description: 'Progressive web integration that lets Careem users place Washmen orders and complete payments without leaving the app.',
      techStack: ['React Native', 'Sails.js', 'AWS', 'Redis'],
      impact: 'https://careem.washmen.com'
    },
    {
      title: 'Retailo',
      description: 'B2B marketplace and digital distribution platform for retailers across the MENAP region.',
      techStack: ['React Native', 'Express', 'MongoDB', 'Redis', 'Docker'],
      impact: 'https://apps.apple.com/pk/app/retailo-b2b-retailer-app/id1607963433'
    },
    {
      title: 'Hao',
      description: 'Riyadh marketplace for local experiences — connecting people with activities across Saudi Arabia.',
      techStack: ['React Native', 'Node.js', 'AWS'],
      impact: 'https://apps.apple.com/pk/app/hao/id1589763997'
    },
    {
      title: 'Sitgo',
      description: 'Pakistan intercity ride-booking app covering mobile and web booking flows.',
      techStack: ['React Native', 'Node.js', 'AWS Lambda', 'SQS'],
      impact: 'https://apkpure.com/sitgo/com.hexagonal.sitgouser'
    },
    {
      title: 'TheGestor',
      description: 'Cloud fintech platform for freelancer and SME billing, accounting, and taxation.',
      techStack: ['React Native', 'Node.js', 'AWS Lambda', 'SQS'],
      impact: 'https://www.crunchbase.com/organization/thegestor'
    }
  ];

  return (
    <section id="work" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured <span className="text-primary">work</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          Production products I have built and shipped
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