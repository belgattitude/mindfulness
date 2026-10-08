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

/**
 * Plain text excerpt of a markdown text, for meta descriptions (link previews):
 * markdown syntax removed, cut on a word around maxLength.
 */
export const getTextExcerpt = (markdown: string, maxLength = 160): string => {
  const text = markdown
    .replaceAll(/!\[[^\]]*\]\([^)]*\)/gu, "")
    .replaceAll(/\[(?<label>[^\]]*)\]\([^)]*\)/gu, "$<label>")
    .replaceAll(/[#>*_`~]+/gu, "")
    .replaceAll(/\s+/gu, " ")
    .trim();
  if (text.length <= maxLength) {
    return text;
  }
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 0) || maxLength)}…`;
};
