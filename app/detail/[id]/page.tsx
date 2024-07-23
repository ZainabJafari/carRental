"use client"

import { CarProps } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCarContext } from '@/context/carContext';

const page = ({ params }: { params: { id: string} }) => {

  const { fetchCarById } = useCarContext();
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

  return (
    <div className="car-detail-page max-w-7xl mx-auto p-6">
    <div className="hero bg-gray-100 rounded-lg shadow-lg p-6 mb-8">
      <h1 className="text-3xl font-bold mb-4">{car.make} {car.model}</h1>
      <p className="text-lg text-gray-700 mb-4">Year: {car.year}</p>
      <p className="text-lg text-gray-700 mb-4">Transmission: {car.transmission}</p>
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
        <Image src={car.car_img} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
      </div>
    </div>

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
          <p className="text-gray-700">{car.class}</p>
        </div>
      </div>
    </div>

    <div className="gallery bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add more images to the gallery here */}
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Image src={car.car_img} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
        </div>
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Image src={car.car_img} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
        </div>
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Image src={car.car_img} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default page;
