import { createHttpException } from "@httpx/exception";
import { stringify } from "qs";

import { getStrapiURL } from "@/config/strapi.config";

/**
 * Query string serializer used by the orval generated hooks (src/openapi):
 * strapi expects nested objects in brackets, ie: filters[startAt][$gte]=...
 */
export const strapiParamsSerializer = (params: object | undefined) =>
  stringify(params, { encodeValuesOnly: true });

/**
 * Fetch used by the orval generated hooks (src/openapi): prefixes the strapi
 * REST api url, returns the parsed json body and throws an HttpException on
 * non 2xx responses, so react-query handles them as errors.
 */
export const strapiFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(getStrapiURL(`/api${url}`), options);
  if (!response.ok) {
    throw createHttpException(
      response.status,
      `Strapi ${options.method ?? "GET"} ${url} failed: ${response.status}`
    );
  }
  const body = [204, 205, 304].includes(response.status)
    ? null
    : await response.text();
  return (body ? JSON.parse(body) : null) as T;
};
