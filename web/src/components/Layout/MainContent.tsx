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
        clsx('container mx-auto font-family-primary'),
        className
      )}
    >
      {children}
    </main>
  );
};
