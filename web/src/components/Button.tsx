import clsx from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  size?: 'small' | 'normal' | 'large';
  children: string;
  className?: string;
};

export const Button = forwardRef<
  HTMLButtonElement, // | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { size = 'normal', className = '', children } = props;

  return (
    <button
      ref={ref}
      className={twMerge(
        clsx(
          'rounded-full border bg-blue-500 font-bold text-white hover:bg-blue-700',
          {
            ['py-1 px-2']: size === 'small',
            ['py-2 px-4']: size === 'normal',
            ['py-4 px-6']: size === 'large',
          }
        ),
        className
      )}
    >
      {children}
    </button>
  );
  /*
  return (
    <button
      ref={ref}
      className={twMerge(
        clsx(
          'rounded-full bg-blue-500  font-bold text-white hover:bg-blue-700',
          {
            ['py-1 px-2']: size === 'small',
            ['py-2 px-4']: size === 'normal',
            ['py-4 px-6']: size === 'large',
          }
        ),
        className
      )}
    >
      {children}
    </button>
  ); */
});

Button.displayName = 'Button';
