import React from "react";

export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
      <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight mt-2">
        {title}
      </h1>
      <p className="text-sm md:text-base text-muted mt-4 leading-relaxed max-w-xl mx-auto">
        {description}
      </p>
      <div className="mt-10 bg-paper border border-dashed border-border rounded-2xl py-16 text-muted text-sm">
        Content coming soon
      </div>
    </section>
  );
}
