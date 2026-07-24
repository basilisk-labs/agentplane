import type { TaskData } from "../backends/task-backend.js";
import { normalizeGitPathPrefix } from "../shared/git-path.js";

import { readRecipeRunProfile } from "./adapters/recipe-run-profile.js";
import { normalizeRecipeArtifactPrefixes } from "./result-manifest-policy.js";
import type {
  RunnerDangerFullAccessAuthority,
  RunnerRecipeContext,
  RunnerSandboxMode,
  RunnerSandboxPolicy,
  RunnerWriteScopePolicy,
} from "./types.js";
import {
  RUNNER_DANGER_FULL_ACCESS_SANDBOX,
  RUNNER_READ_ONLY_SANDBOX,
  RUNNER_SANDBOX_MODES,
  RUNNER_WORKSPACE_WRITE_SANDBOX,
} from "./types.js";

const READ_ONLY_ROLES = new Set(["AUDITOR", "EVALUATOR", "REVIEWER"]);

function normalizedRole(owner: string | null | undefined): string {
  const role = owner?.trim();
  return role ? role.toUpperCase() : "EXECUTOR";
}

function roleRequestsReadOnly(task: TaskData | undefined, executionRole: string): boolean {
  if (READ_ONLY_ROLES.has(executionRole)) return true;
  if (task?.mutation_scope === "context" || task?.task_kind === "context") return false;
  if (task?.mutation_scope === "none" || task?.task_kind === "analysis") return true;
  return false;
}

export function isRunnerSandboxMode(value: string): value is RunnerSandboxMode {
  return (RUNNER_SANDBOX_MODES as readonly string[]).includes(value);
}

export function hasExplicitRunnerDangerFullAccessAuthority(
  authority: unknown,
): authority is RunnerDangerFullAccessAuthority {
  if (typeof authority !== "object" || authority === null || Array.isArray(authority)) return false;
  const candidate = authority as Record<string, unknown>;
  return (
    candidate.danger_full_access_authorized === true &&
    candidate.provenance === "explicit_operator" &&
    typeof candidate.source === "string" &&
    candidate.source.trim().length > 0
  );
}

export function resolveRunnerSandboxPolicy(opts: {
  task?: TaskData;
  recipe?: RunnerRecipeContext;
  danger_authority?: RunnerDangerFullAccessAuthority | null;
  execution_role?: string;
  requested_sandbox?: string;
}): RunnerSandboxPolicy {
  const executionRole = normalizedRole(opts.execution_role ?? opts.task?.owner);
  const explicitSandbox = readRecipeRunProfile(opts.recipe)?.sandbox?.trim();
  const requestedSandbox = opts.requested_sandbox?.trim();
  const requested =
    requestedSandbox && requestedSandbox.length > 0
      ? requestedSandbox
      : explicitSandbox && explicitSandbox.length > 0
        ? explicitSandbox
        : roleRequestsReadOnly(opts.task, executionRole)
          ? RUNNER_READ_ONLY_SANDBOX
          : RUNNER_WORKSPACE_WRITE_SANDBOX;
  const dangerAuthorized =
    requested === RUNNER_DANGER_FULL_ACCESS_SANDBOX &&
    hasExplicitRunnerDangerFullAccessAuthority(opts.danger_authority);
  return {
    requested,
    source:
      requestedSandbox && requestedSandbox.length > 0
        ? "cli_override"
        : explicitSandbox
          ? "recipe_run_profile"
          : "role_default",
    role: executionRole,
    authority: {
      danger_full_access_authorized: dangerAuthorized,
      provenance: dangerAuthorized ? opts.danger_authority!.provenance : null,
      source: dangerAuthorized ? opts.danger_authority!.source : null,
    },
  };
}

export function resolveRunnerWriteScopePolicy(opts: {
  sandbox: RunnerSandboxPolicy;
  protected_path_groups: Record<string, readonly string[]>;
  task?: TaskData;
  recipe?: RunnerRecipeContext;
}): RunnerWriteScopePolicy {
  const protectedPaths = new Set<string>();
  for (const group of Object.values(opts.protected_path_groups)) {
    for (const candidate of group) {
      const normalized = normalizeGitPathPrefix(candidate);
      if (normalized) protectedPaths.add(normalized);
    }
  }
  const recipeWritableRoots = normalizeRecipeArtifactPrefixes(
    readRecipeRunProfile(opts.recipe)?.writes_artifacts_to,
    { task_id: opts.task?.id },
  );
  const writableRoots = (() => {
    if (opts.sandbox.requested === RUNNER_READ_ONLY_SANDBOX) return [];
    if (recipeWritableRoots.length > 0) return recipeWritableRoots;
    if (opts.task?.mutation_scope === "context") return [".agentplane/context", "context"];
    if (opts.task?.mutation_scope === "docs") {
      return [
        "CHANGELOG.md",
        "CODE_OF_CONDUCT.md",
        "CONTRIBUTING.md",
        "README.md",
        "SECURITY.md",
        "docs",
      ];
    }
    return ["."];
  })();
  return {
    mutation_scope: opts.task?.mutation_scope ?? null,
    writable_roots: writableRoots,
    protected_paths: [...protectedPaths].toSorted((left, right) => left.localeCompare(right)),
  };
}
