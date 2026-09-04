import React, { useState } from 'react';
import { ArrowLeft, Landmark, ShieldCheck, HelpCircle } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function FinanceInsurance({ onBack, user }) {
  const [activeTab, setActiveTab] = useState('finance');

  // Finance Form State
  const [financeName, setFinanceName] = useState('');
  const [financePhone, setFinancePhone] = useState('');
  const [financeVehicle, setFinanceVehicle] = useState('');
  const [financeRC, setFinanceRC] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

  // Insurance Form State
  const [insuranceName, setInsuranceName] = useState('');
  const [insurancePhone, setInsurancePhone] = useState('');
  const [insuranceVehicle, setInsuranceVehicle] = useState('');
  const [insuranceRC, setInsuranceRC] = useState('');
  const [insuranceType, setInsuranceType] = useState('');

  const handleFinanceSubmit = async (e) => {
    e.preventDefault();

    if (!financeName.trim()) return alert('Please enter your name');
    if (!financePhone.trim()) return alert('Please enter phone number');
    if (financePhone.trim().length !== 10) return alert('Please enter a valid 10-digit phone number');
    if (!financeVehicle.trim()) return alert('Please enter vehicle type');
    if (!financeRC.trim()) return alert('Please enter RC number');
    if (!loanAmount.trim()) return alert('Please enter loan amount');

    if (user) {
      await supabase.from('finance_insurance_requests').insert([
        {
          applicant_id: user.id,
          request_type: 'Finance',
          vehicle_details: `${financeVehicle} (RC: ${financeRC})`,
          requested_amount: Number(loanAmount),
          status: 'Under Review',
        },
      ]);
    }

    alert('Finance application submitted successfully!');
    setActiveTab('insurance');
  };

  const handleInsuranceSubmit = async (e) => {
    e.preventDefault();

    if (!insuranceName.trim()) return alert('Please enter your name');
    if (!insurancePhone.trim()) return alert('Please enter phone number');
    if (insurancePhone.trim().length !== 10) return alert('Please enter a valid 10-digit phone number');
    if (!insuranceVehicle.trim()) return alert('Please enter vehicle type');
    if (!insuranceRC.trim()) return alert('Please enter RC number');
    if (!insuranceType) return alert('Please select insurance type');

    if (user) {
      await supabase.from('finance_insurance_requests').insert([
        {
          applicant_id: user.id,
          request_type: 'Insurance',
          vehicle_details: `${insuranceVehicle} (RC: ${insuranceRC}) - ${insuranceType}`,
          status: 'Under Review',
        },
      ]);
    }

    alert('Insurance enquiry submitted successfully!');
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-start items-center py-6 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[#F37021] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </button>

        {/* MAIN FORM CARD */}
        <div className="w-full rounded-3xl border border-orange-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-black text-black tracking-tight">
              Tran<span className="text-[#F37021]">SMAA</span>
            </h1>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-[#F37021]">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">Commercial Vehicles Services</h2>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Apply for truck financing or renew vehicle insurance instantly.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-orange-50/80 p-1.5 border border-orange-100">
            <button
              type="button"
              onClick={() => setActiveTab('finance')}
              className={`flex items-center justify-center gap-2 py-3 text-sm font-black rounded-xl transition ${
                activeTab === 'finance'
                  ? 'bg-[#F37021] text-white shadow-md'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <Landmark className="h-4 w-4" /> Finance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('insurance')}
              className={`flex items-center justify-center gap-2 py-3 text-sm font-black rounded-xl transition ${
                activeTab === 'insurance'
                  ? 'bg-[#F37021] text-white shadow-md'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Insurance
            </button>
          </div>

          {/* FINANCE FORM */}
          {activeTab === 'finance' && (
            <form onSubmit={handleFinanceSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={financeName}
                  onChange={(e) => setFinanceName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={financePhone}
                  onChange={(e) => setFinancePhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Type of Vehicle</label>
                <input
                  type="text"
                  required
                  value={financeVehicle}
                  onChange={(e) => setFinanceVehicle(e.target.value)}
                  placeholder="e.g. 10-Wheeler Commercial Truck"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">RC Number</label>
                <input
                  type="text"
                  required
                  value={financeRC}
                  onChange={(e) => setFinanceRC(e.target.value)}
                  placeholder="e.g. TS08EX1234"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Requested Loan Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#F37021] py-4 text-sm font-bold text-white shadow-lg hover:bg-[#D95D12] transition mt-2"
              >
                Submit Finance Application
              </button>
            </form>
          )}

          {/* INSURANCE FORM */}
          {activeTab === 'insurance' && (
            <form onSubmit={handleInsuranceSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={insuranceName}
                  onChange={(e) => setInsuranceName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={insurancePhone}
                  onChange={(e) => setInsurancePhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Type of Vehicle</label>
                <input
                  type="text"
                  required
                  value={insuranceVehicle}
                  onChange={(e) => setInsuranceVehicle(e.target.value)}
                  placeholder="e.g. Closed Container Truck"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">RC Number</label>
                <input
                  type="text"
                  required
                  value={insuranceRC}
                  onChange={(e) => setInsuranceRC(e.target.value)}
                  placeholder="e.g. TS08EX1234"
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Insurance Policy Type</label>
                <select
                  required
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value)}
                  className="w-full rounded-xl border border-orange-200 bg-white p-3.5 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-[#F37021]"
                >
                  <option value="">Select insurance type</option>
                  <option value="Third Party">Third Party Policy</option>
                  <option value="Comprehensive">Comprehensive Coverage</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#F37021] py-4 text-sm font-bold text-white shadow-lg hover:bg-[#D95D12] transition mt-2"
              >
                Submit Insurance Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}