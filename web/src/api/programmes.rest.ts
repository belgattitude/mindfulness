// Programmes from the strapi REST api, for the orval generated react-query
// hooks (src/openapi)
import type { GetProgrammesParams } from "@/openapi/model";

/**
 * A single programme by slug, with its events. Built in the server component
 * and passed as is to the client one, so both use the same query key.
 */
export const getProgrammeParams = (params: {
  slug: string;
}): GetProgrammesParams => ({
  filters: { slug: { $eq: params.slug } },
  // Events with their cover: shown as in the agenda
  populate: ["cover", "events.cover"],
});
