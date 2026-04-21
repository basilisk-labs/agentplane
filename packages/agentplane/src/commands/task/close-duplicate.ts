import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  loadTaskFromContext,
  taskDataToFrontmatter,
  type CommandContext,
} from "../shared/task-backend.js";
import { listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { recordVerifiedNoopClosure } from "./close-shared.js";

async function ensureLocalTaskReadmeHydrated(opts: {
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

export async function cmdTaskCloseDuplicate(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  duplicateOf: string;
  author: string;
  note?: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const sourceId = opts.taskId.trim();
    const duplicateOf = opts.duplicateOf.trim();
    if (!sourceId || !duplicateOf) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Both task id and --of must be non-empty.",
      });
    }
    if (sourceId === duplicateOf) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Duplicate target must differ from task id (${sourceId}).`,
      });
    }
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: opts.ctx.config,
        yes: opts.yes,
        reason: "task close-duplicate --force",
      });
    }

    const canonical = await loadTaskFromContext({ ctx: opts.ctx, taskId: duplicateOf });
    await ensureLocalTaskReadmeHydrated({ ctx: opts.ctx, taskId: sourceId });
    const reason = opts.note?.trim();
    const canonicalTitle = canonical.title?.trim() ? ` (${canonical.title.trim()})` : "";
    const baseBody =
      `Verified: ${sourceId} is a bookkeeping duplicate of ${duplicateOf}${canonicalTitle}; ` +
      "no code/config changes are expected in this task and closure is recorded as no-op.";
    const body = reason ? `${baseBody}\n\nReason: ${reason}` : baseBody;
    await recordVerifiedNoopClosure({
      ctx: opts.ctx,
      taskId: sourceId,
      author: opts.author,
      body,
      resultSummary: `Closed as duplicate of ${duplicateOf}.`,
      quiet: opts.quiet,
      successMessage: `task.done: ${sourceId} (duplicate of ${duplicateOf})`,
      force: opts.force,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task close-duplicate",
      root: opts.rootOverride ?? null,
    });
  }
}
