"use client";

import CartIcon from "../../icon/cart";
import Link from "next/link";

export default function LayoutHeaderCart() {
  return (
    <Link href="/cart" className="flex flex-col items-center justify-center cursor-pointer">
      <CartIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-500" />
      <span className="text-xs md:text-sm text-gray-600 mt-1">Cart</span>
    </Link>
  );
} 