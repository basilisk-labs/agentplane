import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { resolveBaseBranch, GitContext } from "@agentplaneorg/core/git";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { CliError } from "../../shared/errors.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";
import type { HooksRunOptions } from "./run.js";
import {
  currentBranchOrUndefined,
  envFlag,
  inferTaskIdFromBranch,
  readTaskIntent,
} from "./task-context.js";

function normalizeGitPath(value: string): string {
  return value.replaceAll("\\", "/").replaceAll(/\/+/g, "/").replaceAll(/^\/+|\/+$/g, "");
}

function taskPathPrefix(workflowDir: string, taskId: string): string {
  return `${normalizeGitPath(workflowDir)}/${taskId}/`;
}

function taskIdFromTaskPath(filePath: string, workflowDir: string): string {
  const normalized = normalizeGitPath(filePath);
  const prefix = `${normalizeGitPath(workflowDir)}/`;
  if (!normalized.startsWith(prefix)) return "";
  return normalized.slice(prefix.length).split("/")[0] ?? "";
}

function isGeneratedTaskArtifact(filePath: string, workflowDir: string, taskId: string): boolean {
  const normalized = normalizeGitPath(filePath);
  const prefix = taskPathPrefix(workflowDir, taskId);
  if (!normalized.startsWith(prefix)) return false;
  const relative = normalized.slice(prefix.length);
  if (relative === "blueprint/resolved-snapshot.json") return true;
  if (!relative.startsWith("quality/")) return false;
  return (
    relative.endsWith("/quality-report.json") ||
    relative.endsWith("/evaluator-prompt.md") ||
    relative.endsWith("/evaluator-opinion.md")
  );
}

function inferSingleTaskIdFromPaths(paths: string[], workflowDir: string): string {
  const taskIds = [
    ...new Set(
      paths
        .map((filePath) => taskIdFromTaskPath(filePath, workflowDir))
        .filter((taskId) => taskId.length > 0),
    ),
  ];
  return taskIds.length === 1 ? (taskIds[0] ?? "") : "";
}

function assertGeneratedTaskArtifactsStaged(opts: {
  changed: string[];
  staged: string[];
  workflowDir: string;
  taskId: string;
}): void {
  if (!opts.taskId) return;
  const staged = new Set(opts.staged.map(normalizeGitPath));
  const missing = opts.changed
    .map(normalizeGitPath)
    .filter((filePath) => isGeneratedTaskArtifact(filePath, opts.workflowDir, opts.taskId))
    .filter((filePath) => !staged.has(filePath))
    .toSorted((a, b) => a.localeCompare(b));
  if (missing.length === 0) return;

  throw new CliError({
    exitCode: 5,
    code: "E_GIT",
    message: [
      "Generated task artifacts are not staged.",
      `task=${opts.taskId}`,
      "Stage these files or use `agentplane commit <task-id> -m \"...\" --allow-tasks`:",
      ...missing.map((filePath) => `- ${filePath}`),
    ].join("\n"),
    context: {
      task_id: opts.taskId,
      unstaged_generated_task_artifacts: missing,
      remediation:
        "Stage generated task artifacts before committing, or use agentplane commit with --allow-tasks so the active task subtree is staged automatically.",
    },
  });
}

export async function runPreCommitHook(opts: HooksRunOptions): Promise<number> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const git = new GitContext({ gitRoot: resolved.gitRoot });
  const staged = await git.statusStagedPaths();
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
  const changed = await git.statusChangedPaths();
  const taskId =
    (process.env.AGENTPLANE_TASK_ID ?? "").trim() ||
    inferTaskIdFromBranch(
      currentBranch,
      loaded.config.branch.task_prefix,
      loaded.config.branch.task_close_prefix,
    ) ||
    inferSingleTaskIdFromPaths([...staged, ...changed], loaded.config.paths.workflow_dir);
  assertGeneratedTaskArtifactsStaged({
    changed,
    staged,
    workflowDir: loaded.config.paths.workflow_dir,
    taskId,
  });
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
