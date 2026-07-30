import { CliError } from "../../../shared/errors.js";
import type { IntegrationQueueState, QueueClock } from "./queue-state.js";
import { markQueueEntryStatus } from "./queue-state-transition.js";

export function recordSupersededQueueEntry(
  state: IntegrationQueueState,
  opts: {
    taskId: string;
    supersededByTaskId: string;
    reason: string;
    clock?: QueueClock;
  },
): IntegrationQueueState {
  const supersededByTaskId = opts.supersededByTaskId.trim();
  const reason = opts.reason.trim();
  if (!supersededByTaskId || !reason) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Superseded integration outcomes require a successor task and a reason.",
    });
  }
  const clock = opts.clock ?? { now: () => new Date() };
  let found = false;
  const entries = state.entries.map((entry) => {
    if (entry.task_id !== opts.taskId) return entry;
    found = true;
    if (entry.status !== "rework") {
      throw new CliError({
        code: "E_HANDOFF",
        message:
          `Integration queue entry ${opts.taskId} must be in rework before recording ` +
          "a semantic supersession outcome.",
        context: {
          reason_code: "superseded_queue_requires_rework",
          task_id: opts.taskId,
          queue_status: entry.status,
        },
      });
    }
    return {
      ...markQueueEntryStatus(entry, "done", reason, clock),
      status: "superseded" as const,
      superseded_by_task_id: supersededByTaskId,
    };
  });
  if (!found) {
    throw new CliError({
      code: "E_HANDOFF",
      message: `Integration queue entry not found for semantic supersession: ${opts.taskId}`,
      context: { reason_code: "superseded_queue_entry_missing", task_id: opts.taskId },
    });
  }
  return { schema_version: 1, entries };
}
