import React from 'react';
import { ProjectMetrics } from '../types';
import { ShieldCheck, Video, MapPin, Sparkles, ArrowRight, HeartPulse, Bed, Bus, ShoppingBag } from 'lucide-react';

interface HeroProps {
  metrics: ProjectMetrics;
  onExploreServices: () => void;
  onOpenSupport: () => void;
  onOpenVideoCare: () => void;
  onOpenMap: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  metrics,
  onExploreServices,
  onOpenSupport,
  onOpenVideoCare,
  onOpenMap,
}) => {
  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf3d2e]/10 text-[#bf3d2e] font-extrabold text-[11px] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              ONE CLICK. MANY ESSENTIALS.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#192230] leading-[1.08] tracking-tight font-heading">
              One calm place for{' '}
              <span className="text-[#bf3d2e] underline decoration-[#bf3d2e]/30 underline-offset-4">
                stays, travel, care
              </span>{' '}
              & doorstep delivery.
            </h1>

            <p className="text-lg sm:text-xl text-[#5d6672] leading-relaxed max-w-2xl font-normal">
              SafeStay is a privacy-aware hospitality platform for tourists, families and service partners. Find certified rooms, buses, doctors, medical appliances, travel essentials, clothing and doorstep delivery from one unified dashboard.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 rounded-2xl bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold text-base shadow-lg shadow-[#bf3d2e]/25 transition-all flex items-center gap-2 hover:gap-3"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVideoCare}
                className="px-6 py-3.5 rounded-2xl bg-[#1f5e68] hover:bg-[#17464d] text-white font-bold text-base shadow-lg shadow-[#1f5e68]/20 transition-all flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Start Video Care</span>
              </button>

              <button
                onClick={onOpenSupport}
                className="px-5 py-3.5 rounded-2xl bg-[#fbfaf7] hover:bg-[#edeae2] text-[#192230] font-bold text-base border border-[#ddd9d0] transition-colors"
              >
                Customer Support Desk
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#5d6672]">
              <span className="flex items-center gap-1.5 text-[#267a55]">
                <ShieldCheck className="w-4 h-4" /> Verified Directory
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f5e68]"></span> Privacy-First Controls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f5e68]"></span> Live Browser GPS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f5e68]"></span> Instant WebRTC Video
              </span>
            </div>
          </div>

          {/* Right Column Command Center Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#152a3a] via-[#1f3a44] to-[#274b50] text-white p-6 sm:p-7 shadow-2xl border border-white/10 overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#bf3d2e]/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Card top */}
              <div className="flex items-center justify-between pb-5 border-b border-white/15">
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-[#bfe7d1]">
                    Operational Prototype
                  </div>
                  <div className="text-lg font-bold font-heading">
                    SafeStay Command Center
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#bfe7d1]">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping"></span>
                  <span>Live Network</span>
                </div>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    {metrics.totalTasks}
                  </div>
                  <div className="text-xs text-[#ccdbdd] font-medium mt-0.5">
                    Platform Milestones
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#34d399]">
                    {metrics.completed}
                  </div>
                  <div className="text-xs text-[#ccdbdd] font-medium mt-0.5">
                    Completed & Validated
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#fbbf24]">
                    {metrics.inProgress}
                  </div>
                  <div className="text-xs text-[#ccdbdd] font-medium mt-0.5">
                    In Progress Active
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#f87171]">
                    {metrics.blocked}
                  </div>
                  <div className="text-xs text-[#ccdbdd] font-medium mt-0.5">
                    Under Final Review
                  </div>
                </div>
              </div>

              {/* Mini Map Visual Representation */}
              <div 
                onClick={onOpenMap}
                className="cursor-pointer relative h-36 rounded-2xl bg-[#0f1d27] border border-white/10 overflow-hidden group transition-all hover:border-[#bf3d2e]/50"
              >
                {/* Visual grid styling */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5d9aa0_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Animated route curve */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120" fill="none">
                  <path
                    d="M 30 90 Q 90 20 160 50 T 270 30"
                    stroke="#bf3d2e"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                </svg>

                {/* Location pins */}
                <div className="absolute left-[20%] top-[45%] flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#bf3d2e] ring-4 ring-[#bf3d2e]/30"></span>
                  <span className="text-[10px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                    Kothrud Hub
                  </span>
                </div>

                <div className="absolute left-[55%] top-[25%] flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#34d399] ring-4 ring-[#34d399]/30"></span>
                  <span className="text-[10px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                    Shivaji Nagar
                  </span>
                </div>

                <div className="absolute left-[75%] top-[60%] flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#38bdf8] ring-4 ring-[#38bdf8]/30"></span>
                  <span className="text-[10px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                    Viman Nagar
                  </span>
                </div>

                {/* Banner bottom */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-medium text-[#ccdbdd]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#bf3d2e]" /> Pune Network (4 corridors)
                  </span>
                  <span className="text-white group-hover:text-[#bf3d2e] font-semibold transition-colors">
                    Click to Open Map →
                  </span>
                </div>
              </div>

              {/* Quick shortcut pills */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#ccdbdd]">
                <span>Quick Access:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={onExploreServices}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    Stays
                  </button>
                  <button 
                    onClick={onExploreServices}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    Medical
                  </button>
                  <button 
                    onClick={onOpenVideoCare}
                    className="px-2.5 py-1 rounded-lg bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold transition-colors"
                  >
                    Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
