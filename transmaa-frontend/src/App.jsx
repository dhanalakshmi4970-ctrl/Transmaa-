import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  Tag,
  Landmark,
  Fuel,
  RotateCw,
  HelpCircle,
  User,
  Phone,
  ArrowRight,
  ArrowUpDown,
  MapPin,
  Calendar,
  Clock,
  Package,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Search,
  X,
  AlertCircle,
  Share2,
  PhoneCall
} from 'lucide-react';

// --- EXACT BRAND CONSTANTS ---
const ORANGE = '#F37021';
const PEACH_BG = '#FEF3EC';

// --- MOCK DATA ---
const GOODS_TYPES = [
  'Timber/Plywood/Laminate',
  'Electrical/Electronics/Home Appliances',
  'General',
  'Building/Construction',
  'Catering/Restaurant/Event Management',
  'Machines/Equipments/Spare Parts/Metals',
  'Textile/Garments/Fashion Accessories',
  'Furniture/Home Furnishing',
  'House Shifting',
  'Ceramics/Sanitary/Hardware',
  'Paper/Packaging/Printed Material'
];

const TRUCK_TYPES = [
  {
    id: 'lcv',
    name: 'LCV (Light Commercial Vehicle)',
    capacity: '2.5 – 7 Tons',
    dimensions: '10 ft x 5.5 ft x 6 ft',
    basePrice: 1850,
    eta: '5 mins away',
    suitableFor: 'Small shifting, timber planks, appliances, catering kits',
    badge: 'Popular'
  },
  {
    id: 'open',
    name: 'Open Body Truck',
    capacity: '7 – 11 Tons',
    dimensions: '14 ft x 6.5 ft x 7 ft',
    basePrice: 3400,
    eta: '10 mins away',
    suitableFor: 'Agricultural loads, industrial equipment, timber logs',
    badge: 'High Demand'
  },
  {
    id: 'dumper',
    name: 'Dumper Truck',
    capacity: '9 – 16 Tons',
    dimensions: '16 ft x 7 ft x 6.5 ft',
    basePrice: 4800,
    eta: '12 mins away',
    suitableFor: 'Loose construction materials, sand, gravel, stone chips'
  },
  {
    id: 'tipper',
    name: 'Tipper Heavy Haul',
    capacity: '9 – 24 Tons',
    dimensions: '18 ft x 7.5 ft x 7 ft',
    basePrice: 6200,
    eta: '15 mins away',
    suitableFor: 'Mining, quarry, cement bags, heavy building materials'
  },
  {
    id: 'container',
    name: 'Closed Container',
    capacity: '9 – 30 Tons',
    dimensions: '20-32 ft HQ Closed',
    basePrice: 7900,
    eta: '20 mins away',
    suitableFor: 'FMCG, electronics, export-import, waterproof transit',
    badge: 'Weatherproof'
  },
  {
    id: 'trailer',
    name: 'Heavy Flatbed Trailer',
    capacity: '16 – 43 Tons',
    dimensions: '40 ft Flatbed / Highbed',
    basePrice: 11500,
    eta: '25 mins away',
    suitableFor: 'Oversized steel coils, infrastructure, heavy transformers'
  },
  {
    id: 'multiaxle',
    name: 'Multi-Axle Heavy Carrier',
    capacity: '20 – 36 Tons',
    dimensions: '28-32 ft Multi-Axle',
    basePrice: 9800,
    eta: '18 mins away',
    suitableFor: 'Interstate commercial logistics & bulk machinery'
  }
];

const PRESET_LOCATIONS = [
  'Sircilla, Telangana (Textile Hub)',
  'Hitech City, Hyderabad, Telangana',
  'Gachibowli, Hyderabad, Telangana',
  'Karimnagar Town, Telangana',
  'Secunderabad Railway Station, Hyderabad',
  'Jubilee Hills Checkpost, Hyderabad',
  'Kazipet / Warangal Industrial Area',
  'Nizamabad Market Yard, Telangana'
];

export default function App() {
  // --- NAVIGATION / SCREEN FLOW ---
  // Screens: 'LOGIN' | 'OTP' | 'HOME' | 'CHOOSE_TRUCK' | 'CONFIRM' | 'WAITING' | 'HISTORY'
  const [screen, setScreen] = useState('LOGIN');

  // Persistent Bottom Nav Active Tab ('loads' | 'sell_buy' | 'finance' | 'fuel' | 'privacy')
  const [navTab, setNavTab] = useState('loads');

  // --- CUSTOMER & BOOKING STATE ---
  const [customerName, setCustomerName] = useState('Sai');
  const [customerPhone, setCustomerPhone] = useState('9848012345');
  
  // OTP State
  const [otpValues, setOtpValues] = useState(['1', '2', '3', '4', '5', '6']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpError, setOtpError] = useState('');

  // Location State
  const [fromLocation, setFromLocation] = useState('Sircilla, Telangana');
  const [toLocation, setToLocation] = useState('Hitech city, Hyderabad');
  const [locationModalType, setLocationModalType] = useState(null); // 'FROM' | 'TO' | null
  const [searchLocationQuery, setSearchLocationQuery] = useState('');

  // Booking Form State
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [selectedGoodsType, setSelectedGoodsType] = useState(GOODS_TYPES[0]); // Timber/Plywood/Laminate
  const [selectedTruck, setSelectedTruck] = useState(TRUCK_TYPES[0]); // LCV

  // Booking History State
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 'TM-94281',
      from: 'Karimnagar Market, Telangana',
      to: 'Secunderabad Goods Shed, Hyderabad',
      goodsType: 'Electrical/Electronics/Home Appliances',
      date: '2026-08-25',
      time: '09:00 AM',
      truck: TRUCK_TYPES[0],
      fare: 2450,
      status: 'Delivered',
      statusColor: 'green'
    },
    {
      id: 'TM-88129',
      from: 'Warangal Logistics Park',
      to: 'Gachibowli, Hyderabad',
      goodsType: 'Building/Construction',
      date: '2026-08-26',
      time: '02:30 PM',
      truck: TRUCK_TYPES[1],
      fare: 3900,
      status: 'On the way',
      statusColor: 'orange'
    }
  ]);

  // Current Active Pending Order
  const [currentPendingOrder, setCurrentPendingOrder] = useState(null);

  // Help Modal State
  const [showHelpModal, setShowHelpModal] = useState(false);

  // --- OTP TIMER EFFECT ---
  useEffect(() => {
    let interval = null;
    if (screen === 'OTP' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen, otpTimer]);

  // --- SIMULATE WAITING TO ACCEPTED TRANSITION ---
  useEffect(() => {
    if (screen === 'WAITING' && currentPendingOrder) {
      const timer = setTimeout(() => {
        // Create accepted order
        const acceptedOrder = {
          ...currentPendingOrder,
          status: 'Accepted',
          statusColor: 'blue'
        };

        // Add to history at top
        setBookingHistory((prev) => [acceptedOrder, ...prev]);
        // Transition to History view
        setScreen('HISTORY');
        setNavTab('loads');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [screen, currentPendingOrder]);

  // --- HANDLERS ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpTimer(60);
    setOtpValues(['1', '2', '3', '4', '5', '6']);
    setScreen('OTP');
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    const entered = otpValues.join('');
    if (entered.length < 6) {
      setOtpError('Please enter full 6-digit OTP');
      return;
    }
    setOtpError('');
    setScreen('HOME');
  };

  const handleResendOtp = () => {
    if (otpTimer === 0) {
      setOtpTimer(60);
      setOtpValues(['1', '2', '3', '4', '5', '6']);
      setOtpError('');
    }
  };

  const handleOtpBoxChange = (index, value) => {
    if (isNaN(value)) return;
    const updated = [...otpValues];
    updated[index] = value.slice(-1);
    setOtpValues(updated);

    // Auto move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleLocationConfirm = () => {
    if (!fromLocation || !toLocation) {
      alert('Please select both pickup and dropoff locations');
      return;
    }
    setScreen('CHOOSE_TRUCK');
  };

  const handleBookPickup = () => {
    setScreen('CONFIRM');
  };

  const handleConfirmPickup = () => {
    const newOrder = {
      id: 'TM-' + Math.floor(10000 + Math.random() * 90000),
      from: fromLocation,
      to: toLocation,
      goodsType: selectedGoodsType,
      date: bookingDate,
      time: bookingTime,
      truck: selectedTruck,
      fare: selectedTruck.basePrice + 650, // includes toll and estimated per-km
      status: 'Order Waiting',
      statusColor: 'yellow',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCurrentPendingOrder(newOrder);
    setScreen('WAITING');
  };

  const handleCancelWaiting = () => {
    setCurrentPendingOrder(null);
    setScreen('CHOOSE_TRUCK');
  };

  const handleBottomNavClick = (tabId) => {
    setNavTab(tabId);
    if (tabId === 'loads') {
      if (screen === 'LOGIN' || screen === 'OTP') {
        // remain on auth
      } else {
        setScreen('HOME');
      }
    } else if (tabId === 'privacy') {
      alert('Transmaa Privacy & Terms: 100% verified carriers, encrypted payments, and 24/7 goods insurance under Transmaa Shield.');
    } else {
      alert(`${tabId.toUpperCase().replace('_', ' ')}: Feature active in your area. Contact Transmaa Fleet Support for partner rates.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 sm:p-4 font-sans text-slate-900 antialiased">
      {/* Mobile-First Device Frame (Max Width ~420px) */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-white sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-slate-800">
        
        {/* --- TOP BAR (Exact: Logo Left + Circular '?' Help Icon Right) --- */}
        <header className="bg-white border-b border-orange-100/80 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* TranSMAA Wordmark Logo */}
          <div
            onClick={() => {
              if (screen !== 'LOGIN' && screen !== 'OTP') setScreen('HOME');
            }}
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-black">
                Tran
              </span>
              <div className="relative inline-flex items-center">
                <span className="text-2xl font-black tracking-tight text-black">
                  S
                </span>
                {/* Orange Flame / Swoosh / Truck accent over S */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className="w-3.5 h-2 rounded-full transform -rotate-12 shadow-xs"
                    style={{ backgroundColor: ORANGE }}
                  ></div>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-black">
                MAA
              </span>
            </div>
          </div>

          {/* Right Header: Circular '?' Help Icon in Orange Outline */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="w-8 h-8 rounded-full border-2 border-[#F37021] text-[#F37021] flex items-center justify-center hover:bg-orange-50 active:scale-95 transition-all shadow-xs"
            title="Help & Support"
          >
            <HelpCircle className="w-4 h-4 stroke-[2.4]" />
          </button>
        </header>

        {/* --- MAIN SCROLLABLE CONTENT BODY --- */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col pb-20">

          {/* ======================================================== */}
          {/* SCREEN 1: WELCOME / CUSTOMER LOGIN                       */}
          {/* ======================================================== */}
          {screen === 'LOGIN' && (
            <div className="p-5 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              {/* Header Container in Soft Peach */}
              <div>
                <div
                  className="rounded-2xl p-6 text-center border border-orange-200/60 shadow-xs mb-6"
                  style={{ backgroundColor: PEACH_BG }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F37021] text-white shadow-md shadow-orange-500/30 mb-3">
                    <Truck className="w-8 h-8 stroke-[2.2]" />
                  </div>
                  <h1 className="text-2xl font-black text-black">
                    Tran<span className="text-[#F37021]">SMAA</span>
                  </h1>
                  <p className="text-lg font-bold text-slate-800 mt-1 flex items-center justify-center gap-1.5">
                    <span>Welcome</span>
                    <span className="text-rose-500">❤️</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Customer Truck & Household Shifting
                  </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Customer Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F37021]">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name (e.g. Sai)"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#F37021] rounded-xl text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F37021] text-sm shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Phone Field (+91) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number
                    </label>
                    <div className="flex rounded-xl border border-[#F37021] bg-white overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-[#F37021]">
                      <div className="flex items-center gap-1 px-3.5 bg-orange-50/70 border-r border-[#F37021]/30 text-slate-800 font-bold text-sm">
                        <Phone className="w-4 h-4 text-[#F37021]" />
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9848012345"
                        className="w-full px-3.5 py-3 bg-white text-black font-bold tracking-wider placeholder:text-gray-400 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-[11px] text-slate-600 font-medium">
                    ⚡ Demo: You will receive a 6-digit OTP on the next screen.
                  </div>
                </form>
              </div>

              {/* Login Button (Bottom Pill) */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F37021] hover:bg-[#D95D12] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 2: OTP VERIFICATION                               */}
          {/* ======================================================== */}
          {screen === 'OTP' && (
            <div className="p-5 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              <div>
                <button
                  type="button"
                  onClick={() => setScreen('LOGIN')}
                  className="flex items-center gap-1 text-xs font-bold text-[#F37021] mb-4 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>

                <div
                  className="rounded-2xl p-5 text-center border border-orange-200/60 shadow-xs mb-5"
                  style={{ backgroundColor: PEACH_BG }}
                >
                  <h2 className="text-xl font-black text-black">
                    OTP Verification
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Enter the 6-digit OTP sent to{' '}
                    <strong className="text-black">+91 {customerPhone}</strong>
                  </p>
                </div>

                {/* 6 Digit OTP Boxes */}
                <div className="flex justify-between gap-1.5 sm:gap-2 my-5">
                  {otpValues.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-box-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpBoxChange(idx, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold bg-white border border-[#F37021] rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#F37021] shadow-xs"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-xs font-bold text-rose-600 text-center mb-2">
                    {otpError}
                  </p>
                )}

                {/* Timer & Resend OTP */}
                <div className="text-center space-y-2 mt-4">
                  <p className="text-xs text-gray-500 font-semibold flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#F37021]" />
                    <span>
                      Resend code in:{' '}
                      <strong className="text-black font-mono font-bold">
                        {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:
                        {String(otpTimer % 60).padStart(2, '0')}
                      </strong>
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpTimer > 0}
                    className={`text-xs font-bold transition-colors ${
                      otpTimer === 0
                        ? 'text-[#F37021] hover:underline cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              {/* Verify OTP Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F37021] hover:bg-[#D95D12] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 3: HOME / LOCATION SELECTION ("Hi {name}")        */}
          {/* ======================================================== */}
          {screen === 'HOME' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              {/* Header Greeting matching exact Screenshot */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h2 className="text-xl font-black text-black">
                    Hi {customerName || 'sai'}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Where would you like to shift goods?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FEF3EC] border border-[#F37021]/30 flex items-center justify-center text-[#F37021] font-bold text-xs">
                  {customerName ? customerName.charAt(0).toUpperCase() : 'S'}
                </div>
              </div>

              {/* Main Route Card in Soft Peach (#FEF3EC) Container with Thin Orange Border */}
              <div
                className="rounded-xl p-4 border border-[#F37021]/40 shadow-sm relative space-y-3"
                style={{ backgroundColor: PEACH_BG }}
              >
                {/* "From" Input Container */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    From
                  </label>
                  <div
                    onClick={() => setLocationModalType('FROM')}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#F37021] cursor-pointer hover:bg-orange-50/20 transition-all shadow-xs"
                  >
                    {/* Circle icon (Black/Dark) */}
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-black truncate">
                        {fromLocation || 'Load from...'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Swap Icon Button */}
                <div className="flex items-center justify-center my-1 relative">
                  <div className="absolute inset-x-0 h-px bg-orange-200"></div>
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    className="relative z-10 w-8 h-8 rounded-full bg-white border border-[#F37021] text-[#F37021] shadow-xs flex items-center justify-center hover:scale-110 active:rotate-180 transition-all cursor-pointer"
                    title="Swap From and To locations"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* "To" Input Container */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    To
                  </label>
                  <div
                    onClick={() => setLocationModalType('TO')}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#F37021] cursor-pointer hover:bg-orange-50/20 transition-all shadow-xs"
                  >
                    {/* Orange Pin Icon */}
                    <div className="w-6 h-6 rounded-full bg-[#F37021] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-black truncate">
                        {toLocation || 'Unload to...'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  type="button"
                  onClick={handleLocationConfirm}
                  className="w-full mt-2 py-3 px-6 rounded-xl bg-[#F37021] hover:bg-[#D95D12] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Confirm</span>
                </button>
              </div>

              {/* Promo Banner 1: Transmaa Gold (10% off) */}
              <div className="rounded-xl p-3.5 bg-slate-900 text-white shadow-sm flex items-center justify-between border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F37021] text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-amber-400">
                      10% off on 2 Wheeler & Trucks
                    </p>
                    <p className="text-[10px] text-slate-300">
                      Subscribe to Transmaa Gold Now
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Transmaa Gold plan activated!')}
                  className="px-2.5 py-1 bg-amber-400 text-black text-[10px] font-black rounded-lg shrink-0 hover:bg-amber-300 transition-colors"
                >
                  Join
                </button>
              </div>

              {/* Promo Banner 2: Sale Up to 50% Off Graphic Card */}
              <div
                className="rounded-xl p-4 border border-orange-200/80 shadow-sm flex items-center justify-between relative overflow-hidden"
                style={{ backgroundColor: PEACH_BG }}
              >
                <div>
                  <span className="px-2 py-0.5 bg-[#F37021] text-white text-[9px] font-black uppercase tracking-wider rounded-md">
                    SALE
                  </span>
                  <h3 className="text-base font-black text-black mt-1">
                    UP TO 50% OFF
                  </h3>
                  <p className="text-[10px] text-slate-600">
                    House Shifting & Truck Loads
                  </p>
                </div>
                <div className="text-3xl">
                  🚚 📦
                </div>
              </div>

              {/* View History Shortcut */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setScreen('HISTORY')}
                  className="text-xs font-bold text-[#F37021] hover:underline"
                >
                  View My Past Bookings ({bookingHistory.length})
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 4: CHOOSE A TRUCK                                 */}
          {/* ======================================================== */}
          {screen === 'CHOOSE_TRUCK' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              {/* Back button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setScreen('HOME')}
                  className="flex items-center gap-1 text-xs font-bold text-[#F37021] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Location</span>
                </button>
                <span className="text-[11px] font-bold text-gray-500">
                  {fromLocation.split(',')[0]} ➔ {toLocation.split(',')[0]}
                </span>
              </div>

              {/* Date & Time Picker Container (Side by Side) */}
              <div
                className="rounded-xl p-3.5 border border-[#F37021]/30 shadow-xs"
                style={{ backgroundColor: PEACH_BG }}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Shifting Schedule
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* Date Picker */}
                  <div className="bg-white border border-[#F37021] rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                    <Calendar className="w-4 h-4 text-[#F37021] shrink-0" />
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-xs font-bold text-black bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* Time Picker */}
                  <div className="bg-white border border-[#F37021] rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                    <Clock className="w-4 h-4 text-[#F37021] shrink-0" />
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full text-xs font-bold text-black bg-transparent focus:outline-none"
                    >
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Goods Type Dropdown (Exact 11 Items) */}
              <div>
                <label className="block text-xs font-bold text-black mb-1.5 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#F37021]" />
                  <span>Goods Type</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedGoodsType}
                    onChange={(e) => setSelectedGoodsType(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-[#F37021] rounded-xl text-xs font-bold text-black appearance-none focus:outline-none focus:ring-2 focus:ring-[#F37021] shadow-xs cursor-pointer"
                  >
                    {GOODS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#F37021] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Select a Truck Section Title */}
              <div className="pt-1">
                <h3 className="text-sm font-black text-black">
                  Choose Truck Type
                </h3>
                <p className="text-[11px] text-gray-500">
                  Select payload capacity suited for your goods
                </p>
              </div>

              {/* Vertical List of Selectable Truck Type Cards */}
              <div className="space-y-2.5">
                {TRUCK_TYPES.map((truck) => {
                  const isSelected = selectedTruck.id === truck.id;

                  return (
                    <div
                      key={truck.id}
                      onClick={() => setSelectedTruck(truck)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#F37021] bg-orange-50/80 shadow-md ring-2 ring-[#F37021]/30'
                          : 'border-[#F37021]/30 bg-white hover:border-[#F37021] shadow-xs'
                      }`}
                    >
                      {/* Left: Icon & Specs */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#F37021] text-white shadow-xs'
                              : 'bg-orange-100 text-[#F37021]'
                          }`}
                        >
                          <Truck className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-black">
                              {truck.name}
                            </h4>
                            {truck.badge && (
                              <span className="px-1.5 py-0.2 bg-[#F37021] text-white text-[9px] font-bold rounded">
                                {truck.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-bold text-[#F37021] mt-0.5">
                            Payload: {truck.capacity}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {truck.dimensions} • {truck.eta}
                          </p>
                        </div>
                      </div>

                      {/* Right: Fare Estimate & Selection */}
                      <div className="text-right shrink-0">
                        <div className="text-sm font-black text-black">
                          ₹{truck.basePrice}
                        </div>
                        <div className="text-[9px] text-gray-400">Base fare</div>
                        {isSelected && (
                          <div className="mt-1 flex items-center justify-end">
                            <CheckCircle2 className="w-4 h-4 text-[#F37021] fill-orange-100" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky "Book Pickup" Button */}
              <div className="sticky bottom-16 pt-2 bg-white/90 backdrop-blur-xs pb-1">
                <button
                  type="button"
                  onClick={handleBookPickup}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F37021] hover:bg-[#D95D12] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Book Pickup (₹{selectedTruck.basePrice})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 5: CONFIRM DETAILS (BOOKING CONFIRMATION)          */}
          {/* ======================================================== */}
          {screen === 'CONFIRM' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setScreen('CHOOSE_TRUCK')}
                className="flex items-center gap-1 text-xs font-bold text-[#F37021] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Trucks</span>
              </button>

              <div className="text-center">
                <h2 className="text-lg font-black text-black">
                  Confirm Booking Details
                </h2>
                <p className="text-xs text-gray-500">
                  Please review your shifting consignment details
                </p>
              </div>

              {/* Summary Card (White background, thin orange border, soft shadow) */}
              <div className="bg-white rounded-xl p-4 border border-[#F37021] shadow-md space-y-4">
                {/* Truck Info Header */}
                <div
                  className="p-3 rounded-xl flex items-center gap-3 border border-orange-200/60"
                  style={{ backgroundColor: PEACH_BG }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F37021] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-black">
                      {selectedTruck.name}
                    </h3>
                    <p className="text-[11px] font-bold text-[#F37021]">
                      Capacity: {selectedTruck.capacity}
                    </p>
                  </div>
                </div>

                {/* Route Full Addresses */}
                <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      A
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        From (Pickup Address)
                      </p>
                      <p className="font-bold text-black">{fromLocation}</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-dashed border-orange-300 ml-2.5 h-3"></div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#F37021] text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      B
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#F37021]">
                        To (Dropoff Address)
                      </p>
                      <p className="font-bold text-black">{toLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Shifting Specifics Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-orange-50/60 border border-orange-200/60">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">
                      Date & Time
                    </p>
                    <p className="font-bold text-black mt-0.5">
                      {bookingDate} • {bookingTime}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-orange-50/60 border border-orange-200/60">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">
                      Goods Category
                    </p>
                    <p className="font-bold text-black mt-0.5 truncate">
                      {selectedGoodsType}
                    </p>
                  </div>
                </div>

                {/* Fare & Guarantee */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-500">
                      Estimated Consignment Fare
                    </span>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Transmaa Shield Covered</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#F37021]">
                      ₹{selectedTruck.basePrice + 650}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky "Confirm Pickup" Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmPickup}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F37021] hover:bg-[#D95D12] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Pickup</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 6: WAITING FOR TRANSMAA CONFIRMATION               */}
          {/* ======================================================== */}
          {screen === 'WAITING' && (
            <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300">
              {/* Radar Pulsing Loading Animation */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-radar-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-orange-500/30 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-xl shadow-orange-500/40 animate-float">
                  <Truck className="w-10 h-10 stroke-[2.2]" />
                </div>
              </div>

              <div className="space-y-2 max-w-xs">
                <h2 className="text-lg font-black text-black">
                  Waiting for Transmaa confirmation...
                </h2>
                <p className="text-xs text-gray-500">
                  Matching with nearest verified{' '}
                  <strong className="text-[#F37021]">{selectedTruck.name}</strong>{' '}
                  near {fromLocation.split(',')[0]}
                </p>
              </div>

              {/* Loading Spinner Dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F37021] animate-bounce"></div>
                <div
                  className="w-2.5 h-2.5 rounded-full bg-[#F37021] animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-2.5 h-2.5 rounded-full bg-[#F37021] animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>

              {/* Cancel Option */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleCancelWaiting}
                  className="text-xs font-bold text-rose-600 hover:underline px-4 py-2 bg-rose-50 rounded-xl border border-rose-200 cursor-pointer"
                >
                  Cancel Booking Request
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 7: BOOKING HISTORY                                */}
          {/* ======================================================== */}
          {screen === 'HISTORY' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-black">
                    Booking History
                  </h2>
                  <p className="text-xs text-gray-500">
                    Track live trips and past consignments
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setScreen('HOME')}
                  className="text-xs font-bold text-[#F37021] bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 hover:bg-orange-100 cursor-pointer"
                >
                  + New Load
                </button>
              </div>

              {/* Bookings List */}
              <div className="space-y-3">
                {bookingHistory.map((item) => {
                  // Badge color logic
                  let badgeBg = 'bg-gray-100 text-gray-800';
                  if (item.status === 'Order Waiting') badgeBg = 'bg-amber-100 text-amber-800 border-amber-300';
                  if (item.status === 'Accepted') badgeBg = 'bg-blue-100 text-blue-800 border-blue-300';
                  if (item.status === 'On the way') badgeBg = 'bg-orange-100 text-orange-800 border-orange-300';
                  if (item.status === 'Delivered') badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 border border-[#F37021]/30 shadow-xs space-y-3 hover:border-[#F37021] transition-all"
                    >
                      {/* Top Row: ID & Status Badge */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-black text-black font-mono">
                          #{item.id}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${badgeBg}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Route */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-black shrink-0"></div>
                          <p className="font-bold text-black truncate">{item.from}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#F37021] shrink-0"></div>
                          <p className="font-bold text-black truncate">{item.to}</p>
                        </div>
                      </div>

                      {/* Details Matrix */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <div>
                          <p className="font-semibold text-gray-600">
                            {item.truck?.name || 'LCV'}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {item.date} • {item.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-black text-sm">
                            ₹{item.fare}
                          </p>
                          <p className="text-[9px] text-gray-400">{item.goodsType}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* --- PERSISTENT BOTTOM NAVIGATION BAR (Exact: 5 Items) --- */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-orange-100 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
          {/* 1. Loads (Truck Icon) */}
          <button
            type="button"
            onClick={() => handleBottomNavClick('loads')}
            className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-lg transition-all cursor-pointer ${
              navTab === 'loads' ? 'text-[#F37021] font-bold' : 'text-gray-500 font-medium hover:text-black'
            }`}
          >
            <Truck className={`w-5 h-5 ${navTab === 'loads' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Loads</span>
          </button>

          {/* 2. Sell & Buy (Tag Icon) */}
          <button
            type="button"
            onClick={() => handleBottomNavClick('sell_buy')}
            className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-lg transition-all cursor-pointer ${
              navTab === 'sell_buy' ? 'text-[#F37021] font-bold' : 'text-gray-500 font-medium hover:text-black'
            }`}
          >
            <Tag className={`w-5 h-5 ${navTab === 'sell_buy' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Sell & Buy</span>
          </button>

          {/* 3. Finance & Insurance (Bank/Landmark Icon) */}
          <button
            type="button"
            onClick={() => handleBottomNavClick('finance')}
            className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-lg transition-all cursor-pointer ${
              navTab === 'finance' ? 'text-[#F37021] font-bold' : 'text-gray-500 font-medium hover:text-black'
            }`}
          >
            <Landmark className={`w-5 h-5 ${navTab === 'finance' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Finance</span>
          </button>

          {/* 4. Fuel (Fuel Pump Icon) */}
          <button
            type="button"
            onClick={() => handleBottomNavClick('fuel')}
            className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-lg transition-all cursor-pointer ${
              navTab === 'fuel' ? 'text-[#F37021] font-bold' : 'text-gray-500 font-medium hover:text-black'
            }`}
          >
            <Fuel className={`w-5 h-5 ${navTab === 'fuel' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Fuel</span>
          </button>

          {/* 5. Highlighted Orange Circular Sync / Privacy · Terms Icon */}
          <button
            type="button"
            onClick={() => handleBottomNavClick('privacy')}
            className="flex flex-col items-center justify-center py-0.5 px-1 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <RotateCw className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <span className="text-[9px] mt-0.5 text-gray-500 font-semibold truncate">
              Privacy · Terms
            </span>
          </button>
        </nav>

        {/* --- LOCATION SELECTION SEARCH MODAL --- */}
        {locationModalType && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
            <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-3xl p-5 max-h-[80vh] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-sm font-black text-black">
                  Select {locationModalType === 'FROM' ? 'Pickup (From)' : 'Dropoff (To)'} Location
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setLocationModalType(null);
                    setSearchLocationQuery('');
                  }}
                  className="p-1 text-gray-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative my-3">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchLocationQuery}
                  onChange={(e) => setSearchLocationQuery(e.target.value)}
                  placeholder="Search city, area, hub..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-[#F37021] rounded-xl text-xs font-semibold text-black focus:outline-none focus:bg-white"
                  autoFocus
                />
              </div>

              {/* Locations List */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {PRESET_LOCATIONS.filter((loc) =>
                  loc.toLowerCase().includes(searchLocationQuery.toLowerCase())
                ).map((loc, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (locationModalType === 'FROM') setFromLocation(loc);
                      if (locationModalType === 'TO') setToLocation(loc);
                      setLocationModalType(null);
                      setSearchLocationQuery('');
                    }}
                    className="p-2.5 rounded-xl border border-gray-100 hover:border-[#F37021] hover:bg-orange-50/50 cursor-pointer flex items-center gap-2 text-xs font-bold text-slate-800 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#F37021] shrink-0" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- HELP / SUPPORT MODAL --- */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white w-full max-w-[360px] rounded-3xl p-6 shadow-2xl border border-orange-100 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#F37021] flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6 stroke-[2.4]" />
              </div>

              <div>
                <h3 className="text-base font-black text-black">
                  Transmaa Help & Support
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  24/7 dedicated customer assistance for house shifting and load logistics.
                </p>
              </div>

              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-xs font-bold text-slate-800">
                📞 Toll-Free Helpline: 1800-123-9999
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#F37021] text-white text-xs font-bold shadow-md shadow-orange-500/25"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
