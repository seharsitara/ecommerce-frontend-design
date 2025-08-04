"use client";

import Image from "next/image";
import logo from "../../../assets/images/brand-logo.png.svg"

const BrandLogo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        src={logo}
        alt="Brand Logo"
        width={120}
        height={40}
        className="object-contain w-auto h-auto max-w-full max-h-full"
        priority
      />
    </div>
  );
};

export default BrandLogo;
