import type { CalendarEvent } from "@/lib/calendar/calendar.utils";
import { getCalendarDays, maxDaysWithWeekdays } from "@/lib/date/date.utils";
import type { EventPeriod } from "@/lib/date/date.utils";
import { getBlocksText, getTextExcerpt } from "@/lib/text/text.utils";
import type { Event } from "@/openapi/model";

import { isOnlineEvent } from "./EventMeta";

/**
 * Up to a week: a long period (a weekly course over months, a two years
 * training) would block the calendar as a single event.
 */
export const canAddToCalendar = (period: EventPeriod) =>
  getCalendarDays(period) <= maxDaysWithWeekdays;

/** The event for the calendars, with a link back to its page */
export const getCalendarEvent = (
  event: Event,
  params: { siteUrl: string | null }
): CalendarEvent => {
  const { siteUrl } = params;
  return {
    uid: `${event.documentId ?? event.slug}@sandrine-rauter`,
    title: event.displayTitle ?? event.title,
    startDate: event.startDate,
    startTime: event.startTime,
    endDate: event.endDate,
    endTime: event.endTime,
    description:
      event.summary || getTextExcerpt(getBlocksText(event.description)),
    location: isOnlineEvent(event) ? "En ligne" : event.location,
    url: siteUrl
      ? `${siteUrl}/event/${encodeURIComponent(event.slug)}`
      : undefined,
  };
};

/** The .ics route of the event (calendar.ics/route.ts) */
export const getEventIcsPath = (slug: string) =>
  `/event/${encodeURIComponent(slug)}/calendar.ics`;
