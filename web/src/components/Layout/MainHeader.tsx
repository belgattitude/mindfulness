'use client';

import { clsx } from 'clsx';
import { useRef, useState, type FC } from 'react';
import { BurgerMenuIcon } from '@/components/Burger/BurgerMenuIcon';
import { MainMenuLinks } from '@/components/Layout/MainMenuLinks';
import { MainNavHeader } from '@/components/Layout/MainNavHeader';
import { MainSidebar } from '@/components/Layout/MainSidebar';
import type { MainNavLinks } from '@/config/site.config';
import { cn } from '@/components/utils';
import { useOutsideClick } from 'rooks';

type MainNavProps = {
  mainNavLinks: MainNavLinks;
};

export const MainHeader: FC<MainNavProps> = (props) => {
  const { mainNavLinks } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  useOutsideClick(ref, () => setIsSidebarExpanded(false));

  return (
    <div className={'flex'}>
      <div
        className={clsx(
          'top-0 z-50 w-full border-b-8 border-brand-color-50 shadow-brand-color-50' //  border-b-8 shadow-lg backdrop-blur
        )}
      >
        <MainNavHeader />

        <div
          className={clsx(
            `container static top-0 mx-auto hidden gap-2 p-2 md:flex`
          )}
        >
          <div
            className={cn(
              'flex grow flex-row items-center justify-center gap-5 py-2 md:flex'
            )}
          >
            <MainMenuLinks
              mainNavLinks={mainNavLinks}
              className={cn(
                'font-family-menu text-xl font-extralight transition-opacity duration-700 ease-in-out md:block',
                {
                  ['opacity-0']: isSidebarExpanded,
                }
              )}
            />
          </div>
          <div className={'flex items-center justify-center'}></div>
        </div>

        <MainSidebar hidden={!isSidebarExpanded} mainNavLinks={mainNavLinks} />
        <BurgerMenuIcon
          ref={ref}
          className={cn('absolute right-5 top-3 h-[32px] w-[32px] text-black')}
          handleClick={() => {
            setIsSidebarExpanded((prevState) => !prevState);
          }}
          isOpen={isSidebarExpanded}
        />
      </div>
    </div>
  );
};
