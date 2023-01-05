import { getStrapiURL } from '../../config/strapi.config';

type StrapiMedia = {
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
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
