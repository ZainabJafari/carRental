"use client"
import { CarCard, CustomFilter, SearchBar, ShowMore } from "@/components";
import Hero from "@/components/Hero";
import { fuels, manufacturers, yearsOfProduction } from "@/constants";
import { useData } from "@/context/carContext";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import { useEffect } from "react";

export default async function Home({ searchParams }: HomeProps) {

 /*  const  allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  })

  console.log(allCars)
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
    */

  const { cars, loading, error } = useData();

  useEffect(() => {
      // Exempel på hur man kan logga data
      console.log('Cars:', cars);
  }, [cars]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
   <main className="overflow-hidden">
    <Hero />

    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore the cars you might like</p>
      </div>
      <div className="home__filters">
        <SearchBar />

        <div className="home__filter-container">
          <CustomFilter title='fuel' options={fuels}/>
          <CustomFilter title='year' options={yearsOfProduction}/>

        </div>
      </div>
        <section>
          <div className="home__cars-wrapper">
            {cars?.map((car) => (
             <CarCard car={car}/>
             ))}
          </div>
          
        </section>
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no result</h2>
        
        </div>
      
    </div>
   </main>
  );
}
