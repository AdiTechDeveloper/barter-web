import React from "react";
import {
  Target,
  Eye,
  TrendingUp,
  Coins,
  Zap,
  ShieldCheck,
  Handshake,
  Globe,
} from "lucide-react";

export default function AboutUs() {
  const benefits = [
    {
      icon: Coins,
      title: "Conserve Liquid Cash",
      desc: "Preserve working capital and liquidity by utilizing existing high-value assets and inventory to fund your expansion, acquisitions, or resource needs.",
    },
    {
      icon: Zap,
      title: "Unlock Idle Value",
      desc: "Turn underutilized real estate, surplus stock, or vacant operational capacity into active purchasing power without forcing markdown liquidations.",
    },
    {
      icon: TrendingUp,
      title: "Expand Market Reach",
      desc: "Connect directly with verified corporate entities and enterprise partners across India, building reliable trade channels outside standard supply chains.",
    },
  ];

  return (
    <div className="bg-paper min-h-screen">
      {/* 1. Hero / Header Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
            Our Story
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight mt-4 identification-heading">
            About Barter Funding
          </h1>
          <div className="w-12 h-1 bg-brand mx-auto mt-4 rounded-full opacity-80" />
          <p className="text-sm md:text-base text-muted mt-4 leading-relaxed max-w-xl mx-auto font-medium">
            We are building India's premier corporate network where trading
            high-value business assets directly is structured, secure, and
            completely frictionless.
          </p>
        </div>
      </section>

      {/* 2. Company Introduction Section */}
      <section className="py-16 md:py-20 bg-cream/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-7 space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                Who We Are
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight">
                Revolutionizing Asset Exchanges Across India
              </h2>
              <p className="text-xs md:text-sm text-muted leading-relaxed text-slate-500 font-medium">
                In traditional finance, valuable assets can sit completely
                stagnant due to rigid market limits or high cash costs.{" "}
                <strong>Barter Funding</strong> fills this gap by acting as a
                strategic B2B exchange layer that lets organizations bypass
                traditional financing barriers entirely.
              </p>
              <p className="text-xs md:text-sm text-muted leading-relaxed text-slate-500 font-medium">
                We empower businesses, property owners, and high-net-worth
                operators to exchange real estate, industrial inventory, and
                capital equipment directly. Our platform removes standard
                trading friction by backing every transaction with secure
                validation, clear asset assessments, and full legal compliance.
              </p>
            </div>

            {/* Right Interactive Stats Framework Box */}
            <div className="md:col-span-5 bg-cream rounded-2xl border border-border/80 p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">
                    100% Secure System
                  </h4>
                  <p className="text-[11px] text-muted font-medium mt-0.5">
                    Vetted asset proofs and institutional-grade agreements.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">
                    Cross-Regional Reach
                  </h4>
                  <p className="text-[11px] text-muted font-medium mt-0.5">
                    Move assets freely between states without liquidity
                    bottlenecks.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Handshake size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">
                    Managed Support Layers
                  </h4>
                  <p className="text-[11px] text-muted font-medium mt-0.5">
                    End-to-end guidance from discovery to structural closing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Section (Mirroring your Grid Layout) */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Mission Card */}
            <div className="group bg-cream rounded-2xl border border-border/80 p-6 md:p-8 hover:bg-white hover:border-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:scale-105 shadow-sm">
                <Target size={22} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-display font-bold text-ink mt-5 group-hover:text-brand transition-colors duration-200">
                Our Mission
              </h3>
              <p className="text-xs text-muted mt-2.5 leading-relaxed text-slate-500 font-medium">
                To unlock frozen commercial value across the country by
                providing enterprise networks with a structured, secondary trade
                network built on verified trust, modern data-matching, and
                institutional compliance.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-cream rounded-2xl border border-border/80 p-6 md:p-8 hover:bg-white hover:border-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:scale-105 shadow-sm">
                <Eye size={22} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-display font-bold text-ink mt-5 group-hover:text-brand transition-colors duration-200">
                Our Vision
              </h3>
              <p className="text-xs text-muted mt-2.5 leading-relaxed text-slate-500 font-medium">
                To become the ultimate foundation for asset-backed trade
                solutions across India, making multi-party asset exchanges just
                as common, practical, and dynamic as standard bank capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits of the Barter Economy */}
      <section className="bg-cream/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
              The Strategic Edge
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-4">
              Benefits of Barter Economy
            </h2>
            <div className="w-12 h-1 bg-brand mx-auto mt-3 rounded-full opacity-80" />
            <p className="text-sm text-muted mt-3 max-w-md mx-auto leading-relaxed">
              Why high-performing modern firms integrate reciprocal trading
              frameworks into their asset management cycles.
            </p>
          </div>

          {/* Benefits Grid Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl border border-border/60 p-6 md:p-7 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="text-brand mb-4">
                    <BenefitIcon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-ink tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-muted mt-2.5 leading-relaxed font-medium">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
