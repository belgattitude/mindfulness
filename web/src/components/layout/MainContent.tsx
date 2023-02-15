import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
} & PropsWithChildren;

export const MainContent: FC<Props> = (props) => {
  const { children, className = '' } = props;
  return (
    <main
      className={twMerge(
        clsx('font-family-primary container mx-auto'),
        className
      )}
    >
      {children}
    </main>
  );
};
