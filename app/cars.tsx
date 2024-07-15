// pages/cars.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

interface Car {
    id: number;
    name: string;
    model: string;
    // Andra fält som finns i din databas
}

interface CarsProps {
    cars: Car[];
}

const CarsPage = ({ cars }: CarsProps) => {
    return (
        <div>
            <h1>Cars</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>{car.name} - {car.model}</li>
                ))}
            </ul>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/cars'); // Använd Next.js API-route
    const cars = await res.json();

    return {
        props: {
            cars,
        },
    };
};

export default CarsPage;
