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
