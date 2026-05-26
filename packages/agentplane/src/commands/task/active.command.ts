import type { TaskSummary } from "../../backends/task-backend.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { listTaskSummariesMemo, type CommandContext } from "../shared/task-backend.js";

import { handleTaskListWarnings, queryTaskProjection, type TaskListFilters } from "./shared.js";
import {
  annotateBranchPrTaskListState,
  taskListStatusKey,
  taskListStatusLabel,
} from "./shared/branch-pr-list-state.js";
import type { DependencyState } from "./shared/dependencies.js";

export type TaskActiveParsed = {
  filters: TaskListFilters;
  json: boolean;
};

type ActiveWorkItem = {
  task: {
    id: string;
    title: string;
    status: string;
    owner: string;
    priority: string | null;
  };
  dependency_readiness: {
    state: "ready" | "waiting" | "missing";
    depends_on: string[];
    missing: string[];
    incomplete: string[];
  };
  next_action: {
    code: string;
    command: string | null;
    summary: string;
    requires_approval: boolean;
  };
  blocker_count: number;
  blockers: { code: string; summary: string }[];
  source_freshness: "live_local";
  rank: {
    bucket: number;
    priority: number;
    status: string;
  };
};

const ACTIVE_SELECTOR_STATUSES = ["TODO", "DOING", "BLOCKED", "MERGED_PENDING_CLOSE"] as const;

export const taskActiveSpec: CommandSpec<TaskActiveParsed> = {
  id: ["task", "active"],
  group: "Task",
  summary:
    "Select active agent work with next actions, blockers, dependency readiness, and freshness.",
  options: [
    {
      kind: "string",
      name: "status",
      valueHint: "<status>",
      repeatable: true,
      description: "Repeatable. Filter by active status.",
    },
    {
      kind: "string",
      name: "owner",
      valueHint: "<owner>",
      repeatable: true,
      description: "Repeatable. Filter by owner id.",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Repeatable. Filter by tag.",
    },
    {
      kind: "boolean",
      name: "strict-read",
      default: false,
      description: "Fail if task scan skips malformed/unreadable task files.",
    },
    { kind: "string", name: "limit", valueHint: "<n>", description: "Max rows to print." },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress summary output." },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    { cmd: "agentplane task active", why: "Select the next active agent work item." },
    { cmd: "agentplane task active --owner CODER --limit 3", why: "Limit active work by owner." },
    { cmd: "agentplane task active --json", why: "Emit machine-readable active work state." },
  ],
  validateRaw: (raw) => {
    for (const key of ["status", "owner", "tag"] as const) {
      const list = toStringList(raw.opts[key]);
      if (list.some((s) => s.trim() === "")) {
        throw usageError({ spec: taskActiveSpec, message: `Invalid value for --${key}: empty.` });
      }
    }
    if (raw.opts.limit !== undefined) {
      const limitRaw = raw.opts.limit;
      if (typeof limitRaw !== "string") {
        throw usageError({
          spec: taskActiveSpec,
          message: `Invalid value for --limit: ${JSON.stringify(limitRaw)} (expected integer)`,
        });
      }
      const parsed = Number.parseInt(limitRaw, 10);
      if (!Number.isFinite(parsed)) {
        throw usageError({
          spec: taskActiveSpec,
          message: `Invalid value for --limit: ${limitRaw} (expected integer)`,
        });
      }
    }
  },
  parse: (raw) => ({
    filters: {
      status: toStringList(raw.opts.status),
      owner: toStringList(raw.opts.owner),
      tag: toStringList(raw.opts.tag),
      limit: typeof raw.opts.limit === "string" ? Number.parseInt(raw.opts.limit, 10) : undefined,
      quiet: raw.opts.quiet === true,
      strictRead: raw.opts["strict-read"] === true,
    },
    json: raw.opts.json === true,
  }),
};

function projectionStatuses(filters: TaskListFilters): string[] {
  const requested = filters.status.length > 0 ? filters.status : [...ACTIVE_SELECTOR_STATUSES];
  const statuses = new Set<string>();
  for (const status of requested) {
    const normalized = status.trim().toUpperCase();
    if (!normalized || normalized === "DONE") continue;
    if (normalized === "MERGED_PENDING_CLOSE") {
      statuses.add("TODO");
      statuses.add("DOING");
      statuses.add("BLOCKED");
      continue;
    }
    statuses.add(normalized);
  }
  statuses.add("DONE");
  return [...statuses];
}

function dependencyReadiness(
  dep: DependencyState | undefined,
): ActiveWorkItem["dependency_readiness"] {
  const dependsOn = dep?.dependsOn ?? [];
  const missing = dep?.missing ?? [];
  const incomplete = dep?.incomplete ?? [];
  return {
    state: missing.length > 0 ? "missing" : incomplete.length > 0 ? "waiting" : "ready",
    depends_on: dependsOn,
    missing,
    incomplete,
  };
}

function priorityRank(priority: string | undefined): number {
  const normalized = priority?.trim().toLowerCase() ?? "";
  if (normalized === "urgent") return 0;
  if (normalized === "high") return 1;
  if (normalized === "med" || normalized === "medium") return 2;
  if (normalized === "low") return 3;
  return 4;
}

function normalizePriority(priority: TaskSummary["priority"]): string | null {
  const normalized = priority === undefined || priority === null ? "" : String(priority).trim();
  return normalized === "" ? null : normalized;
}

function statusRank(status: string): number {
  if (status === "DOING") return 0;
  if (status === "TODO") return 1;
  if (status === "MERGED_PENDING_CLOSE") return 2;
  if (status === "BLOCKED") return 3;
  return 4;
}

function actionRank(item: {
  dependency: ActiveWorkItem["dependency_readiness"];
  status: string;
  nextCode: string;
  blockerCount: number;
  requiresApproval: boolean;
}): number {
  if (item.dependency.state !== "ready") return 80;
  if (item.requiresApproval) return 70;
  if (item.nextCode === "wait_runner") return 60;
  if (item.status === "DOING" && item.blockerCount === 0) return 0;
  if (item.nextCode === "merge_close_tail") return 5;
  if (item.nextCode === "verify_or_update_pr" || item.nextCode === "open_pr") return 10;
  if (item.nextCode === "start_or_recover_worktree") return 20;
  return 30 + Math.min(item.blockerCount, 20);
}

function isActiveSelectorTask(task: TaskSummary): boolean {
  const status = taskListStatusKey(task);
  return (
    status !== "DONE" &&
    ACTIVE_SELECTOR_STATUSES.includes(status as (typeof ACTIVE_SELECTOR_STATUSES)[number])
  );
}

function formatDependencyState(dep: ActiveWorkItem["dependency_readiness"]): string {
  if (dep.state === "ready") return dep.depends_on.length === 0 ? "none" : "ready";
  if (dep.state === "missing") return `missing:${dep.missing.join(",")}`;
  return `wait:${dep.incomplete.join(",")}`;
}

function formatActiveWorkLine(item: ActiveWorkItem): string {
  const extras = [
    `owner=${item.task.owner}`,
    ...(item.task.priority ? [`prio=${item.task.priority}`] : []),
    `deps=${formatDependencyState(item.dependency_readiness)}`,
    `next=${item.next_action.code}`,
    `blockers=${item.blocker_count}`,
    `source_freshness=${item.source_freshness}`,
  ];
  return `${item.task.id} [${item.task.status}] ${item.task.title || "(untitled task)"} (${extras.join(", ")})`;
}

async function buildActiveWorkItems(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  filters: TaskListFilters;
}): Promise<{ filteredCount: number; items: ActiveWorkItem[] }> {
  const tasks = await annotateBranchPrTaskListState({
    ctx: opts.ctx,
    tasks: await listTaskSummariesMemo(opts.ctx, {
      projectionStatus: projectionStatuses(opts.filters),
      fallbackToCanonicalOnEmpty: true,
    }),
  });
  handleTaskListWarnings({ backend: opts.ctx.taskBackend, strictRead: opts.filters.strictRead });
  const { depState, filtered } = queryTaskProjection({
    tasks,
    filters: opts.filters,
    defaultStatuses: [...ACTIVE_SELECTOR_STATUSES],
  });
  const active = filtered.filter((task) => isActiveSelectorTask(task));
  const items = await Promise.all(
    active.map(async (task) => {
      const route = await buildTaskRouteDecision({
        ctx: opts.ctx,
        cwd: opts.cwd,
        includeRemote: false,
        rootOverride: opts.rootOverride ?? null,
        taskId: task.id,
      });
      const dependency = dependencyReadiness(depState.get(task.id));
      const statusKey = taskListStatusKey(task);
      const status = taskListStatusLabel(task);
      const blockerCount = route.blockers.length;
      const priority = normalizePriority(task.priority);
      return {
        task: {
          id: task.id,
          title: task.title?.trim() ?? "",
          status,
          owner: task.owner?.trim() ?? "",
          priority,
        },
        dependency_readiness: dependency,
        next_action: {
          code: route.nextAction.code,
          command: route.nextAction.command,
          summary: route.nextAction.summary,
          requires_approval: route.nextAction.requiresApproval,
        },
        blocker_count: blockerCount,
        blockers: route.blockers.map((blocker) => ({ ...blocker })),
        source_freshness: "live_local" as const,
        rank: {
          bucket: actionRank({
            dependency,
            status: statusKey,
            nextCode: route.nextAction.code,
            blockerCount,
            requiresApproval: route.nextAction.requiresApproval,
          }),
          priority: priorityRank(priority ?? undefined),
          status: statusKey,
        },
      };
    }),
  );
  const sorted = items.toSorted((a, b) => {
    if (a.rank.bucket !== b.rank.bucket) return a.rank.bucket - b.rank.bucket;
    if (a.blocker_count !== b.blocker_count) return a.blocker_count - b.blocker_count;
    if (a.rank.priority !== b.rank.priority) return a.rank.priority - b.rank.priority;
    const statusDelta = statusRank(a.rank.status) - statusRank(b.rank.status);
    if (statusDelta !== 0) return statusDelta;
    return a.task.id.localeCompare(b.task.id);
  });
  return {
    filteredCount: active.length,
    items:
      opts.filters.limit !== undefined && opts.filters.limit >= 0
        ? sorted.slice(0, opts.filters.limit)
        : sorted,
  };
}

export function makeRunTaskActiveHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskActiveParsed): Promise<number> => {
    const commandCtx = await getCtx("task active");
    const result = await buildActiveWorkItems({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      filters: parsed.filters,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json({
        source_freshness: "live_local",
        count: result.items.length,
        filtered_count: result.filteredCount,
        items: result.items,
      });
      return 0;
    }
    output.report([], { header: infoMessage("task active") });
    for (const item of result.items) {
      output.line(formatActiveWorkLine(item));
    }
    if (!parsed.filters.quiet) {
      output.line(`Active: ${result.items.length} / ${result.filteredCount}`);
      if (result.items.length === 0) {
        output.line(
          "No active tasks matched. If you already have a task id, run `agentplane task brief <task-id>`; otherwise use `agentplane task list --all` to inspect historical tasks.",
        );
      }
    }
    return 0;
  };
}
