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
        "radial-gradient bg-brand-color-600 font-light",
        // A slim bar on mobile (room on the right for the fixed burger),
        // the centered logo and name from md
        "flex items-center px-4 py-3 pr-18 md:justify-center md:p-10",
        className
      )}
    >
      <Link
        href="/"
        className="image-rendering-unblur flex items-center gap-3 outline-green-500 md:flex-col md:gap-[7px]"
      >
        <MainLogo
          width={90}
          height={60}
          className="h-10 w-auto md:h-[50px] lg:h-[70px]"
        />
        <span className="font-family-brand text-nav-title text-lg font-normal md:text-xl">
          Sandrine Rauter
        </span>
      </Link>
    </div>
  );
};
