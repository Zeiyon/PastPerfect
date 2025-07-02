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
        {/* Centered Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center pt-24 px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 text-center leading-tight mt-16">
            Enhance Your
            <span className="ml-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Memories
            </span>
          </h1>
          <p className="text-xl md:text-xl text-slate-600 mb-12 max-w-3xl text-center">
            Restore and upscale your images and videos with cutting-edge AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 mb-18 justify-center">
            <button
              onClick={() => navigate("/upscaler")}
              className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-white px-7 py-2 rounded-3xl font-bold text-lg shadow-lg sheen"
              type="button"
            >
              Get Started
            </button>
            <button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight-100, behavior: "smooth" })
              }
              className="cursor-pointer border-2 border-orange-400 text-orange-500 px-6 py-3 rounded-3xl font-bold text-lg bg-white hover:bg-orange-50 transition-colors"
            >
              Learn More
            </button>
          </div>
          {/* Large Slider Card */}
          <div className="w-full max-w-5xl mx-auto">
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
        </motion.section>

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

        <FAQ />
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
