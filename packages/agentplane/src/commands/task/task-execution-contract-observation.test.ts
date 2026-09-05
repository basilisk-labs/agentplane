import { describe, expect, it, vi } from "vitest";

import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";

import {
  createLegacyTaskAggregate,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import {
  observedExternalEffectsFromRunnerResult,
  recordObservedTaskExecutionContract,
} from "./task-execution-contract-observation.js";

const remoteBackendCapabilities = {
  canonical_source: "remote",
  projection: "cache",
  projection_read_mode: "native",
  reads_from_projection_by_default: true,
  writes_task_readmes: false,
  supports_task_revisions: true,
  supports_revision_guarded_writes: true,
  may_access_network_on_read: false,
  may_access_network_on_write: false,
  supports_projection_refresh: false,
  supports_push_sync: false,
  supports_snapshot_export: false,
} as const;

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
      taskBackend: { capabilities: remoteBackendCapabilities, writeTask, getTask },
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
        capabilities: remoteBackendCapabilities,
        getTask: () => Promise.resolve(persistedTask ?? task),
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
        capabilities: remoteBackendCapabilities,
        getTask: () => Promise.resolve(persistedTask ?? task),
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
      taskBackend: {
        capabilities: remoteBackendCapabilities,
        writeTask,
        getTask: () => Promise.resolve(task),
      },
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

  it("evaluates episode authority without re-blocking on inherited base observations", async () => {
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    const executionContract = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      requestedMode: "branch_pr",
      declaration: {
        schema_version: 1,
        preferred_mode: "branch_pr",
        scope_roots: ["packages/core"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["bounded core change"],
      },
    });
    executionContract.observed.changed_paths = [".agentplane/tasks/OTHER/README.md"];
    executionContract.observed.authority_violations = [
      "writable_scope:.agentplane/tasks/OTHER/README.md",
    ];
    const task = {
      id: "202608210000-BASESYNC",
      title: "Base sync observation fixture",
      description: "Do not attribute inherited base artifacts to the current episode.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      revision: 6,
      depends_on: [],
      tags: [],
      verify: [],
      task_kind: "code",
      mutation_scope: "code",
      execution_contract: executionContract,
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
        capabilities: remoteBackendCapabilities,
        getTask: () => Promise.resolve(persistedTask ?? task),
      },
    } as unknown as CommandContext;

    const allowed = await recordObservedTaskExecutionContract({
      command,
      execution: executionFor(task),
      task,
      changed_paths: ["packages/core/src/tasks/plan-execution-grant.test.ts"],
      preserved_commit: "allowed-sha",
    });
    expect(allowed.episodeAuthorityViolations).toEqual([]);
    expect(allowed.task.execution_contract?.observed.authority_violations).toContain(
      "writable_scope:.agentplane/tasks/OTHER/README.md",
    );

    const forbidden = await recordObservedTaskExecutionContract({
      command,
      execution: executionFor(allowed.task),
      task: allowed.task,
      changed_paths: ["packages/outside/new.ts"],
      preserved_commit: "forbidden-sha",
    });
    expect(forbidden.episodeAuthorityViolations).toContain(
      "writable_scope:packages/outside/new.ts",
    );
  });

  it("projects an observation and its task-centric revision atomically", async () => {
    const config = defaultConfig();
    const aggregate = createLegacyTaskAggregate({
      id: "202609040000-ATOMIC",
      revision: 4,
      title: "Atomic observation fixture",
      description: "Keep compatibility and canonical revisions synchronized.",
      status: "DOING",
      acceptance_criteria: ["observation persisted"],
      captured_at: "2026-09-04T00:00:00.000Z",
      updated_at: "2026-09-04T00:00:00.000Z",
    });
    const task = {
      id: aggregate.id,
      title: "Atomic observation fixture",
      description: "Keep compatibility and canonical revisions synchronized.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      revision: 4,
      depends_on: [],
      tags: [],
      verify: [],
      extensions: withTaskCentricAggregate({}, aggregate),
    } satisfies TaskData;
    let persistedTask = task as TaskData;
    const command = {
      config,
      backendId: "remote",
      resolvedProject: { gitRoot: "/repo" },
      taskBackend: {
        capabilities: remoteBackendCapabilities,
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
      changed_paths: [],
      preserved_commit: "new-sha",
    });

    expect(result.task.revision).toBe(5);
    expect(taskCentricAggregateFromExtensions(result.task.extensions)?.revision).toBe(5);
    expect(result.task.extensions?.implementation_commit).toEqual({ hash: "new-sha" });
  });
});
