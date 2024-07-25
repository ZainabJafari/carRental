'use client';

import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';

const Navbar = () => {
  return (
    <header className="w-full absolute z-10 bg-gray-700">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo1.png"
            alt="logo"
            width={70}
            height={14}
            className="object-contain rounded-xl"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <CustomButton
            title="Sign in"
            btnType="button"
            containerStyle="text-primary-blue rounded-full bg-white min-w-[130px] hover:bg-gray-100 transition"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
