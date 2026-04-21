import { loadConfig, resolveProject } from "@agentplaneorg/core";
import { resolveBaseBranch, GitContext } from "@agentplaneorg/core/git";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import type { HooksRunOptions } from "./run.js";

function envFlag(name: string): boolean {
  return (process.env[name] ?? "").trim() === "1";
}

export async function runPreCommitHook(opts: HooksRunOptions): Promise<number> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const staged = await new GitContext({ gitRoot: resolved.gitRoot }).statusStagedPaths();
  if (staged.length === 0) return 0;

  const loaded = await loadConfig(resolved.agentplaneDir);
  const inBranchPr = loaded.config.workflow_mode === "branch_pr";
  const baseBranch = inBranchPr
    ? await resolveBaseBranch({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        cliBaseOpt: null,
        mode: loaded.config.workflow_mode,
      })
    : null;
  const currentBranch = inBranchPr ? await gitCurrentBranch(resolved.gitRoot) : undefined;

  const res = evaluatePolicy({
    action: "hook_pre_commit",
    config: loaded.config,
    taskId: (process.env.AGENTPLANE_TASK_ID ?? "").trim(),
    git: {
      stagedPaths: staged,
      currentBranch,
      baseBranch,
    },
    allow: {
      allowTasks: envFlag("AGENTPLANE_ALLOW_TASKS"),
      allowBase: envFlag("AGENTPLANE_ALLOW_BASE"),
      allowPolicy: envFlag("AGENTPLANE_ALLOW_POLICY"),
      allowConfig: envFlag("AGENTPLANE_ALLOW_CONFIG"),
      allowHooks: envFlag("AGENTPLANE_ALLOW_HOOKS"),
      allowCI: envFlag("AGENTPLANE_ALLOW_CI"),
    },
  });
  throwIfPolicyDenied(res);
  return 0;
}
