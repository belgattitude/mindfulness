import { siteTimeZone } from "@/lib/date/date.utils";
import type { EventPeriod } from "@/lib/date/date.utils";

export interface CalendarEvent extends EventPeriod {
  /** Stable across updates: calendars replace the event instead of adding it */
  uid: string;
  title: string;
  description?: string | undefined;
  location?: string | undefined;
  url?: string | undefined;
}

/** "2026-12-20" to "20261220" */
const toBasicDate = (date: string) => date.slice(0, 10).replaceAll("-", "");

/** "15:00:00.000" to "150000" */
const toBasicTime = (time: string) => `${time.slice(0, 5).replace(":", "")}00`;

/** The next calendar day: all-day events end the day after (exclusive) */
const getNextDay = (date: string) => {
  const next = new Date(`${date.slice(0, 10)}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
};

/**
 * Start and end in basic format: a wall clock time of the site zone, or
 * dates only when there is no start time. Without end time, the event ends
 * at its start time on its end day.
 */
const getBasicRange = (event: CalendarEvent) =>
  event.startTime
    ? {
        allDay: false,
        start: `${toBasicDate(event.startDate)}T${toBasicTime(event.startTime)}`,
        end: `${toBasicDate(event.endDate)}T${toBasicTime(event.endTime ?? event.startTime)}`,
      }
    : {
        allDay: true,
        start: toBasicDate(event.startDate),
        end: toBasicDate(getNextDay(event.endDate)),
      };

/** "now" in utc, the DTSTAMP of the file */
const toUtcStamp = (date: Date) =>
  date
    .toISOString()
    .replaceAll(/[-:]/gu, "")
    .replace(/\.\d{3}/u, "");

/** Text values escape backslashes, separators and line breaks (RFC 5545) */
const escapeIcsText = (text: string) =>
  text
    .replaceAll("\\", String.raw`\\`)
    .replaceAll(";", String.raw`\;`)
    .replaceAll(",", String.raw`\,`)
    .replaceAll(/\r?\n/gu, String.raw`\n`);

/** Lines longer than 75 octets continue on the next one, after a space */
const foldIcsLine = (line: string): string => {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  let current = "";
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // The continuation lines start with a space, one octet less
    if (octets + size > (lines.length === 0 ? 75 : 74)) {
      lines.push(current);
      current = "";
      octets = 0;
    }
    current += char;
    octets += size;
  }
  lines.push(current);
  return lines.join("\r\n ");
};

/** The rules of the site zone, for the calendars that need them (Outlook) */
const siteTimeZoneLines = [
  "BEGIN:VTIMEZONE",
  `TZID:${siteTimeZone}`,
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

/** An .ics file of the event, read by Apple Calendar, Outlook, Google… */
export const getIcsContent = (
  event: CalendarEvent,
  params: { now: Date }
): string => {
  const { allDay, start, end } = getBasicRange(event);
  const dateParam = allDay ? ";VALUE=DATE" : `;TZID=${siteTimeZone}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sandrine Rauter//Agenda//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...(allDay ? [] : siteTimeZoneLines),
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${toUtcStamp(params.now)}`,
    `DTSTART${dateParam}:${start}`,
    `DTEND${dateParam}:${end}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    ...(event.description
      ? [`DESCRIPTION:${escapeIcsText(event.description)}`]
      : []),
    ...(event.location ? [`LOCATION:${escapeIcsText(event.location)}`] : []),
    ...(event.url ? [`URL:${event.url}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
};

/** The google calendar form, prefilled with the event */
export const getGoogleCalendarUrl = (event: CalendarEvent): string => {
  const { allDay, start, end } = getBasicRange(event);
  const details = [event.description, event.url]
    .filter((text) => text !== undefined && text !== "")
    .join("\n\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    // The times are wall clock times of the site zone
    ...(allDay ? {} : { ctz: siteTimeZone }),
    ...(details === "" ? {} : { details }),
    ...(event.location ? { location: event.location } : {}),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
