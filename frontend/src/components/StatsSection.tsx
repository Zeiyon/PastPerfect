import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function StatsSection() {
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
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-32 mt-12 sm:mt-16 md:mt-20 lg:mt-24 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <div className="flex flex-col items-center flex-1 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-600 mb-3 sm:mb-4">
            {photos.toLocaleString()}+
          </span>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-slate-700 text-center">
            Photos Restored
          </span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-600 mb-3 sm:mb-4">
            {customers}+
          </span>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-slate-700 text-center">
            Happy Customers
          </span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-600 mb-3 sm:mb-4">
            {free}%
          </span>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-slate-700 text-center">
            Free Forever
          </span>
        </div>
      </div>
    </section>
  );
} 