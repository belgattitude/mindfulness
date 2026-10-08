import Link from "next/link";
import type { FC } from "react";

import type { MainNavLinks } from "@/config/site.config";

import { cn } from "../utils";

interface MainSidebarProps {
  hidden: boolean;
  mainNavLinks: MainNavLinks;
}
export const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { hidden, mainNavLinks } = props;
  return (
    <div
      className={cn(
        "absolute top-0 flex h-full w-[70vw] flex-col justify-center gap-5 border-8 bg-white p-5 transition-all duration-300 ease-in-out",
        hidden
          ? "pointer-events-none -z-50 translate-x-[-500px] opacity-0"
          : "pointer-events-auto z-50 translate-x-0 opacity-100"
      )}
    >
      {mainNavLinks.map((link) => (
        <Link key={link.href} href={link.href} className="flex border text-3xl">
          {link.title}
        </Link>
      ))}
    </div>
  );
};
