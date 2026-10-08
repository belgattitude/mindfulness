import { isPlainObject } from "@httpx/assert";

import { getStrapiURL } from "@/config/strapi.config";
import { isUrlRelativePath } from "@/lib/typeguards";

// A type alias (not an interface): isPlainObject<T> requires T to be assignable
// to an index signature, which only type aliases are implicitly
// oxlint-disable-next-line typescript/consistent-type-definitions
export type StrapiMedia = {
  url?: string | null;
  caption?: string | null;
  alternativeText?: string | null;
};

export const getStrapiMedia = (
  media: StrapiMedia | null | undefined
): string | null => {
  const url = media?.url ?? null;
  if (!url) {
    return null;
  }
  if (isUrlRelativePath(url)) {
    return getStrapiURL(url);
  }
  return url;
};

export const isStrapiMedia = (v: unknown): v is StrapiMedia =>
  isPlainObject<StrapiMedia>(v) && typeof v?.url === "string";
