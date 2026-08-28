import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

// ---------------------------------------------------------
// BRAND
// ---------------------------------------------------------
const ORANGE = '#F37021';
const PEACH_BG = '#FEF3EC';

// ---------------------------------------------------------
// DATA
// ---------------------------------------------------------
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
  'Paper/Packaging/Printed Material',
];

const TRUCK_TYPES = [
  {
    id: 'lcv',
    name: 'LCV (Light Commercial Vehicle)',
    capacity: '2.5 – 7 Tons',
    dimensions: '10 ft x 5.5 ft x 6 ft',
    basePrice: 1850,
    eta: '5 mins away',
    suitableFor:
      'Small shifting, timber planks, appliances, catering kits',
    badge: 'Popular',
  },
  {
    id: 'open',
    name: 'Open Body Truck',
    capacity: '7 – 11 Tons',
    dimensions: '14 ft x 6.5 ft x 7 ft',
    basePrice: 3400,
    eta: '10 mins away',
    suitableFor:
      'Agricultural loads, industrial equipment, timber logs',
    badge: 'High Demand',
  },
  {
    id: 'dumper',
    name: 'Dumper Truck',
    capacity: '9 – 16 Tons',
    dimensions: '16 ft x 7 ft x 6.5 ft',
    basePrice: 4800,
    eta: '12 mins away',
    suitableFor:
      'Loose construction materials, sand, gravel, stone chips',
  },
  {
    id: 'tipper',
    name: 'Tipper Heavy Haul',
    capacity: '9 – 24 Tons',
    dimensions: '18 ft x 7.5 ft x 7 ft',
    basePrice: 6200,
    eta: '15 mins away',
    suitableFor:
      'Mining, quarry, cement bags, heavy building materials',
  },
  {
    id: 'container',
    name: 'Closed Container',
    capacity: '9 – 30 Tons',
    dimensions: '20-32 ft HQ Closed',
    basePrice: 7900,
    eta: '20 mins away',
    suitableFor:
      'FMCG, electronics, export-import, waterproof transit',
    badge: 'Weatherproof',
  },
  {
    id: 'trailer',
    name: 'Heavy Flatbed Trailer',
    capacity: '16 – 43 Tons',
    dimensions: '40 ft Flatbed / Highbed',
    basePrice: 11500,
    eta: '25 mins away',
    suitableFor:
      'Oversized steel coils, infrastructure, heavy transformers',
  },
  {
    id: 'multiaxle',
    name: 'Multi-Axle Heavy Carrier',
    capacity: '20 – 36 Tons',
    dimensions: '28-32 ft Multi-Axle',
    basePrice: 9800,
    eta: '18 mins away',
    suitableFor:
      'Interstate commercial logistics & bulk machinery',
  },
];

const PRESET_LOCATIONS = [
  'Sircilla, Telangana (Textile Hub)',
  'Hitech City, Hyderabad, Telangana',
  'Gachibowli, Hyderabad, Telangana',
  'Karimnagar Town, Telangana',
  'Secunderabad Railway Station, Hyderabad',
  'Jubilee Hills Checkpost, Hyderabad',
  'Kazipet / Warangal Industrial Area',
  'Nizamabad Market Yard, Telangana',
];

// ---------------------------------------------------------
// APP
// ---------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState('LOGIN');

  const [navTab, setNavTab] = useState('loads');

  const [customerName, setCustomerName] = useState('Sai');
  const [customerPhone, setCustomerPhone] = useState('9848012345');

  // OTP
  const [otpValues, setOtpValues] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]);
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpError, setOtpError] = useState('');

  // Locations
  const [fromLocation, setFromLocation] =
    useState('Sircilla, Telangana');
  const [toLocation, setToLocation] =
    useState('Hitech city, Hyderabad');

  const [locationModalType, setLocationModalType] =
    useState(null);

  const [searchLocationQuery, setSearchLocationQuery] =
    useState('');

  // Booking
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });

  const [bookingTime, setBookingTime] =
    useState('10:00 AM');

  const [selectedGoodsType, setSelectedGoodsType] =
    useState(GOODS_TYPES[0]);

  const [selectedTruck, setSelectedTruck] =
    useState(TRUCK_TYPES[0]);

  // History
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 'TM-94281',
      from: 'Karimnagar Market, Telangana',
      to: 'Secunderabad Goods Shed, Hyderabad',
      goodsType:
        'Electrical/Electronics/Home Appliances',
      date: '2026-08-25',
      time: '09:00 AM',
      truck: TRUCK_TYPES[0],
      fare: 2450,
      status: 'Delivered',
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
    },
  ]);

  const [currentPendingOrder, setCurrentPendingOrder] =
    useState(null);

  const [showHelpModal, setShowHelpModal] =
    useState(false);

  // -------------------------------------------------------
  // OTP TIMER
  // -------------------------------------------------------
  useEffect(() => {
    let interval;

    if (screen === 'OTP' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [screen, otpTimer]);

  // -------------------------------------------------------
  // WAITING -> ACCEPTED
  // -------------------------------------------------------
  useEffect(() => {
    if (screen !== 'WAITING' || !currentPendingOrder) {
      return;
    }

    const timer = setTimeout(() => {
      const acceptedOrder = {
        ...currentPendingOrder,
        status: 'Accepted',
      };

      setBookingHistory((prev) => [
        acceptedOrder,
        ...prev,
      ]);

      setScreen('HISTORY');
      setNavTab('loads');
    }, 4000);

    return () => clearTimeout(timer);
  }, [screen, currentPendingOrder]);

  // -------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------
  const handleLoginSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (
      !customerPhone ||
      customerPhone.length !== 10
    ) {
      alert(
        'Please enter a valid 10-digit mobile number'
      );
      return;
    }

    setOtpTimer(60);

    setOtpValues([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);

    setOtpError('');
    setScreen('OTP');
  };

  // -------------------------------------------------------
  // OTP
  // -------------------------------------------------------
  const handleVerifyOtp = (e) => {
    if (e) {
      e.preventDefault();
    }

    const entered = otpValues.join('');

    if (entered.length !== 6) {
      setOtpError(
        'Please enter full 6-digit OTP'
      );
      return;
    }

    setOtpError('');
    setScreen('HOME');
    setNavTab('loads');
  };

  const handleResendOtp = () => {
    if (otpTimer !== 0) {
      return;
    }

    setOtpTimer(60);

    setOtpValues([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);

    setOtpError('');
  };

  const handleOtpBoxChange = (index, value) => {
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const updated = [...otpValues];

    updated[index] = value;

    setOtpValues(updated);

    if (value && index < 5) {
      const nextInput =
        document.getElementById(
          `otp-box-${index + 1}`
        );

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (
      e.key === 'Backspace' &&
      !otpValues[index] &&
      index > 0
    ) {
      const previousInput =
        document.getElementById(
          `otp-box-${index - 1}`
        );

      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  // -------------------------------------------------------
  // LOCATIONS
  // -------------------------------------------------------
  const handleSwapLocations = () => {
    const temp = fromLocation;

    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleLocationConfirm = () => {
    if (!fromLocation || !toLocation) {
      alert(
        'Please select both pickup and dropoff locations'
      );
      return;
    }

    setScreen('CHOOSE_TRUCK');
  };

  // -------------------------------------------------------
  // BOOKING
  // -------------------------------------------------------
  const handleBookPickup = () => {
    setScreen('CONFIRM');
  };

  const handleConfirmPickup = () => {
    const newOrder = {
      id:
        'TM-' +
        Math.floor(
          10000 + Math.random() * 90000
        ),
      from: fromLocation,
      to: toLocation,
      goodsType: selectedGoodsType,
      date: bookingDate,
      time: bookingTime,
      truck: selectedTruck,
      fare: selectedTruck.basePrice + 650,
      status: 'Order Waiting',
      createdAt: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),
    };

    setCurrentPendingOrder(newOrder);
    setScreen('WAITING');
  };

  const handleCancelWaiting = () => {
    setCurrentPendingOrder(null);
    setScreen('CHOOSE_TRUCK');
  };

  // -------------------------------------------------------
  // BOTTOM NAV
  // -------------------------------------------------------
  const handleBottomNavClick = (tabId) => {
    setNavTab(tabId);

    if (tabId === 'loads') {
      if (
        screen !== 'LOGIN' &&
        screen !== 'OTP'
      ) {
        setScreen('HOME');
      }

      return;
    }

    if (tabId === 'privacy') {
      alert(
        'Transmaa Privacy & Terms: 100% verified carriers, encrypted payments, and 24/7 goods insurance under Transmaa Shield.'
      );

      return;
    }

    alert(
      `${tabId
        .toUpperCase()
        .replace('_', ' ')}: Feature active in your area. Contact Transmaa Fleet Support for partner rates.`
    );
  };

  // -------------------------------------------------------
  // STATUS BADGE
  // -------------------------------------------------------
  const getStatusClass = (status) => {
    switch (status) {
      case 'Order Waiting':
        return 'bg-amber-100 text-amber-800 border-amber-300';

      case 'Accepted':
        return 'bg-blue-100 text-blue-800 border-blue-300';

      case 'On the way':
        return 'bg-orange-100 text-orange-800 border-orange-300';

      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';

      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="min-h-screen w-full bg-slate-100 font-sans text-slate-900 antialiased">
      
      {/* ===================================================
          RESPONSIVE APP CONTAINER
          =================================================== */}
      <div className="min-h-screen w-full bg-white">
        
        {/* =================================================
            HEADER
            ================================================= */}
        <header className="sticky top-0 z-40 border-b border-orange-100 bg-white shadow-sm">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            
            {/* LOGO */}
            <button
              type="button"
              onClick={() => {
                if (
                  screen !== 'LOGIN' &&
                  screen !== 'OTP'
                ) {
                  setScreen('HOME');
                  setNavTab('loads');
                }
              }}
              className="flex items-center select-none"
            >
              <span className="text-2xl font-black tracking-tight text-black sm:text-3xl">
                Tran
              </span>

              <span className="relative text-2xl font-black tracking-tight text-black sm:text-3xl">
                S

                <span
                  className="absolute left-1/2 top-0 h-2 w-4 -translate-x-1/2 -rotate-12 rounded-full"
                  style={{
                    backgroundColor: ORANGE,
                  }}
                />
              </span>

              <span className="text-2xl font-black tracking-tight text-black sm:text-3xl">
                MAA
              </span>
            </button>

            {/* DESKTOP HEADER INFO */}
            <div className="hidden items-center gap-6 md:flex">
              {screen !== 'LOGIN' &&
                screen !== 'OTP' && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setScreen('HOME')
                      }
                      className={`text-sm font-bold ${
                        navTab === 'loads'
                          ? 'text-[#F37021]'
                          : 'text-slate-500'
                      }`}
                    >
                      Loads
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleBottomNavClick(
                          'sell_buy'
                        )
                      }
                      className="text-sm font-semibold text-slate-500 hover:text-[#F37021]"
                    >
                      Sell & Buy
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleBottomNavClick(
                          'finance'
                        )
                      }
                      className="text-sm font-semibold text-slate-500 hover:text-[#F37021]"
                    >
                      Finance
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleBottomNavClick('fuel')
                      }
                      className="text-sm font-semibold text-slate-500 hover:text-[#F37021]"
                    >
                      Fuel
                    </button>
                  </>
                )}
            </div>

            {/* HELP */}
            <button
              type="button"
              onClick={() =>
                setShowHelpModal(true)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F37021] text-[#F37021] transition hover:bg-orange-50 active:scale-95"
              title="Help & Support"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* =================================================
            MAIN CONTENT
            ================================================= */}
        <main className="w-full">
          <div className="mx-auto w-full max-w-7xl px-3 pb-28 pt-4 sm:px-5 sm:pt-6 lg:px-8">
            
            {/* =================================================
                LOGIN
                ================================================= */}
            {screen === 'LOGIN' && (
              <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-md flex-col justify-center">
                
                <div
                  className="mb-6 rounded-3xl border border-orange-200 p-6 text-center shadow-sm sm:p-8"
                  style={{
                    backgroundColor: PEACH_BG,
                  }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F37021] text-white shadow-lg shadow-orange-500/30">
                    <Truck className="h-9 w-9" />
                  </div>

                  <h1 className="text-3xl font-black text-black sm:text-4xl">
                    Tran
                    <span className="text-[#F37021]">
                      SMAA
                    </span>
                  </h1>

                  <p className="mt-2 flex items-center justify-center gap-2 text-lg font-bold text-slate-800">
                    Welcome
                    <span>❤️</span>
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-600">
                    Customer Truck & Household
                    Shifting
                  </p>
                </div>

                <form
                  onSubmit={handleLoginSubmit}
                  className="space-y-5"
                >
                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Customer Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F37021]" />

                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) =>
                          setCustomerName(
                            e.target.value
                          )
                        }
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-[#F37021] bg-white py-3.5 pl-12 pr-4 text-sm font-semibold text-black outline-none transition focus:ring-2 focus:ring-[#F37021]"
                      />
                    </div>
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Phone Number
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-[#F37021] bg-white focus-within:ring-2 focus-within:ring-[#F37021]">
                      <div className="flex shrink-0 items-center gap-2 border-r border-orange-200 bg-orange-50 px-3 font-bold text-slate-800">
                        <Phone className="h-4 w-4 text-[#F37021]" />
                        +91
                      </div>

                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={customerPhone}
                        onChange={(e) =>
                          setCustomerPhone(
                            e.target.value.replace(
                              /\D/g,
                              ''
                            )
                          )
                        }
                        placeholder="9848012345"
                        className="min-w-0 flex-1 bg-white px-3 py-3.5 text-sm font-bold tracking-wider text-black outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-orange-100 bg-orange-50 p-3 text-xs font-medium text-slate-600">
                    ⚡ Demo: You will receive a
                    6-digit OTP on the next screen.
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F37021] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#D95D12] active:scale-[0.99]"
                  >
                    Login
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}

            {/* =================================================
                OTP
                ================================================= */}
            {screen === 'OTP' && (
              <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-md flex-col justify-center">
                
                <button
                  type="button"
                  onClick={() =>
                    setScreen('LOGIN')
                  }
                  className="mb-5 flex w-fit items-center gap-1 text-sm font-bold text-[#F37021] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </button>

                <div
                  className="mb-6 rounded-3xl border border-orange-200 p-6 text-center"
                  style={{
                    backgroundColor: PEACH_BG,
                  }}
                >
                  <h2 className="text-2xl font-black text-black">
                    OTP Verification
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Enter the 6-digit OTP sent to
                    <strong className="ml-1 text-black">
                      +91 {customerPhone}
                    </strong>
                  </p>
                </div>

                {/* OTP BOXES */}
                <div className="mx-auto flex w-full max-w-sm justify-between gap-2 sm:gap-3">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-box-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      onChange={(e) =>
                        handleOtpBoxChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(
                          index,
                          e
                        )
                      }
                      className="h-12 min-w-0 flex-1 rounded-xl border border-[#F37021] bg-white text-center text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021] sm:h-14 sm:text-xl"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="mt-3 text-center text-xs font-bold text-rose-600">
                    {otpError}
                  </p>
                )}

                <div className="mt-6 text-center">
                  <p className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-500">
                    <Clock className="h-4 w-4 text-[#F37021]" />
                    Resend code in:
                    <strong className="font-mono text-black">
                      {String(
                        Math.floor(
                          otpTimer / 60
                        )
                      ).padStart(2, '0')}
                      :
                      {String(
                        otpTimer % 60
                      ).padStart(2, '0')}
                    </strong>
                  </p>

                  <button
                    type="button"
                    disabled={otpTimer > 0}
                    onClick={handleResendOtp}
                    className={`mt-2 text-sm font-bold ${
                      otpTimer === 0
                        ? 'text-[#F37021] hover:underline'
                        : 'cursor-not-allowed text-gray-400'
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F37021] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#D95D12]"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Verify OTP
                </button>
              </div>
            )}

            {/* =================================================
                HOME
                ================================================= */}
            {screen === 'HOME' && (
              <div className="space-y-5">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-black">
                      Hi {customerName || 'Sai'}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Where would you like to
                      shift goods?
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-sm font-bold text-[#F37021]">
                    {customerName
                      ? customerName
                          .charAt(0)
                          .toUpperCase()
                      : 'S'}
                  </div>
                </div>

                {/* DESKTOP ROUTE AREA */}
                <div
                  className="rounded-2xl border border-orange-200 p-4 shadow-sm sm:p-5"
                  style={{
                    backgroundColor: PEACH_BG,
                  }}
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-end">
                    
                    {/* FROM */}
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        From
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setLocationModalType(
                            'FROM'
                          )
                        }
                        className="flex min-h-14 w-full items-center gap-3 rounded-xl border border-[#F37021] bg-white p-3 text-left shadow-sm transition hover:bg-orange-50"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>

                        <span className="min-w-0 flex-1 truncate text-sm font-bold text-black">
                          {fromLocation}
                        </span>
                      </button>
                    </div>

                    {/* SWAP */}
                    <button
                      type="button"
                      onClick={
                        handleSwapLocations
                      }
                      className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F37021] bg-white text-[#F37021] shadow-sm transition hover:scale-105 active:rotate-180"
                      title="Swap locations"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </button>

                    {/* TO */}
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        To
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setLocationModalType(
                            'TO'
                          )
                        }
                        className="flex min-h-14 w-full items-center gap-3 rounded-xl border border-[#F37021] bg-white p-3 text-left shadow-sm transition hover:bg-orange-50"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F37021] text-white">
                          <MapPin className="h-4 w-4" />
                        </div>

                        <span className="min-w-0 flex-1 truncate text-sm font-bold text-black">
                          {toLocation}
                        </span>
                      </button>
                    </div>

                    {/* CONFIRM */}
                    <button
                      type="button"
                      onClick={
                        handleLocationConfirm
                      }
                      className="min-h-14 rounded-xl bg-[#F37021] px-7 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-[#D95D12]"
                    >
                      Confirm
                    </button>
                  </div>
                </div>

                {/* RESPONSIVE PROMO GRID */}
                <div className="grid gap-4 md:grid-cols-2">
                  
                  {/* GOLD */}
                  <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white shadow-sm">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F37021]">
                        <Sparkles className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-black text-amber-400">
                          10% off on Trucks
                        </p>

                        <p className="mt-0.5 text-xs text-slate-300">
                          Subscribe to Transmaa
                          Gold
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          'Transmaa Gold plan activated!'
                        )
                      }
                      className="ml-3 shrink-0 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-black text-black hover:bg-amber-300"
                    >
                      Join
                    </button>
                  </div>

                  {/* SALE */}
                  <div
                    className="flex items-center justify-between overflow-hidden rounded-2xl border border-orange-200 p-4 shadow-sm"
                    style={{
                      backgroundColor:
                        PEACH_BG,
                    }}
                  >
                    <div>
                      <span className="rounded-md bg-[#F37021] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                        SALE
                      </span>

                      <h3 className="mt-2 text-xl font-black text-black">
                        UP TO 50% OFF
                      </h3>

                      <p className="text-xs text-slate-600">
                        House Shifting & Truck
                        Loads
                      </p>
                    </div>

                    <div className="ml-4 text-4xl sm:text-5xl">
                      🚚
                    </div>
                  </div>
                </div>

                {/* HISTORY */}
                <button
                  type="button"
                  onClick={() =>
                    setScreen('HISTORY')
                  }
                  className="w-full rounded-xl border border-orange-100 bg-orange-50 py-3 text-sm font-bold text-[#F37021] hover:bg-orange-100"
                >
                  View My Past Bookings (
                  {bookingHistory.length})
                </button>
              </div>
            )}

            {/* =================================================
                CHOOSE TRUCK
                ================================================= */}
            {screen === 'CHOOSE_TRUCK' && (
              <div className="space-y-5">
                
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setScreen('HOME')
                    }
                    className="flex w-fit items-center gap-1 text-sm font-bold text-[#F37021] hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Change Location
                  </button>

                  <span className="text-xs font-bold text-gray-500">
                    {fromLocation.split(',')[0]}
                    {' → '}
                    {toLocation.split(',')[0]}
                  </span>
                </div>

                {/* SCHEDULE */}
                <div
                  className="rounded-2xl border border-orange-200 p-4"
                  style={{
                    backgroundColor: PEACH_BG,
                  }}
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                    Select Shifting Schedule
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl border border-[#F37021] bg-white p-3">
                      <Calendar className="h-5 w-5 shrink-0 text-[#F37021]" />

                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) =>
                          setBookingDate(
                            e.target.value
                          )
                        }
                        className="min-w-0 w-full bg-transparent text-sm font-bold text-black outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-[#F37021] bg-white p-3">
                      <Clock className="h-5 w-5 shrink-0 text-[#F37021]" />

                      <select
                        value={bookingTime}
                        onChange={(e) =>
                          setBookingTime(
                            e.target.value
                          )
                        }
                        className="min-w-0 w-full bg-transparent text-sm font-bold text-black outline-none"
                      >
                        <option>
                          08:00 AM
                        </option>
                        <option>
                          10:00 AM
                        </option>
                        <option>
                          12:00 PM
                        </option>
                        <option>
                          02:00 PM
                        </option>
                        <option>
                          04:00 PM
                        </option>
                        <option>
                          06:00 PM
                        </option>
                        <option>
                          08:00 PM
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* GOODS */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-black">
                    <Package className="h-4 w-4 text-[#F37021]" />
                    Goods Type
                  </label>

                  <div className="relative">
                    <select
                      value={selectedGoodsType}
                      onChange={(e) =>
                        setSelectedGoodsType(
                          e.target.value
                        )
                      }
                      className="w-full appearance-none rounded-xl border border-[#F37021] bg-white px-4 py-3.5 pr-10 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                    >
                      {GOODS_TYPES.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F37021]" />
                  </div>
                </div>

                {/* TITLE */}
                <div>
                  <h3 className="text-lg font-black text-black">
                    Choose Truck Type
                  </h3>

                  <p className="text-sm text-gray-500">
                    Select payload capacity suited
                    for your goods
                  </p>
                </div>

                {/* TRUCK GRID */}
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {TRUCK_TYPES.map(
                    (truck) => {
                      const isSelected =
                        selectedTruck.id ===
                        truck.id;

                      return (
                        <button
                          key={truck.id}
                          type="button"
                          onClick={() =>
                            setSelectedTruck(
                              truck
                            )
                          }
                          className={`relative w-full rounded-2xl border p-4 text-left transition ${
                            isSelected
                              ? 'border-[#F37021] bg-orange-50 shadow-md ring-2 ring-[#F37021]/20'
                              : 'border-orange-200 bg-white shadow-sm hover:border-[#F37021]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            
                            <div className="flex min-w-0 items-start gap-3">
                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                  isSelected
                                    ? 'bg-[#F37021] text-white'
                                    : 'bg-orange-100 text-[#F37021]'
                                }`}
                              >
                                <Truck className="h-5 w-5" />
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-sm font-black text-black">
                                    {truck.name}
                                  </h4>

                                  {truck.badge && (
                                    <span className="rounded bg-[#F37021] px-1.5 py-0.5 text-[9px] font-bold text-white">
                                      {truck.badge}
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-xs font-bold text-[#F37021]">
                                  Payload:{' '}
                                  {
                                    truck.capacity
                                  }
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  {
                                    truck.dimensions
                                  }
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  ETA:{' '}
                                  {truck.eta}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              <p className="text-base font-black text-black">
                                ₹
                                {
                                  truck.basePrice
                                }
                              </p>

                              <p className="text-[10px] text-gray-400">
                                Base fare
                              </p>

                              {isSelected && (
                                <CheckCircle2 className="ml-auto mt-2 h-5 w-5 text-[#F37021]" />
                              )}
                            </div>
                          </div>

                          <p className="mt-3 border-t border-orange-100 pt-3 text-xs leading-relaxed text-gray-500">
                            {truck.suitableFor}
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>

                {/* BOOK BUTTON */}
                <div className="sticky bottom-20 z-20 pt-2">
                  <button
                    type="button"
                    onClick={handleBookPickup}
                    className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2 rounded-xl bg-[#F37021] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#D95D12]"
                  >
                    Book Pickup (₹
                    {selectedTruck.basePrice})
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                CONFIRM
                ================================================= */}
            {screen === 'CONFIRM' && (
              <div className="mx-auto max-w-3xl space-y-5">
                
                <button
                  type="button"
                  onClick={() =>
                    setScreen(
                      'CHOOSE_TRUCK'
                    )
                  }
                  className="flex items-center gap-1 text-sm font-bold text-[#F37021] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Trucks
                </button>

                <div className="text-center">
                  <h2 className="text-2xl font-black text-black">
                    Confirm Booking Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Please review your shifting
                    consignment details
                  </p>
                </div>

                <div className="space-y-5 rounded-2xl border border-[#F37021] bg-white p-4 shadow-md sm:p-6">
                  
                  {/* TRUCK */}
                  <div
                    className="flex items-center gap-3 rounded-xl border border-orange-200 p-4"
                    style={{
                      backgroundColor:
                        PEACH_BG,
                    }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F37021] text-white">
                      <Truck className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-black sm:text-base">
                        {selectedTruck.name}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-[#F37021]">
                        Capacity:{' '}
                        {selectedTruck.capacity}
                      </p>
                    </div>
                  </div>

                  {/* ROUTE */}
                  <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                        A
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase text-gray-400">
                          From
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-black">
                          {fromLocation}
                        </p>
                      </div>
                    </div>

                    <div className="ml-3.5 h-5 border-l-2 border-dashed border-orange-300" />

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F37021] text-xs font-bold text-white">
                        B
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase text-[#F37021]">
                          To
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-black">
                          {toLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-500">
                        Date & Time
                      </p>

                      <p className="mt-1 text-sm font-bold text-black">
                        {bookingDate}
                        <br className="sm:hidden" />
                        {' • '}
                        {bookingTime}
                      </p>
                    </div>

                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-500">
                        Goods Category
                      </p>

                      <p className="mt-1 break-words text-sm font-bold text-black">
                        {selectedGoodsType}
                      </p>
                    </div>
                  </div>

                  {/* FARE */}
                  <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-500">
                        Estimated Consignment
                        Fare
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <ShieldCheck className="h-4 w-4" />
                        Transmaa Shield Covered
                      </p>
                    </div>

                    <p className="text-2xl font-black text-[#F37021]">
                      ₹
                      {
                        selectedTruck.basePrice +
                        650
                      }
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    handleConfirmPickup
                  }
                  className="mx-auto flex w-full max-w-xl items-center justify-center gap-2 rounded-xl bg-[#F37021] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#D95D12]"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Confirm Pickup
                </button>
              </div>
            )}

            {/* =================================================
                WAITING
                ================================================= */}
            {screen === 'WAITING' && (
              <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
                
                <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
                  <div className="absolute inset-0 animate-radar-pulse rounded-full bg-orange-400/20" />

                  <div className="absolute inset-5 animate-pulse rounded-full bg-orange-500/20" />

                  <div className="relative flex h-24 w-24 animate-float items-center justify-center rounded-full bg-[#F37021] text-white shadow-xl shadow-orange-500/40">
                    <Truck className="h-12 w-12" />
                  </div>
                </div>

                <div className="max-w-md">
                  <h2 className="text-xl font-black text-black sm:text-2xl">
                    Waiting for Transmaa
                    confirmation...
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Matching with nearest verified
                    <strong className="mx-1 text-[#F37021]">
                      {selectedTruck.name}
                    </strong>
                    near{' '}
                    {fromLocation.split(',')[0]}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <div className="h-3 w-3 animate-bounce rounded-full bg-[#F37021]" />

                  <div
                    className="h-3 w-3 animate-bounce rounded-full bg-[#F37021]"
                    style={{
                      animationDelay:
                        '0.2s',
                    }}
                  />

                  <div
                    className="h-3 w-3 animate-bounce rounded-full bg-[#F37021]"
                    style={{
                      animationDelay:
                        '0.4s',
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={
                    handleCancelWaiting
                  }
                  className="mt-8 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-bold text-rose-600 hover:bg-rose-100"
                >
                  Cancel Booking Request
                </button>
              </div>
            )}

            {/* =================================================
                HISTORY
                ================================================= */}
            {screen === 'HISTORY' && (
              <div className="space-y-5">
                
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-black">
                      Booking History
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Track live trips and past
                      consignments
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setScreen('HOME')
                    }
                    className="w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-bold text-[#F37021] hover:bg-orange-100 sm:w-auto"
                  >
                    + New Load
                  </button>
                </div>

                {/* HISTORY GRID */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {bookingHistory.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-orange-200 bg-white p-4 shadow-sm transition hover:border-[#F37021] hover:shadow-md"
                      >
                        {/* TOP */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <span className="text-xs font-black text-black">
                            #{item.id}
                          </span>

                          <span
                            className={`rounded-md border px-2 py-1 text-[9px] font-black uppercase ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        {/* ROUTE */}
                        <div className="mt-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-black" />

                            <p className="text-sm font-bold text-black">
                              {item.from}
                            </p>
                          </div>

                          <div className="ml-1 h-3 border-l border-dashed border-orange-300" />

                          <div className="flex items-start gap-3">
                            <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F37021]" />

                            <p className="text-sm font-bold text-black">
                              {item.to}
                            </p>
                          </div>
                        </div>

                        {/* DETAILS */}
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-600">
                              {item.truck?.name ||
                                'LCV'}
                            </p>

                            <p className="mt-1 text-[10px] text-gray-400">
                              {item.date} •{' '}
                              {item.time}
                            </p>
                          </div>

                          <div className="min-w-0 text-right">
                            <p className="text-base font-black text-black">
                              ₹{item.fare}
                            </p>

                            <p className="truncate text-[10px] text-gray-400">
                              {
                                item.goodsType
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ===================================================
            BOTTOM NAVIGATION
            MOBILE ONLY
            =================================================== */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-orange-100 bg-white px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-around">
            
            <button
              type="button"
              onClick={() =>
                handleBottomNavClick(
                  'loads'
                )
              }
              className={`flex min-w-0 flex-1 flex-col items-center justify-center py-1 ${
                navTab === 'loads'
                  ? 'text-[#F37021]'
                  : 'text-gray-500'
              }`}
            >
              <Truck className="h-5 w-5" />

              <span className="mt-1 text-[10px] font-bold">
                Loads
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleBottomNavClick(
                  'sell_buy'
                )
              }
              className={`flex min-w-0 flex-1 flex-col items-center justify-center py-1 ${
                navTab === 'sell_buy'
                  ? 'text-[#F37021]'
                  : 'text-gray-500'
              }`}
            >
              <Tag className="h-5 w-5" />

              <span className="mt-1 text-[10px] font-bold">
                Sell & Buy
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleBottomNavClick(
                  'finance'
                )
              }
              className={`flex min-w-0 flex-1 flex-col items-center justify-center py-1 ${
                navTab === 'finance'
                  ? 'text-[#F37021]'
                  : 'text-gray-500'
              }`}
            >
              <Landmark className="h-5 w-5" />

              <span className="mt-1 text-[10px] font-bold">
                Finance
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleBottomNavClick('fuel')
              }
              className={`flex min-w-0 flex-1 flex-col items-center justify-center py-1 ${
                navTab === 'fuel'
                  ? 'text-[#F37021]'
                  : 'text-gray-500'
              }`}
            >
              <Fuel className="h-5 w-5" />

              <span className="mt-1 text-[10px] font-bold">
                Fuel
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleBottomNavClick(
                  'privacy'
                )
              }
              className="flex min-w-0 flex-1 flex-col items-center justify-center py-1 text-gray-500"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F37021] text-white">
                <RotateCw className="h-4 w-4" />
              </div>

              <span className="mt-1 text-[9px] font-semibold">
                Privacy
              </span>
            </button>
          </div>
        </nav>

        {/* ===================================================
            LOCATION MODAL
            =================================================== */}
        {locationModalType && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-base font-black text-black">
                  Select{' '}
                  {locationModalType ===
                  'FROM'
                    ? 'Pickup Location'
                    : 'Dropoff Location'}
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setLocationModalType(
                      null
                    );
                    setSearchLocationQuery(
                      ''
                    );
                  }}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* SEARCH */}
              <div className="relative my-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={searchLocationQuery}
                  onChange={(e) =>
                    setSearchLocationQuery(
                      e.target.value
                    )
                  }
                  placeholder="Search city, area, hub..."
                  autoFocus
                  className="w-full rounded-xl border border-[#F37021] bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-black outline-none focus:bg-white focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              {/* LOCATIONS */}
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
                {PRESET_LOCATIONS.filter(
                  (location) =>
                    location
                      .toLowerCase()
                      .includes(
                        searchLocationQuery.toLowerCase()
                      )
                ).map(
                  (location, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        if (
                          locationModalType ===
                          'FROM'
                        ) {
                          setFromLocation(
                            location
                          );
                        }

                        if (
                          locationModalType ===
                          'TO'
                        ) {
                          setToLocation(
                            location
                          );
                        }

                        setLocationModalType(
                          null
                        );

                        setSearchLocationQuery(
                          ''
                        );
                      }}
                      className="flex w-full items-center gap-3 rounded-xl border border-gray-100 p-3 text-left text-sm font-bold text-slate-800 transition hover:border-[#F37021] hover:bg-orange-50"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-[#F37021]" />

                      <span>
                        {location}
                      </span>
                    </button>
                  )
                )}

                {PRESET_LOCATIONS.filter(
                  (location) =>
                    location
                      .toLowerCase()
                      .includes(
                        searchLocationQuery.toLowerCase()
                      )
                ).length === 0 && (
                  <div className="py-10 text-center text-sm text-gray-500">
                    No locations found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            HELP MODAL
            =================================================== */}
        {showHelpModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
              
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#F37021]">
                <HelpCircle className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-lg font-black text-black">
                Transmaa Help & Support
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                24/7 dedicated customer
                assistance for house shifting and
                load logistics.
              </p>

              <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm font-bold text-slate-800">
                📞 Toll-Free Helpline:
                <br />
                <span className="text-base text-[#F37021]">
                  1800-123-9999
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowHelpModal(false)
                }
                className="mt-5 w-full rounded-xl bg-[#F37021] py-3 font-bold text-white shadow-md shadow-orange-500/25 hover:bg-[#D95D12]"
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

