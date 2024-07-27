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
    <div className="flex justify-center px-56">
    <form onSubmit={handleSubmit} className="w-full p-8 bg-white rounded-xl shadow-lg">

      
      <div className="flex flex-col md:flex-row gap-1 mb-6">
        <div className="w-full">
          <label className="block mb-2 font-medium text-gray-600">Pick-up location</label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Pick-up location</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row w-3/5">
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-600">Pickup Date</label>
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-600">Pickup Time</label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Time</option>
              {times.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-1 mb-6">
        <div className="w-full">
          <label className="block mb-2 font-medium text-gray-600">Dropoff Location</label>
          <select
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Drop-off location</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row w-3/5">
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-600">Dropoff Date</label>
            <DatePicker
              selected={dropoffDate}
              onChange={(date) => setDropoffDate(date)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-600">Dropoff Time</label>
            <select
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Time</option>
              {times.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>


      <div className="flex justify-center">
        <Link href={'/cars'}>
          <button type="submit" className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-800 transition">
            Search
          </button>
        </Link>
      </div>
    </form>
  </div>
  );
};

export default PickupDropoffForm;
