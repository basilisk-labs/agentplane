import path from "node:path";

import { buildTaskDocState } from "../../task-doc/state.js";

import type {
  TaskGraphDraft,
  TaskGraphDraftTask,
  TaskIntakeContext,
  TaskMaterializationEntry,
  TaskMaterializationPlan,
} from "./types.js";
import { dedupeTrimmed } from "./resolve-normalize.js";

function resolveTaskIds(opts: {
  tasks: readonly TaskGraphDraftTask[];
  task_ids?: Record<string, string>;
  allocateTaskId?: (task: TaskGraphDraftTask, index: number) => Promise<string>;
}): Promise<Map<string, string>> {
  const provided = new Map<string, string>();
  const taskIds = opts.task_ids ?? {};
  for (const task of opts.tasks) {
    const taskId = taskIds[task.draft_id]?.trim();
    if (taskId) provided.set(task.draft_id, taskId);
  }
  return (async () => {
    if (provided.size === opts.tasks.length) return provided;
    if (!opts.allocateTaskId) {
      throw new Error(
        "Task graph materialization requires task_ids for every draft task or an allocateTaskId callback.",
      );
    }
    for (const [index, task] of opts.tasks.entries()) {
      if (provided.has(task.draft_id)) continue;
      const allocatedTaskId = await opts.allocateTaskId(task, index);
      const taskId = allocatedTaskId.trim();
      if (!taskId) {
        throw new Error(`Task id allocator returned an empty id for draft ${task.draft_id}.`);
      }
      provided.set(task.draft_id, taskId);
    }
    return provided;
  })();
}

function buildMaterializedTask(opts: {
  context: TaskIntakeContext;
  draftTask: TaskGraphDraftTask;
  task_id: string;
  internal_dependencies: string[];
  created_at: string;
}): TaskMaterializationEntry {
  const normalizedDoc = buildTaskDocState({
    doc: opts.draftTask.doc,
    owner: opts.draftTask.owner,
    updatedBy: opts.draftTask.owner,
    version: opts.draftTask.doc_version ?? 3,
    updatedAt: opts.created_at,
  });
  const task = {
    id: opts.task_id,
    title: opts.draftTask.title,
    description: opts.draftTask.description,
    status: "TODO",
    priority: opts.draftTask.priority,
    owner: opts.draftTask.owner,
    revision: 1,
    ...(opts.draftTask.origin ? { origin: structuredClone(opts.draftTask.origin) } : {}),
    depends_on: dedupeTrimmed([
      ...opts.draftTask.depends_on,
      ...opts.internal_dependencies,
    ]).toSorted(),
    tags: [...opts.draftTask.tags],
    verify: [...opts.draftTask.verify],
    comments: [],
    events: [],
    doc_version: normalizedDoc.doc_version,
    doc_updated_at: normalizedDoc.doc_updated_at,
    doc_updated_by: normalizedDoc.doc_updated_by,
    id_source: opts.draftTask.id_source ?? "generated",
    doc: normalizedDoc.doc,
    sections: normalizedDoc.sections,
  } satisfies TaskMaterializationEntry["task"];

  return {
    draft_id: opts.draftTask.draft_id,
    task_id: opts.task_id,
    task,
    readme_path: path.join(
      opts.context.runtime.repo.git_root,
      opts.context.runtime.repo.workflow_dir,
      opts.task_id,
      "README.md",
    ),
  };
}

export async function materializeTaskGraphDraftPlan(opts: {
  draft: TaskGraphDraft;
  task_ids?: Record<string, string>;
  allocateTaskId?: (task: TaskGraphDraftTask, index: number) => Promise<string>;
  created_at?: string;
}): Promise<TaskMaterializationPlan> {
  if (opts.draft.clarification.status === "needs_input") {
    throw new Error("Task graph materialization requires clarification.status=ready.");
  }
  const created_at = opts.created_at ?? new Date().toISOString();
  const taskIds = await resolveTaskIds({
    tasks: opts.draft.tasks,
    task_ids: opts.task_ids,
    allocateTaskId: opts.allocateTaskId,
  });

  const tasks = opts.draft.tasks.map((draftTask) => {
    const task_id = taskIds.get(draftTask.draft_id);
    if (!task_id) {
      throw new Error(`Task id resolution lost draft task ${draftTask.draft_id}.`);
    }
    const internal_dependencies = opts.draft.dependencies
      .filter((dependency) => dependency.from === draftTask.draft_id)
      .map((dependency) => {
        const resolved = taskIds.get(dependency.to);
        if (!resolved) {
          throw new Error(`Task id resolution lost dependency target ${dependency.to}.`);
        }
        return resolved;
      });

    return buildMaterializedTask({
      context: opts.draft.context,
      draftTask,
      task_id,
      internal_dependencies,
      created_at,
    });
  });

  return {
    context: structuredClone(opts.draft.context),
    summary: opts.draft.summary,
    backend: structuredClone(opts.draft.context.runtime.backend),
    tasks,
  };
}
