import { describe, expect, it } from "vitest";
import { z } from "zod";
import { isoTimestampSchema } from "./iso-timestamp.js";

describe("ISO timestamp compatibility", () => {
  it.each([
    "2026-10-10T04:30Z",
    "2026-10-10T04:30:00Z",
    "2026-10-10T04:30:00.123456Z",
    "2024-02-29T23:59Z",
  ])("accepts the existing UTC timestamp %s", (value) => {
    expect(isoTimestampSchema().safeParse(value).success).toBe(true);
  });

  it.each(["2026-10-10T04:30+03:00", "2026-10-10T04:30:00.1-23:59"])(
    "permits offset timestamps only when requested: %s",
    (value) => {
      expect(isoTimestampSchema({ offset: true }).safeParse(value).success).toBe(true);
      expect(isoTimestampSchema().safeParse(value).success).toBe(false);
    },
  );

  it.each([
    "2026-02-29T04:30Z",
    "2026-04-31T04:30Z",
    "2026-10-10T24:00Z",
    "2026-10-10T04:60Z",
    "2026-10-10T04:30:60Z",
    "2026-10-10T04:30.5Z",
    "2026-10-10T04:30",
    "2026-10-10T04:30+24:00",
    "2026-10-10T04:30+03:60",
    "2026-10-10T04:30+0300",
  ])("rejects invalid timestamps %s", (value) => {
    expect(isoTimestampSchema({ offset: true }).safeParse(value).success).toBe(false);
  });

  it("emits the same timestamp constraint for JSON schema consumers", () => {
    const schema = z.toJSONSchema(isoTimestampSchema({ offset: true }));
    expect(schema.format).toBe("date-time");
    expect(new RegExp(schema.pattern!).test("2026-10-10T04:30Z")).toBe(true);
    expect(new RegExp(schema.pattern!).test("2026-02-29T04:30Z")).toBe(false);
  });
});
