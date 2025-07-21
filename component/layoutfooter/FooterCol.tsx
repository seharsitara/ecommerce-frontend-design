import Link from "next/link";

interface FooterColProps {
  title: string;
  links: { name: string; href: string }[];
  
}

const FooterCol = ({ title, links }: FooterColProps) => (
  <div className="w-1/2 sm:w-1/3 md:w-1/5 mb-6 md:mb-0">
    <h4 className="font-semibold text-gray-800 mb-3 text-base">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.href} className="text-gray-600 text-sm hover:text-blue-600 transition">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterCol; 