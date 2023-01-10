import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import logo from '@/public/logo/sandrine-logo.png';
import logoWithName from '@/public/logo/sandrine-logo2.webp';
import { siteConfig } from '../../config/site.config';

type MainNavProps = {
  /** add props here */
};

const mainNavData = siteConfig.mainNavLinks;

const isScrolledTopThreshold = 100;

const isServer = typeof window === 'undefined';

const MainNavCtn = styled.header`
  .mainNavReducedImage {
  }
  .mainNavFullImage {
  }
`;

export const MainNav: FC<MainNavProps> = (_props) => {
  const initialScrollProsition = !isServer
    ? window.scrollY
    : 0 < isScrolledTopThreshold;

  const [scrollIsOnTop, setScrollIsOnTop] = useState(initialScrollProsition);
  const onScroll = () => {
    setScrollIsOnTop(window.scrollY < isScrolledTopThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <MainNavCtn
      className={`fixed top-0 z-50 w-full border-b border-gray-200 shadow-lg backdrop-blur`}
      css={css`
        background-color: rgba(255, 255, 255, ${scrollIsOnTop ? 1 : 0.9});
        .left {
          //height: fit-content;
          display: flex;
          justify-content: flex-start;
          align-content: flex-start;
          flex-direction: row;
          //position: relative;
          div {
            position: relative;
            height: ${scrollIsOnTop
              ? 'var(--main-nav-full-height)'
              : 'var(--main-nav-reduced-height)'};
          }
        }
        .center {
          display: flex;
          //flex-direction: column;
          align-content: baseline;
          justify-content: flex-end;
          flex-grow: 1;
          gap: 5px;
          border: 1px solid blue;
          div {
            border: 1px solid black;
          }
        }
        .right {
        }
      `}
    >
      <div className={`container mx-auto flex gap-2 p-2`}>
        <div
          className="left"
          // style={{ width: onTop ? '100px' : '30px' }}
        >
          <div
            className={'delay-[2s]] transition-all'}
            style={{ width: scrollIsOnTop ? '60px' : '30px' }}
          >
            <Link href={'/'}>
              <Image
                alt={'Sandrine Rauter logo'}
                src={logo}
                className={
                  'opacity-90 transition-all delay-[2s] hover:opacity-100'
                }
                fill={true}
                priority={true}
                quality={85}
                // sizes={``}
                style={{
                  objectFit: 'scale-down',
                }}
              />
            </Link>
          </div>
        </div>
        <div className={'left'}>
          <div
            className={'delay-450 transition-all'}
            style={{ width: scrollIsOnTop ? '220px' : '100px' }}
          >
            <Image
              alt={'Sandrine Rauter logo with name'}
              src={logoWithName}
              className={'delay-450 transition-all'}
              fill={true}
              priority={true}
              quality={85}
              // sizes={``}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        <div
          className={
            'hidden grow flex-col justify-end justify-items-end gap-5 align-baseline md:flex'
          }
        >
          <div className="space-x-12 text-xl">
            {mainNavData.map((link) => {
              return (
                <Link className={'text-xl'} key={link.href} href={link.href}>
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={'right'}>Right</div>
      </div>
    </MainNavCtn>
  );
};
