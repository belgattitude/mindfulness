import {
  assertParsableStrictIsoDateZ,
  type ParsableStrictIsoDateZ,
} from '@httpx/assert';

export const convertIsoStringToDate = (
  dateStr: string | ParsableStrictIsoDateZ | Date
): Date => {
  if (dateStr instanceof Date) {
    return dateStr;
  }
  assertParsableStrictIsoDateZ(dateStr, () => {
    return new TypeError(`Invalid date string: ${dateStr}`);
  });
  return new Date(dateStr);
};

export const getDateRangeStr = (params: {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  startAt: string | Date;
  endAt?: string | Date;
  locale?: string;
  timeZone?: string;
}): string => {
  const { startAt, endAt, locale = 'fr', timeZone = 'Europe/Paris' } = params;
  const dateFrom = convertIsoStringToDate(startAt);
  const dateEnd = endAt ? convertIsoStringToDate(endAt) : undefined;

  return dateEnd === undefined
    ? `le ${formatDate(dateFrom)}`
    : `du ${formatDate(dateFrom, {
        year:
          dateEnd.getFullYear() === dateFrom.getFullYear()
            ? undefined
            : 'numeric',
        month:
          dateEnd.getMonth() === dateFrom.getMonth() ? undefined : 'numeric',
      })} au ${formatDate(dateEnd)}`;
};

const defaultOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: undefined,
  minute: undefined,
  timeZone: 'Europe/paris',
} as const;

const formatDate = (
  date: Date,
  options?: Parameters<typeof Intl.DateTimeFormat>[1]
) => {
  return new Intl.DateTimeFormat('fr', {
    ...defaultOptions,
    ...options,
  }).format(date);
};
