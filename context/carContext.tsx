'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { CarProps } from '@/types';

interface CarContextProps {
  cars: CarProps[];
  filteredCars: CarProps[];
  fetchCars: () => void;
  filterCars: (make: string, year: string, transmission: string) => void;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarProps[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/cars');
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error fetching cars', error);
    }
  };

  const filterCars = async (make: string, year: string, transmission: string) => {
    let query = `http://localhost:8800/api/cars?`;

    if (make !== '') {
      query += `make=${make}&`;
    }
    if (year !== '') {
      query += `year=${year}&`;
    }
    if (transmission !== '') {
      query += `transmission=${transmission}&`;
    }

    try {
      const response = await axios.get(query);
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error filtering cars', error);
    }
  };

  return (
    <CarContext.Provider value={{ cars, filteredCars, fetchCars, filterCars }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};
