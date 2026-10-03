import React, { useState } from "react";
import { faqList } from "../data/siteData";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqSectionProps {
  onOpenFittingModal: (subject?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenFittingModal }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-6 sm:px-10 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
          <span>COMMON INQUIRIES & ADVICE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-normal mt-4 leading-relaxed">
          Everything you need to know about intellectual property ownership, turnaround timelines, modern tech stacks, and our 100% money-back guarantee.
        </p>
      </div>

      <div className="space-y-4">
        {faqList.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-neutral-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-neutral-50/80 transition-colors"
              >
                <div className="pr-4">
                  <span className="text-[11px] font-mono text-cyan-600 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-neutral-950">
                    {item.question}
                  </span>
                </div>
                <div
                  className={`p-2 rounded-full bg-neutral-100 text-neutral-600 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-neutral-900 text-white" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-neutral-500 mb-4">
          Have a specific technical or commercial question not answered here?
        </p>
        <button
          type="button"
          onClick={() => onOpenFittingModal("General FAQ Inquiry")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>Ask Our Technical Directors</span>
          <span>→</span>
        </button>
      </div>
    </section>
  );
};
