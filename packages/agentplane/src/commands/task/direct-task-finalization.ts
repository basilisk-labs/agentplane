import { mkdir } from "node:fs/promises";
import path from "node:path";

import { runProcess } from "@agentplaneorg/core/process";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { cmdFinish } from "./finish-command.js";
import type { CommandContext } from "../shared/task-backend.js";

export type DirectImplementationCommit =
  | { status: "ready"; commit: string }
  | { status: "scope_violation"; reason: string; paths: string[] }
  | { status: "missing"; reason: string };

export type DirectRepositoryStatus = {
  command: "git status --short --untracked-files=all";
  lines: string[];
};

export type DirectImplementationEvidence = {
  artifact_path: string;
  implementation_commit: string;
};

export async function readDirectTaskHead(cwd: string): Promise<string | null> {
  const result = await runProcess({
    command: "git",
    args: ["rev-parse", "HEAD"],
    cwd,
    reject: false,
  });
  const commit = result.exitCode === 0 ? result.stdout.trim() : "";
  return commit || null;
}

function outputLines(stdout: string): string[] {
  return stdout
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

async function runGit(opts: { cwd: string; args: string[] }) {
  return await runProcess({
    command: "git",
    args: opts.args,
    cwd: opts.cwd,
    reject: false,
  });
}

/** Captures the complete working-tree audit used to classify concurrent artifacts. */
export async function readDirectRepositoryStatus(
  cwd: string,
): Promise<DirectRepositoryStatus | null> {
  const result = await runGit({ cwd, args: ["status", "--short", "--untracked-files=all"] });
  if (result.exitCode !== 0) return null;
  return {
    command: "git status --short --untracked-files=all",
    lines: outputLines(result.stdout),
  };
}

function pathAllowed(pathValue: string, allowedPaths: readonly string[]): boolean {
  return allowedPaths.some(
    (allowedPath) =>
      allowedPath === "." || pathValue === allowedPath || pathValue.startsWith(`${allowedPath}/`),
  );
}

function normalizedObservedPaths(paths: readonly string[]): string[] {
  return [
    ...new Set(
      paths.flatMap((entry) => {
        const value = entry.trim().replaceAll("\\", "/");
        if (!value || path.posix.isAbsolute(value) || value === ".." || value.startsWith("../")) {
          return [];
        }
        return [value];
      }),
    ),
  ].toSorted();
}

function normalizedAuthorityPaths(opts: {
  cwd: string;
  allowed_paths: readonly string[];
}): string[] {
  return [
    ...new Set(
      opts.allowed_paths.flatMap((raw) => {
        const value = raw.trim();
        if (!value) return [];
        const relative = path
          .relative(opts.cwd, path.resolve(opts.cwd, value))
          .replaceAll("\\", "/");
        if (relative.startsWith("../") || path.posix.isAbsolute(relative)) return [];
        return [relative === "" ? "." : relative.replace(/\/$/u, "")];
      }),
    ),
  ].toSorted();
}

async function committedPaths(opts: {
  cwd: string;
  base: string;
  commit: string;
}): Promise<string[] | null> {
  const result = await runProcess({
    command: "git",
    args: ["diff", "--name-only", "--diff-filter=ACDMRTUXB", `${opts.base}..${opts.commit}`],
    cwd: opts.cwd,
    reject: false,
  });
  if (result.exitCode !== 0) return null;
  return result.stdout
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function resolveDirectImplementationCommit(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  execution_base_commit: string | null;
  allowed_paths: readonly string[];
  observed_changed_paths: readonly string[] | null;
}): Promise<DirectImplementationCommit> {
  if (!opts.execution_base_commit) {
    return {
      status: "missing",
      reason: "The direct supervisor could not observe the pre-execution commit.",
    };
  }
  const commit = await readDirectTaskHead(opts.cwd);
  if (!commit || commit === opts.execution_base_commit) {
    return {
      status: "missing",
      reason:
        "The EXECUTOR did not leave a distinct committed implementation for direct finalization.",
    };
  }
  const approvedPaths = normalizedAuthorityPaths({
    cwd: opts.cwd,
    allowed_paths: opts.allowed_paths,
  });
  if (approvedPaths.length === 0) {
    return {
      status: "scope_violation",
      paths: [],
      reason: "The direct EXECUTOR work order did not declare an approved writable scope.",
    };
  }
  const changed = await committedPaths({
    cwd: opts.cwd,
    base: opts.execution_base_commit,
    commit,
  });
  if (!changed) {
    return {
      status: "missing",
      reason: "The direct supervisor could not inspect the committed implementation paths.",
    };
  }
  if (changed.length === 0) {
    return {
      status: "missing",
      reason: "The EXECUTOR commit contains no implementation paths after the execution baseline.",
    };
  }
  const scopeViolations = changed.filter((entry) => !pathAllowed(entry, approvedPaths));
  if (scopeViolations.length > 0) {
    return {
      status: "scope_violation",
      paths: scopeViolations,
      reason: `The EXECUTOR committed paths outside its approved scope: ${scopeViolations.join(", ")}.`,
    };
  }
  // A runner may commit before the supervisor captures its post-process
  // filesystem snapshot. Treat that snapshot only as an additional check for
  // uncommitted writes; the execution-base Git range is the authoritative,
  // immutable implementation scope.
  const observedPaths = normalizedObservedPaths(opts.observed_changed_paths ?? []);
  const taskArtifactPrefix = `${opts.command.config.paths.workflow_dir}/${opts.task_id}/`;
  const observedNonTaskPaths = observedPaths.filter(
    (entry) => !entry.startsWith(taskArtifactPrefix),
  );
  const observedScopeViolations = observedNonTaskPaths.filter(
    (entry) => !pathAllowed(entry, approvedPaths),
  );
  if (observedScopeViolations.length > 0) {
    return {
      status: "scope_violation",
      paths: observedScopeViolations,
      reason:
        "The supervisor-observed EXECUTOR delta escaped its approved scope: " +
        `${observedScopeViolations.join(", ")}.`,
    };
  }
  const committed = new Set(changed);
  const uncommittedObservedPaths = observedNonTaskPaths.filter((entry) => !committed.has(entry));
  if (uncommittedObservedPaths.length > 0) {
    return {
      status: "missing",
      reason:
        "The EXECUTOR left supervisor-observed paths uncommitted: " +
        `${uncommittedObservedPaths.join(", ")}.`,
    };
  }
  return { status: "ready", commit };
}

/**
 * Freezes the CLI-owned Git proof before EVALUATOR review. This separates
 * process evidence from an EXECUTOR's semantic report and preserves the
 * complete status audit needed to classify concurrent untracked artifacts.
 */
export async function recordDirectImplementationEvidence(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  execution_base_commit: string;
  implementation_commit: string;
  execution_baseline_status: DirectRepositoryStatus | null;
}): Promise<DirectImplementationEvidence | null> {
  if (!opts.execution_baseline_status) return null;
  const [commitDiffCheck, stagedDiffCheck, commitPaths, finalStatus] = await Promise.all([
    runGit({
      cwd: opts.cwd,
      args: ["diff", "--check", `${opts.execution_base_commit}..${opts.implementation_commit}`],
    }),
    runGit({ cwd: opts.cwd, args: ["diff", "--cached", "--check"] }),
    runGit({
      cwd: opts.cwd,
      args: [
        "diff",
        "--name-status",
        "--diff-filter=ACDMRTUXB",
        `${opts.execution_base_commit}..${opts.implementation_commit}`,
      ],
    }),
    readDirectRepositoryStatus(opts.cwd),
  ]);
  if (
    commitDiffCheck.exitCode !== 0 ||
    stagedDiffCheck.exitCode !== 0 ||
    commitPaths.exitCode !== 0 ||
    !finalStatus
  ) {
    return null;
  }
  const baseline = new Set(opts.execution_baseline_status.lines);
  const final = new Set(finalStatus.lines);
  const classification = [
    ...finalStatus.lines.map((line) => ({
      line,
      classification: baseline.has(line)
        ? "preexisting_before_execution"
        : "introduced_during_execution",
    })),
    ...opts.execution_baseline_status.lines
      .filter((line) => !final.has(line))
      .map((line) => ({ line, classification: "removed_during_execution" })),
  ];
  const relative = path.join(
    opts.command.config.paths.workflow_dir,
    opts.task_id,
    "supervision",
    "implementation-evidence.json",
  );
  const absolute = path.join(opts.command.resolvedProject.gitRoot, relative);
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeJsonStableIfChanged(absolute, {
    schema_version: 1,
    kind: "direct_task_implementation_evidence",
    task_id: opts.task_id,
    execution_base_commit: opts.execution_base_commit,
    implementation_commit: opts.implementation_commit,
    checks: [
      {
        id: "committed-diff-check",
        command: `git diff --check ${opts.execution_base_commit}..${opts.implementation_commit}`,
        result: "pass",
        stdout: outputLines(commitDiffCheck.stdout),
      },
      {
        id: "staged-diff-check",
        command: "git diff --cached --check",
        result: "pass",
        stdout: outputLines(stagedDiffCheck.stdout),
      },
      {
        id: "commit-paths",
        command: `git diff --name-status --diff-filter=ACDMRTUXB ${opts.execution_base_commit}..${opts.implementation_commit}`,
        result: "pass",
        stdout: outputLines(commitPaths.stdout),
      },
      {
        id: "final-repository-status",
        command: finalStatus.command,
        result: "pass",
        stdout: finalStatus.lines,
      },
    ],
    repository_status: {
      baseline: opts.execution_baseline_status.lines,
      final: finalStatus.lines,
      unchanged_from_execution_baseline: finalStatus.lines.filter((line) => baseline.has(line)),
      introduced_after_execution_baseline: finalStatus.lines.filter((line) => !baseline.has(line)),
      removed_after_execution_baseline: opts.execution_baseline_status.lines.filter(
        (line) => !final.has(line),
      ),
      classification,
    },
  });
  return { artifact_path: relative, implementation_commit: opts.implementation_commit };
}

export async function finishDirectTask(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  implementation_commit: string;
}): Promise<number> {
  return await cmdFinish({
    ctx: opts.command,
    cwd: opts.ctx.cwd,
    rootOverride: opts.ctx.rootOverride,
    taskIds: [opts.task_id],
    author: "SUPERVISOR",
    body: "Verified: direct CLI supervision observed the EXECUTOR receipt, ran every declared check, and recorded an independent EVALUATOR pass before finalization.",
    result:
      "Direct CLI supervision completed with observed EXECUTOR, check, and EVALUATOR evidence.",
    commit: opts.implementation_commit,
    implementationCommit: opts.implementation_commit,
    breaking: false,
    force: false,
    commitFromComment: false,
    commitAllow: [],
    commitAutoAllow: false,
    commitAllowTasks: true,
    commitRequireClean: false,
    statusCommit: false,
    statusCommitAllow: [],
    statusCommitAutoAllow: false,
    statusCommitRequireClean: false,
    confirmStatusCommit: false,
    quiet: true,
  });
}
