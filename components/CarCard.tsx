"use client";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import { calculateCarRent } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import CardDetails from "./CardDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {

  const [isOpen, setIsOpen] = useState(false)


  



  const carRent = calculateCarRent(car.city_mpg, car.year)

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {car.make} {car.model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /day
        </span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image src={car.car_img} alt="car model" fill priority className="object-contain" />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src='/wheel.svg' alt="street wheel" width={20} height={20} />
            <p className="text-[14px]">
              {car.drive.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
          <Image src='/tire.svg' alt="street wheel" width={20} height={20} />
          <p className="text-[14px]">
              {car.transmission}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
          <Image src='/gas.svg' alt="street wheel" width={20} height={20} />
          <p className="text-[14px]">
            {car.city_mpg} MPG
            </p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton title="View more" 
          containerStyle="w-full py-[16px] rounded-full bg-primary-blue"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
          handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CardDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
