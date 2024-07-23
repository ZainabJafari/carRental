'use client';

import { CarCard, SearchBar } from "@/components";
import CarDetails from "@/components/CardDetails";
import Hero from "@/components/Hero";
import PickupDropoffForm from "@/components/PickupDropoffForm";
import { useCarContext } from "@/context/carContext";
import { CarProps } from "@/types";
import { useState } from "react";
import React from 'react';

const Home = () => {

  return (
    <main className='overflow-hidden'>
      <Hero />
        <div className='home__pickup-dropoff-form'>
          <PickupDropoffForm />
        </div>
    </main>
  );
}

export default Home;
