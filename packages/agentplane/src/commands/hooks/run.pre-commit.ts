import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import {
  resolveBaseBranch,
  GitContext,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "@agentplaneorg/core/git";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CommitTaskIntent } from "@agentplaneorg/core/commit";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import type { HooksRunOptions } from "./run.js";

function stringValue<T extends string>(value: unknown, allowed: Set<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

async function readTaskIntent(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<CommitTaskIntent | undefined> {
  const taskReadmePath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
  let parsed;
  try {
    parsed = parseTaskReadme(await readFile(taskReadmePath, "utf8"));
  } catch {
    return undefined;
  }
  const fm = parsed.frontmatter;
  const intent: CommitTaskIntent = {
    taskKind: stringValue(
      fm.task_kind,
      new Set(["analysis", "content", "docs", "code", "release", "ops"]),
    ),
    mutationScope: stringValue(
      fm.mutation_scope,
      new Set(["none", "docs", "code", "release", "ops", "unknown"]),
    ),
    blueprintRequest: stringValue(
      fm.blueprint_request,
      new Set([
        "analysis.light",
        "content.light",
        "docs.change",
        "code.direct",
        "code.branch_pr",
        "performance.benchmark",
        "quality.regression",
        "runner.execution",
        "post_run.improvement_review",
        "release.strict",
        "ops.approval",
      ]),
    ),
  };
  return intent.taskKind || intent.mutationScope || intent.blueprintRequest ? intent : undefined;
}

function envFlag(name: string): boolean {
  return (process.env[name] ?? "").trim() === "1";
}

function inferTaskIdFromBranch(branch: string | undefined, taskPrefix: string): string {
  const value = (branch ?? "").trim();
  if (!value) return "";
  return parseTaskIdFromBranch(taskPrefix, value) ?? parseTaskIdFromCloseBranch(value) ?? "";
}

async function currentBranchOrUndefined(gitRoot: string): Promise<string | undefined> {
  try {
    return await gitCurrentBranch(gitRoot);
  } catch {
    return undefined;
  }
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
