import { User, Doctor, MedicalStore, TouristShop, ClothingItem, Room, BusRoute, ServiceCategory, ProjectData } from '../types';

export const initialUsers: User[] = [
  {
    id: 'SS-CU-1001',
    role: 'customer',
    name: 'Demo Customer',
    email: 'customer@safestay.demo',
    phone: '+91 90000 10001',
    city: 'Pune',
    bio: 'Traveller looking for safe, simple stays, medical readiness and quick local services.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    privacy: { profilePublic: true, contactVisible: false }
  },
  {
    id: 'SS-AG-2001',
    role: 'agent',
    name: 'Care Support Team (Dr. Sneha & Team)',
    email: 'care@safestay.demo',
    phone: '+91 90000 20001',
    city: 'Pune',
    bio: 'Hospitality, emergency medical liaison and 24x7 customer-care coordination.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
    privacy: { profilePublic: true, contactVisible: true }
  },
  {
    id: 'SS-AD-9001',
    role: 'admin',
    name: 'Project Admin',
    email: 'admin@safestay.demo',
    phone: '+91 90000 90001',
    city: 'Pune',
    bio: 'SafeStay project administrator & partner verification lead.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
    privacy: { profilePublic: true, contactVisible: true }
  }
];

export const initialDoctors: Doctor[] = [
  {
    id: 'DOC-101',
    name: 'Dr. Meera Joshi',
    specialty: 'General Physician & Family Care',
    city: 'Pune',
    address: 'Kothrud, Pune',
    rating: 4.9,
    availability: 'Today • 3:00 PM - 7:00 PM',
    video: true,
    phone: '+91 90111 11001',
    lat: 18.5074,
    lon: 73.8077,
    experience: '14 years',
    consultationFee: 500
  },
  {
    id: 'DOC-102',
    name: 'Dr. Arjun Patil',
    specialty: 'Travel Medicine & Acute Infections',
    city: 'Pune',
    address: 'Baner, Pune',
    rating: 4.8,
    availability: 'Today • 5:00 PM - 8:00 PM',
    video: true,
    phone: '+91 90111 11002',
    lat: 18.5590,
    lon: 73.7868,
    experience: '11 years',
    consultationFee: 650
  },
  {
    id: 'DOC-103',
    name: 'Dr. Riya Shah',
    specialty: 'Physiotherapy & Mobility Rehab',
    city: 'Pune',
    address: 'Viman Nagar, Pune',
    rating: 4.7,
    availability: 'Tomorrow • 10:00 AM - 2:00 PM',
    video: true,
    phone: '+91 90111 11003',
    lat: 18.5679,
    lon: 73.9143,
    experience: '8 years',
    consultationFee: 450
  },
  {
    id: 'DOC-104',
    name: 'Dr. Sameer Deshmukh',
    specialty: 'Emergency Medicine & Trauma Care',
    city: 'Pune',
    address: 'Shivaji Nagar, Pune',
    rating: 4.9,
    availability: '24x7 On-Call Telecare',
    video: true,
    phone: '+91 90111 11004',
    lat: 18.5308,
    lon: 73.8470,
    experience: '16 years',
    consultationFee: 700
  }
];

export const initialStores: MedicalStore[] = [
  {
    id: 'MED-201',
    name: 'CarePlus Medicals & Mobility Hub',
    category: 'Medical Store',
    city: 'Pune',
    address: 'Karve Road, Kothrud, Pune',
    lat: 18.5074,
    lon: 73.8077,
    stock: ['BP monitor', 'thermometer', 'wheelchair', 'first-aid kit', 'glucometer', 'orthopedic collar'],
    phone: '+91 90222 22001',
    rating: 4.8,
    deliveryAvailable: true
  },
  {
    id: 'MED-202',
    name: 'MediBridge 24x7 Pharmacy',
    category: 'Medical Store',
    city: 'Pune',
    address: 'Baner Road, Pune',
    lat: 18.5590,
    lon: 73.7868,
    stock: ['pulse oximeter', 'walking stick', 'first-aid kit', 'travel health kit', 'compression socks'],
    phone: '+91 90222 22002',
    rating: 4.7,
    deliveryAvailable: true
  },
  {
    id: 'MED-203',
    name: 'Mobility & Care Hub',
    category: 'Medical Appliance Store',
    city: 'Pune',
    address: 'Viman Nagar, Pune',
    lat: 18.5679,
    lon: 73.9143,
    stock: ['wheelchair', 'walker', 'commode chair', 'support belt', 'oxygen concentrator (rental)', 'nebulizer'],
    phone: '+91 90222 22003',
    rating: 4.9,
    deliveryAvailable: true
  },
  {
    id: 'MED-204',
    name: 'CityPulse Health & Surgical',
    category: 'Medical Store',
    city: 'Pune',
    address: 'FC Road, Deccan, Pune',
    lat: 18.5204,
    lon: 73.8430,
    stock: ['first-aid kit', 'sanitizers', 'antiseptics', 'digital thermometer', 'knee brace'],
    phone: '+91 90222 22004',
    rating: 4.6,
    deliveryAvailable: true
  }
];

export const initialTouristShops: TouristShop[] = [
  {
    id: 'TOU-301',
    name: 'TravelReady Hub',
    category: 'Tourist Essentials',
    city: 'Pune',
    address: 'FC Road, Pune',
    lat: 18.5232,
    lon: 73.8424,
    stock: ['universal power adapter', 'windproof umbrella', '40L travel backpack', 'insulated water bottle', 'raincoat'],
    phone: '+91 90333 33001',
    rating: 4.8
  },
  {
    id: 'TOU-302',
    name: 'TripMate Store',
    category: 'Tourist Essentials',
    city: 'Pune',
    address: 'Shivaji Nagar, Pune',
    lat: 18.5308,
    lon: 73.8470,
    stock: ['SIM ejector & adapter kit', 'TSA luggage lock', 'memory foam neck pillow', 'waterproof travel pouch', 'powerbank 20000mAh'],
    phone: '+91 90333 33002',
    rating: 4.7
  },
  {
    id: 'TOU-303',
    name: 'Nomad Gear & Accessories',
    category: 'Tourist Essentials',
    city: 'Pune',
    address: 'Camp MG Road, Pune',
    lat: 18.5140,
    lon: 73.8800,
    stock: ['quick-dry microfiber towel', 'money belt with RFID block', 'portable luggage scale', 'compact flashlight'],
    phone: '+91 90333 33003',
    rating: 4.9
  }
];

export const initialClothing: ClothingItem[] = [
  {
    id: 'CLO-401',
    name: 'TravelWear Studio',
    category: 'Clothing & Weather Gear',
    city: 'Pune',
    address: 'MG Road, Camp, Pune',
    price: '₹499+',
    stock: ['anti-sweat t-shirts', 'lightweight windbreaker jackets', 'monsoon rainwear', 'UV protection caps'],
    pickup: true,
    rating: 4.7,
    lat: 18.5135,
    lon: 73.8790
  },
  {
    id: 'CLO-402',
    name: 'ComfortWalk Outfitters',
    category: 'Footwear & Comfort Wear',
    city: 'Pune',
    address: 'Aundh, Pune',
    price: '₹699+',
    stock: ['cushioned walking shoes', 'fleece thermal jackets', 'moisture-wicking socks', 'comfort slip-ons'],
    pickup: true,
    rating: 4.8,
    lat: 18.5580,
    lon: 73.8070
  },
  {
    id: 'CLO-403',
    name: 'Heritage Cotton & Casuals',
    category: 'Clothing',
    city: 'Pune',
    address: 'FC Road, Deccan, Pune',
    price: '₹399+',
    stock: ['breathable cotton shirts', 'linen cargo pants', 'traditional scarves', 'sun hats'],
    pickup: true,
    rating: 4.6,
    lat: 18.5210,
    lon: 73.8415
  }
];

export const initialRooms: Room[] = [
  {
    id: 'ROOM-501',
    name: 'CityNest Rooms & Suites',
    type: 'Budget Hotel',
    city: 'Pune',
    address: 'Shivaji Nagar, Pune',
    price: 1299,
    rating: 4.6,
    amenities: ['High-speed Wi-Fi', 'Elevator', '24x7 Front Desk', 'Family Rooms', 'CCTV Security'],
    lat: 18.5308,
    lon: 73.8470,
    roomsAvailable: 5,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ROOM-502',
    name: 'GreenView Boutique Guest House',
    type: 'Guest House',
    city: 'Pune',
    address: 'Kothrud, Pune',
    price: 1599,
    rating: 4.7,
    amenities: ['Wi-Fi', 'Free Parking', 'Organic Breakfast', 'Quiet Garden', 'Power Backup'],
    lat: 18.5074,
    lon: 73.8077,
    roomsAvailable: 3,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ROOM-503',
    name: 'Airport Comfort Inn & Transit Stay',
    type: 'Hotel',
    city: 'Pune',
    address: 'Viman Nagar, Pune',
    price: 2199,
    rating: 4.5,
    amenities: ['Wi-Fi', 'Airport Shuttle', 'In-house Restaurant', 'Accessible Room (Wheelchair friendly)'],
    lat: 18.5679,
    lon: 73.9143,
    roomsAvailable: 8,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ROOM-504',
    name: 'Serene Heritage Residency',
    type: 'Heritage Stay',
    city: 'Pune',
    address: 'Prabhat Road, Deccan, Pune',
    price: 2799,
    rating: 4.9,
    amenities: ['Wi-Fi', 'Historic Architecture', 'Doctor On-Call', 'Tea Garden', 'Air Conditioning'],
    lat: 18.5140,
    lon: 73.8340,
    roomsAvailable: 4,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80'
  }
];

export const initialBuses: BusRoute[] = [
  {
    id: 'BUS-601',
    operator: 'SafeRide Bus Express',
    from: 'Pune (Swargate)',
    to: 'Mahabaleshwar (Hill Station)',
    depart: '07:00 AM',
    arrive: '10:30 AM',
    fare: 520,
    seats: 18,
    busType: 'AC Semi-Sleeper with First-Aid kit'
  },
  {
    id: 'BUS-602',
    operator: 'TravelLink Maharashtra',
    from: 'Pune (Shivaji Nagar)',
    to: 'Nashik (Pilgrimage & Wine Valley)',
    depart: '09:30 AM',
    arrive: '01:30 PM',
    fare: 480,
    seats: 24,
    busType: 'Executive Luxury AC'
  },
  {
    id: 'BUS-603',
    operator: 'GreenRoute Eco-Express',
    from: 'Pune (Wakad)',
    to: 'Mumbai (Dadar / BKC)',
    depart: '06:30 PM',
    arrive: '10:30 PM',
    fare: 650,
    seats: 11,
    busType: 'Electric AC Superfast Sleeper'
  },
  {
    id: 'BUS-604',
    operator: 'SafeRide Bus Express',
    from: 'Pune (Viman Nagar)',
    to: 'Lonavala / Khandala',
    depart: '08:00 AM',
    arrive: '09:45 AM',
    fare: 290,
    seats: 20,
    busType: 'AC Seater Express'
  }
];

export const initialServices: ServiceCategory[] = [
  {
    id: 'SRV-701',
    key: 'medical',
    title: 'Medical Appliances',
    desc: 'Locate wheelchairs, BP monitors, oximeters, crutches and first-aid gear.',
    icon: '🩺'
  },
  {
    id: 'SRV-702',
    key: 'tourist',
    title: 'Tourist Essentials',
    desc: 'Power adapters, TSA luggage locks, raincoats, waterproof pouches and gear.',
    icon: '🧳'
  },
  {
    id: 'SRV-703',
    key: 'delivery',
    title: 'Fast Doorstep Delivery',
    desc: 'Request rapid pickup and doorstep delivery from verified Pune partner stores.',
    icon: '🚚'
  },
  {
    id: 'SRV-704',
    key: 'doctors',
    title: 'Doctors & Video Care',
    desc: 'Discover verified physicians and launch a secure browser video consultation.',
    icon: '👨‍⚕️'
  },
  {
    id: 'SRV-705',
    key: 'rooms',
    title: 'Rooms & Stays',
    desc: 'Browse safe, certified hotels and guest houses for tourists and families.',
    icon: '🛏️'
  },
  {
    id: 'SRV-706',
    key: 'buses',
    title: 'Bus & Mobility',
    desc: 'See daily departure routes, live seat availability and reserve your ticket.',
    icon: '🚌'
  },
  {
    id: 'SRV-707',
    key: 'clothing',
    title: 'Travel Clothing',
    desc: 'Shop weather-ready monsoon gear, lightweight apparel and walking footwear.',
    icon: '👕'
  },
  {
    id: 'SRV-708',
    key: 'gps',
    title: 'GPS & Nearby Network',
    desc: 'Use device location to calculate exact km distances and inspect interactive map pins.',
    icon: '📍'
  }
];

export const initialProjectData: ProjectData = {
  roadmap: [
    {
      phase: 'Phase 1',
      name: 'Research & Compliance',
      status: 'completed',
      range: 'Completed (Q1)',
      tasksCompleted: 6,
      totalTasks: 6,
      description: 'Regulatory compliance for tourism stays, health device directory rules, privacy framework & data encryption standards.'
    },
    {
      phase: 'Phase 2',
      name: 'Safety Protocols & Architecture Design',
      status: 'completed',
      range: 'Completed (Q2)',
      tasksCompleted: 8,
      totalTasks: 8,
      description: 'Emergency call-routing architecture, WebRTC video care fallback protocol, distance radius algorithms, and multi-role security.'
    },
    {
      phase: 'Phase 3',
      name: 'Service Partner Onboarding',
      status: 'progress',
      range: 'In Progress (Q3)',
      tasksCompleted: 11,
      totalTasks: 14,
      description: 'Onboarding verified Pune doctors, 24x7 pharmacies, mobility equipment suppliers, transport operators and hotels.'
    },
    {
      phase: 'Phase 4',
      name: 'Facility & Listing Quality Audit',
      status: 'upcoming',
      range: 'Upcoming (Q4)',
      tasksCompleted: 3,
      totalTasks: 6,
      description: 'Physical safety inspection, sanitization checks, wheelchair ramp audit, and video consultation bandwidth verification.'
    },
    {
      phase: 'Phase 5',
      name: 'Full Scale Launch & Monitoring',
      status: 'planned',
      range: 'Planned (Q1 Next)',
      tasksCompleted: 0,
      totalTasks: 5,
      description: 'State-wide expansion across Maharashtra corridors (Pune - Mumbai - Nashik - Mahabaleshwar) and 24x7 dispatch support.'
    }
  ],
  metrics: {
    totalTasks: 39,
    completed: 25,
    inProgress: 11,
    blocked: 3
  },
  estimates: {
    year1Revenue: 3187955,
    grossProfit: 2550364,
    netProfit: 1912733,
    breakEvenMonth: 1
  }
};
