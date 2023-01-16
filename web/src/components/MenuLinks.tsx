import { css } from '@emotion/react';
import { clsx } from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import { siteConfig } from '../config/site.config';

export const MenuLinks: FC<{ className?: string }> = (props) => {
  const { className = '' } = props;
  return (
    <div className={['items-end', className].join(' ')}>
      {siteConfig.mainNavLinks.map(({ title, href }) => {
        return (
          <Link
            key={`main-links-${href}`}
            legacyBehavior={true}
            className={''}
            href={href}
          >
            <a
              css={css`
                font-family: var(--font-inter);
                border-bottom-width: 0;
                background-size: 0 3px;
                background-position: 0 100%;
                background-repeat: no-repeat;
                transition: background-size 0.4s ease-in-out;
                background-image: linear-gradient(transparent, transparent),
                  linear-gradient(#f2c, #f2c);
                opacity: 0.9;
                &:hover {
                  background-size: 100% 3px;
                  background-position: 0 100%;
                  opacity: 1;
                }
                font-style: normal;
                font-size: 14px;
                line-height: 160%;
                letter-spacing: 1px;
                text-transform: uppercase;
              `}
              className={
                'black py-2 px-4 text-lg uppercase hover:accent-amber-600'
              }
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
