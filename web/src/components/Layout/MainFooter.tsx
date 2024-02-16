import Link from 'next/link';
import type { FC } from 'react';
import type { MainNavLinks } from '@/config/site.config';
import { MainLogo } from '../Logo/MainLogo';

type Props = {
  mainNavLinks: MainNavLinks;
};
export const MainFooter: FC<Props> = (props) => {
  const { mainNavLinks } = props;
  return (
    <footer
      aria-label="Site Footer"
      className={'mt-20 w-full bg-brand-color-200/90 font-family-primary'}
    >
      <div className="container mx-auto space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-teal-600">
            <MainLogo />
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Facebook</span>

                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <p className="font-medium text-gray-900">Menu</p>

            <nav aria-label="Footer Navigation - Menu" className="mt-6">
              <ul className="space-y-4 text-sm">
                {mainNavLinks.map((link) => {
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={'text-gray-700 transition hover:opacity-75'}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div>
            <p className="font-medium text-gray-900">Liens</p>

            <nav aria-label="Footer Navigation - Company" className="mt-6">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <p className="text-xs text-gray-500">Sandrine Rauter</p>
      </div>
    </footer>
  );
};
