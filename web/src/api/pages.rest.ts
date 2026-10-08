// Pages from the strapi REST api, for the orval generated react-query hooks
// (src/openapi)
import type { GetPagesParams } from "@/openapi/model";

/**
 * A single page by slug, with its programmes and their events. Built in the
 * server component and passed as is to the client one, so both use the same
 * query key.
 */
export const getPageParams = (params: { slug: string }): GetPagesParams => ({
  filters: { slug: { $eq: params.slug } },
  populate: ["cover", "programmes.cover", "programmes.events"],
});
