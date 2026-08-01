'use client';

import React, { useState } from 'react';
import { MATERIAL_TAXONOMY_FULL, MaterialSwatch } from '@/lib/projectsData';
import { X, ArrowRight, Layers, Leaf, Shield, Sparkles } from 'lucide-react';

interface MaterialRoomSectionProps {
  onClose: () => void;
  onOpenProjectBrief: () => void;
}

export const MaterialRoomSection: React.FC<MaterialRoomSectionProps> = ({
  onClose,
  onOpenProjectBrief,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMaterial, setActiveMaterial] = useState<MaterialSwatch>(MATERIAL_TAXONOMY_FULL[0]);

  const categories = ['All', 'Concrete', 'Stone', 'Timber', 'Metal', 'Glass', 'Earth'];

  const filteredMaterials = selectedCategory === 'All'
    ? MATERIAL_TAXONOMY_FULL
    : MATERIAL_TAXONOMY_FULL.filter((m) => m.category === selectedCategory);

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-3xl bg-[#F5F2ED] text-[#1A1A1A] border-l border-[#1A1A1A]/10 shadow-2xl flex flex-col arch-grid-bg transition-transform duration-500 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-8 py-6 bg-[#E5E7EB]/50 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium block">
            MATERIAL ROOM & CRAFT TAXONOMY
          </span>
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            MATERIAL LABORATORY & PALETTE
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#1A1A1A] hover:bg-[#F5F2ED] border border-[#1A1A1A]/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CATEGORY STRIP */}
      <div className="px-8 py-3 bg-[#F5F2ED] border-b border-[#1A1A1A]/10 flex items-center space-x-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest transition-colors border ${
              selectedCategory === cat
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-white/60 text-[#1A1A1A]/60 hover:text-[#1A1A1A] border-[#1A1A1A]/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        
        {/* ACTIVE MATERIAL FOCUS CARD */}
        <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <img
              src={activeMaterial.textureUrl}
              alt={activeMaterial.name}
              className="w-full h-56 object-cover border border-[#1A1A1A]/10 shadow-sm"
            />
          </div>

          <div className="md:col-span-7 space-y-3">
            <span className="text-[10px] font-sans tracking-widest uppercase bg-[#1A1A1A] text-white px-2.5 py-0.5 inline-block">
              {activeMaterial.category}
            </span>
            <h3 className="text-2xl font-serif text-[#1A1A1A] font-bold">
              {activeMaterial.name}
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
              {activeMaterial.description}
            </p>

            <div className="pt-3 border-t border-[#1A1A1A]/10 text-xs font-sans text-[#1A1A1A]/60 space-y-1">
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>SOURCE: {activeMaterial.origin}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>ECOLOGICAL: {activeMaterial.carbonFootprint}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SWATCH GRID */}
        <div>
          <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-3">
            PHYSICAL SAMPLE BOARD
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredMaterials.map((mat) => {
              const isActive = activeMaterial.id === mat.id;
              return (
                <div
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  className={`p-3 border cursor-pointer transition-all flex items-center space-x-3 ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white/60 text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
                  }`}
                >
                  <img src={mat.textureUrl} alt={mat.name} className="w-10 h-10 object-cover border border-black/10 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <div className="text-xs font-serif font-bold truncate">{mat.name}</div>
                    <div className={`text-[10px] font-sans tracking-wider uppercase ${isActive ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                      {mat.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTER CTA */}
      <div className="p-6 bg-[#E5E7EB]/50 border-t border-[#1A1A1A]/10 flex items-center justify-between">
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A]/60">MATERIAL PALETTE SPEC #04</span>
        <button
          onClick={onOpenProjectBrief}
          className="px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium flex items-center space-x-2"
        >
          <span>Request Material Board →</span>
        </button>
      </div>

    </div>
  );
};
