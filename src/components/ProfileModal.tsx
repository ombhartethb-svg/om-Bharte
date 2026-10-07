import React, { useState } from 'react';
import { User, OrderItem } from '../types';
import { getOrders, saveUser, formatINR } from '../services/store';
import { X, User as UserIcon, Shield, Camera, Lock, Eye, CheckCircle, Clock, ShoppingBag, Bed, Bus, HeartPulse } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdateUser: (updatedUser: User) => void;
  onOpenAuth: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'requests'>('profile');
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [city, setCity] = useState(currentUser.city);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [profilePublic, setProfilePublic] = useState(currentUser.privacy?.profilePublic ?? true);
  const [contactVisible, setContactVisible] = useState(currentUser.privacy?.contactVisible ?? false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const orders = getOrders(currentUser.id);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...currentUser,
      name,
      phone,
      city,
      bio,
      avatar,
      privacy: {
        profilePublic,
        contactVisible
      }
    };
    saveUser(updated);
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fbfaf7] border border-[#ddd9d0] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#ddd9d0] bg-[#f4f2ed] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#bf3d2e] font-heading">
              SECURE ACCOUNT SETTINGS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#192230] font-heading">
              Profile & Privacy Controls
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5d6672] hover:bg-[#edeae2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-4 flex gap-4 border-b border-[#ddd9d0]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-[#bf3d2e] text-[#bf3d2e]'
                : 'border-transparent text-[#5d6672] hover:text-[#192230]'
            }`}
          >
            Identity & Privacy
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'border-[#bf3d2e] text-[#bf3d2e]'
                : 'border-transparent text-[#5d6672] hover:text-[#192230]'
            }`}
          >
            <span>My Requests & Bookings</span>
            <span className="px-2 py-0.5 rounded-full bg-[#edeae2] text-[10px] text-[#192230]">
              {orders.length}
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {savedSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-[#267a55]/10 text-[#267a55] border border-[#267a55]/20 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Profile details and privacy settings saved successfully!</span>
            </div>
          )}

          {activeTab === 'profile' ? (
            <form onSubmit={handleSave} className="space-y-5">
              {/* Top Avatar + ID */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#edeae2] border border-[#ddd9d0]">
                <div className="relative group">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#ddd9d0]"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-[#1f5e68] text-white text-3xl font-bold flex items-center justify-center">
                      {name.charAt(0)}
                    </div>
                  )}
                  <label className="absolute -bottom-1 -right-1 p-2 bg-[#192230] text-white rounded-xl cursor-pointer hover:bg-black transition-colors shadow-md">
                    <Camera className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-base font-bold text-[#192230]">{name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#bf3d2e]/10 text-[#bf3d2e] uppercase">
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="text-xs text-[#5d6672] font-mono mt-0.5">
                    Authorized SafeStay ID: <strong>{currentUser.id}</strong>
                  </div>
                  <div className="text-[11px] text-[#5d6672] mt-1">
                    Click the camera icon to upload a personalized profile picture.
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    City / Corridor
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Email Address (Account ID)
                  </label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#edeae2] border border-[#ddd9d0] text-sm text-[#5d6672] cursor-not-allowed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Bio & Travel Preferences
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230] resize-none"
                  />
                </div>
              </div>

              {/* Privacy Switches */}
              <div className="pt-3 border-t border-[#ddd9d0] space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#bf3d2e] font-heading">
                  Granular Privacy Configuration
                </div>

                {/* Switch 1 */}
                <div className="p-3.5 rounded-2xl bg-[#f4f2ed] border border-[#ddd9d0] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#192230]">
                      Public Profile Search by ID
                    </div>
                    <div className="text-[11px] text-[#5d6672]">
                      Allow registered partners to verify your basic identity card using your SafeStay ID ({currentUser.id}).
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profilePublic}
                      onChange={(e) => setProfilePublic(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#ddd9d0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#ddd9d0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f5e68]"></div>
                  </label>
                </div>

                {/* Switch 2 */}
                <div className="p-3.5 rounded-2xl bg-[#f4f2ed] border border-[#ddd9d0] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#192230]">
                      Mask Contact Details
                    </div>
                    <div className="text-[11px] text-[#5d6672]">
                      When toggled on, your email and phone will be shared with service providers for direct call dispatch.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contactVisible}
                      onChange={(e) => setContactVisible(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#ddd9d0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#ddd9d0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f5e68]"></div>
                  </label>
                </div>
              </div>

              {/* Submit / Action buttons */}
              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="px-4 py-2 text-xs font-bold text-[#5d6672] hover:text-[#192230] border border-[#ddd9d0] rounded-xl hover:bg-[#edeae2]"
                >
                  Switch Demo Account / Sign Out
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Save Profile & Privacy
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-[#5d6672]">
                  <ShoppingBag className="w-12 h-12 mx-auto text-[#5d6672]/40 mb-2" />
                  <p className="font-semibold text-sm">No activity recorded yet</p>
                  <p className="text-xs text-[#5d6672] mt-0.5">
                    Explore services to book rooms, buses, doctor visits or gear delivery.
                  </p>
                </div>
              ) : (
                orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-4 rounded-2xl bg-[#f4f2ed] border border-[#ddd9d0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1f5e68]/10 text-[#1f5e68]">
                          {o.id}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#bf3d2e]">
                          {o.action}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#192230]">
                        {o.itemTitle}
                      </h4>
                      <p className="text-xs text-[#5d6672] mt-0.5">
                        {o.notes}
                      </p>
                      <div className="text-[10px] text-[#5d6672]/80 mt-1">
                        Booked on {new Date(o.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      {o.cost && (
                        <div className="font-extrabold text-sm text-[#192230]">
                          {formatINR(o.cost)}
                        </div>
                      )}
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#267a55]/15 text-[#267a55]">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
