import React, { useState, useCallback } from 'react';
import FrostedHeader from './components/FrostedHeader';
import CharacterCanvas from './components/CharacterCanvas';
import HeroTypography from './components/HeroTypography';
import MagneticCursor from './components/MagneticCursor';
import HudWidget from './components/HudWidget';
import InteractiveControls from './components/InteractiveControls';
import SelectedWorks from './components/SelectedWorks';
import Preloader from './components/Preloader';
import TechnicalSpecsModal from './components/TechnicalSpecsModal';
import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import { ArrowDown, Cpu, Sparkles, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
import { soundFX } from './utils/sound';

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [telemetry, setTelemetry] = useState(null);
  const [autoOrbit, setAutoOrbit] = useState(false);
  const [forceAngle, setForceAngle] = useState(null);
  const [deadzoneRadiusRatio, setDeadzoneRadiusRatio] = useState(0.12);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHudExpanded, setIsHudExpanded] = useState(false);

  const handleSnapDirection = useCallback((angle) => {
    setForceAngle(angle);
    if (angle !== null) {
      setTimeout(() => {
        setForceAngle(null);
      }, 2200);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#940c0d] luxury-bg-gradient text-white selection:bg-white selection:text-black">
      
      {/* Preloader with WebP Frame Extraction Caching */}
      <Preloader progress={loadingProgress} isReady={isReady} />

      {/* Custom Magnetic Cursor: Glowing white dot with smooth trailing aura ring */}
      <MagneticCursor telemetry={telemetry} />

      {/* Floating Frosted-Glass Navigation Pill Centered at Very Top */}
      <FrostedHeader
        onContactClick={() => setIsContactOpen(true)}
        onAboutClick={() => setIsSpecsOpen(true)}
      />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative w-screen h-screen min-h-[640px] flex items-center justify-center overflow-hidden select-none"
      >
        {/* Subtle Film Grain Texture Overlay */}
        <div className="absolute inset-0 film-grain pointer-events-none z-10" />

        {/* FULL SCREEN ZERO-GHOSTING 60 FPS CANVAS (100vw, 100vh, object-fit: cover) */}
        <div className="absolute inset-0 w-screen h-screen pointer-events-none z-0">
          <CharacterCanvas
            onProgress={setLoadingProgress}
            onLoaded={() => setIsReady(true)}
            onTelemetry={setTelemetry}
            deadzoneRadiusRatio={deadzoneRadiusRatio}
            autoOrbit={autoOrbit}
            forceAngle={forceAngle}
          />
        </div>

        {/* HERO TYPOGRAPHY (BOTTOM-LEFT) */}
        <HeroTypography
          onTalkClick={() => setIsContactOpen(true)}
          onResumeClick={() => setIsResumeOpen(true)}
        />

        {/* BOTTOM-RIGHT: INTERACTIVE HUD & KINETIC CONTROLS CAPSULE */}
        <div className="absolute right-6 sm:right-12 bottom-10 sm:bottom-14 z-20 pointer-events-auto flex flex-col items-end gap-3 select-none">
          
          {/* Expanded HUD View */}
          {isHudExpanded && (
            <div className="flex flex-col gap-3 mb-1 animate-fadeIn items-end">
              <HudWidget telemetry={telemetry} />
              <InteractiveControls
                autoOrbit={autoOrbit}
                setAutoOrbit={setAutoOrbit}
                onSnapDirection={handleSnapDirection}
                deadzoneRadiusRatio={deadzoneRadiusRatio}
                setDeadzoneRadiusRatio={setDeadzoneRadiusRatio}
              />
            </div>
          )}

          {/* Toggle HUD Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setIsSpecsOpen(true);
              }}
              className="px-3 py-1.5 rounded-full bg-black/40 border border-white/15 text-[10px] font-mono-tech text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <Cpu className="w-3 h-3 text-gold-accent" />
              <span className="uppercase">60 FPS SPECS</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setIsHudExpanded(!isHudExpanded);
              }}
              className="px-3 py-1.5 rounded-full bg-black/40 border border-white/15 text-[10px] font-mono-tech text-white/80 hover:text-white hover:bg-black/60 backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-300" />
              <span className="uppercase">{isHudExpanded ? 'HIDE RADAR' : 'LIVE RADAR'}</span>
              {isHudExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
          </div>

        </div>

        {/* MARQUEE CLIENTS & TECH TICKER AT THE VERY BOTTOM OF HERO */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden py-2 bg-black/30 border-t border-white/10 backdrop-blur-md z-20 pointer-events-none">
          <div className="animate-marquee whitespace-nowrap text-[10px] font-mono-tech tracking-widest uppercase text-white/50 flex items-center gap-10">
            <span>FULL STACK ARCHITECTURE</span>
            <span>&bull;</span>
            <span>REACT 19 &bull; TYPESCRIPT</span>
            <span>&bull;</span>
            <span>60 FPS KINETIC CHARACTER ENGINE</span>
            <span>&bull;</span>
            <span>OPENCV 64-WEBP CIRCULAR LERP</span>
            <span>&bull;</span>
            <span>PYTHON &bull; NODE.JS &bull; POSTGRESQL</span>
            <span>&bull;</span>
            <span>HIGH-OCTANE DIGITAL CRAFT</span>
            <span>&bull;</span>
            <span>AWARD-WINNING INTERACTIVE SYSTEMS</span>
            <span>&bull;</span>
            {/* Duplicated for smooth loop */}
            <span>FULL STACK ARCHITECTURE</span>
            <span>&bull;</span>
            <span>REACT 19 &bull; TYPESCRIPT</span>
            <span>&bull;</span>
            <span>60 FPS KINETIC CHARACTER ENGINE</span>
            <span>&bull;</span>
            <span>OPENCV 64-WEBP CIRCULAR LERP</span>
            <span>&bull;</span>
            <span>PYTHON &bull; NODE.JS &bull; POSTGRESQL</span>
            <span>&bull;</span>
            <span>HIGH-OCTANE DIGITAL CRAFT</span>
            <span>&bull;</span>
            <span>AWARD-WINNING INTERACTIVE SYSTEMS</span>
          </div>
        </div>

      </section>

      {/* SELECTED WORKS SECTION */}
      <SelectedWorks />

      {/* FOOTER */}
      <footer id="contact" className="relative py-16 px-6 sm:px-12 border-t border-white/10 bg-black/40 z-20 font-mono-tech select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-xs text-white/60">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <span className="font-cursive text-3xl font-bold text-white tracking-wide">
              Lohitha
            </span>
            <span className="text-[11px] text-white/40">
              FULL STACK &bull; KINETIC DIGITAL CRAFT &copy; 2026
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider pointer-events-auto">
            <button
              onClick={() => {
                soundFX.playClick();
                setIsSpecsOpen(true);
              }}
              className="hover:text-gold-accent transition-colors"
            >
              TECH SPECS
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                setIsResumeOpen(true);
              }}
              className="hover:text-gold-accent transition-colors"
            >
              RESUME
            </button>
            <button
              onClick={() => {
                soundFX.playChime();
                setIsContactOpen(true);
              }}
              className="hover:text-gold-accent transition-colors"
            >
              LET'S TALK
            </button>
            <a
              href="#hero"
              onClick={() => soundFX.playClick()}
              className="hover:text-white text-gold-accent transition-colors"
            >
              TOP &uarr;
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TechnicalSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
