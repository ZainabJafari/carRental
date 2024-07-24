'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useBookingContext } from '@/context/dateContext';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  payment_method: string;
}

interface UserContextProps extends UserDetails {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPaymentMethod: (method: string) => void;
  submitUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [payment_method, setPaymentMethod] = useState<string>('');
  const { submitBooking } = useBookingContext();

  const submitUser = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, payment_method }),
      });

      if (!response.ok) {
        console.log('Network response was not ok');
      }

      const userData = await response.json();
      console.log('User created successfully:', userData);
      await submitBooking(); // Skicka bokningen efter användarens data sparats
    } catch (error) {
      console.error('There was a problem with the user submission:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        phone,
        payment_method,
        setName,
        setEmail,
        setPhone,
        setPaymentMethod,
        submitUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
