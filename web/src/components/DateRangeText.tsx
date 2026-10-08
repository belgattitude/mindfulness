import type { FC } from "react";

import { getDateRangeStr } from "@/lib/date/date.utils";

interface Props {
  startAt: Date | string;
  endAt?: Date | string;
  className?: string;
}

export const DateRangeText: FC<Props> = (props) => {
  const { startAt, endAt, className } = props;
  const dateRange = getDateRangeStr({
    endAt,
    startAt,
  });
  return <p className={className}>{dateRange}</p>;
};
