import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Logger from "./Logger.js";

describe("Logger.log", () => {
  const originalLevel = Logger.LOG_LEVEL;

  afterEach(() => {
    // LOG_LEVEL is shared static state, so tests that change it need to put
    // it back or they'll bleed into whichever test runs next.
    Logger.LOG_LEVEL = originalLevel;
  });

  it("logs when LOG_LEVEL is high enough", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    Logger.LOG_LEVEL = 3;

    Logger.log("hello");

    expect(spy).toHaveBeenCalledWith("hello");
    spy.mockRestore();
  });

  it("stays quiet when LOG_LEVEL is below the threshold", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    Logger.LOG_LEVEL = 2;

    Logger.log("hello");

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("Logger.debug", () => {
  const originalLevel = Logger.LOG_LEVEL;

  afterEach(() => {
    Logger.LOG_LEVEL = originalLevel;
  });

  // debug needs a higher LOG_LEVEL (5) than log does (3) - this is the
  // whole point of having two separate methods instead of one.
  it("requires a higher LOG_LEVEL than log() does", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    Logger.LOG_LEVEL = 3;

    Logger.debug("verbose stuff");

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("logs when LOG_LEVEL is high enough for debug", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    Logger.LOG_LEVEL = 5;

    Logger.debug("verbose stuff");

    expect(spy).toHaveBeenCalledWith("verbose stuff");
    spy.mockRestore();
  });
});
