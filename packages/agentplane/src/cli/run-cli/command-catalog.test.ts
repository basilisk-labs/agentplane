import { describe, expect, it } from "vitest";

import {
  findCommandEntry,
  getDirectChildCommandEntries,
  matchCommandCatalog,
} from "./command-catalog.js";

describe("command catalog graph", () => {
  it("uses one graph for longest-prefix match and exact lookup", () => {
    expect(matchCommandCatalog(["task", "plan", "set", "TASK-1"])?.entry.spec.id).toEqual([
      "task",
      "plan",
      "set",
    ]);
    expect(matchCommandCatalog(["task", "plan", "unknown"])?.entry.spec.id).toEqual([
      "task",
      "plan",
    ]);
    expect(findCommandEntry(["task", "plan"])?.spec.id).toEqual(["task", "plan"]);
    expect(findCommandEntry(["missing", "command"])).toBeNull();
  });

  it("lists direct children without leaking grandchildren", () => {
    const taskChildren = getDirectChildCommandEntries(["task"]).map((entry) =>
      entry.spec.id.join(" "),
    );
    expect(taskChildren).toContain("task new");
    expect(taskChildren).toContain("task plan");
    expect(taskChildren).not.toContain("task plan set");

    const taskPlanChildren = getDirectChildCommandEntries(["task", "plan"]).map((entry) =>
      entry.spec.id.join(" "),
    );
    expect(taskPlanChildren).toEqual(
      expect.arrayContaining(["task plan set", "task plan approve", "task plan reject"]),
    );
    expect(taskPlanChildren).not.toContain("task new");
    expect(getDirectChildCommandEntries(["missing", "command"])).toEqual([]);
  });
});
