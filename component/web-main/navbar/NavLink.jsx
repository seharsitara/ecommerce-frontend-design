"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children, className = "" }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`py-2 rounded-md transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"} ${className}`}
    >
      {children}
    </Link>
  );
}

export default NavLink; 