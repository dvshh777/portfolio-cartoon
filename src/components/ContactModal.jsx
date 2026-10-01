import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', budget: '$25k - $50k', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.playChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#6e0809] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl font-mono-tech">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[10px] text-gold-accent uppercase tracking-widest block mb-1">
              DIRECTOR'S OFFICE
            </span>
            <h3 className="font-syne text-2xl font-bold text-white tracking-tight uppercase">
              INITIATE BRIEF
            </h3>
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

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-300" />
            </div>
            <h4 className="font-syne text-xl text-white font-bold mb-2">COMMISSION DISPATCHED</h4>
            <p className="text-xs text-white/60 font-sans max-w-xs">
              Thank you. Our studio team will review your creative brief and respond within 12 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1.5">
                YOUR NAME / ENTITY
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Balenciaga Digital Lab"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1.5">
                DIRECT CONTACT EMAIL
              </label>
              <input
                required
                type="email"
                placeholder="director@brand.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1.5">
                ESTIMATED CAPITAL ALLOCATION
              </label>
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="$25k - $50k">$25,000 &mdash; $50,000</option>
                <option value="$50k - $100k">$50,000 &mdash; $100,000</option>
                <option value="$100k+">$100,000+ (High-Production Custom)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1.5">
                PROJECT SYNOPSIS
              </label>
              <textarea
                rows="3"
                placeholder="Tell us about the interactive character or kinetic experience you want to engineer..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span>SUBMIT INQUIRY</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
