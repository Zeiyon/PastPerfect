import React, { useState } from "react";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import FAQ from "../components/FAQ";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "Forever",
    highlight: false,
    cta: "Get Started",
    note: "*Join our mailing list for 1 Month Free",
    features: [
      "Basic photo & video restoration",
      "Standard resolution",
      "Community support",
    ],
  },
  {
    name: "Monthly",
    price: "$9.99",
    period: "/mo",
    highlight: true,
    cta: "Start Monthly Plan",
    note: "Cancel anytime. 7-day money-back guarantee.",
    features: [
      "Unlimited photo & video restoration",
      "High-resolution downloads",
      "Priority processing",
      "Early access to new features",
      "Dedicated support",
    ],
  },
  {
    name: "25 Images",
    price: "$5",
    period: "one-time",
    highlight: false,
    cta: "Buy 25 Restorations",
    note: "One-time purchase, no subscription",
    features: [
      "Restore up to 25 photos",
      "High-resolution downloads",
      "Priority processing for your batch",
    ],
  },
];

const comparisonFeatures = [
  {
    label: "Unlimited People",
    free: true,
    monthly: true,
    images: true,
  },
  {
    label: "Unlimited Interactions",
    free: true,
    monthly: true,
    images: true,
  },
  {
    label: "Access on all devices",
    free: true,
    monthly: true,
    images: true,
  },
  {
    label: "Reminders (Email and iOS Notifications)",
    free: false,
    monthly: true,
    images: false,
  },
  {
    label: "Custom Groups",
    free: false,
    monthly: true,
    images: false,
  },
  {
    label: "Custom Fields for People & Interactions",
    free: false,
    monthly: true,
    images: false,
  },
  {
    label: "End-to-End Encryption",
    free: false,
    monthly: true,
    images: false,
  },
  {
    label: "Support an Independent Developer",
    free: false,
    monthly: true,
    images: true,
  },
  {
    label: "24/7 Email Support",
    free: true,
    monthly: true,
    images: true,
  },
];

const pricingFaqs = [
  {
    question: "Is there a free plan?",
    answer: "Yes! Our free plan lets you restore basic photos and videos at standard resolution, forever. No credit card required.",
  },
  {
    question: "What do I get with the Monthly plan?",
    answer: "Unlimited high-res restorations, priority processing, early access to new features, and dedicated support.",
  },
  {
    question: "What is the 25 Images plan?",
    answer: "A one-time purchase to restore up to 25 photos with high-res downloads and priority processing—no subscription needed.",
  },
  {
    question: "Can I cancel or change my plan anytime?",
    answer: "Yes, you can cancel or switch plans at any time. The monthly plan has a 7-day money-back guarantee.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee on the monthly plan. For one-time purchases, contact support if you have any issues.",
  },
];

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] flex flex-col items-center pt-0 pb-24 px-2 overflow-x-hidden">
      {/* Animated Hue Background */}
      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob"></div>
        </div>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-3xl mx-auto text-center pt-32 pb-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 leading-tight">Choose your plan</h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">No credit card required to sign up, cancel anytime.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-lg flex items-center px-4 py-2 gap-2 border border-slate-100">
              <Mail className="w-5 h-5 text-orange-500" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="outline-none border-none bg-transparent text-slate-700 placeholder-slate-400 text-base px-2 py-1 w-40 md:w-56"
                disabled={submitted}
              />
              <button
                className="ml-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg px-4 py-1 font-semibold text-sm shadow sheen disabled:opacity-60"
                onClick={() => setSubmitted(true)}
                disabled={submitted || !email}
              >
                {submitted ? "Submitted" : "1 Month of Pro Free"}
              </button>
            </div>
            <span className="text-xs text-slate-400 mt-2 md:mt-0">*Join our mailing list for 1 Month Free</span>
          </div>
        </section>

        {/* Pricing Table with Checklists */}
        <section className="w-full max-w-5xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`flex flex-col items-center rounded-3xl shadow-2xl p-8 border bg-white text-center transition-all duration-300 relative ${
                  plan.highlight
                    ? "scale-105 border-orange-300 bg-gradient-to-br from-orange-50/80 to-white z-10"
                    : "border-slate-100"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wide">Most Popular</span>
                )}
                <div className="mb-2">
                  <span className={`text-xl font-bold uppercase tracking-wide ${plan.highlight ? "text-orange-500" : "text-slate-500"}`}>{plan.name}</span>
                </div>
                <div className="mb-2 flex items-end justify-center">
                  <span className={`text-4xl md:text-5xl font-extrabold ${plan.highlight ? "text-orange-500" : "text-slate-700"}`}>{plan.price}</span>
                  <span className="text-lg text-slate-400 ml-1">{plan.period}</span>
                </div>
                {/* Checklist for each plan */}
                <ul className="text-left space-y-3 mb-6 mt-4 max-w-xs mx-auto">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-slate-700 text-base md:text-lg">
                      <CheckCircle className={`w-5 h-5 mr-2 ${plan.highlight ? 'text-orange-400' : 'text-slate-300'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`mt-2 w-full py-3 rounded-xl font-bold text-lg shadow transition-transform sheen ${plan.highlight ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}>{plan.cta}</button>
                {plan.note && <div className="text-xs mt-4 text-slate-400">{plan.note}</div>}
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="w-full bg-white rounded-2xl shadow-lg overflow-x-auto mb-12">
            <table className="min-w-full text-sm md:text-base text-slate-700">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-2 text-left font-semibold">Features</th>
                  <th className="py-4 px-2 font-semibold">Free</th>
                  <th className="py-4 px-2 font-semibold">Monthly</th>
                  <th className="py-4 px-2 font-semibold">25 Images</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((f, idx) => (
                  <tr key={f.label} className="border-b border-slate-50 last:border-b-0">
                    <td className="py-3 px-2 text-left text-slate-700 whitespace-nowrap">{f.label}</td>
                    <td className="py-3 px-2 text-center">{f.free ? <CheckCircle className="w-5 h-5 text-orange-400 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-300 mx-auto" />}</td>
                    <td className="py-3 px-2 text-center">{f.monthly ? <CheckCircle className="w-5 h-5 text-orange-400 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-300 mx-auto" />}</td>
                    <td className="py-3 px-2 text-center">{f.images ? <CheckCircle className="w-5 h-5 text-orange-400 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-300 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="w-full max-w-6xl mx-auto mt-10">
          <FAQ faqs={pricingFaqs} />
        </div>
      </div>
    </div>
  );
} 