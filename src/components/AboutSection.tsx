import React, { useState } from "react";
import { studioInfo, clientTestimonials } from "../data/siteData";
import { ShieldCheck, Award, Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface AboutSectionProps {
  onOpenFittingModal: (subject?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenFittingModal }) => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const totalReviews = clientTestimonials.length;

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const currentReview = clientTestimonials[activeReviewIndex];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto border-t border-neutral-200/80">
      {/* Studio Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-20">
        {studioInfo.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/60 flex flex-col justify-between"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-neutral-950 mb-2">
              {stat.value}
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-neutral-900">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-500 font-mono mt-0.5">
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Studio Philosophy & Testimonial Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Studio Philosophy & Guarantees */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium">
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            <span>THE HIBYHUMAN ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight">
            Human ingenuity.
            <br />
            Accelerated by intelligent code.
          </h2>

          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            At HiByHuman, we discard off-the-shelf templates and copy-paste codebases. Every application, identity system, and marketing funnel is architected specifically for your commercial objectives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900 mb-1">
                100% IP Ownership
              </h4>
              <p className="text-xs text-neutral-600">
                You retain full source code, copyright, and master vector design files.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900 mb-1">
                Triple Guarantee
              </h4>
              <p className="text-xs text-neutral-600">
                100% unique design, satisfaction assurance, and complete money-back protection.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Client Testimonials Carousel */}
        <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-neutral-950 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                ✓ Verified Client
              </span>
            </div>

            <blockquote className="text-lg sm:text-xl font-normal text-neutral-100 leading-relaxed mb-8 italic">
              "{currentReview.content}"
            </blockquote>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
            <div>
              <div className="text-base font-bold text-white">
                {currentReview.name}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                {currentReview.role} • {currentReview.company}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevReview}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
