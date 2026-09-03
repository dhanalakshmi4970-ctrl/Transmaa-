import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Wallet,
  Sparkles,
  MapPin,
  Plus,
  ShieldCheck,
  LogOut,
  CreditCard,
  CheckCircle2,
  Phone,
  Gift
} from 'lucide-react';

export const WalletAndProfile = () => {
  const { user, topupWallet, logout, setAuthModalOpen } = useAuth();
  const [topupAmount, setTopupAmount] = useState('500');
  const [showTopupSuccess, setShowTopupSuccess] = useState(false);

  const handleTopup = (e) => {
    e.preventDefault();
    const amt = Number(topupAmount);
    if (amt > 0) {
      topupWallet(amt);
      setShowTopupSuccess(true);
      setTimeout(() => setShowTopupSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. User Profile Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
              {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">{user.name || 'Sai'}</h2>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-black uppercase rounded-md">
                  Customer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>+91 {user.phone || '9848012345'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* 2. Transmaa Gold Membership Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h3 className="text-base font-black text-amber-400 uppercase tracking-wide">
                Transmaa Gold Member
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Enjoy 10% discount on all bookings, zero cancellation fee & priority fleet dispatch.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-bold text-slate-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>10% Off Every Trip</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>₹5 Lakh Transit Insurance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Dedicated Shift Manager</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Cancellation Charges</span>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg self-start sm:self-center">
            Active Tier
          </div>
        </div>
      </div>

      {/* 3. Transmaa Wallet Recharge */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Transmaa Cash Wallet</h3>
              <p className="text-xs text-slate-500">1-Click instant payment for logistics</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Available Balance</p>
            <p className="text-2xl font-black text-emerald-600">₹{user.walletBalance || 0}</p>
          </div>
        </div>

        {/* Recharge Form */}
        <form onSubmit={handleTopup} className="space-y-3 pt-3 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase">
            Add Money to Wallet
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
              placeholder="Amount (₹)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-md shadow-orange-500/25"
            >
              Add Cash
            </button>
          </div>

          {/* Quick Amount Chips */}
          <div className="flex gap-2">
            {['500', '1000', '2000', '5000'].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setTopupAmount(amt)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  topupAmount === amt
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300'
                }`}
              >
                + ₹{amt}
              </button>
            ))}
          </div>

          {showTopupSuccess && (
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>₹{topupAmount} added successfully to your Transmaa Wallet!</span>
            </p>
          )}
        </form>
      </div>

      {/* 4. Saved Addresses */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-600" />
          <span>Saved Favorite Addresses</span>
        </h3>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0">
              🏠
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Home Address (Sircilla)</p>
              <p className="text-xs text-slate-500">Gandhi Chowk, Textile Town, Sircilla, Telangana 505301</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
              🏢
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Office Address (Hyderabad)</p>
              <p className="text-xs text-slate-500">Mindspace IT Park, Building 12, Hitech City, Hyderabad 500081</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
