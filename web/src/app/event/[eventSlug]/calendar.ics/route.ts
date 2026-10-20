import { getEventParams } from "@/api/events.rest";
import {
  canAddToCalendar,
  getCalendarEvent,
} from "@/components/Event/eventCalendar";
import { getSiteUrl } from "@/config/site-url";
import { getIcsContent } from "@/lib/calendar/calendar.utils";
import { getEvents } from "@/openapi/event/event";

export const dynamic = "force-dynamic";

/** The event as an .ics file, opened by the calendar app of the device */
export const GET = async (
  request: Request,
  ctx: RouteContext<"/event/[eventSlug]/calendar.ics">
) => {
  const { eventSlug } = await ctx.params;
  const response = await getEvents(getEventParams({ slug: eventSlug }));
  const event = response.data?.[0];
  if (!event || !canAddToCalendar(event)) {
    return new Response("Événement introuvable", { status: 404 });
  }
  const siteUrl = getSiteUrl() ?? new URL(request.url).origin;
  const ics = getIcsContent(getCalendarEvent(event, { siteUrl }), {
    now: new Date(),
  });
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(event.slug)}.ics"`,
    },
  });
};
