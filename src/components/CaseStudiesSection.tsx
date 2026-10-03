import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { caseStudiesList } from "../data/siteData";
import { CaseStudy } from "../types";
import { Sparkles, ArrowRight, X, CheckCircle2, TrendingUp } from "lucide-react";

interface CaseStudiesSectionProps {
  onOpenFittingModal: (product?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onOpenFittingModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const categories = [
    "All",
    "Web & Mobile UI",
    "Packaging Systems",
    "Outdoor Campaigns",
    "Branding & Identity",
  ];

  const filteredStudies =
    selectedCategory === "All"
      ? caseStudiesList
      : caseStudiesList.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="case-studies"
      className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto scroll-mt-16"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.12]">
            Real Impact. Proven Deliverables.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal mt-4 leading-relaxed">
            Explore our featured client engagements spanning airline booking
            ecosystems, luxury packaging systems, multi-national outdoor
            advertising campaigns, and institutional identity uplifts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200/60 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudies.map((study) => (
          <motion.div
            key={study.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Image banner */}
            <div
              onClick={() => setActiveModalStudy(study)}
              className="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
                  {study.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-mono opacity-80 uppercase tracking-wider block mb-1">
                  {study.client}
                </span>
                <h3 className="text-xl font-bold tracking-tight leading-tight">
                  {study.title}
                </h3>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-neutral-600 line-clamp-2 mb-5">
                  {study.tagline}
                </p>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 mb-5">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <span className="block text-base sm:text-lg font-bold text-neutral-950">
                        {m.value}
                      </span>
                      <span className="block text-[10px] sm:text-[11px] text-neutral-500 font-medium truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-neutral-600 bg-neutral-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalStudy(study)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study In-Depth Detail Modal */}
      <AnimatePresence>
        {activeModalStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalStudy(null)}
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Banner */}
              <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full bg-neutral-950 shrink-0">
                <img
                  src={activeModalStudy.image}
                  alt={activeModalStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setActiveModalStudy(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/80 text-white mb-2 inline-block">
                    {activeModalStudy.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {activeModalStudy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-mono mt-1">
                    Client: {activeModalStudy.client}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Metric strip */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  {activeModalStudy.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-xl sm:text-2xl font-bold text-neutral-950 block">
                        {m.value}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Narrative: Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                      <span>The Challenge</span>
                    </h4>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      {activeModalStudy.challenge}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-800 mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                      <span>The Solution</span>
                    </h4>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      {activeModalStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Key Results */}
                <div>
                  <h4 className="text-sm font-bold text-neutral-950 mb-3">
                    Verified Outcomes & Deliverables
                  </h4>
                  <div className="space-y-2">
                    {activeModalStudy.results.map((res, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeModalStudy.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 text-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-500 font-mono text-center sm:text-left">
                  Ready to achieve similar benchmark results?
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeModalStudy.title;
                    setActiveModalStudy(null);
                    onOpenFittingModal(`Case Study: ${title}`);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
