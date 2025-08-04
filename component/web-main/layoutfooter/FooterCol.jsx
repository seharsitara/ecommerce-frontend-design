import Link from "next/link";
import Image from "next/image";
import appstore from "@/assets/images/appstore.png";
import googleplay from "@/assets/images/google-play.png";

function FooterCol({ title, links }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-gray-800 text-base">{title}</h4>
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="text-gray-600 text-sm hover:text-blue-600 transition">
            {link.isAppStore ? (
              <Image
                src={appstore}
                alt="Download on App Store"
                width={120}
                height={40}
                className="object-contain"
              />
            ) : link.isGooglePlay ? (
              <Image
                src={googleplay}
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="object-contain"
              />
            ) : (
              link.name
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterCol; 