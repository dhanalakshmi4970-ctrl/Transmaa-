import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { POPULAR_LOCATIONS, GOODS_CATEGORIES, VEHICLE_FLEET, PROMO_COUPONS, INITIAL_ORDERS } from '../services/mockData';
import { calculateDistanceKm, calculateFareBreakdown, api } from '../services/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Navigation View & Step
  // 'HOME' | 'GOODS_SCHEDULE' | 'VEHICLE_SELECT' | 'REVIEW_PAY' | 'TRACKING' | 'ORDERS' | 'PROFILE' | 'WALLET'
  const [activeTab, setActiveTab] = useState('HOME');
  const [bookingStep, setBookingStep] = useState(1); // 1: Route/Home, 2: Goods & Time, 3: Vehicle, 4: Review, 5: Live Tracking

  // Booking Form State
  const [pickupLocation, setPickupLocation] = useState(POPULAR_LOCATIONS[0]); // Sircilla
  const [dropLocation, setDropLocation] = useState(POPULAR_LOCATIONS[1]); // Hitech City, Hyderabad
  
  const [shiftingDate, setShiftingDate] = useState('Today');
  const [shiftingTime, setShiftingTime] = useState('Morning (08:00 AM - 10:00 AM)');
  
  const [selectedCategory, setSelectedCategory] = useState(GOODS_CATEGORIES[1]); // Electrical / Appliances
  const [customGoodsNote, setCustomGoodsNote] = useState('');
  
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_FLEET[1]); // Tata Ace
  const [helpersCount, setHelpersCount] = useState(1);
  const [pickupFloor, setPickupFloor] = useState(0);
  const [dropFloor, setDropFloor] = useState(1);
  const [hasElevator, setHasElevator] = useState(true);

  const [receiverName, setReceiverName] = useState('Sai');
  const [receiverPhone, setReceiverPhone] = useState('9848012345');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CASH' | 'WALLET' | 'CARD'
  
  const [appliedCoupon, setAppliedCoupon] = useState(PROMO_COUPONS[0]); // TRANSMAA50

  // Orders & Active Simulation
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
  const [trackingStage, setTrackingStage] = useState(0); // 0: Searching, 1: Driver Assigned, 2: Arrived at Pickup, 3: Goods Loaded & In Transit, 4: Delivered

  useEffect(() => {
    localStorage.setItem('transmaa_orders', JSON.stringify(orders));
  }, [orders]);

  // Distance computation
  const distanceKm = useMemo(() => {
    if (!pickupLocation || !dropLocation) return 140;
    return calculateDistanceKm(
      pickupLocation.lat,
      pickupLocation.lng,
      dropLocation.lat,
      dropLocation.lng
    );
  }, [pickupLocation, dropLocation]);

  // Real-time Fare Breakdown
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
  }, [distanceKm, selectedVehicle, helpersCount, pickupFloor, dropFloor, hasElevator, appliedCoupon]);

  // Swap pickup & drop locations
  const swapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(dropLocation);
    setDropLocation(temp);
  };

  // Submit booking & trigger live driver assignment
  const confirmBooking = async () => {
    setIsSearchingDriver(true);
    setActiveTab('TRACKING');
    setTrackingStage(0);

    const bookingPayload = {
      from: pickupLocation,
      to: dropLocation,
      date: shiftingDate,
      timeSlot: shiftingTime,
      goodsCategory: selectedCategory,
      goodsNote: customGoodsNote,
      vehicle: selectedVehicle,
      helpersCount,
      pickupFloor,
      dropFloor,
      hasElevator,
      receiverName,
      receiverPhone,
      paymentMethod,
      totalFare: fareBreakdown ? fareBreakdown.finalTotal : 2800,
      breakdown: fareBreakdown
    };

    try {
      const createdOrder = await api.createBooking(bookingPayload);
      setActiveOrder(createdOrder);
      setOrders((prev) => [createdOrder, ...prev]);
      
      // Advance tracking stages realistically
      setTimeout(() => {
        setIsSearchingDriver(false);
        setTrackingStage(1); // Driver Assigned
      }, 2500);

      return createdOrder;
    } catch (err) {
      setIsSearchingDriver(false);
      console.error(err);
    }
  };

  // Helper to advance tracking simulation manually
  const advanceTrackingStage = () => {
    setTrackingStage((prev) => {
      const next = Math.min(prev + 1, 4);
      if (next === 4 && activeOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === activeOrder.id ? { ...o, status: 'COMPLETED' } : o
          )
        );
      }
      return next;
    });
  };

  // Reset booking wizard
  const resetBookingForm = () => {
    setBookingStep(1);
    setActiveTab('HOME');
  };

  return (
    <BookingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        bookingStep,
        setBookingStep,
        pickupLocation,
        setPickupLocation,
        dropLocation,
        setDropLocation,
        swapLocations,
        distanceKm,
        shiftingDate,
        setShiftingDate,
        shiftingTime,
        setShiftingTime,
        selectedCategory,
        setSelectedCategory,
        customGoodsNote,
        setCustomGoodsNote,
        selectedVehicle,
        setSelectedVehicle,
        helpersCount,
        setHelpersCount,
        pickupFloor,
        setPickupFloor,
        dropFloor,
        setDropFloor,
        hasElevator,
        setHasElevator,
        receiverName,
        setReceiverName,
        receiverPhone,
        setReceiverPhone,
        paymentMethod,
        setPaymentMethod,
        appliedCoupon,
        setAppliedCoupon,
        fareBreakdown,
        orders,
        setOrders,
        activeOrder,
        setActiveOrder,
        isSearchingDriver,
        trackingStage,
        setTrackingStage,
        advanceTrackingStage,
        confirmBooking,
        resetBookingForm
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
