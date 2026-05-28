import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { parsePrMeta, resolvePrBatchIncludedTaskIds, type PrMeta } from "./pr-meta.js";
import type { CommandContext } from "./task-backend.js";

type RouteBatchTaskState = {
  id: string;
  status: string;
  owner: string | null;
  verification: string | null;
};

export type RouteBatchNextAction = {
  code: string;
  command: string | null;
  summary: string;
  requiresApproval: boolean;
  actionKind?: "local_command" | "provider_action" | "wait" | "stop";
};

export type RouteBatchOwnership =
  | { role: "none" }
  | {
      role: "primary" | "included";
      primaryTaskId: string;
      includedTaskIds: string[];
      allTaskIds: string[];
      branch: string | null;
      taskStates: RouteBatchTaskState[];
      nextOwnerAction: RouteBatchNextAction;
    };

async function readTaskPrMetaFiles(
  ctx: CommandContext,
): Promise<{ taskId: string; meta: PrMeta }[]> {
  const workflowDir = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir);
  let entries: string[];
  try {
    entries = await readdir(workflowDir);
  } catch {
    return [];
  }
  const metas: { taskId: string; meta: PrMeta }[] = [];
  await Promise.all(
    entries.map(async (taskId) => {
      const metaPath = path.join(workflowDir, taskId, "pr", "meta.json");
      try {
        const meta = parsePrMeta(await readFile(metaPath, "utf8"), taskId);
        metas.push({ taskId, meta });
      } catch {
        // Ignore malformed or absent PR artifacts here; route diagnostics stay best-effort.
      }
    }),
  );
  return metas;
}

async function resolveBatchTaskState(
  ctx: CommandContext,
  taskId: string,
): Promise<RouteBatchTaskState> {
  const task = await ctx.taskBackend.getTask(taskId).catch(() => null);
  return {
    id: taskId,
    status: task?.status ?? "MISSING",
    owner: task?.owner ?? null,
    verification: task?.verification?.state ?? null,
  };
}

function includedVerificationPending(state: RouteBatchTaskState): boolean {
  return state.verification !== "ok";
}

function deriveBatchNextOwnerAction(opts: {
  role: "primary" | "included";
  targetTask: TaskData;
  primaryTaskId: string;
  taskStates: RouteBatchTaskState[];
}): RouteBatchNextAction {
  if (opts.role === "included") {
    const current = opts.taskStates.find((state) => state.id === opts.targetTask.id);
    if (!current || includedVerificationPending(current)) {
      return {
        code: "verify_included_task",
        command: `agentplane verify ${opts.targetTask.id} --ok|--rework --by ${opts.targetTask.owner} --note "..."`,
        summary:
          "this task is included in a primary batch PR; verify this task instead of opening a separate PR",
        requiresApproval: false,
      };
    }
    return {
      code: "follow_primary_batch",
      command: `agentplane task brief ${opts.primaryTaskId}`,
      summary:
        "this included task is verified; continue through the primary batch task and shared PR branch",
      requiresApproval: false,
    };
  }

  const pendingIncluded = opts.taskStates.find(
    (state) => state.id !== opts.primaryTaskId && includedVerificationPending(state),
  );
  if (pendingIncluded) {
    return {
      code: "collect_included_verification",
      command: `agentplane task brief ${pendingIncluded.id}`,
      summary: "collect verification for included batch tasks before final integration",
      requiresApproval: false,
    };
  }
  return {
    code: "continue_primary_batch",
    command: null,
    summary: "primary task owns the shared batch branch and PR route",
    requiresApproval: false,
  };
}

export async function resolveBatchOwnership(opts: {
  ctx: CommandContext;
  task: TaskData;
}): Promise<RouteBatchOwnership> {
  const metas = await readTaskPrMetaFiles(opts.ctx);
  const primaryMatch =
    metas.find(
      ({ taskId, meta }) =>
        taskId === opts.task.id && resolvePrBatchIncludedTaskIds(meta).length > 0,
    ) ?? null;
  const includedMatch =
    primaryMatch ??
    metas.find(({ meta }) => resolvePrBatchIncludedTaskIds(meta).includes(opts.task.id)) ??
    null;
  if (!includedMatch) return { role: "none" };

  const primaryTaskId = includedMatch.taskId;
  const includedTaskIds = resolvePrBatchIncludedTaskIds(includedMatch.meta);
  const allTaskIds = [primaryTaskId, ...includedTaskIds];
  const taskStates = await Promise.all(
    allTaskIds.map((taskId) => resolveBatchTaskState(opts.ctx, taskId)),
  );
  const role = opts.task.id === primaryTaskId ? "primary" : "included";
  return {
    role,
    primaryTaskId,
    includedTaskIds,
    allTaskIds,
    branch: includedMatch.meta.branch ?? null,
    taskStates,
    nextOwnerAction: deriveBatchNextOwnerAction({
      role,
      targetTask: opts.task,
      primaryTaskId,
      taskStates,
    }),
  };
}
