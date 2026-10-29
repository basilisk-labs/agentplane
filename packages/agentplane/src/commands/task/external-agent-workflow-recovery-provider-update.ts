import path from "node:path";
import { z } from "zod";
import {
  digestSupervisorEpisodeValue,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";

const text = z.string().trim().min(1);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const sha = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
type Operation = SupervisorExecutionEpisodeJournal["operations"][number];

export const providerIdentity = z.strictObject({
  provider: z.enum(["github", "gitlab"]),
  hostname: text,
  remote: text,
  sourceProject: text,
  targetProject: text,
  sourceUrl: text,
  targetUrl: text,
});
const failedIntegrationUpdateContext = z.looseObject({
  schema_version: z.literal(1),
  kind: z.literal("integration_run_next"),
  task_id: text,
  repository_root: text,
  queue: z.looseObject({
    present: z.literal(true),
    status: z.literal("queued"),
    branch: text,
    base: text,
    headSha: sha,
    baseSha: sha,
    prNumber: z.number().int().positive(),
  }),
  provider: z.looseObject({
    state: z.literal("found"),
    pr: z.looseObject({
      status: z.literal("OPEN"),
      prNumber: z.number().int().positive(),
      prUrl: text,
      headSha: sha,
      baseSha: sha,
      headRef: text,
      base: text,
      identity: providerIdentity,
    }),
  }),
  branch: z.looseObject({ name: text, headSha: sha }),
});

export function exactProviderUpdateAfterFailedIntegration(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  latest: Operation;
  decision: TaskRouteDecision;
}): boolean {
  const step = opts.decision.workflowStep;
  if (
    step.kind !== "cli_operation" ||
    step.operation.id !== "provider.pr.update_branch" ||
    !opts.decision.executionPacket.safeToMutate
  )
    return false;
  const original = z
    .looseObject({
      id: z.literal("integration.run_next"),
      type: z.literal("integration_run_next"),
      params: z.looseObject({ taskId: text }),
      preconditionFingerprint: z.looseObject({ digest }),
      authorityRef: text,
      idempotencyKey: text,
    })
    .safeParse(opts.latest.recovery?.operation_identity);
  const context = failedIntegrationUpdateContext.safeParse(opts.latest.recovery?.context);
  if (!original.success || !context.success) return false;
  const { queue, provider, branch } = context.data;
  const params = step.operation.params;
  const currentPr = opts.decision.prFlow?.pr;
  const observedPr = opts.decision.prFlow?.providerObservation;
  const registeredCheckouts = [
    opts.decision.workspace.baseCheckoutPath,
    opts.decision.workspace.taskWorktreePath,
  ].filter(
    (checkout): checkout is string => typeof checkout === "string" && checkout.trim() !== "",
  );
  return (
    !params.reconcileHeadSha &&
    registeredCheckouts.some(
      (checkout) => path.resolve(context.data.repository_root) === path.resolve(checkout),
    ) &&
    opts.journal.task_id === opts.decision.task.id &&
    opts.journal.task_id === original.data.params.taskId &&
    opts.journal.task_id === context.data.task_id &&
    original.data.preconditionFingerprint.digest === opts.latest.precondition_fingerprint_digest &&
    original.data.preconditionFingerprint.digest === opts.latest.authority_digest &&
    original.data.authorityRef ===
      `route:${opts.journal.task_id}:${opts.latest.precondition_fingerprint_digest}` &&
    original.data.idempotencyKey === opts.latest.effect_ref &&
    opts.latest.effect_ref?.startsWith(
      `integration.run_next:${opts.journal.task_id}:${opts.latest.precondition_fingerprint_digest}:`,
    ) === true &&
    currentPr?.state === "OPEN" &&
    currentPr.prUrl === provider.pr.prUrl &&
    observedPr?.state === "found" &&
    observedPr.pr.prUrl === provider.pr.prUrl &&
    params.taskId === opts.journal.task_id &&
    params.prNumber === queue.prNumber &&
    params.prNumber === provider.pr.prNumber &&
    params.branch === queue.branch &&
    params.branch === branch.name &&
    params.branch === provider.pr.headRef &&
    params.baseBranch === queue.base &&
    params.baseBranch === provider.pr.base &&
    params.expectedHeadSha === queue.headSha &&
    params.expectedHeadSha === branch.headSha &&
    params.expectedHeadSha === provider.pr.headSha &&
    params.expectedBaseSha === queue.baseSha &&
    params.expectedBaseSha === provider.pr.baseSha &&
    digestSupervisorEpisodeValue(params.identity) ===
      digestSupervisorEpisodeValue(provider.pr.identity)
  );
}
