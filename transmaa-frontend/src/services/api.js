import { POPULAR_LOCATIONS, VEHICLE_FLEET, PROMO_COUPONS, MOCK_DRIVERS } from './mockData';

// Calculate distance between two lat/lng coordinates using Haversine formula
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 142; // default realistic fallback for Sircilla -> Hyderabad (approx 140km)
  
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Logistics detour multiplier (road distance is ~1.25x straight line)
  return Math.round(distance * 1.25);
};

// Calculate estimate fare
export const calculateFareBreakdown = ({
  distanceKm,
  vehicle,
  helpersCount = 0,
  pickupFloor = 0,
  dropFloor = 0,
  hasElevator = true,
  appliedCoupon = null
}) => {
  if (!vehicle) return null;

  const baseFare = vehicle.baseFare;
  const extraKm = Math.max(0, distanceKm - vehicle.baseKmIncluded);
  const distanceFare = Math.round(extraKm * vehicle.perKmRate);
  
  // Helper charges (₹350 per helper base + ₹50 per floor without elevator)
  const floorPenalty = hasElevator ? 0 : (Number(pickupFloor) + Number(dropFloor)) * 50;
  const helperCharge = helpersCount > 0 ? (helpersCount * 350) + (helpersCount * floorPenalty) : 0;
  
  // Tolls & GST (5%)
  const tollEstimate = distanceKm > 50 ? Math.round(distanceKm * 1.2) : 0;
  const subtotal = baseFare + distanceFare + helperCharge + tollEstimate;
  const gstTax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.min(appliedCoupon.maxDiscount || 9999, Math.round((subtotal * appliedCoupon.discountPercent) / 100));
    } else if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    }
  }

  const finalTotal = Math.max(100, subtotal + gstTax - discount);

  return {
    distanceKm,
    baseFare,
    distanceFare,
    helperCharge,
    tollEstimate,
    subtotal,
    gstTax,
    discount,
    finalTotal
  };
};

// Simulated Backend API Client
export const api = {
  // Authentication
  async sendOtp(phoneNumber) {
    await new Promise((r) => setTimeout(r, 600));
    return {
      success: true,
      message: `OTP sent to +91 ${phoneNumber}`,
      demoOtp: '123456'
    };
  },

  async verifyOtp(phoneNumber, otp, userName = 'Sai') {
    await new Promise((r) => setTimeout(r, 800));
    if (otp === '123456' || otp.length === 6) {
      return {
        success: true,
        user: {
          id: 'usr_' + Date.now(),
          name: userName || 'Sai',
          phone: phoneNumber,
          isGoldMember: true,
          walletBalance: 450,
          savedAddresses: [
            { id: 'addr_1', tag: 'Home', address: 'Gandhi Chowk, Sircilla, Telangana' },
            { id: 'addr_2', tag: 'Office', address: 'Mindspace IT Park, Hitech City, Hyderabad' }
          ]
        },
        token: 'tm_jwt_token_' + Math.random().toString(36).substring(2)
      };
    }
    throw new Error('Invalid OTP. Please enter 123456 for demo.');
  },

  // Create booking
  async createBooking(bookingData) {
    await new Promise((r) => setTimeout(r, 1200));
    const randomDriver = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
    const orderId = 'TM-' + Math.floor(10000 + Math.random() * 90000);
    const pickupOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder = {
      ...bookingData,
      id: orderId,
      pickupOtp,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      driver: randomDriver
    };

    return newOrder;
  }
};
