import React, { useState } from 'react';
import { ProjectData } from '../types';
import { formatINR } from '../services/store';
import { BarChart3, TrendingUp, CheckCircle2, Clock, AlertTriangle, Layers, ChevronDown, ChevronUp, Calculator, ShieldCheck } from 'lucide-react';

interface ProjectControlRoomProps {
  projectData: ProjectData;
}

export const ProjectControlRoom: React.FC<ProjectControlRoomProps> = ({
  projectData,
}) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('Phase 3');
  const [dailyBookings, setDailyBookings] = useState(45);
  const [avgOrderVal, setAvgOrderVal] = useState(1200);
  const [commissionRate, setCommissionRate] = useState(8);

  const { metrics, estimates, roadmap } = projectData;

  // Interactive calculated model
  const projectedYearRevenue = Math.round(dailyBookings * avgOrderVal * (commissionRate / 100) * 365);
  const projectedGross = Math.round(projectedYearRevenue * 0.8);
  const projectedNet = Math.round(projectedYearRevenue * 0.6);

  return (
    <section id="project" className="py-14 md:py-20 border-t border-[#ddd9d0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#bf3d2e] mb-2 font-heading">
              PROJECT CONTROL ROOM & ROADMAP
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#192230] tracking-tight font-heading">
              From Concept Deck to Operating Prototype
            </h2>
            <p className="text-[#5d6672] text-sm mt-1 max-w-2xl">
              Tracking operational milestones, regulatory safety compliance, corridor rollout status, and validated financial sustainability models.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267a55]/10 text-[#267a55] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#267a55] animate-pulse"></span>
            <span>Audit Stage: Pre-Launch Onboarding</span>
          </div>
        </div>

        {/* 8 Stat Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#5d6672] mb-1">
              <span>Total Workstreams</span>
              <Layers className="w-4 h-4 text-[#1f5e68]" />
            </div>
            <div className="text-3xl font-extrabold text-[#192230] font-heading">
              {metrics.totalTasks}
            </div>
            <div className="text-[11px] text-[#5d6672] mt-1 font-medium">
              Tracked platform tasks
            </div>
          </div>

          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#267a55] mb-1">
              <span>Completed</span>
              <CheckCircle2 className="w-4 h-4 text-[#267a55]" />
            </div>
            <div className="text-3xl font-extrabold text-[#267a55] font-heading">
              {metrics.completed}
            </div>
            <div className="text-[11px] text-[#5d6672] mt-1 font-medium">
              {Math.round((metrics.completed / metrics.totalTasks) * 100)}% milestone progress
            </div>
          </div>

          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#a66a15] mb-1">
              <span>Active Sprints</span>
              <Clock className="w-4 h-4 text-[#a66a15]" />
            </div>
            <div className="text-3xl font-extrabold text-[#a66a15] font-heading">
              {metrics.inProgress}
            </div>
            <div className="text-[11px] text-[#5d6672] mt-1 font-medium">
              In progress (Partner QA)
            </div>
          </div>

          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#bf3d2e] mb-1">
              <span>Needs Audit</span>
              <AlertTriangle className="w-4 h-4 text-[#bf3d2e]" />
            </div>
            <div className="text-3xl font-extrabold text-[#bf3d2e] font-heading">
              {metrics.blocked}
            </div>
            <div className="text-[11px] text-[#5d6672] mt-1 font-medium">
              Facility inspection queue
            </div>
          </div>

          {/* Financials from the Project Deck */}
          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="text-xs font-bold text-[#5d6672] mb-1">
              Year 1 Target Revenue
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#192230] font-heading">
              {formatINR(estimates.year1Revenue)}
            </div>
            <div className="text-[11px] text-[#267a55] font-semibold mt-1">
              Validated deck forecast
            </div>
          </div>

          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="text-xs font-bold text-[#5d6672] mb-1">
              Gross Profit
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#192230] font-heading">
              {formatINR(estimates.grossProfit)}
            </div>
            <div className="text-[11px] text-[#5d6672] font-semibold mt-1">
              ~80% operational margin
            </div>
          </div>

          <div className="comfort-card p-5 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="text-xs font-bold text-[#5d6672] mb-1">
              Net Profit
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1f5e68] font-heading">
              {formatINR(estimates.netProfit)}
            </div>
            <div className="text-[11px] text-[#5d6672] font-semibold mt-1">
              ~60% bottom line
            </div>
          </div>

          <div className="comfort-card p-5 rounded-2xl bg-[#152a3a] text-white border border-[#152a3a]">
            <div className="text-xs font-bold text-[#bfe7d1] mb-1">
              Break-Even Point
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Month {estimates.breakEvenMonth}
            </div>
            <div className="text-[11px] text-[#ccdbdd] font-semibold mt-1">
              Low-capex lean rollout
            </div>
          </div>
        </div>

        {/* Roadmap Phases List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 comfort-card p-6 sm:p-8 rounded-3xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ddd9d0]/60">
              <h3 className="text-xl font-bold text-[#192230] font-heading">
                Multi-Phase Execution Roadmap
              </h3>
              <span className="text-xs text-[#5d6672]">
                Click any phase to expand deliverables
              </span>
            </div>

            <div className="space-y-4">
              {roadmap.map((phase) => {
                const isExpanded = expandedPhase === phase.phase;
                const progressPct = Math.round((phase.tasksCompleted / phase.totalTasks) * 100);

                return (
                  <div
                    key={phase.phase}
                    className="p-4 rounded-2xl bg-[#f4f2ed] border border-[#ddd9d0]/80 transition-all"
                  >
                    <div
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                      className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#bf3d2e]/10 text-[#bf3d2e] font-extrabold text-xs font-mono">
                          {phase.phase}
                        </span>
                        <div>
                          <div className="font-bold text-sm text-[#192230]">
                            {phase.name}
                          </div>
                          <div className="text-xs text-[#5d6672]">
                            {phase.range} • {phase.tasksCompleted}/{phase.totalTasks} tasks completed
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:ml-auto">
                        <div className="w-24 sm:w-32 bg-[#ddd9d0] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              phase.status === 'completed'
                                ? 'bg-[#267a55]'
                                : phase.status === 'progress'
                                ? 'bg-[#bf3d2e]'
                                : 'bg-[#a66a15]'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#192230] w-9 text-right">
                          {progressPct}%
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#5d6672]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5d6672]" />
                        )}
                      </div>
                    </div>

                    {isExpanded && phase.description && (
                      <div className="mt-3 pt-3 border-t border-[#ddd9d0]/60 text-xs text-[#5d6672] leading-relaxed">
                        <p>{phase.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-[#1f5e68]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Status: {phase.status.toUpperCase()} • Validated by SafeStay Quality Desk</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Financial Modeler */}
          <div className="lg:col-span-4 comfort-card p-6 sm:p-7 rounded-3xl bg-[#fbfaf7] border border-[#ddd9d0] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1f5e68] mb-2 font-heading">
                <Calculator className="w-4 h-4" />
                <span>Interactive Growth Simulator</span>
              </div>
              <h3 className="text-lg font-bold text-[#192230] font-heading mb-1">
                Corridor Scalability Model
              </h3>
              <p className="text-xs text-[#5d6672] mb-5">
                Simulate Year 1 & 2 projections based on Pune tourist footfalls and verified service commissions.
              </p>

              {/* Slider 1 */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#192230]">Daily Bookings:</span>
                    <span className="font-bold text-[#bf3d2e]">{dailyBookings} bookings/day</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    step={5}
                    value={dailyBookings}
                    onChange={(e) => setDailyBookings(Number(e.target.value))}
                    className="w-full accent-[#bf3d2e]"
                  />
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#192230]">Avg. Order Basket:</span>
                    <span className="font-bold text-[#1f5e68]">{formatINR(avgOrderVal)}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={3000}
                    step={100}
                    value={avgOrderVal}
                    onChange={(e) => setAvgOrderVal(Number(e.target.value))}
                    className="w-full accent-[#1f5e68]"
                  />
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#192230]">Commission Share:</span>
                    <span className="font-bold text-[#267a55]">{commissionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={15}
                    step={1}
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    className="w-full accent-[#267a55]"
                  />
                </div>
              </div>
            </div>

            {/* Simulated output box */}
            <div className="mt-6 p-4 rounded-2xl bg-[#edeae2] border border-[#ddd9d0] space-y-2">
              <div className="text-[11px] font-bold text-[#5d6672] uppercase tracking-wider">
                Simulated Annual Output
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5d6672]">Gross Commission:</span>
                <span className="font-extrabold text-[#192230] text-sm">
                  {formatINR(projectedYearRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5d6672]">Estimated Net Profit:</span>
                <span className="font-extrabold text-[#267a55] text-sm">
                  {formatINR(projectedNet)}
                </span>
              </div>
              <div className="text-[10px] text-[#5d6672] pt-1 border-t border-[#ddd9d0]/70">
                Matches the conservative prototype run rate outlined in the deck.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
