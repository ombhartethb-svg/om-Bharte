import React, { useState } from 'react';
import { User, GPSCoords } from '../types';
import { Compass, Eye, MapPin, User as UserIcon, Shield, ChevronDown, Check, PhoneCall } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onSelectUser: (user: User) => void;
  allUsers: User[];
  gps: GPSCoords | null;
  onToggleGPS: () => void;
  onOpenMap: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenSupport: () => void;
  eyeComfort: boolean;
  onToggleEyeComfort: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectUser,
  allUsers,
  gps,
  onToggleGPS,
  onOpenMap,
  onOpenAuth,
  onOpenProfile,
  onOpenSupport,
  eyeComfort,
  onToggleEyeComfort,
  activeSection,
  onNavigate,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-20 bg-[#f4f2ed]/90 backdrop-blur-md border-b border-[#ddd9d0]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#bf3d2e] to-[#e36a4d] text-white flex items-center justify-center font-bold text-xl shadow-md shadow-[#bf3d2e]/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#192230] font-heading">
                SafeStay
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1f5e68]/10 text-[#1f5e68]">
                Pune Hub
              </span>
            </div>
            <p className="text-[11px] text-[#5d6672] font-medium leading-none">
              Tourism, Hospitality & Care
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5d6672]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[#bf3d2e] ${activeSection === 'home' ? 'text-[#bf3d2e] font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('services')}
            className={`transition-colors hover:text-[#bf3d2e] ${activeSection === 'services' ? 'text-[#bf3d2e] font-bold' : ''}`}
          >
            Services
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`transition-colors hover:text-[#bf3d2e] ${activeSection === 'explore' ? 'text-[#bf3d2e] font-bold' : ''}`}
          >
            Explore
          </button>
          <button
            onClick={() => onNavigate('project')}
            className={`transition-colors hover:text-[#bf3d2e] ${activeSection === 'project' ? 'text-[#bf3d2e] font-bold' : ''}`}
          >
            Project Deck
          </button>
          <button
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 text-[#1f5e68] hover:text-[#17464d] font-bold"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Customer Care
          </button>
        </nav>

        {/* Top Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Eye Comfort Toggle */}
          <button
            onClick={onToggleEyeComfort}
            className={`p-2.5 rounded-xl border transition-all ${
              eyeComfort
                ? 'bg-[#e2dac7] border-[#c7bca7] text-[#192230]'
                : 'bg-[#fbfaf7] border-[#ddd9d0] text-[#5d6672] hover:bg-[#edeae2]'
            }`}
            title="Toggle Eye Comfort / Warm Contrast"
            aria-label="Toggle Eye Comfort"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* GPS Button */}
          <button
            onClick={gps ? onOpenMap : onToggleGPS}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
              gps
                ? 'bg-[#1f5e68]/10 text-[#1f5e68] border-[#1f5e68]/30 hover:bg-[#1f5e68]/20'
                : 'bg-[#fbfaf7] text-[#5d6672] border-[#ddd9d0] hover:bg-[#edeae2]'
            }`}
            title={gps ? 'GPS Active: Click to view live map' : 'Click to enable browser GPS'}
          >
            <MapPin className={`w-3.5 h-3.5 ${gps ? 'text-[#1f5e68] animate-pulse' : ''}`} />
            <span className="hidden sm:inline">
              {gps ? 'GPS Active' : 'Use GPS'}
            </span>
          </button>

          {/* Role switcher for quick testing */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-xl border border-[#ddd9d0] bg-[#fbfaf7] hover:bg-[#edeae2] transition-colors"
              title="Switch demo persona (Customer / Support Agent / Admin)"
            >
              <Shield className="w-3 h-3 text-[#bf3d2e]" />
              <span className="capitalize font-semibold text-[#192230]">
                {currentUser.role}
              </span>
              <ChevronDown className="w-3 h-3 text-[#5d6672]" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-[#fbfaf7] border border-[#ddd9d0] rounded-2xl shadow-xl py-2 z-50 text-xs"
                onClick={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-1.5 font-bold text-[#5d6672] uppercase tracking-wider text-[10px] border-b border-[#ddd9d0]/60">
                  Switch Active Role (Demo)
                </div>
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => onSelectUser(u)}
                    className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#edeae2] transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-[#192230]">{u.name}</div>
                      <div className="text-[11px] text-[#5d6672]">{u.role} • {u.id}</div>
                    </div>
                    {currentUser.id === u.id && (
                      <Check className="w-4 h-4 text-[#267a55]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-[#ddd9d0] bg-[#fbfaf7] hover:bg-[#edeae2] transition-colors group"
          >
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#ddd9d0]"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-[#1f5e68]/15 text-[#1f5e68] flex items-center justify-center font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
            )}
            <div className="text-left hidden lg:block">
              <div className="text-xs font-bold text-[#192230] leading-tight line-clamp-1">
                {currentUser.name.split(' ')[0]}
              </div>
              <div className="text-[10px] text-[#5d6672] font-mono leading-tight">
                {currentUser.id}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
