import { resolveBaseBranch } from "@agentplaneorg/core/git";

import { evaluatePolicy } from "../../../policy/evaluate.js";
import { gitCurrentBranch } from "../../shared/git-ops.js";
import { throwIfPolicyDenied } from "../../shared/policy-deny.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";

export type GuardCommitOptions = {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  baseBranchOverride?: string | null;
  taskId: string;
  message: string;
  allow: string[];
  allowBase: boolean;
  allowTasks: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  requireClean: boolean;
  allowHumanTaskSubject?: boolean;
  ignoredUnstagedTrackedPaths?: string[];
  quiet: boolean;
};

export async function guardCommitCheck(opts: GuardCommitOptions): Promise<void> {
  const loadedContext =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const ctx = loadedContext;

  const staged = await ctx.git.statusStagedPaths();
  const ignoredUnstagedTrackedPaths = new Set(
    (opts.ignoredUnstagedTrackedPaths ?? []).map((value) => value.trim()).filter(Boolean),
  );
  const rawUnstagedTrackedPaths = opts.requireClean
    ? await ctx.git.statusUnstagedTrackedPaths()
    : [];
  const unstagedTrackedPaths = opts.requireClean
    ? rawUnstagedTrackedPaths.filter((relPath) => !ignoredUnstagedTrackedPaths.has(relPath))
    : [];

  const inBranchPr = ctx.config.workflow_mode === "branch_pr";
  const explicitBaseBranch = opts.baseBranchOverride?.trim();
  const baseBranch = inBranchPr
    ? explicitBaseBranch && explicitBaseBranch.length > 0
      ? explicitBaseBranch
      : await resolveBaseBranch({
          cwd: opts.cwd,
          rootOverride: opts.rootOverride ?? null,
          cliBaseOpt: null,
          mode: ctx.config.workflow_mode,
        })
    : null;
  const currentBranch = inBranchPr
    ? await gitCurrentBranch(ctx.resolvedProject.gitRoot)
    : undefined;

  const res = evaluatePolicy({
    action: "guard_commit",
    config: ctx.config,
    taskId: opts.taskId,
    git: {
      stagedPaths: staged,
      unstagedTrackedPaths: unstagedTrackedPaths,
      currentBranch,
      baseBranch,
    },
    commit: { subject: opts.message, allowHumanTaskSubject: opts.allowHumanTaskSubject },
    allow: {
      prefixes: opts.allow,
      allowTasks: opts.allowTasks,
      allowBase: opts.allowBase,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
    },
    requireClean: opts.requireClean,
  });
  throwIfPolicyDenied(res);
}
