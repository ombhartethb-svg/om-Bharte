export type UserRole = 'customer' | 'agent' | 'admin';

export interface UserPrivacy {
  profilePublic: boolean;
  contactVisible: boolean;
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
  avatar: string | null;
  privacy: UserPrivacy;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  address: string;
  rating: number;
  availability: string;
  video: boolean;
  phone: string;
  lat?: number;
  lon?: number;
  experience?: string;
  consultationFee?: number;
}

export interface MedicalStore {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  lat: number;
  lon: number;
  stock: string[];
  phone: string;
  rating?: number;
  deliveryAvailable?: boolean;
}

export interface TouristShop {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  lat: number;
  lon: number;
  stock: string[];
  phone: string;
  rating?: number;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  price: string;
  stock: string[];
  pickup: boolean;
  rating?: number;
  lat?: number;
  lon?: number;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  price: number;
  rating: number;
  amenities: string[];
  lat: number;
  lon: number;
  roomsAvailable?: number;
  image?: string;
}

export interface BusRoute {
  id: string;
  operator: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  fare: number;
  seats: number;
  busType?: string;
}

export interface ServiceCategory {
  id: string;
  key: string;
  title: string;
  desc: string;
  icon: string;
}

export interface OrderItem {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'doctor' | 'medical-store' | 'tourist-shop' | 'clothing' | 'room' | 'bus';
  itemTitle: string;
  action: string;
  notes: string;
  status: 'requested' | 'confirmed' | 'in-transit' | 'completed' | 'cancelled';
  createdAt: string;
  details?: Record<string, any>;
  cost?: number;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved';
  category?: string;
  createdAt: string;
  replies?: Array<{
    sender: string;
    text: string;
    time: string;
  }>;
}

export interface RoadmapPhase {
  phase: string;
  name: string;
  status: 'completed' | 'progress' | 'upcoming' | 'planned';
  range: string;
  tasksCompleted: number;
  totalTasks: number;
  description?: string;
}

export interface ProjectMetrics {
  totalTasks: number;
  completed: number;
  inProgress: number;
  blocked: number;
}

export interface FinancialEstimates {
  year1Revenue: number;
  grossProfit: number;
  netProfit: number;
  breakEvenMonth: number;
}

export interface ProjectData {
  roadmap: RoadmapPhase[];
  metrics: ProjectMetrics;
  estimates: FinancialEstimates;
}

export interface GPSCoords {
  lat: number;
  lon: number;
  accuracy?: number;
  address?: string;
}
