import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
import type { TaskIntakeRuntime } from "../task-intake/index.js";

import type { ExplainBehaviorInput, FrameworkExplainPayload } from "./model.js";

function normalizeBehaviorInputs(
  inputs: readonly ExplainBehaviorInput[],
): FrameworkExplainPayload["behavior_inputs"] {
  const seen = new Set<string>();
  const out: FrameworkExplainPayload["behavior_inputs"] = [];
  for (const input of inputs) {
    const id = input.id.trim();
    if (!id) throw new Error("Explain behavior inputs require a non-empty id.");
    const signature = `${input.category}:${id}:${input.source ?? ""}:${input.resolution.key}`;
    if (seen.has(signature)) continue;
    seen.add(signature);
    out.push({
      id,
      category: input.category,
      ...(input.source?.trim() ? { source: input.source.trim() } : {}),
      resolution: structuredClone(input.resolution),
    });
  }
  return out.toSorted(
    (left, right) =>
      left.category.localeCompare(right.category) ||
      left.id.localeCompare(right.id) ||
      (left.source ?? "").localeCompare(right.source ?? ""),
  );
}

export function buildFrameworkExplainPayload(opts: {
  harness: ResolvedHarnessContract;
  capabilities: AgentplaneCapabilityRegistry;
  execution_profile: ResolvedExecutionProfileRuntime;
  task_intake: TaskIntakeRuntime;
  behavior_inputs?: readonly ExplainBehaviorInput[];
}): FrameworkExplainPayload {
  return {
    schema_version: 1,
    harness: structuredClone(opts.harness),
    policy: {
      approvals: structuredClone(opts.harness.policy.approvals),
      protected_paths: structuredClone(opts.harness.policy.protected_paths),
      unsafe_actions_requiring_explicit_user_ok: [
        ...opts.harness.policy.unsafe_actions_requiring_explicit_user_ok,
      ],
    },
    capabilities: structuredClone(opts.capabilities),
    runtime: {
      execution_profile: structuredClone(opts.execution_profile),
      task_intake: structuredClone(opts.task_intake),
    },
    behavior_inputs: normalizeBehaviorInputs(opts.behavior_inputs ?? []),
  };
}

export function appendFrameworkExplainBehaviorInputs(
  payload: FrameworkExplainPayload,
  behavior_inputs: readonly ExplainBehaviorInput[],
): FrameworkExplainPayload {
  return buildFrameworkExplainPayload({
    harness: payload.harness,
    capabilities: payload.capabilities,
    execution_profile: payload.runtime.execution_profile,
    task_intake: payload.runtime.task_intake,
    behavior_inputs: [...payload.behavior_inputs, ...behavior_inputs],
  });
}
