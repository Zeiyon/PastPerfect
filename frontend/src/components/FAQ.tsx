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
    <section className="max-w-6xl mx-auto my-12 sm:my-16 md:my-20 lg:my-24 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 text-center mb-3 sm:mb-4 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 text-center mb-8 sm:mb-10 md:mb-12 font-medium">
          You've got questions. We've got answers
        </p>
        <ul className="max-w-4xl mx-auto divide-y divide-slate-200">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <button
                className="cursor-pointer w-full flex items-center justify-between text-left py-6 sm:py-8 px-4 sm:px-6 md:px-8 focus:outline-none group bg-transparent"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 leading-relaxed group-hover:text-orange-500 transition-colors">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 sm:ml-6 text-orange-400 flex-shrink-0"
                >
                  <ChevronDown size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
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
                    <div className="pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-8 text-slate-600 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center">
          <a
            href="/knowledgebase"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow hover:from-orange-500 hover:to-orange-600 transition-all text-base sm:text-lg md:text-xl lg:text-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Have more questions? <span className="hidden sm:inline">See our knowledge base</span>
            <ArrowRight size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 