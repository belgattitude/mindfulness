import type { FC } from "react";

import { BlocksText, isBlocksContent } from "@/components/BlocksText";
import { MarkdownText } from "@/components/MarkdownText";

interface Props {
  /** The "blocks" field, preferred when filled */
  blocks: unknown;
  /** The markdown "richtext" field it replaces, shown until it is migrated */
  markdown?: string | null | undefined;
  className?: string;
}

/**
 * A rich text being migrated from markdown to blocks
 * (strapi: pnpm migrate:blocks), drop the markdown once migrated.
 */
export const RichText: FC<Props> = (props) => {
  const { blocks, markdown, className } = props;
  if (isBlocksContent(blocks)) {
    return <BlocksText className={className} content={blocks} />;
  }
  return <MarkdownText className={className} text={markdown ?? ""} />;
};
