import path from "node:path";
import { readFile } from "node:fs/promises";

import { resolveBaseBranch } from "@agentplaneorg/core";
import type { TaskData } from "../../../../backends/task-backend.js";

import { fileExists } from "../../../../cli/fs-utils.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { unknownEntityMessage, workflowModeMessage } from "../../../../cli/output.js";
import { withDiagnosticContext } from "../../../../shared/diagnostics.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureGitClean } from "../../../guard/index.js";
import { gitDiffNames } from "../../../shared/git-diff.js";
import { gitBranchExists, gitCurrentBranch, gitRevParse } from "../../../shared/git-ops.js";
import { findWorktreeForBranch } from "../../../shared/git-worktree.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../../../shared/task-backend.js";
import {
  ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired,
} from "../../../task/shared.js";

import { readPrArtifact, resolvePrPaths } from "../../internal/pr-paths.js";
import { ensurePrArtifactsSynced } from "../../internal/sync.js";

import { readAndValidatePrArtifacts, ensureCommittedPrArtifactsOnBranch } from "../artifacts.js";
import { computeVerifyState } from "../verify.js";
import { parsePrMetaForwardCompatible, type PrMeta } from "../../../shared/pr-meta.js";
import { assessPrArtifactFreshness } from "../../internal/freshness.js";
import { requiresPullRequestMergePath } from "./github-protection.js";

export type PreparedIntegrate = {
  ctx: CommandContext;
  resolved: CommandContext["resolvedProject"];
  loadedConfig: CommandContext["config"];
  task: TaskData;

  baseBranch: string;
  currentBranch: string;
  protectedBaseRequiresPrMerge: boolean;

  prDir: string;
  metaPath: string;
  diffstatPath: string;
  verifyLogPath: string;

  meta: PrMeta | null;
  metaSource: PrMeta;
  branch: string;
  base: string;

  verifyLogText: string;

  branchHeadSha: string;
  changedPaths: string[];
  verifyCommands: string[];
  alreadyVerifiedSha: string | null;
  shouldRunVerify: boolean;
};

export async function prepareIntegrate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string;
  base?: string;
  runVerify: boolean;
}): Promise<PreparedIntegrate> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

  const resolved = ctx.resolvedProject;
  const loadedConfig = ctx.config;

  if (loadedConfig.workflow_mode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: workflowModeMessage(loadedConfig.workflow_mode, "branch_pr"),
    });
  }

  await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

  if (opts.base?.trim().length === 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: "Invalid value for --base.",
    });
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: opts.base ?? null,
    mode: loadedConfig.workflow_mode,
  });
  if (!baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
    });
  }

  const currentBranch = await gitCurrentBranch(resolved.gitRoot);

  const { prDir, metaPath, diffstatPath, verifyLogPath } = await resolvePrPaths({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });

  let meta: PrMeta | null = null;
  let branch = (opts.branch ?? "").trim();
  if (await fileExists(metaPath)) {
    meta = parsePrMetaForwardCompatible(await readFile(metaPath, "utf8"), opts.taskId);
    if (!branch) branch = (meta.branch ?? "").trim();
  }
  if (!branch) {
    const inferredBranch = await resolveTaskBranchFromContext({ ctx, taskId: opts.taskId });
    if (inferredBranch) {
      branch = inferredBranch;
    }
  }
  if (!branch) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Branch could not be resolved (use --branch or run `agentplane pr open`).",
    });
  }
  if (!(await gitBranchExists(resolved.gitRoot, branch))) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: unknownEntityMessage("branch", branch),
    });
  }

  if (currentBranch !== baseBranch) {
    if (currentBranch === branch) {
      const baseWorktreePath = await findWorktreeForBranch(resolved.gitRoot, baseBranch);
      const rerunCommand =
        baseWorktreePath && baseWorktreePath.trim().length > 0
          ? `agentplane integrate ${opts.taskId} --branch ${branch} --root ${baseWorktreePath}`
          : `git checkout ${baseBranch} && agentplane integrate ${opts.taskId} --branch ${branch}`;
      throw new CliError({
        exitCode: exitCodeForError("E_GIT"),
        code: "E_GIT",
        message:
          `integrate must run from the ${baseBranch} base checkout, not from task branch ${branch}. ` +
          `Rerun it against the base checkout after leaving this task worktree.`,
        context: withDiagnosticContext(
          {
            command: "integrate",
            task_id: opts.taskId,
            branch,
            base_branch: baseBranch,
            current_branch: currentBranch,
            ...(baseWorktreePath ? { base_worktree_path: baseWorktreePath } : {}),
            reason_code: "integrate_base_checkout_required",
          },
          {
            state: `integrate was invoked from task branch ${branch} instead of base branch ${baseBranch}`,
            likelyCause:
              "the operator is inside the task worktree, but branch_pr integrate is only valid from the registered base checkout",
            hint: "Use the base checkout/worktree for the resolved base branch, not the task branch worktree, when running integrate.",
            nextAction: {
              command: rerunCommand,
              reason: "rerun integrate against the base checkout route",
              reasonCode: "integrate_base_checkout_required",
            },
          },
        ),
      });
    }
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `integrate must run on base branch ${baseBranch} (current: ${currentBranch})`,
    });
  }

  await ensureCommittedPrArtifactsOnBranch({
    resolved,
    prDir,
    branch,
  });

  const worktreePath = await findWorktreeForBranch(resolved.gitRoot, branch);
  const metaText = await readPrArtifact({
    resolved,
    prDir,
    fileName: "meta.json",
    branch,
    worktreePath,
  });
  if (!metaText) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `PR artifacts missing: ${path.relative(resolved.gitRoot, metaPath)} (run \`agentplane pr open\`)`,
    });
  }
  let metaSource = parsePrMetaForwardCompatible(metaText, opts.taskId);
  const baseCandidate = opts.base ?? metaSource.base ?? baseBranch;
  const base =
    typeof baseCandidate === "string" && baseCandidate.trim().length > 0
      ? baseCandidate.trim()
      : baseBranch;

  const { verifyLogText: verifyLogTextMaybe } = await readAndValidatePrArtifacts({
    ctx,
    resolved,
    prDir,
    metaPath,
    branch,
    taskId: opts.taskId,
  });
  // readAndValidatePrArtifacts() throws if verify.log is missing; keep this non-null downstream.
  let verifyLogText = verifyLogTextMaybe!;

  const task = await loadTaskFromContext({
    ctx,
    taskId: opts.taskId,
    preferBranchSnapshot: true,
    branchSnapshotBranch: branch,
  });
  const protectedBaseRequiresPrMerge = await requiresPullRequestMergePath({
    gitRoot: resolved.gitRoot,
    baseBranch: base,
  });

  const changedPaths = await gitDiffNames(resolved.gitRoot, base, branch);
  const tasksPath = loadedConfig.paths.tasks_path;
  if (changedPaths.includes(tasksPath)) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: `Branch ${branch} modifies ${tasksPath} (single-writer violation)`,
    });
  }

  const branchHeadSha = await gitRevParse(resolved.gitRoot, [branch]);
  let freshness = await assessPrArtifactFreshness({
    gitRoot: resolved.gitRoot,
    workflowDir: loadedConfig.paths.workflow_dir,
    tasksPath: loadedConfig.paths.tasks_path,
    taskId: opts.taskId,
    branchHeadSha,
    metaHeadSha: metaSource.head_sha ?? null,
    metaLastVerifiedSha: metaSource.last_verified_sha ?? null,
    metaVerifyStatus: metaSource.verify?.status ?? null,
    taskVerificationState: task.verification?.state ?? null,
    verifyLogText,
    requiresVerify: Boolean(task.verify && task.verify.length > 0),
  });
  if (!freshness.reviewFresh && worktreePath) {
    await ensurePrArtifactsSynced({
      cwd: worktreePath,
      taskId: opts.taskId,
      branch,
    });
    const repairedMetaText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "meta.json",
      branch,
      worktreePath,
    });
    if (repairedMetaText) {
      const repairedMetaSource = parsePrMetaForwardCompatible(repairedMetaText, opts.taskId);
      const repairedArtifacts = await readAndValidatePrArtifacts({
        ctx,
        resolved,
        prDir,
        metaPath,
        branch,
        taskId: opts.taskId,
      });
      verifyLogText = repairedArtifacts.verifyLogText ?? verifyLogText;
      freshness = await assessPrArtifactFreshness({
        gitRoot: resolved.gitRoot,
        workflowDir: loadedConfig.paths.workflow_dir,
        tasksPath: loadedConfig.paths.tasks_path,
        taskId: opts.taskId,
        branchHeadSha,
        metaHeadSha: repairedMetaSource.head_sha ?? null,
        metaLastVerifiedSha: repairedMetaSource.last_verified_sha ?? null,
        metaVerifyStatus: repairedMetaSource.verify?.status ?? null,
        taskVerificationState: task.verification?.state ?? null,
        verifyLogText,
        requiresVerify: Boolean(task.verify && task.verify.length > 0),
      });
      meta = repairedMetaSource;
      metaSource = repairedMetaSource;
    }
  }
  if (!freshness.reviewFresh) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `PR artifacts stale for ${opts.taskId}: meta.head_sha=${metaSource.head_sha ?? "<missing>"} ` +
        `current_head=${branchHeadSha} (refresh the task branch artifacts before integrate)`,
    });
  }
  ensurePlanApprovedIfRequired(task, loadedConfig);
  ensureVerificationSatisfiedIfRequired(task, loadedConfig);
  const initialVerifyState = computeVerifyState({
    rawVerify: task.verify,
    metaLastVerifiedSha: freshness.effectiveVerifiedSha,
    verifyLogText,
    branchHeadSha,
    runVerify: opts.runVerify,
  });

  return {
    ctx,
    resolved,
    loadedConfig,
    task,
    baseBranch,
    currentBranch,
    protectedBaseRequiresPrMerge,
    prDir,
    metaPath,
    diffstatPath,
    verifyLogPath,
    meta,
    metaSource,
    branch,
    base,
    verifyLogText,
    branchHeadSha,
    changedPaths,
    verifyCommands: initialVerifyState.verifyCommands,
    alreadyVerifiedSha: initialVerifyState.alreadyVerifiedSha,
    shouldRunVerify: initialVerifyState.shouldRunVerify,
  };
}
