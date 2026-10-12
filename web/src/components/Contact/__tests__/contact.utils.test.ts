import { describe, expect, it } from "vitest";

import { getTelUrl, getWhatsappUrl } from "../contact.utils";

describe(getTelUrl, () => {
  it("should keep the digits of an international number", () => {
    expect(getTelUrl("+32 476 298 224")).toBe("tel:+32476298224");
  });
});

describe(getWhatsappUrl, () => {
  it("should link to a chat with the number", () => {
    expect(getWhatsappUrl("+32 476 298 224")).toBe("https://wa.me/32476298224");
  });
});
