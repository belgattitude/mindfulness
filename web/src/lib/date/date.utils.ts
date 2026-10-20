import { assertParsableStrictIsoDateZ } from "@httpx/assert";
import type { ParsableStrictIsoDateZ } from "@httpx/assert";

export const convertIsoStringToDate = (
  dateStr: string | ParsableStrictIsoDateZ | Date
): Date => {
  if (dateStr instanceof Date) {
    return dateStr;
  }
  assertParsableStrictIsoDateZ(
    dateStr,
    () => new TypeError(`Invalid date string: ${dateStr}`)
  );
  return new Date(dateStr);
};

/**
 * The dates and times of an event as entered in strapi ("2026-12-20",
 * "15:00:00.000"): a wall clock without time zone, shown as is to every
 * visitor and editor. A missing start time means a date only.
 */
export interface EventPeriod {
  startDate: string;
  startTime?: string | null | undefined;
  endDate: string;
  endTime?: string | null | undefined;
}

/**
 * The events take place in Belgium and France: "now" is read in this zone to
 * know whether an event is over, whatever the zone of the server or visitor.
 */
export const siteTimeZone = "Europe/Paris";

/** The wall clock of the site, ie: { date: "2026-10-20", time: "22:05" } */
export const getSiteNow = (
  now: string | Date
): { date: string; time: string } => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      day: "2-digit",
      hour: "2-digit",
      hourCycle: "h23",
      minute: "2-digit",
      month: "2-digit",
      timeZone: siteTimeZone,
      year: "numeric",
    })
      .formatToParts(convertIsoStringToDate(now))
      .map((part) => [part.type, part.value])
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
};

/** A calendar date as a Date at utc midnight, formatted in utc */
const toUtcDate = (date: string) => new Date(`${date.slice(0, 10)}T00:00:00Z`);

const defaultOptions = {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  weekday: "long",
  year: "numeric",
} as const;

/** French writes the first day of the month "1er" */
const formatDate = (
  date: string,
  locale: string,
  options?: Parameters<typeof Intl.DateTimeFormat>[1]
) =>
  new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  })
    .formatToParts(toUtcDate(date))
    .map((part) =>
      part.type === "day" && part.value === "1" && locale.startsWith("fr")
        ? "1er"
        : part.value
    )
    .join("");

/** "15 h", "19 h 15" (french typography), null without time */
export const formatTime = (time: string | null | undefined): string | null => {
  if (!time) {
    return null;
  }
  const [hour = "0", minute = "00"] = time.split(":");
  return minute === "00" ? `${Number(hour)} h` : `${Number(hour)} h ${minute}`;
};

/** ", de 15 h à 18 h" or ", à 15 h", empty without time */
const getTimeRangeStr = (period: EventPeriod): string => {
  const from = formatTime(period.startTime);
  if (from === null) {
    return "";
  }
  const end = formatTime(period.endTime);
  return end === null || end === from ? `, à ${from}` : `, de ${from} à ${end}`;
};

const dayMs = 24 * 60 * 60 * 1000;

/** Calendar days from the start day to the end day, 0 for a single day */
export const getCalendarDays = (period: EventPeriod): number =>
  (toUtcDate(period.endDate).getTime() -
    toUtcDate(period.startDate).getTime()) /
  dayMs;

/** Above, the weekdays are noise: the range reads as a period */
export const maxDaysWithWeekdays = 7;

/**
 * "le samedi 24 octobre 2026, de 15 h à 18 h",
 * "du vendredi 23 au dimanche 25 octobre 2026"
 * or, over a week, "du 21 septembre 2026 au 30 juin 2028". The start omits
 * the month and the year it shares with the end.
 */
export const getDateRangeStr = (period: EventPeriod, locale = "fr"): string => {
  const { startDate, endDate } = period;
  const days = getCalendarDays(period);
  if (days <= 0) {
    return `le ${formatDate(startDate, locale)}${getTimeRangeStr(period)}`;
  }

  const weekday = days > maxDaysWithWeekdays ? undefined : "long";
  // "2026-10-20": the year then the month
  const sameYear = startDate.slice(0, 4) === endDate.slice(0, 4);
  const sameMonth = startDate.slice(0, 7) === endDate.slice(0, 7);
  const from = formatDate(startDate, locale, {
    month: sameMonth ? undefined : "long",
    weekday,
    year: sameYear ? undefined : "numeric",
  });
  const end = formatDate(endDate, locale, { weekday });
  return `du ${from} au ${end}`;
};

/** Day number and short month of a date, ie: { day: "6", month: "janv." } */
export const getDayMonthParts = (
  date: string,
  locale = "fr"
): { day: string; month: string } => ({
  day: new Intl.DateTimeFormat(locale, {
    day: "numeric",
    timeZone: "UTC",
  }).format(toUtcDate(date)),
  month: new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  }).format(toUtcDate(date)),
});

export type DateBadgeParts =
  /** A single day: "20" "déc." */
  | { kind: "day"; day: string; month: string }
  /** Days of a month or two: "6–13" "sept.", "30–1er" "oct.–nov." */
  | { kind: "days"; days: string; months: string }
  /** Over a week across months: "sept. 2026" to "juin 2028" */
  | { kind: "period"; from: string; end: string };

/** French writes the first day of the month "1er" */
const withFirst = (day: string) => (day === "1" ? "1er" : day);

/** The date badge of an event: a day, a few days or a period */
export const getDateBadgeParts = (
  period: EventPeriod,
  locale = "fr"
): DateBadgeParts => {
  const { startDate, endDate } = period;
  const from = getDayMonthParts(startDate, locale);
  const days = getCalendarDays(period);
  if (days <= 0) {
    return { kind: "day", ...from };
  }
  const end = getDayMonthParts(endDate, locale);
  const sameMonth = startDate.slice(0, 7) === endDate.slice(0, 7);
  if (sameMonth || days <= maxDaysWithWeekdays) {
    return {
      kind: "days",
      days: `${withFirst(from.day)}–${withFirst(end.day)}`,
      months: sameMonth ? from.month : `${from.month}–${end.month}`,
    };
  }
  const startYear = startDate.slice(0, 4);
  const endYear = endDate.slice(0, 4);
  const sameYear = startYear === endYear;
  return {
    kind: "period",
    from: sameYear ? from.month : `${from.month} ${startYear}`,
    end: sameYear ? end.month : `${end.month} ${endYear}`,
  };
};

/** Sort key of the start, ie: "2026-12-20T15:00", a date only first */
export const getStartKey = (period: EventPeriod): string =>
  `${period.startDate}T${period.startTime?.slice(0, 5) ?? "00:00"}`;
