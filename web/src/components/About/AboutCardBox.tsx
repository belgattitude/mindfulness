import type { FC, PropsWithChildren } from 'react';
import { cn } from '@/components/utils';

type AboutCardBoxProps = {
  className?: string | undefined;
} & PropsWithChildren;
export const AboutCardBox: FC<AboutCardBoxProps> = (props) => {
  const { className = '', children } = props;
  return <div className={cn('', className)}>{children}</div>;
};
