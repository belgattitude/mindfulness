import { isStringNonEmpty } from "@httpx/assert";
import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/components/utils";

export const PageBackgroundImg: FC<{
  alt?: string;
  url: string;
  width?: number | undefined;
  height?: number | undefined;
  className?: string;
}> = ({
  alt = "No alternative text",
  url,
  width = 1200,
  height = 800,
  className,
}) => (
  <div
    className={cn(
      // Pinned to the large viewport (no resize when the mobile toolbars
      // collapse), over the layout and footer backgrounds but under the page
      // and footer content, and never catching clicks
      "pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh overflow-hidden opacity-15",
      className
    )}
  >
    {isStringNonEmpty(url) && (
      <Image
        className="absolute size-full object-cover"
        alt={alt}
        width={width}
        height={height}
        style={{
          objectFit: "cover",
        }}
        src={url}
      />
    )}
  </div>
);
