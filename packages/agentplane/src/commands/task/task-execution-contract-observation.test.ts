import { describe, expect, it, vi } from "vitest";

import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";

import {
  observedExternalEffectsFromRunnerResult,
  recordObservedTaskExecutionContract,
} from "./task-execution-contract-observation.js";

function executionFor(task: TaskData): TaskExecutionContext {
  return {
    schema_version: 1,
    primary_task_id: task.id,
    task_ids: [task.id],
    repository_mode: "direct",
    selected_mode: task.execution_contract?.selected_mode ?? "direct",
    requested_mode: "auto",
    route_source: "execution_contract",
    reason_codes: task.execution_contract?.reason_codes ?? [],
    base_ref: "main",
    base_sha: "0".repeat(40),
    authoritative_task_source: "backend_projection",
  };
}

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
      execution: executionFor(task),
      task,
      changed_paths: [".github/workflows/ci.yml"],
      preserved_commit: "abc123",
    });

    expect(result.escalated).toBe(true);
    expect(writeTask).toHaveBeenCalledOnce();
    expect(persistedTask).toMatchObject({
      blueprint_request: "code.branch_pr",
      extensions: { implementation_commit: { hash: "abc123" } },
      execution_contract: { selected_mode: "branch_pr" },
    });
    expect(persistedOptions).toEqual({ expectedRevision: 3 });
  });

  it("maps only supervisor capability identifiers into objective external effects", () => {
    expect(
      observedExternalEffectsFromRunnerResult({
        capabilities_used: [
          "codex.exec",
          "agentplane.network.read",
          "agentplane.deploy",
          "deploy mentioned in prose",
        ],
      }),
    ).toEqual(["deploy", "network_read"]);
  });

  it("excludes CLI-owned current-task artifacts from product scope reconciliation", async () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    config.paths.workflow_dir = ".ap/tasks";
    const task = {
      id: "202608120000-SCOPE1",
      title: "Scoped fixture",
      description: "Observe one product file and one CLI-owned lifecycle file.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      revision: 2,
      depends_on: [],
      tags: [],
      verify: [],
      task_kind: "code",
      mutation_scope: "code",
      execution_contract: resolveTaskExecutionContract({
        config,
        task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
        declaration: {
          schema_version: 1,
          preferred_mode: "direct",
          scope_roots: ["status-label.txt"],
          repository_effects: ["repository_write"],
          external_effects: [],
          uncertainty: "bounded",
          reversibility: "reversible",
          rationale: ["one scoped product file"],
        },
      }),
    } satisfies TaskData;
    let persistedTask: TaskData | null = null;
    const command = {
      config,
      backendId: "local",
      resolvedProject: { gitRoot: "/repo" },
      taskBackend: {
        writeTask: (nextTask: TaskData) => {
          persistedTask = nextTask;
          return Promise.resolve();
        },
        getTask: () => Promise.resolve(persistedTask),
      },
    } as unknown as CommandContext;

    const result = await recordObservedTaskExecutionContract({
      command,
      execution: executionFor(task),
      task,
      changed_paths: ["status-label.txt", `.ap/tasks/${task.id}/README.md`],
      preserved_commit: "abc123",
    });

    expect(result.escalated).toBe(false);
    expect(result.task.execution_contract?.observed.changed_paths).toEqual(["status-label.txt"]);
    expect(result.task.execution_contract?.observed.authority_violations).toEqual([]);
    expect(result.task.extensions?.implementation_commit).toEqual({ hash: "abc123" });
  });

  it("refreshes implementation identity even when the task has no execution contract", async () => {
    const config = defaultConfig();
    const task = {
      id: "202608190000-IMPLID",
      title: "Implementation identity fixture",
      description: "Persist the latest accepted rework commit.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      revision: 4,
      depends_on: [],
      tags: [],
      verify: [],
      extensions: { implementation_commit: { hash: "old-sha", message: "old" } },
    } satisfies TaskData;
    let persistedTask: TaskData | null = null;
    const command = {
      config,
      backendId: "local",
      resolvedProject: { gitRoot: "/repo" },
      taskBackend: {
        writeTask: (nextTask: TaskData) => {
          persistedTask = nextTask;
          return Promise.resolve();
        },
        getTask: () => Promise.resolve(persistedTask),
      },
    } as unknown as CommandContext;

    const result = await recordObservedTaskExecutionContract({
      command,
      execution: executionFor(task),
      task,
      changed_paths: ["packages/agentplane/src/example.ts"],
      preserved_commit: "new-sha",
    });

    expect(result.escalated).toBe(false);
    expect(result.task.extensions?.implementation_commit).toEqual({ hash: "new-sha" });
  });

  it("does not rewrite a task when implementation identity and observations are unchanged", async () => {
    const config = defaultConfig();
    const task = {
      id: "202608190000-STABLE",
      title: "Stable identity fixture",
      description: "Avoid redundant backend revisions.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      revision: 5,
      depends_on: [],
      tags: [],
      verify: [],
      extensions: { implementation_commit: { hash: "same-sha" } },
    } satisfies TaskData;
    const writeTask = vi.fn();
    const command = {
      config,
      backendId: "local",
      resolvedProject: { gitRoot: "/repo" },
      taskBackend: { writeTask, getTask: () => Promise.resolve(task) },
    } as unknown as CommandContext;

    const result = await recordObservedTaskExecutionContract({
      command,
      execution: executionFor(task),
      task,
      changed_paths: [],
      preserved_commit: "same-sha",
    });

    expect(result.task).toBe(task);
    expect(writeTask).not.toHaveBeenCalled();
  });
});
