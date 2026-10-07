import React, { useState } from 'react';
import { User, OrderItem } from '../types';
import { formatINR, addOrder } from '../services/store';
import { X, CheckCircle, Calendar, Clock, MapPin, ShieldCheck, Bus, Bed, HeartPulse, ShoppingBag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  itemType: string;
  itemData: any;
  onSuccess: (order: OrderItem) => void;
  onOpenVideoCare?: (roomId?: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  itemType,
  itemData,
  onSuccess,
  onOpenVideoCare,
}) => {
  // Form fields
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('04:00 PM - 05:00 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(7);
  const [selectedItemStock, setSelectedItemStock] = useState<string>(() => {
    return (itemData?.stock && itemData.stock[0]) || '';
  });
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.city + ', Pune (SafeStay Reception)');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [isEmergency, setIsEmergency] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !itemData) return null;

  const title = itemData.name || itemData.operator;
  const address = itemData.address || `${itemData.from} → ${itemData.to}`;
  const price = itemData.price || itemData.fare || itemData.consultationFee || 450;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let actionLabel = 'Booking Confirmed';
    let detailedNotes = notes;

    if (itemType === 'room') {
      actionLabel = 'Reserve Stay';
      detailedNotes = `Check-in: ${date} • Guests: ${guestCount} • ${notes}`;
    } else if (itemType === 'bus') {
      actionLabel = 'Bus Ticket Confirmed';
      detailedNotes = `Seat #${selectedSeat || 1} • Depart: ${itemData.depart} • ${notes}`;
    } else if (itemType === 'doctor') {
      actionLabel = 'Doctor Appointment';
      detailedNotes = `Date: ${date} • Slot: ${timeSlot} • ${notes}`;
    } else {
      actionLabel = deliveryType === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup';
      detailedNotes = `Item: ${selectedItemStock || 'Essentials'} • Address: ${deliveryAddress} • ${isEmergency ? 'Urgent 45-min' : 'Standard'} • ${notes}`;
    }

    const order = addOrder({
      userId: currentUser.id,
      itemId: itemData.id,
      itemType: itemType as any,
      itemTitle: `${title} (${actionLabel})`,
      action: actionLabel,
      notes: detailedNotes,
      status: 'confirmed',
      cost: price
    });

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti not supported
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(order);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#fbfaf7] border border-[#ddd9d0] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#ddd9d0] bg-[#f4f2ed] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#bf3d2e] font-heading">
              VERIFIED INSTANT CHECKOUT
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#192230] font-heading">
              {itemType === 'room' && 'Reserve Your Stay'}
              {itemType === 'bus' && 'Book Bus Seat'}
              {itemType === 'doctor' && 'Doctor Consultation'}
              {(itemType === 'medical-store' || itemType === 'tourist-shop' || itemType === 'clothing') && 'Request Store Item'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5d6672] hover:bg-[#edeae2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <form onSubmit={handleConfirm} className="p-6 flex-1 overflow-y-auto space-y-5">
          {/* Item summary card */}
          <div className="p-4 rounded-2xl bg-[#edeae2] border border-[#ddd9d0] flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase text-[#1f5e68]">
                {itemType.replace('-', ' ')}
              </div>
              <h3 className="text-base font-bold text-[#192230] font-heading">
                {title}
              </h3>
              <div className="text-xs text-[#5d6672] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#bf3d2e] shrink-0" />
                <span>{address}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-base font-extrabold text-[#192230]">
                {formatINR(price)}
              </div>
              <div className="text-[10px] text-[#5d6672]">
                {itemType === 'room' ? '/night' : 'Estimated'}
              </div>
            </div>
          </div>

          {/* Room Specific Fields */}
          {itemType === 'room' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#192230] mb-1">
                  Guests Count
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests (Family)</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>
          )}

          {/* Bus Specific Fields with visual seat selection */}
          {itemType === 'bus' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#192230]">
                Select Seat Number (Executive Layout)
              </label>
              <div className="p-3 rounded-2xl bg-[#f4f2ed] border border-[#ddd9d0]">
                <div className="text-[10px] text-[#5d6672] mb-2 text-center uppercase tracking-wider font-bold">
                  Front / Driver Cabin
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((seatNum) => {
                    const isSelected = selectedSeat === seatNum;
                    const isOccupied = seatNum === 2 || seatNum === 5 || seatNum === 12;
                    return (
                      <button
                        type="button"
                        key={seatNum}
                        disabled={isOccupied}
                        onClick={() => setSelectedSeat(seatNum)}
                        className={`h-9 rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#1f5e68] text-white shadow-md'
                            : isOccupied
                            ? 'bg-[#ddd9d0] text-[#5d6672] cursor-not-allowed opacity-50'
                            : 'bg-[#fbfaf7] border border-[#ddd9d0] hover:border-[#1f5e68] text-[#192230]'
                        }`}
                      >
                        {seatNum}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-[#5d6672]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#1f5e68]"></span> Selected (#{selectedSeat})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#fbfaf7] border border-[#ddd9d0]"></span> Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#ddd9d0]"></span> Occupied
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Doctor Specific Fields */}
          {itemType === 'doctor' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  >
                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                    <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
                  </select>
                </div>
              </div>

              {itemData.video && (
                <div className="p-3 rounded-xl bg-[#1f5e68]/10 border border-[#1f5e68]/20 flex items-center justify-between text-xs text-[#1f5e68]">
                  <span>Supports Instant Telecare consultation.</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenVideoCare) onOpenVideoCare(`doctor-${itemData.id.toLowerCase()}`);
                    }}
                    className="font-bold underline hover:text-[#17464d]"
                  >
                    Launch Video Room Now →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Store / Essentials items selection */}
          {(itemType === 'medical-store' || itemType === 'tourist-shop' || itemType === 'clothing') && (
            <div className="space-y-3">
              {itemData.stock && itemData.stock.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Select Item From Available Stock
                  </label>
                  <select
                    value={selectedItemStock}
                    onChange={(e) => setSelectedItemStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                  >
                    {itemData.stock.map((s: string, idx: number) => (
                      <option key={idx} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    deliveryType === 'delivery'
                      ? 'bg-[#1f5e68] text-white border-[#1f5e68]'
                      : 'bg-[#f4f2ed] border-[#ddd9d0] text-[#5d6672]'
                  }`}
                >
                  Doorstep Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    deliveryType === 'pickup'
                      ? 'bg-[#1f5e68] text-white border-[#1f5e68]'
                      : 'bg-[#f4f2ed] border-[#ddd9d0] text-[#5d6672]'
                  }`}
                >
                  Direct Store Pickup
                </button>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold text-[#192230] mb-1">
                    Drop-off Address / Stay Name
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your hotel room / address in Pune..."
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-sm text-[#192230]"
                    required
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="emergency"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="rounded text-[#bf3d2e] focus:ring-[#bf3d2e]"
                    />
                    <label htmlFor="emergency" className="text-xs text-[#5d6672] font-semibold cursor-pointer">
                      Urgent priority dispatch (Medical / immediate essential)
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#192230] mb-1">
              Special Requests or Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="E.g. ground floor preference, call upon arrival, require receipt for corporate reimbursement..."
              className="w-full px-3 py-2 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] text-xs text-[#192230] resize-none"
            />
          </div>

          {/* User badge */}
          <div className="p-3 rounded-xl bg-[#f4f2ed] border border-[#ddd9d0] flex items-center justify-between text-xs text-[#5d6672]">
            <span>Booker: <strong className="text-[#192230]">{currentUser.name}</strong></span>
            <span className="font-mono text-[11px] text-[#1f5e68]">ID: {currentUser.id}</span>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#ddd9d0] text-xs font-bold text-[#5d6672] hover:bg-[#edeae2]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#bf3d2e] hover:bg-[#a53225] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#bf3d2e]/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming...' : 'Confirm in One Click'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
