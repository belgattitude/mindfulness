import { clsx } from "clsx";
import { forwardRef } from "react";

import { cn } from "@/components/utils";
import BurgerOpenIcon from "@/public/icons/burger-simple-svgrepo-com.svg";
import BurgerCloseIcon from "@/public/icons/cross-svgrepo-com.svg";

interface Props {
  handleClick: () => void;
  isOpen: boolean;
  className?: string;
  // ref?: { current: HTMLDivElement | undefined | null };
}

export const BurgerMenuIcon = forwardRef<HTMLDivElement, Props>(
  /** prefer named function to not have to set the displayName */
  (props, ref) => {
    const { isOpen, handleClick, className, ...restBtnProps } = props;

    return (
      <div
        className={cn(
          "relative size-[32px] cursor-pointer transition-opacity",
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
            "absolute top-0 left-0 size-full transition-opacity delay-450 duration-300 ease-in-out",
            {
              ["opacity-0"]: isOpen,
            }
          )}
        />
        <BurgerCloseIcon
          className={clsx(
            "absolute size-full opacity-0 transition-opacity delay-450 duration-300 ease-in-out",
            {
              ["opacity-100"]: isOpen,
            }
          )}
        />
      </div>
    );
  }
);
