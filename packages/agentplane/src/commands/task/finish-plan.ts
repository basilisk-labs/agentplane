import { CliError } from "../../shared/errors.js";

import { backendUsesLocalTaskStore, type CommandContext } from "../shared/task-backend.js";
import { getTaskStore } from "../shared/task-store.js";

import { requireStructuredComment } from "./shared.js";
import type {
  FinishExecutionPlan,
  FinishOptions,
  FinishStructuredFinding,
} from "./finish-types.js";

export function resolveFinishExecutionPlan(opts: {
  ctx: CommandContext;
  options: FinishOptions;
}): FinishExecutionPlan {
  const { ctx, options } = opts;
  const { prefix, min_chars: minChars } = ctx.config.tasks.comments.verified;
  requireStructuredComment(options.body, prefix, minChars);

  const statusCommitRequested = options.statusCommit;
  if ((options.commitFromComment || statusCommitRequested) && options.taskIds.length !== 1) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--commit-from-comment/--status-commit requires exactly one task id",
    });
  }
  if (options.commitFromComment && statusCommitRequested) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "--commit-from-comment cannot be combined with --status-commit in finish; use one deterministic commit path.",
    });
  }
  if (ctx.config.workflow_mode === "branch_pr" && options.commitFromComment) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: [
        "finish --commit-from-comment is not supported in branch_pr.",
        "Why: finish runs on the base checkout; implementation commits belong to task worktrees.",
        'Use: agentplane finish <task-id> --author INTEGRATOR --body "Verified: ..." --result "..." --commit <hash> --close-commit',
      ].join("\n"),
    });
  }
  if (
    (options.closeCommit || options.noCloseCommit) &&
    options.taskIds.length !== 1 &&
    ctx.config.workflow_mode !== "branch_pr"
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--close-commit/--no-close-commit requires exactly one task id outside branch_pr",
    });
  }
  if (options.closeCommit && options.noCloseCommit) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--close-commit and --no-close-commit are mutually exclusive",
    });
  }
  if (
    (options.closeCommit || options.noCloseCommit) &&
    (options.commitFromComment || options.statusCommit)
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "--close-commit/--no-close-commit cannot be combined with --commit-from-comment/--status-commit",
    });
  }

  const primaryTaskId = options.taskIds[0] ?? "";
  if ((options.commitFromComment || statusCommitRequested) && !primaryTaskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--commit-from-comment/--status-commit requires exactly one task id",
    });
  }
  if (options.commitAutoAllow) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--commit-auto-allow is disabled; pass explicit --commit-allow <path-prefix>.",
    });
  }
  if (options.statusCommitAutoAllow) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "--status-commit-auto-allow is disabled; pass explicit --status-commit-allow <path-prefix>.",
    });
  }
  if (options.commitFromComment && options.commitAllow.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--commit-from-comment requires --commit-allow <path-prefix>",
    });
  }
  if (statusCommitRequested && options.statusCommitAllow.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--status-commit requires --status-commit-allow <path-prefix>",
    });
  }

  const useStore = backendUsesLocalTaskStore(ctx);
  const store = useStore ? getTaskStore(ctx) : null;
  const backendWritesTaskReadmes = ctx.taskBackend.capabilities.writes_task_readmes === true;
  const defaultDirectCloseCommit =
    ctx.config.workflow_mode === "direct" &&
    backendWritesTaskReadmes &&
    options.taskIds.length === 1 &&
    !options.commitFromComment &&
    !statusCommitRequested;
  const defaultBranchPrCloseCommit =
    ctx.config.workflow_mode === "branch_pr" &&
    backendWritesTaskReadmes &&
    options.taskIds.length > 0 &&
    !options.commitFromComment &&
    !statusCommitRequested;
  const statusPathRequiresTrackedTaskCommit =
    backendWritesTaskReadmes &&
    options.taskIds.length === 1 &&
    (options.commitFromComment || statusCommitRequested);
  const shouldCloseCommit =
    options.closeCommit === true ||
    statusPathRequiresTrackedTaskCommit ||
    (defaultDirectCloseCommit && options.noCloseCommit !== true) ||
    (defaultBranchPrCloseCommit && options.noCloseCommit !== true);
  const closeAdditionalTaskIds =
    ctx.config.workflow_mode === "branch_pr" && shouldCloseCommit
      ? options.taskIds.slice(1).filter(Boolean)
      : [];

  const metaTaskId = options.taskIds.length === 1 ? (options.taskIds[0] ?? "") : "";
  const wantMeta =
    typeof options.result === "string" ||
    typeof options.risk === "string" ||
    options.breaking === true;
  const resultProvided = typeof options.result === "string";
  if (wantMeta && options.taskIds.length !== 1) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--result/--risk/--breaking requires exactly one task id",
    });
  }
  const resultSummary = typeof options.result === "string" ? options.result.trim() : "";
  const riskLevel = options.risk;
  const breaking = options.breaking === true;
  const finishFinding = resolveFinishFinding(options);
  if (finishFinding && options.taskIds.length !== 1) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "--observation/--impact/--resolution and incident finding options require exactly one task id",
    });
  }

  return {
    useStore,
    store,
    statusCommitRequested,
    primaryTaskId,
    metaTaskId,
    resultProvided,
    resultSummary,
    riskLevel,
    breaking,
    finishFinding,
    shouldCloseCommit,
    closeAdditionalTaskIds,
  };
}

function resolveFinishFinding(options: FinishOptions): FinishStructuredFinding | null {
  if (
    typeof options.observation !== "string" ||
    typeof options.impact !== "string" ||
    typeof options.resolution !== "string"
  ) {
    return null;
  }
  return {
    observation: options.observation,
    impact: options.impact,
    resolution: options.resolution,
    promote: options.promote === true,
    external: options.external === true,
    localOnly: options.localOnly === true,
    repoFixable: options.repoFixable === true,
    incidentScope: options.incidentScope,
    incidentTags: options.incidentTags ?? [],
    incidentMatch: options.incidentMatch ?? [],
    incidentAdvice: options.incidentAdvice,
    incidentRule: options.incidentRule,
  };
}
