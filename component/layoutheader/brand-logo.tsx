"use client";

import Image from "next/image";

import logo from "@/assets/images/brand-logo.png.svg"; // Placeholder, update as needed

const BrandLogo = () => {
  return (
    <div
      className="absolute w-[150px] h-[46px] top-[14px] left-[80px] opacity-100 rotate-0"
    >
      <Image
        src={logo}
        alt="Brand Logo"
        width={150}
        height={46}
        className="object-contain w-full h-full"
        priority
      />
    </div>
  );
};

export default BrandLogo;
