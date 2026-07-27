import path from "node:path";

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
import {
  isExcluded,
  normalizeExcludedRoots,
  sha256,
  sortFingerprints,
  sortIndexEntries,
  sortStatusEntries,
  stableJson,
  statusEntryPaths,
  uniqSorted,
} from "./observation/git-snapshot/common.js";
import { captureGitSnapshot, type GitSnapshot } from "./observation/git-snapshot.js";
import {
  observeLiveRunnerStateComponents,
  observePreparedRunnerStateComponents,
  type RunnerStateFingerprintComponentProbes,
  type RunnerStateFingerprintObservedComponents,
} from "./state-fingerprint-observation.js";
import type { RunnerContextBundle } from "./types.js";

export const RUNNER_STATE_FINGERPRINT_POLICY = {
  required_components: [
    "task",
    "git",
    "backend_projection",
    "policy",
    "blueprint",
    "knowledge",
    "authority",
  ],
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
  const taskId = bundle.task?.metadata.task_id ?? bundle.target.task_id;
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
  semanticProjectionPaths: readonly string[],
): StateFingerprintComponentInput {
  if (snapshot.state !== "available" || !snapshot.snapshot_sha256) {
    return unavailableComponent("git_snapshot", "git_snapshot_unavailable");
  }
  const excludedPaths = normalizeExcludedRoots(snapshot.repository_root, semanticProjectionPaths);
  const statusEntries = sortStatusEntries(
    snapshot.status_entries.filter((entry) =>
      statusEntryPaths(entry).some((entryPath) => !isExcluded(entryPath, excludedPaths)),
    ),
  );
  const indexEntries = sortIndexEntries(
    snapshot.index_entries.filter((entry) => !isExcluded(entry.path, excludedPaths)),
  );
  const pathFingerprints = sortFingerprints(
    snapshot.path_fingerprints.filter((entry) => !isExcluded(entry.path, excludedPaths)),
  );
  const dirtyPaths = uniqSorted(
    statusEntries
      .flatMap((entry) => statusEntryPaths(entry))
      .filter((entryPath) => !isExcluded(entryPath, excludedPaths)),
  );
  const residualSnapshotSha256 = sha256(
    stableJson({
      schema_version: 1,
      projection: "runner_residual_source_tree",
      status_entries: statusEntries,
      index_entries: indexEntries,
      path_fingerprints: pathFingerprints,
    }),
  );
  return {
    state: "present",
    source: "git_snapshot",
    value: {
      repository_root: snapshot.repository_root,
      projection: "runner_residual_source_tree",
      residual_snapshot_sha256: residualSnapshotSha256,
      dirty_paths: dirtyPaths,
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
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  components: RunnerStateFingerprintObservedComponents;
  git: GitSnapshot;
}): StateFingerprint {
  const { task_revision: taskRevision, ...components } = opts.components;
  const semanticProjectionPaths = runnerSemanticProjectionPaths({
    ctx: opts.ctx,
    bundle: opts.bundle,
    components: opts.components,
  });
  return buildStateFingerprint({
    task_id: runnerTaskId(opts.bundle),
    task_revision: taskRevision,
    git_head: opts.git.head_commit,
    worktree: opts.git.repository_root,
    components: {
      ...components,
      git: gitComponent(opts.git, semanticProjectionPaths),
    },
  });
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function componentValue(component: StateFingerprintComponentInput): Record<string, unknown> | null {
  return component.state === "present" ? recordValue(component.value) : null;
}

function repositoryPath(root: string, candidate: unknown): string | null {
  if (typeof candidate !== "string" || candidate.trim().length === 0) return null;
  if (
    candidate.startsWith("bundled:") ||
    candidate.startsWith("runtime:") ||
    candidate.startsWith("recipe:")
  ) {
    return null;
  }
  const absolute = path.isAbsolute(candidate)
    ? path.resolve(candidate)
    : path.resolve(root, candidate);
  const relative = path.relative(root, absolute);
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    return null;
  }
  return relative.split(path.sep).join("/");
}

function addRepositoryPath(paths: Set<string>, root: string, candidate: unknown): void {
  const relative = repositoryPath(root, candidate);
  if (relative) paths.add(relative);
}

function activeTaskReadmePath(opts: { ctx: CommandContext; bundle: RunnerContextBundle }): string {
  const backend = opts.ctx.taskBackend as CommandContext["taskBackend"] & {
    root?: unknown;
    cache?: { root?: unknown };
  };
  const backendRoot =
    typeof backend.root === "string"
      ? backend.root
      : typeof backend.cache?.root === "string"
        ? backend.cache.root
        : null;
  if (backendRoot) {
    return path.join(path.resolve(backendRoot), runnerTaskId(opts.bundle), "README.md");
  }
  return (
    opts.bundle.task?.readme_path ??
    path.join(
      opts.ctx.resolvedProject.gitRoot,
      opts.ctx.config.paths.workflow_dir,
      runnerTaskId(opts.bundle),
      "README.md",
    )
  );
}

function runtimeBackendStatePath(ctx: CommandContext): string | null {
  const backend = ctx.taskBackend as CommandContext["taskBackend"] & { statePath?: unknown };
  return typeof backend.statePath === "string" && backend.statePath.trim().length > 0
    ? backend.statePath
    : null;
}

function addPolicyProjectionPaths(opts: {
  paths: Set<string>;
  repositoryRoot: string;
  prompts: unknown;
  modules: unknown;
}): void {
  if (Array.isArray(opts.prompts)) {
    for (const prompt of opts.prompts) {
      const value = recordValue(prompt);
      if (!value || (value.role !== "policy" && value.role !== "system")) continue;
      addRepositoryPath(opts.paths, opts.repositoryRoot, value.source);
    }
  }
  if (Array.isArray(opts.modules)) {
    for (const module of opts.modules) {
      const value = recordValue(module);
      if (value?.state !== "present") continue;
      addRepositoryPath(opts.paths, opts.repositoryRoot, value.path);
    }
  }
}

function runnerSemanticProjectionPaths(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  components: RunnerStateFingerprintObservedComponents;
}): string[] {
  const repositoryRoot = opts.ctx.resolvedProject.gitRoot;
  const paths = new Set<string>();

  addRepositoryPath(
    paths,
    repositoryRoot,
    activeTaskReadmePath({ ctx: opts.ctx, bundle: opts.bundle }),
  );

  const backend = componentValue(opts.components.backend_projection);
  addRepositoryPath(paths, repositoryRoot, opts.ctx.backendConfigPath);
  addRepositoryPath(paths, repositoryRoot, opts.bundle.repository.backend_config_path);
  addRepositoryPath(paths, repositoryRoot, backend?.backend_config_path);
  addRepositoryPath(paths, repositoryRoot, runtimeBackendStatePath(opts.ctx));
  addRepositoryPath(paths, repositoryRoot, backend?.backend_state_path);

  const policy = componentValue(opts.components.policy);
  addPolicyProjectionPaths({
    paths,
    repositoryRoot,
    prompts: policy?.prompts,
    modules: policy?.policy_modules,
  });
  addPolicyProjectionPaths({
    paths,
    repositoryRoot,
    prompts: opts.bundle.base_prompts,
    modules: opts.bundle.blueprint?.policyModules.map((modulePath) => ({
      path: modulePath,
      state: "present",
    })),
  });

  const knowledge = componentValue(opts.components.knowledge);
  addRepositoryPath(paths, repositoryRoot, ".agentplane/context/manifest.lock.json");
  addRepositoryPath(paths, repositoryRoot, knowledge?.path);

  return [...paths].toSorted();
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
    ctx: opts.ctx,
    bundle: opts.bundle,
    components,
    git: opts.git,
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
    ctx: opts.ctx,
    bundle: opts.bundle,
    components,
    git,
  });
}
