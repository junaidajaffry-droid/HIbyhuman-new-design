import React from "react";
import { motion } from "motion/react";
import { HiByHumanLogo, HiByHumanMark } from "./HiByHumanLogo";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Zap,
  Tag,
  Check,
  Award,
  Users,
  Briefcase,
  ChevronDown,
} from "lucide-react";

interface HeroSectionProps {
  onOpenFittingModal: (serviceName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFittingModal,
}) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText("FIRST50");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden text-neutral-900 min-h-[80vh] flex flex-col justify-center border-b border-neutral-200/50"
    >
      {/* Dynamic atmospheric accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] bg-cyan-400/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-amber-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-12 sm:pt-16 pb-16 sm:pb-20 flex flex-col items-center text-center">
        {/* Top Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="p-2 sm:p-2.5 rounded-2xl bg-white/80 border border-neutral-200/80 shadow-sm backdrop-blur-md">
            <HiByHumanLogo size="md" showSubtitle={false} animated={false} theme="light" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-cyan-500/30 text-cyan-900 text-xs font-mono tracking-wide shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="font-semibold">HUMAN IDEAS • INTELLIGENT TECHNOLOGY</span>
          </div>
        </motion.div>

        {/* 50% OFF First Order Hero Promotion Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-cyan-500/15 border border-amber-400/50 shadow-sm backdrop-blur-md max-w-2xl w-full flex flex-wrap items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>50% OFF</span>
            </span>
            <div>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 block">
                First Order Welcome Special: 50% Off Any Project
              </span>
              <span className="text-[11px] text-neutral-600 block">
                Valid for all design, development, SEO & branding packages.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-neutral-950 font-mono font-bold text-xs border border-neutral-300 shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
              title="Click to copy promo code"
            >
              <Tag className="w-3 h-3 text-rose-600" />
              <span>FIRST50</span>
              {copiedCode ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenFittingModal("50% Off First Order Promo (Code: FIRST50)")
              }
              className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-cyan-300 font-semibold text-xs border border-cyan-500/40 shadow-sm cursor-pointer transition-all hover:scale-105 flex items-center gap-1"
            >
              <span>Claim</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.08] mb-6 max-w-4xl font-sans"
        >
          Human ideas.
          <br />
          <span className="font-semibold bg-gradient-to-r from-neutral-950 via-cyan-900 to-cyan-600 bg-clip-text text-transparent">
            Engineered to perfection.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-xl text-neutral-700 leading-relaxed font-normal mb-10 max-w-2xl"
        >
          We build high-converting digital products, intelligent interactive platforms, and scalable web applications for ambitious teams. Transparent fixed pricing, guaranteed velocity, and end-to-end craft.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button
            type="button"
            onClick={() =>
              onOpenFittingModal(
                "50% Off First Order Welcome Consultation (Code: FIRST50)"
              )
            }
            className="px-8 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group cursor-pointer hover:scale-102"
          >
            <span>Claim 50% Off First Order — Free Scoping Call</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#services"
            className="px-7 py-4 rounded-full border border-neutral-300 hover:border-neutral-950 text-neutral-900 font-medium text-sm sm:text-base transition-all bg-white/80 backdrop-blur-sm shadow-sm hover:shadow flex items-center gap-2 text-center cursor-pointer"
          >
            <span>Explore Services</span>
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          </a>

          <a
            href="#pricing"
            className="px-7 py-4 rounded-full border border-neutral-300 hover:border-cyan-600 text-neutral-900 font-medium text-sm sm:text-base transition-all bg-white/80 backdrop-blur-sm shadow-sm hover:shadow text-center cursor-pointer"
          >
            View Pricing Packages
          </a>
        </motion.div>

        {/* Key Guarantees Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 text-left"
        >
          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/80 shadow-xs backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 block font-sans">
                100% Code Ownership
              </span>
              <span className="text-[11px] text-neutral-500">Zero vendor lock-in</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/80 shadow-xs backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200/60">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 block font-sans">
                1–3 Week Sprints
              </span>
              <span className="text-[11px] text-neutral-500">Rapid deployment</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/80 shadow-xs backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 block font-sans">
                Fixed-Price Guarantee
              </span>
              <span className="text-[11px] text-neutral-500">Zero hidden billables</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/80 shadow-xs backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 block font-sans">
                100% Satisfaction
              </span>
              <span className="text-[11px] text-neutral-500">Full money-back policy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
