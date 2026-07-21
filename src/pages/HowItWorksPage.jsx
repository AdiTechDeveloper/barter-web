import React from "react";
import {
  UserPlus,
  ArrowUpCircle,
  ArrowDownCircle,
  Sliders,
  FileCheck2,
  PartyPopper,
  Coins,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: UserPlus,
      title: "Register Your Account",
      desc: "Create your corporate or individual profile and pass through our swift identity and business validation framework to join the trusted network.",
    },
    {
      num: "02",
      icon: ArrowUpCircle,
      title: "Post What You Have",
      desc: "List your available high-value assets—whether it is commercial real estate, surplus inventory, industrial machinery, or corporate allocations.",
    },
    {
      num: "03",
      icon: ArrowDownCircle,
      title: "Post What You Need",
      desc: "Specify your target requirements or expansion requirements clearly so our platform matching system knows exactly what pairs best with your profile.",
    },
    {
      num: "04",
      icon: Sliders,
      title: "Get Matched",
      desc: "Our automated data engine alongside our expert matching consultants immediately find verified partners offering exactly what you are looking for.",
    },
    {
      num: "05",
      icon: FileCheck2,
      title: "Complete Documentation",
      desc: "Receive dedicated end-to-end assistance with legal agreements, compliance forms, real-value assessments, and structural mediation framework blocks.",
    },
    {
      num: "06",
      icon: PartyPopper,
      title: "Successful Barter Transaction",
      desc: "Execute your reciprocal contract safely and secure your fresh operational resources without dedicating a single rupee of liquid cash reserves.",
    },
  ];

  const benefits = [
    {
      icon: Coins,
      title: "Preserve Capital",
      desc: "Keep your operational bank lines intact. Trade assets directly to secure the essential tools, components, or spaces required for business growth.",
    },
    {
      icon: ShieldCheck,
      title: "Risk Containment",
      desc: "Every step is monitored, managed under structured validation checkpoints, and backed by institutional-grade trade contracts.",
    },
    {
      icon: Building,
      title: "Zero Inventory Stagnation",
      desc: "Eliminate long capital lock-ups. Swap idle holdings immediately for modern resources that actively support your immediate milestones.",
    },
  ];

  return (
    <div className="bg-paper min-h-screen">
      {/* 1. Hero Header Block */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
            The Process Flow
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight mt-4">
            How Barter Funding Works
          </h1>
          <div className="w-12 h-1 bg-brand mx-auto mt-4 rounded-full opacity-80" />
          <p className="text-sm md:text-base text-muted mt-4 leading-relaxed max-w-xl mx-auto font-medium">
            From seamless profile creation to asset distribution, discover how
            we handle high-value commercial exchanges across India.
          </p>
        </div>
      </section>

      {/* 2. Intro: What is Barter Section (Modern Split Layout with Image) */}
      <section className="py-16 md:py-20 bg-cream/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                Core Concept
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight">
                What is Barter Asset Funding?
              </h2>
              <p className="text-xs md:text-sm text-muted leading-relaxed text-slate-500 font-medium">
                At its foundation, a barter arrangement is a reciprocal trade
                model where businesses directly swap products, real estate
                assets, or functional equipment without relying on traditional
                cash transfers as an intermediary.
              </p>
              <p className="text-xs md:text-sm text-muted leading-relaxed text-slate-500 font-medium">
                While primitive bartering was limited by immediate local needs,{" "}
                <strong>Barter Funding</strong> modernizes the system into an
                enterprise ecosystem. We introduce structural evaluations,
                security checks, and cross-industry matchmaking
                frameworks—making multi-tier asset trading reliable, fast, and
                completely scaleable.
              </p>
            </div>

            {/* Right Side Image Block */}
            <div className="lg:col-span-6">
              <div className="relative group rounded-2xl overflow-hidden border border-border shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="Corporate Deal Exchange Execution"
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Transaction Process Section (6 Dynamic Grid Steps) */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
              Step-By-Step Journey
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-4">
              The Transaction Process
            </h2>
            <div className="w-12 h-1 bg-brand mx-auto mt-3 rounded-full opacity-80" />
          </div>

          {/* Dynamic 6-Step Layout Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.num}
                  className="group bg-cream rounded-2xl border border-border/80 p-6 md:p-7 hover:bg-white hover:border-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start relative overflow-hidden"
                >
                  {/* Subtle Background Step Number */}
                  <span className="absolute top-2 right-4 text-3xl font-display font-black text-border/30 select-none group-hover:text-brand/5 transition-colors">
                    {step.num}
                  </span>

                  {/* Icon Frame Indicator Badge */}
                  <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:scale-105 shadow-sm">
                    <StepIcon
                      size={22}
                      strokeWidth={2}
                      className="transition-transform duration-300"
                    />
                  </div>

                  {/* Copy Details Block */}
                  <h3 className="text-sm font-display font-bold text-ink mt-5 group-hover:text-brand transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted mt-2.5 leading-relaxed text-slate-500 font-medium">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Benefits of Barter Section */}
      <section className="bg-cream/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
              Why It Is Effective
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-4">
              Benefits of Bartering
            </h2>
            <div className="w-12 h-1 bg-brand mx-auto mt-3 rounded-full opacity-80" />
          </div>

          {/* Benefits Grid */}
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
