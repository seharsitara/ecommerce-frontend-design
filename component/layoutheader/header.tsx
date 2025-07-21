import BrandLogo from "./brand-logo";
import SearchInput from "./search-form/search-input";
import ActionIcon from "./actions/action-icon";

export default function Header() {
  return (
    <header className="w-full max-w-[1440px] h-[64px] md:h-[86px] bg-white border-b border-gray-200 shadow-sm flex items-center px-4 md:px-12 gap-4 md:gap-8 mx-auto opacity-100">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center justify-start" style={{ width: 80, minWidth: 60 }}>
        <BrandLogo />
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <SearchInput />
      </div>
      {/* Action Icons */}
      <div className="flex-shrink-0 flex items-center justify-end" style={{ width: 100, minWidth: 80 }}>
        <ActionIcon />
      </div>
    </header>
  );
} 