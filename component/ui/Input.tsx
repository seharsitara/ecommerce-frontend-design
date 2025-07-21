"use client";

import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";
import type { LucideIcon } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  error?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      asChild = false,
      iconLeft: IconLeft,
      iconRight: IconRight,
      fullWidth = false,
      error = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";

    const baseStyles =
      "block rounded-md border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    const errorStyles = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300";
    const fullWidthStyles = fullWidth ? "w-full" : "";
    const paddingLeft = IconLeft ? "pl-10" : "";
    const paddingRight = IconRight ? "pr-10" : "";

    const inputStyles = twMerge(
      baseStyles,
      errorStyles,
      fullWidthStyles,
      paddingLeft,
      paddingRight,
      className
    );

    return (
      <div className={twMerge("relative flex items-center", fullWidth && "w-full")}> 
        {IconLeft && (
          <span className="absolute left-3 text-gray-400 pointer-events-none">
            <IconLeft className="w-5 h-5" />
          </span>
        )}
        <Comp
          ref={ref}
          className={inputStyles}
          disabled={disabled}
          {...props}
        />
        {IconRight && (
          <span className="absolute right-3 text-gray-400 pointer-events-none">
            <IconRight className="w-5 h-5" />
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input; 