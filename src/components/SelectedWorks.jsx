import React, { useState } from 'react';
import { ArrowUpRight, Award, Layers, ShieldCheck, Flame } from 'lucide-react';
import { soundFX } from '../utils/sound';

const PROJECTS = [
  {
    id: '01',
    title: 'AURA PROTOCOL',
    client: 'HAUTE HORLOGERIE',
    category: 'Kinetic 3D & WebGL',
    year: '2026',
    awards: 'FWA of the Day / Awwwards SOTD',
    summary: 'A bespoke timekeeping interface with continuous real-time angle tracking and photorealistic caustics.',
  },
  {
    id: '02',
    title: 'MONOLITH 08',
    client: 'BALENCIAGA PARIS',
    category: 'Spatial Design & Character Direction',
    year: '2026',
    awards: 'Cannes Bronze Lion',
    summary: 'Virtual runway showcase with zero-latency cursor response and interactive procedural head mechanics.',
  },
  {
    id: '03',
    title: 'CHRONO DYNASTY',
    client: 'WARNER BROS KINETIC',
    category: 'Procedural Character Engineering',
    year: '2025',
    awards: 'Site of the Month',
    summary: '64-frame circular gaze redirection engine engineered for hero character storytelling.',
  },
  {
    id: '04',
    title: 'NEO-TITAN',
    client: 'CYBERNETIC LUXURY',
    category: 'Interactive Installation',
    year: '2025',
    awards: 'Red Dot Best of the Best',
    summary: 'Interactive spatial presence installation with real-time eye contact lock and ocular micro-movements.',
  },
];

export default function SelectedWorks() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="works" className="relative py-28 px-6 sm:px-10 z-20 border-t border-white/10 luxury-bg-gradient">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-gold-accent mb-3">
              <Layers className="w-4 h-4" />
              <span>CURATED ARCHIVE &bull; 2025&mdash;2026</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
              SELECTED WORKS
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-md font-sans leading-relaxed">
            Merging ultra-smooth 60 FPS animation pipelines with haute couture digital creative direction for vanguard global brands.
          </p>
        </div>

        {/* Project List */}
        <div className="divide-y divide-white/10">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              onMouseEnter={() => {
                soundFX.playClick();
                setActiveProject(idx);
              }}
              className="group py-8 sm:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] px-4 -mx-4 rounded-xl"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono-tech text-xs sm:text-sm text-white/40 group-hover:text-gold-accent transition-colors">
                  {proj.id}
                </span>
                <div>
                  <h3 className="font-syne text-2xl sm:text-4xl font-bold text-white group-hover:text-gold-accent transition-colors flex items-center gap-3">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-gold-accent" />
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs font-mono-tech text-white/60">
                    <span>{proj.client}</span>
                    <span>&bull;</span>
                    <span className="text-white/40">{proj.category}</span>
                  </div>
                </div>
              </div>

              <div className="lg:max-w-md flex flex-col lg:items-end gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-tech text-amber-300 w-fit">
                  <Award className="w-3.5 h-3.5 text-gold-accent" />
                  <span>{proj.awards}</span>
                </div>
                <p className="text-xs text-white/50 lg:text-right font-sans">
                  {proj.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recognition Strip */}
        <div id="recognition" className="mt-24 pt-12 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center font-mono-tech">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="font-syne text-3xl sm:text-4xl font-bold text-gold-accent mb-1">08</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">Awwwards SOTD</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="font-syne text-3xl sm:text-4xl font-bold text-white mb-1">05</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">FWA of the Day</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="font-syne text-3xl sm:text-4xl font-bold text-gold-accent mb-1">02</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">Cannes Lions</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="font-syne text-3xl sm:text-4xl font-bold text-white mb-1">60 FPS</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">Zero Lag Engine</div>
          </div>
        </div>

      </div>
    </section>
  );
}
