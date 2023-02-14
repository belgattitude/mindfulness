import { clsx } from 'clsx';
import { forwardRef } from 'react';
import BurgerOpenIcon from '@/public/icons/burger-simple-svgrepo-com.svg';
import BurgerCloseIcon from '@/public/icons/cross-svgrepo-com.svg';

type Props = {
  handleClick: () => void;
  isOpen: boolean;
};

export const BurgerMenuButton = forwardRef<
  HTMLButtonElement & { children?: never },
  Props
>(
  /** prefer named function to not have to set the displayName */
  function BurgerMenuButton(props, ref) {
    const { isOpen, handleClick, ...restBtnProps } = props;

    return (
      <button
        onClick={() => {
          handleClick();
        }}
        className={''}
        {...restBtnProps}
        ref={ref}
      >
        <div
          className={
            'absolute top-3 right-5 h-[32px] w-[32px] transition-opacity'
          }
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
      </button>
    );
  }
);
