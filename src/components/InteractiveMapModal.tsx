import React, { useEffect, useRef } from 'react';
import { Doctor, MedicalStore, TouristShop, Room, ClothingItem, GPSCoords } from '../types';
import { X, MapPin, Navigation, Compass, Star } from 'lucide-react';
import L from 'leaflet';

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  gps: GPSCoords | null;
  doctors: Doctor[];
  stores: MedicalStore[];
  touristShops: TouristShop[];
  rooms: Room[];
  clothing: ClothingItem[];
  onRequestGPS: () => void;
  onSelectItem: (type: string, item: any) => void;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({
  isOpen,
  onClose,
  gps,
  doctors,
  stores,
  touristShops,
  rooms,
  clothing,
  onRequestGPS,
  onSelectItem,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    // Small delay to ensure modal DOM is mounted
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const initialCenter: [number, number] = gps
        ? [gps.lat, gps.lon]
        : [18.5204, 73.8567]; // Pune Central

      const map = L.map(mapContainerRef.current).setView(initialCenter, gps ? 13 : 12);
      mapInstanceRef.current = map;

      // Clean OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Custom icon helper
      const createIcon = (bg: string, label: string) => {
        return L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background: ${bg};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          ">${label}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -16]
        });
      };

      // Add User GPS marker if active
      if (gps) {
        const userIcon = L.divIcon({
          className: 'custom-user-icon',
          html: `<div style="
            background: #1f5e68;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 6px rgba(31,94,104,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
          ">📍</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18]
        });

        L.marker([gps.lat, gps.lon], { icon: userIcon })
          .addTo(map)
          .bindPopup('<strong>Your Location</strong><br>Browser GPS active', { className: 'custom-map-popup' })
          .openPopup();

        L.circle([gps.lat, gps.lon], {
          radius: 2000,
          color: '#1f5e68',
          fillColor: '#1f5e68',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '4, 4'
        }).addTo(map);
      }

      // Add Doctors
      doctors.forEach((d) => {
        if (d.lat && d.lon) {
          const marker = L.marker([d.lat, d.lon], { icon: createIcon('#1f5e68', '🩺') }).addTo(map);
          marker.bindPopup(`
            <div style="min-width: 170px;">
              <strong style="color: #192230; font-size: 14px;">${d.name}</strong>
              <div style="color: #1f5e68; font-size: 12px; font-weight: bold;">${d.specialty}</div>
              <div style="font-size: 11px; color: #5d6672; margin: 4px 0;">${d.address}</div>
              <div style="font-size: 11px; color: #a66a15;">⭐ ${d.rating} rating</div>
              <div style="margin-top: 6px;">
                <span style="font-size: 11px; background: #edeae2; padding: 2px 6px; border-radius: 6px;">${d.availability}</span>
              </div>
            </div>
          `, { className: 'custom-map-popup' });
        }
      });

      // Add Stores
      stores.forEach((s) => {
        if (s.lat && s.lon) {
          const marker = L.marker([s.lat, s.lon], { icon: createIcon('#267a55', '💊') }).addTo(map);
          marker.bindPopup(`
            <div style="min-width: 170px;">
              <strong style="color: #192230; font-size: 14px;">${s.name}</strong>
              <div style="color: #267a55; font-size: 12px; font-weight: bold;">${s.category}</div>
              <div style="font-size: 11px; color: #5d6672; margin: 4px 0;">${s.address}</div>
              <div style="font-size: 11px; color: #5d6672;">Stock: ${s.stock.slice(0, 2).join(', ')}</div>
            </div>
          `, { className: 'custom-map-popup' });
        }
      });

      // Add Tourist Shops
      touristShops.forEach((t) => {
        if (t.lat && t.lon) {
          const marker = L.marker([t.lat, t.lon], { icon: createIcon('#bf3d2e', '🧳') }).addTo(map);
          marker.bindPopup(`
            <div style="min-width: 170px;">
              <strong style="color: #192230; font-size: 14px;">${t.name}</strong>
              <div style="color: #bf3d2e; font-size: 12px; font-weight: bold;">Tourist Essentials</div>
              <div style="font-size: 11px; color: #5d6672; margin: 4px 0;">${t.address}</div>
              <div style="font-size: 11px; color: #5d6672;">Stock: ${t.stock.slice(0, 2).join(', ')}</div>
            </div>
          `, { className: 'custom-map-popup' });
        }
      });

      // Add Rooms
      rooms.forEach((r) => {
        if (r.lat && r.lon) {
          const marker = L.marker([r.lat, r.lon], { icon: createIcon('#e36a4d', '🛏️') }).addTo(map);
          marker.bindPopup(`
            <div style="min-width: 170px;">
              <strong style="color: #192230; font-size: 14px;">${r.name}</strong>
              <div style="color: #bf3d2e; font-size: 12px; font-weight: bold;">${r.type} • ₹${r.price}/night</div>
              <div style="font-size: 11px; color: #5d6672; margin: 4px 0;">${r.address}</div>
              <div style="font-size: 11px; color: #a66a15;">⭐ ${r.rating}</div>
            </div>
          `, { className: 'custom-map-popup' });
        }
      });

      // Add Clothing
      clothing.forEach((c) => {
        if (c.lat && c.lon) {
          const marker = L.marker([c.lat, c.lon], { icon: createIcon('#192230', '👕') }).addTo(map);
          marker.bindPopup(`
            <div style="min-width: 170px;">
              <strong style="color: #192230; font-size: 14px;">${c.name}</strong>
              <div style="color: #192230; font-size: 12px; font-weight: bold;">${c.category} • ${c.price}</div>
              <div style="font-size: 11px; color: #5d6672; margin: 4px 0;">${c.address}</div>
            </div>
          `, { className: 'custom-map-popup' });
        }
      });

    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, gps, doctors, stores, touristShops, rooms, clothing]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#fbfaf7] border border-[#ddd9d0] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ddd9d0] flex items-center justify-between bg-[#f4f2ed]">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#bf3d2e] font-heading">
              GPS DIRECTORY NETWORK
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#192230] font-heading flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#1f5e68]" />
              SafeStay Pune Corridor Map
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRequestGPS}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                gps
                  ? 'bg-[#1f5e68] text-white border-[#1f5e68]'
                  : 'bg-[#fbfaf7] text-[#1f5e68] border-[#1f5e68] hover:bg-[#1f5e68]/10'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{gps ? 'Recenter My GPS' : 'Enable My GPS'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#5d6672] hover:bg-[#edeae2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend bar */}
        <div className="px-5 py-2.5 bg-[#edeae2]/60 border-b border-[#ddd9d0] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#192230]">
          <span className="text-[#5d6672]">Map Markers:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#1f5e68]"></span> Doctors & Telecare
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#267a55]"></span> 24x7 Medical Stores
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#bf3d2e]"></span> Tourist Essentials
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#e36a4d]"></span> Verified Stays
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#192230]"></span> Travel Clothing
          </span>
          {gps && (
            <span className="flex items-center gap-1.5 ml-auto text-[#1f5e68] font-bold">
              📍 Current Location: {gps.lat.toFixed(4)}, {gps.lon.toFixed(4)}
            </span>
          )}
        </div>

        {/* Leaflet Map container */}
        <div className="flex-1 relative w-full h-full">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Footer info */}
        <div className="p-3.5 px-6 border-t border-[#ddd9d0] bg-[#f4f2ed] flex items-center justify-between text-xs text-[#5d6672]">
          <span>Pins show verified Pune partner listings. Click any pin to view details and address.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#192230] text-white font-bold text-xs hover:bg-black transition-colors"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};
