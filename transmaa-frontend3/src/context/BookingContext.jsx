```jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  POPULAR_LOCATIONS,
  GOODS_CATEGORIES,
  VEHICLE_FLEET,
  PROMO_COUPONS,
  INITIAL_ORDERS
} from '../services/mockData';
import { calculateDistanceKm, calculateFareBreakdown, api } from '../services/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Navigation View & Step
  // 'HOME' | 'GOODS_SCHEDULE' | 'VEHICLE_SELECT' | 'REVIEW_PAY' |
  // 'TRACKING' | 'ORDERS' | 'PROFILE' | 'WALLET'
  const [activeTab, setActiveTab] = useState('HOME');

  // 1: Route/Home
  // 2: Goods & Time
  // 3: Vehicle
  // 4: Review
  // 5: Live Tracking
  const [bookingStep, setBookingStep] = useState(1);

  // --------------------------------------------------
  // BOOKING FORM STATE
  // --------------------------------------------------

  // Locations
  const [pickupLocation, setPickupLocation] = useState(
    POPULAR_LOCATIONS[0]
  );

  const [dropLocation, setDropLocation] = useState(
    POPULAR_LOCATIONS[1]
  );

  // Date & Time
  const [shiftingDate, setShiftingDate] = useState('Today');

  const [shiftingTime, setShiftingTime] = useState(
    'Morning (08:00 AM - 10:00 AM)'
  );

  // Goods
  const [selectedCategory, setSelectedCategory] = useState(
    GOODS_CATEGORIES[1]
  );

  const [customGoodsNote, setCustomGoodsNote] = useState('');

  // --------------------------------------------------
  // NEW: LOAD WEIGHT
  // --------------------------------------------------

  // Customer enters the approximate weight of the goods.
  // Example: 500 kg / 1.5 tons
  const [loadWeight, setLoadWeight] = useState('');

  // Supported units: kg or ton
  const [weightUnit, setWeightUnit] = useState('kg');

  // Vehicle & Helpers
  const [selectedVehicle, setSelectedVehicle] = useState(
    VEHICLE_FLEET[1]
  );

  const [helpersCount, setHelpersCount] = useState(1);

  const [pickupFloor, setPickupFloor] = useState(0);

  const [dropFloor, setDropFloor] = useState(1);

  const [hasElevator, setHasElevator] = useState(true);

  // Receiver
  const [receiverName, setReceiverName] = useState('Sai');

  const [receiverPhone, setReceiverPhone] = useState('9848012345');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState(
    PROMO_COUPONS[0]
  );

  // --------------------------------------------------
  // ORDERS & TRACKING
  // --------------------------------------------------

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('transmaa_orders');

      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [activeOrder, setActiveOrder] = useState(null);

  const [isSearchingDriver, setIsSearchingDriver] = useState(false);

  // 0: Searching
  // 1: Driver Assigned
  // 2: Arrived at Pickup
  // 3: Goods Loaded & In Transit
  // 4: Delivered
  const [trackingStage, setTrackingStage] = useState(0);

  // --------------------------------------------------
  // SAVE ORDERS TO LOCAL STORAGE
  // --------------------------------------------------

  useEffect(() => {
    localStorage.setItem(
      'transmaa_orders',
      JSON.stringify(orders)
    );
  }, [orders]);

  // --------------------------------------------------
  // DISTANCE CALCULATION
  // --------------------------------------------------

  const distanceKm = useMemo(() => {
    if (!pickupLocation || !dropLocation) {
      return 140;
    }

    return calculateDistanceKm(
      pickupLocation.lat,
      pickupLocation.lng,
      dropLocation.lat,
      dropLocation.lng
    );
  }, [pickupLocation, dropLocation]);

  // --------------------------------------------------
  // FARE BREAKDOWN
  // --------------------------------------------------

  const fareBreakdown = useMemo(() => {
    return calculateFareBreakdown({
      distanceKm,
      vehicle: selectedVehicle,
      helpersCount,
      pickupFloor,
      dropFloor,
      hasElevator,
      appliedCoupon
    });
  }, [
    distanceKm,
    selectedVehicle,
    helpersCount,
    pickupFloor,
    dropFloor,
    hasElevator,
    appliedCoupon
  ]);

  // --------------------------------------------------
  // SWAP LOCATIONS
  // --------------------------------------------------

  const swapLocations = () => {
    const temp = pickupLocation;

    setPickupLocation(dropLocation);
    setDropLocation(temp);
  };

  // --------------------------------------------------
  // CONFIRM BOOKING
  // --------------------------------------------------

  const confirmBooking = async () => {
    setIsSearchingDriver(true);

    setActiveTab('TRACKING');

    setTrackingStage(0);

    // Convert tons to kilograms for internal calculation.
    const weightInKg =
      weightUnit === 'ton'
        ? Number(loadWeight || 0) * 1000
        : Number(loadWeight || 0);

    const bookingPayload = {
      from: pickupLocation,
      to: dropLocation,

      date: shiftingDate,

      timeSlot: shiftingTime,

      goodsCategory: selectedCategory,

      goodsNote: customGoodsNote,

      // NEW: LOAD WEIGHT
      loadWeight: Number(loadWeight || 0),

      // NEW: WEIGHT UNIT
      weightUnit,

      // NEW: STANDARDIZED KG VALUE
      weightInKg,

      vehicle: selectedVehicle,

      helpersCount,

      pickupFloor,

      dropFloor,

      hasElevator,

      receiverName,

      receiverPhone,

      paymentMethod,

      totalFare: fareBreakdown
        ? fareBreakdown.finalTotal
        : 2800,

      breakdown: fareBreakdown
    };

    try {
      const createdOrder = await api.createBooking(
        bookingPayload
      );

      setActiveOrder(createdOrder);

      setOrders((prev) => [
        createdOrder,
        ...prev
      ]);

      // Driver assignment simulation
      setTimeout(() => {
        setIsSearchingDriver(false);

        setTrackingStage(1);
      }, 2500);

      return createdOrder;
    } catch (err) {
      setIsSearchingDriver(false);

      console.error('Booking failed:', err);
    }
  };

  // --------------------------------------------------
  // ADVANCE TRACKING STAGE
  // --------------------------------------------------

  const advanceTrackingStage = () => {
    setTrackingStage((prev) => {
      const next = Math.min(prev + 1, 4);

      // When delivery is completed
      if (next === 4 && activeOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === activeOrder.id
              ? {
                  ...order,
                  status: 'COMPLETED'
                }
              : order
          )
        );
      }

      return next;
    });
  };

  // --------------------------------------------------
  // RESET BOOKING FORM
  // --------------------------------------------------

  const resetBookingForm = () => {
    setBookingStep(1);

    setActiveTab('HOME');

    // Reset weight fields
    setLoadWeight('');

    setWeightUnit('kg');

    setTrackingStage(0);

    setIsSearchingDriver(false);
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <BookingContext.Provider
      value={{
        // Navigation
        activeTab,
        setActiveTab,

        bookingStep,
        setBookingStep,

        // Locations
        pickupLocation,
        setPickupLocation,

        dropLocation,
        setDropLocation,

        swapLocations,

        distanceKm,

        // Date & Time
        shiftingDate,
        setShiftingDate,

        shiftingTime,
        setShiftingTime,

        // Goods
        selectedCategory,
        setSelectedCategory,

        customGoodsNote,
        setCustomGoodsNote,

        // NEW: Load Weight
        loadWeight,
        setLoadWeight,

        weightUnit,
        setWeightUnit,

        // Vehicle
        selectedVehicle,
        setSelectedVehicle,

        // Helpers
        helpersCount,
        setHelpersCount,

        pickupFloor,
        setPickupFloor,

        dropFloor,
        setDropFloor,

        hasElevator,
        setHasElevator,

        // Receiver
        receiverName,
        setReceiverName,

        receiverPhone,
        setReceiverPhone,

        // Payment
        paymentMethod,
        setPaymentMethod,

        // Coupon
        appliedCoupon,
        setAppliedCoupon,

        // Fare
        fareBreakdown,

        // Orders
        orders,
        setOrders,

        activeOrder,
        setActiveOrder,

        // Tracking
        isSearchingDriver,

        trackingStage,
        setTrackingStage,

        advanceTrackingStage,

        // Booking
        confirmBooking,

        resetBookingForm
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
```

