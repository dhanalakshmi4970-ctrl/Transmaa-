import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import confetti from 'canvas-confetti';
import {
  Truck,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Navigation,
  Star,
  Download,
  Share2,
  Sparkles,
  AlertCircle,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export const LiveTracking = () => {
  const {
    activeOrder,
    isSearchingDriver,
    trackingStage,
    advanceTrackingStage,
    resetBookingForm,
    setActiveTab,
    orders
  } = useBooking();

  const [rating, setRating] = useState(5);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const order = activeOrder || orders[0];

  useEffect(() => {
    if (trackingStage === 4) {
      // Fire confetti when delivered
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // silent fallback
      }
    }
  }, [trackingStage]);

  if (!order && !isSearchingDriver) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center shadow-xl border border-slate-200">
        <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-black text-slate-900">No Active Bookings to Track</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Book a truck from the home screen to track driver in real time.
        </p>
        <button
          onClick={() => {
            setActiveTab('HOME');
            resetBookingForm();
          }}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/25"
        >
          Book a Truck Now
        </button>
      </div>
    );
  }

  // 1. Radar Searching State
  if (isSearchingDriver) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center shadow-xl border border-slate-200 space-y-6">
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          {/* Radar ripple rings */}
          <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping"></div>
          <div className="absolute inset-4 rounded-full bg-orange-500/30 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/30">
            <Truck className="w-10 h-10 stroke-[2.2] animate-bounce" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Finding Nearest Transmaa Truck...
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Matching with top-rated verified drivers near{' '}
            <strong className="text-slate-800">{order?.from?.name || 'Sircilla'}</strong>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 py-2 px-4 rounded-full w-fit mx-auto border border-orange-200">
          <Clock className="w-3.5 h-3.5 animate-spin" />
          <span>Estimated response: ~10 seconds</span>
        </div>
      </div>
    );
  }

  const milestones = [
    {
      title: 'Driver Assigned',
      desc: `${order.driver?.name || 'Ramesh Kumar'} accepted the trip`,
      time: 'Just now'
    },
    {
      title: 'Arrived at Pickup',
      desc: `Reached ${order.from?.name || 'Sircilla'}`,
      time: 'In 5 mins'
    },
    {
      title: 'Goods In Transit',
      desc: `En route to ${order.to?.name || 'Hitech City, Hyderabad'}`,
      time: 'Highway 44'
    },
    {
      title: 'Trip Completed',
      desc: 'Goods safely delivered at destination',
      time: 'Completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Status Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white">
              Order #{order.id}
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              {trackingStage === 4 ? 'Delivered' : 'Live Tracking'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-2">
            {trackingStage === 0 && 'Assigning Driver...'}
            {trackingStage === 1 && 'Driver On The Way to Pickup'}
            {trackingStage === 2 && 'Driver at Pickup Location'}
            {trackingStage === 3 && 'Goods in Transit to Destination'}
            {trackingStage === 4 && '🎉 Trip Completed Successfully!'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {order.from?.city || 'Sircilla'} ➔ {order.to?.city || 'Hyderabad'} ({order.breakdown?.distanceKm || 140} km)
          </p>
        </div>

        {/* Pickup OTP Security Card */}
        {trackingStage < 4 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-center shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Pickup Security OTP
            </p>
            <div className="text-2xl font-black text-amber-400 tracking-widest mt-0.5">
              {order.pickupOtp || '4821'}
            </div>
            <p className="text-[9px] text-slate-400">Share with driver at loading</p>
          </div>
        )}
      </div>

      {/* Driver Profile Card */}
      {order.driver && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={order.driver.photo}
                alt={order.driver.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">
                    {order.driver.name}
                  </h3>
                  <span className="flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {order.driver.rating}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-600 mt-0.5">
                  {order.driver.model} •{' '}
                  <span className="text-orange-700 bg-orange-100 px-1.5 py-0.2 rounded font-mono font-bold">
                    {order.driver.vehicleNo}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {order.driver.trips}+ verified trips • Speaks {order.driver.languages}
                </p>
              </div>
            </div>

            {/* Driver Actions */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${order.driver.phone}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </a>
              <button
                type="button"
                onClick={() => alert(`Connecting chat with driver ${order.driver.name}...`)}
                className="flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Message Driver"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Milestone Progress Timeline */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-5">
          Delivery Progress Timeline
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {milestones.map((step, idx) => {
            const isCompleted = trackingStage >= idx + 1;
            const isCurrent = trackingStage === idx;

            return (
              <div key={idx} className="relative flex items-start justify-between">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-orange-600 border-orange-600 text-white'
                      : isCurrent
                      ? 'bg-white border-orange-600 text-orange-600 animate-pulse-ring'
                      : 'bg-white border-slate-300 text-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  )}
                </div>

                <div>
                  <h4
                    className={`text-sm font-black ${
                      isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                </div>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    isCurrent
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {step.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Driver Simulation Control for Demo Testing */}
      <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-black text-amber-900 uppercase">
                Interactive Simulation Controls
              </h4>
            </div>
            <p className="text-xs text-amber-800 mt-0.5">
              Click below to advance through the live delivery milestones:
            </p>
          </div>

          <div className="flex items-center gap-2">
            {trackingStage < 4 ? (
              <button
                type="button"
                onClick={advanceTrackingStage}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
              >
                <span>Advance to Next Stage ({trackingStage + 1}/4)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  resetBookingForm();
                  setActiveTab('HOME');
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Book Another Load</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* If Delivered: Driver Rating & Invoice Card */}
      {trackingStage === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              How was your experience with {order.driver?.name}?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Your feedback helps keep Transmaa service 5-star quality
            </p>
          </div>

          {/* Star rating */}
          {!feedbackSubmitted ? (
            <div className="space-y-3">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setFeedbackSubmitted(true)}
                className="px-6 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
              >
                Submit Review
              </button>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
              ✨ Thank you for rating {rating} Stars!
            </div>
          )}

          {/* Download Receipt */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => alert(`Downloading GST Tax Invoice for Order #${order.id}...`)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4 text-orange-600" />
              <span>Download Tax Invoice (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
