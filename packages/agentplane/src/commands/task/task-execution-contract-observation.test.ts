import { describe, expect, it, vi } from "vitest";

import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { defaultConfig } from "@agentplaneorg/core/config";

import { recordObservedTaskExecutionContract } from "./task-execution-contract-observation.js";

describe("task execution contract observation", () => {
  it("replaces a direct-only blueprint during observed branch escalation", async () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const task = {
      id: "202608120000-ESCAL8",
      title: "Escalation fixture",
      description: "Start direct, then observe a CI change.",
      status: "DOING",
      priority: "high",
      owner: "CODER",
      revision: 3,
      depends_on: [],
      tags: [],
      verify: [],
      task_kind: "code",
      mutation_scope: "code",
      blueprint_request: "code.direct",
      execution_contract: resolveTaskExecutionContract({
        config,
        task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
        declaration: {
          schema_version: 1,
          preferred_mode: "direct",
          scope_roots: ["."],
          repository_effects: ["repository_write", "source_code"],
          external_effects: [],
          uncertainty: "bounded",
          reversibility: "reversible",
          rationale: ["localized implementation"],
        },
      }),
    } satisfies TaskData;
    let persistedTask: TaskData | null = null;
    let persistedOptions: TaskWriteOptions | undefined;
    const writeTask = vi.fn<(nextTask: TaskData, options?: TaskWriteOptions) => Promise<void>>(
      (nextTask, options) => {
        persistedTask = nextTask;
        persistedOptions = options;
        return Promise.resolve();
      },
    );
    const getTask = vi.fn<(taskId: string) => Promise<TaskData | null>>(() =>
      Promise.resolve({ ...task, blueprint_request: "code.branch_pr" }),
    );
    const command = {
      config,
      backendId: "local",
      resolvedProject: { gitRoot: "/repo" },
      taskBackend: { writeTask, getTask },
    } as unknown as CommandContext;

    const result = await recordObservedTaskExecutionContract({
      command,
      task,
      changed_paths: [".github/workflows/ci.yml"],
      preserved_commit: "abc123",
    });

    expect(result.escalated).toBe(true);
    expect(writeTask).toHaveBeenCalledOnce();
    expect(persistedTask).toMatchObject({
      blueprint_request: "code.branch_pr",
      execution_contract: { selected_mode: "branch_pr" },
    });
    expect(persistedOptions).toEqual({ expectedRevision: 3 });
  });
});
