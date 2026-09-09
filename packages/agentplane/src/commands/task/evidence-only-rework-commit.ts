import {
  parseTaskReadme,
  renderTaskReadme,
  setMarkdownSection,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  createTaskPlanRevision,
  parseExecutionGrant,
  computePlanDigest,
  type TaskPlanRevision,
} from "@agentplaneorg/core/tasks";
import { isRecord } from "../../shared/guards.js";

export function resolveEvidenceOnlyReworkCommit(opts: {
  purpose: string;
  changed_paths: readonly string[];
  recorded_commit: string | null;
  head: string | null;
  work_item_id: string | null;
  work_item_state: string | null | undefined;
  task_verification_state: string | undefined;
  quality_review_state?: string | undefined;
  quality_review_evaluated_sha?: string | null | undefined;
  head_is_managed_descendant?: boolean;
  all_required_work_items_completed: boolean;
}): string | null {
  if (
    !["implementation", "implementation_rework"].includes(opts.purpose) ||
    opts.changed_paths.length > 0 ||
    !opts.recorded_commit
  ) {
    return null;
  }
  const exactRecordedHead = opts.recorded_commit === opts.head;
  const exactVerifiedManagedDescendant =
    opts.head_is_managed_descendant === true &&
    opts.task_verification_state === "ok" &&
    opts.quality_review_state === "pass" &&
    opts.quality_review_evaluated_sha === opts.recorded_commit;
  if (!exactRecordedHead && !exactVerifiedManagedDescendant) return null;
  const reworkReady = opts.work_item_id
    ? opts.work_item_state === "REWORK_READY"
    : opts.task_verification_state === "needs_rework" && opts.all_required_work_items_completed;
  return reworkReady ? opts.recorded_commit : null;
}

export function selectRecordedImplementationRecoveryCommit(opts: {
  task_level_rework: boolean;
  recorded_commit: string | null;
  evidence_commit: string;
}): string {
  return opts.task_level_rework
    ? opts.evidence_commit
    : (opts.recorded_commit ?? opts.evidence_commit);
}

function approvedRecoveryPlan(plan: TaskPlanRevision): boolean {
  return (
    plan.approval.state === "approved" &&
    plan.approval.approved_digest === plan.digest &&
    createTaskPlanRevision({
      proposal: plan.proposal,
      revision: plan.revision,
      created_at: plan.created_at,
    }).digest === plan.digest
  );
}

function implementationPlanDigest(plan: TaskPlanRevision): string {
  return taskCentricDigest(
    plan.proposal.work_items.work_items.map(
      ({ validation, acceptance_criteria, objective, ...item }) => {
        void validation;
        void acceptance_criteria;
        void objective;
        return item;
      },
    ),
  );
}

export function approvedValidationRefinementReadmes(
  before: string,
  after: string,
): readonly [string, string] | null {
  const original = parseTaskReadme(before);
  const next = parseTaskReadme(after);
  const oldExtensions = original.frontmatter.extensions;
  const newExtensions = next.frontmatter.extensions;
  if (!isRecord(oldExtensions) || !isRecord(newExtensions)) return null;
  const oldTask = taskCentricAggregateFromExtensions(oldExtensions);
  const newTask = taskCentricAggregateFromExtensions(newExtensions);
  const previous = oldTask?.current_plan;
  const current = newTask?.current_plan;
  if (
    !oldTask ||
    !newTask ||
    !previous ||
    !current ||
    current.revision <= previous.revision ||
    !approvedRecoveryPlan(previous) ||
    !approvedRecoveryPlan(current) ||
    !isRecord(next.frontmatter.plan_approval) ||
    next.frontmatter.plan_approval.state !== "approved" ||
    taskCentricDigest(oldTask.intent) !== taskCentricDigest(newTask.intent) ||
    !newTask.plan_history?.some((entry) => taskCentricDigest(entry) === taskCentricDigest(previous))
  )
    return null;
  if (implementationPlanDigest(previous) !== implementationPlanDigest(current)) return null;

  const grantKey = "agentplane.execution_grant";
  if (Object.hasOwn(oldExtensions, grantKey) || Object.hasOwn(newExtensions, grantKey)) {
    const oldGrant = parseExecutionGrant(oldExtensions[grantKey]);
    const newGrant = parseExecutionGrant(newExtensions[grantKey]);
    if (
      !oldGrant ||
      !newGrant ||
      oldGrant.task_id !== oldTask.id ||
      newGrant.task_id !== oldTask.id ||
      !isRecord(original.frontmatter.sections) ||
      !isRecord(next.frontmatter.sections) ||
      typeof original.frontmatter.sections.Plan !== "string" ||
      typeof next.frontmatter.sections.Plan !== "string" ||
      oldGrant.plan_digest !== computePlanDigest(original.frontmatter.sections.Plan) ||
      newGrant.plan_digest !== computePlanDigest(next.frontmatter.sections.Plan) ||
      newGrant.plan_revision <= oldGrant.plan_revision ||
      oldGrant.scope_digest !== newGrant.scope_digest ||
      oldGrant.repository_identity !== newGrant.repository_identity ||
      oldGrant.completion_contract_digest !== newGrant.completion_contract_digest ||
      taskCentricDigest(oldGrant.capabilities) !== taskCentricDigest(newGrant.capabilities)
    )
      return null;
    newExtensions[grantKey] = oldExtensions[grantKey];
  }
  const runtimeKey = "agentplane.task_centric_runtime";
  if (Object.hasOwn(oldExtensions, runtimeKey) || Object.hasOwn(newExtensions, runtimeKey)) {
    const oldRuntime = oldExtensions[runtimeKey];
    const newRuntime = newExtensions[runtimeKey];
    if (!isRecord(oldRuntime) || !isRecord(newRuntime)) return null;
    const { mutation_receipts: oldReceipts, events: oldEvents, ...oldState } = oldRuntime;
    const { mutation_receipts: newReceipts, events: newEvents, ...newState } = newRuntime;
    if (
      !isRecord(oldReceipts) ||
      !isRecord(newReceipts) ||
      !Array.isArray(oldEvents) ||
      !Array.isArray(newEvents) ||
      taskCentricDigest(oldState) !== taskCentricDigest(newState) ||
      taskCentricDigest(oldEvents) !== taskCentricDigest(newEvents.slice(0, oldEvents.length)) ||
      Object.entries(oldReceipts).some(
        ([key, receipt]) =>
          taskCentricDigest(receipt) !== taskCentricDigest(newReceipts[key] ?? null),
      )
    )
      return null;
    const latest = Object.values(newReceipts).find(
      (receipt) => isRecord(receipt) && receipt.next_revision === newTask.revision,
    );
    if (
      !isRecord(latest) ||
      latest.task_id !== newTask.id ||
      latest.aggregate_digest !== taskCentricDigest(newTask)
    )
      return null;
  }

  // Only the current, approved validation is used. Historical claims and checks are not reused.
  // Keep the rest of the task contract exact, including execution scope, effects and base.
  for (const key of ["agentplane.task_centric", "agentplane.task_centric_runtime"]) {
    if (Object.hasOwn(oldExtensions, key)) newExtensions[key] = oldExtensions[key];
    else Reflect.deleteProperty(newExtensions, key);
  }
  for (const key of ["verify", "plan_approval"]) {
    if (Object.hasOwn(original.frontmatter, key)) next.frontmatter[key] = original.frontmatter[key];
    else Reflect.deleteProperty(next.frontmatter, key);
  }
  let oldBody = original.body;
  let newBody = next.body;
  for (const section of ["Plan", "Verify Steps"]) {
    oldBody = setMarkdownSection(oldBody, section, "");
    newBody = setMarkdownSection(newBody, section, "");
    for (const fields of [original.frontmatter, next.frontmatter]) {
      if (isRecord(fields.sections)) fields.sections[section] = "";
    }
  }
  return [
    renderTaskReadme(original.frontmatter, oldBody),
    renderTaskReadme(next.frontmatter, newBody),
  ];
}
