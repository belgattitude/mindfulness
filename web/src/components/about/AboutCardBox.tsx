import { clsx } from 'clsx';
import type { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type AboutCardBoxProps = {
  children: ReactNode;
  className?: string;
};
export const AboutCardBox: FC<AboutCardBoxProps> = (props) => {
  const { className = '', children } = props;

  return (
    <div
      className={twMerge(
        clsx('flex justify-center overflow-hidden'),
        className
      )}
    >
      {children}
    </div>
  );
};
