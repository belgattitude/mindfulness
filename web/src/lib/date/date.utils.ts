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

const defaultOptions = {
  day: "numeric",
  hour: undefined,
  minute: undefined,
  month: "long",
  weekday: "long",
  year: "numeric",
} as const;

const formatDate = (
  date: Date,
  locale: string,
  options?: Parameters<typeof Intl.DateTimeFormat>[1]
) =>
  new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(date);

export const getDateRangeStr = (params: {
  startAt: string | Date;
  endAt?: string | Date;
  locale?: string;
  timeZone?: string;
}): string => {
  const { startAt, endAt, locale = "fr", timeZone = "Europe/Paris" } = params;
  const dateFrom = convertIsoStringToDate(startAt);
  const dateEnd = endAt ? convertIsoStringToDate(endAt) : undefined;

  return dateEnd === undefined
    ? `le ${formatDate(dateFrom, locale, { timeZone })}`
    : `du ${formatDate(dateFrom, locale, {
        timeZone,
        month:
          dateEnd.getMonth() === dateFrom.getMonth() ? undefined : "numeric",
        year:
          dateEnd.getFullYear() === dateFrom.getFullYear()
            ? undefined
            : "numeric",
      })} au ${formatDate(dateEnd, locale, { timeZone })}`;
};
