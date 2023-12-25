// Based on https://stackoverflow.com/questions/3143070/regex-to-match-an-iso-8601-datetime-string
const isoDateRegExp =
  /^\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\d|3[01])|(0[469]|11)-(0[1-9]|[12]\d|30)|(02)-(0[1-9]|[12]\d))T(0\d|1\d|2[0-3]):(0\d|[1-5]\d):(0\d|[1-5]\d)\.\d{3}Z$/;

export const isStringIsoDate = (dateStr: unknown) => {
  if (typeof dateStr !== 'string') {
    return false;
  }
  return (
    isoDateRegExp.test(dateStr) && new Date(dateStr).toISOString() === dateStr
  );
};
