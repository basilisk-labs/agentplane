import {
  readIntegrationQueue,
  type IntegrationQueueEntry,
  type IntegrationQueueState,
} from "./pr/integrate/queue-state.js";

export const INTEGRATION_QUEUE_LIST_RESULT_SCHEMA = "agentplane.integration_queue.list.v1" as const;

export type IntegrationQueueListResult = {
  schema: typeof INTEGRATION_QUEUE_LIST_RESULT_SCHEMA;
  operation: "integrate.queue.list";
  queue: IntegrationQueueState;
  active_entries: IntegrationQueueEntry[];
  audit: {
    authority: "local_read";
    attempts: 1;
    effects_applied: 0;
  };
};

export async function inspectIntegrationQueueList(
  gitRoot: string,
): Promise<IntegrationQueueListResult> {
  const queue = await readIntegrationQueue(gitRoot);
  return {
    schema: INTEGRATION_QUEUE_LIST_RESULT_SCHEMA,
    operation: "integrate.queue.list",
    queue,
    active_entries: queue.entries.filter(
      (entry) => entry.status !== "done" && entry.status !== "superseded",
    ),
    audit: {
      authority: "local_read",
      attempts: 1,
      effects_applied: 0,
    },
  };
}
