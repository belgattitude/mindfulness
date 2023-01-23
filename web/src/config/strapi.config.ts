import type { UrlRelativePath } from '@/lib/typeguards';
import { isUrlRelativePath } from '@/lib/typeguards';

export const getStrapiURL = (path: UrlRelativePath | '' = ''): string => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';
  if (!isUrlRelativePath(strapiUrl) && strapiUrl === '') {
    throw new Error(
      `Missing or invalid NEXT_PUBLIC_STRAPI_URL (${
        typeof strapiUrl === 'string' ? strapiUrl : 'unknown'
      })`
    );
  }
  return `${strapiUrl}${path}`;
};
