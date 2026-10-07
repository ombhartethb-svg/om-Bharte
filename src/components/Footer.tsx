import React from 'react';
import { ShieldCheck, Heart, MapPin, Video, PhoneCall, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAuth: () => void;
  onOpenSupport: () => void;
  onOpenVideoCare: () => void;
  onOpenMap: () => void;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuth,
  onOpenSupport,
  onOpenVideoCare,
  onOpenMap,
  onNavigate,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#ddd9d0] bg-[#1d2b35] text-[#d0d9dc] transition-colors">
      {/* Ready to Demo CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#e36a4d] font-heading">
              READY TO DEMO & VALIDATE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Experience the Complete SafeStay Prototype in One Click
            </h2>
            <p className="text-sm text-[#a3b1b5] max-w-2xl leading-relaxed">
              Test verified room reservations, bus seat selection, doctor visits, medical appliance requests, GPS-based distance sorting, WebRTC video calling rooms, and privacy controls.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-xs font-bold text-[#bfe7d1] uppercase tracking-wider flex items-center justify-between">
              <span>Demo Login Account</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">Pre-Loaded</span>
            </div>
            <div className="font-mono text-xs text-white space-y-0.5">
              <div>user: customer@safestay.demo</div>
              <div>pass: Demo@123</div>
            </div>
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold text-xs transition-colors shadow-md"
            >
              Sign in as Demo Customer →
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#bf3d2e] text-white font-bold flex items-center justify-center text-base">
              S
            </div>
            <span className="font-bold text-base text-white font-heading">
              SafeStay
            </span>
          </div>
          <p className="text-[#a3b1b5] leading-relaxed">
            Privacy-first hospitality platform integrating safe stays, mobility, healthcare essentials, gear and on-demand video care.
          </p>
          <div className="text-[11px] text-[#7d8d91]">
            Operating Pilot: Pune, Maharashtra
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <div className="font-bold text-white text-sm mb-3">Service Pillars</div>
          <div><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Medical Appliances</button></div>
          <div><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Tourist Essentials</button></div>
          <div><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Verified Rooms & Stays</button></div>
          <div><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Intercity Buses & Mobility</button></div>
          <div><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Weather Gear & Clothing</button></div>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <div className="font-bold text-white text-sm mb-3">Platform Tools</div>
          <div><button onClick={onOpenVideoCare} className="hover:text-white transition-colors flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-[#34d399]" /> WebRTC Video Care</button></div>
          <div><button onClick={onOpenMap} className="hover:text-white transition-colors flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#bf3d2e]" /> Interactive Corridor Map</button></div>
          <div><button onClick={onOpenSupport} className="hover:text-white transition-colors flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-[#38bdf8]" /> 24x7 Support Desk</button></div>
          <div><button onClick={() => onNavigate('project')} className="hover:text-white transition-colors">Project Roadmap & Metrics</button></div>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <div className="font-bold text-white text-sm">Privacy & Safety</div>
          <p className="text-[#a3b1b5] leading-relaxed">
            Device location is strictly maintained in the browser session. Contact details are masked by default behind your SafeStay ID.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold pt-1"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Back to top
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7d8d91]">
          <span>
            SafeStay Prototype • Tourism & Hospitality + Healthcare Essentials • Built for AI Studio
          </span>
          <div className="flex items-center gap-4">
            <span>Pune Service Hub</span>
            <span>Privacy Controlled</span>
            <span>WebRTC Telecare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
