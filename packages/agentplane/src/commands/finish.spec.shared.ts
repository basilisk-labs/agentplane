import { usageError } from "../cli/spec/errors.js";
import { toStringList } from "../cli/spec/parse-utils.js";
import type { CommandSpec, ParsedRaw } from "../cli/spec/spec.js";
import {
  findRepoWideAllowPrefixes,
  repoWideAllowPrefixMessage,
} from "./shared/allow-prefix-policy.js";
import { validateVerifyFindingSource } from "./task/verify-command-shared.js";

export type FinishParsed = {
  taskIds: string[];
  author: string;
  body: string;
  result?: string;
  risk?: "low" | "med" | "high";
  breaking: boolean;
  commit?: string;
  force: boolean;
  yes: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji?: string;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  closeCommit: boolean;
  noCloseCommit: boolean;
  noWriteAcr: boolean;
  closeUnstageOthers: boolean;
  baseBranchOverride?: string;
  observation?: string;
  impact?: string;
  resolution?: string;
  localOnly: boolean;
  repoFixable: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  quiet: boolean;
};

function hasFinishFindingInput(raw: ParsedRaw): boolean {
  return [
    raw.opts.observation,
    raw.opts.impact,
    raw.opts.resolution,
    raw.opts["incident-scope"],
    raw.opts["incident-advice"],
    raw.opts["incident-rule"],
  ].some((value) => typeof value === "string" && value.trim().length > 0)
    ? true
    : (Array.isArray(raw.opts["incident-tag"]) && raw.opts["incident-tag"].length > 0) ||
        (Array.isArray(raw.opts["incident-match"]) && raw.opts["incident-match"].length > 0) ||
        raw.opts["local-only"] === true ||
        raw.opts["repo-fixable"] === true;
}

export function validateFinishRaw(raw: ParsedRaw, spec: CommandSpec<FinishParsed>): void {
  const ids = raw.args["task-id"];
  const taskIds = Array.isArray(ids) ? ids : [];
  const commitFromComment = raw.opts["commit-from-comment"] === true;
  const statusCommit = raw.opts["status-commit"] === true;
  const commitAllow = toStringList(raw.opts["commit-allow"]);
  const statusCommitAllow = toStringList(raw.opts["status-commit-allow"]);
  const commitAutoAllow = raw.opts["commit-auto-allow"] === true;
  const statusCommitAutoAllow = raw.opts["status-commit-auto-allow"] === true;

  if (findRepoWideAllowPrefixes(commitAllow).length > 0) {
    throw usageError({
      spec,
      command: "finish",
      message: repoWideAllowPrefixMessage("--commit-allow"),
    });
  }
  if (findRepoWideAllowPrefixes(statusCommitAllow).length > 0) {
    throw usageError({
      spec,
      command: "finish",
      message: repoWideAllowPrefixMessage("--status-commit-allow"),
    });
  }
  if (commitAutoAllow) {
    throw usageError({
      spec,
      command: "finish",
      message: "--commit-auto-allow is disabled; pass explicit --commit-allow <path-prefix>.",
    });
  }
  if (statusCommitAutoAllow) {
    throw usageError({
      spec,
      command: "finish",
      message:
        "--status-commit-auto-allow is disabled; pass explicit --status-commit-allow <path-prefix>.",
    });
  }
  if ((commitFromComment || statusCommit) && taskIds.length !== 1) {
    throw usageError({
      spec,
      command: "finish",
      message: "--commit-from-comment/--status-commit requires exactly one task id",
    });
  }
  if (commitFromComment && statusCommit) {
    throw usageError({
      spec,
      command: "finish",
      message:
        "--commit-from-comment cannot be combined with --status-commit in finish; use one deterministic commit path.",
    });
  }
  if (commitFromComment && commitAllow.length === 0) {
    throw usageError({
      spec,
      command: "finish",
      message:
        "--commit-from-comment requires --commit-allow <path-prefix> (tip: `agentplane guard suggest-allow --format args`).",
    });
  }
  if (statusCommit && statusCommitAllow.length === 0) {
    throw usageError({
      spec,
      command: "finish",
      message:
        "--status-commit requires --status-commit-allow <path-prefix> (tip: `agentplane guard suggest-allow --format args`).",
    });
  }
  if (raw.opts["close-commit"] === true && taskIds.length !== 1) {
    throw usageError({
      spec,
      command: "finish",
      message: "--close-commit requires exactly one task id",
    });
  }
  if (raw.opts["no-close-commit"] === true && taskIds.length !== 1) {
    throw usageError({
      spec,
      command: "finish",
      message: "--no-close-commit requires exactly one task id",
    });
  }
  if (raw.opts["close-commit"] === true && raw.opts["no-close-commit"] === true) {
    throw usageError({
      spec,
      command: "finish",
      message: "--close-commit and --no-close-commit are mutually exclusive",
    });
  }
  if (
    (raw.opts["close-commit"] === true || raw.opts["no-close-commit"] === true) &&
    (raw.opts["commit-from-comment"] === true || raw.opts["status-commit"] === true)
  ) {
    throw usageError({
      spec,
      command: "finish",
      message:
        "--close-commit/--no-close-commit cannot be combined with --commit-from-comment/--status-commit",
    });
  }
  if (raw.opts["close-unstage-others"] === true && raw.opts["close-commit"] !== true) {
    throw usageError({
      spec,
      command: "finish",
      message: "--close-unstage-others requires --close-commit",
    });
  }
  if (typeof raw.opts.base === "string" && raw.opts.base.trim().length === 0) {
    throw usageError({
      spec,
      command: "finish",
      message: "Invalid value for --base: empty.",
    });
  }

  const hasMeta =
    typeof raw.opts.result === "string" ||
    typeof raw.opts.risk === "string" ||
    raw.opts.breaking === true;
  if (hasMeta && taskIds.length !== 1) {
    throw usageError({
      spec,
      command: "finish",
      message: "--result/--risk/--breaking requires exactly one task id",
    });
  }
  if (hasFinishFindingInput(raw) && taskIds.length !== 1) {
    throw usageError({
      spec,
      command: "finish",
      message:
        "--observation/--impact/--resolution and incident finding options require exactly one task id",
    });
  }

  validateVerifyFindingSource(raw, spec, { command: "finish" });
}

export function parseFinishRaw(raw: ParsedRaw): FinishParsed {
  return {
    taskIds: Array.isArray(raw.args["task-id"])
      ? raw.args["task-id"].filter((x): x is string => typeof x === "string")
      : [],
    author: raw.opts.author as string,
    body: raw.opts.body as string,
    result: raw.opts.result as string | undefined,
    risk: raw.opts.risk as FinishParsed["risk"],
    breaking: raw.opts.breaking === true,
    commit: raw.opts.commit as string | undefined,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    commitFromComment: raw.opts["commit-from-comment"] === true,
    commitEmoji: raw.opts["commit-emoji"] as string | undefined,
    commitAllow: toStringList(raw.opts["commit-allow"]),
    commitAutoAllow: raw.opts["commit-auto-allow"] === true,
    commitAllowTasks: raw.opts["commit-allow-tasks"] !== false,
    commitRequireClean: raw.opts["commit-require-clean"] === true,
    statusCommit: raw.opts["status-commit"] === true,
    statusCommitEmoji: raw.opts["status-commit-emoji"] as string | undefined,
    statusCommitAllow: toStringList(raw.opts["status-commit-allow"]),
    statusCommitAutoAllow: raw.opts["status-commit-auto-allow"] === true,
    statusCommitRequireClean: raw.opts["status-commit-require-clean"] === true,
    confirmStatusCommit: raw.opts["confirm-status-commit"] === true,
    closeCommit: raw.opts["close-commit"] === true,
    noCloseCommit: raw.opts["no-close-commit"] === true,
    noWriteAcr: raw.opts["no-write-acr"] === true,
    closeUnstageOthers: raw.opts["close-unstage-others"] === true,
    baseBranchOverride: typeof raw.opts.base === "string" ? raw.opts.base : undefined,
    observation: typeof raw.opts.observation === "string" ? raw.opts.observation : undefined,
    impact: typeof raw.opts.impact === "string" ? raw.opts.impact : undefined,
    resolution: typeof raw.opts.resolution === "string" ? raw.opts.resolution : undefined,
    localOnly: raw.opts["local-only"] === true,
    repoFixable: raw.opts["repo-fixable"] === true,
    incidentScope:
      typeof raw.opts["incident-scope"] === "string" ? raw.opts["incident-scope"] : undefined,
    incidentTags: toStringList(raw.opts["incident-tag"]),
    incidentMatch: toStringList(raw.opts["incident-match"]),
    incidentAdvice:
      typeof raw.opts["incident-advice"] === "string" ? raw.opts["incident-advice"] : undefined,
    incidentRule:
      typeof raw.opts["incident-rule"] === "string" ? raw.opts["incident-rule"] : undefined,
    quiet: raw.opts.quiet === true,
  };
}
