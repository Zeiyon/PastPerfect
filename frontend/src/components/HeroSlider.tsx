import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

type HeroSliderProps = {
  sliderPosition: number;
  setSliderPosition: React.Dispatch<React.SetStateAction<number>>;
  heroExample: { before: string; after: string };
};

export default function HeroSlider({ sliderPosition, setSliderPosition, heroExample }: HeroSliderProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-5xl mx-auto mb-8"
    >
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
  );
} 