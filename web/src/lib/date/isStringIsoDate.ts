// Based on https://stackoverflow.com/questions/3143070/regex-to-match-an-iso-8601-datetime-string
const isoDateRegExp =
  /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/;

export const isStringIsoDate = (dateStr: unknown) => {
  if (typeof dateStr !== 'string') {
    return false;
  }
  return (
    isoDateRegExp.test(dateStr) && new Date(dateStr).toISOString() === dateStr
  );
};
