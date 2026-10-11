import { describe, expect, it } from "vitest";
import {
  taskCheckTimeoutBudget,
  taskCheckTimeoutProfile,
} from "./direct-task-verification-timeout.js";

describe("finite operator verification budget", () => {
  it.each([
    "",
    "0",
    "-1",
    "1.5",
    "Infinity",
    "NaN",
    "1e6",
    " 1000",
    "86400001",
    "9007199254740992",
  ])("rejects %j", (value) => {
    expect(() => taskCheckTimeoutProfile({ AGENTPLANE_TASK_CHECK_TIMEOUT_MS: value })).toThrow(
      "1 to 86400000",
    );
  });
  it.each([1, 7_200_000, 86_400_000])("accepts finite %i", (value) => {
    expect(taskCheckTimeoutProfile({ AGENTPLANE_TASK_CHECK_TIMEOUT_MS: String(value) })).toBe(
      value,
    );
  });
  it("preserves defaults and explicit command precedence", () => {
    expect(taskCheckTimeoutProfile({})).toBeUndefined();
    expect(taskCheckTimeoutBudget([{ script: "test:project" }], undefined, undefined)).toBe(
      1_800_000,
    );
    expect(taskCheckTimeoutBudget([{ script: "ci:local:full" }], undefined, undefined)).toBe(
      9_000_000,
    );
    expect(taskCheckTimeoutBudget([{ script: "test:project" }], 1000, 7_200_000)).toBe(1000);
    expect(taskCheckTimeoutBudget([{ script: "test:project" }], undefined, 7_200_000)).toBe(
      7_200_000,
    );
  });
});
