import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import type { MainNavLinks } from '../../config/site.config';

type Props = {
  className?: string;
  mainNavLinks: MainNavLinks;
};

export const MainMenuLinks: FC<Props> = (props) => {
  const { className = '', mainNavLinks } = props;
  const { asPath } = useRouter();

  return (
    <div className={['items-end', className].join(' ')}>
      {mainNavLinks.map(({ title, href }) => {
        return (
          <Link
            key={`main-links-${href}`}
            legacyBehavior={true}
            className={'underline'}
            href={href}
          >
            <a
              className={clsx(
                'py-2 px-4 text-lg text-neutral-900 decoration-gray-300 underline-offset-8 outline-green-500 hover:underline',
                {
                  ['underline']:
                    asPath === '/' ? asPath === href : href.startsWith(asPath),
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
