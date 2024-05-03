import type { FC, PropsWithChildren } from 'react';
import { cn } from '@/components/utils';

type Props = {
  className?: string | undefined;
} & PropsWithChildren;

export const PageContent: FC<Props> = (props) => {
  const { className, children } = props;
  return (
    <div
      className={cn(
        [
          'flex flex-col',
          'font-family-brand',
          'rounded-lg lg:rounded-xl',
          'bg-white/80',
          'text-neutral-700',
          'py-2 px-5 mx-5 pt-3 md:px-14 md:py-10 md:mt-10',
          'marker:mr-0 marker:text-purple-600',
          'shadow-lg',
        ].join(' '),
        className
      )}
    >
      {children}
    </div>
  );
};
