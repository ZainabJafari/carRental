import React, { useState, useEffect } from 'react';
import { useCarContext } from '@/context/CarContext';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CarDetails = () => {
  const { fetchCarById } = useCarContext();
  
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchCarById(id).then(setCar);
    }
  }, [id]);

  const handleBooking = async () => {
    const bookingDetails = {
      pickupDate,
      pickupLocation,
      pickupTime,
      dropoffDate,
      dropoffLocation,
      dropoffTime,
      carId: car.id
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

  if (!car) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{car.make} {car.model}</h2>
      <p className="mb-4">Year: {car.year}</p>
      <p className="mb-4">Transmission: {car.transmission}</p>
      
      <h3 className="text-xl font-semibold mb-4">Pickup Details</h3>
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
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Pickup Time</label>
          <input
            type="text"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Dropoff Details</h3>
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
          <input
            type="text"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Dropoff Time</label>
          <input
            type="text"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default CarDetails;
