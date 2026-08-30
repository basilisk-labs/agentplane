import type { taskKernel } from "@agentplaneorg/core/tasks";
import type { KernelBackendAdapter, KernelCommandInput } from "./kernel-backend-adapter.js";

/** Dispatch only after fresh durable admission. A replay or uncertain write never calls a provider. */
export async function dispatchKernelEffect(opts: {
  adapter: Pick<KernelBackendAdapter, "execute">;
  input: KernelCommandInput & {
    command: Extract<taskKernel.TaskCommand, { kind: "begin_effect" }>;
  };
  dispatch: (effect: taskKernel.ExternalEffect) => Promise<unknown>;
}) {
  const admitted = await opts.adapter.execute(opts.input);
  if (admitted.kind !== "committed") return admitted;
  const effectId = opts.input.command.effect_id;
  if (admitted.replayed) {
    return {
      kind: "observation_required" as const,
      effect_id: effectId,
      reason: "already_started",
    };
  }
  const effect = admitted.record.aggregate.effects.find((entry) => entry.id === effectId);
  if (effect?.state !== "PENDING") {
    return {
      kind: "observation_required" as const,
      effect_id: effectId,
      reason: "start_not_confirmed",
    };
  }
  try {
    // The supervisor validates and records the response through the existing observation boundary.
    const response = await opts.dispatch(effect);
    return { kind: "dispatched" as const, effect_id: effectId, response };
  } catch {
    // A timeout cannot prove whether the provider applied the request. Preserve PENDING for readback.
    return {
      kind: "observation_required" as const,
      effect_id: effectId,
      reason: "dispatch_uncertain",
    };
  }
}
