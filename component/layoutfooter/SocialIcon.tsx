import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SocialIconProps {
  href: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
}

const SocialIcon = ({ href, label, icon: Icon, colorClass }: SocialIconProps) => (
  <Link href={href} aria-label={label} className="transition" target="_blank" rel="noopener noreferrer">
    <Icon className={`w-5 h-5 text-gray-500 hover:${colorClass}`} />
  </Link>
);

export default SocialIcon; 