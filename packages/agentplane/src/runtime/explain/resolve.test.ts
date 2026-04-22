import { defaultConfig } from "@agentplaneorg/core/config";
import { describe, expect, it } from "vitest";

import { createCapabilityRegistry } from "../capabilities/index.js";
import { resolveExecutionProfileRuntime } from "../execution-profile/index.js";
import { createTaskIntakeRuntime } from "../task-intake/index.js";

import { appendFrameworkExplainBehaviorInputs, buildFrameworkExplainPayload } from "./index.js";

describe("runtime/explain", () => {
  it("builds a machine-readable framework explain payload from resolved runtime contracts", () => {
    const config = defaultConfig();
    const executionProfile = resolveExecutionProfileRuntime(config);
    const taskIntake = createTaskIntakeRuntime({
      repo: {
        git_root: "/repo",
        agentplane_dir: "/repo/.agentplane",
        workflow_dir: ".agentplane/tasks",
      },
      backend: {
        id: "local",
        config_path: ".agentplane/backends/local/backend.json",
        capabilities: null,
        supports_generate_task_id: true,
        supports_bulk_write: false,
      },
      harness: {
        repo: {
          gitRoot: "/repo",
          agentplaneDir: "/repo/.agentplane",
          tasksDir: "/repo/.agentplane/tasks",
          policy_gateway: {
            fileName: "AGENTS.md",
            absPath: "/repo/AGENTS.md",
            flavor: "codex",
          },
          tasks_backend_config_path: ".agentplane/backends/local/backend.json",
        },
        workflow: {
          mode: "branch_pr",
          status_commit_policy: "warn",
          finish_auto_status_commit: false,
          task_prefix: "task",
          paths: config.paths,
        },
        task: {
          doc_sections: ["Summary", "Scope", "Plan", "Verify Steps"],
          required_doc_sections: ["Summary", "Scope", "Plan"],
          verify_required_tags: ["code"],
          verify_steps_required_tags: ["code"],
          verify_steps_required_primary: ["code"],
          verification_required_primary: ["code"],
          spike_tag: "spike",
          enforce_verify_steps_on_plan_approve: true,
          enforce_verify_steps_on_start_without_plan: true,
          comments: config.tasks.comments,
          closure_commit_requires_approval: false,
        },
        policy: {
          approvals: {
            require_plan: true,
            require_network: false,
            require_verify: true,
            require_force: false,
          },
          unsafe_actions_requiring_explicit_user_ok: ["Destructive git history operations."],
          protected_paths: {
            tasks: [".agentplane/tasks"],
            policy: ["AGENTS.md"],
            config: [".agentplane/config.json"],
            hooks: ["lefthook.yml"],
            ci: [".github/workflows"],
          },
        },
        execution: config.execution,
        backend: {
          id: "local",
          config_path: ".agentplane/backends/local/backend.json",
          capabilities: null,
          restrictions: {
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
        },
        trace: {
          repo: [{ id: "project", detail: "." }],
          workflow: [{ id: "config", detail: ".agentplane/config.json" }],
          task_contract: [{ id: "config", detail: ".agentplane/config.json" }],
          policy_gateway: [{ id: "policy_gateway", detail: "AGENTS.md" }],
          approval_requirements: [{ id: "config", detail: ".agentplane/config.json" }],
          protected_paths: [{ id: "builtin", detail: "defaults" }],
          execution: [{ id: "execution_profile", detail: "balanced" }],
          backend: [{ id: "backend", detail: "local" }],
        },
      },
      execution_profile: executionProfile,
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
    const base = buildFrameworkExplainPayload({
      harness: {
        repo: {
          gitRoot: "/repo",
          agentplaneDir: "/repo/.agentplane",
          tasksDir: "/repo/.agentplane/tasks",
          policy_gateway: {
            fileName: "AGENTS.md",
            absPath: "/repo/AGENTS.md",
            flavor: "codex",
          },
          tasks_backend_config_path: ".agentplane/backends/local/backend.json",
        },
        workflow: {
          mode: "branch_pr",
          status_commit_policy: "warn",
          finish_auto_status_commit: false,
          task_prefix: "task",
          paths: config.paths,
        },
        task: {
          doc_sections: ["Summary", "Scope", "Plan", "Verify Steps"],
          required_doc_sections: ["Summary", "Scope", "Plan"],
          verify_required_tags: ["code"],
          verify_steps_required_tags: ["code"],
          verify_steps_required_primary: ["code"],
          verification_required_primary: ["code"],
          spike_tag: "spike",
          enforce_verify_steps_on_plan_approve: true,
          enforce_verify_steps_on_start_without_plan: true,
          comments: config.tasks.comments,
          closure_commit_requires_approval: false,
        },
        policy: {
          approvals: {
            require_plan: true,
            require_network: false,
            require_verify: true,
            require_force: false,
          },
          unsafe_actions_requiring_explicit_user_ok: ["Destructive git history operations."],
          protected_paths: {
            tasks: [".agentplane/tasks"],
            policy: ["AGENTS.md"],
            config: [".agentplane/config.json"],
            hooks: ["lefthook.yml"],
            ci: [".github/workflows"],
          },
        },
        execution: config.execution,
        backend: {
          id: "local",
          config_path: ".agentplane/backends/local/backend.json",
          capabilities: null,
          restrictions: {
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
        },
        trace: {
          repo: [{ id: "project", detail: "." }],
          workflow: [{ id: "config", detail: ".agentplane/config.json" }],
          task_contract: [{ id: "config", detail: ".agentplane/config.json" }],
          policy_gateway: [{ id: "policy_gateway", detail: "AGENTS.md" }],
          approval_requirements: [{ id: "config", detail: ".agentplane/config.json" }],
          protected_paths: [{ id: "builtin", detail: "defaults" }],
          execution: [{ id: "execution_profile", detail: "balanced" }],
          backend: [{ id: "backend", detail: "local" }],
        },
      },
      capabilities: createCapabilityRegistry([
        {
          id: "backend.local.supports_task_revisions",
          kind: "backend_field",
          availability: "available",
          source: { id: "backend", detail: "local" },
          value: true,
        },
      ]),
      execution_profile: executionProfile,
      task_intake: taskIntake,
    });
    const payload = appendFrameworkExplainBehaviorInputs(base, [
      {
        id: "base.policy_gateway",
        category: "prompt",
        source: "AGENTS.md",
        resolution: {
          key: "runner.policy_gateway:AGENTS.md",
          winner: {
            layer: "harness",
            source: "AGENTS.md",
            order: 0,
            selected: true,
          },
          conflicts: [],
          trace: [
            {
              layer: "harness",
              source: "AGENTS.md",
              order: 0,
              selected: true,
            },
          ],
        },
      },
    ]);

    expect(payload.schema_version).toBe(1);
    expect(payload.harness.workflow.mode).toBe("branch_pr");
    expect(payload.policy.protected_paths.policy).toContain("AGENTS.md");
    expect(payload.runtime.task_intake.precedence.extension_layer).toBe("recipes");
    expect(payload.behavior_inputs).toEqual([
      expect.objectContaining({
        id: "base.policy_gateway",
        category: "prompt",
        source: "AGENTS.md",
      }),
    ]);
  });
});
