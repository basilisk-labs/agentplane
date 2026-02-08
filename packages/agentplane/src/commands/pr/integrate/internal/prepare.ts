import path from "node:path";
import { readFile } from "node:fs/promises";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { fileExists } from "../../../../cli/fs-utils.js";
import { unknownEntityMessage, workflowModeMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureGitClean } from "../../../guard/index.js";
import { gitDiffNames, gitShowFile, toGitPath } from "../../../shared/git-diff.js";
import { gitBranchExists, gitCurrentBranch, gitRevParse } from "../../../shared/git-ops.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../../../shared/task-backend.js";
import {
  ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired,
} from "../../../task/shared.js";

import { resolvePrPaths } from "../../internal/pr-paths.js";

import { readAndValidatePrArtifacts } from "../artifacts.js";
import { computeVerifyState } from "../verify.js";
import { parsePrMeta, type PrMeta } from "../../../shared/pr-meta.js";

export type PreparedIntegrate = {
  ctx: CommandContext;
  resolved: CommandContext["resolvedProject"];
  loadedConfig: CommandContext["config"];
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];

  baseBranch: string;
  currentBranch: string;

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
  const { task } = await loadBackendTask({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });

  const resolved = ctx.resolvedProject;
  const loadedConfig = ctx.config;

  if (loadedConfig.workflow_mode !== "branch_pr") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: workflowModeMessage(loadedConfig.workflow_mode, "branch_pr"),
    });
  }

  ensurePlanApprovedIfRequired(task, loadedConfig);
  ensureVerificationSatisfiedIfRequired(task, loadedConfig);
  await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

  if (opts.base?.trim().length === 0) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Invalid value for --base." });
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: opts.base ?? null,
    mode: loadedConfig.workflow_mode,
  });
  if (!baseBranch) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
    });
  }

  const currentBranch = await gitCurrentBranch(resolved.gitRoot);
  if (currentBranch !== baseBranch) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: `integrate must run on base branch ${baseBranch} (current: ${currentBranch})`,
    });
  }

  const { prDir, metaPath, diffstatPath, verifyLogPath } = await resolvePrPaths({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });

  let meta: PrMeta | null = null;
  let branch = (opts.branch ?? "").trim();
  if (await fileExists(metaPath)) {
    meta = parsePrMeta(await readFile(metaPath, "utf8"), task.id);
    if (!branch) branch = (meta.branch ?? "").trim();
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

  const metaSource =
    meta ??
    parsePrMeta(
      await gitShowFile(
        resolved.gitRoot,
        branch,
        toGitPath(path.relative(resolved.gitRoot, metaPath)),
      ),
      task.id,
    );
  const baseCandidate = opts.base ?? (metaSource as Record<string, unknown>).base ?? baseBranch;
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
    taskId: task.id,
  });
  // readAndValidatePrArtifacts() throws if verify.log is missing; keep this non-null downstream.
  const verifyLogText = verifyLogTextMaybe!;

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
  const initialVerifyState = computeVerifyState({
    rawVerify: task.verify,
    metaLastVerifiedSha: metaSource?.last_verified_sha ?? null,
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
    verifyCommands: initialVerifyState.verifyCommands,
    alreadyVerifiedSha: initialVerifyState.alreadyVerifiedSha,
    shouldRunVerify: initialVerifyState.shouldRunVerify,
  };
}
