import type { taskKernel as k } from "@agentplaneorg/core/tasks";

import type { KernelNextAction } from "../../adapters/task-backend/kernel-next-action.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

export type KernelEffectObservation = Readonly<{
  state: "APPLIED" | "NOT_APPLIED" | "IN_DOUBT";
  digest: k.Sha256Digest;
}>;

export type KernelEffectDispatch = Readonly<{
  task_id: string;
  effect: k.ExternalEffect;
  idempotency_key: string;
}>;

export interface KernelEffectPort {
  dispatch(input: KernelEffectDispatch): Promise<KernelEffectObservation>;
  observe(input: KernelEffectDispatch): Promise<KernelEffectObservation>;
}

export type KernelEffectPortResolver = (
  effect: k.ExternalEffect,
) => KernelEffectPort | null | Promise<KernelEffectPort | null>;

export type KernelEffectCoordination =
  | Readonly<{ kind: "advanced" }>
  | Readonly<{
      kind: "stop";
      action: {
        kind: "external_wait" | "human_required";
        reason: string;
        effect_id: string;
        idempotency_key: string;
      };
    }>;

function effectByRoute(record: KernelRecord, route: KernelNextAction): k.ExternalEffect {
  const effect = record.aggregate.effects.find((candidate) => candidate.id === route.effect_id);
  if (!effect) throw new Error(`Canonical effect is unavailable: ${route.effect_id ?? "unknown"}`);
  return effect;
}

async function commitEffectCommand(
  runtime: Runtime,
  payload: Extract<k.TaskCommand, { kind: "begin_effect" | "observe_effect" }> extends infer Command
    ? Command extends k.TaskCommand
      ? Omit<Command, "task_id" | "expected_task_revision" | "expected_state_fingerprint">
      : never
    : never,
  mutationId: string,
): Promise<void> {
  const input = (await runtime.input(payload, mutationId)) as KernelCommandInput;
  requireKernelCommit(await runtime.adapter.execute(input));
}

async function requestHumanAfterFailedEffect(
  runtime: Runtime,
  effect: k.ExternalEffect,
  observation: KernelEffectObservation,
): Promise<void> {
  requireKernelCommit(
    await runtime.lifecycle.apply(
      await runtime.input(
        { kind: "transition_task", action: "request_human" },
        `effect:failed:${effect.id}:${observation.digest}`,
      ),
    ),
  );
}

function unavailable(effect: k.ExternalEffect): KernelEffectCoordination {
  return {
    kind: "stop",
    action: {
      kind: "external_wait",
      reason: "canonical_effect_adapter_unavailable",
      effect_id: effect.id,
      idempotency_key: effect.idempotency_key,
    },
  };
}

function reconciliationRequired(effect: k.ExternalEffect): KernelEffectCoordination {
  return {
    kind: "stop",
    action: {
      kind: "human_required",
      reason: "canonical_effect_reconciliation_required",
      effect_id: effect.id,
      idempotency_key: effect.idempotency_key,
    },
  };
}

function observedFailure(effect: k.ExternalEffect): KernelEffectCoordination {
  return {
    kind: "stop",
    action: {
      kind: "human_required",
      reason: "canonical_effect_not_applied",
      effect_id: effect.id,
      idempotency_key: effect.idempotency_key,
    },
  };
}

async function recordObservation(
  runtime: Runtime,
  effect: k.ExternalEffect,
  observation: KernelEffectObservation,
): Promise<void> {
  await commitEffectCommand(
    runtime,
    {
      kind: "observe_effect",
      effect_id: effect.id,
      observed_state: observation.state,
      observation_digest: observation.digest,
    },
    `effect:observe:${effect.id}:${observation.digest}`,
  );
}

async function acceptObservation(
  runtime: Runtime,
  effect: k.ExternalEffect,
  observation: KernelEffectObservation,
): Promise<KernelEffectCoordination> {
  await recordObservation(runtime, effect, observation);
  if (observation.state === "IN_DOUBT") return reconciliationRequired(effect);
  if (observation.state === "NOT_APPLIED") {
    await requestHumanAfterFailedEffect(runtime, effect, observation);
    return observedFailure(effect);
  }
  return { kind: "advanced" };
}

/**
 * Application boundary for canonical effects. The Kernel persists dispatch intent before the
 * adapter runs. A replay of PENDING observes the provider and never dispatches the effect again.
 */
export async function coordinateKernelEffect(opts: {
  runtime: Runtime;
  record: KernelRecord;
  route: KernelNextAction;
  resolve_port: KernelEffectPortResolver;
}): Promise<KernelEffectCoordination> {
  if (
    opts.route.reason_code !== "kernel_effect_dispatch_required" &&
    opts.route.reason_code !== "kernel_effect_observation_required" &&
    opts.route.reason_code !== "kernel_effect_reconciliation_required"
  ) {
    throw new Error(`Canonical effect coordinator received ${opts.route.reason_code}`);
  }
  if (opts.route.reason_code === "kernel_effect_reconciliation_required") {
    const effect = opts.record.aggregate.effects.find(
      (candidate) => candidate.state === "IN_DOUBT",
    );
    if (!effect) throw new Error("Canonical reconciliation route has no uncertain effect");
    return reconciliationRequired(effect);
  }

  const effect = effectByRoute(opts.record, opts.route);
  if (effect.state === "IN_DOUBT") return reconciliationRequired(effect);
  const port = await opts.resolve_port(effect);
  if (!port) return unavailable(effect);
  const dispatch: KernelEffectDispatch = {
    task_id: opts.record.aggregate.id,
    effect,
    idempotency_key: effect.idempotency_key,
  };

  if (opts.route.reason_code === "kernel_effect_dispatch_required") {
    await commitEffectCommand(
      opts.runtime,
      { kind: "begin_effect", effect_id: effect.id },
      `effect:begin:${effect.id}:${effect.idempotency_key}`,
    );
    const observation = await port.dispatch(dispatch);
    return acceptObservation(opts.runtime, effect, observation);
  }

  const observation = await port.observe(dispatch);
  return acceptObservation(opts.runtime, effect, observation);
}

export const emptyKernelEffectPortResolver: KernelEffectPortResolver = () => null;
