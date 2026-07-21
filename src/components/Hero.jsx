import React from "react";
import heroImage from "../assets/hero.jpg";

export default function Hero({ onRegisterClick, onUploadRequirementClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand/[0.06] via-paper to-paper border-b border-border">
      <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-14 md:pt-20 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left: headline + CTA */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-brand/10 text-brand text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
              India's Trusted Barter Network
            </span>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight mt-5 leading-[1.1]">
              Convert Your Assets Into{" "}
              <span className="text-brand">Opportunities</span>
            </h1>

            <p className="text-sm md:text-base text-muted mt-5 max-w-lg leading-relaxed">
              Exchange Properties, Cars, Jewellery, Advertising, Building
              Materials, Club Memberships and more through India's Trusted
              Barter Exchange Network.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={onRegisterClick}
                className="bg-brand text-white text-sm font-bold px-6 py-3.5 rounded-full hover:bg-brand-dark transition shadow-lg shadow-brand/20"
              >
                Register Now
              </button>
              <button
                onClick={onUploadRequirementClick}
                className="bg-paper text-ink text-sm font-bold px-6 py-3.5 rounded-full border border-border hover:border-brand/50 transition"
              >
                Post Requirements
              </button>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-brand/15 to-accent/10 rounded-[2.5rem] -z-10 blur-sm" />
            <div className="rounded-[2rem] overflow-hidden border border-border bg-cream aspect-[4/3] shadow-xl shadow-ink/10">
              <img
                src={heroImage}
                alt="Asset exchange network"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 bg-paper border border-border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center text-brand font-display font-bold text-sm">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-ink">Deal Matched</p>
                <p className="text-[10px] text-muted">
                  Property ↔ Commercial Vehicle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
