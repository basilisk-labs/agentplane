import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskSummary } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import * as routeDecision from "../shared/route-decision.js";
import * as taskBackend from "../shared/task-backend.js";
import { buildActiveWorkItems } from "./active.command.js";

function makeTask(index: number): TaskSummary {
  return {
    id: `2026072601${String(index).padStart(2, "0")}-ACTIVE`,
    title: `Active task ${index}`,
    description: "Bound route fan-out",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["workflow"],
    verify: [],
  };
}

describe("task active route evaluation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("bounds route fan-out while preserving every active item", async () => {
    const tasks = Array.from({ length: 13 }, (_, index) => makeTask(index));
    const listTaskSummariesMemo = vi
      .spyOn(taskBackend, "listTaskSummariesMemo")
      .mockResolvedValue(tasks);

    let inFlight = 0;
    let maxInFlight = 0;
    const buildTaskRouteDecision = vi
      .spyOn(routeDecision, "buildTaskRouteDecision")
      .mockImplementation(async () => {
        inFlight += 1;
        maxInFlight = Math.max(maxInFlight, inFlight);
        await new Promise((resolve) => setTimeout(resolve, 5));
        inFlight -= 1;
        return {
          blockers: [],
          nextAction: {
            code: "start_or_recover_worktree",
            command: null,
            summary: "Create the task worktree.",
            requiresApproval: false,
          },
        };
      });

    const ctx = {
      config: { workflow_mode: "direct" },
      taskBackend: { getLastListWarnings: () => [] },
      memo: {},
    } as unknown as CommandContext;
    const result = await buildActiveWorkItems({
      ctx,
      cwd: "/repo",
      filters: {
        status: [],
        owner: [],
        tag: [],
        quiet: false,
        strictRead: false,
      },
    });

    expect(result.items).toHaveLength(tasks.length);
    expect(listTaskSummariesMemo).toHaveBeenCalledTimes(1);
    expect(buildTaskRouteDecision).toHaveBeenCalledTimes(tasks.length);
    expect(maxInFlight).toBe(4);
  });
});
