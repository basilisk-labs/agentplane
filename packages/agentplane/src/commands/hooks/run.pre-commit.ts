import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { resolveBaseBranch, GitContext } from "@agentplaneorg/core/git";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import type { HooksRunOptions } from "./run.js";
import {
  currentBranchOrUndefined,
  envFlag,
  inferTaskIdFromBranch,
  readTaskIntent,
} from "./task-context.js";

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
  const currentBranch = await currentBranchOrUndefined(resolved.gitRoot);
  const taskId =
    (process.env.AGENTPLANE_TASK_ID ?? "").trim() ||
    inferTaskIdFromBranch(currentBranch, loaded.config.branch.task_prefix);
  const taskIntent = taskId
    ? await readTaskIntent({
        gitRoot: resolved.gitRoot,
        workflowDir: loaded.config.paths.workflow_dir,
        taskId,
      })
    : undefined;
  const res = evaluatePolicy({
    action: "hook_pre_commit",
    config: loaded.config,
    taskId,
    git: {
      stagedPaths: staged,
      currentBranch,
      baseBranch,
    },
    commit: { taskIntent },
    allow: {
      allowTasks: envFlag("AGENTPLANE_ALLOW_TASKS"),
      allowBase: envFlag("AGENTPLANE_ALLOW_BASE"),
      allowPolicy: envFlag("AGENTPLANE_ALLOW_POLICY"),
      allowConfig: envFlag("AGENTPLANE_ALLOW_CONFIG"),
      allowHooks: envFlag("AGENTPLANE_ALLOW_HOOKS"),
      allowCI: envFlag("AGENTPLANE_ALLOW_CI"),
      allowUpgrade: envFlag("AGENTPLANE_ALLOW_UPGRADE"),
    },
  });
  throwIfPolicyDenied(res);
  return 0;
}
