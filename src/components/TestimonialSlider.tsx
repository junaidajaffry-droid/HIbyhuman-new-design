import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clientTestimonials } from "../data/siteData";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface TestimonialSliderProps {
  onOpenFittingModal: (subject?: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  onOpenFittingModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const total = clientTestimonials.length;
  const AUTO_PLAY_INTERVAL = 5500; // 5.5s per testimonial

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Auto-play interval timer with progress tracking
  useEffect(() => {
    if (isPaused || isHovered) return;

    const progressStepMs = 50;
    const increment = (progressStepMs / AUTO_PLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, progressStepMs);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) handlePrev();
    else if (delta < -40) handleNext();
    touchStartX.current = null;
  };

  const current = clientTestimonials[currentIndex];
  const avatarInitials = current.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-full flex flex-col justify-between rounded-3xl bg-neutral-950 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-neutral-800 select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Ambient Glow matching the testimonial's category accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/12 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      {/* Top Header Bar: Stars, Verified Tag & Auto-cycle Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">
            5.0 / 5.0
          </span>
          <span className="hidden sm:inline-block text-neutral-600">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Verified Client</span>
          </span>
        </div>

        {/* Auto-Cycle Controls & Live State */}
        <div className="flex items-center gap-2">
          {/* Pause on Hover / Status pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-400">
            {isHovered ? (
              <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                <Pause className="w-2.5 h-2.5" />
                <span>Hover Paused</span>
              </span>
            ) : isPaused ? (
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                <Pause className="w-2.5 h-2.5" />
                <span>Paused</span>
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Auto-Cycling</span>
              </span>
            )}
          </div>

          {/* Manual Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume auto-cycling" : "Pause auto-cycling"}
            aria-label={isPaused ? "Resume slider" : "Pause slider"}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <Pause className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Animated Review Body with Slide Transition */}
      <div className="relative min-h-[220px] sm:min-h-[200px] flex flex-col justify-between z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col justify-between"
          >
            {/* Sector / Category & Result Metric Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {current.serviceCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/10 text-cyan-300 text-xs font-mono font-medium border border-cyan-400/20">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{current.serviceCategory}</span>
                </span>
              )}
              {current.metric && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>{current.metric}</span>
                </span>
              )}
            </div>

            {/* Testimonial Quote */}
            <div className="relative my-2">
              <Quote className="absolute -top-3 -left-3 w-8 h-8 text-white/5 pointer-events-none" />
              <blockquote className="text-base sm:text-lg lg:text-xl font-normal text-neutral-100 leading-relaxed italic relative z-10">
                "{current.content}"
              </blockquote>
            </div>

            {/* Client Signature & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-neutral-800/80">
              <div className="flex items-center gap-3.5">
                {/* Author Monogram Avatar */}
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${
                    current.avatarGradient || "from-cyan-500 to-indigo-600"
                  } text-white font-bold font-mono text-sm flex items-center justify-center shadow-md shrink-0`}
                >
                  {avatarInitials}
                </div>

                <div>
                  <div className="text-base font-bold text-white leading-tight">
                    {current.name}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-0.5">
                    {current.role} • <span className="text-neutral-300 font-semibold">{current.company}</span>
                  </div>
                </div>
              </div>

              {/* Consultation trigger matching this review's outcome */}
              <button
                type="button"
                onClick={() =>
                  onOpenFittingModal(
                    `Case Inquiry: Similar to ${current.company} (${current.serviceCategory || "Full Project"})`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 font-mono text-xs font-medium border border-cyan-400/30 transition-all cursor-pointer hover:scale-102"
              >
                <span>Scope Similar</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar: Displays Auto-cycle Progress */}
      <div className="w-full h-1 bg-neutral-800/80 rounded-full overflow-hidden my-6 relative z-10">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-rose-400 transition-all duration-75 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Controls: Direct Pagination Dots & Navigation Arrows */}
      <div className="relative z-10 flex items-center justify-between gap-4 pt-2">
        {/* Pagination Dots with Active Expansion */}
        <div className="flex items-center gap-1.5">
          {clientTestimonials.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to review by ${item.name}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.6)]"
                    : "w-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
              />
            );
          })}
        </div>

        {/* Counter and Navigation Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-2">
            <span className="text-white font-bold">{currentIndex + 1}</span> / {total}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous client testimonial"
            className="p-2.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800 shadow-sm cursor-pointer hover:border-neutral-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next client testimonial"
            className="p-2.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800 shadow-sm cursor-pointer hover:border-neutral-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
