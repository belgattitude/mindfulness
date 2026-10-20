import type { FC } from "react";

import { getDateRangeStr } from "@/lib/date/date.utils";
import type { EventPeriod } from "@/lib/date/date.utils";

interface Props {
  period: EventPeriod;
  className?: string;
}

export const DateRangeText: FC<Props> = (props) => {
  const { period, className } = props;
  return <p className={className}>{getDateRangeStr(period)}</p>;
};
