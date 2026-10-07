import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { X, Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Shield, HeartPulse, UserCheck, Volume2, Sparkles } from 'lucide-react';

interface VideoCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  initialRoomId?: string;
}

export const VideoCareModal: React.FC<VideoCareModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialRoomId,
}) => {
  const [roomId, setRoomId] = useState(initialRoomId || 'support-corridor-4');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [connectedState, setConnectedState] = useState<'connecting' | 'connected'>('connecting');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Setup media stream when opened
  useEffect(() => {
    if (!isOpen) {
      // Clean up stream
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
      setCallDuration(0);
      return;
    }

    if (initialRoomId) {
      setRoomId(initialRoomId);
    }

    let isMounted = true;

    async function initCamera() {
      try {
        setPermissionError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setCameraPermissionGranted(true);
        setTimeout(() => setConnectedState('connected'), 1200);
      } catch (err: any) {
        if (!isMounted) return;
        console.warn('Camera/mic access error:', err);
        setPermissionError(
          'Camera or microphone access was restricted by the browser. You are in voice & chat fallback mode.'
        );
        setConnectedState('connected');
      }
    }

    initCamera();

    // Duration timer
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    };
  }, [isOpen, initialRoomId]);

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsVideoOff(!isVideoOff);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#13232f] text-white rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#bf3d2e] flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#34d399] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping"></span>
                WebRTC Secure Telecare
              </div>
              <h2 className="text-lg font-bold font-heading">
                SafeStay Customer Care Video Room
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#ccdbdd]">
              <span>Room:</span>
              <span className="font-bold text-white">{roomId}</span>
            </div>

            <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#34d399]">
              ⏱ {formatTimer(callDuration)}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Permission warning banner if camera denied */}
        {permissionError && (
          <div className="bg-[#bf3d2e]/90 text-white text-xs px-4 py-2 text-center flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            <span>{permissionError}</span>
          </div>
        )}

        {/* Video Panels Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[380px]">
          {/* Local User Video */}
          <div className="relative rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center min-h-[220px]">
            {cameraPermissionGranted && !isVideoOff ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center text-2xl font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="font-semibold text-sm">{currentUser.name}</div>
                <div className="text-xs text-white/60">
                  {isVideoOff ? 'Camera Paused' : 'Voice Mode Active'}
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5">
              <span>{currentUser.name.split(' ')[0]} (You)</span>
              {isMuted && <MicOff className="w-3 h-3 text-[#f87171]" />}
            </div>
          </div>

          {/* Remote Care Support Partner */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1a3443] to-[#12222d] border border-white/10 overflow-hidden flex items-center justify-center min-h-[220px]">
            {connectedState === 'connected' ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 relative">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                    alt="Dr. Sneha Joshi"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-[#34d399]/40 shadow-xl"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#34d399] border-2 border-[#13232f]"></span>
                </div>

                <div>
                  <div className="font-bold text-base font-heading">
                    Dr. Sneha Joshi • Medical Liaison
                  </div>
                  <div className="text-xs text-[#34d399] font-medium flex items-center justify-center gap-1 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5" /> SafeStay Care Support Partner
                  </div>
                </div>

                {/* Animated Audio Waveform */}
                <div className="flex items-center gap-1 h-5 pt-2">
                  {[40, 70, 90, 60, 85, 45, 95, 60, 75, 50].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#34d399] rounded-full animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }}
                    ></span>
                  ))}
                </div>

                <div className="text-[11px] text-[#ccdbdd] bg-black/40 px-3 py-1 rounded-full">
                  &quot;Hello! How may I assist your stay or medical requirement today?&quot;
                </div>
              </div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#34d399] animate-spin mx-auto"></div>
                <div className="font-semibold text-sm">Connecting to Care Support...</div>
                <div className="text-xs text-white/50">Assigning nearest verified physician</div>
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 text-[#34d399]">
              <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
              <span>Care Desk (Online)</span>
            </div>
          </div>
        </div>

        {/* Call Controls Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-white/70 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#34d399]" />
            <span className="hidden sm:inline">End-to-End Encrypted Session</span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            {/* Mic Toggle */}
            <button
              onClick={toggleMute}
              className={`p-3.5 rounded-2xl border transition-all ${
                isMuted
                  ? 'bg-[#f87171] border-[#f87171] text-white shadow-lg shadow-[#f87171]/20'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Video Toggle */}
            <button
              onClick={toggleVideo}
              className={`p-3.5 rounded-2xl border transition-all ${
                isVideoOff
                  ? 'bg-[#f87171] border-[#f87171] text-white shadow-lg shadow-[#f87171]/20'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
              }`}
              title={isVideoOff ? 'Start video' : 'Stop video'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
            </button>

            {/* End Call */}
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-2xl bg-[#bf3d2e] hover:bg-[#a53225] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#bf3d2e]/30 transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>

          <div className="text-xs text-white/60 hidden md:block">
            SafeStay WebRTC v2.4
          </div>
        </div>
      </div>
    </div>
  );
};
