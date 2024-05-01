import type { FC, PropsWithChildren } from 'react';
import { cn } from '@/components/utils';

type Props = {
  className?: string | undefined;
} & PropsWithChildren;

export const ProseContent: FC<Props> = (props) => {
  const { className, children } = props;
  return (
    <div
      className={cn(
        [
          'font-family-brand',
          'rounded-lg lg:rounded-xl',
          'bg-white/80',
          'prose-slate',
          'text-neutral-700',
          'py-2 px-5 mx-5 pt-3 lg:px-14 lg:py-10 lg:mt-10',
          'prose lg:prose-xl prose-zinc prose-h1:mb-1 prose-h1:text-neutral-700 prose-h1:font-normal prose-h1:text-3xl lg:prose-h1:text-4xl prose-a:text-blue-600 prose-ul:list-inside prose-ul:list-disc prose-ul:p-0 prose-li:pl-0',
          'shadow-lg marker:mr-0 marker:text-purple-600 ',
          'max-w-full',
        ].join(' '),
        className
      )}
    >
      {children}
    </div>
  );
};
