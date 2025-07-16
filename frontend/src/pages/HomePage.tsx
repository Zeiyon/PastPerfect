import { useNavigate } from "react-router-dom";
import { motion, animate, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useEffect, useState, useRef } from "react";
import Testimonials from "../components/Testimonials";
import FeatureSections from "../components/FeatureSections";
import FAQ from "../components/FAQ";
import { Typewriter } from 'react-simple-typewriter';

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

const heroExample = {
  before: "/homepage-before-1.jpg",
  after: "/homepage-after-1.jpg",
};

export default function HomePage() {
  const navigate = useNavigate();
  // Animate slider position from 100 to 50 on mount
  const [sliderPosition, setSliderPosition] = useState(100);
  useEffect(() => {
    const controls = animate(100, 50, {
      duration: 1.75,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setSliderPosition(v),
    });
    return () => controls.stop();
  }, []);

  return (
    <div className="relative home-page">
      {/* Animated Hue Background */}
      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob"></div>
        </div>
      </div>
      <div className="space-y-24 pb-24 relative z-10">
        {/* Redesigned Hero Section */}
        <section className="flex flex-col items-center justify-center pt-32 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 text-center leading-tight">
            Reimagine your
          </h1>
          <div className="flex items-center justify-center mb-6 text-center">
            <span className="text-5xl md:text-6xl font-bold text-center" style={{ letterSpacing: '0.05em' }}>
              <span className="ml-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                <Typewriter
                  words={["Memories", "Photos", "Videos", "Selfies", "Scans"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={50}
                  // delaySpeed={1500}
                />
              </span>
            </span>
          </div>
          <p className="text-xl md:text-xl text-slate-600 mb-8 max-w-2xl text-center">
            Remote desktop reimagined – a seamless 4K experience at up to 60 frames per second with near-zero latency. Secure, flexible, effortless access to.
          </p>
          <button
            className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-white px-7 py-3 rounded-3xl font-bold text-lg shadow-lg sheen mb-12"
            type="button"
          >
            Get Started Now
          </button>
          {/* Large Slider Card (restored) */}
          <div className="w-full max-w-5xl mx-auto mb-8">
            <div className="bg-white rounded-3xl shadow-xl flex items-center justify-center w-full h-[715px] p-2">
              <div className="relative w-full h-[700px] rounded-xl overflow-hidden">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={heroExample.before}
                      alt="Before"
                      style={{ borderRadius: "1rem" }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={heroExample.after}
                      alt="After"
                      style={{ borderRadius: "1rem" }}
                    />
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "1rem",
                  }}
                  handle={<div className="custom-slider-handle" />}
                  position={sliderPosition}
                />
                {/* Before/After Labels */}
                <span className="absolute left-4 top-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none">
                  Before
                </span>
                <span className="absolute right-4 top-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none">
                  After
                </span>
              </div>
            </div>
            {/* Animated Down Arrow */}
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.75,
                ease: "easeInOut",
              }}
              className="flex justify-center mt-4"
            >
              <ChevronDown className="w-15 h-15 text-orange-500 opacity-80" />
            </motion.div>
          </div>
          {/* End Slider */}
        </section>
        {/* End Hero Section */}

        <FeatureSections />

        <div className="my-20"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <Testimonials />
        </motion.div>

        {/* Stats Section */}
        <StatsSection />

        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}

// StatsSection component with count-up animation
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [photos, setPhotos] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [free, setFree] = useState(0);

  useEffect(() => {
    if (isInView) {
      const photosTarget = 3000;
      const customersTarget = 45;
      const freeTarget = 100;
      const duration = 1200; // ms
      const steps = 60;
      const interval = duration / steps;
      let currentStep = 0;
      const intervalId = setInterval(() => {
        currentStep++;
        setPhotos(Math.floor((photosTarget * currentStep) / steps));
        setCustomers(Math.floor((customersTarget * currentStep) / steps));
        setFree(Math.floor((freeTarget * currentStep) / steps));
        if (currentStep >= steps) {
          setPhotos(photosTarget);
          setCustomers(customersTarget);
          setFree(freeTarget);
          clearInterval(intervalId);
        }
      }, interval);
      return () => clearInterval(intervalId);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 mb-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-18 mb-32">
        <div className="flex flex-col items-center flex-1 min-w-[180px]">
          <span className="text-5xl md:text-6xl font-bold text-slate-600 mb-2">
            {photos.toLocaleString()}+
          </span>
          <span className="text-lg md:text-xl font-medium text-slate-700">
            Photos Restored
          </span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[180px]">
          <span className="text-5xl md:text-6xl font-bold text-slate-600 mb-2">
            {customers}+
          </span>
          <span className="text-lg md:text-xl font-medium text-slate-700">
            Happy Customers
          </span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[180px]">
          <span className="text-5xl md:text-6xl font-bold text-slate-600 mb-2">
            {free}%
          </span>
          <span className="text-lg md:text-xl font-medium text-slate-700">
            Free Forever
          </span>
        </div>
      </div>
    </section>
  );
};
