import path from "node:path";

import { buildTaskDocState } from "../../shared/task-doc-state.js";

import type { BehaviorLayer } from "../behavior/index.js";
import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
import type {
  ClarificationContract,
  ClarificationQuestion,
  TaskGraphDependency,
  TaskGraphDraft,
  TaskGraphDraftTask,
  TaskIntakeContext,
  TaskIntakeInput,
  TaskIntakeRuntime,
  TaskMaterializationEntry,
  TaskMaterializationPlan,
} from "./types.js";

const TASK_INTAKE_BEHAVIOR_ORDER = [
  "harness",
  "extension",
  "user",
  "builtin",
] as const satisfies readonly BehaviorLayer[];

function dedupeTrimmed(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const value = String(raw ?? "").trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function normalizeOutcome(value: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error("Task intake context requires a non-empty requested outcome.");
  return normalized;
}

function normalizeSourceDetail(value: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error("Task intake source detail must be non-empty.");
  return normalized;
}

function normalizeInputs(inputs: readonly TaskIntakeInput[]): TaskIntakeInput[] {
  return inputs
    .map((input) => ({
      kind: input.kind,
      ...(input.label?.trim() ? { label: input.label.trim() } : {}),
      value: normalizeOutcome(input.value),
      ...(input.required === true ? { required: true } : {}),
    }))
    .toSorted(
      (left, right) =>
        left.kind.localeCompare(right.kind) ||
        (left.label ?? "").localeCompare(right.label ?? "") ||
        left.value.localeCompare(right.value),
    );
}

function normalizeQuestions(questions: readonly ClarificationQuestion[]): ClarificationQuestion[] {
  const seen = new Set<string>();
  const out: ClarificationQuestion[] = [];
  for (const raw of questions) {
    const id = raw.id.trim();
    const question = raw.question.trim();
    const reason = raw.reason.trim();
    if (!id) throw new Error("Clarification questions require a non-empty id.");
    if (!question) throw new Error(`Clarification question ${id} requires question text.`);
    if (!reason) throw new Error(`Clarification question ${id} requires a reason.`);
    if (seen.has(id)) throw new Error(`Clarification question ids must be unique: ${id}`);
    seen.add(id);
    out.push({
      id,
      question,
      reason,
      required: raw.required === true,
      ...(raw.target_field?.trim() ? { target_field: raw.target_field.trim() } : {}),
      ...(raw.accepted_values
        ? { accepted_values: dedupeTrimmed(raw.accepted_values).toSorted() }
        : {}),
    });
  }
  return out.toSorted((left, right) => left.id.localeCompare(right.id));
}

function normalizeDraftTasks(tasks: readonly TaskGraphDraftTask[]): TaskGraphDraftTask[] {
  if (tasks.length === 0) throw new Error("Task graph draft requires at least one task.");
  const seen = new Set<string>();
  return tasks.map((task) => {
    const draft_id = task.draft_id.trim();
    if (!draft_id) throw new Error("Task graph draft tasks require a non-empty draft_id.");
    if (seen.has(draft_id)) throw new Error(`Duplicate task graph draft id: ${draft_id}`);
    seen.add(draft_id);
    const title = task.title.trim();
    if (!title) throw new Error(`Task graph draft task ${draft_id} requires a title.`);
    const description = task.description.trim();
    if (!description) {
      throw new Error(`Task graph draft task ${draft_id} requires a description.`);
    }
    const owner = task.owner.trim();
    if (!owner) throw new Error(`Task graph draft task ${draft_id} requires an owner.`);
    const doc = task.doc.trim();
    if (!doc) throw new Error(`Task graph draft task ${draft_id} requires a task document.`);
    return {
      draft_id,
      title,
      description,
      owner,
      priority: task.priority,
      ...(task.origin ? { origin: structuredClone(task.origin) } : {}),
      tags: dedupeTrimmed(task.tags).toSorted(),
      verify: dedupeTrimmed(task.verify).toSorted(),
      depends_on: dedupeTrimmed(task.depends_on).toSorted(),
      doc,
      ...(task.doc_version ? { doc_version: task.doc_version } : {}),
      ...(task.id_source?.trim() ? { id_source: task.id_source.trim() } : {}),
    };
  });
}

function normalizeDependencies(
  tasks: readonly TaskGraphDraftTask[],
  dependencies: readonly TaskGraphDependency[],
): TaskGraphDependency[] {
  const taskIds = new Set(tasks.map((task) => task.draft_id));
  const seen = new Set<string>();
  const out: TaskGraphDependency[] = [];
  for (const dependency of dependencies) {
    if (!taskIds.has(dependency.from)) {
      throw new Error(`Task graph dependency source is unknown: ${dependency.from}`);
    }
    if (!taskIds.has(dependency.to)) {
      throw new Error(`Task graph dependency target is unknown: ${dependency.to}`);
    }
    const signature = `${dependency.from}:${dependency.kind}:${dependency.to}`;
    if (seen.has(signature)) continue;
    seen.add(signature);
    out.push({
      from: dependency.from,
      to: dependency.to,
      kind: "depends_on",
    });
  }
  return out.toSorted(
    (left, right) =>
      left.from.localeCompare(right.from) ||
      left.kind.localeCompare(right.kind) ||
      left.to.localeCompare(right.to),
  );
}

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

export function createTaskIntakeRuntime(opts: {
  repo: TaskIntakeRuntime["repo"];
  backend: {
    id: string;
    config_path: string;
    capabilities: TaskIntakeRuntime["backend"]["capabilities"];
    supports_generate_task_id: boolean;
    supports_bulk_write: boolean;
  };
  harness: Pick<ResolvedHarnessContract, "workflow" | "task" | "policy">;
  execution_profile: ResolvedExecutionProfileRuntime;
  capabilities: AgentplaneCapabilityRegistry;
}): TaskIntakeRuntime {
  return {
    repo: {
      git_root: opts.repo.git_root,
      agentplane_dir: opts.repo.agentplane_dir,
      workflow_dir: opts.repo.workflow_dir,
    },
    workflow: {
      mode: opts.harness.workflow.mode,
    },
    backend: {
      id: opts.backend.id,
      config_path: opts.backend.config_path,
      capabilities: opts.backend.capabilities ? structuredClone(opts.backend.capabilities) : null,
      supports_generate_task_id: opts.backend.supports_generate_task_id,
      supports_bulk_write: opts.backend.supports_bulk_write,
    },
    task_contract: {
      doc_sections: [...opts.harness.task.doc_sections],
      required_doc_sections: [...opts.harness.task.required_doc_sections],
      verify_required_tags: [...opts.harness.task.verify_required_tags],
    },
    policy: {
      approvals: structuredClone(opts.harness.policy.approvals),
      protected_paths: structuredClone(opts.harness.policy.protected_paths),
      unsafe_actions_requiring_explicit_user_ok: [
        ...opts.harness.policy.unsafe_actions_requiring_explicit_user_ok,
      ],
    },
    execution_profile: structuredClone(opts.execution_profile),
    capabilities: structuredClone(opts.capabilities),
    precedence: {
      behavior_order: [...TASK_INTAKE_BEHAVIOR_ORDER],
      extension_layer: "recipes",
    },
  };
}

export function createTaskIntakeContext(opts: {
  runtime: TaskIntakeRuntime;
  source: TaskIntakeContext["source"];
  requested_outcome: string;
  requested_owner?: string;
  requested_tags?: string[];
  requested_verify?: string[];
  requested_dependencies?: string[];
  parent_task_id?: string;
  inputs?: TaskIntakeInput[];
}): TaskIntakeContext {
  return {
    runtime: structuredClone(opts.runtime),
    source: {
      id: opts.source.id,
      detail: normalizeSourceDetail(opts.source.detail),
    },
    requested_outcome: normalizeOutcome(opts.requested_outcome),
    ...(opts.requested_owner?.trim() ? { requested_owner: opts.requested_owner.trim() } : {}),
    requested_tags: dedupeTrimmed(opts.requested_tags ?? []).toSorted(),
    requested_verify: dedupeTrimmed(opts.requested_verify ?? []).toSorted(),
    requested_dependencies: dedupeTrimmed(opts.requested_dependencies ?? []).toSorted(),
    ...(opts.parent_task_id?.trim() ? { parent_task_id: opts.parent_task_id.trim() } : {}),
    inputs: normalizeInputs(opts.inputs ?? []),
  };
}

export function createClarificationContract(opts: {
  context: TaskIntakeContext;
  assumptions?: string[];
  questions?: ClarificationQuestion[];
}): ClarificationContract {
  const questions = normalizeQuestions(opts.questions ?? []);
  return {
    context: structuredClone(opts.context),
    status: questions.some((question) => question.required) ? "needs_input" : "ready",
    assumptions: dedupeTrimmed(opts.assumptions ?? []),
    questions,
  };
}

export function createTaskGraphDraft(opts: {
  context: TaskIntakeContext;
  clarification: ClarificationContract;
  summary: string;
  tasks: TaskGraphDraftTask[];
  dependencies?: TaskGraphDependency[];
  warnings?: string[];
}): TaskGraphDraft {
  const tasks = normalizeDraftTasks(opts.tasks);
  return {
    context: structuredClone(opts.context),
    clarification: structuredClone(opts.clarification),
    summary: normalizeOutcome(opts.summary),
    tasks,
    dependencies: normalizeDependencies(tasks, opts.dependencies ?? []),
    warnings: dedupeTrimmed(opts.warnings ?? []),
  };
}

export async function materializeTaskGraphDraft(opts: {
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
