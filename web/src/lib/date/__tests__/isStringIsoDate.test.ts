import { isStringIsoDate } from '../isStringIsoDate';

it('should work', () => {
  expect(isStringIsoDate('not-a-date')).toBeFalsy();
  expect(isStringIsoDate('2023-05-08T16:30:00.000')).toBeFalsy();
  expect(isStringIsoDate('2023-05-08T16:30:00.000Z')).toBeTruthy();
});
