'use client';

import React from 'react';
import { STUDIO_LEADERSHIP, STUDIO_LOCATIONS } from '@/lib/projectsData';
import { X, ArrowRight, MapPin, Phone, Mail, Award, BookOpen } from 'lucide-react';

interface StudioSectionProps {
  onClose: () => void;
  onOpenProjectBrief: () => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({
  onClose,
  onOpenProjectBrief,
}) => {
  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-3xl bg-[#F5F2ED] text-[#1A1A1A] border-l border-[#1A1A1A]/10 shadow-2xl flex flex-col arch-grid-bg transition-transform duration-500 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-8 py-6 bg-[#E5E7EB]/50 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium block">
            STUDIO & LEADERSHIP
          </span>
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            PRINCIPALS & GLOBAL OFFICES
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
        
        {/* LEADERSHIP TEAM */}
        <div>
          <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-4">
            DESIGN PRINCIPALS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDIO_LEADERSHIP.map((leader, idx) => (
              <div key={idx} className="bg-white/60 border border-[#1A1A1A]/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <img src={leader.image} alt={leader.name} className="w-full h-52 object-cover filter contrast-105 grayscale" />
                  <div className="p-4 space-y-1">
                    <h4 className="text-base font-serif font-bold text-[#1A1A1A]">{leader.name}</h4>
                    <span className="text-[10px] font-sans tracking-wider uppercase text-[#1A1A1A] block">{leader.role}</span>
                    <span className="text-[10px] font-sans tracking-wider text-[#1A1A1A]/60 block">{leader.credentials}</span>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <p className="text-xs text-[#1A1A1A]/70 italic border-t border-[#1A1A1A]/10 pt-2 font-serif">
                    "{leader.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GLOBAL OFFICES */}
        <div>
          <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-4">
            INTERNATIONAL STUDIO LOCATIONS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STUDIO_LOCATIONS.map((loc, idx) => (
              <div key={idx} className="p-5 bg-white/60 border border-[#1A1A1A]/10 space-y-2">
                <div className="flex items-center space-x-2 text-[#1A1A1A] font-bold font-serif text-lg">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <span>{loc.city}</span>
                </div>
                <span className="text-[10px] font-sans tracking-wider text-[#1A1A1A]/60 block uppercase">{loc.country}</span>
                <p className="text-xs text-[#1A1A1A]/70 pt-1 border-t border-[#1A1A1A]/10">{loc.address}</p>
                <div className="pt-2 text-[10px] font-sans text-[#1A1A1A] space-y-0.5">
                  <div>TEL: {loc.phone}</div>
                  <div>EMAIL: {loc.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PUBLICATIONS & MONOGRAPHS */}
        <div className="p-6 bg-[#E5E7EB]/40 border border-[#1A1A1A]/10 space-y-3">
          <div className="flex items-center space-x-2 text-[#1A1A1A]">
            <BookOpen className="w-4 h-4 opacity-70" />
            <h4 className="text-[10px] font-bold font-sans tracking-[0.2em] uppercase text-[#1A1A1A]">
              SELECT MONOGRAPHS & PUBLICATIONS
            </h4>
          </div>
          <ul className="text-xs text-[#1A1A1A]/70 space-y-1 font-serif">
            <li>• <em>El Croquis #218</em> — ARC / HABITAT Monolithic Works (2020–2025)</li>
            <li>• <em>Detail Magazine #04</em> — Concrete Cantilever & Marine Structural Engineering</li>
            <li>• <em>Architectural Digest</em> — Top 100 Global Architecture & Design Studios</li>
          </ul>
        </div>

      </div>

      {/* FOOTER CTA */}
      <div className="p-6 bg-[#E5E7EB]/50 border-t border-[#1A1A1A]/10 flex items-center justify-between">
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A]/60">STUDIO PROFILE #05</span>
        <button
          onClick={onOpenProjectBrief}
          className="px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium flex items-center space-x-2"
        >
          <span>Start a Project Brief →</span>
        </button>
      </div>

    </div>
  );
};
