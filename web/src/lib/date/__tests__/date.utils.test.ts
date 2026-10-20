import { describe, expect, it } from "vitest";

import { getDateBadgeParts, getDateRangeStr, getSiteNow } from "../date.utils";

describe(getDateRangeStr, () => {
  it("should show a single day once, with its times as entered", () => {
    expect(
      getDateRangeStr({ startDate: "2026-10-24", endDate: "2026-10-24" })
    ).toBe("le samedi 24 octobre 2026");
    expect(
      getDateRangeStr({
        startDate: "2026-12-20",
        startTime: "15:00:00.000",
        endDate: "2026-12-20",
        endTime: "18:00:00.000",
      })
    ).toBe("le dimanche 20 décembre 2026, de 15 h à 18 h");
  });

  it("should show the minutes, or the start time alone", () => {
    expect(
      getDateRangeStr({
        startDate: "2026-01-19",
        startTime: "19:00:00.000",
        endDate: "2026-01-19",
        endTime: "21:15:00.000",
      })
    ).toBe("le lundi 19 janvier 2026, de 19 h à 21 h 15");
    expect(
      getDateRangeStr({
        startDate: "2026-11-01",
        startTime: "10:00:00.000",
        endDate: "2026-11-01",
      })
    ).toBe("le dimanche 1er novembre 2026, à 10 h");
  });

  it("should keep the weekdays up to a week", () => {
    expect(
      getDateRangeStr({ startDate: "2026-10-23", endDate: "2026-10-25" })
    ).toBe("du vendredi 23 au dimanche 25 octobre 2026");
    expect(
      getDateRangeStr({ startDate: "2026-10-30", endDate: "2026-11-01" })
    ).toBe("du vendredi 30 octobre au dimanche 1er novembre 2026");
    expect(
      getDateRangeStr({ startDate: "2026-12-30", endDate: "2027-01-06" })
    ).toBe("du mercredi 30 décembre 2026 au mercredi 6 janvier 2027");
  });

  it("should show the start and end dates over a week", () => {
    expect(
      getDateRangeStr({ startDate: "2026-10-05", endDate: "2026-10-30" })
    ).toBe("du 5 au 30 octobre 2026");
    expect(
      getDateRangeStr({ startDate: "2026-09-21", endDate: "2028-06-30" })
    ).toBe("du 21 septembre 2026 au 30 juin 2028");
  });
});

describe(getDateBadgeParts, () => {
  it("should show a single day", () => {
    expect(
      getDateBadgeParts({ startDate: "2026-12-20", endDate: "2026-12-20" })
    ).toStrictEqual({ kind: "day", day: "20", month: "déc." });
  });

  it("should show the days of a short stay", () => {
    expect(
      getDateBadgeParts({ startDate: "2026-09-06", endDate: "2026-09-13" })
    ).toStrictEqual({ kind: "days", days: "6–13", months: "sept." });
    expect(
      getDateBadgeParts({ startDate: "2026-10-30", endDate: "2026-11-01" })
    ).toStrictEqual({ kind: "days", days: "30–1er", months: "oct.–nov." });
  });

  it("should show the months of a period", () => {
    expect(
      getDateBadgeParts({ startDate: "2026-01-06", endDate: "2026-06-30" })
    ).toStrictEqual({ kind: "period", from: "janv.", end: "juin" });
    expect(
      getDateBadgeParts({ startDate: "2026-09-21", endDate: "2028-06-30" })
    ).toStrictEqual({ kind: "period", from: "sept. 2026", end: "juin 2028" });
  });
});

describe(getSiteNow, () => {
  it("should read now in the site time zone", () => {
    // 23:30 utc is already the next day in Paris (summer time)
    expect(getSiteNow("2026-07-04T23:30:00.000Z")).toStrictEqual({
      date: "2026-07-05",
      time: "01:30",
    });
  });
});
