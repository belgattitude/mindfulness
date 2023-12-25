import { clsx } from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { MainLogo } from '@/components/Logo/MainLogo';

type Props = {
  collapse: boolean;
  render: boolean;
  forceWhiteBg?: boolean;
  className?: string;
};
export const MainNavHeader: FC<Props> = (props) => {
  const {
    collapse = false,
    render = true,
    className,
    forceWhiteBg = false,
  } = props;
  if (!render) {
    return <></>;
  }

  return (
    <div
      data-test-id={'main-nav-header'}
      className={twMerge(
        clsx(
          'radial-gradient font-menu flex flex-col items-center justify-center space-x-3 bg-brand-color-600 p-10 font-light'
        ),
        className
      )}
    >
      <div
        className={
          'image-rendering-unblur flex flex-col items-center justify-center'
        }
      >
        <Link href={'/'}>
          <MainLogo width={90} height={60} className={'mb-[7px]'} />
        </Link>
        <p
          className={
            'hidden font-family-brand text-2xl font-normal text-[#34695d]'
          }
        >
          Sandrine Rauter
        </p>
      </div>
    </div>
  );
};
