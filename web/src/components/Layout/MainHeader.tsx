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
          'top-0 z-50 w-full border-brand-color-50 bg-white/95 shadow-brand-color-50 lg:border-b-2'
        )}
      >
        <MainNavHeader className={'z-50'} />
        <div
          className={clsx(
            `container-xl static top-0 mx-auto hidden gap-2 p-2 md:flex `
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
                'font-family-menu text-xl font-light transition-opacity duration-700 ease-in-out md:block',
                {
                  ['opacity-0']: isSidebarExpanded,
                }
              )}
            />
          </div>
        </div>
        <MainSidebar hidden={!isSidebarExpanded} mainNavLinks={mainNavLinks} />
        <BurgerMenuIcon
          ref={ref}
          className={cn(
            'absolute right-5 top-3 h-[30px] w-[30px] *:text-title-color-800'
          )}
          handleClick={() => {
            setIsSidebarExpanded((prevState) => !prevState);
          }}
          isOpen={isSidebarExpanded}
        />
      </div>
    </div>
  );
};
