import logo from "@/assets/images/brand-logo.png.svg";
import googleplay from "@/assets/images/google-play.png";
import appstore from "@/assets/images/appstore.png"
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import FooterCol from "./FooterCol";
import SocialIcon from "./SocialIcon";
import Image from "next/image";

const footerLinks = [
  {
    title: "About",
    links: [
      { name: "About Us", href: "#" },
      { name: "Find Store", href: "#" },
      { name: "Blogs", href: "#" },
      { name: "Categories", href: "#" },
    ],
  },
  {
    title: "Partnership",
   links: [
      { name: "About Us", href: "#" },
      { name: "Find Store", href: "#" },
      { name: "Blogs", href: "#" },
      { name: "Categories", href: "#" },
    ],
  },
  {
    title: "Information",
    links: [
      { name: "About Us", href: "#" },
      { name: "Find Store", href: "#" },
      { name: "Blogs", href: "#" },
      { name: "Categories", href: "#" },
    ],
  },
  {
    title: "For Users",
    links: [
      { name: "About Us", href: "#" },
      { name: "Find Store", href: "#" },
      { name: "Blogs", href: "#" },
      { name: "Categories", href: "#" },
    ],
  },
  {
    title: "Get App",
    links: [
      { name: "About Us", href: "#" },
      { name: "Find Store", href: "#" },
      { name: "Blogs", href: "#" },
      { name: "Categories", href: "#" },
     
    ],
  },
];

const socialIcons = [
  { href: "#", label: "Twitter", icon: Twitter, colorClass: "text-blue-500" },
  { href: "#", label: "Instagram", icon: Instagram, colorClass: "text-pink-500" },
  { href: "#", label: "YouTube", icon: Youtube, colorClass: "text-red-500" },
  { href: "#", label: "Facebook", icon: Facebook, colorClass: "text-blue-700" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-10 px-4 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-10 md:gap-0">
        {/* Left Column */}
        <div className="md:w-1/3 flex flex-col gap-4 md:pr-12">
          <div className="flex items-center gap-3">
            <Image
        src={logo}
        alt="Brand Logo"
        width={40}
        height={20}
        className="object-contain w-40"
        priority
      />
          </div>
          <p className="text-gray-600 text-sm max-w-xs">
            We are a leading e-commerce company providing the best products and services. Shop with confidence and follow us on social media!
          </p>
          <div className="flex gap-4 mt-2">
            {socialIcons.map((icon) => (
              <SocialIcon key={icon.label} {...icon} />
            ))}
          </div>
        </div>
        {/* Right Columns */}
        <div className="md:w-2/3 flex flex-wrap justify-between">
          {footerLinks.map((col) => (
            <FooterCol key={col.title} title={col.title} links={col.links}/>
          ))}
        </div>
      </div>
    </footer>
  );
} 