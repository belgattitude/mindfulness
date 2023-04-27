import { assertStringIsoDate } from '@/lib/date/assertStringIsoDate';

it('should work', () => {
  expect(() => assertStringIsoDate('not-a-date')).toThrow();
  expect(() => assertStringIsoDate('2023-05-08T16:30:00.000Z')).not.toThrow();
});
