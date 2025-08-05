import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { motion } from "framer-motion";
import React from "react";

const sectionMotionProps = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7 },
};

const FeatureSections: React.FC = () => (
  <div className="px-4 sm:px-6 md:px-8">
    {/* Restoration Marketing Section */}
    <motion.section
      {...sectionMotionProps}
      style={{ 
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
      }}
      className="relative border-1 border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-6xl mx-auto bg-white rounded-2xl p-6 sm:p-8 lg:p-16 overflow-hidden mb-8 sm:mb-12"
    >
      {/* Left: Interactive Slider */}
      <div className="w-full lg:w-1/2 flex justify-center items-center z-10 order-2 lg:order-1">
        <div className="w-full max-w-sm sm:max-w-md h-[250px] sm:h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src="/homepage-before-1.jpg"
                alt="Torn photo before restoration"
                style={{ borderRadius: "0.75rem" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/homepage-after-1.jpg"
                alt="Restored photo after AI"
                style={{ borderRadius: "0.75rem" }}
              />
            }
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0.75rem",
            }}
            handle={<div className="custom-slider-handle" />}
            position={50}
          />
        </div>
      </div>
      {/* Right: Marketing Copy */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left z-10 order-1 lg:order-2">
        <span className="text-orange-500 font-semibold text-xs sm:text-sm mb-2 uppercase tracking-wide">
          Damaged Photos
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 lg:mb-6 mt-2 lg:mt-3">
          Restore the Impossible
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-4 lg:mb-6">
          Tears, scratches, water stains? Gone in a click. Watch your most
          damaged photos come back to life—brighter, clearer, unforgettable.
        </p>
      </div>
    </motion.section>

    {/* Intuitive UI Section (Reversed) */}
    <motion.section
      {...sectionMotionProps}
      style={{ boxShadow: '0 6px 24px 0 rgba(11,32,96,.05)' }}
      className="relative border-1 border-slate-100 flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12 max-w-6xl mx-auto bg-white rounded-2xl p-6 sm:p-8 lg:p-16 overflow-hidden mb-8 sm:mb-12"
    >
      {/* Sunlight Hue Top Right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 z-0"
        style={{
          background:
            "radial-gradient(circle at 150% 0%, rgba(255, 0, 0, 0.15) 10%, rgba(255,255,255,0) 80%)",
          width: "60%",
          height: "90%",
          filter: "blur(120px)",
        }}
      />
      {/* Right: Demo Image/Slider */}
      <div className="w-full lg:w-1/2 flex justify-center items-center z-10 order-2">
        <div className="w-full max-w-sm sm:max-w-md h-[250px] sm:h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100 flex items-center justify-center">
          <img
            src="/homepage-before-2.jpg"
            alt="Drag and drop UI demo"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </div>
      {/* Left: Marketing Copy */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left z-10 order-1">
        <span className="text-orange-500 font-semibold text-xs sm:text-sm mb-2 uppercase tracking-wide">
          Effortless Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 lg:mb-6 mt-2 lg:mt-3">
          So Simple, Anyone Can Do It
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-4 lg:mb-6">
          Drag & drop your photos or videos—one or many. Tweak a few
          settings, hit go, and let our smart system handle the rest. Clean,
          intuitive, and lightning fast.
        </p>
      </div>
    </motion.section>

    {/* Restoration Marketing Section (Duplicate) */}
    <motion.section
      {...sectionMotionProps}
      style={{ boxShadow: '0 6px 24px 0 rgba(11,32,96,.05)' }}
      className="relative border-1 border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-6xl mx-auto bg-white rounded-2xl p-6 sm:p-8 lg:p-16 overflow-hidden"
    >
    {/* Sunlight Hue Top Right */}
    <div
      className="pointer-events-none absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 z-0"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(255, 0, 0, 0.07) 10%, rgba(255,255,255,0) 80%)",
        width: "60%",
        height: "90%",
        filter: "blur(120px)",
      }}
    />
      {/* Left: Interactive Slider */}
      <div className="w-full lg:w-1/2 flex justify-center items-center z-10 order-2 lg:order-1">
        <div className="w-full max-w-sm sm:max-w-md h-[250px] sm:h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src="/homepage-before-1.jpg"
                alt="Torn photo before restoration"
                style={{ borderRadius: "0.75rem" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/homepage-after-1.jpg"
                alt="Restored photo after AI"
                style={{ borderRadius: "0.75rem" }}
              />
            }
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0.75rem",
            }}
            handle={<div className="custom-slider-handle" />}
            position={50}
          />
        </div>
      </div>
      {/* Right: Marketing Copy */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left z-10 order-1 lg:order-2">
        <span className="text-orange-500 font-semibold text-xs sm:text-sm mb-2 uppercase tracking-wide">
          Damaged Photos
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 lg:mb-6 mt-2 lg:mt-3">
          Restore the Impossible
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-4 lg:mb-6">
          Tears, scratches, water stains? Gone in a click. Watch your most
          damaged photos come back to life—brighter, clearer, unforgettable.
        </p>
      </div>
    </motion.section>
  </div>
);

export default FeatureSections; 