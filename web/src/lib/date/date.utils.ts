import { isStringIsoDate } from '@/lib/date/isStringIsoDate';

export const convertIsoStringToDate = (dateStr: string | Date): Date => {
  if (dateStr instanceof Date) {
    return dateStr;
  }
  if (!isStringIsoDate(dateStr)) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
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

  if (dateEnd === undefined) {
    return `le ${formatDate(dateFrom)}`;
  } else {
    return `du ${formatDate(dateFrom, {
      year:
        dateEnd.getFullYear() !== dateFrom.getFullYear()
          ? 'numeric'
          : undefined,
      month: dateEnd.getMonth() !== dateFrom.getMonth() ? 'numeric' : undefined,
    })} au ${formatDate(dateEnd)}`;
  }
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
