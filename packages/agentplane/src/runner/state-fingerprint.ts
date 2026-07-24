import path from "node:path";

import {
  buildStateFingerprint,
  type StateFingerprint,
  type StateFingerprintComponentInput,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import type { TaskData } from "../backends/task-backend.js";
import { loadTaskFromContext, type CommandContext } from "../commands/shared/task-backend.js";
import { captureGitSnapshot, type GitSnapshot } from "./observation/git-snapshot.js";
import type { RunnerContextBundle } from "./types.js";

export const RUNNER_STATE_FINGERPRINT_POLICY = {
  required_components: ["task", "git", "backend_projection", "policy", "blueprint", "authority"],
  provider: {
    required: false,
    unavailable: "allow_if_unchanged",
  },
} as const satisfies StateFingerprintPolicy;

export type RunnerStateFingerprintProbes = {
  load_task?: () => Promise<TaskData | null>;
  capture_git?: () => Promise<GitSnapshot>;
};

function runnerTaskId(bundle: RunnerContextBundle): string {
  const taskId = bundle.task?.task_id ?? bundle.target.task_id;
  if (!taskId) {
    throw new Error("Runner state fingerprint requires a task id.");
  }
  return taskId;
}

function unavailableComponent(source: string, reason_code: string): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source,
    reason_code,
  };
}

function providerComponent(task: TaskData | null): StateFingerprintComponentInput {
  if (!task) {
    return unavailableComponent("task_sync_projection", "provider_task_projection_unavailable");
  }
  const sync = task.sync;
  if (!sync || sync.external_refs.length === 0) {
    return {
      state: "missing",
      source: "task_sync_projection",
      reason_code: "provider_not_applicable",
    };
  }
  const freshness = sync.freshness;
  if (freshness?.stale === true) {
    return unavailableComponent("task_sync_projection", "provider_projection_stale");
  }
  if (
    freshness?.provider_revision ||
    freshness?.projection_sha256 ||
    freshness?.source_revision !== undefined
  ) {
    return {
      state: "present",
      source: "task_sync_projection",
      value: {
        external_refs: sync.external_refs,
        provider_revision: freshness.provider_revision ?? null,
        projection_sha256: freshness.projection_sha256 ?? null,
        source_revision: freshness.source_revision ?? null,
        projected_at: freshness.projected_at ?? null,
      },
    };
  }
  return unavailableComponent("task_sync_projection", "provider_freshness_unavailable");
}

function gitComponent(
  snapshot: GitSnapshot,
  preparedHeadCommit: string | null,
): StateFingerprintComponentInput {
  if (snapshot.state !== "available" || !snapshot.snapshot_sha256) {
    return unavailableComponent("git_snapshot", "git_snapshot_unavailable");
  }
  return {
    state: "present",
    source: "git_snapshot",
    value: {
      repository_root: snapshot.repository_root,
      prepared_head_commit: preparedHeadCommit,
      observed_head_commit: snapshot.head_commit,
      worktree_snapshot_sha256: snapshot.snapshot_sha256,
      dirty_paths: snapshot.dirty_paths,
      excluded_paths: snapshot.excluded_paths,
    },
  };
}

async function observeTask(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  probes?: RunnerStateFingerprintProbes;
}): Promise<TaskData | null> {
  try {
    return await (opts.probes?.load_task
      ? opts.probes.load_task()
      : loadTaskFromContext({
          ctx: opts.ctx,
          taskId: runnerTaskId(opts.bundle),
        }));
  } catch {
    return null;
  }
}

async function observeGit(opts: {
  ctx: CommandContext;
  probes?: RunnerStateFingerprintProbes;
}): Promise<GitSnapshot> {
  if (opts.probes?.capture_git) return await opts.probes.capture_git();
  return await captureGitSnapshot({
    repository_root: opts.ctx.resolvedProject.gitRoot,
  });
}

function backendConfigPath(opts: { repositoryRoot: string; configPath: string }): string {
  return path.relative(opts.repositoryRoot, opts.configPath).split(path.sep).join("/");
}

function buildRunnerStateFingerprint(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  task: TaskData | null;
  git: GitSnapshot;
  prepared: boolean;
}): StateFingerprint {
  const taskId = runnerTaskId(opts.bundle);
  const repositoryRoot = opts.prepared
    ? opts.bundle.repository.git_root
    : opts.ctx.resolvedProject.gitRoot;
  const observedBackendId = opts.prepared ? opts.bundle.repository.backend_id : opts.ctx.backendId;
  const observedBackendConfigPath = backendConfigPath({
    repositoryRoot,
    configPath: opts.prepared
      ? opts.bundle.repository.backend_config_path
      : opts.ctx.backendConfigPath,
  });
  const policyPrompts = opts.bundle.base_prompts
    .filter((prompt) => ["system", "policy", "profile"].includes(prompt.role))
    .map((prompt) => ({
      id: prompt.id,
      role: prompt.role,
      source: prompt.source ?? null,
      priority: prompt.priority,
      content: prompt.content,
    }));
  const blueprint = opts.bundle.blueprint;

  return buildStateFingerprint({
    task_id: taskId,
    components: {
      task: opts.task
        ? {
            state: "present",
            source: "task_backend",
            value: {
              id: opts.task.id,
              revision: opts.task.revision ?? null,
              projection: opts.task,
            },
          }
        : unavailableComponent("task_backend", "task_state_unavailable"),
      git: gitComponent(
        opts.git,
        opts.prepared ? (opts.bundle.repository.head_commit ?? null) : opts.git.head_commit,
      ),
      backend_projection: opts.task
        ? {
            state: "present",
            source: "task_backend_projection",
            value: {
              backend_id: observedBackendId,
              backend_config_path: observedBackendConfigPath,
              capabilities: opts.ctx.taskBackend.capabilities,
              task_projection: opts.task,
            },
          }
        : unavailableComponent("task_backend_projection", "backend_projection_unavailable"),
      policy: {
        state: "present",
        source: "runner_policy_resolution",
        value: {
          prompts: policyPrompts,
          policy_modules: blueprint?.policyModules ?? [],
        },
      },
      blueprint: blueprint
        ? {
            state: "present",
            source: "blueprint_resolver",
            value: blueprint,
          }
        : {
            state: "missing",
            source: "blueprint_resolver",
            reason_code: "blueprint_not_resolved",
          },
      knowledge: {
        state: "missing",
        source: "knowledge_projection",
        reason_code: "knowledge_projection_not_resolved",
      },
      provider: providerComponent(opts.task),
      authority: {
        state: "present",
        source: "runner_authority_resolution",
        value: {
          sandbox_policy: opts.bundle.execution.sandbox_policy ?? null,
          write_scope: opts.bundle.execution.write_scope ?? null,
          approvals: opts.bundle.execution.approvals ?? null,
        },
      },
    },
  });
}

export async function captureRunnerPreparationGitSnapshot(opts: {
  ctx: CommandContext;
  probes?: RunnerStateFingerprintProbes;
}): Promise<GitSnapshot> {
  return await observeGit(opts);
}

export function buildPreparedRunnerStateFingerprint(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  git: GitSnapshot;
}): StateFingerprint {
  return buildRunnerStateFingerprint({
    ...opts,
    task: opts.bundle.task?.data ?? null,
    prepared: true,
  });
}

export async function captureRunnerStateFingerprint(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  probes?: RunnerStateFingerprintProbes;
}): Promise<StateFingerprint> {
  // Backend reads can update local cache/WAL files. Observe them before Git so
  // the Git snapshot cannot race those read-side effects.
  const task = await observeTask(opts);
  const git = await observeGit({ ctx: opts.ctx, probes: opts.probes });
  return buildRunnerStateFingerprint({
    ctx: opts.ctx,
    bundle: opts.bundle,
    task,
    git,
    prepared: false,
  });
}
