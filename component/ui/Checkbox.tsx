"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ReactNode, forwardRef } from "react";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: ReactNode;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 text-sm",
  md: "h-5 w-5 text-base",
  lg: "h-6 w-6 text-lg",
};

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { label, error = false, size = "md", className = "", disabled, ...props },
    ref
  ) => {
    return (
      <label className={twMerge("inline-flex items-center gap-2 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed")}> 
        <RadixCheckbox.Root
          ref={ref}
          disabled={disabled}
          className={twMerge(
            "flex items-center justify-center rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            sizeMap[size],
            className
          )}
          {...props}
        >
          <RadixCheckbox.Indicator asChild>
            <Check className="w-4 h-4 text-blue-600" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <span className={twMerge("text-gray-900", error && "text-red-600")}>{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox; 