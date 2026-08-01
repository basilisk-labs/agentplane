import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import {
  measurePreparationNode,
  type PreparationTraceRecorder,
} from "../../shared/preparation-trace.js";

type ComponentOperation = () => Promise<StateFingerprintComponentInput>;

export async function traceWorkflowFingerprintComponents(opts: {
  scope: string;
  recorder?: PreparationTraceRecorder | null;
  backendId: string;
  policyScope: unknown;
  selectedPolicyPaths: readonly string[];
  observeKnowledge: ComponentOperation;
  observePolicy: ComponentOperation;
  observeBackend: ComponentOperation;
}): Promise<
  [StateFingerprintComponentInput, StateFingerprintComponentInput, StateFingerprintComponentInput]
> {
  return await Promise.all([
    measurePreparationNode({
      recorder: opts.recorder,
      node: "knowledge_retrieval",
      scope: opts.scope,
      dependencies: ["command_context"],
      cacheability: "exact",
      cachePolicyReason: "Knowledge manifest and digest-bound references are fingerprinted.",
      operation: opts.observeKnowledge,
      fingerprintInputs: (observation) => ({ knowledge_observation: observation }),
      output: (observation) => observation,
    }),
    measurePreparationNode({
      recorder: opts.recorder,
      node: "policy_evaluation",
      scope: opts.scope,
      dependencies: ["policy_scope", "blueprint_resolution"],
      cacheability: "exact",
      cachePolicyReason:
        "Selected policy modules, configuration, and change scope are fingerprinted.",
      operation: opts.observePolicy,
      fingerprintInputs: (observation) => ({
        selected_policy_paths: opts.selectedPolicyPaths,
        policy_scope: opts.policyScope,
        policy_observation: observation,
      }),
      output: (observation) => observation,
    }),
    measurePreparationNode({
      recorder: opts.recorder,
      node: "backend_projection",
      scope: opts.scope,
      dependencies: ["task_backend_read"],
      cacheability: "exact",
      cachePolicyReason: "Backend identity and semantic projection are fingerprinted.",
      operation: opts.observeBackend,
      fingerprintInputs: (observation) => ({
        backend_id: opts.backendId,
        backend_projection: observation,
      }),
      output: (observation) => observation,
    }),
  ]);
}
