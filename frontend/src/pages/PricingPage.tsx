import React from "react";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    highlight: false,
    features: [
      "Basic photo & video restoration",
      "Standard resolution",
      "Community support"
    ],
    cta: "Get Started",
    ctaStyle: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    note: "No credit card required"
  },
  {
    name: "Monthly",
    price: "$9",
    period: "/mo",
    highlight: true,
    features: [
      "Unlimited photo & video restoration",
      "High-resolution downloads",
      "Priority processing",
      "Early access to new features",
      "Dedicated support"
    ],
    cta: "Start Monthly Plan",
    ctaStyle: "bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700",
    note: "Cancel anytime. 7-day money-back guarantee."
  },
  {
    name: "25 Photo Restoration",
    price: "$5",
    period: "one-time",
    highlight: false,
    features: [
      "Restore up to 25 photos",
      "High-resolution downloads",
      "Priority processing for your batch"
    ],
    cta: "Buy 25 Restorations",
    ctaStyle: "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200",
    note: "One-time purchase, no subscription"
  }
];

const PricingPage: React.FC = () => (
  <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-24 px-4">
    <div className="flex justify-center w-full">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`flex flex-col items-center max-w-sm mx-auto rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-100 bg-white text-center transition-all duration-300 ${
              plan.highlight ? 'scale-105 border-orange-300 bg-gradient-to-br from-orange-50/80 to-white' : ''
            }`}
          >
            <div className="mb-4">
              <span className={`text-xl font-bold uppercase tracking-wide ${plan.highlight ? 'text-orange-500' : 'text-slate-500'}`}>{plan.name}</span>
            </div>
            <div className="mb-2 flex items-end justify-center">
              <span className={`text-4xl md:text-5xl font-extrabold ${plan.highlight ? 'text-orange-500' : 'text-slate-700'}`}>{plan.price}</span>
              {plan.period && <span className="text-lg text-slate-400 ml-1">{plan.period}</span>}
            </div>
            <ul className="text-left space-y-3 mb-6 mt-4 max-w-xs mx-auto">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center text-slate-700 text-base md:text-lg">
                  <CheckCircle className={`w-5 h-5 mr-2 ${plan.highlight ? 'text-orange-400' : 'text-slate-300'}`} /> {f}
                </li>
              ))}
            </ul>
            <button className={`mt-2 w-full py-3 rounded-xl font-bold text-lg shadow transition-transform ${plan.ctaStyle}`}>{plan.cta}</button>
            <div className={`text-xs mt-4 ${plan.highlight ? 'text-orange-400' : 'text-slate-400'}`}>{plan.note}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PricingPage; 