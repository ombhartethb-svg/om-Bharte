import { User, OrderItem, SupportTicket, GPSCoords } from '../types';
import { initialUsers } from '../data/initialData';

const STORAGE_KEYS = {
  USER: 'safestay_current_user',
  USERS_LIST: 'safestay_users_list',
  ORDERS: 'safestay_orders',
  TICKETS: 'safestay_tickets',
  GPS: 'safestay_gps',
  EYE_COMFORT: 'safestay_eye_comfort',
};

// Safe load from localStorage
function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('LocalStorage write error:', err);
  }
}

export function getCurrentUser(): User {
  const users = getStorage<User[]>(STORAGE_KEYS.USERS_LIST, initialUsers);
  const savedUser = getStorage<User | null>(STORAGE_KEYS.USER, null);
  if (savedUser) {
    const found = users.find(u => u.id === savedUser.id);
    return found || savedUser;
  }
  return users[0]; // Default to Demo Customer
}

export function setCurrentUser(user: User | null): void {
  setStorage(STORAGE_KEYS.USER, user);
}

export function getAllUsers(): User[] {
  return getStorage<User[]>(STORAGE_KEYS.USERS_LIST, initialUsers);
}

export function saveUser(updatedUser: User): void {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === updatedUser.id);
  if (idx >= 0) {
    users[idx] = updatedUser;
  } else {
    users.push(updatedUser);
  }
  setStorage(STORAGE_KEYS.USERS_LIST, users);
  setCurrentUser(updatedUser);
}

export function getOrders(userId?: string): OrderItem[] {
  const allOrders = getStorage<OrderItem[]>(STORAGE_KEYS.ORDERS, [
    {
      id: 'ORD-DEMO-01',
      userId: 'SS-CU-1001',
      itemId: 'ROOM-501',
      itemType: 'room',
      itemTitle: 'CityNest Rooms & Suites (Deluxe Family Room)',
      action: 'Reserve Room',
      notes: 'Check-in 2:00 PM • Verified safe stay with lift & Wi-Fi',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      cost: 1299
    },
    {
      id: 'ORD-DEMO-02',
      userId: 'SS-CU-1001',
      itemId: 'MED-201',
      itemType: 'medical-store',
      itemTitle: 'Wheelchair & First-Aid Kit (CarePlus Medicals)',
      action: 'Rapid Delivery',
      notes: 'Delivered to Shivaji Nagar reception',
      status: 'completed',
      createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
      cost: 450
    }
  ]);
  if (!userId) return allOrders;
  return allOrders.filter(o => o.userId === userId);
}

export function addOrder(order: Omit<OrderItem, 'id' | 'createdAt'>): OrderItem {
  const all = getOrders();
  const newOrder: OrderItem = {
    ...order,
    id: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    createdAt: new Date().toISOString()
  };
  all.unshift(newOrder);
  setStorage(STORAGE_KEYS.ORDERS, all);
  return newOrder;
}

export function getTickets(userId?: string): SupportTicket[] {
  const allTickets = getStorage<SupportTicket[]>(STORAGE_KEYS.TICKETS, [
    {
      id: 'TKT-901',
      userId: 'SS-CU-1001',
      userName: 'Demo Customer',
      subject: 'Wheelchair ramp accessibility verification at CityNest',
      message: 'Hello, checking if the ground-floor ramp has handrails for an elderly tourist.',
      status: 'resolved',
      category: 'Stay Accessibility',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      replies: [
        {
          sender: 'Care Support Team (Dr. Sneha)',
          text: 'Confirmed! CityNest has a certified low-incline ramp with dual handrails on both sides.',
          time: 'Yesterday at 4:15 PM'
        }
      ]
    }
  ]);
  if (!userId) return allTickets;
  return allTickets.filter(t => t.userId === userId);
}

export function addTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status' | 'replies'>): SupportTicket {
  const all = getTickets();
  const newTicket: SupportTicket = {
    ...ticket,
    id: 'TKT-' + Math.floor(100 + Math.random() * 900),
    status: 'open',
    createdAt: new Date().toISOString(),
    replies: []
  };
  all.unshift(newTicket);
  setStorage(STORAGE_KEYS.TICKETS, all);
  return newTicket;
}

// Distance calculation using Haversine formula
export function distanceBetweenKm(lat1?: number, lon1?: number, lat2?: number, lon2?: number): number | null {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
}
