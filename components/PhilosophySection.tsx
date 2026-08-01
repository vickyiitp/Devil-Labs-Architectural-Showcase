'use client';

import React from 'react';
import { X, ArrowRight, Compass, Sun, Droplets, Feather } from 'lucide-react';

interface PhilosophySectionProps {
  onClose: () => void;
  onOpenProjectBrief: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onClose,
  onOpenProjectBrief,
}) => {
  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-2xl bg-[#F5F2ED] text-[#1A1A1A] border-l border-[#1A1A1A]/10 shadow-2xl flex flex-col arch-grid-bg transition-transform duration-500 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-8 py-6 bg-[#E5E7EB]/50 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium block">
            COURTYARD MANIFESTO
          </span>
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            PHILOSOPHY & DESIGN MANIFESTO
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#1A1A1A] hover:bg-[#F5F2ED] border border-[#1A1A1A]/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif leading-snug text-[#1A1A1A] italic">
            "We do not build structures to dominate landscape. We construct voids that allow light, silence, and human experience to unfold."
          </h3>
          <p className="text-[11px] text-[#1A1A1A]/60 font-sans tracking-widest uppercase mt-3">
            — HENRIK VON ARC, FOUNDING PRINCIPAL
          </p>
        </div>

        {/* CORE TENETS */}
        <div className="space-y-6">
          <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 space-y-2">
            <div className="flex items-center space-x-3 text-[#1A1A1A]">
              <Compass className="w-5 h-5 opacity-70" />
              <h4 className="text-base font-serif font-bold text-[#1A1A1A]">1. Monolithic Permanence</h4>
            </div>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
              We favor heavy, authentic materials—board-formed white concrete, vein-cut Roman travertine, and thick-gauge structural bronze—that age with dignity across centuries rather than decades.
            </p>
          </div>

          <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 space-y-2">
            <div className="flex items-center space-x-3 text-[#1A1A1A]">
              <Sun className="w-5 h-5 opacity-70" />
              <h4 className="text-base font-serif font-bold text-[#1A1A1A]">2. Chiaroscuro & Solar Geometry</h4>
            </div>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
              Light is our primary construction element. By calculating solar angles down to the arc minute, our cantilevers create deep architectural shadows that naturally cool living spaces during summer while capturing low winter warmth.
            </p>
          </div>

          <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 space-y-2">
            <div className="flex items-center space-x-3 text-[#1A1A1A]">
              <Droplets className="w-5 h-5 opacity-70" />
              <h4 className="text-base font-serif font-bold text-[#1A1A1A]">3. Acoustic Sanctuary & Water</h4>
            </div>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
              In an era of digital noise, architecture must provide acoustic stillness. Water reflection mirrors and sound-absorbing timber slats isolate the residence into a sanctuary for deep thought.
            </p>
          </div>
        </div>

        {/* SUSTAINABILITY STATEMENT */}
        <div className="p-6 bg-[#E5E7EB]/40 border-l-2 border-[#1A1A1A]">
          <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#1A1A1A] mb-1">
            ECOLOGICAL INTEGRITY & NET-ZERO AUDIT
          </h4>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
            Every ARC / HABITAT project undergoes a complete 100-year life-cycle carbon audit. We substitute high-carbon binders with pozzolanic calcined clays and integrate closed-loop geothermal heat pumps as a standard specification.
          </p>
        </div>

      </div>

      {/* FOOTER CTA */}
      <div className="p-6 bg-[#E5E7EB]/50 border-t border-[#1A1A1A]/10 flex items-center justify-between">
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A]/60">PHILOSOPHY MONOGRAPH #03</span>
        <button
          onClick={onOpenProjectBrief}
          className="px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium flex items-center space-x-2"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
