import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/sonner';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/sections/HeroSection.jsx';
import AboutSection from '@/sections/AboutSection.jsx';
import ExperienceSection from '@/sections/ExperienceSection.jsx';
import TechStackSection from '@/sections/TechStackSection.jsx';
import ServicesSection from '@/sections/ServicesSection.jsx';
import PortfolioSection from '@/sections/PortfolioSection.jsx';
import ClientsSection from '@/sections/ClientsSection.jsx';
import VideoSection from '@/sections/VideoSection.jsx';
import ReviewsSection from '@/sections/ReviewsSection.jsx';
import FAQSection from '@/sections/FAQSection.jsx';
import CTASection from '@/sections/CTASection.jsx';
import ContactSection from '@/sections/ContactSection.jsx';

function App() {
  const sectionIds = ['hero', 'about', 'experience', 'tech-stack', 'services', 'work', 'video', 'reviews', 'faq', 'contact'];
  const { activeSection, scrollToSection } = useScrollNavigation(sectionIds);

  return (
    <>
      <Helmet>
        <title>Saad - Senior Full-Stack Engineer | Mobile & Web Systems</title>
        <meta 
          name="description" 
          content="Senior full-stack engineer with 7 years of experience building scalable mobile and web applications. Specialized in React Native, Node.js, and cloud infrastructure." 
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <main>
          <HeroSection scrollToSection={scrollToSection} />
          <AboutSection />
          <ExperienceSection />
          <TechStackSection />
          <ServicesSection />
          <PortfolioSection />
          <ClientsSection />
          // <VideoSection />
          // <ReviewsSection />
          // <FAQSection />
          // <CTASection />
          // <ContactSection />
        </main>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;