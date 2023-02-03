import { clsx } from 'clsx';
import type { FC } from 'react';
import { MainLogo } from '@/components/logo/MainLogo';

type Props = {
  collapse: boolean;
  render: boolean;
};
export const MainNavHeader: FC<Props> = (props) => {
  const { collapse = false, render = true } = props;
  if (!render) {
    return <></>;
  }
  return (
    <div
      data-test-id={'main-nav-header'}
      className={clsx(
        'transition-all-1s bg-brand-color-500 font-text-primary flex flex-col items-center justify-center space-x-3 bg-white p-5 font-light text-white',
        {
          ['-translate-y-60 h-0']: collapse,
        }
      )}
    >
      <MainLogo
        className={'mt-5 h-[75px] w-[75px]'}
        style={{
          objectFit: 'scale-down',
        }}
      />
      <p className={'text-light text-xl'}>Sandrine Rauter</p>
    </div>
  );
};
