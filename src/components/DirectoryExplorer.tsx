import React, { useState, useMemo } from 'react';
import { Doctor, MedicalStore, TouristShop, ClothingItem, Room, BusRoute, GPSCoords } from '../types';
import { distanceBetweenKm, formatINR } from '../services/store';
import { Search, Star, MapPin, Video, Navigation, ShieldCheck, Filter, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

interface DirectoryExplorerProps {
  doctors: Doctor[];
  stores: MedicalStore[];
  touristShops: TouristShop[];
  clothing: ClothingItem[];
  rooms: Room[];
  buses: BusRoute[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  gps: GPSCoords | null;
  onOpenMap: () => void;
  onItemPrimaryAction: (type: string, item: any) => void;
  onItemSecondaryAction: (type: string, item: any) => void;
  onOpenVideoCare: (roomId?: string) => void;
}

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = ({
  doctors,
  stores,
  touristShops,
  clothing,
  rooms,
  buses,
  activeTab,
  onTabChange,
  gps,
  onOpenMap,
  onItemPrimaryAction,
  onItemSecondaryAction,
  onOpenVideoCare,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('All');

  const localities = ['All', 'Kothrud', 'Baner', 'Shivaji Nagar', 'Viman Nagar', 'FC Road / Deccan', 'Camp'];

  // Flatten and normalize items
  const allItems = useMemo(() => {
    const list: Array<{ type: 'doctor' | 'medical-store' | 'tourist-shop' | 'clothing' | 'room' | 'bus'; data: any; distance: number | null }> = [];

    doctors.forEach((d) => {
      const dist = gps && d.lat && d.lon ? distanceBetweenKm(gps.lat, gps.lon, d.lat, d.lon) : null;
      list.push({ type: 'doctor', data: d, distance: dist });
    });

    stores.forEach((s) => {
      const dist = gps ? distanceBetweenKm(gps.lat, gps.lon, s.lat, s.lon) : null;
      list.push({ type: 'medical-store', data: s, distance: dist });
    });

    touristShops.forEach((t) => {
      const dist = gps ? distanceBetweenKm(gps.lat, gps.lon, t.lat, t.lon) : null;
      list.push({ type: 'tourist-shop', data: t, distance: dist });
    });

    clothing.forEach((c) => {
      const dist = gps && c.lat && c.lon ? distanceBetweenKm(gps.lat, gps.lon, c.lat, c.lon) : null;
      list.push({ type: 'clothing', data: c, distance: dist });
    });

    rooms.forEach((r) => {
      const dist = gps ? distanceBetweenKm(gps.lat, gps.lon, r.lat, r.lon) : null;
      list.push({ type: 'room', data: r, distance: dist });
    });

    buses.forEach((b) => {
      list.push({ type: 'bus', data: b, distance: null });
    });

    return list;
  }, [doctors, stores, touristShops, clothing, rooms, buses, gps]);

  // Filter based on tab, search query, and locality
  const filteredItems = useMemo(() => {
    let result = allItems;

    // Tab filter
    if (activeTab === 'health') {
      result = result.filter((i) => i.type === 'doctor' || i.type === 'medical-store');
    } else if (activeTab === 'travel') {
      result = result.filter((i) => i.type === 'tourist-shop' || i.type === 'bus');
    } else if (activeTab === 'stays') {
      result = result.filter((i) => i.type === 'room');
    } else if (activeTab === 'shopping') {
      result = result.filter((i) => i.type === 'clothing' || i.type === 'medical-store' || i.type === 'tourist-shop');
    } else if (activeTab === 'mobility') {
      result = result.filter((i) => i.type === 'bus');
    }

    // Locality filter
    if (selectedLocality !== 'All') {
      const locKey = selectedLocality.toLowerCase().replace(/\s|\//g, '');
      result = result.filter((i) => {
        const addr = (i.data.address || i.data.from || i.data.city || '').toLowerCase().replace(/\s|\//g, '');
        return addr.includes(locKey);
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((i) => {
        const str = JSON.stringify(i.data).toLowerCase();
        return str.includes(query);
      });
    }

    // Sort by GPS distance if GPS active
    if (gps) {
      result = [...result].sort((a, b) => {
        if (a.distance != null && b.distance != null) return a.distance - b.distance;
        if (a.distance != null) return -1;
        if (b.distance != null) return 1;
        return 0;
      });
    }

    return result;
  }, [allItems, activeTab, selectedLocality, searchQuery, gps]);

  return (
    <section id="explore" className="py-12 md:py-16 border-t border-[#ddd9d0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#bf3d2e] mb-2 font-heading">
              DISCOVER & BOOK INSTANTLY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#192230] tracking-tight font-heading">
              Nearby Services, Bookings & Certified Partners
            </h2>
            <p className="text-[#5d6672] text-sm mt-1 max-w-xl">
              Filter by healthcare, comfortable stays, essential shopping or mobility. Every listing includes verified contact details and direct booking.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5d6672]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wheelchair, doctor, room, bus, gear..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] text-sm text-[#192230] placeholder-[#5d6672]/70 focus:outline-none focus:ring-2 focus:ring-[#1f5e68] focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5d6672] hover:text-[#192230]"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={onOpenMap}
              className="p-3 rounded-2xl bg-[#fbfaf7] hover:bg-[#edeae2] border border-[#ddd9d0] text-[#1f5e68] transition-colors"
              title="Open full interactive map"
            >
              <Navigation className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'health', label: '🩺 Doctors & Medical' },
              { id: 'stays', label: '🛏️ Rooms & Stays' },
              { id: 'travel', label: '🧳 Tourist Essentials & Buses' },
              { id: 'shopping', label: '👕 Clothing & Gear' },
              { id: 'mobility', label: '🚌 Bus Routes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1f5e68] text-white shadow-md shadow-[#1f5e68]/20'
                    : 'bg-[#fbfaf7] text-[#5d6672] border border-[#ddd9d0] hover:bg-[#edeae2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Locality pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold text-[#5d6672]">
            <span className="text-[11px] text-[#5d6672]/70">Area:</span>
            {localities.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocality(loc)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLocality === loc
                    ? 'bg-[#192230] text-white'
                    : 'bg-[#fbfaf7] border border-[#ddd9d0] hover:bg-[#edeae2]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* GPS Distance Notification banner */}
        {gps && (
          <div className="mb-6 p-3 rounded-2xl bg-[#1f5e68]/10 border border-[#1f5e68]/20 flex items-center justify-between text-xs text-[#1f5e68]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                <strong>GPS Sorting Active:</strong> Listings are sorted from your browser position ({gps.lat.toFixed(4)}, {gps.lon.toFixed(4)})
              </span>
            </div>
            <button
              onClick={onOpenMap}
              className="font-bold underline hover:text-[#17464d]"
            >
              View on Map →
            </button>
          </div>
        )}

        {/* Results Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#fbfaf7] border border-[#ddd9d0]">
            <ShoppingBag className="w-12 h-12 text-[#5d6672]/50 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#192230]">No matching listings found</h3>
            <p className="text-sm text-[#5d6672] mt-1 max-w-md mx-auto">
              Try searching for &quot;doctor&quot;, &quot;wheelchair&quot;, &quot;room&quot;, &quot;bus&quot; or clear your area filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocality('All');
                onTabChange('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#bf3d2e] text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(({ type, data, distance }) => {
              // Doctor card
              if (type === 'doctor') {
                const doc = data as Doctor;
                return (
                  <article
                    key={doc.id}
                    className="comfort-card p-6 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#1f5e68]/50 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#1f5e68]/10 text-[#1f5e68]">
                          Medical Care
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#a66a15]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{doc.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#192230] font-heading">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#1f5e68] mb-2">
                        {doc.specialty}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-[#5d6672] mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#bf3d2e] shrink-0" />
                        <span className="line-clamp-1">{doc.address}</span>
                        {distance != null && (
                          <span className="font-bold text-[#1f5e68] ml-auto shrink-0">
                            {distance} km away
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="px-2.5 py-1 rounded-lg bg-[#edeae2] text-[11px] font-medium text-[#5d6672]">
                          {doc.availability}
                        </span>
                        {doc.video && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#267a55]/10 text-[#267a55] text-[11px] font-bold flex items-center gap-1">
                            <Video className="w-3 h-3" /> Video Care Ready
                          </span>
                        )}
                        {doc.consultationFee && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#edeae2] text-[11px] font-semibold text-[#192230]">
                            Fee: {formatINR(doc.consultationFee)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ddd9d0]/60 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onItemPrimaryAction('doctor', doc)}
                        className="py-2.5 px-3 rounded-xl bg-[#1f5e68] hover:bg-[#17464d] text-white text-xs font-bold text-center transition-colors"
                      >
                        Book Visit
                      </button>
                      <button
                        onClick={() => {
                          if (doc.video) onOpenVideoCare(`doctor-${doc.id.toLowerCase()}`);
                          else onItemSecondaryAction('doctor', doc);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-[#edeae2] hover:bg-[#ddd9d0] text-[#192230] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5 text-[#1f5e68]" />
                        <span>Video Care</span>
                      </button>
                    </div>
                  </article>
                );
              }

              // Medical Store card
              if (type === 'medical-store') {
                const store = data as MedicalStore;
                return (
                  <article
                    key={store.id}
                    className="comfort-card p-6 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#bf3d2e]/50 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#267a55]/10 text-[#267a55]">
                          {store.category}
                        </span>
                        {store.rating && (
                          <div className="flex items-center gap-1 text-xs font-bold text-[#a66a15]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{store.rating}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-[#192230] font-heading">
                        {store.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#5d6672] mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#bf3d2e] shrink-0" />
                        <span className="line-clamp-1">{store.address}</span>
                        {distance != null && (
                          <span className="font-bold text-[#1f5e68] ml-auto shrink-0">
                            {distance} km away
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-[#5d6672] mb-1.5">
                        Stocked Essentials:
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {store.stock.slice(0, 4).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#edeae2] text-[11px] font-medium text-[#192230]"
                          >
                            {item}
                          </span>
                        ))}
                        {store.stock.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-[#edeae2] text-[11px] text-[#5d6672]">
                            +{store.stock.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ddd9d0]/60 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onItemPrimaryAction('medical-store', store)}
                        className="py-2.5 px-3 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white text-xs font-bold transition-colors"
                      >
                        Request Item
                      </button>
                      <button
                        onClick={() => onItemSecondaryAction('medical-store', store)}
                        className="py-2.5 px-3 rounded-xl bg-[#edeae2] hover:bg-[#ddd9d0] text-[#192230] text-xs font-bold transition-colors"
                      >
                        Doorstep Delivery
                      </button>
                    </div>
                  </article>
                );
              }

              // Tourist Shop card
              if (type === 'tourist-shop') {
                const shop = data as TouristShop;
                return (
                  <article
                    key={shop.id}
                    className="comfort-card p-6 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#1f5e68]/50 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#1f5e68]/10 text-[#1f5e68]">
                          Tourist Essentials
                        </span>
                        {shop.rating && (
                          <div className="flex items-center gap-1 text-xs font-bold text-[#a66a15]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{shop.rating}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-[#192230] font-heading">
                        {shop.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#5d6672] mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#bf3d2e] shrink-0" />
                        <span className="line-clamp-1">{shop.address}</span>
                        {distance != null && (
                          <span className="font-bold text-[#1f5e68] ml-auto shrink-0">
                            {distance} km away
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-[#5d6672] mb-1.5">
                        In Stock:
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {shop.stock.slice(0, 4).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#edeae2] text-[11px] font-medium text-[#192230]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ddd9d0]/60 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onItemPrimaryAction('tourist-shop', shop)}
                        className="py-2.5 px-3 rounded-xl bg-[#192230] hover:bg-black text-white text-xs font-bold transition-colors"
                      >
                        Order Gear
                      </button>
                      <button
                        onClick={() => onItemSecondaryAction('tourist-shop', shop)}
                        className="py-2.5 px-3 rounded-xl bg-[#edeae2] hover:bg-[#ddd9d0] text-[#192230] text-xs font-bold transition-colors"
                      >
                        Express Pickup
                      </button>
                    </div>
                  </article>
                );
              }

              // Clothing card
              if (type === 'clothing') {
                const item = data as ClothingItem;
                return (
                  <article
                    key={item.id}
                    className="comfort-card p-6 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#bf3d2e]/50 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#bf3d2e]/10 text-[#bf3d2e]">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-[#192230] bg-[#edeae2] px-2 py-0.5 rounded-md">
                          From {item.price}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#192230] font-heading">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#5d6672] mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#bf3d2e] shrink-0" />
                        <span className="line-clamp-1">{item.address}</span>
                        {distance != null && (
                          <span className="font-bold text-[#1f5e68] ml-auto shrink-0">
                            {distance} km away
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.stock.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#edeae2] text-[11px] font-medium text-[#192230]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ddd9d0]/60 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onItemPrimaryAction('clothing', item)}
                        className="py-2.5 px-3 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white text-xs font-bold transition-colors"
                      >
                        Shop Now
                      </button>
                      <button
                        onClick={() => onItemSecondaryAction('clothing', item)}
                        className="py-2.5 px-3 rounded-xl bg-[#edeae2] hover:bg-[#ddd9d0] text-[#192230] text-xs font-bold transition-colors"
                      >
                        Pickup Today
                      </button>
                    </div>
                  </article>
                );
              }

              // Room card
              if (type === 'room') {
                const room = data as Room;
                return (
                  <article
                    key={room.id}
                    className="comfort-card rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] overflow-hidden hover:border-[#1f5e68]/50 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {room.image && (
                        <div className="relative h-44 w-full overflow-hidden bg-[#edeae2]">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                            {room.type}
                          </div>
                          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#192230] text-white font-extrabold text-sm shadow-md">
                            {formatINR(room.price)}
                            <span className="text-[10px] font-normal text-white/70">/night</span>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-xl font-bold text-[#192230] font-heading">
                            {room.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-[#a66a15] shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{room.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-[#5d6672] mb-3">
                          <MapPin className="w-3.5 h-3.5 text-[#bf3d2e] shrink-0" />
                          <span className="line-clamp-1">{room.address}</span>
                          {distance != null && (
                            <span className="font-bold text-[#1f5e68] ml-auto shrink-0">
                              {distance} km away
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {room.amenities.slice(0, 3).map((a, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-[#edeae2] text-[11px] font-medium text-[#5d6672]"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-[#ddd9d0]/60 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onItemPrimaryAction('room', room)}
                          className="py-2.5 px-3 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white text-xs font-bold transition-colors"
                        >
                          Reserve Room
                        </button>
                        <button
                          onClick={() => onItemSecondaryAction('room', room)}
                          className="py-2.5 px-3 rounded-xl bg-[#edeae2] hover:bg-[#ddd9d0] text-[#192230] text-xs font-bold transition-colors"
                        >
                          View Amenities
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }

              // Bus card
              if (type === 'bus') {
                const bus = data as BusRoute;
                return (
                  <article
                    key={bus.id}
                    className="comfort-card p-6 rounded-2xl bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#1f5e68]/50 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#1f5e68]/10 text-[#1f5e68]">
                          Intercity Mobility
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#267a55]/15 text-[#267a55]">
                          {bus.seats} seats available
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#192230] font-heading">
                        {bus.operator}
                      </h3>

                      <div className="my-3 p-3 rounded-xl bg-[#edeae2] flex items-center justify-between text-xs">
                        <div>
                          <div className="font-extrabold text-[#192230]">{bus.depart}</div>
                          <div className="text-[11px] text-[#5d6672]">{bus.from}</div>
                        </div>
                        <div className="text-center px-2">
                          <ArrowRight className="w-4 h-4 text-[#bf3d2e] mx-auto" />
                          <span className="text-[10px] text-[#5d6672] font-semibold">Direct</span>
                        </div>
                        <div className="text-right">
                          <div className="font-extrabold text-[#192230]">{bus.arrive}</div>
                          <div className="text-[11px] text-[#5d6672]">{bus.to}</div>
                        </div>
                      </div>

                      <div className="text-xs text-[#5d6672] mb-3">
                        {bus.busType}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-[#5d6672]">Fare per seat:</span>
                        <span className="text-lg font-extrabold text-[#192230]">
                          {formatINR(bus.fare)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ddd9d0]/60 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onItemPrimaryAction('bus', bus)}
                        className="py-2.5 px-3 rounded-xl bg-[#1f5e68] hover:bg-[#17464d] text-white text-xs font-bold transition-colors"
                      >
                        Book Seat
                      </button>
                      <button
                        onClick={() => onItemSecondaryAction('bus', bus)}
                        className="py-2.5 px-3 rounded-xl bg-[#edeae2] hover:bg-[#ddd9d0] text-[#192230] text-xs font-bold transition-colors"
                      >
                        Boarding Details
                      </button>
                    </div>
                  </article>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    </section>
  );
};
