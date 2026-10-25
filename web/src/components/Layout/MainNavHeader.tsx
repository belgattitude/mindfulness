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
        // On mobile the bar is too slim for a round light (cut off at the
        // bottom edge): a wash fading from the logo to the burger instead
        "bg-brand-color-400 from-brand-color-50/80 bg-linear-to-r to-transparent to-70% md:bg-none",
        "relative isolate overflow-hidden font-light",
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
          // The light follows the logo, centered from md
          className="from-brand-color-50 pointer-events-none absolute top-1/2 left-1/2 -z-10 hidden size-72 -translate-1/2 bg-radial to-transparent to-70% md:block md:size-[44rem]"
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
