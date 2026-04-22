import { describe, expect, it } from "vitest";

import {
  isTaskStatus,
  normalizeTaskStatus,
  parseTaskStatus,
  TASK_STATUS_LABEL,
  TASK_STATUS_VALUES,
} from "./task-status.js";

describe("task status helpers", () => {
  it("normalizes known statuses and keeps unknown values out of the status model", () => {
    expect(TASK_STATUS_VALUES).toEqual(["TODO", "DOING", "DONE", "BLOCKED"]);
    expect(TASK_STATUS_LABEL).toBe("TODO|DOING|DONE|BLOCKED");
    expect(parseTaskStatus(" doing ")).toBe("DOING");
    expect(parseTaskStatus("review")).toBeNull();
    expect(isTaskStatus("DONE")).toBe(true);
    expect(isTaskStatus("done")).toBe(true);
    expect(isTaskStatus("READY")).toBe(false);
    expect(normalizeTaskStatus(" blocked ")).toBe("BLOCKED");
    expect(normalizeTaskStatus("unknown")).toBe("TODO");
    expect(normalizeTaskStatus(null, "BLOCKED")).toBe("BLOCKED");
  });
});
