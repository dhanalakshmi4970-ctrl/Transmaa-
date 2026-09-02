import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { VEHICLE_FLEET } from '../../services/mockData';
import { calculateFareBreakdown } from '../../services/api';
import {
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Star,
  Clock,
  Weight,
  Maximize2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const VehicleSelection = () => {
  const {
    selectedVehicle,
    setSelectedVehicle,
    distanceKm,
    helpersCount,
    pickupFloor,
    dropFloor,
    hasElevator,
    appliedCoupon,
    setBookingStep,
    setActiveTab
  } = useBooking();

  const handleNext = () => {
    setBookingStep(4);
    setActiveTab('REVIEW_PAY');
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setBookingStep(2);
            setActiveTab('GOODS_SCHEDULE');
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Goods & Schedule</span>
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Step 3 of 4: Select Truck
        </span>
      </div>

      {/* Fleet Title */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Choose Transmaa Fleet Vehicle
            </h2>
            <p className="text-xs text-slate-500">
              Transparent per-km fares calculated for ~{distanceKm} km route
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Guaranteed Lowest Rates</span>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="space-y-3.5">
          {VEHICLE_FLEET.map((veh) => {
            const isSelected = selectedVehicle.id === veh.id;
            const fare = calculateFareBreakdown({
              distanceKm,
              vehicle: veh,
              helpersCount,
              pickupFloor,
              dropFloor,
              hasElevator,
              appliedCoupon
            });

            return (
              <div
                key={veh.id}
                onClick={() => setSelectedVehicle(veh)}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/70 shadow-lg shadow-orange-500/15 ring-2 ring-orange-500/30'
                    : 'border-slate-200 hover:border-orange-300 bg-slate-50/70 hover:bg-white'
                }`}
              >
                {/* Popular Tag Badge */}
                {veh.isPopular && (
                  <div className="absolute -top-2.5 right-6 px-3 py-0.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>{veh.tag}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Image and details */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <img
                        src={veh.image}
                        alt={veh.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">
                          {veh.name}
                        </h3>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-orange-600 fill-orange-100 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        {veh.bestFor}
                      </p>

                      {/* Specs badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          <Weight className="w-3 h-3 text-orange-600" />
                          {veh.capacityKg} kg
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          <Maximize2 className="w-3 h-3 text-orange-600" />
                          {veh.dimensions}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          {veh.etaMins} mins away
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {veh.rating} ({veh.tripsDone})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Fare Price */}
                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold line-through">
                        ₹{fare ? fare.finalTotal + 350 : 0}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">
                        ₹{fare ? fare.finalTotal : 0}
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600">
                        Tolls & GST included
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedVehicle(veh)}
                      className={`mt-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proceed Button */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm tracking-wide shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 group transition-all"
      >
        <span>Proceed to Review & Pay (₹{calculateFareBreakdown({ distanceKm, vehicle: selectedVehicle, helpersCount, pickupFloor, dropFloor, hasElevator, appliedCoupon })?.finalTotal})</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
