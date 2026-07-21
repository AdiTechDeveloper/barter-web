import React from "react";
import {
  ShieldCheck,
  Handshake,
  FileText,
  Scale,
  Globe,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Members",
    desc: "Every member undergoes identity and document verification before joining the network.",
  },
  {
    icon: Handshake,
    title: "Business Matching",
    desc: "Our team helps match your assets with the right trade partners based on value and need.",
  },
  {
    icon: FileText,
    title: "Legal Documentation Support",
    desc: "End-to-end assistance with agreements, valuations, and paperwork for every exchange.",
  },
  {
    icon: Scale,
    title: "Professional Mediation",
    desc: "Experienced mediators help both parties reach a fair, mutually beneficial deal.",
  },
  {
    icon: Globe,
    title: "Nationwide Network",
    desc: "Connect with verified members and businesses across India, not just your city.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    desc: "Structured processes and safeguards protect both parties throughout the exchange.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-paper py-16 md:py-8 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Block Section */}
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
            Why Barter Funding
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-4">
            Why Choose Us
          </h2>
          <div className="w-12 h-1 bg-brand mx-auto mt-3 rounded-full opacity-80" />
          <p className="text-sm text-muted mt-3 max-w-md mx-auto leading-relaxed">
            A trusted, structured way to exchange high-value assets across
            India.
          </p>
        </div>

        {/* Dynamic Grid Layout Frame */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => {
            // Assign the active component reference dynamically
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.title}
                className="group bg-cream rounded-2xl border border-border/80 p-6 md:p-7 hover:bg-white hover:border-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                {/* Visual Icon Badge Frame */}
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:scale-105 shadow-sm">
                  <IconComponent
                    size={22}
                    strokeWidth={2}
                    className="transition-transform duration-300"
                  />
                </div>

                {/* Text Layout */}
                <h3 className="text-sm font-display font-bold text-ink mt-5 group-hover:text-brand transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted mt-2.5 leading-relaxed text-slate-500 font-medium">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
