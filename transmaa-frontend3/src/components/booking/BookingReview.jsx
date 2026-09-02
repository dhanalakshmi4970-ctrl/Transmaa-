import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { PROMO_COUPONS } from '../../services/mockData';
import {
  MapPin,
  Calendar,
  Clock,
  Package,
  Truck,
  Users,
  Tag,
  CreditCard,
  Banknote,
  Wallet,
  Smartphone,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Percent,
  Sparkles
} from 'lucide-react';

export const BookingReview = () => {
  const { user } = useAuth();
  const {
    pickupLocation,
    dropLocation,
    shiftingDate,
    shiftingTime,
    selectedCategory,
    customGoodsNote,
    selectedVehicle,
    helpersCount,
    receiverName,
    setReceiverName,
    receiverPhone,
    setReceiverPhone,
    paymentMethod,
    setPaymentMethod,
    appliedCoupon,
    setAppliedCoupon,
    fareBreakdown,
    confirmBooking,
    setBookingStep,
    setActiveTab
  } = useBooking();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const found = PROMO_COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponSuccess(`Coupon ${found.code} applied successfully!`);
    } else {
      setCouponError('Invalid coupon code. Try TRANSMAA50 or GOLD10');
    }
  };

  const handleBookNow = async () => {
    setIsSubmitting(true);
    try {
      await confirmBooking();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setBookingStep(3);
            setActiveTab('VEHICLE_SELECT');
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Trucks</span>
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Step 4 of 4: Review & Payment
        </span>
      </div>

      {/* 1. Trip Summary Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-orange-600" />
          <span>Shifting Trip Summary</span>
        </h2>

        {/* Route Points */}
        <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Pickup Location</p>
              <p className="text-sm font-bold text-slate-900">{pickupLocation.name}</p>
              <p className="text-xs text-slate-500">{pickupLocation.address}</p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-slate-300 ml-3 h-4"></div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-xs font-bold text-orange-600 uppercase">Dropoff Location</p>
              <p className="text-sm font-bold text-slate-900">{dropLocation.name}</p>
              <p className="text-xs text-slate-500">{dropLocation.address}</p>
            </div>
          </div>
        </div>

        {/* Trip Specs Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80">
            <p className="text-[10px] font-bold uppercase text-orange-800">Vehicle</p>
            <p className="text-xs font-black text-slate-900 mt-0.5">{selectedVehicle.name}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Date & Slot</p>
            <p className="text-xs font-black text-slate-900 mt-0.5">{shiftingDate}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Goods Type</p>
            <p className="text-xs font-black text-slate-900 mt-0.5 truncate">{selectedCategory.name}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Labour</p>
            <p className="text-xs font-black text-slate-900 mt-0.5">
              {helpersCount === 0 ? 'No Helpers' : `${helpersCount} Helper(s)`}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Receiver & Contact Person */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <h2 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-orange-600" />
          <span>Receiver & Contact Person Details</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Contact Name
            </label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="e.g. Sai Kumar"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Contact Mobile Number
            </label>
            <input
              type="tel"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              placeholder="9848012345"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Promo Codes & Discounts */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <h2 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-orange-600" />
          <span>Apply Offers & Promo Code</span>
        </h2>

        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Enter promo code (e.g. TRANSMAA50)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Apply
          </button>
        </form>

        {couponSuccess && (
          <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{couponSuccess}</span>
          </p>
        )}
        {couponError && (
          <p className="text-xs font-bold text-rose-600 mt-2">
            {couponError}
          </p>
        )}

        {/* Quick Apply Chips */}
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
          {PROMO_COUPONS.map((cpn) => (
            <button
              key={cpn.code}
              type="button"
              onClick={() => {
                setAppliedCoupon(cpn);
                setCouponSuccess(`Coupon ${cpn.code} applied!`);
              }}
              className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                appliedCoupon?.code === cpn.code
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-black'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300'
              }`}
            >
              <Percent className="w-3 h-3 text-orange-600" />
              <span>{cpn.code}</span>
              <span className="text-[10px] text-slate-400">
                ({cpn.discountPercent ? `${cpn.discountPercent}% off` : `₹${cpn.flatDiscount} off`})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Detailed Fare Breakdown */}
      {fareBreakdown && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
          <h2 className="text-base font-black text-slate-900 mb-3 flex items-center justify-between">
            <span>Transparent Price Breakdown</span>
            <span className="text-xs font-normal text-slate-500">
              {fareBreakdown.distanceKm} km route
            </span>
          </h2>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Base Fare (incl. {selectedVehicle.baseKmIncluded} km)</span>
              <span className="font-semibold text-slate-900">₹{fareBreakdown.baseFare}</span>
            </div>
            <div className="flex justify-between">
              <span>Distance Charge ({Math.max(0, fareBreakdown.distanceKm - selectedVehicle.baseKmIncluded)} km × ₹{selectedVehicle.perKmRate})</span>
              <span className="font-semibold text-slate-900">₹{fareBreakdown.distanceFare}</span>
            </div>
            {fareBreakdown.helperCharge > 0 && (
              <div className="flex justify-between">
                <span>Loading / Unloading Labour ({helpersCount} helper)</span>
                <span className="font-semibold text-slate-900">₹{fareBreakdown.helperCharge}</span>
              </div>
            )}
            {fareBreakdown.tollEstimate > 0 && (
              <div className="flex justify-between">
                <span>Highway Fastag Toll Estimate</span>
                <span className="font-semibold text-slate-900">₹{fareBreakdown.tollEstimate}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST & Transport Service Tax (5%)</span>
              <span className="font-semibold text-slate-900">₹{fareBreakdown.gstTax}</span>
            </div>

            {fareBreakdown.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <span>Discount ({appliedCoupon?.code})</span>
                <span>- ₹{fareBreakdown.discount}</span>
              </div>
            )}

            <div className="border-t-2 border-slate-200 pt-3 mt-2 flex justify-between items-center">
              <div>
                <span className="text-sm sm:text-base font-black text-slate-900">
                  Total Payable Amount
                </span>
                <p className="text-[10px] text-slate-400">All inclusive, no hidden charges</p>
              </div>
              <span className="text-2xl font-black text-orange-600">
                ₹{fareBreakdown.finalTotal}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Payment Method Selector */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <h2 className="text-base font-black text-slate-900 mb-3">
          Select Payment Method
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              id: 'UPI',
              name: 'UPI (GPay / PhonePe / Paytm)',
              sub: 'Fast, secure & instant confirmation',
              icon: Smartphone
            },
            {
              id: 'CASH',
              name: 'Pay Cash to Driver',
              sub: 'Pay at the end of delivery trip',
              icon: Banknote
            },
            {
              id: 'WALLET',
              name: `Transmaa Wallet (Bal: ₹${user.walletBalance || 0})`,
              sub: 'Instant one-click checkout',
              icon: Wallet
            },
            {
              id: 'CARD',
              name: 'Debit / Credit Card / Netbanking',
              sub: 'Visa, MasterCard, RuPay accepted',
              icon: CreditCard
            }
          ].map((m) => {
            const Icon = m.icon;
            const isSelected = paymentMethod === m.id;

            return (
              <div
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-orange-300 bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{m.name}</p>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{m.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm & Book CTA */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={handleBookNow}
        className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black text-base tracking-wide shadow-xl shadow-orange-600/35 flex items-center justify-center gap-2 group transition-all"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting with Nearest Driver...</span>
          </div>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            <span>Confirm & Book Transmaa Truck (₹{fareBreakdown?.finalTotal})</span>
          </>
        )}
      </button>
    </div>
  );
};
