import { siteConfig } from '@/config/site.config';

const { eventTypes } = siteConfig.search;

export type EventTypeSlugs =
  (typeof siteConfig.search.eventTypes)[number]['slug'];
export const getEventTypeSlugs = (): string[] => {
  const typeSlugs: string[] = [];
  for (const types of eventTypes) {
    typeSlugs.push(types.slug);
  }
  return typeSlugs;
};

export const findEventBySlug = (slug: EventTypeSlugs | null) => {
  return eventTypes.find((type) => type.slug === slug) ?? null;
};
