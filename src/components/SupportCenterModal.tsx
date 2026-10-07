import React, { useState } from 'react';
import { User, SupportTicket } from '../types';
import { getTickets, addTicket } from '../services/store';
import { X, Send, Video, MessageSquare, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

interface SupportCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onLaunchVideoCare: (room?: string) => void;
}

export const SupportCenterModal: React.FC<SupportCenterModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLaunchVideoCare,
}) => {
  const [activeTab, setActiveTab] = useState<'ticket' | 'history'>('ticket');
  const [subject, setSubject] = useState('Booking & Stay Assistance');
  const [category, setCategory] = useState('Stay Booking');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>(() => getTickets(currentUser.id));
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newTkt = addTicket({
      userId: currentUser.id,
      userName: currentUser.name,
      subject,
      category,
      message: message.trim()
    });

    setTickets([newTkt, ...tickets]);
    setMessage('');
    setStatusMessage('Support ticket created successfully! Care support response target: under 5 minutes.');
    setActiveTab('history');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fbfaf7] border border-[#ddd9d0] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#ddd9d0] bg-[#f4f2ed] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#bf3d2e] font-heading">
              24X7 HOSPITALITY & CARE DESK
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#192230] font-heading">
              SafeStay Customer Care Center
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5d6672] hover:bg-[#edeae2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Care Banner */}
        <div className="p-4 mx-5 mt-5 rounded-2xl bg-gradient-to-r from-[#1f5e68] to-[#2b7b82] text-white flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="font-bold text-sm flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              Need immediate face-to-face assistance?
            </div>
            <div className="text-xs text-white/80">
              Start an instant browser video consultation with our on-duty medical & hospitality liaison.
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onLaunchVideoCare('support-desk-urgent');
            }}
            className="px-4 py-2 rounded-xl bg-white text-[#1f5e68] font-bold text-xs hover:bg-[#edeae2] transition-colors shadow-sm"
          >
            Start Video Call Now →
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-4 flex gap-2 border-b border-[#ddd9d0]">
          <button
            onClick={() => setActiveTab('ticket')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'ticket'
                ? 'border-[#bf3d2e] text-[#bf3d2e]'
                : 'border-transparent text-[#5d6672] hover:text-[#192230]'
            }`}
          >
            Submit New Ticket
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-[#bf3d2e] text-[#bf3d2e]'
                : 'border-transparent text-[#5d6672] hover:text-[#192230]'
            }`}
          >
            <span>My Tickets</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#edeae2] text-[10px] text-[#192230]">
              {tickets.length}
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {statusMessage && (
            <div className="mb-4 p-3 rounded-xl bg-[#267a55]/10 text-[#267a55] border border-[#267a55]/20 text-xs font-semibold flex items-center justify-between">
              <span>{statusMessage}</span>
              <button onClick={() => setStatusMessage(null)}>×</button>
            </div>
          )}

          {activeTab === 'ticket' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230] focus:ring-2 focus:ring-[#1f5e68] focus:outline-none"
                >
                  <option value="Stay Booking">Stay Booking & Check-in</option>
                  <option value="Medical Appliance">Medical Appliance / Wheelchair Delivery</option>
                  <option value="Doctor Telecare">Doctor Telecare & Prescriptions</option>
                  <option value="Bus Mobility">Bus Timings & Seat Booking</option>
                  <option value="General Safety">General Safety & Emergency Protocol</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230] focus:ring-2 focus:ring-[#1f5e68] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1.5">
                  Explain your request or issue
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell our care agents what you need assistance with (e.g. wheelchair ramp confirmation, late room check-in, oxygen cylinder delivery)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230] focus:ring-2 focus:ring-[#1f5e68] focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#5d6672]">
                  Logged in as <strong className="text-[#192230]">{currentUser.name}</strong> ({currentUser.id})
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {tickets.length === 0 ? (
                <div className="text-center py-8 text-[#5d6672] text-sm">
                  No support tickets created yet.
                </div>
              ) : (
                tickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-[#f4f2ed] border border-[#ddd9d0] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#1f5e68] bg-[#1f5e68]/10 px-2 py-0.5 rounded">
                          {t.id}
                        </span>
                        <h4 className="font-bold text-sm text-[#192230]">
                          {t.subject}
                        </h4>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          t.status === 'resolved'
                            ? 'bg-[#267a55]/15 text-[#267a55]'
                            : 'bg-[#a66a15]/15 text-[#a66a15]'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#5d6672]">{t.message}</p>

                    {t.replies && t.replies.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#ddd9d0]/70 space-y-2">
                        {t.replies.map((r, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-[#fbfaf7] border border-[#ddd9d0]/60 text-xs">
                            <div className="font-bold text-[#1f5e68] flex items-center justify-between">
                              <span>{r.sender}</span>
                              <span className="text-[10px] text-[#5d6672] font-normal">{r.time}</span>
                            </div>
                            <div className="text-[#192230] mt-1">{r.text}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-[10px] text-[#5d6672]">
                      Created {new Date(t.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 px-5 border-t border-[#ddd9d0] bg-[#f4f2ed] flex items-center justify-between text-xs text-[#5d6672]">
          <span>Emergency hotline: +91 90000 20001 (Pune District Medical & SafeStay Support)</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#ddd9d0] text-[#192230] font-bold text-xs hover:bg-[#c7c2b6]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
