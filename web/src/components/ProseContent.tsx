import type { FC, PropsWithChildren } from "react";

import { cn } from "@/components/utils";

type Props = {
  className?: string | undefined;
} & PropsWithChildren;

/**
 * Rendered rich text (strapi blocks), styled by shadcn/typeset
 * (src/styles/typeset.css). Typeset styles are in the components layer: plain
 * utilities override them.
 *
 * The body text is the one of the home introduction (AboutCard): the same
 * size, line height and color on every page and screen size.
 */
export const ProseContent: FC<Props> = (props) => {
  const { className, children } = props;
  return (
    <div
      className={cn(
        [
          "typeset max-w-full text-lg leading-8 text-neutral-700",
          // Headings as the site ones: green, not bold
          "[&_:is(h1,h2,h3,h4)]:text-title-color-800 [&_:is(h1,h2,h3,h4)]:font-normal",
          "[&_h1]:mt-6 [&_h1]:mb-1 [&_h1]:text-3xl lg:[&_h1]:text-4xl",
          "[&_img]:my-[2em] [&_img]:rounded-none",
          "[&_a]:text-title-color-700 [&_a:hover]:text-title-color-800",
          "[&_li]:pl-0 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:p-0",
          // Quotes in the soft serif, as the home quote (AboutCard): it is
          // smaller than the body font at the same size
          "[&_blockquote]:font-display [&_blockquote]:text-title-color-700 [&_blockquote]:text-[1.3em] [&_blockquote]:leading-snug [&_blockquote]:italic",
        ].join(" "),
        className
      )}
    >
      {children}
    </div>
  );
};
