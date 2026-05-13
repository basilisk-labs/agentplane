import type {
  ClarificationQuestion,
  TaskGraphDependency,
  TaskGraphDraftTask,
  TaskIntakeInput,
} from "./types.js";

export function dedupeTrimmed(values: readonly string[]): string[] {
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

export function normalizeOutcome(value: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error("Task intake context requires a non-empty requested outcome.");
  return normalized;
}

export function normalizeSourceDetail(value: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error("Task intake source detail must be non-empty.");
  return normalized;
}

export function normalizeInputs(inputs: readonly TaskIntakeInput[]): TaskIntakeInput[] {
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

export function normalizeQuestions(
  questions: readonly ClarificationQuestion[],
): ClarificationQuestion[] {
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

export function normalizeDraftTasks(tasks: readonly TaskGraphDraftTask[]): TaskGraphDraftTask[] {
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
      ...(task.task_kind ? { task_kind: task.task_kind } : {}),
      ...(task.mutation_scope ? { mutation_scope: task.mutation_scope } : {}),
      ...(task.risk_flags && task.risk_flags.length > 0
        ? { risk_flags: dedupeTrimmed(task.risk_flags).toSorted() as typeof task.risk_flags }
        : {}),
      ...(task.blueprint_request ? { blueprint_request: task.blueprint_request } : {}),
      ...(task.extensions ? { extensions: structuredClone(task.extensions) } : {}),
      verify: dedupeTrimmed(task.verify).toSorted(),
      depends_on: dedupeTrimmed(task.depends_on).toSorted(),
      doc,
      ...(task.doc_version ? { doc_version: task.doc_version } : {}),
      ...(task.id_source?.trim() ? { id_source: task.id_source.trim() } : {}),
    };
  });
}

export function normalizeDependencies(
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
