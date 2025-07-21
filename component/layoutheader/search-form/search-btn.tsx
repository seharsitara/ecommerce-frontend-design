import { Search } from "lucide-react";

export default function SearchButton() {
  return (
    <button
      className="
        h-full
        flex items-center justify-center gap-2
        bg-blue-600 text-white hover:bg-blue-700
        rounded-r-[6px]
        px-4
        font-medium
        transition-all
        border-none
        outline-none
        text-base
      "
      type="button"
    >
      <Search className="w-5 h-5" />
     search
    </button>
  );
}
