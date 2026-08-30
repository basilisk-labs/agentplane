import { taskKernel } from "@agentplaneorg/core/tasks";

/** Compatibility output only. This mapping is never accepted as command authority. */
const legacyStatus: Record<taskKernel.TaskState, string> = {
  CAPTURED: "TODO",
  PLANNING: "TODO",
  AWAITING_PLAN_APPROVAL: "TODO",
  ACTIVE: "DOING",
  FINAL_VALIDATION: "DOING",
  COMPLETED: "DONE",
  HUMAN_REQUIRED: "BLOCKED",
  BLOCKED: "BLOCKED",
  EFFECT_IN_DOUBT: "BLOCKED",
  CANCELLED: "BLOCKED",
};
export function projectKernelTask(aggregate: taskKernel.TaskAggregate) {
  const projection = {
    id: aggregate.id,
    canonical_revision: aggregate.revision,
    state: aggregate.state,
    status: legacyStatus[aggregate.state],
    plan_revision: aggregate.current_plan?.revision ?? null,
    plan_digest: aggregate.current_plan?.digest ?? null,
    work_items: Object.entries(aggregate.work_items)
      .toSorted(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([id, value]) => ({
        id,
        state: value.state,
        attempt: value.attempt,
        outputs: value.output_manifests.map((manifest) => manifest.id).toSorted(),
      })),
    validation: aggregate.final_validation,
    effects: aggregate.effects.map(({ id, kind, state }) => ({ id, kind, state })),
  };
  return { ...projection, digest: taskKernel.kernelDigest(projection) };
}
