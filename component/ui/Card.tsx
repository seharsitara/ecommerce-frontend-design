"use client";

import { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

export interface CardProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardMediaProps {
  children: ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", asChild = false }: CardProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={twMerge(
        "bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col",
        className
      )}
    >
      {children}
    </Comp>
  );
};

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

export default Card; 