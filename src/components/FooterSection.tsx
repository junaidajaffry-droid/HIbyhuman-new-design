import React from "react";
import { studioInfo } from "../data/siteData";
import { HiByHumanLogo } from "./HiByHumanLogo";
import { ArrowUpRight, ArrowUp, Mail, Phone, MapPin, Sparkles } from "lucide-react";

interface FooterSectionProps {
  onOpenFittingModal: (subject?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenFittingModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111317] text-white pt-20 pb-12 border-t border-slate-800 overflow-hidden relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Big Conversion Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HIBYHUMAN CREATIVE & TECH STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to bring your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400">
                human ideas to life?
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              We build digital experiences, intelligent solutions and creative systems with 100% bespoke engineering.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenFittingModal("Footer Proposal Request")}
            className="px-8 py-4 rounded-full font-semibold text-sm bg-white text-black hover:bg-neutral-200 transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Let's Talk — Start Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation & Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <HiByHumanLogo size="md" showSubtitle={true} theme="dark" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An award-winning digital agency engineering bespoke web applications, mobile platforms, luxury brand identities, and high-conversion growth engines.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{studioInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`tel:${studioInfo.phone}`} className="hover:text-white transition-colors">
                  {studioInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${studioInfo.email}`} className="hover:text-white transition-colors">
                  {studioInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column: Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">
              Core Pillars
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Interactive Design</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Web & Mobile Apps</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Motion & Branding</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Digital Marketing & SEO</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Concept & Strategy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Illustrations & Prototypes</a></li>
            </ul>
          </div>

          {/* Column: Packages */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">
              Packages
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#pricing" className="hover:text-white transition-colors">Startup Website (£199)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pro Website CMS (£599)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Beginners Logo (£89)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Beginners E-Commerce (£999)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Identity SEO Plan (£849)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Scaling Social Plan (£700)</a></li>
            </ul>
          </div>

          {/* Column: Studio */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">
              Studio & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">System Architecture</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Deliverables Roster</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Delivery Lifecycle</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Client Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} HiByHuman. All rights reserved.
          </div>
          <div className="text-slate-400">
            Human ideas. Powered by intelligent technology.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
