import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'small' | 'normal' | 'large';
  children: string;
};

export const Button = forwardRef<
  HTMLButtonElement, // | HTMLAnchorElement,
  ButtonProps
>(
  /** prefer named function to not have to set the displayName */
  function Button(props, ref) {
    const { size = 'normal', className = '', children, ...restProps } = props;

    return (
      <button
        {...restProps}
        ref={ref}
        className={twMerge(
          clsx(
            'rounded-3xl border bg-title-color-400 text-white hover:bg-title-color-300',
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
  }
);
