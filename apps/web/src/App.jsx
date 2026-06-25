import Footer from '@/components/Footer.jsx';
import Header from '@/components/Header.jsx';
import { Toaster } from '@/components/ui/sonner';
import { ChatWidget } from '@/features/chat';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';
import AboutSection from '@/sections/AboutSection.jsx';
import ClientsSection from '@/sections/ClientsSection.jsx';
import ContactSection from '@/sections/ContactSection.jsx';
import ExperienceSection from '@/sections/ExperienceSection.jsx';
import HeroSection from '@/sections/HeroSection.jsx';
import PortfolioSection from '@/sections/PortfolioSection.jsx';
import ServicesSection from '@/sections/ServicesSection.jsx';
import TechStackSection from '@/sections/TechStackSection.jsx';
import { Helmet } from 'react-helmet';

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
          <ContactSection />
        </main>

        <Footer />
        <ChatWidget />
        <Toaster />
      </div>
    </>
  );
}

export default App;
