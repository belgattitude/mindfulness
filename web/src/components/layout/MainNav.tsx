import styled from '@emotion/styled';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { MainNavHeader } from '@/components/layout/MainNavHeader';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { MainLogo } from '@/components/logo/MainLogo';
import { MenuLinks } from '@/components/MenuLinks';
import BurgerOpenIcon from '@/public/icons/burger-simple-svgrepo-com.svg';
import BurgerCloseIcon from '@/public/icons/cross-svgrepo-com.svg';
import type { MainNavLinks } from '../../config/site.config';
import { BannerAlert } from '../banner/BannerAlert';

type MainNavProps = {
  /** add props here */
  showAlert?: boolean;
  mainNavLinks: MainNavLinks;
};

const isScrolledTopThreshold = 100;

const isServer = typeof window === 'undefined';

const StickyCtn = styled.div<{ scrollIsOnTop: boolean }>(
  ({ scrollIsOnTop }) => `
  background-color: rgba(255, 255, 255, ${scrollIsOnTop ? 0 : 0.9});
  .left {
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-direction: row;
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

export const MainNav: FC<MainNavProps> = (props) => {
  const { showAlert = true, mainNavLinks } = props;
  const router = useRouter();
  const initialIsScrollOntop = isServer
    ? true
    : window.scrollY < isScrolledTopThreshold;

  const [scrollIsOnTop, setScrollIsOnTop] = useState(initialIsScrollOntop);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const onScroll = () => {
    setScrollIsOnTop(window.scrollY < isScrolledTopThreshold);
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

  return (
    <div className={'flex'}>
      <StickyCtn
        className={clsx('fixed top-0 z-50 w-full  backdrop-blur', {
          ['bg-white']: scrollIsOnTop,
          ['border-b border-gray-200 shadow-lg']: false,
        })}
        scrollIsOnTop={scrollIsOnTop}
      >
        <MainNavHeader collapse={!scrollIsOnTop} render={scrollIsOnTop} />

        <div className={`container mx-auto hidden gap-2 p-2 md:flex`}>
          <div className="left">
            <div
              className={'flex'}
              // style={{ width: scrollIsOnTop ? '60px' : '30px' }}
            >
              <Link
                href={'/'}
                className={
                  'duration-800 align-center flex justify-center opacity-90 transition-all delay-75 ease-in-out hover:rotate-3 hover:opacity-100'
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
            className={
              'flex grow flex-row items-center justify-center gap-5 md:flex'
            }
          >
            <MenuLinks
              mainNavLinks={mainNavLinks}
              className={clsx(
                'hidden text-xl font-extralight transition-opacity duration-700 ease-in-out lg:block',
                {
                  ['opacity-0']: isNavExpanded,
                }
              )}
            />
          </div>
          <div className={'flex items-center justify-center'}>
            <button
              className={''}
              onClick={() => {
                setIsNavExpanded((prevState) => !prevState);
              }}
            >
              <div
                className={
                  'absolute top-5 right-5 h-[32px] w-[32px] transition-opacity'
                }
              >
                <BurgerOpenIcon
                  className={clsx(
                    'delay-450 absolute top-0 left-0 h-auto w-auto transition-opacity duration-300 ease-in-out',
                    {
                      ['opacity-0']: isNavExpanded,
                    }
                  )}
                />
                <BurgerCloseIcon
                  className={clsx(
                    'delay-450 absolute h-auto w-auto opacity-0 transition-opacity duration-300 ease-in-out',
                    {
                      ['opacity-100']: isNavExpanded,
                    }
                  )}
                />
              </div>
            </button>
          </div>
        </div>
        <BannerAlert collapse={!scrollIsOnTop} render={scrollIsOnTop} />
        <MobileMenu hidden={!isNavExpanded} mainNavLinks={mainNavLinks} />
      </StickyCtn>
    </div>
  );
};
