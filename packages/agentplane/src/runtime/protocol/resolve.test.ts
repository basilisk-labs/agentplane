import { defaultConfig } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { createCapabilityRegistry } from "../capabilities/index.js";
import { resolveExecutionProfileRuntime } from "../execution-profile/index.js";
import { buildFrameworkExplainPayload } from "../explain/index.js";
import { createTaskIntakeRuntime } from "../task-intake/index.js";

import {
  AGENTPLANE_PROTOCOL_COMPATIBILITY,
  AGENTPLANE_PROTOCOL_SCHEMA_VERSION,
  buildFrameworkProtocolSurface,
  buildProtocolErrorResult,
  buildProtocolSuccessResult,
} from "./index.js";

function buildFrameworkExplainFixture() {
  const config = defaultConfig();
  const executionProfile = resolveExecutionProfileRuntime(config);
  const harness = {
    repo: {
      gitRoot: "/repo",
      agentplaneDir: "/repo/.agentplane",
      tasksDir: "/repo/.agentplane/tasks",
      policy_gateway: {
        fileName: "AGENTS.md",
        absPath: "/repo/AGENTS.md",
        flavor: "codex" as const,
      },
      tasks_backend_config_path: ".agentplane/backends/local/backend.json",
    },
    workflow: {
      mode: "branch_pr" as const,
      status_commit_policy: "warn" as const,
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
        canonical_source: "local" as const,
        projection: "canonical" as const,
        projection_read_mode: "native" as const,
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
  };
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
    harness,
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
  return buildFrameworkExplainPayload({
    harness,
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
}

describe("runtime/protocol", () => {
  it("builds additive success results with stable compatibility metadata", () => {
    const result = buildProtocolSuccessResult({
      kind: "framework.example",
      data: { ok: true },
    });

    expect(result).toEqual({
      schema_version: AGENTPLANE_PROTOCOL_SCHEMA_VERSION,
      kind: "framework.example",
      status: "ok",
      compatibility: AGENTPLANE_PROTOCOL_COMPATIBILITY,
      data: { ok: true },
    });
  });

  it("builds additive error results without losing machine-readable error details", () => {
    const result = buildProtocolErrorResult({
      kind: "framework.example",
      error: {
        code: "E_EXAMPLE",
        message: "Example failure",
        retryable: false,
        details: { phase: "verify" },
      },
    });

    expect(result).toEqual({
      schema_version: AGENTPLANE_PROTOCOL_SCHEMA_VERSION,
      kind: "framework.example",
      status: "error",
      compatibility: AGENTPLANE_PROTOCOL_COMPATIBILITY,
      error: {
        code: "E_EXAMPLE",
        message: "Example failure",
        retryable: false,
        details: { phase: "verify" },
      },
    });
  });

  it("wraps framework explain payloads in a stable protocol surface", () => {
    const explain = buildFrameworkExplainFixture();
    const protocol = buildFrameworkProtocolSurface({ explain });

    expect(protocol.explain).toMatchObject({
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
          task_intake: {
            precedence: {
              extension_layer: "recipes",
            },
          },
        },
      },
    });
  });
});
