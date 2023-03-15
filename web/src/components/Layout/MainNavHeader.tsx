import { clsx } from 'clsx';
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
          'radial-gradient font-menu bg-brand-color-600 flex flex-col items-center justify-center space-x-3 p-10 font-light',
          false &&
            'transition-all-1s from-brand-color-500 to-brand-color-700 font-menu via-brand-color-500 flex flex-col items-center justify-center space-x-3 bg-gradient-to-r p-10 font-light text-white',
          {
            ['-translate-y-60 h-0']: collapse,
            ['bg-white']: forceWhiteBg,
          }
        ),
        className
      )}
    >
      <div
        className={
          'image-rendering-unblur flex flex-col items-center justify-center'
        }
      >
        <MainLogo width={90} height={60} className={'mb-[7px]'} />
        <p
          className={
            'font-family-brand hidden text-2xl font-normal text-[#34695d]'
          }
        >
          Sandrine Rauter
        </p>
      </div>
    </div>
  );
};
