import React, { useState } from "react";
import { CheckCircle, Mail, ArrowRight, Cloud, Tag } from "lucide-react";
import { motion } from "framer-motion";
import FAQ from "../components/FAQ";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "Forever",
    highlight: false,
    cta: "Get Started",
    note: "Join for free amd get 5 free restorations",
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

const pricingFaqs = [
  {
    question: "Is there a free plan?",
    answer: "Yes! Our free plan lets you track basic people and interactions at no cost, forever. No credit card required.",
  },
  {
    question: "What do I get with the Monthly plan?",
    answer: "Unlimited people tracking, unlimited interactions, reminders, custom groups, custom fields, end-to-end encryption, and dedicated support.",
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
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [photoCount, setPhotoCount] = useState(25);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const calculateCost = (count: number) => {
    const baseFee = 5;
    const perPhoto = 0.30;
    return baseFee + (count * perPhoto);
  };

  const totalCost = calculateCost(photoCount);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="relative min-h-screen  flex flex-col items-center pt-0 pb-24 px-2 overflow-x-hidden" 
    style={{
      background:
        "linear-gradient(to bottom, #fff 0%, #f1f5f9 45%, #fff 65%, #fff 100%)",
    }}>
      {/* Animated Hue Background */}
      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob"></div>
        </div>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Hero Section */}
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-32 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center leading-tight tracking-tight drop-shadow-lg">
           Find the Perfect Plan for You
          </h1>
          <p className="text-xl md:text-xl text-slate-700 mb-6 max-w-3xl text-center font-medium mx-auto">
            No credit card required to sign up, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.section 
          className="w-full max-w-6xl mx-auto px-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`relative flex flex-col rounded-3xl shadow-xl p-7 border bg-gradient-to-br from-white via-slate-50 to-slate-100 transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1 ${
                  plan.highlight
                    ? "scale-105 border-orange-300 bg-gradient-to-br from-orange-50/90 via-white to-orange-100 z-10 ring-2 ring-orange-200"
                    : "border-slate-100"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold px-5 py-1 rounded-full shadow-lg uppercase tracking-wide z-20 border-2 border-white">Most Popular</span>
                )}
                <div className="mb-3 flex flex-col items-center">
                  <span className={`text-lg font-bold uppercase tracking-wide mb-1 ${plan.highlight ? "text-orange-500" : "text-slate-500"}`}>{plan.name}</span>
                  <div className="flex items-end justify-center mb-2">
                    <span className={`text-5xl font-extrabold ${plan.highlight ? "text-orange-500" : "text-slate-800"}`}>{plan.price}</span>
                    <span className="text-lg text-slate-400 ml-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="text-left space-y-2.5 mb-7 mt-4 max-w-xs mx-auto">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-slate-700 text-base md:text-lg">
                      <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${plan.highlight ? 'text-orange-400' : 'text-slate-300'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`mt-auto w-full py-3 rounded-xl font-bold text-lg shadow transition-transform sheen focus:outline-none focus:ring-2 focus:ring-orange-400 ${plan.highlight ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}>{plan.cta}</button>
                {plan.note && (
                  <div className="text-xs mt-4 text-slate-400 text-center font-medium italic">
                    {plan.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mail-in Photo Restoration Service Section */}
        <motion.section 
          className="w-full max-w-7xl mx-auto px-4 mb-12 mt-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">MAIL-IN SERVICE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center drop-shadow-sm">
              Mail us your photos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Don't want to scan photos yourself? Mail them to us and we'll handle the scanning and restoration process for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            {/* Left Column - Feature Blocks */}
            <motion.div 
              className="space-y-12"
              variants={containerVariants}
            >
              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Simple mail-in process</h3>
                <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                  Just pack your photos securely and mail them to us. We'll scan them at high resolution, 
                  restore them to their original quality, and return your originals safely with free shipping.
                </p>
              </motion.div>

              <motion.div 
                className="text-center border-t border-slate-200 pt-8"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Professional scanning & restoration</h3>
                <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                  Our experts will scan your photos at high resolution and restore them to their original quality 
                  using advanced technology and years of experience.
                </p>
              </motion.div>

              <motion.div 
                className="text-center border-t border-slate-200 pt-8"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Affordable pricing</h3>
                <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                  Only 30¢ per image for complete scanning and restoration service. Perfect for bulk photo 
                  restoration projects with our $5 base fee and free shipping return.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              {/* Light orange background div */}
              <div className="absolute -bottom-12 -right-12 w-full h-full bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl opacity-70"></div>
              {/* Contact form */}
              <div className="relative bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
                <div className="absolute top-0 right-0">
                  <span className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl shadow-lg">
                    RESPONSE IN 2 HOURS
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  Order your photos now
                </h3>
                <p className="text-slate-600 mb-6">
                  Calculate your cost and get started with our mail-in service.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of photos</label>
                    <input
                      type="number"
                      min="25"
                      value={photoCount}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 25;
                        setPhotoCount(Math.max(25, value));
                      }}
                      placeholder="e.g., 25"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tell us about your photos</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Photo condition, special requirements, etc."
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Minimal Cost Display */}
                  <div className="text-center py-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Estimated cost</div>
                    <div className="text-2xl font-bold text-orange-600">${totalCost.toFixed(2)}</div>
                    <div className="text-xs text-slate-500 mt-1">$5 base + ${(0.30).toFixed(2)} per photo + free shipping</div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-4 px-6 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all flex items-center justify-center text-lg"
                  >
                    Send <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  
                  <div className="text-xs text-slate-500 text-center">
                    PastPerfect support is currently available in English only. This form is protected by reCAPTCHA and its Privacy Policy and Terms of Service apply.
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.div 
          className="w-full max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <FAQ faqs={pricingFaqs} />
        </motion.div>
      </div>
    </div>
  );
} 