// Events from the strapi REST api, for the orval generated react-query hooks
// (src/openapi)
import type { EventTypeSlugs } from "@/components/Event/utils";
import type { GetEventsParams } from "@/openapi/model";

const getEventTypeFilter = (eventType?: EventTypeSlugs | null) =>
  eventType ? { eventType: { $eq: eventType } } : {};

/**
 * Events not finished yet (ongoing or upcoming), soonest first. Built in the
 * server component and passed as is to the client one, so both use the same
 * query key.
 */
export const getUpcomingEventsParams = (params: {
  limit?: number;
  now: string;
  eventType?: EventTypeSlugs | null;
}): GetEventsParams => {
  const { limit = 100, now, eventType } = params;
  return {
    filters: {
      endAt: { $gte: now },
      ...getEventTypeFilter(eventType),
    },
    "pagination[page]": 1,
    "pagination[pageSize]": limit,
    populate: ["cover"],
    sort: "startAt:asc,publishedAt:asc",
  };
};

/**
 * Finished events that started after dateMin, most recent first. Built in the
 * server component and passed as is to the client one, so both use the same
 * query key.
 */
export const getPastEventsParams = (params: {
  limit?: number;
  now: string;
  dateMin: string;
  eventType?: EventTypeSlugs | null;
}): GetEventsParams => {
  const { limit = 100, now, dateMin, eventType } = params;
  return {
    filters: {
      endAt: { $lt: now },
      startAt: { $gte: dateMin },
      ...getEventTypeFilter(eventType),
    },
    "pagination[page]": 1,
    "pagination[pageSize]": limit,
    populate: ["cover"],
    sort: "startAt:desc,publishedAt:desc",
  };
};

/** A single event by slug, with the programmes it belongs to */
export const getEventParams = (params: { slug: string }): GetEventsParams => ({
  filters: { slug: { $eq: params.slug } },
  populate: ["cover", "programmes"],
});
