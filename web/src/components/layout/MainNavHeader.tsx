import { clsx } from 'clsx';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { MainLogo } from '@/components/logo/MainLogo';

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
          'transition-all-1s from-brand-color-500 to-brand-color-700 font-menu via-brand-color-500 flex flex-col items-center justify-center space-x-3 bg-gradient-to-r p-10 font-light text-white',
          {
            ['-translate-y-60 h-0']: collapse,
            ['bg-white']: forceWhiteBg,
          }
        ),
        className
      )}
    >
      <MainLogo
        className={'brightness-900 mb-[7px] h-[75px] w-[75px] opacity-90'}
        style={{
          objectFit: 'scale-down',
        }}
      />
      <p className={'font-family-title text-2xl font-light text-white'}>
        Sandrine Rauter
      </p>
    </div>
  );
};
