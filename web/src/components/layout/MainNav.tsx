import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { siteConfig } from '../../config/site.config';

type MainNavProps = {
  // Add props
};

const mainNavData = siteConfig.mainNavLinks;

export const MainNav: FC<MainNavProps> = (_props) => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter dark:border-gray-800 dark:bg-gray-950">
        {/* Navbar */}
        <nav className="relative container mx-auto p-6">
          {/* Flex container */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="pt-2">
              <Image
                alt={'logo'}
                src={'/logo/sandrine-logo.png'}
                width={96}
                height={100}
              />
            </div>
            {/* Menu items */}
            <div className="hidden md:flex text-xl space-x-12">
              {mainNavData.map((link) => {
                return (
                  <Link key={link.href} href={link.href}>
                    {link.title}
                  </Link>
                );
              })}
            </div>
            {/* Button */}
            <a
              href="#"
              className="p-3 px-6 pt-2 text-white bg-amber-500 rounded-full baseline hover:bg-amber-700"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};
