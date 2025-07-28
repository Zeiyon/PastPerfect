import { motion } from 'framer-motion';
import React from 'react';

const testimonials = [
  {
    quote: "I thought my grandmother's wedding photo was lost to time. PastPerfect restored it so beautifully, my whole family was amazed.",
    name: "Sarah L.",
    title: "Family Historian",
    company: "",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    companyUrl: "#",
  },
  {
    quote: "PastPerfect made my old vacation videos look like they were shot yesterday. The AI upscaling is truly next-level.",
    name: "James R.",
    title: "Travel Blogger",
    company: "",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    companyUrl: "#",
  },
  {
    quote: "As an artist, I love how easy it is to enhance my digital archives. The results are stunning and the process is effortless.",
    name: "Mina K.",
    title: "Digital Artist",
    company: "",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    companyUrl: "#",
  },
  {
    quote: "I restored my parents' old film photos in minutes. No watermarks, no hassle—just pure magic.",
    name: "Alex P.",
    title: "Photographer",
    company: "",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    companyUrl: "#",
  },
  {
    quote: "The best part? It's completely free. I can finally preserve my family's history without breaking the bank.",
    name: "Priya S.",
    title: "Archivist",
    company: "",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    companyUrl: "#",
  },
  {
    quote: "PastPerfect is a game-changer for anyone who cares about their memories. The AI enhancement is simply incredible.",
    name: "Carlos M.",
    title: "Videographer",
    company: "",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    companyUrl: "#",
  },
];

// Split testimonials into 3 columns
const col1 = [testimonials[0], testimonials[3], testimonials[1]];
const col2 = [testimonials[2], testimonials[4], testimonials[5]];
const col3 = [testimonials[1], testimonials[5], testimonials[0]];

const Testimonials: React.FC = () => (
  <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
>
  <section className="w-full py-20 px-4">
    <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-12 tracking-tight">
      See how PastPerfect brings memories back to life
    </h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
      {[col1, col2, col3].map((col, idx) => (
        <div
          key={idx}
          className="relative h-[500px] overflow-hidden flex flex-col"
        >
          {/* Top Fade */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-10 z-10"
               style={{background: 'linear-gradient(to bottom, #f8fafc 1%, transparent)'}} />
          {/* Bottom Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 z-10"
               style={{background: 'linear-gradient(to top, #f8fafc 10%, transparent)'}} />

          <div
            className={`absolute px-4 w-full flex flex-col gap-6 animate-${idx === 1 ? 'testimonials-scroll-up' : 'testimonials-scroll-down'}`}
            style={{ animationDuration: '30s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
          >
            {[...col, ...col].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 hover:border-orange-400 transition-colors p-6 flex flex-col shadow-lg min-h-[180px]">
                <p className="text-slate-700 text-base mb-6 leading-relaxed opacity-90">
                  {t.quote}
                </p>
                <div className="flex items-center mt-auto">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3 border-2 border-slate-200" />
                  ) : null}
                  <div>
                    <div className="text-slate-900 font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">
                      {t.title} / <a href={t.companyUrl} className="text-orange-500 hover:underline font-medium">{t.company}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes testimonials-scroll-down {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      @keyframes testimonials-scroll-up {
        0% { transform: translateY(-50%); }
        100% { transform: translateY(0); }
      }
      .animate-testimonials-scroll-down {
        animation-name: testimonials-scroll-down;
      }
      .animate-testimonials-scroll-up {
        animation-name: testimonials-scroll-up;
      }
    `}</style>
  </section>
  </motion.div>
);

export default Testimonials; 