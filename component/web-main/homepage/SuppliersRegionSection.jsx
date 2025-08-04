"use client";

import Image from "next/image";

export default function SuppliersRegionSection() {
  const countries = [
    { name: "United States", code: "us", flag:"/flags/41045fb1972e45d68802086bd84cb513e501f747.png", website:"shopname.us" },
    { name: "Australia", code: "au", flag: "/flags/40b3887a79dd259e5237ee572632324634be943a.png",website:"shopname.au" },
    { name: "United Emirates", code: "ae", flag: "/flags/5b7e05677ed6e6d0ff7b7df11d34540f89efa0eb (1).png",website:"shopname.ae"  },
    { name: "Pakistan", code: "pk", flag: "/flags/pk.svg",website:"shopname.pk"  },
    { name: "India", code: "in", flag: "/flags/in.svg" ,website:"shopname.in" },
    { name: "Denmark", code: "dk", flag: "/flags/4bdeee2e40758d1d058d5256db7f52ea7665f723.png",website:"shopname.dk"  },
    { name: "France", code: "fr", flag: "/flags/46fb1676ec598cc24c50c037a822568c77e6eb7d.png" ,website:"shopname.fr" },
    { name: "China", code: "cn", flag: "/flags/ecfaf4eaff3006f5d8cc40c56c9e21eb9661484c.png",website:"shopname.cn"  },
    { name: "Italy", code: "it", flag: "/flags/b8478718292fe0d58fea5b0a42c117e22f308f6e.png",website:"shopname.it"  },
    { name: "Russia", code: "ru", flag: "/flags/68db557e1de5cb1fee9e6089b52ad036ebe980b9.png",website:"shopname.ru"  },
  ];

  return (
    <div className="mx-6 px-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Suppliers by Region</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
        {countries.map((country, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="relative w-6 h-6">
              <Image
                src={country.flag}
                alt={`${country.name} flag`}
                width={32}
                height={24}
                className="object-cover "
              />
            </div>
            <div>
            <p className="text-gray-700 text-sm font-medium">{country.name}</p>
            <p className="text-xs font-extralight text-gray-400">{country.website}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
