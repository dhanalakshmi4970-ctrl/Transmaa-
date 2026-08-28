import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { Truck, ShieldCheck, User, Wallet, Bell, Sparkles, PhoneCall } from 'lucide-react';

export const Navbar = () => {
  const { user, setAuthModalOpen, logout } = useAuth();
  const { activeTab, setActiveTab, setBookingStep, orders } = useBooking();

  const activeOrdersCount = orders.filter((o) => o.status !== 'COMPLETED').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => {
              setActiveTab('HOME');
              setBookingStep(1);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  TRANS<span className="text-orange-600">MAA</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-md">
                  Express
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 hidden sm:block -mt-1">
                India's Trusted Truck & House Shifting
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('HOME');
                setBookingStep(1);
              }}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'HOME' || activeTab === 'BOOKING'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Book Truck
            </button>
            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'ORDERS'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Bookings
              {activeOrdersCount > 0 && (
                <span className="w-5 h-5 bg-orange-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {activeOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('WALLET')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'WALLET'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>₹{user.walletBalance || 0}</span>
            </button>
          </nav>

          {/* Right Action Icons & User Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 24/7 Helpline */}
            <a
              href="tel:18001239999"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
              <span>1800-123-9999</span>
            </a>

            {/* Transmaa Gold Badge */}
            {user.isGoldMember && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>GOLD MEMBER</span>
              </div>
            )}

            {/* Auth Profile / Login Button */}
            {user && user.isLoggedIn ? (
              <div
                onClick={() => setActiveTab('PROFILE')}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-orange-300 bg-white hover:bg-orange-50/50 cursor-pointer transition-all shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name || 'Sai'}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-none">
                    +91 {user.phone ? user.phone.slice(-4) : '2345'}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-orange-500/25 transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
