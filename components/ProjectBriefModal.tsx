'use client';

import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Building2, Home, Landmark, Palmtree, Compass, Calendar, DollarSign, Send, FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectBriefModalProps {
  isOpen: boolean;
  initialType?: string;
  onClose: () => void;
}

export const ProjectBriefModal: React.FC<ProjectBriefModalProps> = ({
  isOpen,
  initialType,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');

  // Form State
  const [projectType, setProjectType] = useState<string>(initialType || 'Luxury Private Residence');
  const [country, setCountry] = useState<string>('Switzerland');
  const [location, setLocation] = useState<string>('Zurich / Alpine Region');
  const [areaSqM, setAreaSqM] = useState<number>(850);
  const [unit, setUnit] = useState<'sqm' | 'sqft'>('sqm');
  const [budget, setBudget] = useState<string>('$5M – $15M USD');
  const [timeline, setTimeline] = useState<string>('6 – 12 Months');
  const [requirements, setRequirements] = useState<string[]>([
    'Board-Formed Concrete Materiality',
    'Net-Zero Passive Energy',
    'Bespoke Interiors',
  ]);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientOrganization, setClientOrganization] = useState<string>('');
  const [projectNotes, setProjectNotes] = useState<string>('');

  if (!isOpen) return null;

  const toggleRequirement = (req: string) => {
    if (requirements.includes(req)) {
      setRequirements(requirements.filter((r) => r !== req));
    } else {
      setRequirements([...requirements, req]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `ARC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(generatedRef);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#9E5338', '#C5A059', '#1E1D1B'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F5F2ED] text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-2xl flex flex-col overflow-hidden arch-grid-bg">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-8 py-5 bg-[#E5E7EB]/50 border-b border-[#1A1A1A]/10">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-sm tracking-[0.2em] font-bold text-[#1A1A1A] uppercase">
              Arc / Habitat — Project Brief
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-sans tracking-widest uppercase bg-[#1A1A1A] text-white">
              Qualified Inquiry
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1A1A] hover:bg-white/60 transition-colors border border-[#1A1A1A]/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
            
            {/* STEP PROGRESS BARS */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
              {[
                { n: 1, label: 'Typology & Location' },
                { n: 2, label: 'Scale & Investment' },
                { n: 3, label: 'Material & Requirements' },
                { n: 4, label: 'Client Credentials' },
              ].map((s) => (
                <div
                  key={s.n}
                  onClick={() => setStep(s.n)}
                  className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                    step === s.n ? 'text-[#1A1A1A] font-bold' : 'text-[#1A1A1A]/50'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-sans border ${
                    step === s.n ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#1A1A1A]/20'
                  }`}>
                    {s.n}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-sans hidden sm:inline-block">{s.label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: TYPOLOGY & LOCATION */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-[#1A1A1A] font-bold">1. Select Project Typology</h2>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Which architectural discipline best characterizes your vision?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: 'Luxury Private Residence', icon: Home, desc: 'Bespoke coastal/alpine cliffside estates & private sanctuaries.' },
                    { id: 'Commercial Architecture & HQ', icon: Building2, desc: 'Corporate headquarters, boutique offices, financial towers.' },
                    { id: 'Cultural & Institutional', icon: Landmark, desc: 'Museums, art foundations, educational pavilions.' },
                    { id: 'Luxury Resort & Hospitality', icon: Palmtree, desc: 'Eco-resorts, boutique wellness retreats & wineries.' },
                    { id: 'Interior Architecture & Millwork', icon: Sparkles, desc: 'Custom spatial design, furniture curation & material surfaces.' },
                    { id: 'Urban Masterplanning', icon: Compass, desc: 'Multi-hectare estate planning, landscape & infrastructure.' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = projectType === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setProjectType(item.id)}
                        className={`p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white/60 text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#1A1A1A]/70'}`} />
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold font-serif">{item.id}</h4>
                          <p className={`text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1A1A1A]/10">
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                      Country / Region
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Switzerland, USA, Japan, UAE"
                      className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                      Specific Location / Site Context
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Zurich Highlands / Lake Geneva cliffside"
                      className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] uppercase font-sans tracking-[0.25em] font-medium flex items-center space-x-2"
                  >
                    <span>Proceed to Scale & Investment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SCALE & INVESTMENT */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-[#1A1A1A] font-bold">2. Floor Area & Investment Scope</h2>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Define project physical scale and capital allocation budget.</p>
                </div>

                <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] font-bold">
                      Estimated Built Area ({unit.toUpperCase()})
                    </label>
                    <div className="flex items-center space-x-2 text-xs font-sans">
                      <button
                        type="button"
                        onClick={() => setUnit('sqm')}
                        className={`px-3 py-1 border ${unit === 'sqm' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#1A1A1A]/20'}`}
                      >
                        m²
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit('sqft')}
                        className={`px-3 py-1 border ${unit === 'sqft' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#1A1A1A]/20'}`}
                      >
                        sq.ft
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min={200}
                      max={10000}
                      step={50}
                      value={areaSqM}
                      onChange={(e) => setAreaSqM(Number(e.target.value))}
                      className="w-full accent-[#1A1A1A]"
                    />
                    <span className="text-2xl font-serif font-bold text-[#1A1A1A] min-w-[120px] text-right">
                      {areaSqM.toLocaleString()} {unit}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-2 font-bold">
                    Target Architecture Investment Budget
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      '$2M – $5M USD',
                      '$5M – $15M USD',
                      '$15M – $50M USD',
                      '$50M+ USD (Masterplan)',
                    ].map((b) => (
                      <div
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`p-3.5 border text-center cursor-pointer text-xs font-bold transition-all ${
                          budget === b
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white/60 text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
                        }`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-2 font-bold">
                    Target Completion Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Immediate (Design Phase)', '6 – 12 Months', '12 – 24 Months'].map((t) => (
                      <div
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`p-3.5 border text-center cursor-pointer text-xs font-bold transition-all ${
                          timeline === t
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white/60 text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-white/60 text-[11px] font-sans tracking-[0.2em] uppercase font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium flex items-center space-x-2"
                  >
                    <span>Proceed to Requirements</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REQUIREMENTS */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-[#1A1A1A] font-bold">3. Special Architectural Criteria</h2>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Select key technical, environmental, or material priorities.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Board-Formed Concrete Materiality',
                    'Navona Travertine & Stone Facades',
                    'Net-Zero Passive Energy & Geothermal',
                    'Cantilever Structural Engineering',
                    'Acoustic Water Reflection Courtyard',
                    'Bespoke Interiors & Millwork',
                    'Historic/Heritage Site Integration',
                    'Subterranean Art/Wine Vault',
                  ].map((req) => {
                    const isChecked = requirements.includes(req);
                    return (
                      <div
                        key={req}
                        onClick={() => toggleRequirement(req)}
                        className={`p-3.5 border cursor-pointer text-xs flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white/60 text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
                        }`}
                      >
                        <span>{req}</span>
                        <div className={`w-4 h-4 border flex items-center justify-center ${isChecked ? 'bg-white text-[#1A1A1A]' : 'border-[#1A1A1A]/30'}`}>
                          {isChecked && <Check className="w-3 h-3 text-[#1A1A1A]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                    Additional Architectural Vision Notes
                  </label>
                  <textarea
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Describe specific site challenges, aesthetic preferences, or privacy requirements..."
                    className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-white/60 text-[11px] font-sans tracking-[0.2em] uppercase font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-8 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium flex items-center space-x-2"
                  >
                    <span>Proceed to Credentials</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CLIENT CREDENTIALS */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-[#1A1A1A] font-bold">4. Client Credentials & Authority</h2>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Direct contact details for Principal Partner match.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Dr. Alexander Vance"
                      className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                      Firm / Family Office / Organization
                    </label>
                    <input
                      type="text"
                      value={clientOrganization}
                      onChange={(e) => setClientOrganization(e.target.value)}
                      placeholder="e.g. Vance Capital / Private Client"
                      className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                      Corporate / Private Email *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="vance@vanceholdings.com"
                      className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] mb-1 font-bold">
                      Phone Number (for VR Review Scheduling)
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+41 44 890 2000"
                      className="w-full p-3 bg-white/80 border border-[#1A1A1A]/10 text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#E5E7EB]/40 border border-[#1A1A1A]/10 flex items-start space-x-3 text-xs text-[#1A1A1A]/70">
                  <ShieldCheck className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Confidentiality Guarantee:</strong> ARC / HABITAT operates under strict international non-disclosure standards. Project location and client identities are kept fully confidential.
                  </p>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#1A1A1A]/10">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-white/60 text-[11px] font-sans tracking-[0.2em] uppercase font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Qualified Brief</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        ) : (
          /* SUBMITTED CONFIRMATION & QUALIFICATION ROADMAP */
          <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
            <div className="text-center space-y-3">
              <span className="inline-block px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-sans uppercase tracking-[0.25em]">
                INQUIRY REGISTERED — {refCode}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-bold">
                Project Brief Confirmed
              </h2>
              <p className="text-sm text-[#1A1A1A]/70 max-w-xl mx-auto">
                Thank you, {clientName || 'Valued Client'}. Your brief for the <strong>{projectType}</strong> ({location}) has been routed directly to our Design Principals.
              </p>
            </div>

            {/* VISUAL QUALIFICATION PIPELINE */}
            <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 space-y-6">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold">
                QUALIFICATION & CONSULTATION ROADMAP
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                <div className="p-4 bg-[#F5F2ED] border-l-2 border-[#1A1A1A]">
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#1A1A1A] font-bold mb-1 tracking-widest">
                    <span>STAGE 01</span>
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-[#1A1A1A]">Inquiry Received</h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Ref Code: {refCode}. Logged into studio client portal.</p>
                </div>

                <div className="p-4 bg-[#F5F2ED] border-l-2 border-[#1A1A1A]/60">
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#1A1A1A]/60 font-bold mb-1 tracking-widest">
                    <span>STAGE 02 (IN PROGRESS)</span>
                    <div className="w-2 h-2 rounded-full bg-[#1A1A1A] animate-ping" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-[#1A1A1A]">Feasibility & Partner Match</h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Reviewing site constraints & material sourcing (24h turnaround).</p>
                </div>

                <div className="p-4 bg-[#F5F2ED] border-l-2 border-[#1A1A1A]/20">
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#1A1A1A]/40 font-bold mb-1 tracking-widest">
                    <span>STAGE 03</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-[#1A1A1A]">3D Spatial VR Review</h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">Private video or Zurich/LA studio consultation with Henrik Von Arc.</p>
                </div>
              </div>
            </div>

            {/* PRINTABLE RECEIPT CARD */}
            <div className="p-6 bg-[#E5E7EB]/50 border border-[#1A1A1A]/10 font-sans text-xs space-y-2">
              <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-2 font-bold text-[#1A1A1A] tracking-wider">
                <span>ARC / HABITAT INQUIRY SUMMARY</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#1A1A1A]/70 pt-1">
                <div>TYPOLOGY: {projectType}</div>
                <div>LOCATION: {country} ({location})</div>
                <div>AREA: {areaSqM} {unit}</div>
                <div>BUDGET: {budget}</div>
                <div>CLIENT: {clientName || 'Private Client'}</div>
                <div>CONTACT: {clientEmail || 'Pending'}</div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-[11px] font-sans tracking-[0.25em] uppercase font-medium"
              >
                Return to Architectural Model
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
