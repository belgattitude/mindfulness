import { css } from '@emotion/react';
import Link from 'next/link';
import type { FC } from 'react';
import type { MainNavLinks } from '../../config/site.config';

type MainSidebarProps = {
  hidden: boolean;
  mainNavLinks: MainNavLinks;
};
export const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { hidden, mainNavLinks } = props;
  return (
    <div
      css={css`
        display: flex;
        position: absolute;
        top: 0;
        z-index: 100;
        background-color: white;
        width: 100%;
        transition: all 750ms ease-in-out;
        //height: ${hidden ? '10px' : '300px'};
        transform: translateY(${hidden ? '-500px' : '100px'});
        opacity: ${hidden ? 0 : 1};
        flex-direction: column;
        gap: 5px;
        justify-content: center;
        div {
          width: 130px;
          padding: 5px;
          margin: 5px;
        }
      `}
    >
      {mainNavLinks.map((link) => {
        return (
          <div key={`mobile-menu-${link.href}`} className={'flex'}>
            <Link className={'text-xl'} key={link.href} href={link.href}>
              {link.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
