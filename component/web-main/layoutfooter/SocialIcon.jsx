import Link from "next/link";
import { LucideIcon } from "lucide-react";

function SocialIcon({ href, label, icon: Icon, colorClass }) {
  return (
    <a href={href} aria-label={label} className="transition" target="_blank" rel="noopener noreferrer">
      <Icon className={`w-5 h-5 text-gray-500 mt-2 hover:${colorClass}`} />
    </a>
  );
}

export default SocialIcon; 