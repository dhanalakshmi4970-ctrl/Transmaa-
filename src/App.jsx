import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import FinanceInsurance from './FinanceInsurance';
import BuySell from './BuySell';
import {
  Truck,
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Pencil,
  KeyRound,
  MapPin,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Plus,
  Trash2,
  X,
  Landmark,
  Tag,
  Fuel,
  ArrowUpDown,
  Shield
} from 'lucide-react';


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
    suitableFor: 'Small shifting, timber planks, appliances, catering kits',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'open',
    name: 'Open Body Truck',
    capacity: '7 – 11 Tons',
    dimensions: '14 ft x 6.5 ft x 7 ft',
    basePrice: 3400,
    eta: '10 mins away',
    suitableFor: 'Agricultural loads, industrial equipment, timber logs',
    badge: 'High Demand',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'dumper',
    name: 'Dumper Truck',
    capacity: '9 – 16 Tons',
    dimensions: '16 ft x 7 ft x 6.5 ft',
    basePrice: 4800,
    eta: '12 mins away',
    suitableFor: 'Loose construction materials, sand, gravel, stone chips',
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'tipper',
    name: 'Tipper Heavy Haul',
    capacity: '9 – 24 Tons',
    dimensions: '18 ft x 7.5 ft x 7 ft',
    basePrice: 6200,
    eta: '15 mins away',
    suitableFor: 'Mining, quarry, cement bags, heavy building materials',
    image: 'https://images.unsplash.com/photo-1586191582056-a33e21820689?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'container',
    name: 'Closed Container',
    capacity: '9 – 30 Tons',
    dimensions: '20-32 ft HQ Closed',
    basePrice: 7900,
    eta: '20 mins away',
    suitableFor: 'FMCG, electronics, export-import, waterproof transit',
    badge: 'Weatherproof',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'trailer',
    name: 'Heavy Flatbed Trailer',
    capacity: '16 – 43 Tons',
    dimensions: '40 ft Flatbed / Highbed',
    basePrice: 11500,
    eta: '25 mins away',
    suitableFor: 'Oversized steel coils, infrastructure, heavy transformers',
    image: 'https://images.unsplash.com/photo-1501700493788-df1a42922624?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'multiaxle',
    name: 'Multi-Axle Heavy Carrier',
    capacity: '20 – 36 Tons',
    dimensions: '28-32 ft Multi-Axle',
    basePrice: 9800,
    eta: '18 mins away',
    suitableFor: 'Interstate commercial logistics & bulk machinery',
    image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=400&auto=format&fit=crop&q=60',
  },
];

const renderStatusTracker = (status) => {
  const steps = ['Order Waiting', 'Driver Assigned', 'In Transit', 'Delivered'];
  const currentStepIndex = steps.indexOf(status) !== -1 ? steps.indexOf(status) : 0;

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Live Status Tracker</p>
      <div className="flex items-center justify-between gap-3">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          return (
            <div key={step} className="flex flex-1 flex-col items-center text-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  isCompleted
                    ? 'bg-[#F37021] text-white ring-4 ring-orange-100'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`mt-2 text-[11px] leading-tight ${
                  isCompleted ? 'font-bold text-gray-900' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState('LOGIN');

  // AUTH STATE
  const [user, setUser] = useState(null);
  const [customerName, setCustomerName] = useState('sai');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('LOGIN');
  const [authError, setAuthError] = useState('');

  // PROFILE MODALS & ADDRESSES
  const [activeProfileModal, setActiveProfileModal] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, title: 'Home Warehouse', address: 'Sircilla Main Road, Telangana' },
    { id: 2, title: 'Office / Depot', address: 'Hitech City, Phase 2, Hyderabad' },
  ]);
  const [newAddressTitle, setNewAddressTitle] = useState('');
  const [newAddressText, setNewAddressText] = useState('');

  // LOCATIONS & BOOKINGS
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState('10:00');
  const [selectedGoodsType, setSelectedGoodsType] = useState(GOODS_TYPES[0]);
  const [selectedTruck, setSelectedTruck] = useState(TRUCK_TYPES[0]);
  const [loadWeight, setLoadWeight] = useState('');
  const [expectedTransportationCost, setExpectedTransportationCost] = useState('');

  const [profileMessage, setProfileMessage] = useState('');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [currentPendingOrder, setCurrentPendingOrder] = useState(null);
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);

  // SUPABASE AUTH LISTENER
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setCustomerEmail(user.email || '');
        setCustomerName(user.user_metadata?.name || 'sai');
        setCustomerPhone(user.user_metadata?.phone || '');
        setScreen('HOME');
        fetchUserBookings(user.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setCustomerEmail(currentUser.email || '');
        setCustomerName(currentUser.user_metadata?.name || 'sai');
        setCustomerPhone(currentUser.user_metadata?.phone || '');
        fetchUserBookings(currentUser.id);
      } else {
        setScreen('LOGIN');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchUserBookings = async (userId) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookingHistory(data);
    }
  };

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleRegisterSubmit = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerName.trim() || !customerEmail.trim() || !password) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (cleanPhone.length !== 10) {
      setAuthError('Please enter a valid 10-digit phone number.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: customerEmail,
      password: password,
      options: {
        data: { name: customerName, phone: cleanPhone },
      },
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setUser(data.user);
      setScreen('HOME');
    }
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: customerEmail,
      password: password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setUser(data.user);
      setScreen('HOME');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setScreen('LOGIN');
  };

  const handleSaveProfile = async () => {
    setProfileMessage('');
    const cleanPhone = customerPhone.replace(/\D/g, '');

    if (!customerName.trim()) {
      setProfileMessage('Name cannot be empty.');
      return;
    }

    if (cleanPhone.length !== 10) {
      setProfileMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      email: customerEmail,
      data: { name: customerName, phone: cleanPhone },
    });

    if (error) {
      setProfileMessage(`Error: ${error.message}`);
    } else {
      setProfileMessage('Profile updated successfully!');
      setTimeout(() => {
        setProfileMessage('');
        setActiveProfileModal(null);
      }, 1500);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!oldPassword || !newPassword) {
      setPasswordError('Please provide both current and new passwords.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (signInError) {
      setPasswordError('Incorrect old password. Please check and try again.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setPasswordError(updateError.message);
    } else {
      setPasswordSuccess('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setTimeout(() => {
        setPasswordSuccess('');
        setActiveProfileModal(null);
      }, 1500);
    }
  };

  const handleAddAddress = () => {
    if (!newAddressTitle.trim() || !newAddressText.trim()) return;
    setSavedAddresses([
      ...savedAddresses,
      { id: Date.now(), title: newAddressTitle, address: newAddressText },
    ]);
    setNewAddressTitle('');
    setNewAddressText('');
  };

  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((item) => item.id !== id));
  };

  const handleConfirmPickup = async () => {
    if (!user) {
      alert('You must be logged in to create a booking.');
      return;
    }

    const vehicleFare = selectedTruck.basePrice;
    const transportationCost = Number(expectedTransportationCost) || 0;
    const totalFare = vehicleFare + transportationCost;

    const newBooking = {
      user_id: user.id,
      from_location: fromLocation || 'Sircilla, Telangana',
      to_location: toLocation || 'Hitech City, Hyderabad',
      goods_type: selectedGoodsType,
      weight: Number(loadWeight) || 0,
      expected_cost: transportationCost,
      truck_name: selectedTruck.name,
      vehicle_fare: vehicleFare,
      fare: totalFare,
      booking_date: bookingDate,
      booking_time: bookingTime,
      status: 'Order Waiting',
    };

    const { data, error } = await supabase.from('bookings').insert([newBooking]).select();

    if (error) {
      alert(`Error creating booking: ${error.message}`);
    } else {
      setCurrentPendingOrder(data[0]);
      setBookingHistory((prev) => [data[0], ...prev]);
      setScreen('WAITING');
    }
  };

  const renderAuthScreen = () => {
    const isRegister = authMode === 'REGISTER';

    return (
      <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-md flex-col justify-center px-4 py-10">
        <div className="mb-6 rounded-2xl border border-orange-200 bg-[#FEF3EC] p-8 text-center shadow-xs">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F37021] text-white shadow-md">
            <Truck className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-black text-black">
            Tran<span className="text-[#F37021]">SMAA</span>
          </h1>

          <p className="mt-2 text-base font-bold text-gray-800">
            {isRegister ? 'Create your account' : 'Welcome Back'} ❤️
          </p>
        </div>

        <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Customer Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F37021]" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Sai Kumar"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm font-semibold text-black outline-none focus:border-[#F37021]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F37021]" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9848012345"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm font-semibold text-black outline-none focus:border-[#F37021]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F37021]" />
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm font-semibold text-black outline-none focus:border-[#F37021]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F37021]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm font-semibold text-black outline-none focus:border-[#F37021]"
              />
            </div>
          </div>

          {authError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-600">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F37021] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#D95D12]"
          >
            {isRegister ? 'Register & Continue' : 'Login'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setAuthMode(isRegister ? 'LOGIN' : 'REGISTER');
                setAuthError('');
              }}
              className="ml-2 font-black text-[#F37021] hover:underline"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    );
  };

  const renderProfileScreen = () => {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <button
          type="button"
          onClick={() => setScreen('HOME')}
          className="flex items-center gap-2 text-xs font-bold text-[#F37021] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl font-black text-[#F37021]">
            {customerName ? customerName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="text-center sm:text-left space-y-1 flex-1 min-w-0">
            <h2 className="text-2xl font-black text-black truncate">{customerName || 'Transmaa Customer'}</h2>
            <p className="text-xs font-medium text-gray-500 truncate">{customerEmail}</p>
            <p className="text-xs font-medium text-gray-500 truncate">+91 {customerPhone || 'Not provided'}</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveProfileModal('EDIT_PROFILE')}
            className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50/50 px-4 py-2 text-xs font-bold text-[#F37021] hover:bg-orange-100 transition"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit Profile
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs divide-y divide-gray-100">
          <button
            type="button"
            onClick={() => setActiveProfileModal('EDIT_PROFILE')}
            className="w-full flex items-center justify-between p-4 hover:bg-orange-50/30 transition text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-orange-100 text-[#F37021] shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black truncate">Personal Information</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">Update name, phone number & email</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveProfileModal('CHANGE_PASSWORD')}
            className="w-full flex items-center justify-between p-4 hover:bg-orange-50/30 transition text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-orange-100 text-[#F37021] shrink-0">
                <KeyRound className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black truncate">Change Password & Security</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">Manage login credentials and account safety</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveProfileModal('SAVED_ADDRESSES')}
            className="w-full flex items-center justify-between p-4 hover:bg-orange-50/30 transition text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-orange-100 text-[#F37021] shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black truncate">Saved Addresses</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">Save frequent pickup & dropoff spots</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveProfileModal('HELP_SUPPORT')}
            className="w-full flex items-center justify-between p-4 hover:bg-orange-50/30 transition text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-orange-100 text-[#F37021] shrink-0">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black truncate">Help & Customer Support</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">24/7 hotline, WhatsApp support & FAQs</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveProfileModal('TERMS_PRIVACY')}
            className="w-full flex items-center justify-between p-4 hover:bg-orange-50/30 transition text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-orange-100 text-[#F37021] shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black truncate">Terms & Privacy Policy</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">Safety guidelines and legal terms</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl border border-rose-200 bg-rose-50 py-3 text-xs font-bold text-rose-600 hover:bg-rose-100 transition"
        >
          Log Out of Transmaa
        </button>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F5F5F5]">
      {/* SIDEBAR */}
      {user && (
        <aside className="flex w-64 flex-col justify-between border-r border-gray-200 bg-white p-5 shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-1.5 px-2 py-1">
              <button 
                type="button" 
                onClick={() => setScreen('HOME')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-xl font-black tracking-tight text-black">
                  Tran<span className="text-[#F37021]">SMAA</span>
                </span>
              </button>
            </div>

            <nav className="space-y-2">
              <button
                type="button"
                onClick={() => setScreen('HOME')}
                className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-bold transition ${
                  screen === 'HOME' || screen === 'CHOOSE_TRUCK'
                    ? 'bg-[#FEF3EC] text-[#F37021]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Truck className="h-4 w-4" />
                <span>Loads</span>
              </button>

              <button
  type="button"
  onClick={() => setScreen('BUY_SELL')}
  className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-semibold transition ${
    screen === 'BUY_SELL'
      ? 'bg-[#FEF3EC] text-[#F37021]'
      : 'text-gray-600 hover:bg-gray-50'
  }`}
>
  <Tag className="h-4 w-4 text-gray-400" />
  <span>Sell & Buy</span>
</button>

              <button
                type="button"
                onClick={() => setScreen('FINANCE_INSURANCE')}
                className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                  screen === 'FINANCE_INSURANCE'
                    ? 'bg-[#FEF3EC] text-[#F37021]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Landmark className="h-4 w-4 text-gray-400" />
                <span>Finance & Insurance</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Fuel module selected!')}
                className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                <Fuel className="h-4 w-4 text-gray-400" />
                <span>Fuel</span>
              </button>
            </nav>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <button
              type="button"
              onClick={() => setActiveProfileModal('TERMS_PRIVACY')}
              className="flex items-center gap-2 text-[11px] font-medium text-gray-400 hover:text-gray-600 transition"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy • Terms</span>
            </button>

            <button
              type="button"
              onClick={() => setScreen('PROFILE')}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-orange-50 transition border border-gray-200"
            >
              <div className="h-7 w-7 rounded-full bg-[#F37021] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {customerName ? customerName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="text-left overflow-hidden min-w-0">
                <p className="text-xs font-bold text-gray-800 truncate">{customerName}</p>
                <p className="text-[10px] text-gray-400 truncate">{customerEmail || 'sai@gmail.com'}</p>
              </div>
            </button>
          </div>
        </aside>
      )}

      {/* WORKSPACE */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex items-center justify-end border-b border-gray-200 bg-white px-8 py-3.5 gap-3">
          {user && (
            <button
              type="button"
              onClick={() => setScreen('HISTORY')}
              className="rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-1.5 text-xs font-bold text-[#F37021] hover:bg-orange-100 transition"
            >
              Bookings ({bookingHistory.length})
            </button>
          )}
          <button 
            type="button"
            onClick={() => user && setScreen('PROFILE')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </header>

        <main className="mx-auto w-full max-w-5xl px-8 py-6 space-y-4">
          {!user ? (
            renderAuthScreen()
          ) : (
            <>
              {screen === 'PROFILE' && renderProfileScreen()}

              {screen === 'FINANCE_INSURANCE' && (
                <FinanceInsurance onBack={() => setScreen('HOME')} user={user} />
              )}

              {screen === 'HOME' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">Hi {customerName}</h2>

                  {/* ROUTE BOX CONTAINER */}
                  <div className="relative rounded-2xl border-2 border-[#F37021] bg-white px-8 py-6 shadow-xs">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                      
                      {/* FROM SECTION */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-gray-500 pl-1">From,</label>
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black">
                            <div className="h-2.5 w-2.5 rounded-full bg-black" />
                          </div>
                          <input
                            type="text"
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            placeholder="Load from..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs font-normal text-gray-800 placeholder-gray-400 focus:border-[#F37021]"
                          />
                        </div>
                      </div>

                      {/* CENTER DIVIDER & SWAP */}
                      <div className="flex flex-col items-center justify-center gap-2 pt-4 px-2">
                        <span className="text-gray-400 text-xs">⋮</span>
                        <button
                          type="button"
                          onClick={handleSwapLocations}
                          className="text-gray-400 hover:text-[#F37021] transition"
                        >
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* TO SECTION */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-gray-500 pl-1">To,</label>
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F37021] text-white">
                            <MapPin className="h-3.5 w-3.5 fill-current" />
                          </div>
                          <input
                            type="text"
                            value={toLocation}
                            onChange={(e) => setToLocation(e.target.value)}
                            placeholder="Unload to..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs font-normal text-gray-800 placeholder-gray-400 focus:border-[#F37021]"
                          />
                        </div>
                      </div>

                    </div>

                    {/* CONFIRM BUTTON */}
                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setScreen('CHOOSE_TRUCK')}
                        className="w-48 rounded-lg bg-[#9AA0A6] py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#F37021]"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>

                  {/* BANNER 1: PORTER GOLD */}
                  <div className="flex items-center justify-between rounded-xl bg-[#333333] px-6 py-4 text-white shadow-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F37021] text-lg font-black">
                        %
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">10% off on 2 Wheeler & Trucks</p>
                        <p className="text-[11px] text-gray-300">Subscribe to Porter Gold Now!</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                  </div>

                  {/* BANNER 2: SPECIAL OFFER SALE */}
                  <div className="relative flex h-32 items-center justify-between overflow-hidden rounded-xl bg-[#71415F] px-8 text-white shadow-xs">
                    <div className="z-10 space-y-0.5">
                      <p className="text-[11px] font-medium text-pink-200">Special offer</p>
                      <h3 className="text-2xl font-black tracking-wide">SALE</h3>
                      <p className="text-[10px] font-bold tracking-wider text-amber-200">UP TO 50% OFF</p>
                      <p className="text-[9px] text-gray-200 uppercase tracking-widest pt-0.5">ONLY TODAY</p>
                      <button 
                        type="button"
                        className="mt-1 rounded-md bg-[#333333] px-3 py-1 text-[10px] font-bold text-white hover:bg-black transition"
                      >
                        BUY NOW
                      </button>
                    </div>
                    <div className="text-5xl opacity-80">🛒</div>
                  </div>

                  {/* BANNER 3: VECTOR TRUCK & LOGISTICS ILLUSTRATION */}
                  <div className="relative flex h-36 items-center justify-center rounded-xl border border-gray-200 bg-[#E8F4F8] shadow-xs overflow-hidden px-8">
                    <div className="relative flex items-center justify-center w-full max-w-lg">
                      {/* LIGHT BLUE BACKGROUND CLOUD SHAPE */}
                      <div className="absolute h-24 w-72 rounded-full bg-[#D4EAF3] -z-0" />
                      
                      {/* TRUCK GRAPHIC */}
                      <div className="relative z-10 flex items-end gap-3">
                        <div className="flex flex-col items-center">
                          {/* TRUCK BODY */}
                          <div className="flex items-end">
                            {/* CABIN */}
                            <div className="h-12 w-10 rounded-l-lg bg-amber-400 border-2 border-slate-800 flex items-center justify-center relative">
                              <div className="h-4 w-4 bg-sky-200 rounded-xs border border-slate-800 absolute top-2 left-1" />
                            </div>
                            {/* CONTAINER */}
                            <div className="h-16 w-36 bg-[#C0392B] rounded-r-lg border-2 border-slate-800 flex items-center justify-center shadow-inner">
                              <span className="text-[10px] font-black text-white tracking-widest uppercase">
                                DELIVERY
                              </span>
                            </div>
                          </div>
                          {/* WHEELS */}
                          <div className="flex gap-16 -mt-2">
                            <div className="h-5 w-5 rounded-full bg-slate-900 border-2 border-gray-300" />
                            <div className="h-5 w-5 rounded-full bg-slate-900 border-2 border-gray-300" />
                          </div>
                        </div>

                        {/* COURIER WORKERS / BOXES ART */}
                        <div className="flex items-end gap-1.5 z-10">
                          <div className="h-6 w-6 rounded-md bg-amber-600 border border-slate-800" />
                          <div className="h-8 w-8 rounded-md bg-amber-700 border border-slate-800" />
                        </div>
                      </div>

                      {/* ROAD LINE BASE */}
                      <div className="absolute bottom-0 w-full h-0.5 bg-slate-400" />
                    </div>
                  </div>
                </div>
              )}

              {screen === 'CHOOSE_TRUCK' && (
                <div className="max-w-4xl space-y-6">
                  <button
                    type="button"
                    onClick={() => setScreen('HOME')}
                    className="flex items-center gap-2 text-xs font-bold text-[#F37021] hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                  </button>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-5 space-y-3">
                      <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#F37021]" /> Schedule Pickup
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                            Pickup Date
                          </label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full rounded-xl border border-[#F37021] bg-white p-2.5 text-xs font-bold text-black outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                            Pickup Time
                          </label>
                          <input
                            type="time"
                            required
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full rounded-xl border border-[#F37021] bg-white p-2.5 text-xs font-bold text-black outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-5 space-y-3">
                      <h3 className="text-xs font-black text-black uppercase tracking-wider">
                        Goods & Weight Details
                      </h3>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                          Goods Category
                        </label>
                        <select
                          value={selectedGoodsType}
                          onChange={(e) => setSelectedGoodsType(e.target.value)}
                          className="w-full rounded-xl border border-[#F37021] bg-white p-2.5 text-xs font-bold text-black outline-none"
                        >
                          {GOODS_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                            Load Weight (Tons)
                          </label>
                          <input
                            type="number"
                            value={loadWeight}
                            onChange={(e) => setLoadWeight(e.target.value)}
                            placeholder="e.g. 5"
                            className="w-full rounded-xl border border-[#F37021] bg-white p-2.5 text-xs font-bold text-black outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                            Extra Cost (₹)
                          </label>
                          <input
                            type="number"
                            value={expectedTransportationCost}
                            onChange={(e) => setExpectedTransportationCost(e.target.value)}
                            placeholder="e.g. 800"
                            className="w-full rounded-xl border border-[#F37021] bg-white p-2.5 text-xs font-bold text-black outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">Select Commercial Vehicle</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {TRUCK_TYPES.map((truck) => (
                        <button
                          key={truck.id}
                          type="button"
                          onClick={() => setSelectedTruck(truck)}
                          className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                            selectedTruck.id === truck.id
                              ? 'border-[#F37021] bg-orange-50/50 ring-2 ring-[#F37021]/20'
                              : 'border-gray-200 bg-white hover:border-[#F37021]/50'
                          }`}
                        >
                          <div className="flex-1 pr-3 min-w-0">
                            {truck.badge && (
                              <span className="mb-1 inline-block rounded-md bg-orange-100 px-2 py-0.5 text-[9px] font-bold text-[#F37021]">
                                {truck.badge}
                              </span>
                            )}
                            <h4 className="font-bold text-black group-hover:text-[#F37021] transition text-xs truncate">
                              {truck.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5 truncate">Capacity: {truck.capacity}</p>
                            <p className="mt-2 text-base font-black text-[#F37021]">
                              ₹{truck.basePrice}
                            </p>
                          </div>

                          <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
                            <img
                              src={truck.image}
                              alt={truck.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScreen('CONFIRM')}
                    className="w-full rounded-xl bg-[#F37021] py-3 text-sm font-bold text-white shadow-md hover:bg-[#D95D12] transition"
                  >
                    Continue to Confirmation
                  </button>
                </div>
              )}

              {screen === 'CONFIRM' && (
                <div className="max-w-2xl space-y-6 mx-auto">
                  <h2 className="text-2xl font-black text-center">Confirm Booking Details</h2>
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/30 p-6 space-y-3 text-xs font-bold">
                    <p className="break-words"><span className="text-gray-500">From:</span> {fromLocation || 'Sircilla, Telangana'}</p>
                    <p className="break-words"><span className="text-gray-500">To:</span> {toLocation || 'Hitech City, Hyderabad'}</p>
                    <p><span className="text-gray-500">Pickup Date:</span> {bookingDate}</p>
                    <p><span className="text-gray-500">Pickup Time:</span> {bookingTime}</p>
                    <p><span className="text-gray-500">Truck:</span> {selectedTruck.name}</p>
                    <p><span className="text-gray-500">Goods Category:</span> {selectedGoodsType}</p>
                    <p><span className="text-gray-500">Weight:</span> {loadWeight || '0'} Tons</p>
                    <p className="text-lg font-black text-[#F37021] pt-3 border-t border-orange-200">Total Fare: ₹{selectedTruck.basePrice + (Number(expectedTransportationCost) || 0)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleConfirmPickup}
                    className="w-full rounded-xl bg-[#F37021] py-3 text-sm font-bold text-white shadow-md hover:bg-[#D95D12] transition"
                  >
                    Confirm Pickup & Save
                  </button>
                </div>
              )}

              {screen === 'WAITING' && (
                <div className="max-w-xl space-y-6 text-center py-6 mx-auto">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-[#F37021]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-black">Booking Confirmed!</h2>
                    <p className="text-xs font-bold text-gray-500 mt-1">
                      Booking ID: #{currentPendingOrder?.id}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-orange-200 bg-white p-6 text-left shadow-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Route Details</span>
                      <span className="text-xs font-bold text-[#F37021] truncate">{currentPendingOrder?.truck_name}</span>
                    </div>
                    <p className="text-base font-bold text-black break-words">
                      {currentPendingOrder?.from_location} → {currentPendingOrder?.to_location}
                    </p>

                    {renderStatusTracker(currentPendingOrder?.status || 'Order Waiting')}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setScreen('HISTORY')}
                      className="flex-1 rounded-xl border border-orange-200 bg-orange-50 py-3 text-xs font-bold text-[#F37021]"
                    >
                      View All Bookings
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreen('HOME')}
                      className="flex-1 rounded-xl bg-[#F37021] py-3 text-xs font-bold text-white shadow-xs"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}

              {screen === 'HISTORY' && (
                <div className="max-w-4xl space-y-6">
                  <button
                    type="button"
                    onClick={() => setScreen('HOME')}
                    className="flex items-center gap-2 text-xs font-bold text-[#F37021] hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                  </button>

                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-black">Booking History</h2>
                    <span className="text-xs font-bold text-gray-500">
                      Total: {bookingHistory.length}
                    </span>
                  </div>

                  {bookingHistory.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 p-10 text-center text-gray-500 text-xs font-bold">
                      No past bookings found.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {bookingHistory.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedBookingDetail(item)}
                          className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-xs space-y-3 hover:border-[#F37021] transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="rounded-md bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold text-[#F37021]">
                              #{item.id}
                            </span>
                            <span className="text-sm font-black text-[#F37021]">
                              ₹{item.fare}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-bold text-black group-hover:text-[#F37021] transition break-words">
                            {item.from_location} → {item.to_location}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            Vehicle: <span className="font-semibold text-gray-700">{item.truck_name}</span>
                          </p>

                          {renderStatusTracker(item.status || 'Order Waiting')}

                          <div className="pt-1 text-right">
                            <span className="text-[10px] font-bold text-[#F37021] group-hover:underline">
                              View Full Order →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODALS */}
      {selectedBookingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-black">Booking Details</h3>
                <p className="text-[10px] font-bold text-[#F37021] mt-0.5">
                  Order ID: #{selectedBookingDetail.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookingDetail(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 space-y-2">
                <div>
                  <p className="text-[9px] font-bold uppercase text-gray-400">Pickup Location</p>
                  <p className="font-bold text-black text-xs mt-0.5 break-words">{selectedBookingDetail.from_location}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-gray-400">Dropoff Location</p>
                  <p className="font-bold text-black text-xs mt-0.5 break-words">{selectedBookingDetail.to_location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-[9px] font-bold uppercase text-gray-400">Vehicle Type</p>
                  <p className="font-bold text-black text-xs mt-0.5 truncate">{selectedBookingDetail.truck_name}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-[9px] font-bold uppercase text-gray-400">Goods Category</p>
                  <p className="font-bold text-black text-xs mt-0.5 truncate">{selectedBookingDetail.goods_type || 'General'}</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5 space-y-2">
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Load Weight:</span>
                  <span className="font-bold text-black">{selectedBookingDetail.weight || 0} Tons</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Vehicle Base Fare:</span>
                  <span className="font-bold text-black">₹{selectedBookingDetail.vehicle_fare || selectedBookingDetail.fare}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-black text-[#F37021]">
                  <span>Total Fare:</span>
                  <span>₹{selectedBookingDetail.fare}</span>
                </div>
              </div>

              {renderStatusTracker(selectedBookingDetail.status || 'Order Waiting')}
            </div>

            <button
              type="button"
              onClick={() => setSelectedBookingDetail(null)}
              className="w-full rounded-xl bg-[#F37021] py-3 text-xs font-bold text-white shadow-xs hover:bg-[#D95D12]"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {activeProfileModal === 'EDIT_PROFILE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-black">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setActiveProfileModal(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold bg-white focus:ring-2 focus:ring-[#F37021] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Phone Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold bg-white focus:ring-2 focus:ring-[#F37021] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold bg-white focus:ring-2 focus:ring-[#F37021] outline-none"
                />
              </div>

              {profileMessage && (
                <p className="text-[11px] font-bold text-emerald-600">{profileMessage}</p>
              )}

              <button
                type="button"
                onClick={handleSaveProfile}
                className="w-full rounded-xl bg-[#F37021] py-3 text-xs font-bold text-white shadow-xs hover:bg-[#D95D12]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {activeProfileModal === 'CHANGE_PASSWORD' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-black">Change Password</h3>
              <button
                type="button"
                onClick={() => setActiveProfileModal(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Current Password</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              {passwordError && (
                <p className="text-[11px] font-bold text-rose-600">{passwordError}</p>
              )}

              {passwordSuccess && (
                <p className="text-[11px] font-bold text-emerald-600">{passwordSuccess}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#F37021] py-3 text-xs font-bold text-white hover:bg-[#D95D12]"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SAVED ADDRESSES MODAL */}
      {activeProfileModal === 'SAVED_ADDRESSES' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-black">Saved Addresses</h3>
              <button
                type="button"
                onClick={() => setActiveProfileModal(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {savedAddresses.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-orange-50/30 p-3">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-black truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">{item.address}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              <div className="pt-3 border-t border-gray-100 space-y-3">
                <p className="text-xs font-bold text-black">Add New Location</p>
                <input
                  type="text"
                  placeholder="Title (e.g. Factory #1)"
                  value={newAddressTitle}
                  onChange={(e) => setNewAddressTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold outline-none"
                />
                <input
                  type="text"
                  placeholder="Full Street Address"
                  value={newAddressText}
                  onChange={(e) => setNewAddressText(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-bold outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F37021] py-2.5 text-xs font-bold text-white hover:bg-[#D95D12]"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HELP MODAL */}
      {activeProfileModal === 'HELP_SUPPORT' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-black">Help & Support</h3>
              <button
                type="button"
                onClick={() => setActiveProfileModal(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-orange-100 bg-orange-50 p-3 space-y-1">
                <p className="text-xs font-bold text-black">24/7 Transmaa Customer Hotline</p>
                <p className="text-xs font-bold text-[#F37021]">+91 1800-123-4567</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 space-y-1">
                <p className="text-xs font-bold text-black">WhatsApp Live Assistance</p>
                <p className="text-xs font-bold text-emerald-600">+91 9848012345</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TERMS MODAL */}
      {activeProfileModal === 'TERMS_PRIVACY' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-black">Terms & Privacy Policy</h3>
              <button
                type="button"
                onClick={() => setActiveProfileModal(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 text-[11px] text-gray-600 max-h-60 overflow-y-auto">
              <p className="font-bold text-black">Transmaa Freight & Logistics Terms:</p>
              <p>1. All cargo transported must comply with national transport regulations.</p>
              <p>2. Hazardous or illegal materials are strictly prohibited.</p>
              <p>3. Transit safety is monitored via live status updates.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}