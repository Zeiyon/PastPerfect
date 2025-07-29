import { useNavigate } from "react-router-dom";
import { motion, animate, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Enhanced slider position animation with spring physics
  const [sliderPosition, setSliderPosition] = useState(100); // Start from right (100)
  const springPosition = useSpring(100, {
    stiffness: 100,
    damping: 25,
    mass: 1,
  });
  
  // Intersection observer for enhanced scroll animations
  const [sliderInViewRef, sliderInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  // Enhanced scroll-based animations with better ranges and easing
  const { scrollY } = useScroll();
  
  // Parallax effect: slider stays in place initially, then moves up with scroll
  const sliderScale = useTransform(
    scrollY, 
    [0, 100, 300, 800], 
    [1, 1, 1, 1.25]
  );
  
  // Stay in place initially, then move down with scroll (parallax effect)
  const sliderY = useTransform(
    scrollY, 
    [0, 300, 1000], 
    [0, 0, 600]
  );
  
  // Opacity stays high during parallax, then fades when it stops
  const sliderOpacity = useTransform(
    scrollY, 
    [0, 1000, 1200, 1400], 
    [1, 1, 0.95, 0.9]
  );
  
  // Subtle rotation during parallax
  const sliderRotate = useTransform(
    scrollY,
    [0, 1000],
    [0, 2]
  );
  
  // Enhanced shadow effect
  const shadowBlur = useTransform(
    scrollY,
    [0, 1000],
    [15, 25]
  );
  
  // Mouse tracking for subtle interactive effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((event.clientX - centerX) / 80);
      mouseY.set((event.clientY - centerY) / 80);
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  useEffect(() => {
    // Enhanced animation sequence with better timing
    const sequence = async () => {
      // Initial delay for content to settle
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Animate slider position to center (50) with smooth spring animation
      springPosition.set(50);
      
      // Update the slider position state
      const unsubscribe = springPosition.on("change", (latest) => {
        setSliderPosition(latest);
      });
      
      return unsubscribe;
    };
    
    sequence();
  }, [springPosition]);

  return (
    <div className="relative home-page">
      <div className="space-y-24 pb-24 relative z-10">
        {/* Redesigned Hero Section */}
        <motion.section
          initial={{ scale: 0.98, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.1, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          style={{
            background:
              "linear-gradient(to bottom, #fff 0%, #f1f5f9 35%, #f1f5f9 100%)",
          }}
          className="hero-background flex flex-col items-center justify-center pt-44 pb-[40rem] px-4 min-h-[70vh] relative mb-0"
        >

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-10 text-center leading-tight tracking-tight drop-shadow-lg"
          >
            Reimagine your
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="flex items-center justify-center mb-12 text-center"
          >
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
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="text-2xl md:text-2xl text-slate-700 mb-16 max-w-3xl text-center font-medium"
          >
            Restore, enhance, and relive your most precious moments with
            stunning clarity. Fast, secure, and always free.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.9, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-orange-500 text-white border border-orange-600 relative overflow-hidden mb-24 sheen-btn transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600"
            type="button"
            onClick={() => navigate("/upscale")}
          >
            Get Started Now
          </motion.button>
          
          {/* Enhanced Large Slider Card */}
          <motion.div
            ref={(node) => {
              sliderRef.current = node;
              sliderInViewRef(node);
            }}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.1, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            style={{ 
              scale: sliderScale,
              opacity: sliderOpacity,
              y: sliderY,
              rotateZ: sliderRotate,
              filter: `drop-shadow(0 ${shadowBlur}px ${shadowBlur}px rgba(0, 0, 0, 0.12))`,
            }}
            className="w-full max-w-5xl mx-auto mb-8 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              className="bg-white rounded-3xl shadow-2xl shadow-slate-900/15 flex items-center justify-center w-full h-[715px] p-2 slider-glow"
              style={{
                rotateX: mouseY,
                rotateY: mouseX,
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
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
                {/* Enhanced Before/After Labels */}
                <motion.span 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  className="absolute left-4 top-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none backdrop-blur-sm"
                >
                  Before
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  className="absolute right-4 top-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none backdrop-blur-sm"
                >
                  After
                </motion.span>
              </div>
            </motion.div>
            
            {/* Enhanced Animated Down Arrow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex justify-center mt-6"
            >
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.5, 1]
                }}
                className="flex flex-col items-center"
              >
                <ChevronDown className="w-6 h-6 text-orange-500 opacity-80 mb-1" />
              </motion.div>
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
