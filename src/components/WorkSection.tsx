import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { capabilitiesList } from "../data/siteData";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Layers } from "lucide-react";

interface WorkSectionProps {
  onOpenFittingModal: (itemTitle?: string) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenFittingModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = capabilitiesList.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 45) handlePrev();
    else if (delta < -45) handleNext();
    touchStartX.current = null;
  };

  const current = capabilitiesList[activeIndex];

  return (
    <section
      id="portfolio"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="py-20 sm:py-28 bg-[#f5f5f3]/85 backdrop-blur-[2px] text-slate-900 overflow-hidden relative scroll-mt-16"
    >
      <div id="work" className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-200/80 text-neutral-800 text-xs font-mono uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-neutral-700" />
              <span>PORTFOLIO & CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
              Studio Portfolio & Craft.
              <br />
              <span className="text-neutral-500">From concept to global publication.</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-mono text-neutral-500 mr-2">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous capability"
              className="p-3 rounded-full bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next capability"
              className="p-3 rounded-full bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Jump Rail */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {capabilitiesList.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                activeIndex === idx
                  ? "bg-neutral-950 text-white border-neutral-950 shadow-sm"
                  : "bg-white/80 text-neutral-600 border-neutral-200 hover:bg-white hover:text-neutral-950"
              }`}
            >
              <span className="font-mono opacity-60 mr-1.5">{item.number}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Active Item Showcase Card */}
        <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-xl overflow-hidden group hover:border-cyan-500/30 transition-colors">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-12"
            >
              {/* Top Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-neutral-300">
                    {current.number}
                  </span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 font-semibold block">
                      {current.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 text-xs font-mono text-neutral-700">
                  Client Focus: {current.client}
                </span>
              </div>

              {/* Body Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                    {current.description}
                  </p>

                  {/* Deliverables list */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Core Key Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.deliverables.map((d, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-neutral-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                      Tooling & Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {current.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-md text-xs font-mono bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Specs Table */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4 pb-2 border-b border-neutral-200">
                      Standard SLA & Specifications
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(current.specs).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-neutral-500 font-mono">
                            {key.replace(/_/g, " ")}:
                          </span>
                          <span className="font-semibold text-neutral-900 text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenFittingModal(current.title)}
                      className="w-full py-3.5 rounded-full bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Scope this Deliverable</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-center text-[11px] font-mono text-neutral-400">
                      100% Client Commercial Rights Included
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
