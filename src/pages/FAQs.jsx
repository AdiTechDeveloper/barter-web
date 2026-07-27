import React from "react";
import {
  Coins,
  Zap,
  TrendingUp,
  ShieldCheck,
  Globe,
  Handshake,
  FileText,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
  HelpCircle,
} from "lucide-react";

export default function FAQs() {
  const faqCategories = [
    {
      categoryName: "General & Platform Mechanics",
      questions: [
        {
          question:
            "What is Barter Funding and how does B2B asset trading work?",
          answer:
            "Barter Funding is India's premier B2B asset exchange platform. We enable enterprise operators, real estate owners, and corporate entities to directly exchange high-value business assets—like property, surplus inventory, or capital machinery—without relying entirely on liquid cash or bank debt.",
          icon: Coins,
        },
        {
          question: "What types of commercial assets can be listed?",
          answer:
            "We support institutional-grade assets including commercial real estate, industrial land, unencumbered machinery, fleet vehicles, bulk raw materials, and high-value corporate inventory. All assets undergo proof-of-ownership vetting prior to active trading.",
          icon: Zap,
        },
      ],
    },
    {
      categoryName: "Valuation & Legal Security",
      questions: [
        {
          question: "How are asset valuations determined on the platform?",
          answer:
            "Asset values are established using independent third-party appraisers, certified valuation frameworks, and market comparisons to ensure all parties participate on fair, transparent, and balanced commercial terms.",
          icon: TrendingUp,
        },
        {
          question:
            "How does Barter Funding ensure legal compliance and transaction safety?",
          answer:
            "Every transaction is backed by institutional-grade legal contracts drafted by corporate legal specialists. We perform title searches, background checks, and clear asset proof verifications before any exchange closes.",
          icon: ShieldCheck,
        },
      ],
    },
    {
      categoryName: "Execution & Trade Process",
      questions: [
        {
          question: "How long does a typical asset exchange take to complete?",
          answer:
            "While direct matches can be identified quickly via our matching network, full diligence, third-party appraisal, and legal title closing typically take between 2 to 4 weeks depending on asset complexity.",
          icon: Globe,
        },
        {
          question: "Are multi-party or triangular asset exchanges supported?",
          answer:
            "Yes. Barter Funding features multi-party liquidity matching to structure 3-way or multi-tiered exchanges whenever direct bilateral trading isn't optimal for both parties.",
          icon: Handshake,
        },
      ],
    },
    {
      categoryName: "Financials, Taxes & Accounting",
      questions: [
        {
          question: "How is GST handled on asset barter transactions?",
          answer:
            "Under Indian GST laws, barter transactions are treated as reciprocal supplies. Each party issues a standard GST invoice based on the fair market value of the asset supplied. Input Tax Credit (ITC) can typically be claimed as per standard GST rules.",
          icon: FileText,
        },
        {
          question:
            "How do barter exchanges affect corporate tax and balance sheets?",
          answer:
            "Exchanged assets are recorded at fair market value in your books. Any difference between book value and exchange value is recognized as a gain or loss on asset disposal. We recommend consulting your auditor for entity-specific tax structuring.",
          icon: TrendingUp,
        },
        {
          question:
            "Can partial cash settlements (hybrid deals) be combined with asset trades?",
          answer:
            "Yes! Many enterprise transactions involve cash top-ups (cash + asset) to bridge value differences between non-identical assets, giving both trading partners flexible closing options.",
          icon: Coins,
        },
      ],
    },
    {
      categoryName: "Platform Trust, Security & Verification",
      questions: [
        {
          question: "What is the vetting process before an asset goes live?",
          answer:
            "Every listing undergoes a 3-tier verification check: physical asset inspection, legal title search (to ensure no liens or legal encumbrances), and corporate KYC verification of the entity offering the asset.",
          icon: ShieldCheck,
        },
        {
          question:
            "Are trade details and partner identities kept confidential?",
          answer:
            "Yes. High-value enterprise assets can be listed anonymously under NDA. Your company identity is only disclosed to verified prospective trade partners after mutual consent.",
          icon: CheckCircle2,
        },
      ],
    },
  ];

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
            Support & Guidance
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight mt-4 identification-heading">
            Frequently Asked Questions
          </h1>
          <div className="w-12 h-1 bg-brand mx-auto mt-4 rounded-full opacity-80" />
          <p className="text-sm md:text-base text-muted mt-4 leading-relaxed max-w-xl mx-auto font-medium">
            Find immediate clarity on trading business assets, preserving
            working capital, and closing secure transactions on Barter Funding.
          </p>
        </div>
      </section>

      {/* FAQ List Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-14">
            {faqCategories.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-6">
                {/* Category Header with Modern Line Divider */}
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-brand/10" />
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand">
                    {group.categoryName}
                  </h2>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border/80 via-border/30 to-transparent ml-2" />
                </div>

                {/* Question Cards */}
                <div className="grid gap-4">
                  {group.questions.map((faq, faqIdx) => {
                    const QuestionIcon = faq.icon;
                    return (
                      <div
                        key={faqIdx}
                        className="group relative bg-cream/50 hover:bg-white rounded-2xl border border-border/80 hover:border-brand/40 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="flex items-start gap-4 md:gap-6">
                          {/* Modern Icon Container */}
                          <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-sm mt-0.5">
                            <QuestionIcon size={22} strokeWidth={2} />
                          </div>

                          {/* Content */}
                          <div className="space-y-2">
                            <h3 className="text-base md:text-lg font-bold text-ink tracking-tight group-hover:text-brand transition-colors duration-200">
                              {faq.question}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium pt-0.5">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
