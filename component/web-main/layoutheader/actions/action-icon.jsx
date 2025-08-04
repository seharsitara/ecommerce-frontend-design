"use client";

import LayoutHeaderCart from "./cart";
import LayoutHeaderMessage from "./message";
import LayoutHeaderOrders from "./orders";
import LayoutHeaderProfile from "./profile";

export default function ActionIcon() {
  return (
    <div className="flex items-center justify-between w-full h-full px-2 md:px-3 lg:px-4 xl:px-6">
      <div className="flex items-center gap-1 md:gap-2 lg:gap-3 xl:gap-4 min-w-0">
        <LayoutHeaderProfile />
        <LayoutHeaderMessage />
        <LayoutHeaderCart />
        <LayoutHeaderOrders />
      </div>
    </div>
  );
}
