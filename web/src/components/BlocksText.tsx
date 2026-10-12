import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import type { ComponentProps, FC } from "react";

import { cn } from "@/components/utils";
import { getStrapiMedia } from "@/lib/strapi";

type Blocks = NonNullable<ComponentProps<typeof BlocksRenderer>["blocks"]>;
type BlockProps<K extends keyof Blocks> = ComponentProps<
  NonNullable<Blocks[K]>
>;

const ImageBlock: FC<BlockProps<"image">> = (props) => {
  const { image } = props;
  const src = getStrapiMedia(image);
  if (src === null) {
    return null;
  }
  return (
    <Image
      src={src}
      width={image.width}
      height={image.height}
      sizes="(min-width: 1024px) 768px, 100vw"
      className="h-auto w-full"
      alt={image.alternativeText ?? ""}
    />
  );
};

const LinkBlock: FC<BlockProps<"link">> = (props) => {
  const { children, url } = props;
  const isExternal = /^https?:\/\//u.test(url);
  return (
    <a
      href={url}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
};

const blocks: Blocks = { image: ImageBlock, link: LinkBlock };

export const isBlocksContent = (v: unknown): v is BlocksContent =>
  Array.isArray(v) && v.length > 0;

interface Props {
  /** A strapi "blocks" rich text field, typed unknown by the openapi spec */
  content: unknown;
  className?: string;
}

/** Renders a strapi "blocks" rich text field (the json editor) */
export const BlocksText: FC<Props> = (props) => {
  const { content, className } = props;
  if (!isBlocksContent(content)) {
    return null;
  }
  return (
    <div className={cn("list-inside list-disc", className)}>
      <BlocksRenderer content={content} blocks={blocks} />
    </div>
  );
};
