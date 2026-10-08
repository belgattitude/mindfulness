import type { Ref } from "react";

import { cn } from "@/components/utils";

interface Props {
  handleClick: () => void;
  isOpen: boolean;
  className?: string;
  /** Id of the element the button opens */
  controls?: string;
  // React 19: ref is a regular prop, no forwardRef needed
  ref?: Ref<HTMLButtonElement>;
}

const lineClassName =
  "bg-nav-title absolute left-0 h-[1.5px] w-full rounded-full transition-all duration-300 ease-in-out motion-reduce:transition-none";

/** Three thin lines turning into a cross when open */
export const BurgerMenuIcon = (props: Props) => {
  const { isOpen, handleClick, className, controls, ref } = props;

  return (
    <button
      type="button"
      ref={ref}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
      aria-controls={controls}
      className={cn(
        "ring-brand-color-800/40 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 outline-green-500 backdrop-blur-sm transition-colors hover:bg-white",
        className
      )}
      onClick={handleClick}
    >
      <span aria-hidden="true" className="relative block h-3.5 w-5">
        <span
          className={cn(
            lineClassName,
            isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          )}
        />
        <span
          className={cn(
            lineClassName,
            "top-1/2 -translate-y-1/2",
            isOpen && "scale-x-0 opacity-0"
          )}
        />
        <span
          className={cn(
            lineClassName,
            isOpen
              ? "top-1/2 -translate-y-1/2 -rotate-45"
              : "top-full -translate-y-full"
          )}
        />
      </span>
    </button>
  );
};
