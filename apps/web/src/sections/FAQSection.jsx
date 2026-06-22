import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on complexity. A standard MVP or mobile app typically takes 8-12 weeks from concept to launch. For enterprise integrations or complex backend architectures, timelines are usually 3-6 months. I provide detailed milestones during our initial consultation."
    },
    {
      question: "Do you work with startups or only enterprises?",
      answer: "I work with both. I enjoy helping startups build scalable MVPs from scratch, and I also have extensive experience integrating with and optimizing large-scale enterprise systems (like Careem and InstaShop) serving millions of users."
    },
    {
      question: "What's your availability for new projects?",
      answer: "I typically take on 1-2 major projects at a time to ensure high quality. Please reach out via the contact form or WhatsApp to discuss my current availability and how we can align with your timeline."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, I offer retainer-based support and maintenance packages after project launch. This includes performance monitoring, security updates, bug fixes, and implementing new features as your user base grows."
    },
    {
      question: "What's your development process?",
      answer: "I follow an agile methodology. We start with architecture planning and UI/UX review, followed by two-week development sprints. You'll get regular updates, staging builds to test, and transparent communication throughout the entire lifecycle."
    },
    {
      question: "Can you help with legacy code optimization?",
      answer: "Absolutely. A significant part of my experience involves auditing existing codebases, identifying bottlenecks, and refactoring legacy systems into modern, scalable microservices without disrupting active users."
    }
  ];
return null
  return (
    <section id="faq" className="py-24 bg-card/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Common <span className="text-primary">questions</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-12 text-center">
          Everything you need to know about working with me
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/50 border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/50 transition-smooth"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:text-primary hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;