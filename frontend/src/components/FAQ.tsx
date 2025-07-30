import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mx-auto my-24 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 text-center mb-4 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-lg md:text-xl text-slate-600 text-center mb-12 font-medium">
          You've got questions. We've got answers
        </p>
        <ul className="max-w-4xl mx-auto divide-y divide-slate-200">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <button
                className="cursor-pointer w-full flex items-center justify-between text-left py-8 px-8 focus:outline-none group bg-transparent"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="text-1xl md:text-2xl font-semibold text-slate-700  leading-relaxed group-hover:text-orange-500 transition-colors">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-6 text-orange-400"
                >
                  <ChevronDown size={34} />
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
                    <div className="pt-4 pb-10 px-8 text-slate-600 text-xl md:text-2xl leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        <div className="mt-20 flex justify-center">
          <a
            href="/knowledgebase"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-8 py-4 rounded-full shadow hover:from-orange-500 hover:to-orange-600 transition-all text-xl md:text-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Have more questions? <span className="hidden sm:inline">See our knowledge base</span>
            <ArrowRight size={28} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 