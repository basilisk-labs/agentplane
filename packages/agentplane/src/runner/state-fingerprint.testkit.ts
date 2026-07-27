import { StateFingerprintPreconditionError } from "@agentplaneorg/core/schemas";
import { makeTaskBackendDouble, makeTaskCommandContext } from "@agentplane/testkit/task";

import type { TaskData } from "../backends/task-backend.js";
import type { GitSnapshot } from "./observation/git-snapshot.js";
import type { RunnerStateFingerprintProbes } from "./state-fingerprint.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerTaskContextCompaction,
} from "./types.js";

const DEFAULT_APPROVALS: NonNullable<RunnerContextBundle["execution"]["approvals"]> = {
  require_plan: false,
  require_verify: false,
  require_network: false,
  require_force: false,
};

function emptyTaskEpisodeCompaction(): RunnerTaskContextCompaction {
  const emptyEntry = {
    original_bytes: 0,
    emitted_bytes: 0,
    original_count: 0,
    emitted_count: 0,
    truncated: false,
  };
  return {
    sections: { ...emptyEntry },
    comments: { ...emptyEntry },
    events: { ...emptyEntry },
    omissions: [],
    serialized: { source_bytes: 0, emitted_bytes: 0, duplicate_bytes_removed: 0 },
  };
}

export function task(overrides: Partial<TaskData> = {}): TaskData {
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

export function gitSnapshot(overrides: Partial<GitSnapshot> = {}): GitSnapshot {
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

export function bundle(taskData = task()): RunnerContextBundle {
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
    framework_explain: {
      harness: {
        task: {
          doc_sections: ["Summary"],
          required_doc_sections: ["Summary"],
          verify_required_tags: ["code"],
          verify_steps_required_tags: [],
          verify_steps_required_primary: ["code"],
          verification_required_primary: ["code"],
          spike_tag: "spike",
          enforce_verify_steps_on_plan_approve: true,
          enforce_verify_steps_on_start_without_plan: true,
          comments: {
            start: { prefix: "Start:", min_chars: 40 },
            blocked: { prefix: "Blocked:", min_chars: 40 },
            verified: { prefix: "Verified:", min_chars: 60 },
          },
          closure_commit_requires_approval: false,
        },
      },
    } as NonNullable<RunnerContextBundle["framework_explain"]>,
    repository: {
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      backend_id: "local",
      backend_config_path: "/repo/.agentplane/backends/local/backend.json",
      head_commit: "a".repeat(40),
    },
    task: {
      schema_version: 1,
      kind: "agentplane.task_episode_view",
      metadata: {
        task_id: taskData.id,
        revision: taskData.revision ?? null,
        status: taskData.status,
        owner: taskData.owner ?? null,
        priority: taskData.priority ?? null,
        tags: [...(taskData.tags ?? [])],
        task_kind: taskData.task_kind ?? null,
        mutation_scope: taskData.mutation_scope ?? null,
        blueprint_request: taskData.blueprint_request ?? null,
      },
      narrative: {
        title: taskData.title,
        description: taskData.description,
        sections: [],
      },
      verification: { commands: [...taskData.verify] },
      section_policy: { source: "task_document_schema", required_sections: [] },
      history: { comments: [], events: [] },
      compaction: emptyTaskEpisodeCompaction(),
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
    route_decision: {},
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
        require_force: false,
      },
    },
  };
}

export function context(taskData: TaskData) {
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

export function probes(opts: {
  task: TaskData;
  bundle: RunnerContextBundle;
  git?: GitSnapshot;
  components?: Partial<
    Pick<
      RunnerStateFingerprintProbes,
      | "observe_backend_projection"
      | "observe_policy"
      | "observe_blueprint"
      | "observe_knowledge"
      | "observe_authority"
    >
  >;
}): RunnerStateFingerprintProbes {
  return {
    load_task: () => Promise.resolve(opts.task),
    capture_git: () => Promise.resolve(opts.git ?? gitSnapshot()),
    observe_backend_projection: () =>
      Promise.resolve({
        state: "present",
        source: "task_backend_runtime",
        value: {
          backend_id: "local",
          backend_config_path: ".agentplane/backends/local/backend.json",
          backend_config: { state: "present", sha256: `sha256:${"2".repeat(64)}` },
          capabilities: context(opts.task).taskBackend.capabilities,
          projection_revision: null,
          projection_freshness: null,
          remote_projection: null,
        },
      }),
    observe_policy: () =>
      Promise.resolve({
        state: "present",
        source: "runner_policy_resolution",
        value: {
          prompts: opts.bundle.base_prompts,
          policy_modules: [],
        },
      }),
    observe_blueprint: () =>
      Promise.resolve({
        state: "present",
        source: "blueprint_resolver",
        value: opts.bundle.blueprint,
      }),
    observe_knowledge: () =>
      Promise.resolve({
        state: "present",
        source: "context_manifest_lock",
        value: {
          path: ".agentplane/context/manifest.lock.json",
          initialized: false,
          sha256: null,
        },
      }),
    observe_authority: () =>
      Promise.resolve({
        state: "present",
        source: "runner_authority_resolution",
        value: {
          sandbox_policy: opts.bundle.execution.sandbox_policy ?? null,
          write_scope: opts.bundle.execution.write_scope ?? null,
          approvals: opts.bundle.execution.approvals,
        },
      }),
    ...opts.components,
  };
}

export function setResolvedAuthority(
  runnerBundle: RunnerContextBundle,
  approvals = DEFAULT_APPROVALS,
): void {
  runnerBundle.execution.sandbox_policy = {
    requested: "workspace-write",
    source: "role_default",
    role: "CODER",
    authority: {
      danger_full_access_authorized: false,
      provenance: null,
      source: null,
    },
  };
  runnerBundle.execution.write_scope = {
    mutation_scope: "code",
    writable_roots: ["."],
    protected_paths: [],
  };
  runnerBundle.execution.approvals = approvals;
}

export function capturePreconditionError(action: () => unknown): StateFingerprintPreconditionError {
  let observed: unknown;
  try {
    action();
  } catch (error) {
    observed = error;
  }
  if (!(observed instanceof StateFingerprintPreconditionError)) {
    throw new Error("Expected a StateFingerprintPreconditionError.");
  }
  return observed;
}

export function invocation(): RunnerInvocation {
  return {
    adapter_id: "custom",
    run_id: "run-1",
    work_order_id: "work-order-1",
    repository_root: "/repo",
    run_dir: "/run",
    bundle_path: "/run/bundle.json",
    state_path: "/run/state.json",
    events_path: "/run/events.jsonl",
    result_path: "/run/result.json",
    receipt_path: "/run/receipt.json",
    trace_path: "/run/trace.jsonl",
    stderr_path: "/run/stderr.log",
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
    argv: ["custom-runner"],
    env: {},
    dry_run: false,
  };
}
