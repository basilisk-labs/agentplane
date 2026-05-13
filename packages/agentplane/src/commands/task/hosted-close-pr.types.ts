import type { CommandContext } from "../shared/task-backend.js";

export type TaskHostedClosePrParsed = {
  taskIds: string[];
  branch: string | null;
  repo: string | null;
};

export type GithubPullRequestRecord = {
  number?: number;
  html_url?: string | null;
  state?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  head?: {
    ref?: string | null;
  } | null;
  base?: {
    ref?: string | null;
  } | null;
};

export type HostedClosePrPrecheckOptions = {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string | null;
  repo?: string | null;
};

export type HostedClosePrPlan = {
  taskId: string;
  taskTitle: string;
  gitRoot: string;
  workflowDir: string;
  repo: string;
  sourceBranch: string;
  baseBranch: string;
  mergeCommit: string;
  closeBranch: string;
  sourcePrNumber: number | null;
};

export type HostedClosePrOutcome =
  | {
      kind: "canonical-already-present";
      taskId: string;
      baseBranch: string;
      mergeCommit: string;
    }
  | {
      kind: "base-already-recorded";
      taskId: string;
      baseBranch: string;
    }
  | {
      kind: "already-merged-pr";
      taskId: string;
      closeBranch: string;
      baseBranch: string;
      mergeCommit: string;
      prNumber: number;
      prUrl: string | null;
    }
  | {
      kind: "existing-pr";
      taskId: string;
      closeBranch: string;
      baseBranch: string;
      mergeCommit: string;
      prNumber: number;
      prUrl: string | null;
    }
  | {
      kind: "created-pr";
      taskId: string;
      closeBranch: string;
      prNumber: number;
      prUrl: string | null;
    };

export type HostedClosePrPrecheckResult =
  | { kind: "skip"; outcome: HostedClosePrOutcome }
  | { kind: "ready"; plan: HostedClosePrPlan };

export type HostedClosePrNotice = {
  level: "info" | "warn";
  message: string;
};

export type HostedClosePrExecutionResult = {
  notices: HostedClosePrNotice[];
  outcome: HostedClosePrOutcome;
};
