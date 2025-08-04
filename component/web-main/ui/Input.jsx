import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={twMerge(
        "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm",
        className
      )}
      {...props}
    />
  );
});

export default Input; 