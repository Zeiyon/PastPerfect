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
  <>
    {/* Restoration Marketing Section */}
    <motion.section
      {...sectionMotionProps}
      style={{ boxShadow: '0 6px 24px 0 rgba(11,32,96,.05)' }}
      className="relative border-1 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-16 overflow-hidden mb-12"
    >
      {/* Left: Interactive Slider */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10">
        <div className="w-full max-w-md h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100">
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
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left z-10">
        <span className="text-orange-500 font-semibold text-sm mb-2 uppercase tracking-wide">
          Damaged Photos
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-6 mt-3">
          Restore the Impossible
        </h2>
        <p className="text-xl text-slate-600 mb-6">
          Tears, scratches, water stains? Gone in a click. Watch your most
          damaged photos come back to life—brighter, clearer, unforgettable.
        </p>
      </div>
    </motion.section>

    {/* Intuitive UI Section (Reversed) */}
    <motion.section
      {...sectionMotionProps}
      style={{ boxShadow: '0 6px 24px 0 rgba(11,32,96,.05)' }}
      className="relative border-1 border-slate-100 flex flex-col md:flex-row-reverse items-center justify-between gap-12 max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-16 overflow-hidden mb-12"
    >
      {/* Sunlight Hue Top Right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 z-0"
        style={{
          background:
            "radial-gradient(circle at 150% 0%, rgba(255, 0, 0, 0.15) 10%, rgba(255,255,255,0) 80%)",
          width: "60%",
          height: "90%",
          filter: "blur(120px)",
        }}
      />
      {/* Right: Demo Image/Slider */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10">
        <div className="w-full max-w-md h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100 flex items-center justify-center">
          <img
            src="/homepage-before-2.jpg"
            alt="Drag and drop UI demo"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </div>
      {/* Left: Marketing Copy */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left z-10">
        <span className="text-orange-500 font-semibold text-sm mb-2 uppercase tracking-wide">
          Effortless Workflow
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-6 mt-3">
          So Simple, Anyone Can Do It
        </h2>
        <p className="text-xl text-slate-600 mb-6">
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
      className="relative border-1 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-16 overflow-hidden mb-12"
    >
    {/* Sunlight Hue Top Right */}
    <div
      className="pointer-events-none absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 z-0"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(255, 0, 0, 0.07) 10%, rgba(255,255,255,0) 80%)",
        width: "60%",
        height: "90%",
        filter: "blur(120px)",
      }}
    />
      {/* Left: Interactive Slider */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10">
        <div className="w-full max-w-md h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100">
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
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left z-10">
        <span className="text-orange-500 font-semibold text-sm mb-2 uppercase tracking-wide">
          Damaged Photos
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-6 mt-3">
          Restore the Impossible
        </h2>
        <p className="text-xl text-slate-600 mb-6">
          Tears, scratches, water stains? Gone in a click. Watch your most
          damaged photos come back to life—brighter, clearer, unforgettable.
        </p>
      </div>
    </motion.section>
  </>
);

export default FeatureSections; 