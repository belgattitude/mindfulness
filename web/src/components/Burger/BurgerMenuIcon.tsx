import { clsx } from 'clsx';
import { forwardRef } from 'react';
import BurgerOpenIcon from '@/public/icons/burger-simple-svgrepo-com.svg';
import BurgerCloseIcon from '@/public/icons/cross-svgrepo-com.svg';
import { cn } from '@/components/utils';

type Props = {
  handleClick: () => void;
  isOpen: boolean;
  className?: string;
  // ref?: { current: HTMLDivElement | undefined | null };
};

export const BurgerMenuIcon = forwardRef<HTMLDivElement, Props>(
  /** prefer named function to not have to set the displayName */
  function BurgerMenuIcon(props, ref) {
    const { isOpen, handleClick, className, ...restBtnProps } = props;

    return (
      <div
        className={cn(
          'size-[32px] cursor-pointer transition-opacity relative',
          className
        )}
        onClick={() => {
          handleClick();
        }}
        {...restBtnProps}
        ref={ref}
      >
        <BurgerOpenIcon
          className={clsx(
            'delay-450 absolute left-0 top-0 size-full transition-opacity duration-300 ease-in-out',
            {
              ['opacity-0']: isOpen,
            }
          )}
        />
        <BurgerCloseIcon
          className={clsx(
            'delay-450 absolute size-full opacity-0 transition-opacity duration-300 ease-in-out',
            {
              ['opacity-100']: isOpen,
            }
          )}
        />
      </div>
    );
  }
);
