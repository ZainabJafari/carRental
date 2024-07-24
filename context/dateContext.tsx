'use client';

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface BookingDetails {
  pickupDate: Date | null;
  pickupLocation: string;
  pickupTime: string;
  dropoffDate: Date | null;
  dropoffLocation: string;
  dropoffTime: string;
}

interface BookingContextProps extends BookingDetails {
  setPickupDate: (date: Date | null) => void;
  setPickupLocation: (location: string) => void;
  setPickupTime: (time: string) => void;
  setDropoffDate: (date: Date | null) => void;
  setDropoffLocation: (location: string) => void;
  setDropoffTime: (time: string) => void;
  resetBooking: () => void;
  submitBooking: () => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<string>('');
  const [dropoffTime, setDropoffTime] = useState<string>('');

  useEffect(() => {
    const savedData = localStorage.getItem('bookingDetails');
    if (savedData) {
      const parsedData: BookingDetails = JSON.parse(savedData);
      setPickupDate(parsedData.pickupDate ? new Date(parsedData.pickupDate) : null);
      setPickupLocation(parsedData.pickupLocation);
      setPickupTime(parsedData.pickupTime);
      setDropoffDate(parsedData.dropoffDate ? new Date(parsedData.dropoffDate) : null);
      setDropoffLocation(parsedData.dropoffLocation);
      setDropoffTime(parsedData.dropoffTime);
    }
  }, []);

  useEffect(() => {
    const bookingDetails: BookingDetails = {
      pickupDate,
      pickupLocation,
      pickupTime,
      dropoffDate,
      dropoffLocation,
      dropoffTime,
    };
    localStorage.setItem('bookingDetails', JSON.stringify({
      ...bookingDetails,
      pickupDate: pickupDate ? pickupDate.toISOString() : null,
      dropoffDate: dropoffDate ? dropoffDate.toISOString() : null,
    }));
  }, [pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime]);

  const resetBooking = () => {
    setPickupDate(null);
    setPickupLocation('');
    setPickupTime('');
    setDropoffDate(null);
    setDropoffLocation('');
    setDropoffTime('');
  };

  const submitBooking = async () => {
    const bookingDetails: BookingDetails = {
      pickupDate,
      pickupLocation,
      pickupTime,
      dropoffDate,
      dropoffLocation,
      dropoffTime,
    };

    try {
      const response = await fetch('http://localhost:8800/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Booking successful:', data);
      // Handle successful booking (e.g., show a success message or redirect)
    } catch (error) {
      console.error('There was a problem with the booking:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <BookingContext.Provider
      value={{
        pickupDate,
        pickupLocation,
        pickupTime,
        dropoffDate,
        dropoffLocation,
        dropoffTime,
        setPickupDate,
        setPickupLocation,
        setPickupTime,
        setDropoffDate,
        setDropoffLocation,
        setDropoffTime,
        resetBooking,
        submitBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};
