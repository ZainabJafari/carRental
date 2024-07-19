'use client';

import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment } from 'react';

interface CustomFilterProps {
  label: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

const CustomFilter = ({ label, options, selected, setSelected }: CustomFilterProps) => {
  return (
    <div className="w-full md:w-1/3">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 flex justify-between items-center">
            <span>{selected || `Select ${label}`}</span>
            <Image
              src='/up-down.svg'
              width={20}
              height={20}
              alt='Toggle dropdown'
              className="ml-2"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option key={option} value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'
                      } cursor-default select-none relative py-2 pl-10 pr-4`}
                    >
                      {selected && (
                        <span
                          className={`${
                            active ? 'text-blue-600' : 'text-blue-600'
                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <Image
                            src='/check.svg'
                            alt='Selected'
                            className='h-5 w-5'
                          />
                        </span>
                      )}
                      {option}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
