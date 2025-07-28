import { useNavigate } from "react-router-dom";
import { motion, animate, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Testimonials from "../components/Testimonials";
import FeatureSections from "../components/FeatureSections";
import FAQ from "../components/FAQ";
import StatsSection from "../components/StatsSection";
import { TypeAnimation } from "react-type-animation";
import { ChevronDown } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

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
  
  // Add scroll-based animation
  const { scrollY } = useScroll();
  const sliderScale = useTransform(scrollY, [150, 500], [1, 1.25]);
  const sliderOpacity = useTransform(scrollY, [150, 500], [1, 0.92]);
  const sliderY = useTransform(scrollY, [150, 500], [0, 120]);
  
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
        <motion.section
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background:
              "linear-gradient(to bottom, #fff 0%, #f1f5f9 55%, #f1f5f9 100%)",
          }}
          className="flex flex-col items-center justify-center pt-44 pb-80 px-4 min-h-[70vh] relative mb-0"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-10 text-center leading-tight tracking-tight drop-shadow-lg">
            Reimagine your
          </h1>
          <div className="flex items-center justify-center mb-12 text-center">
            <span
              className="text-6xl md:text-7xl font-extrabold text-center tracking-wide"
              style={{ letterSpacing: "0.05em" }}
            >
              <span className="ml-8 text-orange-500 font-extrabold">
                <TypeAnimation
                  sequence={[
                    "Memories",
                    1000,
                    "Photos",
                    1000,
                    "Videos",
                    1000,
                    "Selfies",
                    1000,
                    "Scans",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  preRenderFirstString={true}
                  cursor={true}
                />
              </span>
            </span>
          </div>
          <p className="text-2xl md:text-2xl text-slate-700 mb-16 max-w-3xl text-center font-medium">
            Restore, enhance, and relive your most precious moments with
            stunning clarity. Fast, secure, and always free.
          </p>
          <button
            className="cursor-pointer px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-orange-500 text-white border border-orange-600 relative overflow-hidden mb-24 sheen-btn transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600"
            type="button"
            onClick={() => navigate("/upscale")}
          >
            Get Started Now
          </button>
          {/* Large Slider Card (restored) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            style={{ 
              scale: sliderScale,
              opacity: sliderOpacity,
              y: sliderY,
            }}
            className="w-full max-w-5xl mx-auto mb-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/20 flex items-center justify-center w-full h-[715px] p-2">
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
                  handle={null}
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
          </motion.div>
          {/* End Slider */}
        </motion.section>
        {/* End Hero Section */}

        <div
          className="mb-0 pb-16"
          style={{
            background:
              "linear-gradient(to bottom, #f1f5f9 0%, #fff 45%, #fff 100%)",
          }}
        >
          <FeatureSections />
        </div>


        <div className="bg-gradient-to-b from-white via-slate-50 to-transparent">
          <Testimonials />
        </div>

        {/* Stats Section */}
        <StatsSection />

        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}
