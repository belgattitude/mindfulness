import { describe, expect, it } from "vitest";

import { getTextExcerpt, isRedundantSummary } from "../text.utils";

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

describe(getTextExcerpt, () => {
  it("should remove the markdown syntax", () => {
    expect(
      getTextExcerpt(
        "# Titre\n\nVoir [le site](https://x.y) et **gras** ![](a.png)"
      )
    ).toBe("Titre Voir le site et gras");
  });

  it("should cut on a word", () => {
    expect(getTextExcerpt("un deux trois quatre", 12)).toBe("un deux…");
  });
});
