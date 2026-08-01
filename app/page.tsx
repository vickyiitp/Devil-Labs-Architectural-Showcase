'use client';

import React, { useState } from 'react';
import { ArchitecturalCanvas, NavZone, TimeOfDay, ViewMode } from '@/components/ArchitecturalCanvas';
import { ArchitecturalHUD } from '@/components/ArchitecturalHUD';
import { ProjectArchiveSheet } from '@/components/ProjectArchiveSheet';
import { ProjectBriefModal } from '@/components/ProjectBriefModal';
import { PhilosophySection } from '@/components/PhilosophySection';
import { MaterialRoomSection } from '@/components/MaterialRoomSection';
import { StudioSection } from '@/components/StudioSection';
import { ProjectData, PROJECTS_DATA } from '@/lib/projectsData';
import { Layers, ArrowRight, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const [currentZone, setCurrentZone] = useState<NavZone>('exterior');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunrise');
  const [viewMode, setViewMode] = useState<ViewMode>('photorealistic');
  const [isRoofRemoved, setIsRoofRemoved] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [activeFloor, setActiveFloor] = useState<number>(0);

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);
  const [briefInitialType, setBriefInitialType] = useState<string | undefined>(undefined);

  const [cameraCoords, setCameraCoords] = useState<{ x: number; y: number; z: number }>({
    x: 22,
    y: 10,
    z: 26,
  });

  const handleOpenBrief = (type?: string) => {
    setBriefInitialType(type);
    setIsBriefModalOpen(true);
  };

  // Filter projects by current zone if applicable
  const residentialProjects = PROJECTS_DATA.filter((p) => p.category === 'Living Space');
  const commercialProjects = PROJECTS_DATA.filter((p) => p.category === 'Workspace');

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#F5F2ED] text-[#1A1A1A]">
      
      {/* Sleek Interface Outer Framing Border */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-[#1A1A1A]/10 z-50" />

      {/* 3D WEBGL ARCHITECTURAL CANVAS */}
      <ArchitecturalCanvas
        currentZone={currentZone}
        timeOfDay={timeOfDay}
        viewMode={viewMode}
        isRoofRemoved={isRoofRemoved}
        isExploded={isExploded}
        activeFloor={activeFloor}
        selectedProject={selectedProject}
        onSelectZone={setCurrentZone}
        onSelectProject={setSelectedProject}
        onCameraCoordinatesUpdate={setCameraCoords}
      />

      {/* HEADS-UP DISPLAY OVERLAY */}
      <ArchitecturalHUD
        currentZone={currentZone}
        timeOfDay={timeOfDay}
        viewMode={viewMode}
        isRoofRemoved={isRoofRemoved}
        isExploded={isExploded}
        activeFloor={activeFloor}
        cameraCoords={cameraCoords}
        onSelectZone={setCurrentZone}
        onChangeTimeOfDay={setTimeOfDay}
        onChangeViewMode={setViewMode}
        onToggleRoof={() => setIsRoofRemoved(!isRoofRemoved)}
        onToggleExploded={() => setIsExploded(!isExploded)}
        onSelectFloor={setActiveFloor}
        onOpenProjectBrief={() => handleOpenBrief()}
      />

      {/* ZONE SPECIFIC FLOATING OVERLAYS */}

      {/* RESIDENTIAL PROJECTS (LIVING SPACE ZONE) */}
      {currentZone === 'walkin_living' && (
        <div className="absolute top-24 left-8 z-20 max-w-sm space-y-3 pointer-events-auto">
          <div className="arch-glass-panel p-5 border border-[#1A1A1A]/10 shadow-sm">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium block mb-1">
              PHYSICAL ZONE: LIVING SPACE
            </span>
            <h3 className="text-xl font-serif text-[#1A1A1A] font-bold tracking-tight">
              RESIDENTIAL PORTFOLIO
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 mt-1 mb-4">
              Private cliffside and alpine sanctuaries designed for permanence.
            </p>

            <div className="space-y-2">
              {residentialProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="p-3 bg-white/60 hover:bg-white border border-[#1A1A1A]/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:opacity-70 transition-opacity">
                      {p.title}
                    </h4>
                    <span className="text-[10px] font-sans tracking-wider text-[#1A1A1A]/60 uppercase">
                      {p.location} ({p.year})
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A1A1A] opacity-60 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COMMERCIAL PROJECTS (WORKSPACE ZONE) */}
      {currentZone === 'walkin_workspace' && (
        <div className="absolute top-24 left-8 z-20 max-w-sm space-y-3 pointer-events-auto">
          <div className="arch-glass-panel p-5 border border-[#1A1A1A]/10 shadow-sm">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium block mb-1">
              PHYSICAL ZONE: WORKSPACE
            </span>
            <h3 className="text-xl font-serif text-[#1A1A1A] font-bold tracking-tight">
              COMMERCIAL ARCHITECTURE
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 mt-1 mb-4">
              Financial towers, corporate HQs, and civic monoliths.
            </p>

            <div className="space-y-2">
              {commercialProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="p-3 bg-white/60 hover:bg-white border border-[#1A1A1A]/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:opacity-70 transition-opacity">
                      {p.title}
                    </h4>
                    <span className="text-[10px] font-sans tracking-wider text-[#1A1A1A]/60 uppercase">
                      {p.location} ({p.year})
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A1A1A] opacity-60 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COURTYARD ZONE -> PHILOSOPHY OVERLAY */}
      {currentZone === 'walkin_courtyard' && (
        <PhilosophySection
          onClose={() => setCurrentZone('exterior')}
          onOpenProjectBrief={() => handleOpenBrief('Courtyard & Landscape Integration')}
        />
      )}

      {/* MATERIAL ROOM ZONE -> MATERIAL OVERLAY */}
      {currentZone === 'walkin_material' && (
        <MaterialRoomSection
          onClose={() => setCurrentZone('exterior')}
          onOpenProjectBrief={() => handleOpenBrief('Materiality & Custom Surfaces')}
        />
      )}

      {/* STUDIO ZONE -> TEAM & LEADERSHIP OVERLAY */}
      {currentZone === 'walkin_studio' && (
        <StudioSection
          onClose={() => setCurrentZone('exterior')}
          onOpenProjectBrief={() => handleOpenBrief('Studio Consultation')}
        />
      )}

      {/* SPATIAL PROJECT ARCHIVE SHEET MONOGRAPH MODAL */}
      {selectedProject && (
        <ProjectArchiveSheet
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenProjectBrief={(type) => {
            setSelectedProject(null);
            handleOpenBrief(type);
          }}
        />
      )}

      {/* START A PROJECT BRIEF MODAL */}
      <ProjectBriefModal
        isOpen={isBriefModalOpen}
        initialType={briefInitialType}
        onClose={() => setIsBriefModalOpen(false)}
      />

    </main>
  );
}
