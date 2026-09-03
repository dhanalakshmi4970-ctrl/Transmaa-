import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Truck, X, User, Phone, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const LoginModal = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authStep,
    setAuthStep,
    authLoading,
    requestOtp,
    loginWithOtp,
    tempPhone,
    tempName
  } = useAuth();

  const [name, setName] = useState(tempName || 'Sai');
  const [phone, setPhone] = useState(tempPhone || '9848012345');
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  if (!authModalOpen) return null;

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!phone || phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    try {
      await requestOtp(phone, name);
    } catch (err) {
      setErrorMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setErrorMessage('Please enter complete 6-digit OTP');
      return;
    }
    try {
      await loginWithOtp(fullOtp);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Close Button */}
        <button
          onClick={() => {
            setAuthModalOpen(false);
            setAuthStep('PHONE');
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card matching Design (Peach / Warm gradient with Transmaa Logo) */}
        <div className="bg-gradient-to-b from-orange-50 via-orange-100/50 to-white px-8 pt-8 pb-6 text-center border-b border-orange-100/50">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 mb-3">
            <Truck className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            TRANS<span className="text-orange-600">MAA</span>
          </h2>
          <p className="text-lg font-bold text-slate-700 mt-1 flex items-center justify-center gap-1.5">
            <span>Welcome</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Book mini trucks & house shifting services in minutes
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {authStep === 'PHONE' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (e.g. Sai)"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white transition-all">
                  <div className="flex items-center gap-1 px-3.5 bg-slate-100/80 border-r border-slate-200 text-slate-700 font-bold text-sm">
                    <Phone className="w-4 h-4 text-orange-600" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9848012345"
                    className="w-full px-3.5 py-3 bg-transparent text-slate-900 font-bold tracking-wider placeholder:text-slate-400 placeholder:font-normal focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Terms Hint */}
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>We'll send a 6-digit OTP for instant phone verification.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading || phone.length < 10}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group transition-all"
              >
                {authLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Get OTP to Login</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Enter 6-digit OTP sent to{' '}
                  <span className="font-bold text-slate-900">+91 {phone}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setAuthStep('PHONE')}
                  className="text-xs font-bold text-orange-600 hover:underline mt-1 inline-block"
                >
                  Change Number
                </button>
              </div>

              {/* 6 Digit Inputs */}
              <div className="flex justify-between gap-2 my-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                ))}
              </div>

              {/* Quick Auto-fill badge */}
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center">
                <p className="text-xs text-amber-800 font-medium">
                  ⚡ Demo Mode: OTP is <strong className="font-bold text-orange-700">123456</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
                  className="text-[11px] font-bold text-orange-600 hover:underline mt-0.5"
                >
                  Auto-fill OTP
                </button>
              </div>

              {/* Verify OTP Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group transition-all"
              >
                {authLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
