import React from "react";
import { processMilestones } from "../data/siteData";
import { CheckCircle2, ArrowRight, GitBranch } from "lucide-react";

interface ProcessSectionProps {
  onOpenFittingModal: (subject?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenFittingModal }) => {
  return (
    <section id="process" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium mb-4">
          <GitBranch className="w-3.5 h-3.5 text-cyan-600" />
          <span>THE DELIVERY LIFECYCLE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
          One expert agency.
          <br />
          <span className="text-neutral-500">Four crystal-clear milestones.</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-normal mt-4 leading-relaxed">
          Our structured sprint methodology guarantees zero scope ambiguity, rapid turnaround, and complete transparency from initial kickoff to cloud deployment.
        </p>
      </div>

      {/* Process 4-Col Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processMilestones.map((step) => (
          <div
            key={step.number}
            className="flex flex-col justify-between p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:bg-white hover:shadow-xl transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-widest">
                  {step.phase}
                </span>
                <span className="text-3xl font-black font-mono text-neutral-300 group-hover:text-neutral-900 transition-colors">
                  {step.number}
                </span>
              </div>

              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-600 bg-neutral-200/60 mb-3">
                ⏱ {step.duration}
              </div>

              <h3 className="text-xl font-bold text-neutral-950 tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                {step.description}
              </p>

              {/* Deliverables checklist */}
              <div className="space-y-2 pt-4 border-t border-neutral-200/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Phase Outputs:
                </span>
                {step.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-200/60">
              <span className="text-[11px] font-mono text-neutral-400">
                Guaranteed Milestone Sign-Off
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-white mb-1">
            Need an accelerated delivery schedule?
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400">
            We offer 24-48 hour rapid sprint kickoffs for time-sensitive launches and funding rounds.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenFittingModal("Accelerated Sprint Delivery")}
          className="px-6 py-3 rounded-full bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Request Fast-Track</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
