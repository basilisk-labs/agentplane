import {
  buildStateFingerprint,
  type StateFingerprint,
  type StateFingerprintComponentInput,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import {
  getTaskBackendCapabilities,
  type CommandContext,
} from "../commands/shared/task-backend.js";
import { captureGitSnapshot, type GitSnapshot } from "./observation/git-snapshot.js";
import {
  observeLiveRunnerStateComponents,
  observePreparedRunnerStateComponents,
  type RunnerStateFingerprintComponentProbes,
  type RunnerStateFingerprintObservedComponents,
} from "./state-fingerprint-observation.js";
import type { RunnerContextBundle } from "./types.js";

export const RUNNER_STATE_FINGERPRINT_POLICY = {
  required_components: ["task", "git", "backend_projection", "policy", "blueprint", "authority"],
  provider: {
    required: false,
    unavailable: "allow_if_unchanged",
    reject_reason_codes: ["provider_projection_stale"],
  },
} as const satisfies StateFingerprintPolicy;

export function resolveRunnerStateFingerprintPolicy(ctx: CommandContext): StateFingerprintPolicy {
  return {
    ...RUNNER_STATE_FINGERPRINT_POLICY,
    provider: {
      ...RUNNER_STATE_FINGERPRINT_POLICY.provider,
      required: getTaskBackendCapabilities(ctx).canonical_source === "remote",
    },
  };
}

export type RunnerStateFingerprintProbes = RunnerStateFingerprintComponentProbes & {
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

async function observeGit(opts: {
  ctx: CommandContext;
  probes?: RunnerStateFingerprintProbes;
}): Promise<GitSnapshot> {
  if (opts.probes?.capture_git) return await opts.probes.capture_git();
  return await captureGitSnapshot({
    repository_root: opts.ctx.resolvedProject.gitRoot,
  });
}

function buildRunnerStateFingerprint(opts: {
  bundle: RunnerContextBundle;
  components: RunnerStateFingerprintObservedComponents;
  git: GitSnapshot;
  prepared: boolean;
}): StateFingerprint {
  return buildStateFingerprint({
    task_id: runnerTaskId(opts.bundle),
    components: {
      ...opts.components,
      git: gitComponent(
        opts.git,
        opts.prepared ? (opts.bundle.repository.head_commit ?? null) : opts.git.head_commit,
      ),
    },
  });
}

export async function captureRunnerPreparationGitSnapshot(opts: {
  ctx: CommandContext;
  probes?: RunnerStateFingerprintProbes;
}): Promise<GitSnapshot> {
  return await observeGit(opts);
}

export async function capturePreparedRunnerStateFingerprint(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  git: GitSnapshot;
  probes?: RunnerStateFingerprintProbes;
}): Promise<StateFingerprint> {
  const components = await observePreparedRunnerStateComponents(opts);
  return buildRunnerStateFingerprint({
    bundle: opts.bundle,
    components,
    git: opts.git,
    prepared: true,
  });
}

export async function captureRunnerStateFingerprint(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  probes?: RunnerStateFingerprintProbes;
}): Promise<StateFingerprint> {
  // Resolve every live component before Git. Backend/context reads can update
  // local cache or WAL files, so Git must be the final pre-effect observation.
  const components = await observeLiveRunnerStateComponents(opts);
  const git = await observeGit({ ctx: opts.ctx, probes: opts.probes });
  return buildRunnerStateFingerprint({
    bundle: opts.bundle,
    components,
    git,
    prepared: false,
  });
}
