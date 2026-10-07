import React from 'react';
import { ServiceCategory } from '../types';
import { ArrowRight, Compass } from 'lucide-react';

interface ServicesOverviewProps {
  services: ServiceCategory[];
  onSelectService: (key: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  services,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-12 md:py-16 border-t border-[#ddd9d0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#bf3d2e] mb-2 font-heading">
              QUICK ACCESS ECOSYSTEM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#192230] tracking-tight font-heading">
              Everything a traveller or family may need
            </h2>
          </div>
          <div className="text-sm font-semibold text-[#5d6672] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#267a55]"></span>
            Designed around single-click instant actions
          </div>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <article
              key={s.id}
              onClick={() => onSelectService(s.key)}
              className="cursor-pointer group comfort-card p-6 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#bf3d2e]/50 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#edeae2] group-hover:bg-[#bf3d2e]/10 flex items-center justify-center text-3xl mb-5 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-[#192230] font-heading mb-2 group-hover:text-[#bf3d2e] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[#5d6672] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#ddd9d0]/50 flex items-center justify-between text-xs font-bold text-[#1f5e68] group-hover:text-[#bf3d2e] transition-colors">
                <span>Open in one click</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
