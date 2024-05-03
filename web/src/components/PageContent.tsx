import type { FC, PropsWithChildren } from 'react';
import { cn } from '@/components/utils';
import { isStringNonEmpty } from '@httpx/assert';

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
          [
            'flex flex-col',
            'font-family-brand',
            'rounded-lg lg:rounded-xl',
            'bg-white/90',
            'text-neutral-700',
            // padding
            'py-2 px-5 pt-3 md:px-14 md:py-10 ',
            // margin
            'mx-5 md:mt-10',
            'marker:mr-0 marker:text-brand-color-800',
            'shadow-lg',
          ].join(' '),
          className
        )}
      >
        {isStringNonEmpty(title) && (
          <div className={'top absolute flex w-full'}>
            <h2
              className={
                'border-1 -translate-x-8 -translate-y-16 rounded-md border-amber-100 bg-brand-color-700 p-3 text-lg text-white'
              }
            >
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
