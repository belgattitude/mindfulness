import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import type { MainNavLinks } from '@/config/site.config';

type Props = {
  className?: string;
  mainNavLinks: MainNavLinks;
};

export const MainMenuLinks: FC<Props> = (props) => {
  const { className = '', mainNavLinks } = props;
  const currentRouterPath = usePathname() ?? '';

  return (
    <div className={['items-end', className].join(' ')}>
      {mainNavLinks.map(({ title, href, activeMenu }) => {
        const activePaths = Array.isArray(activeMenu) ? activeMenu : [href];
        return (
          <Link
            key={`main-links-${href}`}
            legacyBehavior={true}
            className={'underline'}
            href={href}
          >
            <a
              className={clsx(
                'px-4 py-2 text-lg text-neutral-900 decoration-gray-300 underline-offset-8 outline-green-500 hover:underline',
                {
                  ['underline']:
                    currentRouterPath === '/'
                      ? currentRouterPath === href
                      : activePaths.some(
                          (activePath) =>
                            href !== '/' &&
                            currentRouterPath.startsWith(activePath)
                        ),
                }
              )}
              href={href}
            >
              {title}
            </a>
          </Link>
        );
      })}
    </div>
  );
};
