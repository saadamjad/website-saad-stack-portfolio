import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Header = ({
  activeSection,
  scrollToSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    id: 'hero',
    label: 'Home'
  }, {
    id: 'about',
    label: 'About'
  }, {
    id: 'tech-stack',
    label: 'Tech Stack'
  }, {
    id: 'work',
    label: 'Work'
  }, {
    id: 'reviews',
    label: 'Reviews'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  const socialLinks = [{
    icon: Github,
    href: 'https://github.com/saadamjad',
    label: 'GitHub'
  }, {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/saad-amjad-0b398116b/',
    label: 'LinkedIn'
  }, {
    icon: MessageCircle,
    href: 'https://wa.me/923362065663',
    label: 'WhatsApp'
  }];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = sectionId => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-primary/5 border-b border-border/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold text-primary hover:text-accent transition-smooth">
            M. Saad Amjad
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => <button key={item.id} onClick={() => handleNavClick(item.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${activeSection === item.id ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}>
                {item.label}
              </button>)}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social, index) => <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="p-2 text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-full transition-smooth">
                <social.icon className="w-5 h-5" />
              </a>)}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && <div id="mobile-nav-menu" className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border/50">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map(item => <button key={item.id} onClick={() => handleNavClick(item.id)} className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${activeSection === item.id ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}>
                {item.label}
              </button>)}
            <div className="flex items-center gap-4 pt-4 px-4 border-t border-border/50">
              {socialLinks.map((social, index) => <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-foreground/70 hover:text-primary transition-smooth">
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;