// Experiment: events from the strapi REST api with the orval generated
// react-query hooks (src/openapi), instead of graphql (events.api.ts)
import type { EventTypeSlugs } from "@/components/Event/utils";
import type { GetEventsParams } from "@/openapi/model";

/**
 * Same query as searchEvents in events.api.ts. Built in the server component
 * and passed as is to the client one, so both use the same query key.
 */
export const getSearchEventsParams = (params: {
  limit?: number;
  dateMin: string;
  eventType?: EventTypeSlugs | null;
}): GetEventsParams => {
  const { limit = 100, dateMin, eventType } = params;
  return {
    filters: {
      startAt: { $gte: dateMin },
      ...(eventType ? { eventType: { $eq: eventType } } : {}),
    },
    "pagination[page]": 1,
    "pagination[pageSize]": limit,
    populate: ["cover"],
    sort: "startAt:asc,publishedAt:asc",
  };
};
