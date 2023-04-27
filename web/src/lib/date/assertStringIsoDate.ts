import { isStringIsoDate } from '@/lib/date/isStringIsoDate';

type StringUTCDate = string;
export function assertStringIsoDate(
  dateStr: unknown,
  errMsg?: string
): asserts dateStr is StringUTCDate {
  if (!isStringIsoDate(dateStr)) {
    throw new Error(
      errMsg ??
        `Date string is not in UTC (receiver ${
          typeof dateStr === 'string' ? dateStr : 'not a string'
        })`
    );
  }
}
