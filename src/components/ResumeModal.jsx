import React from 'react';
import { X, Download, FileText, CheckCircle2, Code2, Database, Layout, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-[#6e0809] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden font-sans">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10 text-white">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono-tech text-white/50 uppercase tracking-widest block">
                CURRICULUM VITAE
              </span>
              <h3 className="font-cursive text-3xl font-bold text-white tracking-wide">
                Lohitha &bull; Full Stack
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Competencies */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-xs text-white/80 font-sans">
          
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-2 text-amber-300 font-semibold font-mono-tech text-[11px] uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>Frontend Engineering & Interactive 3D</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              React 19, TypeScript, Next.js, WebGL, Canvas API, OpenCV video manipulation, motion physics, and zero-latency state machines.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-2 text-emerald-300 font-semibold font-mono-tech text-[11px] uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Backend & Scalable Architecture</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Node.js, Python, PostgreSQL, Redis, GraphQL, REST APIs, Microservices, and cloud infrastructure deployment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-2 text-sky-300 font-semibold font-mono-tech text-[11px] uppercase tracking-wider">
              <Layout className="w-4 h-4" />
              <span>Creative Direction & Digital Craft</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Award-winning UI/UX choreography, typography hierarchy, micro-interactions, responsive kinetics, and Awwwards-caliber visual polish.
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono-tech text-white/40">
            LAST UPDATED: Q4 2026
          </span>
          <button
            onClick={() => {
              soundFX.playChime();
              alert("Resume downloaded: Lohitha_FullStack_2026.pdf");
            }}
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-neutral-100 transition-all shadow-lg hover:scale-105"
          >
            <span>DOWNLOAD CV</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
