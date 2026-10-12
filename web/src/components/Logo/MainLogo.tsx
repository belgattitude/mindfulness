import Image from "next/image";
import type { CSSProperties, FC } from "react";

interface Props {
  className?: string;
  /** Above the fold (the header) */
  preload?: boolean;
  style?: CSSProperties;
}

/**
 * The logo, a vector: sharp at any size and density (the png it replaces was
 * 100px wide). Served as is, svg are not optimized by next/image.
 */
export const MainLogo: FC<Props> = (props) => {
  const { className, preload = false, style } = props;
  return (
    <Image
      alt="Sandrine Rauter logo"
      src="/logo/logo-sandrine.svg"
      width={459}
      height={443}
      unoptimized={true}
      preload={preload}
      className={className}
      style={style}
    />
  );
};
