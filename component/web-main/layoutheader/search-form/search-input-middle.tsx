import React from "react";

const SearchInputMiddle = () => (
  <select
    className="
      h-full
      bg-transparent
      border-l border-r border-[#0D6EFD]
      outline-none
      px-3
      text-gray-900
      text-base
      appearance-none
      focus:ring-0
    "
    defaultValue="all"
  >
    <option value="interior">All Categories</option>
    <option value="interior">Interior</option>
    <option value="clothes">Clothes</option>
    <option value="tech">Tech</option>
  </select>
);

export default SearchInputMiddle;
