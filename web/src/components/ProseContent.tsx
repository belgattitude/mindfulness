import type { FC, PropsWithChildren } from "react";

import { cn } from "@/components/utils";

type Props = {
  className?: string | undefined;
} & PropsWithChildren;

/**
 * Rendered markdown, styled by shadcn/typeset (src/styles/typeset.css).
 * Typeset styles are in the components layer: plain utilities override them.
 */
export const ProseContent: FC<Props> = (props) => {
  const { className, children } = props;
  return (
    <div
      className={cn(
        [
          "typeset max-w-full text-zinc-700",
          // Larger text on large screens
          "lg:[--typeset-flow:1.2em] lg:[--typeset-leading:1.8] lg:[--typeset-size:1.25rem]",
          "[&_h1]:mt-6 [&_h1]:mb-1 [&_h1]:text-3xl [&_h1]:font-normal [&_h1]:text-neutral-700 lg:[&_h1]:text-4xl",
          "[&_img]:my-[2em] [&_img]:rounded-none",
          "[&_a]:text-blue-600",
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
