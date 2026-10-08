import { expect, describe, it } from "vitest";

import { getCommonPathnameLevels } from "@/lib/helpers/url";

describe(getCommonPathnameLevels, () => {
  it.each([
    ["/path", "/url", 0],
    ["/path", "/path", 1],
    ["/path/about", "/path/about", 2],
    ["/path/about", "/path", 1],
    ["/path", "/path/about", 1],
    ["/", "/", 0],
  ] as const)(
    "should return %i common levels for '%s' and '%s'",
    (pathname1, pathname2, expected) => {
      expect(getCommonPathnameLevels(pathname1, pathname2)).toBe(expected);
    }
  );
});
