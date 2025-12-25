import { useNavigate } from "react-router-dom";
import { motion, useSpring, useScroll, useMotionValue } from "framer-motion";
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
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(100);
  const springPosition = useSpring(100, {
    stiffness: 100,
    damping: 25,
    mass: 1,
  });

  const [sliderInViewRef] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { scrollY } = useScroll();

  // Motion values for 3D perspective effect
  // Start looking up at user (positive rotateX tilts backward/up), then straighten
  const rotateX = useMotionValue(15);
  const rotateY = useMotionValue(0);
  const perspectiveValue = useMotionValue(1000);
  const perspectiveContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Set initial perspective
    if (perspectiveContainerRef.current) {
      perspectiveContainerRef.current.style.perspective = "1000px";
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const update = () => {
      const y = scrollY.get();

      // Calculate scroll progress (0 to 1) from scroll position 0 to 800
      const scrollRange = 600;
      const progress = Math.min(y / scrollRange, 1);

      // Interpolate rotations: start looking up at user, end straight
      // rotateX: 15deg (looking up) → 0deg (straight)
      rotateX.set(12 * (1 - progress));
      
      // rotateY: 0deg → 0deg (keep it centered)
      rotateY.set(0);

      // Perspective: start with more depth, reduce as it straightens
      const perspective = 1000 - (progress * 200);
      perspectiveValue.set(perspective);
      
      // Update perspective on container directly
      if (perspectiveContainerRef.current) {
        perspectiveContainerRef.current.style.perspective = `${perspective}px`;
      }

      requestAnimationFrame(update);
    };

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [scrollY, isClient, rotateX, rotateY, perspectiveValue]);

  useEffect(() => {
    // Apply slider animation when client is ready
    if (!isClient) return;

    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      springPosition.set(50);
      const unsubscribe = springPosition.on("change", (latest) => {
        setSliderPosition(latest);
      });
      return unsubscribe;
    };
    sequence();
  }, [springPosition, isClient]);

  return (
    <div className="relative home-page">
      {/* Background Pattern for entire page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(148, 163, 184, 0.1) 2.5px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(148, 163, 184, 0.10) 2px, transparent 0)
          `,
          backgroundSize: "60px 60px, 60px 60px",
          backgroundPosition: "0 0, 0 0",
        }}
      />
      <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24 pb-8 sm:pb-12 md:pb-16 lg:pb-24 pt-8 sm:pt-12 md:pt-16 lg:pt-24 relative z-10">
        <motion.section
          initial={{ scale: 0.98, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            background:
              "linear-gradient(to bottom, #fff 0%, #f1f5f9 35%, #f1f5f9 100%)",
          }}
          className="hero-background flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-20 px-4 min-h-[50vh] md:min-h-[70vh] relative mb-0 overflow-hidden"
        >
          {/* Subtle Background Pattern with smooth fade */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(148, 163, 184, 0.1) 2.5px, transparent 0),
                radial-gradient(circle at 30px 30px, rgba(148, 163, 184, 0.10) 2px, transparent 0)
              `,
              backgroundSize: "60px 60px, 60px 60px",
              backgroundPosition: "0 0, 0 0",
            }}
          />
          {/* Smooth fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 10%, transparent 20%, transparent 80%, rgba(241,245,249,0.7) 90%, rgba(241,245,249,1) 100%)",
            }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center leading-tight tracking-tight drop-shadow-lg px-4"
          >
            Reimagine your
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative z-10 flex items-center justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center px-4"
          >
            <span
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center tracking-wide"
              style={{ letterSpacing: "0.05em" }}
            >
              <span className="ml-1 sm:ml-2 md:ml-4 lg:ml-8 text-orange-500 font-extrabold">
                <TypeAnimation
                  sequence={[
                    "Memories",
                    2000,
                    "Photos",
                    1000,
                    "Family",
                    1000,
                    "Loved Ones",
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
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-2xl sm:max-w-3xl text-center font-medium px-4"
          >
            Restore, enhance, and relive your most precious moments with
            stunning clarity. Fast, secure, and just a tap away.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 cursor-pointer px-4 sm:px-6 md:px-8 py-3 md:py-3 rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-md bg-orange-600 text-white border border-orange-700 overflow-hidden mb-4 sm:mb-6 md:mb-8 lg:mb-12 sheen-btn transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600"
            type="button"
            onClick={() => navigate("/restore")}
          >
            Get Started Now
          </motion.button>

          {/* Optimized Animated Slider Wrapper */}
          <div 
            ref={perspectiveContainerRef}
            className="relative z-10 w-full max-w-[95vw] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              ref={(node) => {
                sliderRef.current = node;
                sliderInViewRef(node);
              }}
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-slate-900/15 flex items-center justify-center w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[900px] xl:h-[1000px] p-2 slider-glow"
            >
              <div className="relative w-full h-[380px] sm:h-[480px] md:h-[630px] lg:h-[880px] xl:h-[980px] rounded-xl overflow-hidden">
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
                <span className="absolute left-2 sm:left-3 md:left-4 top-2 sm:top-3 md:top-4 bg-black/70 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-full z-10 select-none backdrop-blur-sm">
                  Before
                </span>
                <span className="absolute right-2 sm:right-3 md:right-4 top-2 sm:top-3 md:top-4 bg-black/70 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-full z-10 select-none backdrop-blur-sm">
                  After
                </span>
              </div>
            </motion.div>
          </div>

          {/* Animated Down Arrow */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="relative z-10 flex justify-center mt-6 sm:mt-8"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 opacity-80" />
          </motion.div>
        </motion.section>

        <div
          className="mb-0 pb-6 sm:pb-8 md:pb-12 lg:pb-16"
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

        <StatsSection />

        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}
