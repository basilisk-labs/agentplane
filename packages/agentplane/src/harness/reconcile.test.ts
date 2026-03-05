import { describe, expect, it } from "vitest";

import { reconcileFirst } from "./reconcile.js";

describe("harness/reconcile", () => {
  it("stops terminal and stalled issues, keeps active ones", () => {
    const now = new Date("2026-03-05T00:10:00Z");
    const running = [
      {
        issueId: "1",
        issueIdentifier: "T-1",
        state: "In Progress",
        orchestrationState: "running" as const,
        startedAt: new Date("2026-03-05T00:00:00Z"),
        lastActivityAt: new Date("2026-03-05T00:05:00Z"),
      },
      {
        issueId: "2",
        issueIdentifier: "T-2",
        state: "In Progress",
        orchestrationState: "running" as const,
        startedAt: new Date("2026-03-05T00:00:00Z"),
        lastActivityAt: new Date("2026-03-05T00:00:01Z"),
      },
    ];

    const observed = [
      { id: "1", state: "Done", assignedToWorker: true },
      { id: "2", state: "In Progress", assignedToWorker: true },
    ];

    const result = reconcileFirst(
      running,
      observed,
      {
        activeStates: ["Todo", "In Progress"],
        terminalStates: ["Done", "Closed"],
        stallTimeoutMs: 60_000,
      },
      now,
    );

    expect(result.actions.some((a) => a.type === "stop_running" && a.issueId === "1")).toBe(true);
    expect(result.actions.some((a) => a.type === "restart_stalled" && a.issueId === "2")).toBe(
      true,
    );
    expect(result.nextRunning).toEqual([]);
  });
});
