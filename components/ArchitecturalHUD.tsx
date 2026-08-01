'use client';

import React, { useState } from 'react';
import { NavZone, TimeOfDay, ViewMode } from './ArchitecturalCanvas';
import { Compass, Sun, Moon, Volume2, VolumeX, Eye, Layers, Box, ArrowRight, MapPin, Grid } from 'lucide-react';
import { audioAmbiance } from '@/lib/audioAmbiance';

interface ArchitecturalHUDProps {
  currentZone: NavZone;
  timeOfDay: TimeOfDay;
  viewMode: ViewMode;
  isRoofRemoved: boolean;
  isExploded: boolean;
  activeFloor: number;
  cameraCoords: { x: number; y: number; z: number };
  onSelectZone: (zone: NavZone) => void;
  onChangeTimeOfDay: (time: TimeOfDay) => void;
  onChangeViewMode: (mode: ViewMode) => void;
  onToggleRoof: () => void;
  onToggleExploded: () => void;
  onSelectFloor: (floor: number) => void;
  onOpenProjectBrief: () => void;
}

export const ArchitecturalHUD: React.FC<ArchitecturalHUDProps> = ({
  currentZone,
  timeOfDay,
  viewMode,
  isRoofRemoved,
  isExploded,
  activeFloor,
  cameraCoords,
  onSelectZone,
  onChangeTimeOfDay,
  onChangeViewMode,
  onToggleRoof,
  onToggleExploded,
  onSelectFloor,
  onOpenProjectBrief,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const newState = audioAmbiance.toggle();
    setIsAudioPlaying(newState);
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 z-30">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="flex items-start justify-between w-full pointer-events-auto z-40">
        
        {/* BRAND LOGO & SUBTITLE */}
        <div className="flex flex-col cursor-pointer" onClick={() => onSelectZone('exterior')}>
          <span className="text-xl sm:text-2xl tracking-[0.2em] font-bold uppercase font-serif text-[#1A1A1A]">
            Arc / Habitat
          </span>
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase opacity-60 mt-1 text-[#1A1A1A]">
            Architectural Research & Design
          </span>
          <div className="mt-2 flex items-center space-x-2 text-[10px] font-mono-tech text-[#1A1A1A]/50">
            <span>POS: X:{cameraCoords.x} Y:{cameraCoords.y} Z:{cameraCoords.z}</span>
            <span className="text-[#1A1A1A] uppercase font-bold">
              • {currentZone.replace('walkin_', '').replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* RIGHT ACTION CONTROLS & CTA */}
        <div className="flex items-center space-x-3">
          {/* Audio Ambiance Switcher */}
          <button
            onClick={handleToggleAudio}
            className={`p-2.5 bg-white/40 backdrop-blur-md border border-[#1A1A1A]/10 transition-all text-xs flex items-center space-x-2 ${
              isAudioPlaying ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-white/70'
            }`}
            title="Toggle Ambiance Audio"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline font-sans text-[10px] tracking-[0.2em] uppercase">
              {isAudioPlaying ? 'AUDIO: ON' : 'AUDIO: OFF'}
            </span>
          </button>

          {/* Time of Day Switcher */}
          <div className="bg-white/40 backdrop-blur-md p-1 border border-[#1A1A1A]/10 hidden sm:flex items-center space-x-1">
            {[
              { id: 'sunrise', label: '06:00' },
              { id: 'midday', label: '12:00' },
              { id: 'golden_hour', label: '18:00' },
              { id: 'dusk_night', label: '22:00' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onChangeTimeOfDay(t.id as TimeOfDay)}
                className={`px-2.5 py-1 text-[10px] font-sans tracking-widest uppercase transition-colors ${
                  timeOfDay === t.id ? 'bg-[#1A1A1A] text-white font-bold' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Primary CTA: Start a Project */}
          <button
            onClick={onOpenProjectBrief}
            className="px-6 sm:px-8 py-3.5 bg-[#1A1A1A] text-white text-[11px] font-sans tracking-[0.3em] uppercase hover:bg-[#2A2A2A] transition-colors shadow-sm"
          >
            Start a Project
          </button>
        </div>
      </nav>

      {/* IMMERSIVE CENTER HERO & MODEL INSPECTOR OVERLAYS */}
      {currentZone === 'exterior' && (
        <div className="pointer-events-auto my-auto flex flex-col md:flex-row items-center justify-between w-full gap-8">
          
          {/* LEFT SLOGAN CALLOUT */}
          <div className="max-w-md bg-white/40 backdrop-blur-md border border-[#1A1A1A]/10 p-6 sm:p-8">
            <span className="text-[10px] tracking-[0.3em] font-sans uppercase opacity-60 block mb-2 font-medium">
              BRUTALIST ARCHITECTURE MODEL #01
            </span>
            <h2 className="text-3xl sm:text-4xl italic leading-tight font-serif text-[#1A1A1A]">
              Architecture for Human Experience.
            </h2>
            
            <div className="mt-6 flex items-center space-x-4">
              <div className="w-12 h-[1px] bg-[#1A1A1A]"></div>
              <button
                onClick={() => onSelectZone('walkin_living')}
                className="text-[11px] tracking-[0.2em] font-sans uppercase font-bold text-[#1A1A1A] hover:opacity-60 transition-opacity flex items-center space-x-2"
              >
                <span>Explore Physical Zones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MODEL INSPECTOR FLOATING CONTROL CARD */}
          <div className="w-64 bg-white/40 backdrop-blur-md border border-[#1A1A1A]/10 p-6 space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-sans opacity-60 mb-3 font-medium">
                Model Inspector
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-[#1A1A1A]/10">
                  <span className="text-[11px] font-sans uppercase tracking-wider">Explode</span>
                  <button
                    onClick={onToggleExploded}
                    className={`w-8 h-4 rounded-full relative transition-colors ${
                      isExploded ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]/10'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                        isExploded ? 'left-4.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#1A1A1A]/10">
                  <span className="text-[11px] font-sans uppercase tracking-wider">Roof Section</span>
                  <button
                    onClick={onToggleRoof}
                    className="text-[10px] font-sans opacity-70 uppercase tracking-wider hover:opacity-100"
                  >
                    {isRoofRemoved ? 'Hidden' : 'Visible'}
                  </button>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[11px] font-sans uppercase tracking-wider">Materials</span>
                  <span className="text-[10px] font-sans opacity-60 uppercase tracking-wider">
                    Concrete & Steel
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectZone('model_viewer')}
                className="aspect-square bg-white/60 hover:bg-white border border-[#1A1A1A]/10 flex items-center justify-center text-[10px] font-sans uppercase tracking-widest transition-colors"
              >
                360°
              </button>
              <button
                onClick={() => onChangeViewMode(viewMode === 'blueprint' ? 'photorealistic' : 'blueprint')}
                className="aspect-square bg-white/60 hover:bg-white border border-[#1A1A1A]/10 flex items-center justify-center text-[10px] font-sans uppercase tracking-widest transition-colors"
              >
                CAD
              </button>
            </div>
          </div>

        </div>
      )}

      {/* BOTTOM INTERFACE & SPATIAL NAVIGATION */}
      <div className="w-full pointer-events-auto flex flex-col md:flex-row items-end justify-between gap-6 z-40">
        
        {/* SPATIAL NAVIGATION LINKS */}
        <div className="bg-white/40 backdrop-blur-md p-3 border border-[#1A1A1A]/10 overflow-x-auto max-w-full">
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] tracking-[0.2em] font-sans uppercase">
            {[
              { id: 'exterior', label: 'Overview' },
              { id: 'walkin_living', label: 'Living Space' },
              { id: 'walkin_workspace', label: 'Workspace' },
              { id: 'walkin_courtyard', label: 'Courtyard' },
              { id: 'walkin_material', label: 'Material Room' },
              { id: 'walkin_studio', label: 'Studio' },
              { id: 'model_viewer', label: '3D Inspector' },
            ].map((tab) => {
              const isActive = currentZone === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectZone(tab.id as NavZone)}
                  className={`py-1 transition-opacity relative ${
                    isActive ? 'font-bold opacity-100 border-b-2 border-[#1A1A1A]' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CITY FOOTER MARQUEE & CONTACT LOCATIONS */}
        <div className="flex space-x-6 text-[10px] tracking-[0.25em] font-sans uppercase opacity-60 text-[#1A1A1A]">
          <span>London</span>
          <span>Tokyo</span>
          <span>Berlin</span>
          <span>New York</span>
        </div>

      </div>

    </div>
  );
};
