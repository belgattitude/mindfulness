import { clsx } from "clsx";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

import { cn } from "@/components/utils";

type Props = {
  className?: string | undefined;
  /**
   * The section of the page, a small label above its title: a link to the
   * section page when there is one (a one level breadcrumb)
   */
  eyebrow?: { label: string; href?: string | undefined } | undefined;
} & PropsWithChildren;

/**
 * Negative margins cancelling the top and side paddings of the content (keep
 * in sync): a first section spanning the whole card, from its top edge, with
 * the same rounded corners. The content paddings, to align its own content.
 */
export const pageContentBleedClassName = clsx(
  "-mx-4 -mt-6 sm:-mx-6 md:-mx-14 md:-mt-10",
  "px-4 sm:px-6 md:px-14",
  "rounded-t-lg lg:rounded-t-xl"
);

const eyebrowClassName =
  "text-title-color-600 mb-3 block w-fit text-xs font-medium tracking-widest uppercase";

const Eyebrow: FC<{ label: string; href?: string | undefined }> = (props) => {
  const { label, href } = props;
  // Wrapped: the card colors its direct children (*:text-title-color-800)
  if (href === undefined) {
    return (
      <div>
        <p className={eyebrowClassName}>{label}</p>
      </div>
    );
  }
  return (
    <nav aria-label="Fil d’Ariane">
      <Link
        href={href}
        className={cn(
          eyebrowClassName,
          "hover:text-title-color-800 decoration-current/30 underline-offset-4 outline-green-500 transition-colors hover:underline"
        )}
      >
        {label}
      </Link>
    </nav>
  );
};

export const PageContent: FC<Props> = (props) => {
  const { className, children, eyebrow } = props;
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
            // padding, tight on mobile to give the text the width (see
            // pageContentBleedClassName)
            "px-4 py-6 sm:px-6 md:px-14 md:py-10",
            // margin, a thin green border kept around on mobile
            "mx-2 mt-5 mb-2 sm:mx-5 md:mt-10 md:mb-0",
            "marker:text-brand-color-800 marker:mr-0",
            "shadow-lg"
          ),
          className
        )}
      >
        {eyebrow && <Eyebrow label={eyebrow.label} href={eyebrow.href} />}
        <div>{children}</div>
      </div>
    </div>
  );
};
