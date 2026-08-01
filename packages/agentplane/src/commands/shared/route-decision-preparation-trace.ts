import {
  measurePreparationNode,
  type PreparationTraceRecorder,
} from "../../shared/preparation-trace.js";

export async function traceRemoteProviderState<T>(opts: {
  recorder?: PreparationTraceRecorder | null;
  taskId: string;
  operation: () => Promise<T>;
}): Promise<T> {
  return await measurePreparationNode({
    recorder: opts.recorder,
    node: "remote_provider_state",
    scope: `task:${opts.taskId}:route`,
    dependencies: ["task_backend_read"],
    cacheability: "ttl",
    cachePolicyReason:
      "Remote provider observations require a bounded TTL and live revalidation before side effects.",
    operation: opts.operation,
    fingerprintInputs: (flow) => ({
      task_id: opts.taskId,
      provider_observation: flow,
    }),
    output: (flow) => flow,
  });
}

export async function tracePolicyAuthorityDecision<
  T extends { preconditionFingerprint: unknown },
>(opts: {
  recorder?: PreparationTraceRecorder | null;
  taskId: string;
  remoteEnabled: boolean;
  routeState: unknown;
  operation: () => Promise<T>;
}): Promise<T> {
  return await measurePreparationNode({
    recorder: opts.recorder,
    node: "policy_authority_decision",
    scope: `task:${opts.taskId}:route`,
    dependencies: [
      "task_backend_read",
      "git_snapshot",
      ...(opts.remoteEnabled ? ["remote_provider_state"] : []),
      "blueprint_resolution",
      "knowledge_retrieval",
      "policy_evaluation",
    ],
    cacheability: "none",
    cachePolicyReason:
      "Route and authority decisions require live state revalidation even with explicit provenance.",
    operation: opts.operation,
    fingerprintInputs: (step) => ({
      state_fingerprint: step.preconditionFingerprint,
      route_state: opts.routeState,
    }),
    output: (step) => step,
  });
}
