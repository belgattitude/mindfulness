import { isStringNonEmpty } from "@httpx/assert";
import { clsx } from "clsx";
import { Fragment } from "react";
import type { FC, PropsWithChildren } from "react";

import { cn } from "@/components/utils";

type Props = {
  className?: string | undefined;
  /** Shown in a pill over the top edge, several levels as a breadcrumb */
  title?: string | readonly string[] | undefined;
} & PropsWithChildren;

export const PageContent: FC<Props> = (props) => {
  const { className, children, title } = props;
  const crumbs = (typeof title === "string" ? [title] : (title ?? [])).filter(
    (crumb) => isStringNonEmpty(crumb)
  );
  return (
    <div className="relative flex">
      <div
        className={cn(
          clsx(
            // Always the full main width, whatever the content: no width
            // change from one page to another
            "flex min-w-0 flex-1 flex-col",
            "font-family-brand",
            "rounded-lg lg:rounded-xl",
            "bg-white/90",
            // text-color
            "text-title-color-800",
            "*:text-title-color-800",
            // padding, tight on mobile to give the text the width
            "px-4 pt-3 pb-6 sm:px-6 md:px-14 md:py-10",
            // margin, a thin green border kept around on mobile
            "mx-2 mt-5 mb-2 sm:mx-5 md:mt-10 md:mb-0",
            "marker:text-brand-color-800 marker:mr-0",
            "shadow-lg"
          ),
          className
        )}
      >
        {crumbs.length > 0 && (
          // Translate the wrapper, not the pill: an untranslated wrapper stays
          // over the start of the content and swallows its clicks
          <div className="absolute -translate-x-2 -translate-y-8 md:-translate-x-8 md:translate-y-[-58px]">
            <h2 className="ring-brand-color-300 text-nav-title shadow-nav-title/20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px]/none font-medium whitespace-nowrap shadow-md ring-1">
              {crumbs.map((crumb, idx) =>
                idx < crumbs.length - 1 ? (
                  <Fragment key={crumb}>
                    <span className="opacity-70">{crumb}</span>
                    <span aria-hidden="true" className="opacity-50">
                      ›
                    </span>
                  </Fragment>
                ) : (
                  <span key={crumb}>{crumb}</span>
                )
              )}
            </h2>
          </div>
        )}
        {/* Room for the pill, only when there is one */}
        <div className={cn(crumbs.length > 0 && "mt-5 lg:mt-0")}>
          {children}
        </div>
      </div>
    </div>
  );
};
