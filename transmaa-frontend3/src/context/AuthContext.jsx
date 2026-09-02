import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('transmaa_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr_default',
        name: 'Sai',
        phone: '9848012345',
        isLoggedIn: true,
        isGoldMember: true,
        walletBalance: 850
      };
    } catch {
      return {
        id: 'usr_default',
        name: 'Sai',
        phone: '9848012345',
        isLoggedIn: true,
        isGoldMember: true,
        walletBalance: 850
      };
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState('PHONE'); // 'PHONE' | 'OTP'
  const [authLoading, setAuthLoading] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('transmaa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('transmaa_user');
    }
  }, [user]);

  const requestOtp = async (phone, name = '') => {
    setAuthLoading(true);
    try {
      setTempPhone(phone);
      setTempName(name);
      const res = await api.sendOtp(phone);
      setAuthStep('OTP');
      return res;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithOtp = async (otp) => {
    setAuthLoading(true);
    try {
      const res = await api.verifyOtp(tempPhone, otp, tempName || 'Sai');
      const loggedUser = {
        ...res.user,
        isLoggedIn: true
      };
      setUser(loggedUser);
      setAuthModalOpen(false);
      setAuthStep('PHONE');
      return loggedUser;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser({
      id: 'usr_guest',
      name: 'Guest',
      phone: '',
      isLoggedIn: false,
      isGoldMember: false,
      walletBalance: 0
    });
  };

  const topupWallet = (amount) => {
    if (user) {
      setUser((prev) => ({
        ...prev,
        walletBalance: (prev.walletBalance || 0) + amount
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authModalOpen,
        setAuthModalOpen,
        authStep,
        setAuthStep,
        authLoading,
        tempPhone,
        tempName,
        setTempName,
        setTempPhone,
        requestOtp,
        loginWithOtp,
        logout,
        topupWallet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
