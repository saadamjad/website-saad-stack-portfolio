import Footer from '@/components/Footer.jsx';
import Header from '@/components/Header.jsx';
import { Toaster } from '@/components/ui/sonner';
import { ChatWidget } from '@/features/chat';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';
import AIProjectsSection from '@/sections/AIProjectsSection.jsx';
import CredentialsSection from '@/sections/CredentialsSection.jsx';
import IntroVideoSection, { getEmbed } from '@/sections/IntroVideoSection.jsx';
import OpenSourceSection from '@/sections/OpenSourceSection.jsx';
import WritingSection from '@/sections/WritingSection.jsx';
import { aiProjects, achievements, blog, blogPosts, certifications, introVideo, openSource, published } from '@/data/profile';
import AboutSection from '@/sections/AboutSection.jsx';
import ClientsSection from '@/sections/ClientsSection.jsx';
import ContactSection from '@/sections/ContactSection.jsx';
import ExperienceSection from '@/sections/ExperienceSection.jsx';
import HeroSection from '@/sections/HeroSection.jsx';
import PortfolioSection from '@/sections/PortfolioSection.jsx';
import ReviewsSection from '@/sections/ReviewsSection.jsx';
import ServicesSection from '@/sections/ServicesSection.jsx';
import TechStackSection from '@/sections/TechStackSection.jsx';
import { Helmet } from 'react-helmet';

const hasSection = {
  intro: Boolean(getEmbed(introVideo.url)),
  ai: published(aiProjects).length > 0,
  'open-source': published(openSource).length > 0,
  writing: published(blogPosts).length > 0,
  credentials: published(certifications).length + published(achievements).length > 0,
};

const sectionIds = [
  'hero', 'intro', 'about', 'experience', 'ai', 'work', 'open-source', 'writing',
  'tech-stack', 'services', 'credentials', 'reviews', 'contact',
].filter((id) => hasSection[id] !== false);

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Saad Amjad',
  jobTitle: 'Founding Engineer',
  worksFor: { '@type': 'Organization', name: 'ZIZKA AI' },
  sameAs: [
    'https://github.com/saadamjad',
    'https://www.linkedin.com/in/saad-amjad-0b398116b/',
    blog.profileUrl,
  ].filter(Boolean),
};

function App() {
  const { activeSection, scrollToSection } = useScrollNavigation(sectionIds);

  return (
    <>
      <Helmet>
        <title>Saad Amjad - Senior Full-Stack Engineer | Mobile & Web Systems</title>
        <meta
          name="description"
          content="Founding engineer at ZIZKA AI and senior full-stack engineer with 7 years of experience building scalable mobile, web and AI agent systems. React Native, Node.js, cloud infrastructure and open source."
        />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header sectionIds={sectionIds} activeSection={activeSection} scrollToSection={scrollToSection} />

        <main>
          <HeroSection scrollToSection={scrollToSection} hasIntro={hasSection.intro} />
          <IntroVideoSection />
          <AboutSection />
          <ExperienceSection />
          <AIProjectsSection />
          <PortfolioSection />
          <OpenSourceSection />
          <WritingSection />
          <TechStackSection />
          <ServicesSection />
          <CredentialsSection />
          <ClientsSection />
          <ReviewsSection />
          <ContactSection />
        </main>

        <Footer scrollToSection={scrollToSection} />
        <ChatWidget />
        <Toaster />
      </div>
    </>
  );
}

export default App;
