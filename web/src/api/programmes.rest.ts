// Programmes from the strapi REST api, for the orval generated react-query
// hooks (src/openapi)
import type { GetProgrammesParams } from "@/openapi/model";

/**
 * A single programme by slug. Built in the server component and passed as is
 * to the client one, so both use the same query key.
 */
export const getProgrammeParams = (params: {
  slug: string;
}): GetProgrammesParams => ({
  filters: { slug: { $eq: params.slug } },
  populate: ["cover"],
});
