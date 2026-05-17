import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { renderIncidentAdvice } from "../../runtime/incidents/index.js";
import {
  loadCommandContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { adviseTaskIncidents } from "../incidents/shared.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { findWorktreeForBranch } from "@agentplaneorg/core/git";
import { stat } from "node:fs/promises";
import path from "node:path";

import { cmdStart } from "./start.js";

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return false;
    throw err;
  }
}

async function assertBranchPrStartReadyLocation(opts: {
  ctx: CommandContext;
  taskId: string;
  author: string;
  body: string;
}): Promise<void> {
  const { ctx } = opts;
  if (ctx.config.workflow_mode !== "branch_pr") return;

  const relativeReadmePath = path.join(ctx.config.paths.workflow_dir, opts.taskId, "README.md");
  const baseReadmePath = path.join(ctx.resolvedProject.gitRoot, relativeReadmePath);
  if (await fileExists(baseReadmePath)) return;

  const branch = await resolveTaskBranchFromContext({ ctx, taskId: opts.taskId });
  if (!branch) return;

  const worktreePath = await findWorktreeForBranch(ctx.resolvedProject.gitRoot, branch);
  if (!worktreePath || worktreePath === ctx.resolvedProject.gitRoot) return;

  const worktreeReadmePath = path.join(worktreePath, relativeReadmePath);
  if (!(await fileExists(worktreeReadmePath))) return;

  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `Task ${opts.taskId} is owned by branch_pr worktree ${path.relative(
      ctx.resolvedProject.gitRoot,
      worktreePath,
    )}; run task start-ready from that worktree instead of the base checkout.`,
    context: withDiagnosticContext(
      {
        command: "task start-ready",
        task_id: opts.taskId,
        reason_code: "branch_pr_task_readme_in_worktree",
      },
      {
        state: "branch_pr task README is present in the task worktree, not the base checkout",
        likelyCause:
          "agentplane work start handed active task document ownership to the dedicated worktree",
        hint: "Owner-scoped branch_pr lifecycle commands must run from the task worktree after work start.",
        nextAction: {
          command: `agentplane task start-ready ${opts.taskId} --author ${opts.author} --body ${JSON.stringify(
            opts.body,
          )} --root ${JSON.stringify(worktreePath)}`,
          reason: "rerun start-ready against the checkout that owns the task README",
          reasonCode: "branch_pr_task_readme_in_worktree",
        },
      },
    ),
  });
}

export async function cmdTaskStartReady(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    await assertBranchPrStartReadyLocation({
      ctx,
      taskId: opts.taskId,
      author: opts.author,
      body: opts.body,
    });
    const result = await cmdStart({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      author: opts.author,
      body: opts.body,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: opts.force,
      yes: opts.yes,
      quiet: true,
    });
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("ready", opts.taskId)}\n`);
      const advice = await adviseTaskIncidents({
        ctx,
        taskId: opts.taskId,
        limit: 3,
      });
      if (advice.matches.length > 0) {
        process.stdout.write(`${infoMessage("incident advice for analogous tasks")}\n`);
        process.stdout.write(`${renderIncidentAdvice(advice.matches)}\n`);
      }
    }
    return result;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task start-ready", root: opts.rootOverride ?? null });
  }
}
