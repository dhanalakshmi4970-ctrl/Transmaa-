import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Truck, MapPin, PackageCheck, Wallet, UserCircle } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, setBookingStep, orders } = useBooking();
  const activeCount = orders.filter((o) => o.status !== 'COMPLETED').length;

  const navItems = [
    {
      id: 'HOME',
      label: 'Book Load',
      icon: Truck,
      onClick: () => {
        setActiveTab('HOME');
        setBookingStep(1);
      }
    },
    {
      id: 'TRACKING',
      label: 'Track',
      icon: MapPin,
      badge: activeCount > 0 ? activeCount : null,
      onClick: () => setActiveTab('TRACKING')
    },
    {
      id: 'ORDERS',
      label: 'My Orders',
      icon: PackageCheck,
      onClick: () => setActiveTab('ORDERS')
    },
    {
      id: 'WALLET',
      label: 'Wallet',
      icon: Wallet,
      onClick: () => setActiveTab('WALLET')
    },
    {
      id: 'PROFILE',
      label: 'Profile',
      icon: UserCircle,
      onClick: () => setActiveTab('PROFILE')
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'HOME' &&
              ['GOODS_SCHEDULE', 'VEHICLE_SELECT', 'REVIEW_PAY'].includes(activeTab));

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-orange-600 font-bold scale-105'
                  : 'text-slate-500 font-medium hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 bg-orange-600 rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
