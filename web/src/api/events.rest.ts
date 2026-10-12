// Events from the strapi REST api, for the orval generated react-query hooks
// (src/openapi)
import { getUniverseValue } from "@/components/Event/agendaFilters";
import type { UniverseSlug } from "@/components/Event/agendaFilters";
import type { EventTypeSlugs } from "@/components/Event/utils";
import type { GetEventsParams } from "@/openapi/model";

/** The agenda filters (null or unset for all) as strapi filters */
const getAgendaStrapiFilters = (params: {
  eventType?: EventTypeSlugs | null;
  universe?: UniverseSlug | null;
}) => {
  const universe = getUniverseValue(params.universe ?? null);
  return {
    ...(params.eventType ? { eventType: { $eq: params.eventType } } : {}),
    ...(universe ? { universe: { $eq: universe } } : {}),
  };
};

/**
 * Events not finished yet (ongoing or upcoming), soonest first. Built in the
 * server component and passed as is to the client one, so both use the same
 * query key.
 */
export const getUpcomingEventsParams = (params: {
  limit?: number;
  now: string;
  eventType?: EventTypeSlugs | null;
  universe?: UniverseSlug | null;
}): GetEventsParams => {
  const { limit = 100, now } = params;
  return {
    filters: {
      endAt: { $gte: now },
      ...getAgendaStrapiFilters(params),
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
  universe?: UniverseSlug | null;
}): GetEventsParams => {
  const { limit = 100, now, dateMin } = params;
  return {
    filters: {
      endAt: { $lt: now },
      startAt: { $gte: dateMin },
      ...getAgendaStrapiFilters(params),
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
