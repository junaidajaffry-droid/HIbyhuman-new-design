import React from "react";
import { motion } from "motion/react";

interface LogoMarkProps {
  className?: string;
  animated?: boolean;
}

export const HiByHumanMark: React.FC<LogoMarkProps> = ({
  className = "w-10 h-10",
  animated = false,
}) => {
  const content = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full overflow-visible drop-shadow-[0_4px_16px_rgba(0,180,255,0.4)]"
    >
      <defs>
        <radialGradient
          id="hbhHeadGrad"
          cx="38%"
          cy="32%"
          r="68%"
          fx="35%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#80f7ff" />
          <stop offset="28%" stopColor="#00d4ff" />
          <stop offset="70%" stopColor="#0066ff" />
          <stop offset="100%" stopColor="#0038a8" />
        </radialGradient>
        <linearGradient
          id="hbhLeftGrad"
          x1="15%"
          y1="10%"
          x2="85%"
          y2="90%"
        >
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="35%" stopColor="#00a3ff" />
          <stop offset="75%" stopColor="#0052cc" />
          <stop offset="100%" stopColor="#002d80" />
        </linearGradient>
        <linearGradient
          id="hbhRightGrad"
          x1="10%"
          y1="15%"
          x2="90%"
          y2="85%"
        >
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="40%" stopColor="#0088ff" />
          <stop offset="80%" stopColor="#004cd4" />
          <stop offset="100%" stopColor="#002575" />
        </linearGradient>
        <linearGradient
          id="hbhCrossGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#00d8ff" />
          <stop offset="50%" stopColor="#0077ff" />
          <stop offset="100%" stopColor="#0044b8" />
        </linearGradient>
        <linearGradient
          id="hbhHighlight"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#80f7ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
        <filter
          id="hbhDepthGlow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="#0088ff"
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      {/* Head */}
      <g className="transition-transform">
        <ellipse cx="100" cy="74" rx="22" ry="7" fill="#001844" opacity="0.35" />
        <circle
          cx="100"
          cy="48"
          r="26"
          fill="url(#hbhHeadGrad)"
          filter="url(#hbhDepthGlow)"
        />
        <ellipse
          cx="92"
          cy="40"
          rx="10"
          ry="6"
          transform="rotate(-25 92 40)"
          fill="#ffffff"
          opacity="0.65"
        />
      </g>

      {/* Torso & limbs */}
      <g>
        <path
          d={`M 28 42
              C 24 55, 26 80, 42 110
              C 52 130, 56 148, 56 178
              C 56 186, 48 192, 38 192
              L 28 192
              C 20 192, 14 186, 14 178
              C 14 125, 20 78, 48 30
              C 54 20, 68 22, 66 35
              C 64 45, 52 70, 52 92
              Z`}
          fill="url(#hbhLeftGrad)"
          opacity="0.95"
        />
        <path
          d={`M 24 38
              C 34 22, 60 48, 68 85
              C 74 112, 70 145, 70 188
              L 52 188
              C 52 145, 48 115, 34 85
              C 24 64, 18 48, 24 38 Z`}
          fill="url(#hbhLeftGrad)"
        />
        <path
          d={`M 176 38
              C 166 22, 140 48, 132 85
              C 126 112, 130 145, 130 188
              L 148 188
              C 148 145, 152 115, 166 85
              C 176 64, 182 48, 176 38 Z`}
          fill="url(#hbhRightGrad)"
        />
        <path
          d={`M 52 120
              C 72 108, 92 102, 100 102
              C 108 102, 128 108, 148 120
              C 136 142, 120 152, 100 152
              C 80 152, 64 142, 52 120 Z`}
          fill="url(#hbhCrossGrad)"
        />
        <path
          d={`M 44 112
              C 70 94, 130 94, 156 112
              C 146 132, 126 144, 100 144
              C 74 144, 54 132, 44 112 Z`}
          fill="url(#hbhHighlight)"
          opacity="0.8"
        />
        <path
          d="M 28 42 C 38 32, 58 55, 66 88"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 174 42 C 164 32, 144 55, 134 88"
          stroke="#80f7ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 0.5, -0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={className}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={className}>{content}</div>;
};

interface HiByHumanLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
  theme?: "light" | "dark" | "auto";
}

export const HiByHumanLogo: React.FC<HiByHumanLogoProps> = ({
  size = "md",
  showSubtitle = true,
  animated = false,
  className = "",
  theme = "auto",
}) => {
  const isHero = size === "hero";
  const isLg = size === "lg";
  const isSm = size === "sm";

  const textColor =
    theme === "dark"
      ? "text-white"
      : theme === "light"
      ? "text-neutral-950"
      : "text-neutral-900 dark:text-white";

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2 sm:gap-3.5 relative">
        <HiByHumanMark
          animated={animated}
          className={
            isHero
              ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              : isLg
              ? "w-12 h-12 sm:w-14 sm:h-14"
              : isSm
              ? "w-7 h-7 sm:w-8 sm:h-8"
              : "w-9 h-9 sm:w-11 sm:h-11"
          }
        />
        <div className="flex flex-col relative justify-center">
          <span
            className={`font-extrabold tracking-tight font-sans leading-none ${textColor} ${
              isHero
                ? "text-4xl sm:text-6xl md:text-7xl"
                : isLg
                ? "text-3xl sm:text-4xl md:text-5xl"
                : isSm
                ? "text-xl sm:text-2xl"
                : "text-2xl sm:text-3xl md:text-4xl"
            }`}
            style={{
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: "-0.03em",
            }}
          >
            <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              HiByHuman
            </span>
          </span>

          {/* Underline cyber glow swoosh */}
          <div className="relative w-full h-3 sm:h-4 -mt-0.5 sm:-mt-1 overflow-visible">
            <svg
              viewBox="0 0 300 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]"
            >
              <defs>
                <linearGradient
                  id="swooshGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0066ff" stopOpacity="0.2" />
                  <stop offset="15%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#00f5ff" />
                  <stop offset="85%" stopColor="#00aaff" />
                  <stop offset="100%" stopColor="#0055ff" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                d={`M 5 6
                    C 75 26, 215 28, 295 8
                    C 210 34, 75 32, 5 6 Z`}
                fill="url(#swooshGrad)"
              />
            </svg>
          </div>
        </div>
      </div>

      {showSubtitle && (
        <div className="mt-1 flex items-center gap-1.5 opacity-80 text-[11px] sm:text-xs font-mono tracking-widest text-cyan-400">
          <span>HUMAN IDEAS</span>
          <span>•</span>
          <span>INTELLIGENT TECH</span>
        </div>
      )}
    </div>
  );
};
