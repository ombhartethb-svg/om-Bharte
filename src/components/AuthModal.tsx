import React, { useState } from 'react';
import { User } from '../types';
import { initialUsers } from '../data/initialData';
import { saveUser } from '../services/store';
import { X, Shield, Lock, Mail, User as UserIcon, Phone, KeyRound, CheckCircle, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'resetConfirm'>('login');
  const [email, setEmail] = useState('customer@safestay.demo');
  const [password, setPassword] = useState('Demo@123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [city, setCity] = useState('Pune');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDemoFill = (role: 'customer' | 'agent' | 'admin') => {
    if (role === 'customer') {
      setEmail('customer@safestay.demo');
      setPassword('Demo@123');
    } else if (role === 'agent') {
      setEmail('care@safestay.demo');
      setPassword('Demo@123');
    } else {
      setEmail('admin@safestay.demo');
      setPassword('Demo@123');
    }
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const existing = initialUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      onLoginSuccess(existing);
      onClose();
    } else {
      // Or create mock login for custom email
      const customUser: User = {
        id: 'SS-CU-' + Math.floor(1000 + Math.random() * 9000),
        role: 'customer',
        name: email.split('@')[0],
        email: email.trim(),
        phone: '+91 98000 00000',
        city: 'Pune',
        bio: 'Custom registered traveller',
        avatar: null,
        privacy: { profilePublic: true, contactVisible: false }
      };
      saveUser(customUser);
      onLoginSuccess(customUser);
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    const newUser: User = {
      id: 'SS-CU-' + Math.floor(1000 + Math.random() * 9000),
      role: 'customer',
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Pune',
      bio: 'New registered traveller',
      avatar: null,
      privacy: { profilePublic: true, contactVisible: false }
    };

    saveUser(newUser);
    onLoginSuccess(newUser);
    onClose();
  };

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setMode('resetConfirm');
  };

  const handleConfirmReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim() !== generatedCode) {
      setError('Invalid verification code. Please check the demo code shown above.');
      return;
    }
    setSuccess('Password reset successfully! You can now sign in.');
    setMode('login');
    setPassword(newPassword || 'Demo@123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fbfaf7] border border-[#ddd9d0] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#ddd9d0] bg-[#f4f2ed] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#bf3d2e] font-heading">
              ACCOUNT ACCESS
            </div>
            <h2 className="text-xl font-bold text-[#192230] font-heading">
              {mode === 'login' && 'Sign in to SafeStay'}
              {mode === 'register' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Password'}
              {mode === 'resetConfirm' && 'Enter Verification Code'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5d6672] hover:bg-[#edeae2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-[#bf3d2e]/10 text-[#bf3d2e] border border-[#bf3d2e]/20 text-xs font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-[#267a55]/10 text-[#267a55] border border-[#267a55]/20 text-xs font-semibold">
              {success}
            </div>
          )}

          {/* Quick Demo Selector */}
          {mode === 'login' && (
            <div className="p-3 rounded-2xl bg-[#edeae2] border border-[#ddd9d0] space-y-2">
              <div className="text-[11px] font-bold text-[#5d6672] uppercase tracking-wider">
                One-Click Demo Credentials
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDemoFill('customer')}
                  className="px-2 py-1.5 rounded-lg bg-[#fbfaf7] hover:bg-white text-[11px] font-bold text-[#192230] border border-[#ddd9d0] transition-colors"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('agent')}
                  className="px-2 py-1.5 rounded-lg bg-[#fbfaf7] hover:bg-white text-[11px] font-bold text-[#192230] border border-[#ddd9d0] transition-colors"
                >
                  Care Agent
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('admin')}
                  className="px-2 py-1.5 rounded-lg bg-[#fbfaf7] hover:bg-white text-[11px] font-bold text-[#192230] border border-[#ddd9d0] transition-colors"
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5d6672] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#192230]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#1f5e68] hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5d6672] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold text-sm shadow-md shadow-[#bf3d2e]/20 transition-colors"
              >
                Sign in
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs text-[#5d6672] hover:text-[#192230]"
                >
                  Don&apos;t have an account? <strong className="text-[#bf3d2e]">Create one</strong>
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Rohan Sen"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan@example.com"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold text-sm shadow-md shadow-[#bf3d2e]/20 transition-colors mt-2"
              >
                Complete Registration
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-[#5d6672] hover:text-[#192230]"
                >
                  Already have an account? <strong className="text-[#bf3d2e]">Sign in</strong>
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <p className="text-xs text-[#5d6672]">
                Enter your account email. In this demonstration, a simulated 6-digit recovery code will be displayed instantly.
              </p>
              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Account Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="flex-1 py-2.5 rounded-xl border border-[#ddd9d0] text-xs font-bold text-[#5d6672]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1f5e68] text-white text-xs font-bold"
                >
                  Generate Code
                </button>
              </div>
            </form>
          )}

          {/* RESET CONFIRMATION */}
          {mode === 'resetConfirm' && (
            <form onSubmit={handleConfirmReset} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#267a55]/10 border border-[#267a55]/20 text-xs text-[#267a55] font-semibold">
                Demo Verification Code: <strong className="font-mono text-sm tracking-widest">{generatedCode}</strong>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Enter code above"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#bf3d2e] text-white font-bold text-xs"
              >
                Confirm New Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
