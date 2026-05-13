import { defaultConfig } from "@agentplaneorg/core/config";
import { describe, expect, it } from "vitest";

import { createCapabilityRegistry } from "../capabilities/index.js";
import { resolveExecutionProfileRuntime } from "../execution-profile/index.js";

import {
  createClarificationContract,
  createTaskGraphDraft,
  createTaskIntakeContext,
  createTaskIntakeRuntime,
  materializeTaskGraphDraft,
} from "./index.js";

function makeRuntime() {
  const config = defaultConfig();
  return createTaskIntakeRuntime({
    repo: {
      git_root: "/repo",
      agentplane_dir: "/repo/.agentplane",
      workflow_dir: ".agentplane/tasks",
    },
    backend: {
      id: "local",
      config_path: ".agentplane/backends/local/backend.json",
      capabilities: {
        canonical_source: "local",
        projection: "canonical",
        projection_read_mode: "native",
        reads_from_projection_by_default: false,
        writes_task_readmes: true,
        supports_task_revisions: true,
        supports_revision_guarded_writes: true,
        may_access_network_on_read: false,
        may_access_network_on_write: false,
        supports_projection_refresh: false,
        supports_push_sync: false,
        supports_snapshot_export: false,
      },
      supports_generate_task_id: true,
      supports_bulk_write: false,
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
      policy: {
        approvals: {
          require_plan: true,
          require_network: false,
          require_verify: true,
          require_force: false,
        },
        protected_paths: {
          tasks: [".agentplane/tasks"],
          policy: ["AGENTS.md"],
          config: [".agentplane/config.json"],
          hooks: ["lefthook.yml"],
          ci: [".github/workflows"],
        },
        unsafe_actions_requiring_explicit_user_ok: ["Destructive git history operations."],
      },
    },
    execution_profile: resolveExecutionProfileRuntime(config),
    capabilities: createCapabilityRegistry([
      {
        id: "backend.local.supports_task_revisions",
        kind: "backend_field",
        availability: "available",
        source: { id: "backend", detail: "local" },
        value: true,
      },
    ]),
  });
}

describe("runtime/task-intake", () => {
  it("materializes a task graph with stable precedence metadata and remapped dependencies", async () => {
    const runtime = makeRuntime();
    const context = createTaskIntakeContext({
      runtime,
      source: {
        id: "task_create",
        detail: "free-form task create",
      },
      requested_outcome: "Split a free-form request into executable tasks",
      requested_owner: "CODER",
      requested_tags: ["framework", "intake"],
      requested_dependencies: ["EXT-100"],
      inputs: [
        {
          kind: "text",
          label: "request",
          value: "Create a task graph from natural language.",
          required: true,
        },
      ],
    });
    const clarification = createClarificationContract({
      context,
      assumptions: ["The user approved autonomous materialization."],
    });
    const draft = createTaskGraphDraft({
      context,
      clarification,
      summary: "Materialize a two-step intake plan",
      tasks: [
        {
          draft_id: "draft.prepare",
          title: "Prepare intake contracts",
          description: "Define the contract layer for task intake.",
          owner: "CODER",
          priority: "high",
          origin: { system: "manual" },
          tags: ["framework", "intake"],
          task_kind: "context",
          mutation_scope: "context",
          blueprint_request: "context.assimilation",
          extensions: {
            "agentplane.context": {
              schema_version: 1,
              source_set: {
                files: [{ path: "context/raw/spec.md", sha256: "sha256:test" }],
              },
            },
          },
          depends_on: ["EXT-100"],
          verify: ["bun run typecheck"],
          doc: "## Summary\n\nPrepare intake contracts.\n",
        },
        {
          draft_id: "draft.explain",
          title: "Hook explain surface",
          description: "Connect the resulting contracts to explain hooks.",
          owner: "CODER",
          priority: "high",
          origin: { system: "manual" },
          tags: ["framework", "explain"],
          depends_on: [],
          verify: ["bun run typecheck"],
          doc: "## Summary\n\nHook explain surface.\n",
        },
      ],
      dependencies: [
        {
          from: "draft.explain",
          to: "draft.prepare",
          kind: "depends_on",
        },
      ],
    });

    const plan = await materializeTaskGraphDraft({
      draft,
      task_ids: {
        "draft.prepare": "TASK-100",
        "draft.explain": "TASK-200",
      },
      created_at: "2026-04-03T12:00:00.000Z",
    });

    expect(plan.context.runtime.precedence).toEqual({
      behavior_order: ["harness", "extension", "user", "builtin"],
      extension_layer: "recipes",
    });
    expect(plan.backend).toMatchObject({
      id: "local",
      supports_generate_task_id: true,
      supports_bulk_write: false,
    });
    expect(plan.tasks).toHaveLength(2);
    expect(plan.tasks[0]).toMatchObject({
      draft_id: "draft.prepare",
      task_id: "TASK-100",
      readme_path: "/repo/.agentplane/tasks/TASK-100/README.md",
      task: {
        id: "TASK-100",
        depends_on: ["EXT-100"],
        task_kind: "context",
        mutation_scope: "context",
        blueprint_request: "context.assimilation",
        extensions: {
          "agentplane.context": {
            schema_version: 1,
            source_set: {
              files: [{ path: "context/raw/spec.md", sha256: "sha256:test" }],
            },
          },
        },
      },
    });
    expect(plan.tasks[1]).toMatchObject({
      draft_id: "draft.explain",
      task_id: "TASK-200",
      task: {
        id: "TASK-200",
        depends_on: ["TASK-100"],
      },
    });
  });

  it("refuses materialization when required clarification is still unresolved", async () => {
    const runtime = makeRuntime();
    const context = createTaskIntakeContext({
      runtime,
      source: {
        id: "task_create",
        detail: "free-form task create",
      },
      requested_outcome: "Create a task without a chosen owner",
      inputs: [],
    });
    const clarification = createClarificationContract({
      context,
      questions: [
        {
          id: "owner",
          question: "Who should own the task?",
          reason: "Owner routing is required before materialization.",
          required: true,
          target_field: "owner",
        },
      ],
    });
    const draft = createTaskGraphDraft({
      context,
      clarification,
      summary: "Blocked draft",
      tasks: [
        {
          draft_id: "draft.blocked",
          title: "Blocked task",
          description: "This should not materialize yet.",
          owner: "CODER",
          priority: "med",
          origin: { system: "manual" },
          tags: ["framework"],
          depends_on: [],
          verify: [],
          doc: "## Summary\n\nBlocked.\n",
        },
      ],
    });

    await expect(
      materializeTaskGraphDraft({
        draft,
        task_ids: {
          "draft.blocked": "TASK-999",
        },
      }),
    ).rejects.toThrow("clarification.status=ready");
  });
});
