/* // contexts/DataContext.tsx

import { createContext, useState, useContext, ReactNode } from 'react';
import { CarProps } from '@/types';

interface DataContextProps {
    cars: CarProps[] | null;
    setCars: React.Dispatch<React.SetStateAction<CarProps[] | null>>;
}

const initialDataContext: DataContextProps = {
    cars: null,
    setCars: () => {},
};

const DataContext = createContext<DataContextProps>(initialDataContext);

interface DataProviderProps {
    children: ReactNode;
    initialCars: CarProps[];
}

export const DataProvider: React.FC<DataProviderProps> = ({ children, initialCars }) => {
    const [cars, setCars] = useState<CarProps[] | null>(initialCars);

    

    return (
        <DataContext.Provider value={{ cars, setCars }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
 */