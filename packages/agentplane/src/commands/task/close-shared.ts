import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { normalizeTaskStatus, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import {
  loadTaskFromContext,
  taskDataToFrontmatter,
  type CommandContext,
} from "../shared/task-backend.js";
import { applyTaskStatusTransitionCommand, nowIso, requireStructuredComment } from "./shared.js";

export async function ensureLocalTaskReadmeHydrated(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<void> {
  const workflowDir = opts.ctx.config.paths.workflow_dir;
  const targetReadmePath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    workflowDir,
    opts.taskId,
    "README.md",
  );
  if (await fileExists(targetReadmePath)) return;

  const worktrees = await listWorktrees(opts.ctx.resolvedProject.gitRoot).catch(() => []);
  const matchingTaskWorktrees = worktrees.filter(
    (entry) =>
      typeof entry.branch === "string" &&
      parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, entry.branch) === opts.taskId,
  );
  if (matchingTaskWorktrees.length === 1) {
    const sourceReadmePath = path.join(
      matchingTaskWorktrees[0].path,
      workflowDir,
      opts.taskId,
      "README.md",
    );
    if (await fileExists(sourceReadmePath)) {
      const text = await readFile(sourceReadmePath, "utf8");
      await mkdir(path.dirname(targetReadmePath), { recursive: true });
      await writeTextIfChanged(targetReadmePath, text);
      return;
    }
  }

  const task = await loadTaskFromContext({
    ctx: opts.ctx,
    taskId: opts.taskId,
    preferBranchSnapshot: true,
  });
  const rendered = renderTaskReadme(taskDataToFrontmatter(task), task.doc ?? "");
  await mkdir(path.dirname(targetReadmePath), { recursive: true });
  await writeTextIfChanged(targetReadmePath, rendered);
}

export async function recordVerifiedNoopClosure(opts: {
  ctx: CommandContext;
  taskId: string;
  author: string;
  body: string;
  resultSummary: string;
  quiet: boolean;
  successMessage: string;
  force: boolean;
}): Promise<void> {
  const verifiedCfg = opts.ctx.config.tasks.comments.verified;
  requireStructuredComment(opts.body, verifiedCfg.prefix, verifiedCfg.min_chars);

  const at = nowIso();
  await applyTaskStatusTransitionCommand({
    ctx: opts.ctx,
    taskId: opts.taskId,
    quiet: opts.quiet,
    policyAction: "task_finish",
    phase: "finish",
    build: (task) => {
      if (!opts.force && normalizeTaskStatus(task.status) === "DONE") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is already DONE: ${opts.taskId} (use --force to override)`,
        });
      }
      return {
        at,
        toStatus: "DONE",
        eventAuthor: opts.author,
        updatedBy: opts.author,
        note: opts.body,
        comment: { author: opts.author, body: opts.body },
        extraFields: {
          result_summary: opts.resultSummary,
          risk_level: "low",
          breaking: false,
        },
        force: true,
        dependencyPolicy: { kind: "none" },
      };
    },
  });

  if (!opts.quiet) {
    process.stdout.write(`${opts.successMessage}\n`);
  }
}
