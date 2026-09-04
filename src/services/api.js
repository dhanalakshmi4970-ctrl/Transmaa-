```javascript
import { POPULAR_LOCATIONS, VEHICLE_FLEET, PROMO_COUPONS } from './mockData';

// Backend URL
const API_BASE_URL = 'http://localhost:5000';

// Calculate distance between two lat/lng coordinates using Haversine formula
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 142;

  const R = 6371;
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

  const floorPenalty = hasElevator
    ? 0
    : (Number(pickupFloor) + Number(dropFloor)) * 50;

  const helperCharge =
    helpersCount > 0
      ? helpersCount * 350 + helpersCount * floorPenalty
      : 0;

  const tollEstimate =
    distanceKm > 50 ? Math.round(distanceKm * 1.2) : 0;

  const subtotal =
    baseFare + distanceFare + helperCharge + tollEstimate;

  const gstTax = Math.round(subtotal * 0.05);

  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.min(
        appliedCoupon.maxDiscount || 9999,
        Math.round(
          (subtotal * appliedCoupon.discountPercent) / 100
        )
      );
    } else if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    }
  }

  const finalTotal = Math.max(
    100,
    subtotal + gstTax - discount
  );

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

// Real Backend API Client
export const api = {

  // -------------------------
  // SEND OTP
  // -------------------------
  async sendOtp(phoneNumber) {
    // OTP is still simulated for now.
    // The customer data will be saved/fetched from MongoDB
    // during OTP verification.

    await new Promise((r) => setTimeout(r, 600));

    return {
      success: true,
      message: `OTP sent to +91 ${phoneNumber}`,
      demoOtp: '123456'
    };
  },

  // -------------------------
  // VERIFY OTP / LOGIN
  // -------------------------
  async verifyOtp(phoneNumber, otp, userName = 'Sai') {

    if (otp !== '123456' && otp.length !== 6) {
      throw new Error('Invalid OTP. Please enter 123456 for demo.');
    }

    try {

      // First try to find existing customer
      const loginResponse = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: phoneNumber
        })
      });

      if (loginResponse.ok) {

        const data = await loginResponse.json();

        return {
          success: true,
          user: {
            id: data.customer._id,
            name: data.customer.name,
            phone: data.customer.phone,
            email: data.customer.email || '',
            isLoggedIn: true,
            isGoldMember: true,
            walletBalance: 450
          }
        };
      }

      // Customer doesn't exist → create customer
      const createResponse = await fetch(
        `${API_BASE_URL}/api/customers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: userName || 'Sai',
            phone: phoneNumber
          })
        }
      );

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(
          errorData.message || 'Failed to create customer'
        );
      }

      const createData = await createResponse.json();

      return {
        success: true,
        user: {
          id: createData.customer._id,
          name: createData.customer.name,
          phone: createData.customer.phone,
          email: createData.customer.email || '',
          isLoggedIn: true,
          isGoldMember: true,
          walletBalance: 450
        }
      };

    } catch (error) {

      console.error('Login API error:', error);

      throw new Error(
        error.message || 'Unable to connect to Transmaa backend'
      );
    }
  },

  // -------------------------
  // CREATE BOOKING
  // -------------------------
  async createBooking(bookingData) {

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to create booking'
        );
      }

      return data.booking;

    } catch (error) {

      console.error('Create booking API error:', error);

      throw new Error(
        error.message || 'Unable to connect to Transmaa backend'
      );
    }
  },

  // -------------------------
  // GET CUSTOMER BOOKINGS
  // -------------------------
  async getCustomerBookings(customerId) {

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${customerId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to retrieve bookings'
        );
      }

      return data.bookings;

    } catch (error) {

      console.error('Get bookings API error:', error);

      throw new Error(
        error.message || 'Unable to retrieve bookings'
      );
    }
  }
};
```

