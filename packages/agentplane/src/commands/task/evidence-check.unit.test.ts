import { describe, expect, it } from "vitest";

import { summarizeEvidenceRows } from "./evidence-check.command.js";

describe("task evidence check summary", () => {
  it("treats unchecked evidence kinds as blocking", () => {
    expect(
      summarizeEvidenceRows([{ state: "present" }, { state: "unknown" }, { state: "missing" }]),
    ).toEqual({
      ok: false,
      missing_count: 1,
      unknown_count: 1,
      blocking_count: 2,
    });
  });

  it("passes only when every required evidence row is present", () => {
    expect(summarizeEvidenceRows([{ state: "present" }, { state: "present" }])).toEqual({
      ok: true,
      missing_count: 0,
      unknown_count: 0,
      blocking_count: 0,
    });
  });
});
