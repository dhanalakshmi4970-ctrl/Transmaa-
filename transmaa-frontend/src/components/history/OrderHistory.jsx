import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  PackageCheck,
  Truck,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  RotateCcw,
  Star,
  Download,
  Search,
  Filter
} from 'lucide-react';

export const OrderHistory = () => {
  const { orders, setActiveOrder, setActiveTab, setBookingStep } = useBooking();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'COMPLETED'
  const [search, setSearch] = useState('');
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  const filteredOrders = orders.filter((o) => {
    if (filter === 'ACTIVE' && o.status === 'COMPLETED') return false;
    if (filter === 'COMPLETED' && o.status !== 'COMPLETED') return false;
    if (
      search &&
      !o.id.toLowerCase().includes(search.toLowerCase()) &&
      !o.from.name.toLowerCase().includes(search.toLowerCase()) &&
      !o.to.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleTrackOrder = (order) => {
    setActiveOrder(order);
    setActiveTab('TRACKING');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            My Booking History
          </h2>
          <p className="text-xs text-slate-500">
            Track active shipments and view past invoices
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
          {['ALL', 'ACTIVE', 'COMPLETED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === f
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl border border-slate-200">
          <PackageCheck className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No bookings found</h3>
          <p className="text-xs text-slate-500 mt-1">
            You don't have any bookings matching this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-5 shadow-lg border border-slate-200 hover:border-orange-300 transition-all space-y-4"
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 font-mono">
                    #{ord.id}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      ord.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-orange-100 text-orange-800 animate-pulse'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-500">
                  {ord.date} • {ord.timeSlot ? ord.timeSlot.split(' ')[0] : 'Morning'}
                </div>
              </div>

              {/* Locations Route */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 shrink-0"></div>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {ord.from?.name || 'Sircilla, Telangana'}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0"></div>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {ord.to?.name || 'Hitech City, Hyderabad'}
                  </p>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-black text-slate-900 text-sm">
                    ₹{ord.totalFare}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {ord.vehicle?.name || 'Tata Ace'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {ord.status !== 'COMPLETED' ? (
                    <button
                      onClick={() => handleTrackOrder(ord)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20 text-xs transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Track Live</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setBookingStep(1);
                        setActiveTab('HOME');
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 rounded-xl font-bold flex items-center gap-1 text-xs transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Rebook</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
