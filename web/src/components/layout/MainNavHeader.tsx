import { clsx } from 'clsx';
import type { FC } from 'react';
import { MainLogo } from '@/components/logo/MainLogo';

type Props = {
  collapse: boolean;
  render: boolean;
  forceWhiteBg?: boolean;
};
export const MainNavHeader: FC<Props> = (props) => {
  const { collapse = false, render = true, forceWhiteBg = false } = props;
  if (!render) {
    return <></>;
  }

  return (
    <div
      data-test-id={'main-nav-header'}
      className={clsx(
        'transition-all-1s bg-brand-color-500 font-text-primary flex flex-col items-center justify-center space-x-3 p-10 font-light text-white',
        {
          ['-translate-y-60 h-0']: collapse,
          ['bg-white']: forceWhiteBg,
        }
      )}
    >
      <MainLogo
        className={'brightness-900 mb-[5px] h-[75px] w-[75px] opacity-90'}
        style={{
          objectFit: 'scale-down',
        }}
      />
      <p className={'text-2xl font-normal text-neutral-800'}>Sandrine Rauter</p>
    </div>
  );
};
