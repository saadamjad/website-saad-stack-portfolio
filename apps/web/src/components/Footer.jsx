import React from 'react';
import { Phone, Mail, Github, Linkedin, Twitter, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/923362065663', label: 'WhatsApp' }
  ];

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Saad</h3>
            <p className="text-foreground/70 mb-6 max-w-xs">
              Senior Full-Stack Engineer building scalable mobile and web systems for millions of users.
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
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+923362065663" className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-smooth group">
                  <Phone className="w-4 h-4 group-hover:text-accent" />
                  +92 336 2065663
                </a>
              </li>
              <li>
                <a href="mailto:saad.amjad434@gmail.com" className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-smooth group">
                  <Mail className="w-4 h-4 group-hover:text-accent" />
                  saad.amjad434@gmail.com
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
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-foreground/70 hover:text-primary transition-smooth">About Me</a></li>
              <li><a href="#work" className="text-foreground/70 hover:text-primary transition-smooth">Portfolio</a></li>
              <li><a href="#services" className="text-foreground/70 hover:text-primary transition-smooth">Services</a></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-primary transition-smooth">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © 2026 Saad. All rights reserved.
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