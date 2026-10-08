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
      "fixed top-0 left-0 m-0 h-screen max-h-screen w-full overflow-hidden p-0 opacity-15",
      className
    )}
  >
    {isStringNonEmpty(url) && (
      <Image
        className={"absolute size-full object-cover"}
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
