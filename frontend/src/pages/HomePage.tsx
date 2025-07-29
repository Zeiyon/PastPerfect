import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
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

  // Manual motion values for smoother performance
  const sliderScale = useMotionValue(1);
  const sliderY = useMotionValue(0);
  const sliderRotate = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const y = scrollY.get();

      // Scale: 1 → 1.25 from y = 300 to y = 800
      const scale =
        y < 300 ? 1 : y < 800 ? 1 + (y - 300) / 2000 : 1.25;
      sliderScale.set(scale);

      // Y translation: 0 → 600 from y = 300 to y = 1000
      const newY = y < 300 ? 0 : y < 1000 ? ((y - 300) / 700) * 600 : 600;
      sliderY.set(newY);

      // Rotation: 0 → 2 degrees from y = 0 to y = 1000
      const rotate = Math.min(y / 500, 2);
      sliderRotate.set(rotate);

      requestAnimationFrame(update);
    };

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [scrollY]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      springPosition.set(50);
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
          className="hero-background flex flex-col items-center justify-center pt-44 pb-[40rem] px-4 min-h-[70vh] relative mb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
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
              ease: [0.25, 0.46, 0.45, 0.94],
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
              ease: [0.25, 0.46, 0.45, 0.94],
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
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-orange-500 text-white border border-orange-600 relative overflow-hidden mb-24 sheen-btn transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600"
            type="button"
            onClick={() => navigate("/upscale")}
          >
            Get Started Now
          </motion.button>

          {/* Optimized Animated Slider Wrapper */}
          <motion.div
            style={{
              scale: sliderScale,
              y: sliderY,
              rotateZ: sliderRotate,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
            }}
            className="w-full max-w-5xl mx-auto mb-8 perspective-1000"
          >
            <div
              ref={(node) => {
                sliderRef.current = node;
                sliderInViewRef(node);
              }}
              className="bg-white rounded-3xl shadow-2xl shadow-slate-900/15 flex items-center justify-center w-full h-[715px] p-2 slider-glow"
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
                <span className="absolute left-4 top-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none backdrop-blur-sm">
                  Before
                </span>
                <span className="absolute right-4 top-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none backdrop-blur-sm">
                  After
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex justify-center mt-6"
            >
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.5, 1],
                }}
                className="flex flex-col items-center"
              >
                <ChevronDown className="w-6 h-6 text-orange-500 opacity-80 mb-1" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

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

        <StatsSection />

        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}
