'use client';

import React, { useState } from 'react';
import CustomFilter from './CustomFilter';
import { useCarContext } from '@/context/carContext';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const { filterCars } = useCarContext();

  const handleFilter = () => {
    filterCars(search, year, transmission);
  };

  const handleReset = () => {
    setSearch('');
    setYear('');
    setTransmission('');
    filterCars('', '', '');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full">
      <p className='font-bold pt-13'>Model</p>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by brand"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-10"
        />
        <CustomFilter
          label="Year"
          options={["2023", "2022", "2021", "2020", "2019", "2018"]}
          selected={year}
          setSelected={setYear}
        />
        <CustomFilter
          label="Transmission"
          options={["Automatic", "Manual"]}
          selected={transmission}
          setSelected={setTransmission}
        />
      </div>
      <div className="flex p-1">
        
        <button
          onClick={handleReset}
          className="px-6 py-2 mx-2 bg-gray-400 text-gray-700 rounded-lg hover:bg-gray-500 transition-colors duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFilter}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
