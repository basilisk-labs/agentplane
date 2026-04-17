import { describe, expect, it } from "vitest";

import {
  findCommandEntry,
  getDirectChildCommandEntries,
  getDirectChildCommandNames,
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

  it("derives direct child names from the canonical graph", () => {
    expect(getDirectChildCommandNames(["task", "plan"])).toEqual(["approve", "reject", "set"]);
    expect(getDirectChildCommandNames(["codex"])).toEqual(["plugin"]);
    expect(getDirectChildCommandNames(["codex", "plugin"])).toEqual(["install"]);
    expect(getDirectChildCommandNames(["missing", "command"])).toEqual([]);
  });

  it("keeps dispatch metadata separate from handler loading", () => {
    expect(findCommandEntry(["ide", "sync"])?.dispatch).toEqual({
      project: true,
      loadedConfig: false,
      taskContext: false,
    });
    expect(findCommandEntry(["config", "show"])?.dispatch).toEqual({
      project: true,
      loadedConfig: true,
      taskContext: false,
    });
    expect(findCommandEntry(["task"])?.dispatch).toEqual({
      project: false,
      loadedConfig: false,
      taskContext: false,
    });
  });
});
