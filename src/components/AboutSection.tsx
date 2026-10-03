import React, { useState } from "react";
import { studioInfo } from "../data/siteData";
import { TestimonialSlider } from "./TestimonialSlider";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowUpRight,
  LayoutGrid,
  Radio,
} from "lucide-react";

interface AboutSectionProps {
  onOpenFittingModal: (subject?: string) => void;
}

interface TrustedBrand {
  id: string;
  name: string;
  category: string;
  hq: string;
  tagline: string;
  highlightColor: string;
  accentBg: string;
  renderLogo: () => React.ReactNode;
}

const trustedBrands: TrustedBrand[] = [
  {
    id: "remecure",
    name: "RemeCure Labs",
    category: "Biotech & Dermatology",
    hq: "Copenhagen / Dubai",
    tagline: "Clinical medical skincare packaging & visual systems",
    highlightColor: "#0ea5e9",
    accentBg: "bg-sky-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 100 28" className="h-6 w-auto fill-current">
        <circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="12" cy="14" r="3.5" fill="currentColor" />
        <path d="M26 8h4.5c3 0 5 1.5 5 4s-2 4-5 4h-2v4h-2.5V8zm2.5 6h2c1.5 0 2.5-.7 2.5-2s-1-2-2.5-2h-2v4z" />
        <path d="M40 12.5c0-3.5 2.5-5 5.5-5 3.5 0 5.2 2 5.2 5v1.2H42.5c.2 1.5 1.2 2.3 2.8 2.3 1.2 0 2.2-.5 2.6-1.3l1.8.8c-.8 1.5-2.4 2.3-4.5 2.3-3.3 0-5.2-2.2-5.2-5.3zm8.3-.5c0-1.3-.8-2.2-2.8-2.2-1.7 0-2.7.9-2.9 2.2h5.7z" />
        <path d="M54 7.8h2.3v1.8h.1c.8-1.4 2.2-2 3.6-2 1.8 0 3 .8 3.5 2.2.8-1.4 2.3-2.2 4-2.2 2.4 0 4.2 1.6 4.2 4.4v8h-2.4v-7.5c0-1.8-1-2.7-2.3-2.7-1.4 0-2.4 1-2.4 2.7v7.5h-2.4v-7.5c0-1.8-1-2.7-2.3-2.7-1.4 0-2.4 1-2.4 2.7v7.5H54v-12.2z" />
        <path d="M75 14c0-3.5 2.5-6.2 6-6.2 3.5 0 5.8 2.7 5.8 6.2 0 .5 0 .9-.1 1.2h-9.3c.3 2.1 1.7 3.3 3.6 3.3 1.5 0 2.6-.7 3.2-1.7l1.9 1c-1 1.8-2.8 2.7-5.2 2.7-4 0-6-2.8-6-6.5zm9.5-1c-.2-1.8-1.4-3.1-3.5-3.1-2 0-3.2 1.3-3.5 3.1h7z" />
      </svg>
    ),
  },
  {
    id: "world-energy",
    name: "World Energy Council",
    category: "Global Summit & Policy",
    hq: "London / Geneva",
    tagline: "International energy transition dashboards & keynote decks",
    highlightColor: "#10b981",
    accentBg: "bg-emerald-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 120 28" className="h-6 w-auto fill-current">
        <path d="M12 4l-8 16h6l2-4h8l2 4h6L20 4h-8zm3 5l2.5 5h-5L15 9z" fill="currentColor" />
        <path d="M34 8h3v12h-3V8zm8 0h3.2l3.4 8.5L52 8h3.2v12h-3v-8.2l-3.2 8.2h-2L44 11.8V20h-2V8z" />
        <path d="M60 14c0-3.6 2.6-6.2 6.2-6.2 3.6 0 6.2 2.6 6.2 6.2s-2.6 6.2-6.2 6.2c-3.6 0-6.2-2.6-6.2-6.2zm9.4 0c0-2.2-1.4-4-3.2-4s-3.2 1.8-3.2 4 1.4 4 3.2 4 3.2-1.8 3.2-4z" />
        <path d="M78 8h3v7c0 1.8 1.1 2.8 2.6 2.8 1.6 0 2.6-1 2.6-2.8V8h3v7c0 3.3-2 5.2-5.6 5.2-3.6 0-5.6-1.9-5.6-5.2V8z" />
      </svg>
    ),
  },
  {
    id: "nexasphere",
    name: "NexaSphere",
    category: "Fintech & Cloud Systems",
    hq: "London / Zurich",
    tagline: "Scalable B2B microservice portal & secure crypto payments",
    highlightColor: "#6366f1",
    accentBg: "bg-indigo-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 110 28" className="h-6 w-auto fill-current">
        <polygon points="12,4 20,9 20,19 12,24 4,19 4,9" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="12" cy="14" r="3" fill="currentColor" />
        <text x="28" y="19" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.5">
          NEXASPHERE
        </text>
      </svg>
    ),
  },
  {
    id: "vertex-cap",
    name: "Vertex Capital",
    category: "Venture Partners",
    hq: "San Francisco / London",
    tagline: "High-stakes £45M+ venture pitch decks & LP investment reporting",
    highlightColor: "#f59e0b",
    accentBg: "bg-amber-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 115 28" className="h-6 w-auto fill-current">
        <path d="M6 22L14 6L22 22H17L14 15L11 22H6Z" fill="currentColor" />
        <text x="28" y="19" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1">
          VERTEX.CAP
        </text>
      </svg>
    ),
  },
  {
    id: "khan-saboun",
    name: "Khan Al Saboun",
    category: "Artisanal Luxury Heritage",
    hq: "Beirut / Paris / London",
    tagline: "600-year luxury soapcraft packaging & duty-free boutique displays",
    highlightColor: "#d946ef",
    accentBg: "bg-fuchsia-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 120 28" className="h-6 w-auto fill-current">
        <path d="M12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 15c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="currentColor" />
        <path d="M12 8l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="currentColor" />
        <text x="28" y="19" fontFamily="serif" fontWeight="700" fontSize="12" letterSpacing="1.2">
          KHAN AL SABOUN
        </text>
      </svg>
    ),
  },
  {
    id: "red-taxi",
    name: "RED Taxi Mobility",
    category: "Urban Transportation",
    hq: "Beirut / Amman",
    tagline: "150+ fleet livery branding & nationwide billboard launch",
    highlightColor: "#ef4444",
    accentBg: "bg-rose-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 100 28" className="h-6 w-auto fill-current">
        <rect x="4" y="7" width="16" height="14" rx="3" fill="currentColor" />
        <text x="7" y="18" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="10">
          RT
        </text>
        <text x="26" y="19" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.8">
          RED TAXI
        </text>
      </svg>
    ),
  },
  {
    id: "aetheria",
    name: "Aetheria Studios",
    category: "Spatial UI & Web3",
    hq: "Stockholm / Berlin",
    tagline: "Interactive 3D WebGL interfaces & next-gen creative systems",
    highlightColor: "#00d4ff",
    accentBg: "bg-cyan-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 105 28" className="h-6 w-auto fill-current">
        <polygon points="12,4 20,14 12,24 4,14" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <polygon points="12,8 16,14 12,20 8,14" fill="currentColor" />
        <text x="26" y="19" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1.2">
          AETHERIA
        </text>
      </svg>
    ),
  },
  {
    id: "synthetix-ai",
    name: "Synthetix AI",
    category: "Enterprise Intelligence",
    hq: "Cambridge / London",
    tagline: "Autonomous agent interfaces & enterprise workflow platforms",
    highlightColor: "#14b8a6",
    accentBg: "bg-teal-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 110 28" className="h-6 w-auto fill-current">
        <circle cx="8" cy="8" r="3" fill="currentColor" />
        <circle cx="18" cy="8" r="3" fill="currentColor" />
        <circle cx="13" cy="20" r="3.5" fill="currentColor" />
        <line x1="8" y1="8" x2="13" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="8" x2="13" y2="20" stroke="currentColor" strokeWidth="2" />
        <text x="28" y="19" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.5">
          SYNTHETIX
        </text>
      </svg>
    ),
  },
  {
    id: "forma-nordic",
    name: "Forma Nordic",
    category: "Architecture & Design",
    hq: "Copenhagen / Oslo",
    tagline: "Minimalist Scandinavian design language and custom web showcase",
    highlightColor: "#a855f7",
    accentBg: "bg-purple-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 105 28" className="h-6 w-auto fill-current">
        <rect x="4" y="6" width="16" height="4" fill="currentColor" />
        <rect x="4" y="12" width="11" height="4" fill="currentColor" />
        <rect x="4" y="18" width="5" height="4" fill="currentColor" />
        <text x="26" y="19" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1.5">
          FORMA.DK
        </text>
      </svg>
    ),
  },
  {
    id: "meridian-pub",
    name: "Meridian Publishing",
    category: "Literary & Media House",
    hq: "Oxford / New York",
    tagline: "Author ghostwriting, illustrated bestsellers & global KDP distribution",
    highlightColor: "#e11d48",
    accentBg: "bg-rose-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 115 28" className="h-6 w-auto fill-current">
        <circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="12" cy="14" rx="4" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <text x="26" y="19" fontFamily="serif" fontWeight="700" fontSize="12.5" letterSpacing="1">
          MERIDIAN
        </text>
      </svg>
    ),
  },
  {
    id: "el-piropo",
    name: "El Piropo Hospitality",
    category: "Luxury Dining & Wine",
    hq: "London / Madrid",
    tagline: "Embossed menu leatherwork, venue signage & visual identity",
    highlightColor: "#ea580c",
    accentBg: "bg-orange-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 105 28" className="h-6 w-auto fill-current">
        <path d="M8 6h10v3H11v4h6v3h-6v6H8V6z" fill="currentColor" />
        <circle cx="19" cy="19" r="2.5" fill="currentColor" />
        <text x="25" y="19" fontFamily="serif" fontStyle="italic" fontWeight="700" fontSize="13" letterSpacing="0.8">
          El Piropo
        </text>
      </svg>
    ),
  },
  {
    id: "veloce-dyn",
    name: "Veloce Dynamics",
    category: "Automotive & Clean Energy",
    hq: "Milano / London",
    tagline: "High-performance electric powertrain brand mark & telemetry UI",
    highlightColor: "#0284c7",
    accentBg: "bg-sky-500/10",
    renderLogo: () => (
      <svg viewBox="0 0 105 28" className="h-6 w-auto fill-current">
        <polygon points="4,22 10,6 16,6 10,22" fill="currentColor" />
        <polygon points="12,22 18,6 24,6 18,22" fill="currentColor" opacity="0.6" />
        <text x="28" y="19" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.8">
          VELOCE
        </text>
      </svg>
    ),
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenFittingModal }) => {
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto border-t border-neutral-200/80 scroll-mt-24 w-full"
    >
      {/* Studio Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-20">
        {studioInfo.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-neutral-50/90 border border-neutral-200/60 flex flex-col justify-between shadow-xs hover:border-neutral-300 transition-all"
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

      {/* ─────────────────────────────────────────────────────────────
          TRUSTED BY SOCIAL PROOF SECTION (Marquee & Interactive Grid)
          ───────────────────────────────────────────────────────────── */}
      <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-neutral-800/80 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>TRUSTED ECOSYSTEM & SOCIAL PROOF</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight font-sans">
              Trusted by 500+ Industry Leaders & Scaling Startups
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
              From Series-A founders in Silicon Valley and tech innovators in London to global institutions in Geneva and luxury boutiques in Paris, world-class organizations partner with HiByHuman.
            </p>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-neutral-950 p-1 rounded-xl border border-neutral-800 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("marquee")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                viewMode === "marquee"
                  ? "bg-cyan-400 text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Marquee Rail</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-cyan-400 text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Showcase Grid</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area: Continuous Marquee or Responsive Grid */}
        {viewMode === "marquee" ? (
          <div className="relative overflow-hidden w-full py-4 select-none">
            {/* Edge Fade Gradients */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-neutral-900 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-900 to-transparent z-20 pointer-events-none" />

            {/* Marquee Track 1 (Leftward Flow) */}
            <div className="animate-marquee flex items-center gap-6">
              {[...trustedBrands, ...trustedBrands].map((brand, idx) => (
                <div
                  key={`${brand.id}-track1-${idx}`}
                  onClick={() =>
                    onOpenFittingModal(`Partner Inquiries: Similar to ${brand.name}`)
                  }
                  className="group px-6 py-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 flex items-center gap-4 cursor-pointer hover:scale-102 hover:bg-neutral-950 shadow-sm shrink-0"
                  style={{ minWidth: "240px" }}
                >
                  <div className="text-neutral-400 group-hover:text-white transition-colors duration-200">
                    {brand.renderLogo()}
                  </div>
                  <div className="border-l border-neutral-800 pl-3">
                    <div className="text-xs font-bold text-neutral-200 group-hover:text-cyan-400 transition-colors">
                      {brand.name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500">
                      {brand.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hint Beneath Marquee */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-6 pt-4 border-t border-neutral-800/60">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hover over any brand card to pause sliding flow</span>
              </span>
              <span className="hidden sm:inline text-neutral-400">
                100% Commercial IP Transfer • Non-Disclosure Protected
              </span>
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {trustedBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() =>
                  onOpenFittingModal(`Scope project similar to ${brand.name}`)
                }
                className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:bg-neutral-950"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-neutral-400 group-hover:text-white transition-colors">
                      {brand.renderLogo()}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                      {brand.hq}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                    {brand.name}
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {brand.tagline}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-900 text-xs font-mono text-neutral-500 group-hover:text-neutral-300">
                  <span>{brand.category}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Impact Metrics Banner */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">500+</div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">Scaleups & Brands</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">£120M+</div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">Client Capital Raised</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg sm:text-xl font-bold font-mono text-purple-400">99.4%</div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">Satisfaction Rating</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">24 Hours</div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">Rapid Kickoff Time</div>
          </div>
        </div>
      </div>

      {/* Two-Column Studio Philosophy & Testimonial Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Studio Philosophy & Guarantees */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-800 text-xs sm:text-sm font-medium">
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            <span>THE HIBYHUMAN ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight font-sans">
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

        {/* Right: Interactive Auto-Cycling Testimonial Slider */}
        <div className="lg:col-span-6 w-full flex">
          <TestimonialSlider onOpenFittingModal={onOpenFittingModal} />
        </div>
      </div>
    </section>
  );
};
