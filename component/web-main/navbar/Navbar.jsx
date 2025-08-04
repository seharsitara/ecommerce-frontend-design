"use client";

import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import DropdownMenu from "../ui/DropdownMenu";
import NavLink from "./NavLink";
import navbarLinks from "./navbarLinks";
import Image from "next/image";

export default function Navbar() {
  const [selectedCountry, setSelectedCountry] = useState("🇺🇸 US");
  const [selectedLanguage, setSelectedLanguage] = useState("English, USD");

  const countries = [
    { code: "us", name: "United States", flag: "/flags/us.svg" },
    { code: "gb", name: "Great Britain", flag: "/flags/gb.svg" },
    { code: "ca", name: "Canada", flag: "/flags/ca.svg" },
    { code: "ae", name: "UAE", flag: "/flags/ae.svg" },
    { code: "pk", name: "Pakistan", flag: "/flags/pk.svg" },
    { code: "in", name: "India", flag: "/flags/in.svg" }
  ];

  const [selectedCountryData, setSelectedCountryData] = useState(countries[0]);

  return (
    <nav className="bg-white  md:px-6 lg:px-8 xl:px-12 border-b border-gray-200">
      <div className="flex items-center justify-between  px-4 h-8 md:h-10 lg:h-12 gap-6 md:gap-10 lg:gap-12 xl:gap-16">
        {/* Left side - Navigation Links */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8">
          {navbarLinks.map((link) => (
            <div key={link.name} className="flex items-center">
              {link.icon && <Menu className="w-6 h-6 md:w-10 md:h-10 pr-4" />}
              {link.dropdown ? (
                <DropdownMenu
                  trigger={
                    <Button variant="ghost" className="flex items-center gap-2 md:gap-2 lg:gap-2 text-sm md:text-base">
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  }
                  items={link.dropdown.map((item, index) => ({
                    label: item.label,
                    onSelect: () => console.log(`Selected: ${item.label}`)
                  }))}
                />
              ) : (
                <NavLink href={link.href}>{link.name}</NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Right side - Ship to and Language/Currency */}
        <div className="flex items-center gap-1 md:gap-2 ml-24">
          {/* Ship to */}
          <DropdownMenu
            trigger={
              <Button variant="ghost" className="flex items-center gap-1 md:gap-2 text-sm md:text-base outline-none">
                <div className="flex items-center gap-2">
                  <span>Ship to</span>
                  <Image 
                    src={selectedCountryData.flag} 
                    alt={`${selectedCountryData.name} flag`}
                    width={24} 
                    height={18}
                    
                  />
                  <ChevronDown className="w-4 h-4" />
                </div>
              </Button>
            }
            items={countries.map((country) => ({
              label: (
                <div className="flex items-center justify-center">
                  <Image 
                    src={country.flag} 
                    alt={`${country.name} flag`}
                    width={24} 
                    height={18}
                    className="rounded-sm"
                  />
                </div>
              ),
              onSelect: () => setSelectedCountryData(country)
            }))}
          />

          {/* Language/Currency */}
          <DropdownMenu
            trigger={
              <Button variant="ghost" className="flex items-center gap-1 md:gap-2 text-sm md:text-base outline-none">
                {selectedLanguage}
                <ChevronDown className="w-4 h-4" />
              </Button>
            }
            items={[
              { label: "English, USD", onSelect: () => setSelectedLanguage("English, USD") },
              { label: "French, EUR", onSelect: () => setSelectedLanguage("French, EUR") },
              { label: "Spanish, EUR", onSelect: () => setSelectedLanguage("Spanish, EUR") }
            ]}
          />
        </div>
      </div>
    </nav>
  );
}