import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import BurgerOpenIcon from '@/public/icons/burger-simple-svgrepo-com.svg';
import BurgerCloseIcon from '@/public/icons/cross-svgrepo-com.svg';

type Props = {
  handleClick: () => void;
  isOpen: boolean;
  className?: string;
};

export const BurgerMenuIcon = forwardRef<
  HTMLDivElement & { children?: never },
  Props
>(
  /** prefer named function to not have to set the displayName */
  function BurgerMenuIcon(props, ref) {
    const { isOpen, handleClick, className, ...restBtnProps } = props;

    return (
      <div
        className={twMerge('cursor-pointer transition-opacity', className)}
        onClick={() => {
          handleClick();
        }}
        {...restBtnProps}
        ref={ref}
      >
        <BurgerOpenIcon
          className={clsx(
            'delay-450 absolute top-0 left-0 h-auto w-auto transition-opacity duration-300 ease-in-out',
            {
              ['opacity-0']: isOpen,
            }
          )}
        />
        <BurgerCloseIcon
          className={clsx(
            'delay-450 absolute h-auto w-auto opacity-0 transition-opacity duration-300 ease-in-out',
            {
              ['opacity-100']: isOpen,
            }
          )}
        />
      </div>
    );
  }
);
