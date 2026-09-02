```jsx
import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { GOODS_CATEGORIES } from '../../services/mockData';
import {
  Calendar,
  Clock,
  Package,
  Users,
  CheckCircle2,
  TreePine,
  Tv,
  Home,
  Building2,
  Boxes,
  ArrowRight,
  ArrowLeft,
  Weight
} from 'lucide-react';

export const GoodsAndSchedule = () => {
  const {
    shiftingDate,
    setShiftingDate,
    shiftingTime,
    setShiftingTime,
    selectedCategory,
    setSelectedCategory,
    customGoodsNote,
    setCustomGoodsNote,

    // NEW: Load Weight
    loadWeight,
    setLoadWeight,
    weightUnit,
    setWeightUnit,

    helpersCount,
    setHelpersCount,
    pickupFloor,
    setPickupFloor,
    dropFloor,
    setDropFloor,
    hasElevator,
    setHasElevator,
    setBookingStep,
    setActiveTab
  } = useBooking();

  const iconMap = {
    TreePine: TreePine,
    Tv: Tv,
    Home: Home,
    Building2: Building2,
    Boxes: Boxes
  };

  const datesList = [
    {
      label: 'Today',
      sub: 'Immediate Shift',
      value: 'Today'
    },
    {
      label: 'Tomorrow',
      sub: 'Scheduled',
      value: 'Tomorrow'
    },
    {
      label: 'This Weekend',
      sub: 'Saturday / Sunday',
      value: 'Weekend'
    }
  ];

  const timeSlots = [
    'Morning (08:00 AM - 10:00 AM)',
    'Midday (11:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 04:00 PM)',
    'Evening (05:00 PM - 07:00 PM)',
    'Night (08:00 PM - 10:00 PM)'
  ];

  const handleNext = () => {
    setBookingStep(3);
    setActiveTab('VEHICLE_SELECT');
  };

  return (
    <div className="space-y-6">

      {/* Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <button
          type="button"
          onClick={() => {
            setBookingStep(1);
            setActiveTab('HOME');
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Route</span>
        </button>

        <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 w-fit">
          Step 2 of 4: Goods & Schedule
        </span>

      </div>

      {/* =====================================================
          1. GOODS CATEGORY
      ====================================================== */}

      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">

        <div className="flex items-center gap-2.5 mb-2">

          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Package className="w-4 h-4" />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Select Type of Goods
            </h2>

            <p className="text-xs text-slate-500">
              Helps us recommend the best truck capacity and protective packing
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

          {GOODS_CATEGORIES.map((cat, index) => {

            const isSelected =
              selectedCategory.id === cat.id;

            const IconComponent =
              iconMap[cat.icon] || Package;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/60 shadow-md shadow-orange-500/10'
                    : 'border-slate-200 hover:border-orange-300 bg-slate-50/60 hover:bg-white'
                }`}
              >

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-2.5">

                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-orange-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className="text-[11px] font-bold text-slate-400">
                        Option {index + 1}
                      </span>

                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-orange-600 fill-orange-100" />
                    )}

                  </div>

                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>

                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">

                  <span className="font-semibold text-slate-600">
                    ⚖️ {cat.weightRange}
                  </span>

                  <span className="font-bold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-md">

                    {cat.recommendedVehicle === 'bolero_pickup'
                      ? 'Bolero Recommended'
                      : cat.recommendedVehicle === 'tata_ace'
                      ? 'Tata Ace Recommended'
                      : 'High Capacity'}

                  </span>

                </div>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            LOAD WEIGHT
        ====================================================== */}

        <div className="mt-5 pt-4 border-t border-slate-100">

          <div className="flex items-center gap-2 mb-2">

            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Weight className="w-4 h-4" />
            </div>

            <div>
              <label
                htmlFor="loadWeight"
                className="block text-xs font-black text-slate-700 uppercase tracking-wider"
              >
                Approximate Load Weight
              </label>

              <p className="text-[11px] text-slate-500">
                Enter the estimated total weight of your goods
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-2">

            <div className="relative flex-1">

              <input
                id="loadWeight"
                type="number"
                min="1"
                step="0.1"
                value={loadWeight}
                onChange={(e) => setLoadWeight(e.target.value)}
                placeholder="Enter load weight"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {weightUnit === 'kg' ? 'kg' : 't'}
              </span>

            </div>

            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="w-full sm:w-32 px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="kg">Kilograms</option>
              <option value="ton">Tonnes</option>
            </select>

          </div>

          <div className="mt-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">

            <p className="text-[11px] text-orange-800">
              💡 <strong>Tip:</strong> Give an approximate weight so we can recommend the right truck capacity and provide a better fare estimate.
            </p>

          </div>

        </div>

        {/* Custom Goods Note */}

        <div className="mt-4 pt-3 border-t border-slate-100">

          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Item Details or Special Instructions (Optional)
          </label>

          <input
            type="text"
            value={customGoodsNote}
            onChange={(e) =>
              setCustomGoodsNote(e.target.value)
            }
            placeholder="e.g. 1 double bed, 1 fridge, 1 washing machine, 6 cartons"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

        </div>

      </div>

      {/* =====================================================
          2. SHIFTING DATE & TIME
      ====================================================== */}

      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">

        <div className="flex items-center gap-2.5 mb-4">

          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Calendar className="w-4 h-4" />
          </div>

          <div>

            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Shifting Date & Time
            </h2>

            <p className="text-xs text-slate-500">
              Drivers arrive on time at your chosen slot
            </p>

          </div>

        </div>

        {/* Date Options */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">

          {datesList.map((d) => (

            <button
              key={d.value}
              type="button"
              onClick={() => setShiftingDate(d.value)}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                shiftingDate === d.value
                  ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-bold shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-medium'
              }`}
            >

              <div className="text-xs sm:text-sm font-black">
                {d.label}
              </div>

              <div className="text-[10px] text-slate-500 mt-0.5">
                {d.sub}
              </div>

            </button>

          ))}

        </div>

        {/* Time Slot Picker */}

        <div>

          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">

            <Clock className="w-3.5 h-3.5 text-orange-600" />

            <span>Select Preferred Shifting Slot</span>

          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

            {timeSlots.map((slot) => (

              <button
                key={slot}
                type="button"
                onClick={() => setShiftingTime(slot)}
                className={`px-3.5 py-2.5 rounded-xl border text-xs text-left font-semibold transition-all flex items-center justify-between ${
                  shiftingTime === slot
                    ? 'border-orange-500 bg-orange-500 text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >

                <span>{slot}</span>

                {shiftingTime === slot && (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}

              </button>

            ))}

          </div>

        </div>

      </div>

      {/* =====================================================
          3. HELPERS & FLOOR ASSISTANCE
      ====================================================== */}

      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">

        <div className="flex items-center gap-2.5 mb-4">

          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>

          <div>

            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Loading & Unloading Helpers
            </h2>

            <p className="text-xs text-slate-500">
              Professional labour to lift and carry heavy furniture
            </p>

          </div>

        </div>

        {/* Helpers count selector */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">

          {[
            {
              count: 0,
              label: 'Driver Only',
              sub: 'Self Loading'
            },
            {
              count: 1,
              label: '1 Helper',
              sub: '+ ₹350'
            },
            {
              count: 2,
              label: '2 Helpers',
              sub: '+ ₹700 (Best for 1-2 BHK)'
            }
          ].map((h) => (

            <button
              key={h.count}
              type="button"
              onClick={() => setHelpersCount(h.count)}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                helpersCount === h.count
                  ? 'border-orange-500 bg-orange-50 font-bold text-orange-950 shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
              }`}
            >

              <div className="text-xs sm:text-sm font-black">
                {h.label}
              </div>

              <div className="text-[10px] text-slate-500 mt-0.5">
                {h.sub}
              </div>

            </button>

          ))}

        </div>

        {/* Floor and Elevator */}

        {helpersCount > 0 && (

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div>

              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Pickup Floor
              </label>

              <select
                value={pickupFloor}
                onChange={(e) =>
                  setPickupFloor(Number(e.target.value))
                }
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
              >

                <option value={0}>Ground Floor (0)</option>
                <option value={1}>1st Floor</option>
                <option value={2}>2nd Floor</option>
                <option value={3}>3rd Floor</option>
                <option value={4}>4th+ Floor</option>

              </select>

            </div>

            <div>

              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Dropoff Floor
              </label>

              <select
                value={dropFloor}
                onChange={(e) =>
                  setDropFloor(Number(e.target.value))
                }
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
              >

                <option value={0}>Ground Floor (0)</option>
                <option value={1}>1st Floor</option>
                <option value={2}>2nd Floor</option>
                <option value={3}>3rd Floor</option>
                <option value={4}>4th+ Floor</option>

              </select>

            </div>

            <div className="flex items-center pt-4">

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">

                <input
                  type="checkbox"
                  checked={hasElevator}
                  onChange={(e) =>
                    setHasElevator(e.target.checked)
                  }
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600"
                />

                <span>Service Lift Available</span>

              </label>

            </div>

          </div>

        )}

      </div>

      {/* =====================================================
          CONTINUE CTA
      ====================================================== */}

      <button
        type="button"
        onClick={handleNext}
        className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm tracking-wide shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 group transition-all"
      >

        <span>Proceed to Select Truck</span>

        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

      </button>

    </div>
  );
};
```

