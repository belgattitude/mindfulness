import { isUrlRelativePath } from '@/lib/typeguards';
import { getStrapiURL } from '@/config/strapi.config';
import { isPlainObject } from '@httpx/assert';

export type StrapiMedia = {
  url?: string | null;
  caption?: string | null;
  alternativeText?: string | null;
};

export function getStrapiMedia(
  media: StrapiMedia | null | undefined
): string | null {
  const url = media?.url ?? null;
  if (!url) {
    return null;
  }
  if (isUrlRelativePath(url)) {
    return getStrapiURL(url);
  }
  return url;
}

export const isStrapiMedia = (v: unknown): v is StrapiMedia => {
  return isPlainObject<StrapiMedia>(v) && typeof v?.url === 'string';
};
