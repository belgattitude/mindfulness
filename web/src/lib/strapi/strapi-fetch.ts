import { getStrapiURL } from "@/config/strapi.config";

/**
 * Fetch used by the orval generated hooks (src/openapi): prefixes the strapi
 * REST api url and returns the response shape orval expects.
 */
export const strapiFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(getStrapiURL(`/api${url}`), options);
  const body = [204, 205, 304].includes(response.status)
    ? null
    : await response.text();
  const data: unknown = body ? JSON.parse(body) : {};
  return { data, headers: response.headers, status: response.status } as T;
};
