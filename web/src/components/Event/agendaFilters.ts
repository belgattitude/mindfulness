import { siteConfig } from "@/config/site.config";

import type { EventTypeSlugs } from "./utils";

const { eventTypes, universes } = siteConfig.search;

export type UniverseSlug = (typeof universes)[number]["slug"];

/** The agenda filters, null for all */
export interface AgendaFilters {
  universe: UniverseSlug | null;
  eventType: EventTypeSlugs | null;
}

const isUniverseSlug = (slug: string): slug is UniverseSlug =>
  universes.some((universe) => universe.slug === slug);

const isEventTypeSlug = (slug: string): slug is EventTypeSlugs =>
  eventTypes.some((eventType) => eventType.slug === slug);

/**
 * The agenda url of filters, the universe first:
 * /agenda, /agenda/yoga, /agenda/stages-et-retraites,
 * /agenda/yoga/stages-et-retraites
 */
export const getAgendaUrl = (filters: AgendaFilters): string =>
  ["/agenda", filters.universe, filters.eventType]
    .filter((segment) => segment !== null)
    .join("/");

/**
 * The filters of the agenda url segments, in any order, null when a segment
 * is unknown or repeated. Compare getAgendaUrl() with the url to redirect to
 * the canonical order.
 */
export const parseAgendaSegments = (
  segments: readonly string[]
): AgendaFilters | null => {
  const filters: AgendaFilters = { universe: null, eventType: null };
  for (const segment of segments) {
    if (isUniverseSlug(segment) && filters.universe === null) {
      filters.universe = segment;
    } else if (isEventTypeSlug(segment) && filters.eventType === null) {
      filters.eventType = segment;
    } else {
      return null;
    }
  }
  return filters;
};

/** The strapi "universe" value of a universe slug */
export const getUniverseValue = (slug: UniverseSlug | null) =>
  universes.find((universe) => universe.slug === slug)?.value ?? null;

/** "Yoga · Stages et retraites", empty without filters */
export const getAgendaFiltersTitle = (filters: AgendaFilters): string =>
  [
    universes.find((universe) => universe.slug === filters.universe)?.title,
    eventTypes.find((eventType) => eventType.slug === filters.eventType)?.title,
  ]
    .filter((title) => title !== undefined)
    .join(" · ");
