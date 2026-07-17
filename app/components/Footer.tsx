import Image from "next/image";
import { getSiteSettings } from "@/lib/content";

export function Footer() {
  const { footerCopyright, footerLogo } = getSiteSettings();

  return (
    <footer className="">
        <div className="w-full">
          <Image
            src="/images/field/Banner-Photo-2005-09-01.jpg"
            alt="Banner photo"
            width={9000}
            height={1371}
            className="w-full h-auto block"
            priority
          />
        </div>
        <div className="bg-gray-900 text-white p-8">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <p className="text-sm">
                {footerCopyright}
                </p>
                <a
                href="https://www.amnh.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Image
                    src={footerLogo}
                    alt="Logo: American Museum of Natural History"
                    width={150}
                    height={50}
                />
                </a>
            </div>
        </div>
    </footer>
  );
}
