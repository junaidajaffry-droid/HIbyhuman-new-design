import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { coreServices } from "../data/siteData";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layout,
  Code,
  TrendingUp,
  Compass,
  PenTool,
  Clock,
  ShieldCheck,
  Zap,
  Tag,
  Share2,
  BookOpen,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenFittingModal: (serviceName?: string) => void;
}

const serviceVisualMap: Record<
  string,
  {
    colorString: string;
    lightBg: string;
    borderLight: string;
    icon: React.FC<{ className?: string }>;
  }
> = {
  "social-media-management": {
    colorString: "#6366f1",
    lightBg: "bg-indigo-50/80",
    borderLight: "border-indigo-200",
    icon: Share2,
  },
  branding: {
    colorString: "#d946ef",
    lightBg: "bg-fuchsia-50/80",
    borderLight: "border-fuchsia-200",
    icon: Sparkles,
  },
  "digital-marketing": {
    colorString: "#10b981",
    lightBg: "bg-emerald-50/80",
    borderLight: "border-emerald-200",
    icon: TrendingUp,
  },
  "book-writing-publishing": {
    colorString: "#f59e0b",
    lightBg: "bg-amber-50/80",
    borderLight: "border-amber-200",
    icon: BookOpen,
  },
  "web-mobile-dev": {
    colorString: "#2563eb",
    lightBg: "bg-blue-50/80",
    borderLight: "border-blue-200",
    icon: Code,
  },
  "interactive-design": {
    colorString: "#00d4ff",
    lightBg: "bg-cyan-50/80",
    borderLight: "border-cyan-200",
    icon: Layout,
  },
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenFittingModal,
}) => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const activeService = coreServices[activeServiceIndex];
  const activeVisual =
    serviceVisualMap[activeService.id] || serviceVisualMap["interactive-design"];
  const ActiveIcon = activeVisual.icon;

  return (
    <section
      id="services"
      className="py-20 sm:py-28 px-6 sm:px-10 max-w-7xl mx-auto scroll-mt-24 w-full"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>01 / CORE SERVICE PILLARS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mb-4 font-sans">
          End-to-End Digital Craftsmanship
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
          From bespoke high-performance web applications and native mobile platforms to memorable motion branding and exponential growth funnels, explore our 6 core studio pillars.
        </p>
      </div>

      {/* Interactive Service Explorer & Deliverables Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Pillar Navigation Selector */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-1 px-1">
            Select Service Domain:
          </div>

          {coreServices.map((service, idx) => {
            const isSelected = activeServiceIndex === idx;
            const visual =
              serviceVisualMap[service.id] ||
              serviceVisualMap["interactive-design"];
            const Icon = visual.icon;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveServiceIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border relative overflow-hidden flex items-center justify-between group ${
                  isSelected
                    ? "bg-neutral-950 text-white border-neutral-950 shadow-lg scale-[1.01]"
                    : "bg-white/80 hover:bg-white text-neutral-800 border-neutral-200/80 hover:border-neutral-300 shadow-xs"
                }`}
              >
                {/* Active Indicator Strip */}
                {isSelected && (
                  <div
                    className="absolute left-0 inset-y-0 w-1.5"
                    style={{ backgroundColor: visual.colorString }}
                  />
                )}

                <div className="flex items-center gap-3.5 pl-1">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? "bg-white/10 text-white"
                        : "bg-neutral-100 text-neutral-600 group-hover:text-neutral-900 group-hover:bg-neutral-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider ${
                          isSelected ? "text-cyan-400" : "text-neutral-400"
                        }`}
                      >
                        PILLAR {service.number}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                          isSelected
                            ? "bg-white/10 text-neutral-300"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {service.category}
                      </span>
                    </div>
                    <div
                      className={`text-base font-bold tracking-tight ${
                        isSelected ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {service.name}
                    </div>
                  </div>
                </div>

                <div
                  className={`text-xs font-mono font-semibold ${
                    isSelected ? "text-cyan-400" : "text-neutral-400"
                  }`}
                >
                  {isSelected ? "Active" : "Explore →"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Pillar Deep-Dive Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-3xl bg-white/90 border border-neutral-200/90 shadow-xl p-7 sm:p-10 backdrop-blur-xl relative overflow-hidden"
            >
              {/* Dynamic Top Bar Accent */}
              <div
                className="absolute top-0 inset-x-0 h-1.5 transition-colors duration-500"
                style={{ backgroundColor: activeVisual.colorString }}
              />

              {/* Service Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="p-3.5 rounded-2xl shadow-xs"
                    style={{
                      backgroundColor: `${activeVisual.colorString}18`,
                      color: activeVisual.colorString,
                    }}
                  >
                    <ActiveIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        PILLAR {activeService.number} • {activeService.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-bold">
                        <Tag className="w-2.5 h-2.5 text-rose-600" />
                        50% OFF FIRST ORDER
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                      {activeService.name}
                    </h3>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-100 text-xs font-mono font-semibold text-neutral-600">
                  ⚡ 1–3 Wk Turnaround
                </div>
              </div>

              {/* Tagline & Detailed Description */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-neutral-800 mb-2 font-mono">
                  {activeService.tagline}
                </div>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Key Deliverables & Specifications */}
              <div className="p-6 rounded-2xl bg-neutral-50/90 border border-neutral-200/70 mb-8">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center justify-between">
                  <span>Included Deliverables & Capabilities:</span>
                  <span className="text-emerald-700 font-mono text-xs flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    W3C Certified Clean Code
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: activeVisual.colorString }}
                      />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    100% Code Ownership
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-cyan-700 font-medium">
                    <Zap className="w-4 h-4" />
                    Fixed-Price Scoping
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#pricing"
                    className="px-5 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-950 text-neutral-800 font-medium text-xs sm:text-sm transition-all bg-white hover:bg-neutral-50 cursor-pointer"
                  >
                    View Packages
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenFittingModal(
                        `50% Off First Order — ${activeService.name} (Code: FIRST50)`
                      )
                    }
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg cursor-pointer hover:scale-102"
                    style={{
                      backgroundColor:
                        activeVisual.colorString === "#00d4ff"
                          ? "#0891b2"
                          : activeVisual.colorString,
                    }}
                  >
                    <span>Scope with 50% Off</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
