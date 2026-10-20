import { describe, expect, it } from "vitest";

import {
  getAgendaFiltersTitle,
  getAgendaUrl,
  getUniverseValue,
  parseAgendaSegments,
} from "../agendaFilters";

describe(parseAgendaSegments, () => {
  it("should parse the universe and the type, in any order", () => {
    expect(parseAgendaSegments([])).toStrictEqual({
      universe: null,
      eventType: null,
    });
    expect(parseAgendaSegments(["yoga"])).toStrictEqual({
      universe: "yoga",
      eventType: null,
    });
    expect(
      parseAgendaSegments(["stages-et-retraites", "dialogue-conscient"])
    ).toStrictEqual({
      universe: "dialogue-conscient",
      eventType: "stages-et-retraites",
    });
    expect(parseAgendaSegments(["atelier-ponctuel", "yoga"])).toStrictEqual({
      universe: "yoga",
      eventType: "atelier-ponctuel",
    });
  });

  it("should reject unknown or repeated segments", () => {
    expect(parseAgendaSegments(["unknown"])).toBeNull();
    expect(parseAgendaSegments(["yoga", "meditation"])).toBeNull();
    expect(parseAgendaSegments(["yoga", "cours-reguliers", "x"])).toBeNull();
  });
});

describe(getAgendaUrl, () => {
  it("should put the universe first", () => {
    expect(getAgendaUrl({ universe: null, eventType: null })).toBe("/agenda");
    expect(
      getAgendaUrl({ universe: "yoga", eventType: "stages-et-retraites" })
    ).toBe("/agenda/yoga/stages-et-retraites");
    expect(getAgendaUrl({ universe: null, eventType: "cours-reguliers" })).toBe(
      "/agenda/cours-reguliers"
    );
  });
});

describe(getUniverseValue, () => {
  it("should map the url slug to the strapi value", () => {
    expect(getUniverseValue("dialogue-conscient")).toBe("dialogue");
    expect(getUniverseValue(null)).toBeNull();
  });
});

describe(getAgendaFiltersTitle, () => {
  it("should join the filter titles", () => {
    expect(
      getAgendaFiltersTitle({ universe: "yoga", eventType: "cours-reguliers" })
    ).toBe("Yoga · Cours réguliers");
    expect(
      getAgendaFiltersTitle({ universe: null, eventType: "atelier-ponctuel" })
    ).toBe("Ateliers");
    expect(getAgendaFiltersTitle({ universe: null, eventType: null })).toBe("");
  });
});
