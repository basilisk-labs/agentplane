import { describe, expect, it } from "vitest";

import { CommandRegistry } from "./registry.js";

const noopHandler = () => Promise.resolve(0);

describe("CommandRegistry", () => {
  it("throws on duplicate command ids", () => {
    const registry = new CommandRegistry();

    const spec = {
      id: ["dup"],
      group: "Test",
      summary: "test",
      args: [],
      options: [],
      examples: [],
      parse: () => ({}),
    } as const;

    registry.register(spec, noopHandler);
    expect(() => registry.register(spec, noopHandler)).toThrow(/Duplicate command id/i);
  });

  it("answers longest-prefix match, exact lookup, and direct children from one graph", () => {
    const registry = new CommandRegistry();

    const taskSpec = { id: ["task"], group: "Test", summary: "task" } as const;
    const taskNewSpec = { id: ["task", "new"], group: "Test", summary: "task new" } as const;
    const taskPlanSpec = { id: ["task", "plan"], group: "Test", summary: "task plan" } as const;
    const taskPlanSetSpec = {
      id: ["task", "plan", "set"],
      group: "Test",
      summary: "task plan set",
    } as const;

    registry.register(taskSpec, noopHandler);
    registry.register(taskNewSpec, noopHandler);
    registry.register(taskPlanSpec, noopHandler);
    registry.register(taskPlanSetSpec, noopHandler);

    expect(registry.lookup(["task", "plan"])?.spec.id).toEqual(["task", "plan"]);
    expect(registry.lookup(["missing"])).toBeNull();
    expect(registry.match(["task", "plan", "set", "TASK-1"])?.spec.id).toEqual([
      "task",
      "plan",
      "set",
    ]);
    expect(registry.match(["task", "plan", "unknown"])?.spec.id).toEqual(["task", "plan"]);
    expect(registry.directChildren(["task"]).map((entry) => entry.spec.id.join(" "))).toEqual([
      "task new",
      "task plan",
    ]);
    expect(
      registry.directChildren(["task", "plan"]).map((entry) => entry.spec.id.join(" ")),
    ).toEqual(["task plan set"]);
    expect(registry.directChildSegments(["task"])).toEqual(["new", "plan"]);
    expect(registry.directChildSegments(["task", "plan"])).toEqual(["set"]);
    expect(registry.directChildSegments(["missing"])).toEqual([]);
  });
});
