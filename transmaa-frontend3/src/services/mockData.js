export const POPULAR_LOCATIONS = [
  {
    id: 'loc_sircilla',
    name: 'Sircilla, Telangana',
    address: 'Gandhi Chowk, Textile Town, Sircilla, Telangana 505301',
    city: 'Sircilla',
    lat: 18.3846,
    lng: 78.8048,
    popular: true
  },
  {
    id: 'loc_hitech',
    name: 'Hitech City, Hyderabad',
    address: 'Mindspace IT Park, Madhapur, Hitech City, Hyderabad 500081',
    city: 'Hyderabad',
    lat: 17.4474,
    lng: 78.3762,
    popular: true
  },
  {
    id: 'loc_gachibowli',
    name: 'Gachibowli, Hyderabad',
    address: 'Financial District, Gachibowli, Hyderabad 500032',
    city: 'Hyderabad',
    lat: 17.4401,
    lng: 78.3489,
    popular: true
  },
  {
    id: 'loc_karimnagar',
    name: 'Karimnagar, Telangana',
    address: 'Collectorate Road, Tower Circle, Karimnagar 505001',
    city: 'Karimnagar',
    lat: 18.4386,
    lng: 79.1288,
    popular: true
  },
  {
    id: 'loc_secunderabad',
    name: 'Secunderabad, Hyderabad',
    address: 'Clock Tower, Station Road, Secunderabad 500003',
    city: 'Hyderabad',
    lat: 17.4399,
    lng: 78.4983,
    popular: true
  },
  {
    id: 'loc_jubileehills',
    name: 'Jubilee Hills, Hyderabad',
    address: 'Road No 36, Jubilee Hills, Hyderabad 500033',
    city: 'Hyderabad',
    lat: 17.4319,
    lng: 78.4073,
    popular: true
  },
  {
    id: 'loc_warangal',
    name: 'Hanamkonda / Warangal',
    address: 'Kazipet Main Road, Hanamkonda, Warangal 506001',
    city: 'Warangal',
    lat: 17.9784,
    lng: 79.5941,
    popular: false
  },
  {
    id: 'loc_nizamabad',
    name: 'Nizamabad, Telangana',
    address: 'Railway Station Road, Khaleelwadi, Nizamabad 503001',
    city: 'Nizamabad',
    lat: 18.6725,
    lng: 78.0941,
    popular: false
  }
];

export const GOODS_CATEGORIES = [
  {
    id: 'timber',
    name: 'Timber / Plywood / Laminate',
    icon: 'TreePine',
    description: 'Plywood sheets, timber logs, laminate boards, wooden planks',
    recommendedVehicle: 'bolero_pickup',
    weightRange: 'Up to 2.5 Tons',
    handlingNote: 'Requires strapping ropes and waterproof tarpaulin'
  },
  {
    id: 'appliances',
    name: 'Electrical / Electronics / Home Appliances',
    icon: 'Tv',
    description: 'Refrigerator, Washing Machine, OLED TV, Microwave, AC, Inverter',
    recommendedVehicle: 'tata_ace',
    weightRange: 'Up to 800 kg',
    handlingNote: 'Fragile handling with bubble wrap & corner protectors'
  },
  {
    id: 'household',
    name: 'General Household Shifting',
    icon: 'Home',
    description: 'Beds, Sofa Sets, Dining Table, Wardrobe, Cartons, Kitchenware',
    recommendedVehicle: 'bolero_pickup',
    weightRange: '500 kg - 2.5 Tons',
    handlingNote: 'Movers/helper assistance recommended for multi-floor shifting'
  },
  {
    id: 'building',
    name: 'Building / Construction Materials',
    icon: 'Building2',
    description: 'Cement bags, Ceramic Tiles, Sanitaryware, Sand, Steel Rods',
    recommendedVehicle: 'tata_407',
    weightRange: '1.5 - 5 Tons',
    handlingNote: 'Heavy cargo payload, requires sturdy loading ramp'
  },
  {
    id: 'commercial',
    name: 'Commercial & FMCG / Industrial',
    icon: 'Boxes',
    description: 'Textile rolls, FMCG carton boxes, Machinery parts, Hardware',
    recommendedVehicle: 'canter_14ft',
    weightRange: '1 - 4 Tons',
    handlingNote: 'Invoice and GST waybill copy recommended for intercity transit'
  }
];

export const VEHICLE_FLEET = [
  {
    id: 'three_wheeler',
    name: '3-Wheeler (Auto)',
    tag: 'Economical',
    capacityKg: 500,
    dimensions: '5.5 ft x 4.0 ft x 4.5 ft',
    baseFare: 300,
    baseKmIncluded: 4,
    perKmRate: 14,
    perMinRate: 1.5,
    etaMins: 4,
    rating: 4.8,
    tripsDone: '18.4k',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=60',
    description: 'Ideal for small electronics, 2-4 carton boxes, single luggage.',
    bestFor: 'Small parcels & quick city deliveries'
  },
  {
    id: 'tata_ace',
    name: 'Tata Ace (Chota Hathi)',
    tag: 'Most Popular',
    isPopular: true,
    capacityKg: 850,
    dimensions: '7.0 ft x 4.5 ft x 5.0 ft',
    baseFare: 550,
    baseKmIncluded: 5,
    perKmRate: 18,
    perMinRate: 2.0,
    etaMins: 6,
    rating: 4.9,
    tripsDone: '42.1k',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=300&auto=format&fit=crop&q=60',
    description: 'Perfect for 1 BHK shifting, fridge, washing machine, sofa set.',
    bestFor: '1 BHK Shifting & Medium loads'
  },
  {
    id: 'bolero_pickup',
    name: 'Bolero Pickup (8 ft)',
    tag: 'Heavy Load',
    capacityKg: 1250,
    dimensions: '8.0 ft x 5.0 ft x 6.0 ft',
    baseFare: 850,
    baseKmIncluded: 6,
    perKmRate: 22,
    perMinRate: 2.5,
    etaMins: 8,
    rating: 4.9,
    tripsDone: '29.7k',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=300&auto=format&fit=crop&q=60',
    description: 'Suitable for 1-2 BHK house shifting, timber, plywood, tiles & machinery.',
    bestFor: 'Timber, Plywood & 1.5 BHK Houses'
  },
  {
    id: 'tata_407',
    name: 'Tata 407 (10 ft)',
    tag: 'High Capacity',
    capacityKg: 2500,
    dimensions: '10.0 ft x 5.5 ft x 6.0 ft',
    baseFare: 1450,
    baseKmIncluded: 8,
    perKmRate: 28,
    perMinRate: 3.0,
    etaMins: 12,
    rating: 4.85,
    tripsDone: '15.3k',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=300&auto=format&fit=crop&q=60',
    description: 'Great for 2-3 BHK complete home relocation and bulk commercial consignments.',
    bestFor: '2-3 BHK Full House & Building Materials'
  },
  {
    id: 'canter_14ft',
    name: 'Canter (14 ft Covered)',
    tag: 'Intercity Expert',
    capacityKg: 4000,
    dimensions: '14.0 ft x 6.0 ft x 6.5 ft',
    baseFare: 2200,
    baseKmIncluded: 10,
    perKmRate: 34,
    perMinRate: 3.5,
    etaMins: 15,
    rating: 4.92,
    tripsDone: '9.8k',
    image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?w=300&auto=format&fit=crop&q=60',
    description: 'Weather-proof closed container truck for luxury furniture, electronics, and intercity long haul.',
    bestFor: 'Intercity Shifting & Long Distance Heavy Transport'
  }
];

export const PROMO_COUPONS = [
  {
    code: 'TRANSMAA50',
    title: '50% OFF Shifting Special',
    description: 'Get 50% discount up to ₹250 on your house shifting',
    discountPercent: 50,
    maxDiscount: 250,
    minOrderValue: 500
  },
  {
    code: 'GOLD10',
    title: '10% Transmaa Gold Off',
    description: 'Flat 10% instant savings for Gold members',
    discountPercent: 10,
    maxDiscount: 500,
    minOrderValue: 400
  },
  {
    code: 'FIRSTSHIFT',
    title: '₹150 Welcome Discount',
    description: 'Flat ₹150 OFF on your first booking with Transmaa',
    flatDiscount: 150,
    minOrderValue: 600
  }
];

export const MOCK_DRIVERS = [
  {
    id: 'drv_01',
    name: 'Ramesh Kumar Goud',
    phone: '+91 98480 23145',
    rating: 4.9,
    trips: 1420,
    vehicleNo: 'TS 09 AB 1234',
    model: 'Tata Ace Gold (White)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    experienceYears: 6,
    vaccinated: true,
    languages: 'Telugu, Hindi, English'
  },
  {
    id: 'drv_02',
    name: 'Suresh Reddy',
    phone: '+91 94401 88723',
    rating: 4.85,
    trips: 980,
    vehicleNo: 'TS 08 CD 5678',
    model: 'Bolero Maxi Truck (Silver)',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    experienceYears: 5,
    vaccinated: true,
    languages: 'Telugu, Hindi'
  },
  {
    id: 'drv_03',
    name: 'Mohammed Afzal',
    phone: '+91 97003 44129',
    rating: 4.95,
    trips: 2150,
    vehicleNo: 'TS 10 EF 9012',
    model: 'Canter 14ft Closed Container',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    experienceYears: 8,
    vaccinated: true,
    languages: 'Telugu, Urdu, Hindi, English'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'TM-98214',
    createdAt: '2026-08-26T14:30:00Z',
    status: 'COMPLETED',
    from: {
      name: 'Sircilla, Telangana',
      address: 'Gandhi Chowk, Textile Town, Sircilla'
    },
    to: {
      name: 'Hitech City, Hyderabad',
      address: 'Mindspace IT Park, Madhapur, Hitech City'
    },
    vehicle: VEHICLE_FLEET[1], // Tata Ace
    goodsCategory: GOODS_CATEGORIES[1], // Electrical
    date: '2026-08-26',
    timeSlot: 'Morning (08:00 AM - 10:00 AM)',
    totalFare: 2980,
    driver: MOCK_DRIVERS[0],
    rating: 5,
    helpersCount: 1,
    paymentMethod: 'UPI'
  }
];
