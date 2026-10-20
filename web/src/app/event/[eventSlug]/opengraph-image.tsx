import { getEventParams } from "@/api/events.rest";
import { findEventBySlug } from "@/components/Event/utils";
import type { EventTypeSlugs } from "@/components/Event/utils";
import { getDateRangeStr } from "@/lib/date/date.utils";
import {
  getStrapiOgImage,
  renderDefaultOgImage,
  renderOgImage,
} from "@/lib/og/og-image";
import { getEvents } from "@/openapi/event/event";

export const alt = "Un événement de l’agenda de Sandrine Rauter";
// The size Facebook, LinkedIn and X expect (1.91:1)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ eventSlug: string }>;
}

/** The event link preview: its type, title, dates, place and cover */
const Image = async (props: Props) => {
  const { eventSlug } = await props.params;
  const response = await getEvents(getEventParams({ slug: eventSlug }));
  const event = response.data?.[0];
  if (!event) {
    return renderDefaultOgImage();
  }
  const dates = getDateRangeStr(event);
  // Some events have "online" as location instead of the online flag
  const place =
    event.online || event.location?.trim().toLowerCase() === "online"
      ? "En\u00A0ligne"
      : event.location;
  return renderOgImage({
    eyebrow:
      findEventBySlug(event.eventType as EventTypeSlugs)?.title ?? "Agenda",
    title: event.displayTitle ?? event.title,
    subtitle: [`${dates.charAt(0).toUpperCase()}${dates.slice(1)}`, place]
      .filter(Boolean)
      .join(" · "),
    image: await getStrapiOgImage(event.cover),
  });
};

export default Image;
