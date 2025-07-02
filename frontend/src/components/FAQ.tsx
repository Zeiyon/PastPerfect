import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What types of damage can PastPerfect restore?",
    answer:
      "PastPerfect can repair tears, scratches, water stains, fading, and even colorize black & white photos. Our AI is trained to handle a wide range of photo and video imperfections.",
  },
  {
    question: "Is there a limit to the number of files I can enhance?",
    answer:
      "No limits! You can upload and enhance as many images or videos as you like, completely free.",
  },
  {
    question: "How long does the restoration process take?",
    answer:
      "Most photos are restored in just a few seconds. Videos may take a bit longer depending on length and quality, but our AI is optimized for speed.",
  },
  {
    question: "Will my original files be safe and private?",
    answer:
      "Absolutely. Your uploads are processed securely and never shared. We respect your privacy and memories.",
  },
  {
    question: "Can I adjust the restoration settings?",
    answer:
      "Yes! You can fine-tune enhancement strength, style, and more for a personalized result.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mx-auto my-24 px-4">
      <div className=" w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-600 text-center mb-8 tracking-tight">
          Frequently Asked Questions
        </h2>
        <ul className="divide-y divide-slate-200 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <button
                className="w-full flex items-center justify-between text-left py-5 focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="text-base md:text-lg font-medium text-slate-800 group-hover:text-orange-500 transition-colors">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 text-orange-400"
                >
                  <ChevronDown size={22} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-4 px-1 text-slate-600 text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <a
            href="/knowledgebase"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:from-orange-500 hover:to-orange-600 transition-all text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Have more questions? <span className="hidden sm:inline">See our knowledge base</span>
            <ArrowRight size={20} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 