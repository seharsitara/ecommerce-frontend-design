import React from "react";
import Image from "next/image";

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
];

function CategoryList() {
  return (
    <div className="flex-1 min-w-[180px] max-w-[220px] flex flex-col gap-1 p-4">
      {categories.map((cat, i) => (
        <button
          key={cat}
          className={`text-left px-4 py-2 rounded transition font-medium ${i === 0 ? "bg-blue-50 text-blue-900 font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function BannerBoard() {
  return (
    <div className="flex-1 flex items-stretch justify-center">
      <div className="relative w-full h-96 top-4 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100">
        <Image src="/Banner-board/Banner-board-800x420 2.png" alt="Banner Board" fill className="object-cover" />
        <div className="absolute left-8 top-8 z-10 flex flex-col gap-4">
          <div>
            <div className="text-lg md:text-xl text-black">Latest trending</div>
            <div className="text-2xl md:text-3xl font-bold text-black">Electronic items</div>
          </div>
          <button className="bg-white border border-gray-300 text-gray-900 font-medium px-5 py-2 rounded shadow hover:bg-gray-50 w-fit">Learn more</button>
        </div>
      </div>
    </div>
  );
}

function RightBoxes() {
  return (
    <div className="flex-1 min-w-[220px] max-w-[260px] flex flex-col gap-4 p-4">
      {/* Login Box */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 flex flex-col gap-3 items-center">
        <div className="flex items-center gap-3 w-full">
          <Image src="/avatar=pic1.jpg" alt="Avatar" width={40} height={40} className="rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="text-gray-700 text-sm">Hi, user</div>
            <div className="text-gray-500 text-xs">let's get stated</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full mt-2">
          <button className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 w-full">Join now</button>
          <button className="bg-white border border-blue-600 text-blue-600 rounded py-2 font-semibold hover:bg-blue-50 w-full">Log in</button>
        </div>
      </div>
      {/* Orange Box */}
      <div className="bg-orange-400 rounded-lg px-4 h-21 flex items-center text-white font-medium text-md shadow">Get US $10 off with a new supplier</div>
      {/* Light Blue Box */}
      <div className="bg-blue-200 rounded-lg px-4 h-21 flex items-center text-blue-900 font-medium text-md shadow">Send quotes with supplier preferences</div>
    </div>
  );
}

export default function HomeBoard() {
  return (
    <div className="w-full max-w-[1600px] mt-2 px-4 md:px-12">
      <div className="bg-white rounded-xl shadow flex gap-2 p-4 border border-gray-200 items-stretch">
        <CategoryList />
        <BannerBoard />
        <RightBoxes />
      </div>
    </div>
  );
} 