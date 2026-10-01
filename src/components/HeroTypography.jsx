import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function HeroTypography({ onTalkClick, onResumeClick }) {
  return (
    <div className="absolute left-6 sm:left-12 lg:left-16 bottom-10 sm:bottom-14 z-20 max-w-[340px] pointer-events-auto flex flex-col items-start select-none">
      
      {/* "Hi, I'm" in clean, spaced modern sans-serif */}
      <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-white/80 font-medium mb-1 hero-text-shadow">
        Hi, I'm
      </span>

      {/* Name in large, elegant cursive script with soft drop shadow */}
      <h1 className="font-cursive text-6xl sm:text-7xl lg:text-8xl text-white font-bold leading-none mb-3 cursive-shadow">
        Lohitha
      </h1>

      {/* Compact 3-line bio about Full Stack Development (max-width ~340px) */}
      <p className="max-w-[340px] text-xs sm:text-sm text-white/75 font-sans leading-relaxed mb-6 hero-text-shadow">
        Full Stack Developer crafting resilient web architectures and kinetic digital interfaces. Merging modern frontend precision with high-octane backend performance.
      </p>

      {/* Two stylish white pill buttons */}
      <div className="flex items-center gap-3 w-full">
        {/* Resume: Solid white pill button with arrow icon */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onResumeClick) onResumeClick();
          }}
          className="group px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/20"
        >
          <span>Resume</span>
          <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* Let's Talk: Frosted glass / white border */}
        <button
          onClick={() => {
            soundFX.playChime();
            if (onTalkClick) onTalkClick();
          }}
          className="px-6 py-2.5 rounded-full bg-white/10 border border-white/40 text-white font-semibold text-xs tracking-wider uppercase backdrop-blur-md hover:bg-white/20 hover:border-white hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Let's Talk
        </button>
      </div>

    </div>
  );
}
