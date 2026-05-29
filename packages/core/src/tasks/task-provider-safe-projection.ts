import { isRecord } from "../types/guards.js";
import type { TaskDocSections, TaskDocVersion } from "./task-doc-contract.js";
import type {
  PlanApprovalState,
  QualityReviewState,
  TaskFrontmatter,
  TaskRunnerOutcomeStatus,
  VerificationState,
} from "./task-store.js";
import type { TaskStatus } from "./task-status.js";

export type ProviderSafeAcrProjection = {
  present: boolean;
  stale: boolean;
  record_id?: string;
  created_at?: string;
  result_status?: string;
  merge_ready?: boolean;
  evidence_count: number;
};

export type ProviderSafeTaskProjection = {
  schema_version: 1;
  task_id: string;
  title: string;
  status: TaskStatus | string;
  priority: string;
  owner: string;
  tags: string[];
  depends_on: string[];
  result_summary?: string;
  risk_level?: "low" | "med" | "high";
  breaking?: boolean;
  task_kind?: string;
  mutation_scope?: string;
  plan_approval_state: PlanApprovalState;
  plan_approved: boolean;
  verification_state: VerificationState;
  verification_attempts: number;
  quality_review_state?: QualityReviewState;
  runner_status?: TaskRunnerOutcomeStatus;
  commit_hash?: string;
  doc_version?: TaskDocVersion;
  doc_updated_at?: string;
  doc_updated_by?: string;
  verify_steps_count: number;
  section_presence: {
    summary: boolean;
    scope: boolean;
    plan: boolean;
    verify_steps: boolean;
    verification: boolean;
    rollback_plan: boolean;
    findings: boolean;
  };
  rollback_present: boolean;
  findings_present: boolean;
  verification_log_present: boolean;
  sync_external_ref_count: number;
  sync_open_conflict_count: number;
  sync_stale: boolean;
  primary_external_ref?: {
    provider: string;
    remote_id: string;
    remote_url?: string;
  };
  acr?: ProviderSafeAcrProjection;
};

export type ProviderSafeTaskProjectionInput = Pick<
  TaskFrontmatter,
  | "id"
  | "title"
  | "result_summary"
  | "risk_level"
  | "breaking"
  | "status"
  | "priority"
  | "owner"
  | "depends_on"
  | "tags"
  | "verify"
  | "plan_approval"
  | "verification"
  | "quality_review"
  | "runner"
  | "sync"
  | "sections"
  | "doc_version"
  | "doc_updated_at"
  | "doc_updated_by"
  | "commit"
> & {
  task_kind?: string;
  mutation_scope?: string;
};

export function buildProviderSafeTaskProjection(
  task: ProviderSafeTaskProjectionInput,
  opts?: { acr?: unknown },
): ProviderSafeTaskProjection {
  const sections = task.sections ?? {};
  const summaryPresent = sectionHasContent(sections, "Summary");
  const scopePresent = sectionHasContent(sections, "Scope");
  const planPresent = sectionHasContent(sections, "Plan");
  const verifyStepsPresent = sectionHasContent(sections, "Verify Steps");
  const verificationPresent = sectionHasContent(sections, "Verification");
  const rollbackPresent = sectionHasContent(sections, "Rollback Plan");
  const findingsPresent = sectionHasContent(sections, "Findings");
  const primaryExternalRef = task.sync?.external_refs[0];
  const openConflicts =
    task.sync?.conflicts.filter((conflict) => conflict.status === "open").length ?? 0;
  const acr = buildProviderSafeAcrProjection(task.id, opts?.acr);

  return {
    schema_version: 1,
    task_id: task.id,
    title: task.title,
    status: task.status,
    priority: String(task.priority),
    owner: task.owner,
    tags: [...task.tags],
    depends_on: [...task.depends_on],
    ...(typeof task.result_summary === "string" ? { result_summary: task.result_summary } : {}),
    ...(task.risk_level ? { risk_level: task.risk_level } : {}),
    ...(typeof task.breaking === "boolean" ? { breaking: task.breaking } : {}),
    ...(typeof task.task_kind === "string" ? { task_kind: task.task_kind } : {}),
    ...(typeof task.mutation_scope === "string" ? { mutation_scope: task.mutation_scope } : {}),
    plan_approval_state: task.plan_approval?.state ?? "pending",
    plan_approved: task.plan_approval?.state === "approved",
    verification_state: task.verification?.state ?? "pending",
    verification_attempts: task.verification?.attempts ?? 0,
    ...(task.quality_review?.state ? { quality_review_state: task.quality_review.state } : {}),
    ...(task.runner?.status ? { runner_status: task.runner.status } : {}),
    ...(task.commit?.hash ? { commit_hash: task.commit.hash } : {}),
    ...(task.doc_version ? { doc_version: task.doc_version } : {}),
    ...(task.doc_updated_at ? { doc_updated_at: task.doc_updated_at } : {}),
    ...(task.doc_updated_by ? { doc_updated_by: task.doc_updated_by } : {}),
    verify_steps_count: task.verify.length,
    section_presence: {
      summary: summaryPresent,
      scope: scopePresent,
      plan: planPresent,
      verify_steps: verifyStepsPresent,
      verification: verificationPresent,
      rollback_plan: rollbackPresent,
      findings: findingsPresent,
    },
    rollback_present: rollbackPresent,
    findings_present: findingsPresent,
    verification_log_present: verificationPresent,
    sync_external_ref_count: task.sync?.external_refs.length ?? 0,
    sync_open_conflict_count: openConflicts,
    sync_stale: task.sync?.freshness?.stale === true,
    ...(primaryExternalRef
      ? {
          primary_external_ref: {
            provider: primaryExternalRef.provider,
            remote_id: primaryExternalRef.remote_id,
            ...(primaryExternalRef.remote_url ? { remote_url: primaryExternalRef.remote_url } : {}),
          },
        }
      : {}),
    ...(acr ? { acr } : {}),
  };
}

function sectionHasContent(sections: TaskDocSections, title: string): boolean {
  const value = sections[title];
  return typeof value === "string" && value.trim().length > 0;
}

function buildProviderSafeAcrProjection(
  taskId: string,
  value: unknown,
): ProviderSafeAcrProjection | undefined {
  if (!isRecord(value)) return undefined;
  const recordTask = isRecord(value.task) ? value.task : null;
  const result = isRecord(value.result) ? value.result : null;
  const evidence = Array.isArray(value.evidence) ? value.evidence : [];
  return {
    present: true,
    stale: typeof recordTask?.task_id === "string" ? recordTask.task_id !== taskId : true,
    ...(typeof value.record_id === "string" && value.record_id.trim()
      ? { record_id: value.record_id.trim() }
      : {}),
    ...(typeof value.created_at === "string" && value.created_at.trim()
      ? { created_at: value.created_at.trim() }
      : {}),
    ...(typeof result?.status === "string" ? { result_status: result.status } : {}),
    ...(typeof result?.merge_ready === "boolean" ? { merge_ready: result.merge_ready } : {}),
    evidence_count: evidence.length,
  };
}
