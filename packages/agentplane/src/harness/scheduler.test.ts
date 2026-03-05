import { describe, expect, it } from "vitest";

import { canDispatchIssue, planDispatch, sortIssuesForDispatch } from "./scheduler.js";

describe("harness/scheduler", () => {
  const candidates = [
    { id: "C", state: "todo", priority: 2, createdAt: "2026-03-01T00:00:00Z" },
    { id: "A", state: "todo", priority: 1, createdAt: "2026-03-01T00:00:00Z" },
    { id: "B", state: "in progress", priority: 1, createdAt: "2026-03-02T00:00:00Z" },
  ];

  it("sorts issues deterministically", () => {
    const ordered = sortIssuesForDispatch(candidates);
    expect(ordered.map((i) => i.id)).toEqual(["A", "B", "C"]);
  });

  it("enforces per-state and global concurrency limits", () => {
    const running = [{ issue: { id: "R1", state: "todo" }, workerId: "w1" }];
    expect(
      canDispatchIssue({ id: "N1", state: "todo" }, running, {
        maxConcurrent: 4,
        maxConcurrentByState: { todo: 1 },
      }),
    ).toBe(false);

    const plan = planDispatch(candidates, [], {
      maxConcurrent: 2,
      maxConcurrentByState: { todo: 1, "in progress": 1 },
    });
    expect(plan.map((i) => i.id)).toEqual(["A", "B"]);
  });
});
