import { collectTaskIncidents } from "../incidents/shared.js";
import type { CommandContext } from "../shared/task-backend.js";
import { loadTaskForFinish, type LoadedFinishTask } from "./finish-shared.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

export async function loadFinishTasks(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<{
  loadedTasks: LoadedFinishTask[];
  primaryStatusFrom: string | null;
  primaryTag: string | null;
}> {
  const { ctx, options, plan } = opts;
  let primaryStatusFrom: string | null = null;
  let primaryTag: string | null = null;
  const loadedTasks: LoadedFinishTask[] = [];

  for (const taskId of options.taskIds) {
    const loaded = await loadTaskForFinish({
      ctx,
      store: plan.store,
      useStore: plan.useStore,
      taskId,
      taskCount: options.taskIds.length,
      metaTaskId: plan.metaTaskId,
      resultProvided: plan.resultProvided,
      resultSummary: plan.resultSummary,
      force: options.force,
      capturePrimaryLifecycleMeta: taskId === plan.primaryTaskId,
    });
    loadedTasks.push(loaded.loaded);
    if (taskId === plan.primaryTaskId) {
      primaryStatusFrom = loaded.primaryStatusFrom;
      primaryTag = loaded.primaryTag;
    }
  }

  return { loadedTasks, primaryStatusFrom, primaryTag };
}

export async function collectIncidentsForLoadedTasks(opts: {
  ctx: CommandContext;
  taskIds: string[];
  loadedTasks: LoadedFinishTask[];
  write: boolean;
}): Promise<{
  plans: Awaited<ReturnType<typeof collectTaskIncidents>>["plan"][];
  registryPaths: string[][];
}> {
  const plans = [];
  const registryPaths = [];
  for (const taskId of opts.taskIds) {
    const loadedTask = opts.loadedTasks.find((candidate) => candidate.taskId === taskId) ?? null;
    const collected = await collectTaskIncidents({
      ctx: opts.ctx,
      taskId,
      task: loadedTask?.task ?? null,
      write: opts.write,
    });
    plans.push(collected.plan);
    registryPaths.push(collected.registryPaths);
  }
  return { plans, registryPaths };
}
