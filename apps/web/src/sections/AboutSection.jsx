import React from 'react';
const AboutSection = () => {
  return <section id="about" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About <span className="text-primary">me</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
            The short version
          </p>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              I'm a full-stack software engineer with 7+ years of experience shipping products across the stack: TypeScript and React on the web, Node.js and AWS on the backend, and, more and more, AI agent systems. I started out as a React Native specialist, and mobile is still where I'm strongest on the frontend.
            </p>

            <p>
              Today I'm a Founding Engineer at <strong className="text-foreground">ZIZKA AI</strong>, building <strong className="text-foreground">ZizkaDB</strong>, an open-source operational database for AI agents. I own both the frontend and the backend. I also build my own agents, like the LangChain-based assistant you can chat with on this site.
            </p>

            <p>
              Before that, I spent nearly three years at <strong className="text-foreground">Washmen</strong> in Dubai on the customer app. I built React and React Native features and PWAs embedded inside <strong className="text-foreground">Careem</strong>, <strong className="text-foreground">InstaShop</strong> and <strong className="text-foreground">RIZEK</strong>, serving more than a million users with real-time order flows and payments. On the backend I designed event-driven services with Node.js, Sails.js and AWS Lambda, SQS and SNS.
            </p>

            <p>
              Earlier in my career I took Hao from MVP to the App Store and Google Play and kept it 99.2% crash-free for over two years. I care about software that is fast for users and easy for the next engineer to change.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;