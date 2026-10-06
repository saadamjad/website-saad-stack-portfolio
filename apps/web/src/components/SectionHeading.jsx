import React from 'react';

const SectionHeading = ({ title, accent, subtitle }) => (
  <>
    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
      {title} <span className="text-primary">{accent}</span>
    </h2>
    {subtitle && (
      <p className="text-xl text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </>
);

export default SectionHeading;
