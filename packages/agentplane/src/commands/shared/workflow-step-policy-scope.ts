import { GitContext, gitDiffNames, gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import type { WorkflowRouteStateInput } from "./workflow-step-fingerprint.js";

const WORKFLOW_ROUTE_BASELINE_KEY = "workflow_route_baseline";

type WorkflowRouteBaseline = {
  version: 1;
  start_head_sha: string | null;
};

export type WorkflowPolicyScopeObservation =
  | {
      state: "present";
      changedPaths: readonly string[];
      sources: readonly string[];
    }
  | {
      state: "unavailable";
      reason: string;
      evidence: Record<string, unknown>;
    };

function normalizedPaths(values: readonly string[]): string[] {
  return [
    ...new Set(
      values
        .map((value) => value.replaceAll("\\", "/").replace(/^\.\//u, "").trim())
        .filter(Boolean),
    ),
  ].toSorted();
}

function baselineFromTask(task: TaskData): WorkflowRouteBaseline | null {
  const value = task.extensions?.[WORKFLOW_ROUTE_BASELINE_KEY];
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    !(
      value.start_head_sha === null ||
      (typeof value.start_head_sha === "string" && value.start_head_sha.trim())
    )
  ) {
    return null;
  }
  return {
    version: 1,
    start_head_sha: typeof value.start_head_sha === "string" ? value.start_head_sha.trim() : null,
  };
}

function runnerChangedPaths(task: TaskData): string[] {
  const runner = task.runner;
  if (!isRecord(runner) || !isRecord(runner.evidence)) return [];
  const changedPaths = runner.evidence.changed_paths;
  if (!Array.isArray(changedPaths)) return [];
  return normalizedPaths(
    changedPaths.filter((value): value is string => typeof value === "string"),
  );
}

function taskBranch(state: WorkflowRouteStateInput): string | null {
  const candidates = [
    state.taskWorktree?.branch,
    state.prFlow?.branch.name,
    state.resume.pr_branch,
  ];
  return candidates.find((candidate) => typeof candidate === "string" && candidate.trim()) ?? null;
}

export function withWorkflowRouteBaseline(
  task: TaskData,
  startHeadSha: string | null,
): TaskData["extensions"] {
  const extensions = structuredClone(task.extensions ?? {});
  const current = baselineFromTask(task);
  extensions[WORKFLOW_ROUTE_BASELINE_KEY] =
    current ?? ({ version: 1, start_head_sha: startHeadSha } satisfies WorkflowRouteBaseline);
  return extensions;
}

async function rootCommitChangedPaths(repositoryRoot: string): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", "HEAD"],
    { cwd: repositoryRoot, env: gitEnv() },
  );
  return normalizedPaths(stdout.split("\n"));
}

export async function observeWorkflowPolicyScope(opts: {
  repositoryRoot: string;
  state: WorkflowRouteStateInput;
}): Promise<WorkflowPolicyScopeObservation> {
  const passedDirtyPaths = opts.state.taskWorktree?.changedPaths ?? [];
  const baseline = baselineFromTask(opts.state.task);
  const status = String(opts.state.task.status).toUpperCase();

  try {
    const directDirtyPaths =
      opts.state.workflowMode === "direct"
        ? await new GitContext({ gitRoot: opts.repositoryRoot }).statusChangedPaths()
        : [];
    const dirtyPaths = normalizedPaths([...passedDirtyPaths, ...directDirtyPaths]);
    if (opts.state.workflowMode === "branch_pr") {
      const branch = taskBranch(opts.state);
      const base = opts.state.resume.base_branch?.trim() ?? "";
      if (!branch || !base) {
        if (status === "TODO") {
          return { state: "present", changedPaths: dirtyPaths, sources: ["working_tree"] };
        }
        return {
          state: "unavailable",
          reason: "branch_pr_change_range_unavailable",
          evidence: { base: base.length > 0 ? base : null, branch, status },
        };
      }
      const committedPaths = await gitDiffNames(
        opts.repositoryRoot,
        baseline?.start_head_sha ?? base,
        branch,
      );
      return {
        state: "present",
        changedPaths: normalizedPaths([...committedPaths, ...dirtyPaths]),
        sources: [baseline ? "task_start_baseline" : "base_branch", "working_tree"],
      };
    }

    if (baseline) {
      const recordedHead = opts.state.resume.head_sha?.trim() ?? "";
      const head = recordedHead.length > 0 ? recordedHead : "HEAD";
      const committedPaths = baseline.start_head_sha
        ? await gitDiffNames(opts.repositoryRoot, baseline.start_head_sha, head)
        : await rootCommitChangedPaths(opts.repositoryRoot).catch((error: unknown) => {
            if (dirtyPaths.length > 0) return [];
            throw error;
          });
      return {
        state: "present",
        changedPaths: normalizedPaths([...committedPaths, ...dirtyPaths]),
        sources: [
          baseline.start_head_sha ? "task_start_baseline" : "unborn_task_start_baseline",
          "working_tree",
        ],
      };
    }

    const runnerPaths = runnerChangedPaths(opts.state.task);
    if (status === "TODO" || dirtyPaths.length > 0 || runnerPaths.length > 0) {
      return {
        state: "present",
        changedPaths: normalizedPaths([...runnerPaths, ...dirtyPaths]),
        sources: [
          ...(runnerPaths.length > 0 ? ["runner_evidence"] : []),
          ...(dirtyPaths.length > 0 ? ["working_tree"] : []),
        ],
      };
    }
    return {
      state: "unavailable",
      reason: "direct_task_start_baseline_missing",
      evidence: { status, taskId: opts.state.task.id },
    };
  } catch (error) {
    return {
      state: "unavailable",
      reason: "task_change_range_observation_failed",
      evidence: {
        message: error instanceof Error ? error.message : String(error),
        workflowMode: opts.state.workflowMode,
      },
    };
  }
}
