/* // services/carsService.ts

import { CarProps } from "@/types";

export async function fetchCars(): Promise<CarProps[]> {
    const response = await fetch('http://localhost:8000/api/cars');
    if (!response.ok) {
        throw new Error('Failed to fetch cars');
    }
    const data = await response.json();
    return data as CarProps[];
}
 */