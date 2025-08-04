import React from "react";
import SearchInputLeft from "./search-input-left";
import SearchInputMiddle from "./search-input-middle";
import SearchButton from "./search-btn";

const LOGO_SRC = "/assets/images/brand-logo.png";

const SearchInput = () => (
  <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl h-6 md:h-8 lg:h-10 rounded-lg border border-[#0D6EFD] flex items-center bg-white shadow-sm">
    <SearchInputLeft />
    <SearchInputMiddle />
    <SearchButton />
  </div>
);

export default SearchInput;
