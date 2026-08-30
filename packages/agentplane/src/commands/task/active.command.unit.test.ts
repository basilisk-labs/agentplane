import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskSummary } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import * as routeDecision from "../shared/route-decision.js";
import * as taskBackend from "../shared/task-backend.js";
import { buildActiveWorkItems } from "./active.command.js";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { makeKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  makeTaskFixture,
  makeTaskCommandContext,
  makeTaskBackendDouble,
} from "@agentplane/testkit/task";
import * as identityContext from "./execution-authority-context.js";

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

  it("selects canonical work despite a contradictory legacy DONE status", async () => {
    const identity = taskKernel.kernelDigest("repo");
    const aggregate: taskKernel.TaskAggregate = {
      schema_version: 1,
      id: "T-1",
      revision: 1,
      state: "PLANNING",
      intent_digest: taskKernel.kernelDigest("intent"),
      current_plan: null,
      plan_history: [],
      work_items: {},
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    };
    const task = makeTaskFixture({
      status: "DONE",
      depends_on: ["LEGACY-MISSING"],
      extensions: { task_kernel: makeKernelRecord(identity, aggregate, []) },
    });
    vi.spyOn(identityContext, "resolveLogicalRepositoryIdentity").mockResolvedValue(identity);
    const route = vi.spyOn(routeDecision, "buildTaskRouteDecision");
    const backend = makeTaskBackendDouble({
      listTasks: () => Promise.resolve([task]),
      getTask: () => Promise.resolve(task),
    });
    const result = await buildActiveWorkItems({
      ctx: makeTaskCommandContext({ taskBackend: backend }),
      cwd: "/repo",
      filters: { status: [], owner: [], tag: [], quiet: false },
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      task: { id: "T-1", status: "PLANNING" },
      next_action: { code: "kernel_plan_required", command: null },
      dependency_readiness: { state: "kernel_work_items", depends_on: [] },
      kernel: { source: "task_kernel", authority: { grants_authority: false } },
    });
    expect(route).not.toHaveBeenCalled();
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
        } as never;
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
