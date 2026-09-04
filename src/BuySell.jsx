import React, { useState } from 'react';
import {
  Search,
  Heart,
  Eye,
  CheckCircle,
  X,
  Camera,
  ArrowLeft,
  Phone,
  User
} from 'lucide-react';

const INITIAL_VEHICLES = [
  {
    id: 1,
    brand: 'Kia',
    model: 'Carnival',
    price: 2850000,
    priceFormatted: '₹28,50,000',
    location: 'Chennai',
    year: 2021,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    brand: 'Mahindra',
    model: 'TUV300',
    price: 850000,
    priceFormatted: '₹8,50,000',
    location: 'Chennai',
    year: 2017,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    brand: 'Tata',
    model: 'Alto',
    price: 525000,
    priceFormatted: '₹5,25,000',
    location: 'Tambaram',
    year: 2017,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    brand: 'Mahindra',
    model: 'XUV',
    price: 1275000,
    priceFormatted: '₹12,75,000',
    location: 'Coimbatore',
    year: 2019,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=60',
  },
];

export default function BuySell({ onBack, user }) {
  const [activeTab, setActiveTab] = useState('BUY');
  const [vehicles] = useState(INITIAL_VEHICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [favorites, setFavorites] = useState({});

  // Modals
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [interestModalVehicle, setInterestModalVehicle] = useState(null);
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  // Sell Form State
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [rcNo, setRcNo] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Image Upload Previews
  const [previews, setPreviews] = useState({
    front: null,
    back: null,
    right: null,
    left: null,
  });

  const handleImageChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [side]: imageUrl }));
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = priceFilter ? v.price <= Number(priceFilter) : true;
    const matchesYear = yearFilter ? v.year === Number(yearFilter) : true;

    return matchesSearch && matchesPrice && matchesYear;
  });

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    setFormSuccess('Vehicle listing submitted successfully! Our team will review your application.');
    setTimeout(() => {
      setFormSuccess('');
      setSellerName('');
      setSellerPhone('');
      setVehicleNo('');
      setVehicleModel('');
      setRcNo('');
      setVehicleYear('');
      setPreviews({ front: null, back: null, right: null, left: null });
      setActiveTab('BUY');
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* HEADER & SWITCH BUTTONS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#F37021] hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </button>
          <h2 className="text-xl font-bold text-gray-900">Commercial Vehicles</h2>
          <div className="mt-1 h-1 w-16 rounded-full bg-[#F37021]" />
        </div>

        {/* BUY / SELL SWITCH BUTTONS */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('BUY')}
            className={`rounded-lg px-6 py-2 text-xs font-bold transition cursor-pointer ${
              activeTab === 'BUY'
                ? 'bg-[#F37021] text-white shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            BUY
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SELL')}
            className={`rounded-lg px-6 py-2 text-xs font-bold transition cursor-pointer ${
              activeTab === 'SELL'
                ? 'bg-[#F37021] text-white shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            SELL
          </button>
        </div>
      </div>

      {/* BUY SECTION */}
      {activeTab === 'BUY' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-gray-800">Available Vehicles</h3>

            {/* SEARCH & FILTERS */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vehicle model..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-3 text-xs font-medium text-gray-800 placeholder-gray-400 focus:border-[#F37021] outline-none"
                />
              </div>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs font-medium text-gray-800 focus:border-[#F37021] outline-none cursor-pointer"
              >
                <option value="">All Prices</option>
                <option value="700000">Below ₹7 Lakh</option>
                <option value="1300000">Below ₹13 Lakh</option>
                <option value="2000000">Below ₹20 Lakh</option>
                <option value="3000000">Below ₹30 Lakh</option>
              </select>

              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs font-medium text-gray-800 focus:border-[#F37021] outline-none cursor-pointer"
              >
                <option value="">All Years</option>
                <option value="2021">2021</option>
                <option value="2019">2019</option>
                <option value="2017">2017</option>
              </select>
            </div>
          </div>

          {/* VEHICLE CARDS GRID */}
          {filteredVehicles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center text-xs font-bold text-gray-400">
              No vehicles found matching your filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:border-[#F37021] transition"
                >
                  <div>
                    <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFavorite(vehicle.id)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 hover:bg-white cursor-pointer shadow-sm"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites[vehicle.id] ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="text-sm font-black text-gray-900">{vehicle.brand}</h4>
                    <div className="mt-2 space-y-1 text-[11px] text-gray-600">
                      <p>
                        <span className="font-bold text-gray-400">Model:</span> {vehicle.model}
                      </p>
                      <p className="font-bold text-[#F37021]">
                        <span>Price:</span> {vehicle.priceFormatted}
                      </p>
                      <p>
                        <span className="font-bold text-gray-400">Location:</span> {vehicle.location}
                      </p>
                      <p>
                        <span className="font-bold text-gray-400">Year:</span> {vehicle.year}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setInterestModalVehicle(vehicle);
                        setInterestSubmitted(false);
                      }}
                      className="w-full rounded-lg bg-[#F37021] py-2 text-[11px] font-bold text-white shadow-sm hover:bg-[#D95D12] transition cursor-pointer"
                    >
                      Interested to buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedVehicleDetails(vehicle)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-gray-50 py-1.5 text-[11px] font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SELL SECTION */}
      {activeTab === 'SELL' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900">Sell Your Vehicle</h3>
            <p className="text-xs text-gray-500">
              Fill in the vehicle specifications to list your commercial vehicle for buyers.
            </p>
          </div>

          <form onSubmit={handleSaveVehicle} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-xs font-semibold text-black outline-none focus:border-[#F37021]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9848012345"
                    className="w-full rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-xs font-semibold text-black outline-none focus:border-[#F37021]"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Vehicle No</label>
                <input
                  type="text"
                  required
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="TS 07 EX 1234"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs font-semibold text-black outline-none focus:border-[#F37021]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Vehicle Model</label>
                <input
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Tata Ace Gold"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs font-semibold text-black outline-none focus:border-[#F37021]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">RC No</label>
                <input
                  type="text"
                  required
                  value={rcNo}
                  onChange={(e) => setRcNo(e.target.value)}
                  placeholder="RC12345678"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs font-semibold text-black outline-none focus:border-[#F37021]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">Years of Vehicle</label>
                <input
                  type="number"
                  required
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  placeholder="e.g. 2020"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs font-semibold text-black outline-none focus:border-[#F37021]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="mb-2 block text-xs font-bold text-gray-800">Upload Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['front', 'back', 'right', 'left'].map((side) => (
                  <div key={side} className="flex flex-col items-center">
                    <span className="mb-1 text-[10px] font-bold text-gray-500 capitalize">{side} Side</span>
                    <label className="relative flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-orange-50/50 hover:border-[#F37021] transition overflow-hidden">
                      {previews[side] ? (
                        <img src={previews[side]} alt={side} className="h-full w-full object-cover" />
                      ) : (
                        <Camera className="h-5 w-5 text-gray-400" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, side)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {formSuccess && (
              <p className="text-xs font-bold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                {formSuccess}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#F37021] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#D95D12] transition cursor-pointer"
            >
              Save Data & List Vehicle
            </button>
          </form>
        </div>
      )}

      {/* VEHICLE DETAILS POPUP */}
      {selectedVehicleDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-black">Vehicle Details</h3>
              <button
                type="button"
                onClick={() => setSelectedVehicleDetails(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 font-bold cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="h-40 w-full overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={selectedVehicleDetails.image}
                  alt={selectedVehicleDetails.model}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Brand:</span>
                  <span className="font-black text-gray-900">{selectedVehicleDetails.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Model:</span>
                  <span className="font-bold text-gray-900">{selectedVehicleDetails.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Location:</span>
                  <span className="font-bold text-gray-900">{selectedVehicleDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Year:</span>
                  <span className="font-bold text-gray-900">{selectedVehicleDetails.year}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-black text-[#F37021]">
                  <span>Price:</span>
                  <span>{selectedVehicleDetails.priceFormatted}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedVehicleDetails(null)}
              className="w-full rounded-xl bg-[#F37021] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#D95D12] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* INTEREST POPUP */}
      {interestModalVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-[#F37021]">
              <CheckCircle className="h-8 w-8" />
            </div>

            {interestSubmitted ? (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-black">Interest Registered!</h3>
                <p className="text-xs text-gray-500">
                  Our sales representative will contact you shortly regarding the{' '}
                  <span className="font-bold text-black">{interestModalVehicle.brand} {interestModalVehicle.model}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setInterestModalVehicle(null)}
                  className="mt-4 w-full rounded-xl bg-[#F37021] py-2.5 text-xs font-bold text-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-black">Express Interest</h3>
                <p className="text-xs text-gray-500">
                  Are you interested in purchasing{' '}
                  <span className="font-bold text-black">
                    {interestModalVehicle.brand} {interestModalVehicle.model}
                  </span>{' '}
                  for {interestModalVehicle.priceFormatted}?
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInterestModalVehicle(null)}
                    className="flex-1 rounded-xl border border-gray-300 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestSubmitted(true)}
                    className="flex-1 rounded-xl bg-[#F37021] py-2.5 text-xs font-bold text-white hover:bg-[#D95D12] cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}