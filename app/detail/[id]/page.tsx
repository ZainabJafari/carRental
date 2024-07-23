'use client';

import { CarProps } from '@/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCarContext } from '@/context/carContext';
import { useBookingContext } from '@/context/dateContext';

const page = ({ params }: { params: { id: string} }) => {
  const { fetchCarById } = useCarContext();
  const { pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime } = useBookingContext();
  const [car, setCar] = useState<CarProps | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchCarById(params.id as string).then((carData) => {
        if (carData) {
          setCar(carData);
        } else {
          console.error('Car not found');
        }
      });
    }
  }, [params.id, fetchCarById]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString() : 'Not selected';
  };

  return (
    <div className="car-detail-page max-w-7xl mx-auto p-6">
      <div className="specifications bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Make</h3>
            <p className="text-gray-700">{car.make}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Model</h3>
            <p className="text-gray-700">{car.model}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Year</h3>
            <p className="text-gray-700">{car.year}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Transmission</h3>
            <p className="text-gray-700">{car.transmission}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Fuel Type</h3>
            <p className="text-gray-700">{car.fuel_type}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Mileage</h3>
            <p className="text-gray-700">{car.class}</p> {/* Changed from car.class to car.mileage */}
          </div>
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <Image src={car.car_img} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>

      <div className="booking-details bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Pickup Date</h3>
            <p className="text-gray-700">{formatDate(pickupDate)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pickup Location</h3>
            <p className="text-gray-700">{pickupLocation || 'Not selected'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pickup Time</h3>
            <p className="text-gray-700">{pickupTime || 'Not selected'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Dropoff Date</h3>
            <p className="text-gray-700">{formatDate(dropoffDate)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Dropoff Location</h3>
            <p className="text-gray-700">{dropoffLocation || 'Not selected'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Dropoff Time</h3>
            <p className="text-gray-700">{dropoffTime || 'Not selected'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
