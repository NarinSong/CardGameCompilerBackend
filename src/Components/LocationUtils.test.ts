// src/schemas/location.test.ts

import { describe, it, expect } from "vitest";
import { coerceLocation } from "./LocationUtils";

describe("coerceLocation", () => {
  it("returns existing location when provided", () => {
    const location = {
      locationType: "absolute",
      location: "CARD_SLOT_1",
    } as any;

    const result = coerceLocation(location, "PILE");

    expect(result).toBe(location);
  });

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
