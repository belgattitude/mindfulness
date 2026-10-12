const normalizeText = (text: string) =>
  text.replaceAll(/\s+/gu, " ").trim().toLowerCase();

/**
 * Whether a summary adds nothing to the page: in strapi it is often the title
 * again or the first lines of the description, it should not be shown twice.
 */
export const isRedundantSummary = (
  summary: string,
  page: { title: string; description: string }
) => {
  const text = normalizeText(summary);
  return (
    text === normalizeText(page.title) ||
    normalizeText(page.description).includes(text.slice(0, 80))
  );
};

/** A strapi "blocks" node, only what the plain text needs */
interface BlocksNode {
  type: string;
  text?: string;
  children?: BlocksNode[];
}

const getNodeText = (node: BlocksNode): string =>
  node.type === "text"
    ? (node.text ?? "")
    : (node.children ?? [])
        .map(getNodeText)
        .join(node.type === "list" ? "\n" : "");

/**
 * Plain text of a strapi "blocks" rich text field (typed unknown by the
 * openapi spec), one paragraph per block: images are dropped.
 */
export const getBlocksText = (blocks: unknown): string =>
  Array.isArray(blocks)
    ? (blocks as BlocksNode[])
        .map(getNodeText)
        .filter((text) => text.trim() !== "")
        .join("\n\n")
    : "";

/**
 * Plain text excerpt, for meta descriptions (link previews): whitespace
 * collapsed, cut on a word around maxLength.
 */
export const getTextExcerpt = (value: string, maxLength = 160): string => {
  const text = value.replaceAll(/\s+/gu, " ").trim();
  if (text.length <= maxLength) {
    return text;
  }
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 0) || maxLength)}…`;
};

/**
 * Excerpt of a page introduction (blocks) without its headings: the
 * introduction starts with the page title (an h1)
 */
export const getPageIntroductionText = (
  blocks: unknown,
  maxLength = 160
): string =>
  getTextExcerpt(
    getBlocksText(
      Array.isArray(blocks)
        ? (blocks as BlocksNode[]).filter((block) => block.type !== "heading")
        : []
    ),
    maxLength
  );
