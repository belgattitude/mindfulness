import { describe, expect, it } from "vitest";

import { getGoogleCalendarUrl, getIcsContent } from "../calendar.utils";
import type { CalendarEvent } from "../calendar.utils";

const event: CalendarEvent = {
  uid: "abc123@example.com",
  title: "Atelier yoga, relaxation; méditation",
  startDate: "2026-12-20",
  startTime: "15:00:00.000",
  endDate: "2026-12-20",
  endTime: "18:00:00.000",
  description: "Une après-midi de pratique.\nOuvert à toutes et tous.",
  location: "Shanti Home",
  url: "https://example.com/event/atelier",
};

const now = new Date("2026-10-20T10:00:00.000Z");

describe(getIcsContent, () => {
  it("should write the times as entered, in the site zone", () => {
    const lines = getIcsContent(event, { now }).split("\r\n");
    expect(lines).toContain("DTSTART;TZID=Europe/Paris:20261220T150000");
    expect(lines).toContain("DTEND;TZID=Europe/Paris:20261220T180000");
    expect(lines).toContain("TZID:Europe/Paris");
    expect(lines).toContain("DTSTAMP:20261020T100000Z");
  });

  it("should write a date only event as all day, the end exclusive", () => {
    const lines = getIcsContent(
      {
        ...event,
        startDate: "2026-12-30",
        startTime: null,
        endDate: "2026-12-31",
        endTime: null,
      },
      { now }
    ).split("\r\n");
    expect(lines).toContain("DTSTART;VALUE=DATE:20261230");
    expect(lines).toContain("DTEND;VALUE=DATE:20270101");
  });

  it("should escape the text values", () => {
    const lines = getIcsContent(event, { now }).split("\r\n");
    expect(lines).toContain(
      String.raw`SUMMARY:Atelier yoga\, relaxation\; méditation`
    );
    expect(lines).toContain("LOCATION:Shanti Home");
  });

  it("should fold the lines over 75 octets", () => {
    const ics = getIcsContent(
      { ...event, description: "é".repeat(100) },
      { now }
    );
    const encoder = new TextEncoder();
    for (const line of ics.split("\r\n")) {
      expect(encoder.encode(line).length).toBeLessThanOrEqual(75);
    }
    expect(ics.replaceAll("\r\n ", "")).toContain(
      `DESCRIPTION:${"é".repeat(100)}`
    );
  });
});

describe(getGoogleCalendarUrl, () => {
  it("should prefill the google calendar form, in the site zone", () => {
    const url = new URL(getGoogleCalendarUrl(event));
    expect(url.searchParams.get("text")).toBe(event.title);
    expect(url.searchParams.get("dates")).toBe(
      "20261220T150000/20261220T180000"
    );
    expect(url.searchParams.get("ctz")).toBe("Europe/Paris");
    expect(url.searchParams.get("details")).toContain(event.url);
    expect(url.searchParams.get("location")).toBe("Shanti Home");
  });
});
