"use client";

import { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

export default function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => (
  <div className={twMerge("px-6 pt-6 pb-2 font-semibold text-lg", className)}>{children}</div>
);

export const CardMedia = ({ children, className = "" }: CardMediaProps) => (
  <div className={twMerge("w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden", className)}>
    {children}
  </div>
);

export const CardBody = ({ children, className = "" }: CardBodyProps) => (
  <div className={twMerge("px-6 py-4 flex-1", className)}>{children}</div>
);

export const CardFooter = ({ children, className = "" }: CardFooterProps) => (
  <div className={twMerge("px-6 pb-6 pt-2 border-t border-gray-100", className)}>{children}</div>
); 