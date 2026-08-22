import React from 'react';
import ContactForm from '@/components/ContactForm.jsx';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 scroll-mt-20 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Get in <span className="text-primary">touch</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          Have a project in mind? Let&apos;s build something together
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Phone</p>
                    <a 
                      href="tel:+923362065663" 
                      className="text-lg font-medium text-foreground hover:text-primary transition-smooth"
                    >
                      +92 336 2065663
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Email</p>
                    <a
                      href="mailto:contact@saadstack.com"
                      className="text-lg font-medium text-foreground hover:text-accent transition-smooth block"
                    >
                      contact@saadstack.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#25D366]/10 shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">WhatsApp</p>
                    <a 
                      href="https://wa.me/923362065663" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-foreground hover:text-[#25D366] transition-smooth"
                    >
                      +92 336 2065663
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <h4 className="font-semibold mb-4 text-lg">Quick contact</h4>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth" asChild>
                  <a href="tel:+923362065663">
                    <Phone className="w-4 h-4 mr-2" />
                    Call now
                  </a>
                </Button>
                <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white transition-smooth" asChild>
                  <a href="https://wa.me/923362065663" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-premium-lg">
            <h3 className="text-2xl font-semibold mb-6">Send a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;