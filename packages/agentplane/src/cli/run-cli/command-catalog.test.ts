import { describe, expect, it } from "vitest";

import {
  findCommandEntry,
  getDirectChildCommandEntries,
  getDirectChildCommandNames,
  getHelpCommandEntries,
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
    expect(findCommandEntry(["ide", "sync"])?.needs).toBe("project");
    expect(findCommandEntry(["ide", "sync"])?.dispatch).toEqual({
      project: true,
      loadedConfig: false,
      taskContext: false,
    });
    expect(findCommandEntry(["config", "show"])?.needs).toBe("project+config");
    expect(findCommandEntry(["config", "show"])?.dispatch).toEqual({
      project: true,
      loadedConfig: true,
      taskContext: false,
    });
    expect(findCommandEntry(["task"])?.needs).toBe("none");
    expect(findCommandEntry(["task"])?.dispatch).toEqual({
      project: false,
      loadedConfig: false,
      taskContext: false,
    });
  });

  it("keeps framework and internal commands out of normal help without removing dispatch", () => {
    expect(findCommandEntry(["release"])?.surface).toBe("framework");
    expect(findCommandEntry(["release", "apply"])?.surface).toBe("framework");
    expect(findCommandEntry(["task", "normalize"])?.surface).toBe("internal");
    expect(findCommandEntry(["context", "learn", "tasks"])?.surface).toBe("user");
    expect(findCommandEntry(["context", "harvest", "tasks"])?.surface).toBe("advanced");

    const normalHelpIds = getHelpCommandEntries("user").map((entry) => entry.spec.id.join(" "));
    expect(normalHelpIds).not.toContain("release");
    expect(normalHelpIds).not.toContain("task normalize");
    expect(normalHelpIds).not.toContain("context harvest tasks");
    expect(normalHelpIds).toContain("context learn tasks");
    expect(normalHelpIds).toContain("context check");
    expect(normalHelpIds).toContain("task");
    expect(normalHelpIds).toContain("work start");

    const frameworkHelpIds = getHelpCommandEntries("framework").map((entry) =>
      entry.spec.id.join(" "),
    );
    expect(frameworkHelpIds).toContain("release");
    expect(frameworkHelpIds).not.toContain("task normalize");

    const allHelpIds = getHelpCommandEntries("all").map((entry) => entry.spec.id.join(" "));
    expect(allHelpIds).toContain("release");
    expect(allHelpIds).toContain("task normalize");
    expect(allHelpIds).toContain("context harvest tasks");
  });
});
