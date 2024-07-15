"use client"
import { CarCard, CustomFilter, SearchBar, ShowMore } from "@/components";
import Hero from "@/components/Hero";
import { fuels, manufacturers, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";


import React from 'react'

const Home = () => {

  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch('http://localhost:8800/api/cars').then(
      response => response.json()
    ).then(
     data => {
      setCars(data)
     }
    )
  })
  return (
      <main className='overflow-hidden'>
        <Hero />
  
        <div className='mt-12 padding-x padding-y max-width' id='discover'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
            <p>Explore out cars you might like</p>
          </div>
  
          <div className='home__filters'>
            <SearchBar />
  
            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} />
              <CustomFilter title='year' options={yearsOfProduction} />
            </div>
          </div>
  
            <section>
              <div className='home__cars-wrapper'>
                {cars?.map((car) => (
                  <CarCard car={car} />
                ))}
              </div>
  
       {/*        <ShowMore
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={(searchParams.limit || 10) > cars.length}
              /> */}
            </section>
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
{/*               <p>{cars?.message}</p>
 */}            </div>
        </div>
      </main>
    );
  
}

export default Home
