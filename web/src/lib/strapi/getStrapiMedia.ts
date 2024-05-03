import { isUrlRelativePath } from '@/lib/typeguards';
import { getStrapiURL } from '@/config/strapi.config';
import { isPlainObject } from '@httpx/assert';

export type StrapiMedia = {
  data?: {
    attributes?: {
      url?: string | null;
      caption?: string | null;
      alternativeText?: string | null;
    } | null;
  } | null;
};

export function getStrapiMedia(media: StrapiMedia): string | null {
  const { url = null } = media.data?.attributes ?? {};
  if (!url) {
    return null;
  }
  if (isUrlRelativePath(url)) {
    return getStrapiURL(url);
  }
  return url;
}

export const isStrapiMedia = (v: unknown): v is StrapiMedia => {
  if (isPlainObject<StrapiMedia>(v)) {
  }
  return (
    isPlainObject<StrapiMedia>(v) &&
    typeof v?.data?.attributes?.url === 'string'
  );
};
