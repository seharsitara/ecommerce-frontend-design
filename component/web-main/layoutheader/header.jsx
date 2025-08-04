"use client";

import BrandLogo from "./brand-logo";
import SearchInput from "./search-form/search-input";
import ActionIcon from "./actions/action-icon";

export default function Header() {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 md:h-12 lg:h-16 xl:h-18 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
          {/* Logo */}
          <div className="flex-shrink-0 w-24 md:w-32 lg:w-40 xl:w-48">
            <BrandLogo />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md lg:max-w-lg xl:max-w-xl">
            <SearchInput />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6">
            <ActionIcon />
          </div>
        </div>
      </div>
    </div>
  );
} 