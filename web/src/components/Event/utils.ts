import { siteConfig } from '@/config/site.config';

const { eventTypes } = siteConfig.search;

export type EventTypeSlugs =
  (typeof siteConfig.search.eventTypes)[number]['slug'];
export const getEventTypeSlugs = (): string[] => {
  return eventTypes.reduce<EventTypeSlugs[]>((acc, currentValue) => {
    acc.push(currentValue.slug);
    return acc;
  }, []);
};

export const findEventBySlug = (slug: EventTypeSlugs | null) => {
  return eventTypes.find((type) => type.slug === slug) ?? null;
};
