import Image from 'next/image';
import type { CSSProperties, FC } from 'react';
import { twMerge } from 'tailwind-merge';
// import logo from '@/public/logo/sandrine-logo.png';
import logo from '@/public/logo/logo-small-sandrine-transparent.png';

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  style?: CSSProperties;
};
export const MainLogo: FC<Props> = (props) => {
  const {
    className = '',
    width = 95,
    height = 100,
    priority = false,
    style,
  } = props;
  return (
    <img
      alt={'Sandrine Rauter logo'}
      src={'/logo/logo-small-green-sandrine-transparent.png'}
      className={twMerge('', className)}
      width={width}
      // height={height}
      loading={'eager'}
      // quality={90}
      style={style}
    />
  );
};
