import { parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";
import { isRecord } from "../../shared/guards.js";

export function completedWorkItemRecoveryReadme(markdown: string): string {
  const parsed = parseTaskReadme(markdown);
  const aggregate = parsed.frontmatter.extensions;
  const runtime = isRecord(aggregate) ? aggregate["agentplane.task_centric"] : null;
  if (isRecord(aggregate) && isRecord(runtime)) {
    // Completion changes runtime evidence, not the approved plan or its authority.
    for (const key of ["revision", "event_cursor", "updated_at", "final_validation"])
      Reflect.deleteProperty(runtime, key);
    if (isRecord(runtime.work_items)) {
      for (const item of Object.values(runtime.work_items)) {
        if (!isRecord(item)) continue;
        for (const key of [
          "state",
          "revision",
          "attempt",
          "claim_id",
          "output_manifests",
          "validation_result",
          "last_failure",
        ])
          Reflect.deleteProperty(item, key);
      }
    }
    Reflect.deleteProperty(aggregate, "agentplane.task_centric_runtime");
  }
  return renderTaskReadme(parsed.frontmatter, parsed.body);
}

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
