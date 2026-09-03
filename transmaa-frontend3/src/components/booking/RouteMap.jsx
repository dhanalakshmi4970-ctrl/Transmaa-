import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { MapPin, Navigation, Clock, Shield, Fuel, CheckCircle } from 'lucide-react';

export const RouteMap = () => {
  const { pickupLocation, dropLocation, distanceKm } = useBooking();

  const estDurationHours = Math.floor(distanceKm / 45);
  const estDurationMins = Math.round(((distanceKm % 45) / 45) * 60);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200 overflow-hidden relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Route Overview & Live GPS Preview
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-orange-600" />
          <span>
            ~{estDurationHours > 0 ? `${estDurationHours} hr ` : ''}{estDurationMins} min
          </span>
        </div>
      </div>

      {/* Visual Simulated Route Canvas */}
      <div className="relative h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 text-white overflow-hidden shadow-inner flex flex-col justify-between">
        {/* Subtle Map Grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Route Line SVG Animation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 60 40 Q 180 120, 320 160"
            fill="none"
            stroke="rgba(255, 107, 0, 0.4)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 60 40 Q 180 120, 320 160"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
            strokeLinecap="round"
          />
        </svg>

        {/* Pickup Pin */}
        <div className="relative z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 w-fit">
          <div className="w-3 h-3 rounded-full bg-white border-2 border-slate-900 shadow-xs"></div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Pickup</p>
            <p className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[200px]">
              {pickupLocation.city || pickupLocation.name}
            </p>
          </div>
        </div>

        {/* Midpoint Truck Animation */}
        <div className="relative z-10 self-center bg-orange-600/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-lg flex items-center gap-1.5 animate-bounce">
          <span>🚚 Highway Transit</span>
          <span className="text-orange-200">({distanceKm} km)</span>
        </div>

        {/* Destination Pin */}
        <div className="relative z-10 self-end flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-orange-500/50 w-fit">
          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-xs"></div>
          <div>
            <p className="text-[10px] text-orange-400 font-bold uppercase">Destination</p>
            <p className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[200px]">
              {dropLocation.city || dropLocation.name}
            </p>
          </div>
        </div>
      </div>

      {/* Route highlights info row */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
        <div className="p-2 rounded-xl bg-slate-50">
          <p className="text-[10px] font-bold uppercase text-slate-400">Total Distance</p>
          <p className="text-sm font-black text-slate-800">{distanceKm} km</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50">
          <p className="text-[10px] font-bold uppercase text-slate-400">Tolls & Highway</p>
          <p className="text-sm font-black text-emerald-600">Fastag Included</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50">
          <p className="text-[10px] font-bold uppercase text-slate-400">Goods Insurance</p>
          <p className="text-sm font-black text-orange-600">₹5 Lakh Free</p>
        </div>
      </div>
    </div>
  );
};
