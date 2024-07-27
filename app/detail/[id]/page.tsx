'use client';

import { CarProps } from '@/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCarContext } from '@/context/carContext';
import { useBookingContext } from '@/context/dateContext';
import UserForm from '@/components/userForm';

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
    <div className="p-32">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className=" grid grid-cols-2 specifications bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Specifications</h2>

                        <div className="relative w-3/4 h-72 bg-gray-200 rounded-lg overflow-hidden mt-4">
                            <Image src={car.car_img} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
                        </div>
                        
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
                                <h3 className="text-lg font-semibold">Displacement</h3>
                                <p className="text-gray-700">{car.displacement}</p>
                            </div>
                 
                        </div>
                    </div>
                    <div className='mt-6'>
                        <UserForm />
                    </div>
                </div>
                <div>
                    <div className="booking-details bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
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
            </div>
        </div>
  );
};

export default page;
