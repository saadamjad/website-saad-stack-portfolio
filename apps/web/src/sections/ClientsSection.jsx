import React from 'react';

const ClientsSection = () => {
  const clients = [
    { name: 'Hao Saudi', color: 'text-[#00D9FF]' },
    { name: 'Retailo', color: 'text-foreground' },
    { name: 'Washmen', color: 'text-primary' }
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-8">
          Trusted by leading companies serving millions of users
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight opacity-70 hover:opacity-100 transition-smooth cursor-default ${client.color}`}
            >
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;