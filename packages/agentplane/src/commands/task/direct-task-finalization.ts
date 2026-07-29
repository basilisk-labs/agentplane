import path from "node:path";

import { runProcess } from "@agentplaneorg/core/process";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { cmdFinish } from "./finish-command.js";
import type { CommandContext } from "../shared/task-backend.js";

export type DirectImplementationCommit =
  | { status: "ready"; commit: string }
  | { status: "scope_violation"; reason: string; paths: string[] }
  | { status: "missing"; reason: string };

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

function statusPaths(output: string): string[] {
  return output
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const candidate = line.slice(3).trim();
      return candidate.includes(" -> ") ? candidate.split(" -> ") : [candidate];
    });
}

function pathAllowed(pathValue: string, allowedPaths: readonly string[]): boolean {
  return allowedPaths.some(
    (allowedPath) =>
      allowedPath === "." || pathValue === allowedPath || pathValue.startsWith(`${allowedPath}/`),
  );
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
}): Promise<DirectImplementationCommit> {
  if (!opts.execution_base_commit) {
    return {
      status: "missing",
      reason: "The direct supervisor could not observe the pre-execution commit.",
    };
  }
  const status = await runProcess({
    command: "git",
    args: ["status", "--porcelain=v1", "--untracked-files=all"],
    cwd: opts.cwd,
    reject: false,
  });
  if (status.exitCode !== 0) {
    return {
      status: "missing",
      reason: "The direct supervisor could not inspect the checkout state.",
    };
  }
  const taskArtifactPrefix = `${opts.command.config.paths.workflow_dir}/${opts.task_id}/`;
  const outsideTaskArtifacts = statusPaths(status.stdout).filter(
    (entry) => !entry.startsWith(taskArtifactPrefix),
  );
  if (outsideTaskArtifacts.length > 0) {
    return {
      status: "missing",
      reason: `The EXECUTOR left uncommitted non-task paths: ${outsideTaskArtifacts.join(", ")}.`,
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
  const scopeViolations = changed.filter((entry) => !pathAllowed(entry, approvedPaths));
  if (scopeViolations.length > 0) {
    return {
      status: "scope_violation",
      paths: scopeViolations,
      reason: `The EXECUTOR committed paths outside its approved scope: ${scopeViolations.join(", ")}.`,
    };
  }
  return { status: "ready", commit };
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
