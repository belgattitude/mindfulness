import { clsx } from "clsx";
import type { Ref } from "react";

import { cn } from "@/components/utils";
import BurgerOpenIcon from "@/public/icons/burger-simple-svgrepo-com.svg";
import BurgerCloseIcon from "@/public/icons/cross-svgrepo-com.svg";

interface Props {
  handleClick: () => void;
  isOpen: boolean;
  className?: string;
  // React 19: ref is a regular prop, no forwardRef needed
  ref?: Ref<HTMLButtonElement>;
}

export const BurgerMenuIcon = (props: Props) => {
  const { isOpen, handleClick, className, ref, ...restBtnProps } = props;

  return (
    <button
      type="button"
      ref={ref}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
      className={cn(
        "relative block size-[32px] cursor-pointer transition-opacity",
        className
      )}
      onClick={() => {
        handleClick();
      }}
      {...restBtnProps}
    >
      <BurgerOpenIcon
        className={clsx(
          "absolute top-0 left-0 size-full transition-opacity delay-450 duration-300 ease-in-out",
          {
            "opacity-0": isOpen,
          }
        )}
      />
      <BurgerCloseIcon
        className={clsx(
          "absolute size-full opacity-0 transition-opacity delay-450 duration-300 ease-in-out",
          {
            "opacity-100": isOpen,
          }
        )}
      />
    </button>
  );
};
