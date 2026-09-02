import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { POPULAR_LOCATIONS } from '../../services/mockData';
import {
  MapPin,
  ArrowUpDown,
  Search,
  Sparkles,
  Truck,
  Building2,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  Navigation
} from 'lucide-react';

export const LocationPicker = () => {
  const { user } = useAuth();
  const {
    pickupLocation,
    setPickupLocation,
    dropLocation,
    setDropLocation,
    swapLocations,
    distanceKm,
    setBookingStep,
    setActiveTab
  } = useBooking();

  const [activeSelectType, setActiveSelectType] = useState(null); // 'PICKUP' | 'DROP' | null
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = POPULAR_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (loc) => {
    if (activeSelectType === 'PICKUP') {
      setPickupLocation(loc);
    } else if (activeSelectType === 'DROP') {
      setDropLocation(loc);
    }
    setActiveSelectType(null);
    setSearchQuery('');
  };

  const handleConfirmRoute = () => {
    // Proceed to Step 2: Goods & Schedule
    setBookingStep(2);
    setActiveTab('GOODS_SCHEDULE');
  };

  return (
    <div className="space-y-5">
      {/* Personalized Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hi <span className="text-orange-600 capitalize">{user.name || 'sai'}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Where are you shifting your goods today?
          </p>
        </div>

        {/* Live Distance Pill */}
        <div className="bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
          <Navigation className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
          <span className="text-xs font-bold text-orange-800">
            ~{distanceKm} km trip
          </span>
        </div>
      </div>

      {/* Main Route Booking Card (Matches Screen 2 in Design) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/80 relative">
        <div className="relative space-y-3">
          {/* Pickup Input Card */}
          <div
            onClick={() => setActiveSelectType('PICKUP')}
            className="group cursor-pointer p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/40 border border-slate-200 hover:border-orange-300 transition-all"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>From</span>
              <span className="text-orange-600 font-semibold text-[10px] group-hover:underline">
                Change
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <div className="w-3 h-3 rounded-full border-2 border-white bg-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {pickupLocation ? pickupLocation.name : 'Load from...'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {pickupLocation ? pickupLocation.address : 'Select pickup point'}
                </p>
              </div>
            </div>
          </div>

          {/* Swap Button & Connector */}
          <div className="relative flex items-center justify-center my-0.5">
            <div className="absolute inset-x-0 h-px bg-dashed border-t border-dashed border-slate-200"></div>
            <button
              type="button"
              onClick={swapLocations}
              title="Swap pickup and drop locations"
              className="relative z-10 w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-600 hover:text-orange-600 hover:border-orange-500 shadow-md flex items-center justify-center transition-all hover:rotate-180 duration-300"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Dropoff Input Card */}
          <div
            onClick={() => setActiveSelectType('DROP')}
            className="group cursor-pointer p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/40 border border-slate-200 hover:border-orange-300 transition-all"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>To</span>
              <span className="text-orange-600 font-semibold text-[10px] group-hover:underline">
                Change
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/25">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {dropLocation ? dropLocation.name : 'Unload to...'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {dropLocation ? dropLocation.address : 'Select delivery point'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Location Chips */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Popular Shifting Hubs
          </p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setDropLocation(loc)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  dropLocation.id === loc.id
                    ? 'bg-orange-600 text-white border-orange-600 font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300 font-medium'
                }`}
              >
                📍 {loc.city}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button matching exact Screenshot */}
        <button
          type="button"
          onClick={handleConfirmRoute}
          className="w-full mt-5 py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-900 active:bg-orange-600 text-white font-black text-sm tracking-wide shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group transition-all"
        >
          <span>Confirm Route</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Promotional Banners matching Screenshot */}
      <div className="space-y-3">
        {/* Transmaa Gold Promo Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black text-amber-400">
                  10% OFF on 2 Wheeler & Trucks
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Subscribe to Transmaa Gold Now
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('PROFILE')}
            className="relative z-10 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg shadow-xs transition-colors shrink-0"
          >
            Upgrade
          </button>
          {/* Subtle Background Glow */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-orange-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Sale House Shifting Graphic Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="inline-block px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider rounded-md mb-1">
                MEGA MONSOON OFFER
              </span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                SALE UP TO <span className="text-amber-400">50% OFF</span>
              </h3>
              <p className="text-xs text-purple-200 mt-0.5">
                Use code <span className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">TRANSMAA50</span> on house shifting
              </p>
            </div>
            <div className="text-3xl sm:text-4xl filter drop-shadow-md">
              🚚 📦
            </div>
          </div>
        </div>
      </div>

      {/* Location Search Modal Sheet */}
      {activeSelectType && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Select {activeSelectType === 'PICKUP' ? 'Pickup (From)' : 'Drop (To)'} Location
              </h3>
              <button
                onClick={() => setActiveSelectType(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>

            {/* Search Input */}
            <div className="relative my-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, area, pincode (e.g. Sircilla, Hitech City)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                autoFocus
              />
            </div>

            {/* Locations List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50/50 cursor-pointer transition-all flex items-start gap-3"
                >
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{loc.name}</p>
                    <p className="text-xs text-slate-500">{loc.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
