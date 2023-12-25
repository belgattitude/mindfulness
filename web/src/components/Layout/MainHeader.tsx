'use client';

import { clsx } from 'clsx';
import { useEffect, useState, type FC } from 'react';
import { BurgerMenuIcon } from '@/components/Burger/BurgerMenuIcon';
import { MainMenuLinks } from '@/components/Layout/MainMenuLinks';
import { MainNavHeader } from '@/components/Layout/MainNavHeader';
import { MainSidebar } from '@/components/Layout/MainSidebar';
import type { MainNavLinks } from '@/config/site.config';
import { BannerAlert } from '../Banner/BannerAlert';

type MainNavProps = {
  /** add props here */
  showAlert?: boolean;
  mainNavLinks: MainNavLinks;
};

const isScrolledTopThreshold = 400;

const isServer = typeof window === 'undefined';

export const MainHeader: FC<MainNavProps> = (props) => {
  const { showAlert = true, mainNavLinks } = props;
  const initialIsScrollOntop = isServer
    ? true
    : window.scrollY < isScrolledTopThreshold;

  const [isScrollOnTop, setIsScrollOnTop] = useState(initialIsScrollOntop);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const onScroll = () => {
    setIsScrollOnTop(window.scrollY < isScrolledTopThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const renderTopLevelHeader = true; // router.asPath === '/';

  return (
    <div className={'flex'}>
      <div
        className={clsx(
          'top-0 z-50 w-full border-b-8 border-brand-color-50 shadow-brand-color-50' //  border-b-8 shadow-lg backdrop-blur
        )}
      >
        {/* <MainNavHeader collapse={!scrollIsOnTop} render={scrollIsOnTop} /> */}
        <MainNavHeader collapse={!renderTopLevelHeader} render={true} />

        <div
          className={clsx(`container mx-auto hidden gap-2 p-2 md:flex`, {
            ['static top-0']: !isScrollOnTop,
          })}
        >
          <div
            className={clsx(
              'flex grow flex-row items-center justify-center gap-5 py-2 md:flex'
            )}
          >
            <MainMenuLinks
              mainNavLinks={mainNavLinks}
              className={clsx(
                'hidden font-family-menu text-xl font-extralight transition-opacity duration-700 ease-in-out md:block',
                {
                  ['opacity-0']: isNavExpanded,
                }
              )}
            />
          </div>
          <div className={'flex items-center justify-center'}></div>
        </div>

        <MainSidebar hidden={!isNavExpanded} mainNavLinks={mainNavLinks} />
        <BurgerMenuIcon
          className={clsx(
            'absolute right-5 top-3 h-[32px] w-[32px] md:hidden',
            {
              ['text-white']: renderTopLevelHeader,
              ['text-black']: !renderTopLevelHeader,
            }
          )}
          handleClick={() => {
            setIsNavExpanded((prevState) => !prevState);
          }}
          isOpen={isNavExpanded}
        />
        <BannerAlert collapse={!renderTopLevelHeader} render={showAlert} />
      </div>
    </div>
  );
};
