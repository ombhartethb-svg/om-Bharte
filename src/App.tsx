import React, { useState, useEffect } from 'react';
import { User, GPSCoords, OrderItem } from './types';
import { initialUsers, initialDoctors, initialStores, initialTouristShops, initialClothing, initialRooms, initialBuses, initialServices, initialProjectData } from './data/initialData';
import { getCurrentUser, setCurrentUser, getAllUsers } from './services/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { DirectoryExplorer } from './components/DirectoryExplorer';
import { ProjectControlRoom } from './components/ProjectControlRoom';
import { Footer } from './components/Footer';
import { InteractiveMapModal } from './components/InteractiveMapModal';
import { VideoCareModal } from './components/VideoCareModal';
import { SupportCenterModal } from './components/SupportCenterModal';
import { BookingModal } from './components/BookingModal';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [currentUser, setCurUser] = useState<User>(() => getCurrentUser());
  const [allUsers, setAllUsers] = useState<User[]>(() => getAllUsers());
  const [gps, setGps] = useState<GPSCoords | null>(null);
  const [eyeComfort, setEyeComfort] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeExploreTab, setActiveExploreTab] = useState('all');

  // Modals
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isVideoCareOpen, setIsVideoCareOpen] = useState(false);
  const [videoCareRoomId, setVideoCareRoomId] = useState<string>('support-main');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Booking modal
  const [bookingModalState, setBookingModalState] = useState<{
    isOpen: boolean;
    itemType: string;
    itemData: any;
  }>({
    isOpen: false,
    itemType: '',
    itemData: null,
  });

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'info' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Toggle Eye Comfort
  const handleToggleEyeComfort = () => {
    const nextVal = !eyeComfort;
    setEyeComfort(nextVal);
    document.body.classList.toggle('high-comfort', nextVal);
    showToast(nextVal ? 'Eye-comfort mode activated.' : 'Standard display mode restored.', 'info');
  };

  // Geolocation handling
  const handleToggleGPS = () => {
    if (gps) {
      setGps(null);
      showToast('GPS location turned off for this session.', 'info');
      return;
    }

    if (!navigator.geolocation) {
      showToast('GPS is not supported by your browser.', 'error');
      return;
    }

    showToast('Requesting browser location permission...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: GPSCoords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setGps(coords);
        showToast(`GPS enabled! Nearby listings sorted by distance (${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}).`, 'success');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        // Fallback default: Pune Swargate Central Hub
        const fallbackCoords: GPSCoords = {
          lat: 18.5020,
          lon: 73.8580,
          address: 'Pune Central (Simulated)',
        };
        setGps(fallbackCoords);
        showToast('Browser permission denied. Using central Pune hub (18.502, 73.858) for distance sorting.', 'info');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Navigate to sections smoothly
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // One-click actions from services
  const handleSelectService = (key: string) => {
    if (key === 'gps') {
      if (!gps) handleToggleGPS();
      setIsMapOpen(true);
      return;
    }
    if (key === 'doctors') {
      setActiveExploreTab('health');
      handleNavigate('explore');
      return;
    }
    if (key === 'medical') {
      setActiveExploreTab('health');
      handleNavigate('explore');
      return;
    }
    if (key === 'tourist') {
      setActiveExploreTab('travel');
      handleNavigate('explore');
      return;
    }
    if (key === 'delivery') {
      setActiveExploreTab('shopping');
      handleNavigate('explore');
      return;
    }
    if (key === 'rooms') {
      setActiveExploreTab('stays');
      handleNavigate('explore');
      return;
    }
    if (key === 'buses') {
      setActiveExploreTab('mobility');
      handleNavigate('explore');
      return;
    }
    if (key === 'clothing') {
      setActiveExploreTab('shopping');
      handleNavigate('explore');
      return;
    }
    setActiveExploreTab('all');
    handleNavigate('explore');
  };

  // Primary action on directory cards
  const handleItemPrimaryAction = (type: string, item: any) => {
    setBookingModalState({
      isOpen: true,
      itemType: type,
      itemData: item,
    });
  };

  // Secondary action on directory cards
  const handleItemSecondaryAction = (type: string, item: any) => {
    if (type === 'doctor') {
      if (item.video) {
        setVideoCareRoomId(`doctor-${item.id.toLowerCase()}`);
        setIsVideoCareOpen(true);
      } else {
        showToast(`${item.name} is available for in-clinic visits at ${item.address}.`, 'info');
      }
      return;
    }
    if (type === 'bus') {
      showToast(`Route: ${item.from} to ${item.to} • Departure: ${item.depart} • ${item.busType}`, 'info');
      return;
    }
    if (type === 'room') {
      showToast(`${item.name} features: ${item.amenities.join(', ')} • 24x7 desk verified.`, 'info');
      return;
    }
    // Store items / tourist / clothing
    setBookingModalState({
      isOpen: true,
      itemType: type,
      itemData: item,
    });
  };

  // Launch video care
  const handleOpenVideoCare = (roomId?: string) => {
    if (roomId) setVideoCareRoomId(roomId);
    setIsVideoCareOpen(true);
  };

  // Switch persona user
  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    setCurUser(user);
    showToast(`Switched active persona to ${user.name} (${user.role.toUpperCase()}).`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f2ed] text-[#192230] selection:bg-[#bf3d2e]/20 selection:text-[#bf3d2e]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-sm font-semibold max-w-md ${
              toast.type === 'error'
                ? 'bg-[#fae9e6] text-[#a3332b] border-[#e8b5af]'
                : toast.type === 'success'
                ? 'bg-[#e3f1e8] text-[#216e4d] border-[#b0d8c0]'
                : 'bg-[#192230] text-white border-[#2f3d4f]'
            }`}
          >
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 shrink-0 text-[#38bdf8]" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
        allUsers={allUsers}
        gps={gps}
        onToggleGPS={handleToggleGPS}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        eyeComfort={eyeComfort}
        onToggleEyeComfort={handleToggleEyeComfort}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          metrics={initialProjectData.metrics}
          onExploreServices={() => handleNavigate('services')}
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenVideoCare={() => handleOpenVideoCare('support-corridor-4')}
          onOpenMap={() => setIsMapOpen(true)}
        />

        {/* 8 Core Services Overview */}
        <ServicesOverview
          services={initialServices}
          onSelectService={handleSelectService}
        />

        {/* Discover & Directory Explorer with live distance calculation & tabs */}
        <DirectoryExplorer
          doctors={initialDoctors}
          stores={initialStores}
          touristShops={initialTouristShops}
          clothing={initialClothing}
          rooms={initialRooms}
          buses={initialBuses}
          activeTab={activeExploreTab}
          onTabChange={setActiveExploreTab}
          gps={gps}
          onOpenMap={() => setIsMapOpen(true)}
          onItemPrimaryAction={handleItemPrimaryAction}
          onItemSecondaryAction={handleItemSecondaryAction}
          onOpenVideoCare={handleOpenVideoCare}
        />

        {/* Project Control Room & Roadmap */}
        <ProjectControlRoom projectData={initialProjectData} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenVideoCare={() => handleOpenVideoCare('support-corridor-4')}
        onOpenMap={() => setIsMapOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Modals */}
      <InteractiveMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        gps={gps}
        doctors={initialDoctors}
        stores={initialStores}
        touristShops={initialTouristShops}
        rooms={initialRooms}
        clothing={initialClothing}
        onRequestGPS={handleToggleGPS}
        onSelectItem={handleItemPrimaryAction}
      />

      <VideoCareModal
        isOpen={isVideoCareOpen}
        onClose={() => setIsVideoCareOpen(false)}
        currentUser={currentUser}
        initialRoomId={videoCareRoomId}
      />

      <SupportCenterModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        currentUser={currentUser}
        onLaunchVideoCare={handleOpenVideoCare}
      />

      <BookingModal
        isOpen={bookingModalState.isOpen}
        onClose={() => setBookingModalState({ isOpen: false, itemType: '', itemData: null })}
        currentUser={currentUser}
        itemType={bookingModalState.itemType}
        itemData={bookingModalState.itemData}
        onSuccess={(order: OrderItem) => {
          showToast(`Request confirmed! Order #${order.id} saved in your profile.`, 'success');
        }}
        onOpenVideoCare={handleOpenVideoCare}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(u) => {
          setCurUser(u);
          setAllUsers(getAllUsers());
        }}
        onOpenAuth={() => {
          setIsProfileOpen(false);
          setIsAuthOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => {
          setCurUser(u);
          setAllUsers(getAllUsers());
          showToast(`Welcome, ${u.name}! Signed in as ${u.role}.`, 'success');
        }}
      />
    </div>
  );
}
