import { describe, expect, it } from "vitest";

import {
  getBlocksText,
  getTextExcerpt,
  isRedundantSummary,
} from "../text.utils";

describe(isRedundantSummary, () => {
  const page = {
    title: "Cours de hatha Yoga en ligne",
    description: "Nous sommes des êtres de relations.\n\nEt de communication.",
  };

  it("should detect a summary repeating the title", () => {
    expect(
      isRedundantSummary("Cours de hatha  yoga en ligne ", page)
    ).toBeTruthy();
  });

  it("should detect a summary starting the description", () => {
    expect(
      isRedundantSummary("Nous sommes des êtres de relations.", page)
    ).toBeTruthy();
  });

  it("should keep a summary adding something", () => {
    expect(isRedundantSummary("Huit séances de pratique.", page)).toBeFalsy();
  });
});

describe(getBlocksText, () => {
  it("should join the blocks text, without images", () => {
    expect(
      getBlocksText([
        {
          type: "heading",
          level: 1,
          children: [{ type: "text", text: "Titre" }],
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Voir " },
            {
              type: "link",
              url: "https://x.y",
              children: [{ type: "text", text: "le site", bold: true }],
            },
          ],
        },
        { type: "image", image: {}, children: [{ type: "text", text: "" }] },
        {
          type: "list",
          format: "unordered",
          children: [
            { type: "list-item", children: [{ type: "text", text: "un" }] },
            { type: "list-item", children: [{ type: "text", text: "deux" }] },
          ],
        },
      ])
    ).toBe("Titre\n\nVoir le site\n\nun\ndeux");
  });

  it("should return an empty text when not blocks", () => {
    expect(getBlocksText(null)).toBe("");
  });
});

describe(getTextExcerpt, () => {
  it("should collapse the whitespace", () => {
    expect(getTextExcerpt(" Titre\n\nVoir  le site ")).toBe(
      "Titre Voir le site"
    );
  });

  it("should cut on a word", () => {
    expect(getTextExcerpt("un deux trois quatre", 12)).toBe("un deux…");
  });
});
