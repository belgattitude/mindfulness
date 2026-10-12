import { afterEach, describe, expect, it, vi } from "vitest";

import { getSiteUrl, isVercelPreview } from "../site-url";

describe(getSiteUrl, () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should use NEXT_PUBLIC_SITE_URL outside of a vercel preview", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://sandrine-rauter.be");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL_URL", "mindfulness-abc123.vercel.app");
    expect(getSiteUrl()).toBe("https://sandrine-rauter.be");
    expect(isVercelPreview()).toBeFalsy();
  });

  it("should use the branch url on a vercel preview", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://sandrine-rauter.be");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_BRANCH_URL", "mindfulness-git-feature.vercel.app");
    vi.stubEnv("VERCEL_URL", "mindfulness-abc123.vercel.app");
    expect(getSiteUrl()).toBe("https://mindfulness-git-feature.vercel.app");
    expect(isVercelPreview()).toBeTruthy();
  });

  it("should fall back to the deployment url on a vercel preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_BRANCH_URL", "");
    vi.stubEnv("VERCEL_URL", "mindfulness-abc123.vercel.app");
    expect(getSiteUrl()).toBe("https://mindfulness-abc123.vercel.app");
  });
});
