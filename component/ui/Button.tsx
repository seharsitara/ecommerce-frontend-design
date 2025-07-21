"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

// Lucide icon type
import type { LucideIcon } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
}

const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  asChild = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  const baseStyles = "rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const stateStyles = {
    loading: "opacity-70 cursor-not-allowed",
    disabled: "opacity-50 cursor-not-allowed",
    fullWidth: "w-full",
  };

  const combinedStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && stateStyles.fullWidth,
    (isLoading || disabled) && stateStyles.disabled,
    className
  );

  return (
    <Comp
      className={combinedStyles}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
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
        <>
          {IconLeft && <IconLeft className="w-4 h-4 mr-1" />}
          {children}
          {IconRight && <IconRight className="w-4 h-4 ml-1" />}
        </>
      )}
    </Comp>
  );
};

export default Button; 