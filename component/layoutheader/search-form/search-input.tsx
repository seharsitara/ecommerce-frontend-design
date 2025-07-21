import React from "react";
import SearchInputLeft from "./search-input-left";
import SearchInputMiddle from "./search-input-middle";
import SearchButton from "./search-btn";

const LOGO_SRC = "/assets/images/brand-logo.png";

const SearchInput = () => (
  <div
    className="absolute top-[18px] left-[380px] w-[500px] h-[40px] opacity-100 rotate-0 rounded-[6px] bg-[#D9D9D9] border border-[#0D6EFD] flex items-center"
    style={{ borderWidth: "1px" }}
  >
    <SearchInputLeft />
    <SearchInputMiddle />
    <SearchButton />
  </div>
);

export default SearchInput;
