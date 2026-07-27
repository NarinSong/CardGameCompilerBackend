import { describe, it, expect } from "vitest";
import { coerceLocation } from "./LocationUtils.js";

describe("coerceLocation", () => {
  // coerceLocation doesn't care what's inside an already-set location, it
  // just needs to know one was given - so this only has to be a valid
  // LocationResolver, not necessarily an 'exact' one.
  it("returns existing location when provided", () => {
    const location = {
      locationType: "relative",
      location: "CARD_SLOT_1",
    } as const;

    const result = coerceLocation(location, "PILE");

    expect(result).toBe(location);
  });

  // No location given at all -> falls back to a relative DEFAULT_<TYPE>
  // location, one variant per object type (pile/counter/button).
  it("creates default PILE location when location is undefined", () => {
    const result = coerceLocation(undefined, "PILE");

    expect(result).toEqual({
      locationType: "relative",

      location: "DEFAULT_PILE",
    });
  });

  it("creates default COUNTER location when location is undefined", () => {
    const result = coerceLocation(undefined, "COUNTER");

    expect(result).toEqual({
      locationType: "relative",

      location: "DEFAULT_COUNTER",
    });
  });

  it("creates default BUTTON location when location is undefined", () => {
    const result = coerceLocation(undefined, "BUTTON");

    expect(result).toEqual({
      locationType: "relative",

      location: "DEFAULT_BUTTON",
    });
  });
});
