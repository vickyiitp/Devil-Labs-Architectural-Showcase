'use client';

import React, { useState } from 'react';
import { ProjectData } from '@/lib/projectsData';
import { X, Layers, Compass, Maximize2, Check, ArrowRight, Download, Share2 } from 'lucide-react';

interface ProjectArchiveSheetProps {
  project: ProjectData | null;
  onClose: () => void;
  onOpenProjectBrief: (projectType?: string) => void;
}

export const ProjectArchiveSheet: React.FC<ProjectArchiveSheetProps> = ({
  project,
  onClose,
  onOpenProjectBrief,
}) => {
  const [activeTab, setActiveTab] = useState<'monograph' | 'floorplans' | 'materials' | 'construction' | 'gallery'>('monograph');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300">
      {/* Monograph Sheet Container styled like an elite publication plate */}
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#F5F2ED] text-[#1A1A1A] rounded-none border border-[#1A1A1A]/10 shadow-2xl flex flex-col overflow-hidden arch-blueprint-grid">
        
        {/* TOP PUBLICATION HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#1A1A1A]/10 bg-[#E5E7EB]/50">
          <div className="flex items-center space-x-4">
            <span className="font-serif text-xs tracking-[0.2em] text-[#1A1A1A] font-bold uppercase">
              Arc / Habitat Monograph #0{project.id === 'villa-solis' ? '1' : '2'}
            </span>
            <span className="text-xs text-[#1A1A1A]/60 font-sans tracking-wider hidden sm:inline-block">
              LOC: {project.location.toUpperCase()} ({project.country.toUpperCase()})
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenProjectBrief(project.category)}
              className="px-5 py-2 text-[11px] font-sans tracking-[0.25em] font-medium text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors flex items-center space-x-2 uppercase"
            >
              <span>Commission Similar Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#1A1A1A] hover:bg-white/60 transition-colors border border-[#1A1A1A]/10"
              title="Close Monograph"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HERO TITLE & NAV TAB STRIP */}
        <div className="px-8 py-6 border-b border-[#1A1A1A]/10 bg-[#F5F2ED] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-1">
              {project.category} — {project.year}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#1A1A1A]">
              {project.title}
            </h1>
            <p className="text-sm md:text-base text-[#1A1A1A]/70 italic mt-1 font-serif">
              "{project.subtitle}"
            </p>
          </div>

          {/* TAB STRIP */}
          <div className="flex items-center space-x-1 sm:space-x-2 border-b md:border-b-0 border-[#1A1A1A]/10 pb-2 md:pb-0 overflow-x-auto">
            {[
              { id: 'monograph', label: '1. Concept & Site' },
              { id: 'floorplans', label: '2. Floor Plans' },
              { id: 'materials', label: '3. Materiality' },
              { id: 'construction', label: '4. Structure' },
              { id: 'gallery', label: '5. Photography' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-[11px] font-sans uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeTab === tab.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] border-transparent hover:border-[#1A1A1A]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN MONOGRAPH BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* TAB 1: CONCEPT & SITE */}
          {activeTab === 'monograph' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-2">
                    ARCHITECTURAL STATEMENT
                  </h3>
                  <p className="text-lg md:text-xl font-serif text-[#1A1A1A] leading-relaxed font-bold">
                    {project.conceptStatement}
                  </p>
                </div>

                <div className="p-6 bg-white/60 border-l-2 border-[#1A1A1A] border-y border-r border-[#1A1A1A]/10">
                  <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A] mb-2 font-bold">
                    SITE CONTEXT & TOPOGRAPHY
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                    {project.siteContext}
                  </p>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1A1A1A]/10">
                  <div>
                    <span className="block text-[10px] font-sans tracking-widest text-[#1A1A1A]/60 uppercase">Gross Area</span>
                    <span className="text-lg font-serif font-bold text-[#1A1A1A]">{project.areaSqM} m²</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans tracking-widest text-[#1A1A1A]/60 uppercase">Client</span>
                    <span className="text-sm font-serif font-bold text-[#1A1A1A]">{project.clientType}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans tracking-widest text-[#1A1A1A]/60 uppercase">Completion</span>
                    <span className="text-lg font-serif font-bold text-[#1A1A1A]">{project.year}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans tracking-widest text-[#1A1A1A]/60 uppercase">Region</span>
                    <span className="text-sm font-serif font-bold text-[#1A1A1A]">{project.country}</span>
                  </div>
                </div>

                {project.awards && (
                  <div className="pt-2">
                    <span className="block text-[10px] font-sans text-[#1A1A1A] font-bold uppercase tracking-[0.25em] mb-2">
                      AWARDS & RECOGNITION
                    </span>
                    <ul className="space-y-1">
                      {project.awards.map((award, idx) => (
                        <li key={idx} className="text-xs text-[#1A1A1A]/70 flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Hero Render & Sketch */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative border border-[#1A1A1A]/10 overflow-hidden group">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#1A1A1A] text-white px-2.5 py-1 text-[10px] font-sans tracking-widest uppercase">
                    COMPLETED RENDERING
                  </div>
                </div>

                {project.sketches.length > 0 && (
                  <div className="border border-[#1A1A1A]/10 p-3 bg-white/60">
                    <span className="block text-[10px] font-sans text-[#1A1A1A]/60 uppercase tracking-widest mb-2">
                      INITIAL CONCEPT SKETCH
                    </span>
                    <img
                      src={project.sketches[0]}
                      alt="Concept Sketch"
                      className="w-full h-44 object-cover filter contrast-125 grayscale"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE FLOOR PLANS */}
          {activeTab === 'floorplans' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#E5E7EB]/40 border border-[#1A1A1A]/10">
                <div>
                  <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A] font-bold">
                    VECTOR CAD ARCHITECTURAL BLUEPRINT
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/60 mt-0.5">Select a room below to inspect dimensions and spatial requirements.</p>
                </div>
                <div className="flex items-center space-x-4 text-xs font-sans text-[#1A1A1A]/70">
                  <span>SCALE: 1 : 100</span>
                  <span>GRID: 1.0m</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Blueprint Graphic */}
                <div className="lg:col-span-8 bg-[#1A1A1A] p-6 text-white relative border border-[#1A1A1A] min-h-[380px] flex flex-col justify-between">
                  <div className="absolute top-4 left-4 text-xs font-sans text-white/80 flex items-center space-x-2 tracking-widest">
                    <Compass className="w-4 h-4 animate-spin-slow opacity-80" />
                    <span>N 42° 18' 04" | W 118° 42' 10"</span>
                  </div>

                  {/* Simulated Vector Floorplan Drawing */}
                  <div className="my-10 relative h-64 border border-white/20 p-4 flex items-center justify-center">
                    {/* Grid lines */}
                    <div className="absolute inset-0 arch-blueprint-grid opacity-20 pointer-events-none" />

                    {/* Interactive room blocks */}
                    <div className="grid grid-cols-2 gap-3 w-full h-full relative z-10">
                      {project.rooms.map((room) => {
                        const isSelected = activeRoomId === room.id;
                        return (
                          <div
                            key={room.id}
                            onClick={() => setActiveRoomId(room.id)}
                            className={`p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-white bg-white/20 text-white'
                                : 'border-white/20 hover:border-white/60 bg-black/40 text-white/70'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold font-serif text-white">{room.name}</span>
                              <span className="text-[10px] font-sans tracking-widest">{room.areaSqM} m²</span>
                            </div>
                            <span className="text-[10px] font-sans tracking-wider opacity-70">{room.dimensions}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scale Metric Bar */}
                  <div className="flex justify-between items-center text-[10px] font-sans tracking-widest text-white/60 border-t border-white/10 pt-2">
                    <span>0m</span>
                    <div className="w-32 h-1 bg-white/40 relative">
                      <div className="absolute -top-1 left-1/2 w-0.5 h-3 bg-white" />
                    </div>
                    <span>10m</span>
                  </div>
                </div>

                {/* Selected Room Details Panel */}
                <div className="lg:col-span-4 space-y-4">
                  <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A] font-bold">
                    SPATIAL SPECIFICATION
                  </h4>

                  {activeRoomId ? (
                    (() => {
                      const room = project.rooms.find((r) => r.id === activeRoomId);
                      if (!room) return null;
                      return (
                        <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 space-y-4">
                          <div className="border-b border-[#1A1A1A]/10 pb-3">
                            <h5 className="text-xl font-serif font-bold text-[#1A1A1A]">{room.name}</h5>
                            <div className="flex items-center space-x-3 text-xs font-sans text-[#1A1A1A]/60 mt-1">
                              <span>AREA: {room.areaSqM} m²</span>
                              <span>DIM: {room.dimensions}</span>
                            </div>
                          </div>

                          <div>
                            <span className="block text-[10px] font-sans tracking-[0.2em] text-[#1A1A1A] uppercase font-bold mb-2">
                              KEY ARCHITECTURAL FEATURES
                            </span>
                            <ul className="space-y-2">
                              {room.keyFeatures.map((feat, idx) => (
                                <li key={idx} className="text-xs text-[#1A1A1A]/70 flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-[#1A1A1A]" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="p-6 bg-[#E5E7EB]/30 border border-dashed border-[#1A1A1A]/20 text-center text-xs text-[#1A1A1A]/60">
                      Click any room on the blueprint canvas to view specific spatial engineering details.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MATERIALITY */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-1">
                  TACTILE MATERIAL TAXONOMY
                </h3>
                <p className="text-xs text-[#1A1A1A]/60">
                  Authentic raw materials selected for environmental permanence and thermal performance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.materials.map((mat) => (
                  <div key={mat.id} className="p-5 bg-white/60 border border-[#1A1A1A]/10 flex items-start space-x-4">
                    <img
                      src={mat.textureUrl}
                      alt={mat.name}
                      className="w-24 h-24 object-cover border border-[#1A1A1A]/10 flex-shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-base font-serif font-bold text-[#1A1A1A]">{mat.name}</h4>
                        <span className="text-[10px] font-sans tracking-widest uppercase bg-[#E5E7EB] px-2 py-0.5 text-[#1A1A1A]">
                          {mat.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">{mat.description}</p>
                      <div className="pt-2 text-[10px] font-sans text-[#1A1A1A] space-y-0.5 border-t border-[#1A1A1A]/10">
                        <div>ORIGIN: {mat.origin}</div>
                        <div>ECOLOGICAL: {mat.carbonFootprint}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONSTRUCTION & STRUCTURE */}
          {activeTab === 'construction' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-1">
                  STRUCTURAL & ENVIRONMENTAL ENGINEERING
                </h3>
                <p className="text-xs text-[#1A1A1A]/60">Technical notes from structural consultants and energy modeling.</p>
              </div>

              <div className="space-y-3">
                {project.structuralNotes.map((note, idx) => (
                  <div key={idx} className="p-5 bg-white/60 border-l-2 border-[#1A1A1A] border-y border-r border-[#1A1A1A]/10 flex items-start space-x-3">
                    <span className="font-sans font-bold text-xs text-[#1A1A1A]">0{idx + 1}.</span>
                    <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-serif">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PHOTOGRAPHY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold mb-1">
                  COMPLETED ARCHITECTURAL PHOTOGRAPHY
                </h3>
                <p className="text-xs text-[#1A1A1A]/60">Captured at sunrise and twilight by international architecture photographers.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImage(imgUrl)}
                    className="relative group border border-[#1A1A1A]/10 overflow-hidden cursor-pointer h-64"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM FOOTER BAR */}
        <div className="px-8 py-4 bg-[#E5E7EB]/50 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#1A1A1A]/60">
          <div>
            CONFIDENTIAL ARCHITECTURAL MONOGRAPH SHEET — ALL RIGHTS RESERVED ARC/HABITAT 2026
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenProjectBrief(project.category)}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium"
            >
              Start a Project Brief →
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img src={lightboxImage} alt="Enlarged Architectural Photography" className="max-w-full max-h-[90vh] object-contain border border-white/20" />
        </div>
      )}
    </div>
  );
};
