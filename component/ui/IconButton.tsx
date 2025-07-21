"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";
import type { LucideIcon } from "lucide-react";
import React from "react";

export type IconButtonVariant = "primary" | "secondary" | "outline" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon | ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  asChild?: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
  outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

const sizeStyles = {
  sm: "p-1.5 w-8 h-8 text-sm",
  md: "p-2 w-10 h-10 text-base",
  lg: "p-3 w-12 h-12 text-lg",
};

const IconButton = ({
  icon,
  variant = "primary",
  size = "md",
  isLoading = false,
  asChild = false,
  className = "",
  disabled,
  ...props
}: IconButtonProps) => {
  const Comp = asChild ? Slot : "button";

  const baseStyles = "inline-flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const combinedStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <Comp
      className={combinedStyles}
      disabled={isLoading || disabled}
      aria-disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        typeof icon === "function"
          ? React.createElement(icon, { className: "w-5 h-5" })
          : icon
      )}
    </Comp>
  );
};

export default IconButton; 