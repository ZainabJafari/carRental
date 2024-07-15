"use client"

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { CarProps } from '@/types';
import { fetchCars } from './api';

interface DataContextProps {
    cars: CarProps[] | null;
    loading: boolean;
    error: Error | null;
}

const initialDataContext: DataContextProps = {
    cars: null,
    loading: false,
    error: null,
};

const DataContext = createContext<DataContextProps>(initialDataContext);

interface DataProviderProps {
    children: ReactNode; // Specifiera att children är av typen ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [cars, setCars] = useState<CarProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchCars()
            .then(data => {
                setCars(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <DataContext.Provider value={{ cars, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
