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
} 