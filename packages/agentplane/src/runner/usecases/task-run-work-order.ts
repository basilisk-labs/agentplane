import { prepareAgentWorkOrder, requirePreparedAgentWorkOrder } from "./agent-work-order.js";

type TaskRunnerAgentWorkOrderOptions = Omit<
  Parameters<typeof prepareAgentWorkOrder>[0],
  "include_remote" | "include_runner_state"
> & {
  include_remote?: boolean;
  include_route_runner_state?: boolean;
};

/**
 * Preserve the runner's explicit remote opt-in while requiring one prepared
 * AgentWorkOrder before it can produce runner artifacts.
 */
export async function prepareTaskRunnerAgentWorkOrder(opts: TaskRunnerAgentWorkOrderOptions) {
  const { include_remote, include_route_runner_state, ...workOrderOpts } = opts;
  return requirePreparedAgentWorkOrder(
    await prepareAgentWorkOrder({
      ...workOrderOpts,
      ...(include_remote ? { include_remote: true } : {}),
      include_runner_state: include_route_runner_state ?? false,
    }),
  );
}
