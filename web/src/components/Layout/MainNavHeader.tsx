import Link from 'next/link';
import type { FC } from 'react';
import { MainLogo } from '@/components/Logo/MainLogo';
import { cn } from '@/components/utils';

type Props = {
  className?: string;
};
export const MainNavHeader: FC<Props> = (props) => {
  const { className } = props;
  return (
    <div
      data-test-id={'main-nav-header'}
      className={cn(
        'radial-gradient font-menu flex flex-col items-center justify-center space-x-3 bg-brand-color-600 p-10 font-light',
        className
      )}
    >
      <div
        className={
          'image-rendering-unblur flex flex-col items-center justify-center'
        }
      >
        <Link href={'/'}>
          <MainLogo
            width={90}
            height={60}
            className={'mb-[7px] h-[60px] w-auto lg:h-[90px]'}
          />
        </Link>
        <p className={'font-family-brand text-xl font-normal text-[#34695d]'}>
          Sandrine Rauter
        </p>
      </div>
    </div>
  );
};
