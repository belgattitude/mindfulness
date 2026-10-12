import Link from "next/link";
import type { FC } from "react";

import { MainLogo } from "@/components/Logo/MainLogo";
import { cn } from "@/components/utils";

interface Props {
  className?: string;
}
export const MainNavHeader: FC<Props> = (props) => {
  const { className } = props;
  return (
    <div
      data-test-id="main-nav-header"
      className={cn(
        // The light is attached to the logo, not to the center of the bar:
        // it follows it, left on mobile and centered from md
        "bg-brand-color-400 relative isolate overflow-hidden font-light",
        // A slim bar on mobile (room on the right for the fixed burger),
        // the centered logo and name from md
        "flex items-center px-4 py-3 pr-18 md:justify-center md:p-10",
        className
      )}
    >
      <Link
        href="/"
        className="relative flex items-center gap-3 outline-green-500 md:flex-col md:gap-[7px]"
      >
        <span
          aria-hidden="true"
          className="from-brand-color-50 pointer-events-none absolute top-1/2 left-1/2 -z-10 size-72 -translate-1/2 bg-radial to-transparent to-70% md:size-[44rem]"
        />
        <MainLogo
          preload={true}
          className="h-10 w-auto md:h-[50px] lg:h-[70px]"
        />
        <span className="font-family-brand text-nav-title text-lg font-normal md:text-xl">
          Sandrine Rauter
        </span>
      </Link>
    </div>
  );
};
