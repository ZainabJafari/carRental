'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { useBookingContext } from '@/context/dateContext';
import Link from 'next/link';

const locations = ["Location 1", "Location 2", "Location 3"];
const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const PickupDropoffForm = () => {
  const {
    pickupDate,
    setPickupDate,
    pickupLocation,
    setPickupLocation,
    pickupTime,
    setPickupTime,
    dropoffDate,
    setDropoffDate,
    dropoffLocation,
    setDropoffLocation,
    dropoffTime,
    setDropoffTime,
    submitBooking
  } = useBookingContext();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBooking()
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pickup Details</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="block mb-2">Pickup Date</label>
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Pickup Location</label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block mb-2">Pickup Time</label>
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select time</option>
            {times.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Dropoff Details</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="block mb-2">Dropoff Date</label>
          <DatePicker
            selected={dropoffDate}
            onChange={(date) => setDropoffDate(date)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Dropoff Location</label>
          <select
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block mb-2">Dropoff Time</label>
          <select
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select time</option>
            {times.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <Link href={'/cars'}>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Submit
      </button>
      </Link>

    </form>
  );
};

export default PickupDropoffForm;
