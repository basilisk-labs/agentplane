import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../../commands/shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  buildAdapters: vi.fn(),
  PolicyEngine: vi.fn(),
  resolveExecutionProfileRuntime: vi.fn(),
  resolveHarnessFromCommandContext: vi.fn(),
}));

vi.mock("../../adapters/index.js", () => ({
  buildAdapters: mocks.buildAdapters,
}));

vi.mock("../../policy/engine.js", () => ({
  PolicyEngine: mocks.PolicyEngine,
}));

vi.mock("../../runtime/execution-profile/index.js", () => ({
  resolveExecutionProfileRuntime: mocks.resolveExecutionProfileRuntime,
}));

vi.mock("../../runtime/harness/index.js", () => ({
  resolveHarnessFromCommandContext: mocks.resolveHarnessFromCommandContext,
}));

describe("resolve-context usecase factories (unit)", () => {
  const backendCapabilities = {
    canonical_source: "local",
    projection: "canonical",
    projection_read_mode: "native",
    reads_from_projection_by_default: false,
    writes_task_readmes: false,
    supports_task_revisions: true,
    supports_revision_guarded_writes: true,
    may_access_network_on_read: false,
    may_access_network_on_write: false,
    supports_projection_refresh: false,
    supports_push_sync: false,
    supports_snapshot_export: false,
  } as const;

  beforeEach(() => {
    mocks.buildAdapters.mockReset();
    mocks.PolicyEngine.mockReset();
    mocks.resolveHarnessFromCommandContext.mockReset();
    mocks.buildAdapters.mockReturnValue({ adapters: true });
    mocks.PolicyEngine.mockImplementation(function PolicyEngine() {
      return { policy: true };
    });
    mocks.resolveExecutionProfileRuntime.mockReturnValue({
      profile: "balanced",
      reasoning_effort: "medium",
      budget: {
        discovery: { limit: 6, used: 0, remaining: 6, exhausted: false },
        implementation: { limit: 10, used: 0, remaining: 10, exhausted: false },
        verification: { limit: 6, used: 0, remaining: 6, exhausted: false },
      },
      stop_conditions: ["stop"],
      handoff_conditions: ["handoff"],
      unsafe_actions_requiring_explicit_user_ok: ["unsafe"],
      approvals: {
        require_plan: true,
        require_network: false,
        require_verify: true,
        require_force: false,
      },
      runner: {
        trace_policy: { mode: "raw", max_tail_bytes: 1, capture_stderr: true },
        timeout_policy: { wall_clock_ms: 1, idle_ms: 1, terminate_grace_ms: 1 },
      },
    });
    mocks.resolveHarnessFromCommandContext.mockResolvedValue({
      workflow: {
        mode: "branch_pr",
      },
      task: {
        doc_sections: ["Summary", "Scope", "Plan", "Verify Steps", "Verification"],
        required_doc_sections: ["Summary", "Scope", "Plan"],
        verify_required_tags: ["code"],
      },
      execution: { profile: "balanced" },
      policy: {
        approvals: { require_plan: true, require_network: false, require_verify: true },
        protected_paths: {
          tasks: [".agentplane/tasks"],
          policy: ["AGENTS.md"],
          config: [".agentplane/config.json"],
          hooks: ["lefthook.yml"],
          ci: [".github/workflows"],
        },
        unsafe_actions_requiring_explicit_user_ok: ["Destructive git history operations."],
      },
    });
  });

  it("builds a canonical read-only execution context", async () => {
    const { makeReadOnlyUsecaseContext } = await import("./resolve-context.js");
    const command = {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local.json",
      resolvedProject: {
        gitRoot: "/repo",
        agentplaneDir: "/repo/.agentplane",
      },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      taskBackend: { capabilities: backendCapabilities },
    } as unknown as CommandContext;

    const context = await makeReadOnlyUsecaseContext(command);

    expect(context).toMatchObject({
      command,
      project: command.resolvedProject,
      repo: {
        git_root: "/repo",
        agentplane_dir: "/repo/.agentplane",
        workflow_dir: ".agentplane/tasks",
      },
      config: command.config,
      backend: {
        id: "local",
        config_path: "/repo/.agentplane/backends/local.json",
        capabilities: backendCapabilities,
        task_backend: command.taskBackend,
      },
      harness: {
        workflow: {
          mode: "branch_pr",
        },
        task: {
          doc_sections: ["Summary", "Scope", "Plan", "Verify Steps", "Verification"],
          required_doc_sections: ["Summary", "Scope", "Plan"],
          verify_required_tags: ["code"],
        },
        execution: { profile: "balanced" },
        policy: {
          approvals: { require_plan: true, require_network: false, require_verify: true },
        },
      },
      execution: { profile: "balanced" },
      executionProfile: {
        profile: "balanced",
        reasoning_effort: "medium",
      },
      taskIntake: {
        backend: {
          id: "local",
          supports_generate_task_id: false,
          supports_bulk_write: false,
        },
        precedence: {
          behavior_order: ["harness", "extension", "user", "builtin"],
          extension_layer: "recipes",
        },
      },
      frameworkExplain: {
        schema_version: 1,
        runtime: {
          execution_profile: {
            profile: "balanced",
            reasoning_effort: "medium",
          },
          task_intake: {
            precedence: {
              behavior_order: ["harness", "extension", "user", "builtin"],
              extension_layer: "recipes",
            },
          },
        },
        behavior_inputs: [],
      },
      frameworkProtocol: {
        explain: {
          schema_version: 1,
          kind: "framework.explain",
          status: "ok",
          compatibility: {
            strategy: "additive",
            breaking_changes_require_schema_version: true,
            additive_fields_allowed: true,
            new_result_kinds_allowed: true,
          },
          data: {
            runtime: {
              execution_profile: {
                profile: "balanced",
                reasoning_effort: "medium",
              },
              task_intake: {
                precedence: {
                  extension_layer: "recipes",
                },
              },
            },
          },
        },
      },
      approvals: { require_plan: true, require_network: false, require_verify: true },
      policy: { policy: true },
    });
    expect(context.capabilities.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "backend.local.canonical_source",
          availability: "available",
          value: "local",
        }),
        expect.objectContaining({
          id: "backend.local.supports_task_revisions",
          availability: "available",
          value: true,
        }),
        expect.objectContaining({
          id: "backend.local.writes_task_readmes",
          availability: "unavailable",
          value: false,
        }),
      ]),
    );
    expect(mocks.buildAdapters).not.toHaveBeenCalled();
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
    expect(mocks.resolveExecutionProfileRuntime).toHaveBeenCalledWith(command.config);
    expect(mocks.resolveHarnessFromCommandContext).toHaveBeenCalledWith(command);
  });

  it("memoizes the read-only context per command", async () => {
    const { makeReadOnlyUsecaseContext } = await import("./resolve-context.js");
    const command = {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local.json",
      resolvedProject: {
        gitRoot: "/repo",
        agentplaneDir: "/repo/.agentplane",
      },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      taskBackend: { capabilities: null },
    } as unknown as CommandContext;

    const first = await makeReadOnlyUsecaseContext(command);
    const second = await makeReadOnlyUsecaseContext(command);

    expect(second).toBe(first);
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
    expect(mocks.resolveExecutionProfileRuntime).toHaveBeenCalledWith(command.config);
    expect(mocks.resolveHarnessFromCommandContext).toHaveBeenCalledTimes(1);
  });

  it("still builds the full usecase context when callers need it", async () => {
    const { makeUsecaseContext } = await import("./resolve-context.js");
    const command = {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local.json",
      resolvedProject: {
        gitRoot: "/repo",
        agentplaneDir: "/repo/.agentplane",
      },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      taskBackend: { capabilities: null },
    } as unknown as CommandContext;

    await expect(makeUsecaseContext(command)).resolves.toMatchObject({
      command,
      adapters: { adapters: true },
      capabilities: {
        entries: [
          expect.objectContaining({
            id: "backend.local.capabilities",
            availability: "unavailable",
          }),
        ],
      },
      execution: { profile: "balanced" },
      executionProfile: {
        profile: "balanced",
        reasoning_effort: "medium",
      },
      taskIntake: {
        backend: {
          id: "local",
          supports_generate_task_id: false,
          supports_bulk_write: false,
        },
      },
      frameworkExplain: {
        schema_version: 1,
        runtime: {
          execution_profile: {
            profile: "balanced",
            reasoning_effort: "medium",
          },
          task_intake: {
            precedence: {
              extension_layer: "recipes",
            },
          },
        },
        behavior_inputs: [],
      },
      frameworkProtocol: {
        explain: {
          schema_version: 1,
          kind: "framework.explain",
          status: "ok",
          data: {
            runtime: {
              task_intake: {
                precedence: {
                  extension_layer: "recipes",
                },
              },
            },
          },
        },
      },
      approvals: { require_plan: true, require_network: false, require_verify: true },
      policy: { policy: true },
    });
    expect(mocks.buildAdapters).toHaveBeenCalledWith(command);
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
  });
});
