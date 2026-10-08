import { expect, describe, it } from "vitest";

import { getCommonPathnameLevels } from "@/lib/helpers/url";

describe(getCommonPathnameLevels, () => {
  it("should work as expected", () => {
    expect(getCommonPathnameLevels("/path", "/url")).toBe(0);
    expect(getCommonPathnameLevels("/path", "/path")).toBe(1);
    expect(getCommonPathnameLevels("/path/about", "/path/about")).toBe(2);
    expect(getCommonPathnameLevels("/path/about", "/path")).toBe(1);
    expect(getCommonPathnameLevels("/path", "/path/about")).toBe(1);
    expect(getCommonPathnameLevels("/", "/")).toBe(0);
  });
});
