'use client';

import { CarCard, SearchBar } from "@/components";
import CarDetails from "@/components/CardDetails";
import Hero from "@/components/Hero";
import { useCarContext } from "@/context/carContext";
import { CarProps } from "@/types";
import { useState } from "react";
import React from 'react';

const Home = () => {
  const { filteredCars } = useCarContext();
  console.log(filteredCars)

  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCar, setSelectedCar] = useState<CarProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleShowDetails = (car: CarProps) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />
        </div>

        {filteredCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredCars.slice(0, visibleCount).map((car) => (
                <div key={car.id} className="" onClick={() => handleShowDetails(car)}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
            {visibleCount < filteredCars.length && (
              <div className='text-center mt-4'>
                <button
                  onClick={handleShowMore}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  Show More
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
