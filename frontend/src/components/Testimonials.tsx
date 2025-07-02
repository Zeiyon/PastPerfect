import React from 'react';

const testimonials = [
  {
    quote: 'Thanks to Prisma, we can seamlessly scale our applications without concerns about data layer performance.',
    name: 'Matti Nannt',
    title: 'Co-founder',
    company: 'Formbricks',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    companyUrl: '#',
  },
  {
    quote: 'Prisma has a low learning curve. Productivity becomes higher because it gets combined with end-to-end type-safety using TypeScript.',
    name: 'Ricardo Almeida',
    title: 'Software Engineer',
    company: 'Grover',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    companyUrl: '#',
  },
  {
    quote: 'Accelerate is a perfect fit for landing pages. We take advantage of caching to speed up queries and reduce latency, making them lightning-fast. This means we have a faster landing page, leading to better conversion.',
    name: 'Blake Carroll',
    title: 'CTO',
    company: 'Solin',
    avatar: '',
    companyUrl: '#',
    companyLogo: 'https://placehold.co/40x40/eee/222?text=solin',
  },
  {
    quote: 'Underrated: Prisma 🐄 Entire SaaS businesses have been built on top of the Prisma ecosystem—including OSS ones like Dub.co. Have been loving the recent performance improvements as well 🔥',
    name: 'Steven Tey',
    title: 'Founder',
    company: 'Dub.co',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    companyUrl: '#',
  },
  {
    quote: "It's the kind of DX that lets me get stuff done in between my daughter's naps.",
    name: 'Nicolás Torres',
    title: 'Fullstack Engineer',
    company: 'Backbase',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    companyUrl: '#',
  },
  {
    quote: 'Prisma helps us unify data access from multiple enterprise systems into a single API. It means we can move very quickly whilst staying flexible.',
    name: 'Elie Steinbock',
    title: 'Founder',
    company: 'Inbox Zero',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    companyUrl: '#',
  },
];

// Split testimonials into 3 columns
const col1 = [testimonials[0], testimonials[3], testimonials[1]];
const col2 = [testimonials[2], testimonials[4], testimonials[5]];
const col3 = [testimonials[1], testimonials[5], testimonials[0]];

const Testimonials: React.FC = () => (
  <section className="w-full bg-[#f8fafc] py-20 px-4">
    <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-12 tracking-tight">
      Trusted by <span className="text-orange-500 font-bold">500K+</span> monthly active developers globally
    </h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {[col1, col2, col3].map((col, idx) => (
        <div
          key={idx}
          className={`relative h-[420px] overflow-hidden flex flex-col`}
        >
          <div
            className={`absolute w-full flex flex-col gap-6 animate-${idx === 1 ? 'testimonials-scroll-up' : 'testimonials-scroll-down'}`}
            style={{ animationDuration: '20s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
          >
            {[...col, ...col].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 hover:border-orange-400 transition-colors p-6 flex flex-col shadow-lg min-h-[180px]">
                <p className="text-slate-700 text-base mb-6 leading-relaxed opacity-90">
                  {t.quote}
                </p>
                <div className="flex items-center mt-auto">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3 border-2 border-slate-200" />
                  ) : t.companyLogo ? (
                    <img src={t.companyLogo} alt={t.company} className="w-10 h-10 rounded-full mr-3 border-2 border-slate-200 bg-white object-contain" />
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
);

export default Testimonials; 