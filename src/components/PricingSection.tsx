import React, { useState } from "react";
import { motion } from "motion/react";
import { pricingPackages } from "../data/siteData";
import { Check, ShieldCheck, ArrowRight, Sparkles, Zap, Tag, Gift } from "lucide-react";

interface PricingSectionProps {
  onOpenFittingModal: (packageName?: string) => void;
}

const categoryHoverThemes: Record<
  string,
  {
    hoverBg: string;
    hoverBorder: string;
    hoverShadow: string;
    accentColor: string;
    accentBg: string;
    btnHover: string;
  }
> = {
  Website: {
    hoverBg: "hover:bg-[#070e1c]",
    hoverBorder: "hover:border-cyan-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(0,212,255,0.35)]",
    accentColor: "group-hover:text-cyan-400",
    accentBg: "group-hover:bg-cyan-500/20",
    btnHover:
      "group-hover:bg-cyan-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.5)]",
  },
  Logo: {
    hoverBg: "hover:bg-[#160a26]",
    hoverBorder: "hover:border-purple-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.35)]",
    accentColor: "group-hover:text-purple-400",
    accentBg: "group-hover:bg-purple-500/20",
    btnHover:
      "group-hover:bg-purple-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  },
  Ecommerce: {
    hoverBg: "hover:bg-[#061814]",
    hoverBorder: "hover:border-emerald-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(160,185,129,0.35)]",
    accentColor: "group-hover:text-emerald-400",
    accentBg: "group-hover:bg-emerald-500/20",
    btnHover:
      "group-hover:bg-emerald-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  },
  SEO: {
    hoverBg: "hover:bg-[#09152b]",
    hoverBorder: "hover:border-sky-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.35)]",
    accentColor: "group-hover:text-sky-400",
    accentBg: "group-hover:bg-sky-500/20",
    btnHover:
      "group-hover:bg-sky-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]",
  },
  "Digital Marketing": {
    hoverBg: "hover:bg-[#1c0a15]",
    hoverBorder: "hover:border-pink-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(244,63,94,0.35)]",
    accentColor: "group-hover:text-pink-400",
    accentBg: "group-hover:bg-pink-500/20",
    btnHover:
      "group-hover:bg-pink-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)]",
  },
  "Social Media Management": {
    hoverBg: "hover:bg-[#0c0d29]",
    hoverBorder: "hover:border-indigo-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.35)]",
    accentColor: "group-hover:text-indigo-400",
    accentBg: "group-hover:bg-indigo-500/20",
    btnHover:
      "group-hover:bg-indigo-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]",
  },
  Branding: {
    hoverBg: "hover:bg-[#1a0826]",
    hoverBorder: "hover:border-fuchsia-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(217,70,239,0.35)]",
    accentColor: "group-hover:text-fuchsia-400",
    accentBg: "group-hover:bg-fuchsia-500/20",
    btnHover:
      "group-hover:bg-fuchsia-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]",
  },
  "Book Writing & Publishing": {
    hoverBg: "hover:bg-[#211107]",
    hoverBorder: "hover:border-amber-400",
    hoverShadow: "hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.35)]",
    accentColor: "group-hover:text-amber-400",
    accentBg: "group-hover:bg-amber-500/20",
    btnHover:
      "group-hover:bg-amber-400 group-hover:text-neutral-950 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]",
  },
};

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenFittingModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Website");
  const [firstOrderDiscount, setFirstOrderDiscount] = useState<boolean>(true);

  const categories = [
    "Website",
    "Social Media Management",
    "Branding",
    "Digital Marketing",
    "Book Writing & Publishing",
    "Ecommerce",
    "SEO",
    "Logo",
    "All",
  ] as const;

  const filteredPackages =
    selectedCategory === "All"
      ? pricingPackages
      : pricingPackages.filter((p) => p.category === selectedCategory);

  // Helper to compute 50% discount price
  const calculateDiscountPrice = (priceStr: string) => {
    const numeric = parseFloat(priceStr.replace(/,/g, ""));
    if (isNaN(numeric)) return priceStr;
    const discounted = numeric * 0.5;
    if (priceStr.includes(".")) {
      return discounted.toFixed(2);
    }
    return Math.round(discounted).toLocaleString();
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-neutral-200/70 rounded-3xl my-8 scroll-mt-16 shadow-sm">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>TRANSPARENT FIXED-PRICE PACKAGES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
          Tailored packages for every ambition.
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-normal mt-4 leading-relaxed">
          Fixed cost. Zero hidden agency surprises. Backed by our 100% money-back & satisfaction guarantee with total code ownership.
        </p>

        {/* 50% OFF FIRST ORDER Banner in Pricing */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-cyan-500/10 border border-rose-300/60 shadow-sm max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 shrink-0">
              <Gift className="w-3.5 h-3.5 text-yellow-300" />
              <span>50% OFF FIRST ORDER</span>
            </span>
            <div>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 block">
                Welcome Promotion: 50% Off All Packages
              </span>
              <span className="text-[11px] text-neutral-600 block">
                Use code <strong className="font-mono text-neutral-950 bg-white/80 px-1.5 py-0.5 rounded border border-neutral-300">FIRST50</strong> for your first engagement.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-neutral-700">
              <span className={!firstOrderDiscount ? "font-bold text-neutral-950" : "text-neutral-500"}>
                Standard
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={firstOrderDiscount}
                onClick={() => setFirstOrderDiscount(!firstOrderDiscount)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  firstOrderDiscount ? "bg-rose-600" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    firstOrderDiscount ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={firstOrderDiscount ? "font-bold text-rose-600 flex items-center gap-1" : "text-neutral-500"}>
                <span>50% Off (First Order)</span>
              </span>
            </label>
          </div>
        </div>

        {/* Hover hint */}
        <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-mono text-neutral-500">
          <Zap className="w-3 h-3 text-cyan-600" />
          <span>Hover any package card to preview color shift & instant scoping</span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 bg-neutral-100/90 backdrop-blur-sm p-1.5 rounded-2xl max-w-4xl mx-auto border border-neutral-200/60">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-neutral-950 shadow-sm font-semibold"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid with Hover Color Transition */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => {
          const theme =
            categoryHoverThemes[pkg.category] || categoryHoverThemes["Website"];

          return (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`group flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ease-out relative cursor-pointer hover:-translate-y-2.5 ${
                pkg.popular
                  ? `bg-white/95 border-2 border-neutral-950 shadow-xl ${theme.hoverBg} ${theme.hoverBorder} ${theme.hoverShadow}`
                  : `bg-white/90 border border-neutral-200 shadow-sm ${theme.hoverBg} ${theme.hoverBorder} ${theme.hoverShadow}`
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-neutral-950 text-white shadow-md group-hover:bg-cyan-400 group-hover:text-neutral-950 transition-colors">
                    Most Popular Choice
                  </span>
                </div>
              )}

              {/* 50% Off First Order Badge on Card */}
              {firstOrderDiscount && (
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-mono font-bold uppercase tracking-wider group-hover:bg-rose-500/20 group-hover:text-rose-300 group-hover:border-rose-400/30 transition-colors">
                    <Tag className="w-2.5 h-2.5 text-rose-500 group-hover:text-rose-300" />
                    <span>50% OFF FIRST ORDER</span>
                  </span>
                </div>
              )}

              <div>
                {/* Category & Turnaround */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors mb-2">
                  <span className={`${theme.accentColor} transition-colors font-semibold`}>
                    {pkg.category} Package
                  </span>
                  <span className="group-hover:text-neutral-300 transition-colors">
                    ⏱ {pkg.turnaround}
                  </span>
                </div>

                {/* Package Name */}
                <h3 className="text-2xl font-bold text-neutral-950 group-hover:text-white tracking-tight mb-2 transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-xs text-neutral-600 group-hover:text-neutral-300 min-h-[32px] mb-6 transition-colors leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price display with 50% Off support */}
                {firstOrderDiscount ? (
                  <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-neutral-100 group-hover:border-white/15 transition-colors">
                    <span className="text-2xl font-bold text-neutral-900 group-hover:text-white font-mono transition-colors">
                      {pkg.currency}
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-rose-600 group-hover:text-cyan-400 tracking-tight font-sans transition-colors">
                      {calculateDiscountPrice(pkg.price)}
                    </span>
                    <div className="flex flex-col ml-2">
                      <span className="text-xs text-neutral-400 line-through font-mono">
                        {pkg.currency}{pkg.price}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 group-hover:text-rose-300 font-mono">
                        50% OFF
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-400 font-mono ml-auto transition-colors">
                      {pkg.turnaround.includes("Monthly") ? "/ mo" : "one-time"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1 pb-6 mb-6 border-b border-neutral-100 group-hover:border-white/15 transition-colors">
                    <span className="text-2xl font-bold text-neutral-900 group-hover:text-white font-mono transition-colors">
                      {pkg.currency}
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-neutral-950 group-hover:text-white tracking-tight font-sans transition-colors">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-400 font-mono ml-2 transition-colors">
                      {pkg.turnaround.includes("Monthly") ? "/ month" : "one-time"}
                    </span>
                  </div>
                )}

                {/* Feature Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-400 block mb-2 transition-colors">
                    Package Specifications:
                  </span>
                  {pkg.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 group-hover:text-neutral-200 transition-colors"
                    >
                      <Check
                        className={`w-4 h-4 text-cyan-600 ${theme.accentColor} shrink-0 mt-0.5 transition-colors`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Guarantees */}
              <div>
                {/* Guarantees strip */}
                <div className="p-3 rounded-xl bg-neutral-50 group-hover:bg-white/10 border border-neutral-100 group-hover:border-white/15 mb-4 flex items-center gap-2 text-[11px] text-neutral-600 group-hover:text-neutral-200 font-mono transition-colors">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  <span>100% Money Back & Satisfaction Guarantee</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenFittingModal(
                      firstOrderDiscount
                        ? `${pkg.name} (50% Off First Order - Code FIRST50)`
                        : pkg.name
                    )
                  }
                  className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? `bg-neutral-950 text-white shadow-md ${theme.btnHover}`
                      : `bg-neutral-100 text-neutral-900 ${theme.btnHover}`
                  }`}
                >
                  <span>
                    {firstOrderDiscount
                      ? `Claim 50% Off — ${pkg.name}`
                      : `Select ${pkg.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
