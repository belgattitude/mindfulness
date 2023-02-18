import styled from '@emotion/styled';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { BurgerMenuIcon } from '@/components/burger/BurgerMenuIcon';
import { MainNavHeader } from '@/components/layout/MainNavHeader';
import { MainSidebar } from '@/components/layout/MainSidebar';
import { MainLogo } from '@/components/logo/MainLogo';
import { MenuLinks } from '@/components/MenuLinks';
import type { MainNavLinks } from '../../config/site.config';
import { BannerAlert } from '../banner/BannerAlert';

type MainNavProps = {
  /** add props here */
  showAlert?: boolean;
  mainNavLinks: MainNavLinks;
};

const isScrolledTopThreshold = 400;

const isServer = typeof window === 'undefined';

const StickyCtn = styled.div<{ scrollIsOnTop: boolean }>(
  ({ scrollIsOnTop }) => `
  background-color: rgba(255, 255, 255, ${scrollIsOnTop ? 0 : 0.9});
  .left {
    div {
      position: relative;
      height: ${
        scrollIsOnTop
          ? 'var(--main-nav-full-height)'
          : 'var(--main-nav-reduced-height)'
      };
    }
  }
`
);

export const MainHeader: FC<MainNavProps> = (props) => {
  const { showAlert = true, mainNavLinks } = props;
  const router = useRouter();
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

  useEffect(() => {
    const closeMenu = () => setIsNavExpanded(false);
    router.events.on('routeChangeStart', closeMenu);
    return () => router.events.off('routeChangeStart', closeMenu);
  }, [router.events]);

  const renderTopLevelHeader = true; // router.asPath === '/';

  return (
    <div className={'flex'}>
      <StickyCtn
        className={clsx('top-0 z-50 w-full backdrop-blur', {
          ['bg-white']: isScrollOnTop,
          // ['fixed']: !scrollIsOnTop,
          // ['sticky']: scrollIsOnTop,
          ['border-b border-gray-200 shadow-lg']: true,
        })}
        scrollIsOnTop={isScrollOnTop}
      >
        {/* <MainNavHeader collapse={!scrollIsOnTop} render={scrollIsOnTop} /> */}
        <MainNavHeader collapse={!renderTopLevelHeader} render={true} />

        <div
          className={clsx(`container mx-auto hidden gap-2 p-2 md:flex`, {
            ['static top-0']: !isScrollOnTop,
          })}
        >
          <div className="left">
            <div className={'flex'}>
              <Link
                href={'/'}
                className={
                  'duration-800 align-center flex hidden justify-center opacity-90 transition-all delay-75 ease-in-out hover:rotate-3 hover:opacity-100'
                }
                legacyBehavior={false}
              >
                <MainLogo
                  className={'h-auto w-auto'}
                  style={{
                    objectFit: 'scale-down',
                  }}
                />
              </Link>
            </div>
          </div>

          <div
            className={clsx(
              'flex grow flex-row items-center justify-center gap-5 md:flex'
            )}
          >
            <MenuLinks
              mainNavLinks={mainNavLinks}
              className={clsx(
                'font-family-menu hidden text-xl font-extralight transition-opacity duration-700 ease-in-out lg:block',
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
          className={clsx('absolute top-3 right-5 h-[32px] w-[32px]', {
            ['text-white']: renderTopLevelHeader,
            ['text-black']: !renderTopLevelHeader,
          })}
          handleClick={() => {
            setIsNavExpanded((prevState) => !prevState);
          }}
          isOpen={isNavExpanded}
        />
        {/* <BannerAlert collapse={!scrollIsOnTop} render={showAlert} /> */}
        <BannerAlert collapse={!renderTopLevelHeader} render={showAlert} />
      </StickyCtn>
    </div>
  );
};
