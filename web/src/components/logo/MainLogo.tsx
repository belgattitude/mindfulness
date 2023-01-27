import Image from 'next/image';
import type { CSSProperties, FC } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '@/public/logo/sandrine-logo.png';

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
    <Image
      alt={'Sandrine Rauter logo'}
      src={logo}
      className={twMerge('', className)}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      style={style}
    />
  );
};
