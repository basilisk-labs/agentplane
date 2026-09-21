import path from "node:path";

import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { CANONICAL_EFFECT_KIND_BY_OPERATION } from "../shared/side-effect-authority.js";
import {
  executeAdmittedBranchWorkflowOperation,
  executeBranchWorkflowOperation,
} from "./branch-task-supervisor-operations.js";
import type {
  KernelEffectDispatch,
  KernelEffectObservation,
  KernelEffectPort,
  KernelEffectPortResolver,
} from "./kernel-effect-coordinator.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { writeKernelArtifact } from "./kernel-exchange.js";
import {
  recoverCanonicalControllerSuspension,
  withCanonicalControllerSuspendedForOperation,
} from "./kernel-controller-handoff.js";
import { ensureKernelOperationalProjectionEvidence } from "./kernel-operational-projection.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

type SupportedOperationId = keyof typeof CANONICAL_EFFECT_KIND_BY_OPERATION;

type ProviderEffectEnvelope = Readonly<{
  schema_version: 1;
  task_id: string;
  effect_id: string;
  request_digest: k.Sha256Digest;
  decision: TaskRouteDecision;
  digest: k.Sha256Digest;
}>;

function supportedOperation(
  decision: TaskRouteDecision,
): Extract<WorkflowOperation, { id: SupportedOperationId }> | null {
  const step = decision.workflowStep;
  if (step.kind !== "cli_operation" || !(step.operation.id in CANONICAL_EFFECT_KIND_BY_OPERATION)) {
    return null;
  }
  return step.operation as Extract<WorkflowOperation, { id: SupportedOperationId }>;
}

function logicalRequest(taskId: string, decision: TaskRouteDecision, operation: WorkflowOperation) {
  return {
    schema_version: 1 as const,
    task_id: taskId,
    operation: {
      id: operation.id,
      type: operation.type,
      params: operation.params,
    },
    // Bind provider/repository identities that can change the meaning of an otherwise identical
    // operation, while excluding task revision and dirty-status fields changed by Kernel intent.
    workflow_identity: {
      branch: decision.workspace.branch,
      base_branch: decision.workspace.baseBranch,
      head_sha: decision.workspace.headSha,
      pr_branch: decision.workspace.prBranch,
      pr: decision.prFlow?.pr ?? null,
      publication: decision.prFlow?.publication ?? null,
      queue: decision.prFlow?.queue ?? null,
      close_tail: decision.prFlow?.closeTail ?? null,
      provider_observation: decision.prFlow?.providerObservation ?? null,
      cleanup: decision.cleanupProbe,
    },
  };
}

function effectId(operation: WorkflowOperation, requestDigest: k.Sha256Digest): string {
  return `workflow:${operation.id}:${requestDigest.slice("sha256:".length, "sha256:".length + 16)}`;
}

function receiptDigest(value: unknown): k.Sha256Digest {
  return k.kernelDigest(value);
}

async function decide(command: CommandContext, taskId: string): Promise<TaskRouteDecision> {
  return await buildTaskRouteDecision({
    ctx: command,
    cwd: command.resolvedProject.gitRoot,
    rootOverride: null,
    includeRemote: true,
    freshHead: true,
    taskId,
  });
}

function matchesEffectRequest(
  dispatch: KernelEffectDispatch,
  decision: TaskRouteDecision,
): boolean {
  const operation = supportedOperation(decision);
  if (!operation) return false;
  return (
    CANONICAL_EFFECT_KIND_BY_OPERATION[operation.id as SupportedOperationId] ===
      dispatch.effect.kind &&
    k.kernelDigest(logicalRequest(dispatch.task_id, decision, operation)) ===
      dispatch.effect.request_digest
  );
}

function observedRoute(
  dispatch: KernelEffectDispatch,
  current: TaskRouteDecision,
): KernelEffectObservation {
  const operation = supportedOperation(current);
  if (operation && matchesEffectRequest(dispatch, current)) {
    return {
      state: "NOT_APPLIED",
      digest: receiptDigest({
        effect_id: dispatch.effect.id,
        request_digest: dispatch.effect.request_digest,
        route: current.workflowStep.preconditionFingerprint.digest,
        operation: operation.id,
      }),
    };
  }
  // A different route alone is not proof that this exact provider request ran. Kernel writes can
  // legitimately change the route fingerprint before dispatch, and unrelated provider activity can
  // change it after a crash. The persisted supervisor receipt is the positive application proof.
  return {
    state: "IN_DOUBT",
    digest: receiptDigest({
      effect_id: dispatch.effect.id,
      request_digest: dispatch.effect.request_digest,
      route: current.workflowStep.preconditionFingerprint.digest,
      step: current.workflowStep.id,
    }),
  };
}

function requestRemainsCurrent(
  dispatch: KernelEffectDispatch,
  decision: TaskRouteDecision,
): boolean {
  return matchesEffectRequest(dispatch, decision);
}

async function providerEffectDirectory(
  command: CommandContext,
  taskId: string,
  requestDigest: k.Sha256Digest,
): Promise<string> {
  return path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane",
    "kernel",
    "provider-effects",
    taskId,
    requestDigest.slice("sha256:".length),
  );
}

async function writeProviderEffectEnvelope(opts: {
  command: CommandContext;
  effect: k.ExternalEffect;
  decision: TaskRouteDecision;
}): Promise<void> {
  const contents = {
    schema_version: 1 as const,
    task_id: opts.decision.task.id,
    effect_id: opts.effect.id,
    request_digest: opts.effect.request_digest,
    decision: opts.decision,
  };
  const envelope: ProviderEffectEnvelope = { ...contents, digest: k.kernelDigest(contents) };
  await writeKernelArtifact(
    await providerEffectDirectory(opts.command, contents.task_id, contents.request_digest),
    "effect-envelope.json",
    envelope,
  );
}

async function loadProviderEffectEnvelope(opts: {
  command: CommandContext;
  task_id: string;
  effect: k.ExternalEffect;
}): Promise<ProviderEffectEnvelope> {
  const file = path.join(
    await providerEffectDirectory(opts.command, opts.task_id, opts.effect.request_digest),
    "effect-envelope.json",
  );
  const raw = JSON.parse(
    await readStableRegularTextNoFollow(file, "canonical provider effect envelope"),
  ) as ProviderEffectEnvelope;
  const { digest, ...contents } = raw;
  const operation = supportedOperation(raw.decision);
  if (
    raw.schema_version !== 1 ||
    raw.task_id !== opts.task_id ||
    raw.effect_id !== opts.effect.id ||
    raw.request_digest !== opts.effect.request_digest ||
    k.kernelDigest(contents) !== digest ||
    !operation ||
    !matchesEffectRequest(
      { task_id: opts.task_id, effect: opts.effect, idempotency_key: opts.effect.idempotency_key },
      raw.decision,
    )
  ) {
    throw new Error("Canonical provider effect envelope identity mismatch");
  }
  return raw;
}

async function persistedOperationObservation(opts: {
  command: CommandContext;
  dispatch: KernelEffectDispatch;
}): Promise<KernelEffectObservation | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: await resolveCommandGitCommonDir(opts.command),
    task_id: opts.dispatch.task_id,
  });
  const raw = await createSupervisorEpisodeStore(journalPath).read();
  if (raw === null) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(raw);
  const envelope = await loadProviderEffectEnvelope({
    command: opts.command,
    task_id: opts.dispatch.task_id,
    effect: opts.dispatch.effect,
  });
  const expected = supportedOperation(envelope.decision);
  if (!expected) throw new Error("Canonical provider effect envelope has no operation");
  const matchingReference = journal.operations.findLast(
    (candidate) => candidate.effect_ref === opts.dispatch.effect.idempotency_key,
  );
  if (!matchingReference) return null;
  const operation =
    matchingReference.precondition_fingerprint_digest ===
      envelope.decision.workflowStep.preconditionFingerprint.digest &&
    matchingReference.authority_ref === `workflow-operation:${expected.id}` &&
    matchingReference.authority_digest === expected.preconditionFingerprint.digest
      ? matchingReference
      : null;
  if (!operation) {
    return {
      state: "IN_DOUBT",
      digest: receiptDigest({
        effect_id: opts.dispatch.effect.id,
        request_digest: opts.dispatch.effect.request_digest,
        journal: journal.digest,
        operation_key: matchingReference.operation_key,
        reason: "supervisor_operation_identity_mismatch",
      }),
    };
  }
  const state = operation.status === "completed" ? "APPLIED" : "IN_DOUBT";
  return {
    state,
    digest: receiptDigest({
      effect_id: opts.dispatch.effect.id,
      request_digest: opts.dispatch.effect.request_digest,
      journal: journal.digest,
      operation_key: operation.operation_key,
      operation_status: operation.status,
      operation_digest: k.kernelDigest(operation),
    }),
  };
}

function operationIdFromEffect(effect: k.ExternalEffect): SupportedOperationId | null {
  const match = /^workflow:([^:]+):[a-f0-9]{16}$/u.exec(effect.id);
  const operationId = match?.[1] as SupportedOperationId | undefined;
  return operationId && operationId in CANONICAL_EFFECT_KIND_BY_OPERATION ? operationId : null;
}

/**
 * Bridge from a canonical effect to the mature typed branch supervisor operation. The bridge
 * freezes the exact fresh route and configured authority before Kernel intent persistence. Its
 * persisted supervisor journal is the provider crash/readback boundary; ambiguous failures are
 * never reported as a safe retry.
 */
export function createKernelProviderEffectPortResolver(opts: {
  command: CommandContext;
  allow_remote: boolean;
}): KernelEffectPortResolver {
  return (effect) => {
    const expectedOperationId = operationIdFromEffect(effect);
    if (!opts.allow_remote || !expectedOperationId) return null;
    const port: KernelEffectPort = {
      async dispatch(input) {
        await ensureKernelOperationalProjectionEvidence({
          command: opts.command,
          task_id: input.task_id,
        });
        if (expectedOperationId === "integration.run_next") {
          await recoverCanonicalControllerSuspension({
            command: opts.command,
            task_id: input.task_id,
            request_digest: input.effect.request_digest,
          });
        }
        const envelope = await loadProviderEffectEnvelope({
          command: opts.command,
          task_id: input.task_id,
          effect: input.effect,
        });
        const before = envelope.decision;
        const operation = supportedOperation(before);
        if (operation?.id !== expectedOperationId || !matchesEffectRequest(input, before)) {
          return {
            state: "IN_DOUBT",
            digest: receiptDigest({
              effect_id: input.effect.id,
              request_digest: input.effect.request_digest,
              reason: "frozen_operation_identity_mismatch",
            }),
          };
        }
        const persisted = await executeAdmittedBranchWorkflowOperation({
          decision: before,
          git_root: opts.command.resolvedProject.gitRoot,
          execute: async (invoked) => {
            const run = () =>
              executeBranchWorkflowOperation({ decision: before, operation: invoked });
            const controllerCheckout =
              invoked.id === "integration.run_next"
                ? before.workspace.taskWorktreePath
                : ["task.hosted_close.finalize", "task.worktree.cleanup"].includes(invoked.id)
                  ? before.executionPacket.mustRunFrom
                  : null;
            return controllerCheckout
              ? await withCanonicalControllerSuspendedForOperation({
                  command: opts.command,
                  decision: before,
                  task_id: input.task_id,
                  request_digest: input.effect.request_digest,
                  operation_idempotency_key: invoked.idempotencyKey,
                  controller_checkout: controllerCheckout,
                  run,
                })
              : await run();
          },
          refresh: async () => await decide(opts.command, input.task_id),
        });
        const execution = persisted.execution;
        if (
          !execution.executable ||
          execution.result?.status === "failed" ||
          execution.stop_reason !== null ||
          execution.refreshed_decision === null
        ) {
          return {
            state: "IN_DOUBT",
            digest: receiptDigest({
              effect_id: input.effect.id,
              request_digest: input.effect.request_digest,
              journal: persisted.journal.digest,
              stop: execution.stop_reason,
              result: execution.result,
            }),
          };
        }
        if (requestRemainsCurrent(input, execution.refreshed_decision)) {
          return {
            state: "IN_DOUBT",
            digest: receiptDigest({
              effect_id: input.effect.id,
              request_digest: input.effect.request_digest,
              journal: persisted.journal.digest,
              reason: "provider_postcondition_not_observed",
              route: execution.refreshed_decision.workflowStep.preconditionFingerprint.digest,
            }),
          };
        }
        return {
          state: "APPLIED",
          digest: receiptDigest({
            effect_id: input.effect.id,
            request_digest: input.effect.request_digest,
            journal: persisted.journal.digest,
            before: before.workflowStep.preconditionFingerprint.digest,
            after: execution.refreshed_decision.workflowStep.preconditionFingerprint.digest,
            result: execution.result,
          }),
        };
      },
      async observe(input) {
        await ensureKernelOperationalProjectionEvidence({
          command: opts.command,
          task_id: input.task_id,
        });
        if (expectedOperationId === "integration.run_next") {
          await recoverCanonicalControllerSuspension({
            command: opts.command,
            task_id: input.task_id,
            request_digest: input.effect.request_digest,
          });
        }
        const current = await decide(opts.command, input.task_id);
        const persisted = await persistedOperationObservation({
          command: opts.command,
          dispatch: input,
        });
        if (persisted?.state === "APPLIED" && requestRemainsCurrent(input, current)) {
          return {
            state: "IN_DOUBT",
            digest: receiptDigest({
              effect_id: input.effect.id,
              request_digest: input.effect.request_digest,
              persisted: persisted.digest,
              reason: "provider_postcondition_not_observed_after_restart",
              route: current.workflowStep.preconditionFingerprint.digest,
            }),
          };
        }
        if (persisted) return persisted;
        return observedRoute(input, current);
      },
    };
    return port;
  };
}

export function canonicalWorkflowEffectForDecision(
  record: KernelRecord,
  decision: TaskRouteDecision,
): k.ExternalEffect | null {
  const operation = supportedOperation(decision);
  const authority = record.aggregate.authority_lineage?.at(-1)?.authority;
  if (!operation || !authority) return null;
  const kind = CANONICAL_EFFECT_KIND_BY_OPERATION[operation.id];
  if (!authority.external_effects.includes(kind)) return null;
  const requestDigest = k.kernelDigest(logicalRequest(record.aggregate.id, decision, operation));
  return {
    id: effectId(operation, requestDigest),
    kind,
    execution_requirements: {
      scope_roots: [],
      repository_effects: [],
      external_effects: [kind],
      capabilities: ["provider_read", "provider_write", "network"].filter((capability) =>
        authority.capabilities.includes(capability),
      ),
      resources: [],
    },
    idempotency_key: operation.idempotencyKey,
    state: "PREPARED",
    request_digest: requestDigest,
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

export async function prepareCanonicalWorkflowEffect(opts: {
  command: CommandContext;
  runtime: Runtime;
  record: KernelRecord;
  decision: TaskRouteDecision;
}): Promise<"prepared" | "already_observed" | "unsupported"> {
  const effect = canonicalWorkflowEffectForDecision(opts.record, opts.decision);
  if (!effect) return "unsupported";
  const existing = opts.record.aggregate.effects.find(
    (candidate) => candidate.request_digest === effect.request_digest,
  );
  if (existing) return "already_observed";
  await writeProviderEffectEnvelope({ command: opts.command, effect, decision: opts.decision });
  requireKernelCommit(
    await opts.runtime.lifecycle.apply(
      await opts.runtime.input(
        { kind: "prepare_effect", effect },
        `effect:prepare:${effect.id}:${effect.request_digest}`,
      ),
    ),
  );
  return "prepared";
}

export async function decideCanonicalWorkflowEffect(
  command: CommandContext,
  taskId: string,
): Promise<TaskRouteDecision> {
  return await decide(command, taskId);
}
