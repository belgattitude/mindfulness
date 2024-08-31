import type { FC, PropsWithChildren } from 'react';
import { cn } from '@/components/utils';
import { isStringNonEmpty } from '@httpx/assert';
import { clsx } from 'clsx';

type Props = {
  className?: string | undefined;
  title?: string | undefined;
} & PropsWithChildren;

export const PageContent: FC<Props> = (props) => {
  const { className, children, title } = props;
  return (
    <div className={'relative flex'}>
      <div
        className={cn(
          clsx(
            'flex flex-col',
            'font-family-brand',
            'rounded-lg lg:rounded-xl',
            'bg-white/90',
            // text-color
            'text-title-color-800',
            '*:text-title-color-800',
            // padding
            'px-5 py-2 pt-3 md:px-14 md:py-10 ',
            // margin
            'mx-5 mt-5 md:mt-10',
            'marker:mr-0 marker:text-brand-color-800',
            'shadow-lg'
          ),
          className
        )}
      >
        {isStringNonEmpty(title) && (
          <div className={'top absolute'}>
            <h2
              className={clsx(
                'border-1 md:text-md rounded-md border-amber-100 bg-brand-color-700/90 text-sm text-white',
                '-translate-x-2 -translate-y-8 md:-translate-x-8 md:-translate-y-16',
                'p-3'
              )}
            >
              {title}
            </h2>
          </div>
        )}
        <div className={'mt-5 lg:mt-0'}>{children}</div>
      </div>
    </div>
  );
};
