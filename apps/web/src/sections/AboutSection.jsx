import React from 'react';
const AboutSection = () => {
  return <section id="about" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About <span className="text-primary">me</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
            How I work and the products I have shipped
          </p>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              I'm a React Native specialist with 7 years of experience building high-performance mobile apps for iOS and Android. My journey has evolved from working on solo projects to leading development efforts for large-scale platforms.
            </p>
            
            <p>
              I'm currently a Founding Engineer at ZIZKA AI, building ZizkaDB — an open-source operational database designed for AI agents. Before that, I spent nearly three years at Washmen as a Full-Stack Engineer, building and maintaining mobile and web applications using React and React Native, and developing PWAs that deliver near-native experiences for partners like Careem, InstaShop, and RIZEK — serving over 1 million active users with real-time order flows and seamless payment integrations.
            </p>

            <p>
              Alongside mobile, I build scalable backend systems using Node.js and Sails.js — designing efficient APIs, microservices, and AWS Lambda integrations that power production-grade applications.
            </p>

            <p>
              Whether it's mobile development with React Native, web applications with React, or backend services with Node.js and cloud infrastructure, I focus on writing clean, maintainable code that stands the test of time.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;