import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { siteConfig } from '../config/site.config';

export const MenuLinks: FC<{ className?: string }> = (props) => {
  const { className = '' } = props;
  const { asPath } = useRouter();

  return (
    <div className={['items-end', className].join(' ')}>
      {siteConfig.mainNavLinks.map(({ title, href }) => {
        return (
          <Link
            key={`main-links-${href}`}
            legacyBehavior={true}
            className={'underline'}
            href={href}
          >
            <a
              className={clsx(
                'py-2 px-4 text-lg uppercase text-black decoration-amber-500 underline-offset-8 outline-green-500 hover:underline',
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
