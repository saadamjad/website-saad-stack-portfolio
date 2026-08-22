import React from 'react';

const ClientsSection = () => {
  const clients = ['Hao Saudi', 'Retailo', 'Washmen'];

  return (
    <section className="py-16 border-y border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-8">
          Companies I have built products with
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {clients.map((name) => (
            <div 
              key={name} 
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground/70 hover:text-primary transition-smooth cursor-default"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;