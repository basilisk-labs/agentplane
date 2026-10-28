import { taskCloseBranchName } from "@agentplaneorg/core/git";
import type { loadBackendTask } from "../shared/task-backend.js";
import { taskCloseAlreadyRecordedOnBase } from "../task/close-tail-state.js";
import {
  preMergeClosureAllowsMissingBasisCommit,
  preMergeClosureBasisIsAncestor,
  taskIsClosedByPreMergeClosure,
} from "../task/hosted-close.command.js";
import type { PrMeta } from "../shared/pr-meta.js";
import { observeExistingChangeRequestByBranch } from "./internal/change-request-provider.js";

type ProviderName = "github" | "gitlab";

export type RemotePrStatus =
  | { provider: ProviderName; state: "not_found"; source: "lookup" | "metadata" }
  | {
      provider: ProviderName;
      state: "OPEN" | "CLOSED" | "MERGED";
      source: "lookup" | "metadata";
      prNumber: number | null;
      prUrl: string | null;
      base: string | null;
      headSha: string | null;
      mergeCommit: string | null;
    };

export type CloseTailStatus =
  | { state: "not_applicable"; reason: string }
  | { state: "recorded_on_base"; base: string }
  | { state: "unavailable"; provider: ProviderName; branch: string; reason: string }
  | {
      state: "open" | "merged" | "not_found";
      provider: ProviderName;
      branch: string;
      prNumber: number | null;
      prUrl: string | null;
    };

export async function matchesMergedPreMergeClosure(opts: {
  gitRoot: string;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
  meta: PrMeta | null;
  pr: {
    state: "not_found" | "OPEN" | "CLOSED" | "MERGED";
    prNumber?: number | null;
    headSha?: string | null;
  };
  branch: string | null;
}): Promise<boolean> {
  const prNumber = opts.pr.prNumber ?? null;
  if (opts.pr.state !== "MERGED" || !opts.meta || !opts.branch || prNumber === null) return false;
  if (
    !taskIsClosedByPreMergeClosure({
      task: opts.task,
      meta: opts.meta,
      branch: opts.branch,
      prNumber,
    })
  ) {
    return false;
  }
  return preMergeClosureBasisIsAncestor({
    gitRoot: opts.gitRoot,
    meta: opts.meta,
    mergedHeadSha: opts.pr.headSha,
    allowMissingBasisCommit: preMergeClosureAllowsMissingBasisCommit({
      task: opts.task,
      meta: opts.meta,
      prNumber,
    }),
  });
}

export async function resolveCloseTailStatus(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  taskClosePrefix: string;
  baseBranch: string | null;
  remotePr: RemotePrStatus;
  preMergeClosureRecorded: boolean;
  preMergeClosureRecordedOnBase: boolean;
  meta: PrMeta | null;
}): Promise<CloseTailStatus> {
  const base = opts.baseBranch?.trim() ?? "";
  if (base) {
    const recorded = await taskCloseAlreadyRecordedOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      baseBranch: base,
    }).catch(() => false);
    if (recorded || opts.preMergeClosureRecordedOnBase) {
      return { state: "recorded_on_base", base };
    }
    if (opts.remotePr.state === "MERGED" && opts.preMergeClosureRecorded) {
      return { state: "recorded_on_base", base };
    }
  }

  const mergeCommit = opts.remotePr.state === "MERGED" ? opts.remotePr.mergeCommit : null;
  if (!mergeCommit) {
    return {
      state: "not_applicable",
      reason: "implementation PR is not merged or merge commit is unavailable",
    };
  }

  const branch = taskCloseBranchName({
    taskClosePrefix: opts.taskClosePrefix,
    taskId: opts.taskId,
    commit: mergeCommit,
  });
  const observation = await observeExistingChangeRequestByBranch({
    gitRoot: opts.gitRoot,
    branch,
    baseBranch: base || null,
    recorded: opts.meta?.provider ?? null,
  });
  if (observation.state === "unavailable") {
    return {
      state: "unavailable",
      provider: opts.meta?.provider?.kind ?? "github",
      branch,
      reason: observation.reason,
    };
  }
  const observed = observation.state === "found" ? observation.pr : null;
  if (observed?.status === "OPEN" || observed?.status === "MERGED") {
    return {
      state: observed.status === "MERGED" ? "merged" : "open",
      provider: observed.provider,
      branch,
      prNumber: observed.prNumber,
      prUrl: observed.prUrl,
    };
  }
  return {
    state: "not_found",
    provider: opts.meta?.provider?.kind ?? "github",
    branch,
    prNumber: null,
    prUrl: null,
  };
}
