import React from 'react';
import { Phone, Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

const Footer = ({ scrollToSection }) => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/saadamjad', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/saad-amjad-0b398116b/', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/923362065663', label: 'WhatsApp' }
  ];

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">M. Saad Amjad</h3>
            <p className="text-foreground/70 mb-6 max-w-xs">
              Senior full-stack engineer building scalable mobile and web systems.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 bg-muted rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-smooth"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+923362065663" className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-smooth group">
                  <Phone className="w-4 h-4 group-hover:text-accent" />
                  +92 336 2065663
                </a>
              </li>
              <li>
                <a href="mailto:contact@saadstack.com" className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-smooth group">
                  <Mail className="w-4 h-4 group-hover:text-accent" />
                  contact@saadstack.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('about')} className="text-foreground/70 hover:text-primary transition-smooth">About</button></li>
              <li><button onClick={() => scrollToSection('experience')} className="text-foreground/70 hover:text-primary transition-smooth">Experience</button></li>
              <li><button onClick={() => scrollToSection('work')} className="text-foreground/70 hover:text-primary transition-smooth">Work</button></li>
              <li><button onClick={() => scrollToSection('writing')} className="text-foreground/70 hover:text-primary transition-smooth">Blog</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-foreground/70 hover:text-primary transition-smooth">Services</button></li>
              <li><button onClick={() => scrollToSection('reviews')} className="text-foreground/70 hover:text-primary transition-smooth">Reviews</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-foreground/70 hover:text-primary transition-smooth">Contact</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © 2026 M. Saad Amjad. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 flex items-center gap-1">
            Built with <span className="text-primary font-medium">React</span> & <span className="text-accent font-medium">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;