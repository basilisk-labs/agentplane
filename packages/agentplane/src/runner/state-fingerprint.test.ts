import {
  StateFingerprintPreconditionError,
  assertStateFingerprintPrecondition,
  type StateFingerprintComponentName,
} from "@agentplaneorg/core/schemas";
import { makeTaskBackendDouble, makeTaskCommandContext } from "@agentplane/testkit/task";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../backends/task-backend.js";
import type { GitSnapshot } from "./observation/git-snapshot.js";
import {
  buildPreparedRunnerStateFingerprint,
  captureRunnerStateFingerprint,
  RUNNER_STATE_FINGERPRINT_POLICY,
} from "./state-fingerprint.js";
import type { RunnerContextBundle } from "./types.js";

function task(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "T-1",
    title: "Fingerprint task",
    description: "Capture current state",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    revision: 3,
    depends_on: [],
    tags: [],
    verify: [],
    ...overrides,
  };
}

function gitSnapshot(overrides: Partial<GitSnapshot> = {}): GitSnapshot {
  return {
    schema_version: 1,
    provenance: "supervisor_observed",
    state: "available",
    repository_root: "/repo",
    captured_at: "2026-07-24T00:00:00.000Z",
    head_commit: "a".repeat(40),
    snapshot_sha256: `sha256:${"1".repeat(64)}`,
    dirty_paths: [],
    excluded_paths: [],
    status_entries: [],
    index_entries: [],
    path_fingerprints: [],
    errors: [],
    ...overrides,
  };
}

function bundle(taskData = task()): RunnerContextBundle {
  return {
    schema_version: 1,
    runner_api_version: "1",
    target: { kind: "task", task_id: taskData.id },
    base_prompts: [
      {
        id: "gateway",
        role: "policy",
        source: "AGENTS.md",
        priority: 10,
        content: "Policy",
      },
    ],
    repository: {
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      backend_id: "local",
      backend_config_path: "/repo/.agentplane/backends/local/backend.json",
      head_commit: "a".repeat(40),
    },
    task: {
      task_id: taskData.id,
      data: taskData,
      frontmatter: {},
      doc: "",
      sections: {},
      comments: [],
      events: [],
    },
    blueprint: {
      schemaVersion: 1,
      blueprintId: "code.branch_pr",
      blueprintVersion: 1,
      title: "Branch PR code change",
      taskIntent: {},
      whySelected: [],
      states: [],
      requiredEvidence: [],
      policyModules: [".agentplane/policy/dod.code.md"],
      allowedCommands: [],
      contextBudget: { maxPolicyModules: 4, rationale: "test" },
      contextManifest: [],
      acceptedRecipeExtensions: [],
      rejectedRecipeExtensions: [],
      stopReasons: [],
    },
    execution: {
      adapter_id: "codex",
      mode: "execute",
      run_id: "run-1",
      artifact_paths: {
        run_dir: "/run",
        bundle_path: "/run/bundle.json",
        blueprint_plan_path: "/run/blueprint.json",
        blueprint_execution_plan_path: "/run/blueprint-execution.json",
        blueprint_execution_state_path: "/run/blueprint-state.json",
        context_manifest_path: "/run/context.json",
        bootstrap_path: "/run/bootstrap.md",
        state_path: "/run/state.json",
        events_path: "/run/events.jsonl",
        result_path: "/run/result.json",
        receipt_path: "/run/receipt.json",
        trace_path: "/run/trace.jsonl",
        stderr_path: "/run/stderr.log",
      },
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 65_536,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 60_000,
        idle_ms: 30_000,
        terminate_grace_ms: 1000,
      },
      approvals: {
        require_plan: false,
        require_verify: false,
        require_network: false,
      },
    },
  };
}

function context(taskData: TaskData) {
  const backend = makeTaskBackendDouble({
    id: "local",
    getTask: () => Promise.resolve(taskData),
  });
  return makeTaskCommandContext({
    taskBackend: backend,
    overrides: {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local/backend.json",
    },
  });
}

function capturePreconditionError(action: () => unknown): StateFingerprintPreconditionError {
  let observed: unknown;
  try {
    action();
  } catch (error) {
    observed = error;
  }
  expect(observed).toBeInstanceOf(StateFingerprintPreconditionError);
  if (!(observed instanceof StateFingerprintPreconditionError)) {
    throw new Error("Expected a StateFingerprintPreconditionError.");
  }
  return observed;
}

describe("runner state fingerprint", () => {
  it("captures deterministic task, Git, backend, policy, blueprint, and authority inputs", async () => {
    const taskData = task();
    const ctx = context(taskData);
    const runnerBundle = bundle(taskData);
    const probes = {
      load_task: () => Promise.resolve(taskData),
      capture_git: () => Promise.resolve(gitSnapshot()),
    };

    const first = await captureRunnerStateFingerprint({ ctx, bundle: runnerBundle, probes });
    const second = await captureRunnerStateFingerprint({ ctx, bundle: runnerBundle, probes });

    expect(second).toEqual(first);
    expect(first.components).toMatchObject({
      task: { state: "present", source: "task_backend" },
      git: { state: "present", source: "git_snapshot" },
      backend_projection: { state: "present", source: "task_backend_projection" },
      policy: { state: "present", source: "runner_policy_resolution" },
      blueprint: { state: "present", source: "blueprint_resolver" },
      knowledge: {
        state: "missing",
        reason_code: "knowledge_projection_not_resolved",
      },
      provider: { state: "missing", reason_code: "provider_not_applicable" },
      authority: { state: "present", source: "runner_authority_resolution" },
    });
  });

  it("binds the expected task projection to the prepared bundle, not a later live task", async () => {
    const preparedTask = task({ title: "Prepared title", revision: 3 });
    const changedTask = task({ title: "Changed title", revision: 4 });
    const runnerBundle = bundle(preparedTask);
    const prepared = buildPreparedRunnerStateFingerprint({
      ctx: context(changedTask),
      bundle: runnerBundle,
      git: gitSnapshot(),
    });
    const current = await captureRunnerStateFingerprint({
      ctx: context(changedTask),
      bundle: runnerBundle,
      probes: {
        load_task: () => Promise.resolve(changedTask),
        capture_git: () => Promise.resolve(gitSnapshot()),
      },
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_stale");
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
      "task",
      "backend_projection",
    ]);
  });

  it("rejects a Git HEAD race between initial observation and bundle assembly", async () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);
    runnerBundle.repository.head_commit = "b".repeat(40);
    const racedSnapshot = gitSnapshot({ head_commit: "a".repeat(40) });
    const currentSnapshot = gitSnapshot({ head_commit: "b".repeat(40) });
    const prepared = buildPreparedRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: runnerBundle,
      git: racedSnapshot,
    });
    const current = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: runnerBundle,
      probes: {
        load_task: () => Promise.resolve(taskData),
        capture_git: () => Promise.resolve(currentSnapshot),
      },
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_stale");
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual(["git"]);
  });

  it("records provider unavailability as bounded policy input", async () => {
    const taskData = task({
      sync: {
        version: 1,
        external_refs: [{ provider: "github", remote_id: "123" }],
        field_policies: {},
        conflicts: [],
      },
    });
    const fingerprint = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: bundle(taskData),
      probes: {
        load_task: () => Promise.resolve(taskData),
        capture_git: () => Promise.resolve(gitSnapshot()),
      },
    });

    expect(fingerprint.components.provider).toMatchObject({
      state: "unavailable",
      reason_code: "provider_freshness_unavailable",
    });
    expect(
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    ).toMatchObject({
      status: "fresh_with_bounded_uncertainty",
      reason_code: "state_fingerprint_provider_uncertainty_allowed",
    });
  });

  it("fails closed when a required live observation is unavailable", async () => {
    const taskData = task();
    const fingerprint = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: bundle(taskData),
      probes: {
        load_task: () => Promise.resolve(taskData),
        capture_git: () =>
          Promise.resolve(
            gitSnapshot({
              state: "unavailable",
              snapshot_sha256: null,
              errors: [
                {
                  operation: "git_status",
                  message: "failed",
                  code: 1,
                  stderr: null,
                },
              ],
            }),
          ),
      },
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_required_component_unavailable");
    expect(error.diagnostic.unavailable_required_components).toEqual([
      "git" satisfies StateFingerprintComponentName,
    ]);
  });
});
