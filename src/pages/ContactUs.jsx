import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { contactService, extractErrorMessage } from "../services/app";
import { SpinnerIcon } from "../components/Icons";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s-]{7,15}$/;

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = "Name must be at least 3 characters.";
    }

    if (!formData.email.trim()) {
      errs.email = "Work email is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = "Enter a valid email address.";
    }

    if (formData.phone.trim() && !PHONE_REGEX.test(formData.phone.trim())) {
      errs.phone = "Enter a valid phone number.";
    }

    if (!formData.message.trim()) {
      errs.message = "Please tell us how we can help.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        full_name: formData.fullName,
        work_email: formData.email,
        phone_no: formData.phone,
        company_name: formData.companyName,
        enquiry_type: formData.inquiryType,
        how_can_we_help: formData.message,
      };

      const response = await contactService.send(payload);
      toast.success(
        response?.message || "Your message has been sent successfully!",
      );
      setSubmitted(true);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      inquiryType: "General Inquiry",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 text-xs md:text-sm bg-white border rounded-xl focus:outline-none text-ink placeholder:text-slate-400 font-medium transition-all ${
      errors[field]
        ? "border-accent focus:border-accent"
        : "border-border/80 focus:border-brand/60"
    }`;

  const contactMethods = [
    {
      icon: Phone,
      title: "Direct Consultation",
      detail: "+91 63595 57776",
      subDetail: "Mon-Fri from 9:00 AM to 7:00 PM IST",
    },
    {
      icon: Mail,
      title: "Corporate Email",
      detail: "contact@barterfunding.com",
      subDetail: "Guaranteed reply within 24 business hours",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      detail: "BKC Commercial Hub, Bandra East",
      subDetail: "Mumbai, Maharashtra 400051",
    },
  ];

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero / Header Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
            Get In Touch
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight mt-4 identification-heading">
            Connect With Our Advisory Team
          </h1>
          <div className="w-12 h-1 bg-brand mx-auto mt-4 rounded-full opacity-80" />
          <p className="text-sm md:text-base text-muted mt-4 leading-relaxed max-w-xl mx-auto font-medium">
            Have questions about listing an asset, structuring a reciprocal
            exchange, or setting up enterprise access? We're here to help.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-16 md:py-24 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                  Reach Out Directly
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight mt-2">
                  Let's discuss your asset exchange goals
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium mt-3">
                  Whether you are looking to unlock liquidity from surplus
                  inventory or trade commercial real estate, our specialists are
                  ready to guide you.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, idx) => {
                  const MethodIcon = method.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-cream/50 rounded-2xl border border-border/80 p-5 flex items-start gap-4 hover:bg-white hover:border-brand/30 transition-all duration-200 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                        <MethodIcon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                          {method.title}
                        </h3>
                        <p className="text-sm font-bold text-ink mt-0.5">
                          {method.detail}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {method.subDetail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-brand/5 rounded-2xl border border-brand/15 p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">Working Hours</h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Monday to Friday: 9:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-cream/50 rounded-2xl border border-border/80 p-6 sm:p-8 md:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand/10 text-brand mx-auto flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-ink">
                    Inquiry Received
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto font-medium">
                    Thank you for reaching out. A dedicated Barter Funding deal
                    specialist will review your details and contact you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-brand text-white font-bold text-xs tracking-wide hover:bg-brand/90 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="border-b border-border/60 pb-4 mb-6">
                    <h3 className="text-base font-bold text-ink tracking-tight">
                      Send Us a Message
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-ink">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rajesh Sharma"
                        className={inputClass("fullName")}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-accent font-semibold">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-ink">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-accent font-semibold">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-ink">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={inputClass("phone")}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-accent font-semibold">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-ink">
                        Company / Entity Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Apex Enterprises"
                        className={inputClass("companyName")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-ink">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs md:text-sm bg-white border border-border/80 rounded-xl focus:outline-none focus:border-brand/60 text-ink font-medium transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Asset Listing">
                        Listing a High-Value Asset
                      </option>
                      <option value="Trade Valuation">
                        Asset Valuation & Appraisal
                      </option>
                      <option value="Legal & Security">
                        Legal & Compliance Questions
                      </option>
                      <option value="Enterprise Partnership">
                        Corporate Partnership
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-ink">
                      How Can We Help? *
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details about your inquiry or the asset you are interested in trading..."
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-accent font-semibold">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm hover:bg-brand/90 transition-all duration-200 disabled:opacity-70"
                  >
                    {submitting ? (
                      <SpinnerIcon className="w-4 h-4" />
                    ) : (
                      <Send size={16} />
                    )}
                    {submitting ? "Sending..." : "Submit Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
