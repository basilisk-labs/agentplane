import { mapBackendError } from "../../cli/error-map.js";
import { warnMessage } from "../../cli/output.js";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  listTaskSummariesMemo,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import {
  formatTaskLine,
  handleTaskListWarnings,
  queryTaskProjection,
  type TaskListFilters,
} from "./shared.js";
import {
  createTaskExecutionLifecycleResolver,
  formatTaskExecutionListExtra,
} from "./execution-summary.js";
import { annotateBranchPrTaskListState, taskListStatusKey } from "./shared/branch-pr-list-state.js";
import { asCliError } from "../../shared/errors.js";
import { listCompletedScopeDiagnosticProjection } from "../shared/task-backend-branch-snapshot.js";

const DEFAULT_ACTIVE_TASK_LIST_STATUSES = [
  "TODO",
  "DOING",
  "BLOCKED",
  "MERGED_PENDING_CLOSE",
  "VERIFIED_PENDING_CLOSEOUT",
] as const;

function resolveProjectionStatusesForList(filters: TaskListFilters): string[] | undefined {
  if (filters.all && filters.status.length === 0) return undefined;
  const requested = filters.status.length > 0 ? filters.status : DEFAULT_ACTIVE_TASK_LIST_STATUSES;
  const statuses = new Set<string>();
  for (const status of requested) {
    const normalized = status.trim().toUpperCase();
    if (!normalized) continue;
    if (normalized === "MERGED_PENDING_CLOSE") {
      statuses.add("TODO");
      statuses.add("DOING");
      statuses.add("BLOCKED");
      continue;
    }
    if (normalized === "VERIFIED_PENDING_CLOSEOUT") {
      statuses.add("DOING");
      continue;
    }
    statuses.add(normalized);
  }
  if (statuses.size > 0) statuses.add("DONE");
  return statuses.size > 0 ? [...statuses] : undefined;
}

export async function warnIfLocalTaskStateBehindUpstream(ctx: CommandContext): Promise<void> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      [
        "for-each-ref",
        "--format=%(HEAD)%00%(refname:short)%00%(upstream:short)%00%(upstream:track,nobracket)",
        "refs/heads",
      ],
      { cwd: ctx.resolvedProject.gitRoot, env: gitEnv() },
    );
    const current = String(stdout)
      .split("\n")
      .map((line) => line.split("\0"))
      .find(([head]) => head === "*");
    if (!current) return;
    const [, branch = "HEAD", upstream = "", tracking = ""] = current;
    if (!upstream.trim()) return;
    const behind = Number.parseInt(/(?:^|,\s*)behind\s+(\d+)/u.exec(tracking)?.[1] ?? "0", 10);
    if (behind === 0) return;
    process.stderr.write(
      `${warnMessage(
        `local task state may be stale: ${branch} is behind ${upstream} by ${behind} commit(s); fetch/rebase before making task decisions`,
      )}\n`,
    );
  } catch {
    // Task listing must stay available in detached, shallow, or partially initialized repos.
  }
}

function isUnprovenCompletedScope(error: unknown): boolean {
  const cli = asCliError(error);
  return cli?.context?.reason_code === "completed_scope_admission_unproven";
}

/**
 * Listing is read-only. A completed-scope admission is proven with local private
 * evidence under the Git common directory, which a fresh or cloud clone never has.
 * Instead of failing the whole listing, fall back to the same diagnostic projection
 * that `task active` uses: unproven Tasks stay visible without authentication
 * permits, so every write path still fails closed. `--strict-read` keeps the error.
 */
export async function listTaskSummariesForDisplay(
  ctx: CommandContext,
  opts: { projectionStatus: string[] | undefined; strictRead: boolean },
) {
  try {
    return await listTaskSummariesMemo(ctx, {
      projectionStatus: opts.projectionStatus,
      fallbackToCanonicalOnEmpty: opts.projectionStatus !== undefined,
    });
  } catch (error) {
    if (opts.strictRead || !isUnprovenCompletedScope(error)) throw error;
    const diagnostics = await listCompletedScopeDiagnosticProjection(ctx);
    if (!diagnostics) throw error;
    if (diagnostics.failures.size > 0) {
      const ids = [...diagnostics.failures.keys()].toSorted();
      const shown = ids.slice(0, 5).join(", ");
      const more = ids.length > 5 ? ` (+${ids.length - 5} more)` : "";
      process.stderr.write(
        `${warnMessage(
          `completed-scope admission is unproven in this checkout for ${ids.length} task(s): ${shown}${more}; local evidence under the Git common directory is missing (fresh clone?). Listed read-only; use --strict-read to fail instead.`,
        )}\n`,
      );
    }
    return diagnostics.tasks;
  }
}

export async function cmdTaskListWithFilters(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  filters: TaskListFilters;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const staleStateWarning = warnIfLocalTaskStateBehindUpstream(ctx);
    const projectionStatus = resolveProjectionStatusesForList(opts.filters);
    const tasks = await annotateBranchPrTaskListState({
      ctx,
      tasks: await listTaskSummariesForDisplay(ctx, {
        projectionStatus,
        strictRead: opts.filters.strictRead === true,
      }),
    });
    await staleStateWarning;
    handleTaskListWarnings({ backend: ctx.taskBackend, strictRead: opts.filters.strictRead });
    const { depState, items } = queryTaskProjection({
      tasks,
      filters: opts.filters,
      defaultStatuses: opts.filters.all ? undefined : [...DEFAULT_ACTIVE_TASK_LIST_STATUSES],
    });
    const resolveExecution = createTaskExecutionLifecycleResolver();
    for (const task of items) {
      const execution = resolveExecution(task);
      process.stdout.write(
        `${formatTaskLine(task, depState.get(task.id), [formatTaskExecutionListExtra(execution)])}\n`,
      );
    }
    if (!opts.filters.quiet) {
      const counts: Record<string, number> = {};
      for (const task of items) {
        const status = taskListStatusKey(task);
        counts[status] = (counts[status] ?? 0) + 1;
      }
      const total = items.length;
      const summary = Object.keys(counts)
        .toSorted()
        .map((key) => `${key}=${counts[key]}`)
        .join(", ");
      process.stdout.write(`Total: ${total}${summary ? ` (${summary})` : ""}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task list", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskList(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  filters: TaskListFilters;
}): Promise<number> {
  return await cmdTaskListWithFilters(opts);
}
