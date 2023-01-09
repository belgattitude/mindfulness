export const convertUTCStringToDate = (dateStr: string | Date): Date => {
  if (dateStr instanceof Date) {
    return dateStr;
  }
  if (
    // 2023-05-08T16:30:00.000Z
    !/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|-)(?:\d{2}):?(?:\d{2}))$/.test(
      dateStr
    )
  ) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  const d = new Date(dateStr);
  if (d.toUTCString() === dateStr) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d;
};

export const getDateRangeStr = (params: {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  startAt: string | Date;
  endAt?: string | Date;
  locale?: string;
  timeZone?: string;
}): string => {
  const { startAt, endAt, locale = 'fr', timeZone = 'Europe/Paris' } = params;
  const dateFrom = convertUTCStringToDate(startAt);
  const dateEnd = endAt ? convertUTCStringToDate(endAt) : undefined;

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
