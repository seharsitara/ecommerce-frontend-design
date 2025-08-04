"use client";

import ProfileIcon from "../../icon/profile";

export default function LayoutHeaderProfile() {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <ProfileIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-500" />
      <span className="text-xs md:text-sm text-gray-600 mt-1">Profile</span>
    </div>
  );
} 