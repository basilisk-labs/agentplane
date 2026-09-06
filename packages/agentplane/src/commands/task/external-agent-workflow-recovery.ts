import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { gitIsAncestor, gitRevParse } from "@agentplaneorg/core/git";
import {
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  reopenSupervisorExecutionEpisodeAfterEffectEvidence,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";
import { readIntegrationQueue, withIntegrationQueueMutex } from "../pr/integrate/queue-state.js";
import { observeExistingChangeRequestByNumber } from "../pr/internal/change-request-provider.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

const text = z.string().trim().min(1);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const sha = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
const providerIdentity = z
  .object({
    provider: z.enum(["github", "gitlab"]),
    hostname: text,
    remote: text,
    sourceProject: text,
    targetProject: text,
    sourceUrl: text,
    targetUrl: text,
  })
  .strict();
const identitySchema = z
  .object({
    branch: text,
    head_sha: sha,
    base: text,
    base_sha: sha,
    pr_number: z.number().int().positive(),
    pr_url: text,
    provider: providerIdentity,
  })
  .strict();
const resolutionSchema = z
  .object({
    schema_version: z.literal(1),
    kind: z.literal("integration_effect_resolution"),
    task_id: text,
    repository_root: text,
    journal_digest: digest,
    operation_key: digest,
    precondition_fingerprint_digest: digest,
    authority_ref: text,
    authority_digest: digest,
    effect_ref: text,
    current_state_fingerprint: digest,
    identity: identitySchema,
    verdict: z.enum(["applied", "not_applied"]),
    operator: z
      .object({
        kind: z.literal("operator_decision"),
        actor: text.refine(
          (value) =>
            !/^(agent|planner|executor|evaluator|coder|tester|orchestrator)$/iu.test(value),
        ),
        decision_ref: text,
        observed_at: z.string().datetime(),
      })
      .strict(),
    evidence: z
      .array(
        z
          .object({
            ref: text,
            content: z.string().refine((value) => value.trim().length > 0),
            digest,
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export type WorkflowEffectResolution = z.infer<typeof resolutionSchema>;
type Operation = SupervisorExecutionEpisodeJournal["operations"][number];

function reject(message: string): never {
  throw new CliError({ code: "E_VALIDATION", message: `Integration effect recovery: ${message}` });
}

function unresolvedIntegrationIntent(journal: SupervisorExecutionEpisodeJournal): Operation | null {
  const operation = journal.operations.at(-1);
  if (
    operation?.kind !== "cli_operation" ||
    operation.work_order_ref !== null ||
    operation.authority_ref !== "workflow-operation:integration.run_next" ||
    operation.status !== "intent"
  )
    return null;
  return (journal.status === "running" &&
    journal.cursor.phase === "intent_recorded" &&
    journal.cursor.operation_key === operation.operation_key) ||
    (journal.status === "stopped" &&
      journal.stop?.reason === "effect_in_doubt" &&
      journal.stop.operation_key === operation.operation_key)
    ? operation
    : null;
}

export function requireIntegrationEffectResolution(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  decision: TaskRouteDecision;
}): void {
  const latest = opts.journal.operations.at(-1);
  if (
    latest?.authority_ref === "workflow-operation:integration.run_next" &&
    latest.status === "failed" &&
    opts.journal.cursor.phase === "ready" &&
    opts.journal.cursor.replacement_of_operation_key === latest.operation_key &&
    (opts.decision.workflowStep.kind !== "agent_episode" ||
      opts.decision.workflowStep.episode.purpose !== "implementation_rework")
  ) {
    reject("the recovered integration successor must remain semantic implementation rework.");
  }
  const operation = unresolvedIntegrationIntent(opts.journal);
  if (!operation) return;
  throw new CliError({
    code: "E_RUNTIME",
    message:
      "An unresolved integration intent owns this task. An operator must reconcile its exact effect with task advance --workflow-recovery <path> --remote --agent-json before semantic rework.",
    context: {
      task_id: opts.journal.task_id,
      journal_digest: opts.journal.digest,
      operation_key: operation.operation_key,
      precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
      authority_ref: operation.authority_ref,
      authority_digest: operation.authority_digest,
      effect_ref: operation.effect_ref,
      current_state_fingerprint: opts.decision.workflowStep.preconditionFingerprint.digest,
      original_snapshot_present: operation.recovery !== undefined,
    },
  });
}

function assertOriginalIdentity(
  operation: Operation,
  resolution: WorkflowEffectResolution,
  checkout: string,
): void {
  if (
    operation.precondition_fingerprint_digest !== resolution.precondition_fingerprint_digest ||
    operation.authority_ref !== resolution.authority_ref ||
    operation.authority_digest !== resolution.authority_digest ||
    operation.effect_ref !== resolution.effect_ref ||
    !operation.effect_ref?.startsWith(
      `integration.run_next:${resolution.task_id}:${resolution.precondition_fingerprint_digest}:`,
    )
  ) {
    reject("the operator input does not match the original operation authority and effect.");
  }
  if (!operation.recovery) return;
  const original = z
    .object({
      operation_identity: z
        .object({
          id: z.literal("integration.run_next"),
          type: z.literal("integration_run_next"),
          params: z.object({ taskId: text }),
          preconditionFingerprint: z.object({ digest }),
          authorityRef: text,
          idempotencyKey: text,
        })
        .passthrough(),
      context: z
        .object({
          schema_version: z.literal(1),
          kind: z.literal("integration_run_next"),
          task_id: text,
          repository_root: text,
          queue: z
            .object({
              present: z.literal(true),
              branch: text,
              base: text,
              headSha: sha,
              baseSha: sha,
              prNumber: z.number().int().positive(),
            })
            .passthrough(),
          provider: z.object({
            state: z.literal("found"),
            pr: z
              .object({
                identity: providerIdentity,
                prNumber: z.number().int().positive(),
                prUrl: text,
                headSha: sha,
                base: text,
              })
              .passthrough(),
          }),
        })
        .passthrough(),
    })
    .safeParse(operation.recovery);
  if (!original.success) reject("the original snapshot lacks a complete integration identity.");
  const { operation_identity: typed, context } = original.data;
  const expected = resolution.identity;
  if (
    (path.resolve(context.repository_root) !== path.resolve(checkout) &&
      path.resolve(context.repository_root) !== path.resolve(resolution.repository_root)) ||
    typed.params.taskId !== resolution.task_id ||
    context.task_id !== resolution.task_id ||
    typed.preconditionFingerprint.digest !== resolution.precondition_fingerprint_digest ||
    // The typed route authority differs from the supervisor journal wrapper authority.
    typed.authorityRef !==
      `route:${resolution.task_id}:${resolution.precondition_fingerprint_digest}` ||
    typed.idempotencyKey !== resolution.effect_ref ||
    context.queue.branch !== expected.branch ||
    context.queue.headSha !== expected.head_sha ||
    context.queue.base !== expected.base ||
    context.queue.baseSha !== expected.base_sha ||
    context.queue.prNumber !== expected.pr_number ||
    context.provider.pr.prNumber !== expected.pr_number ||
    context.provider.pr.prUrl !== expected.pr_url ||
    context.provider.pr.headSha !== expected.head_sha ||
    context.provider.pr.base !== expected.base ||
    digestSupervisorEpisodeValue(context.provider.pr.identity) !==
      digestSupervisorEpisodeValue(expected.provider)
  ) {
    reject("the operator input contradicts the durable original snapshot.");
  }
}

export async function reconcileIntegrationEffect(opts: {
  command: CommandContext;
  task_id: string;
  input_path: string;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<{
  task_id: string;
  operation_key: string;
  verdict: "applied" | "not_applied";
  replay: boolean;
}> {
  const parsed = resolutionSchema.safeParse(JSON.parse(await readFile(opts.input_path, "utf8")));
  if (!parsed.success) reject(`invalid operator input: ${parsed.error.message}`);
  const resolution = parsed.data;
  if (resolution.task_id !== opts.task_id) reject("the operator input names another task.");
  for (const evidence of resolution.evidence) {
    if (digestSupervisorEpisodeValue(evidence.content) !== evidence.digest)
      reject("evidence content digest mismatch.");
  }
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: await resolveCommandGitCommonDir(opts.command),
    task_id: opts.task_id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) reject("another supervisor owns this task.");
  try {
    const store = createSupervisorEpisodeStore(journalPath);
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = journal.operations.find(
      (item) => item.operation_key === resolution.operation_key,
    );
    const result = { kind: "integration_effect_resolution", resolution };
    const output = {
      task_id: opts.task_id,
      operation_key: resolution.operation_key,
      verdict: resolution.verdict,
    };
    if (journal.task_id !== opts.task_id || !operation) reject("the original operation is absent.");
    if (operation.status !== "intent") {
      if (operation.result_digest === digestSupervisorEpisodeValue(result))
        return { ...output, replay: true };
      reject("the operation already has a different durable outcome.");
    }
    if (
      journal.digest !== resolution.journal_digest ||
      unresolvedIntegrationIntent(journal) !== operation
    ) {
      reject("the journal changed or does not own this unresolved integration intent.");
    }
    assertOriginalIdentity(operation, resolution, opts.command.resolvedProject.gitRoot);
    const observedAt = Date.parse(resolution.operator.observed_at);
    if (observedAt < Date.parse(operation.started_at) || observedAt > Date.now())
      reject("operator evidence predates the intent or is future-dated.");
    // Queue ownership belongs to the base checkout even when the task is routed to a worktree.
    const initial = await opts.decide();
    const baseRoot = initial.workspace.baseCheckoutPath ?? opts.command.resolvedProject.gitRoot;
    if (path.resolve(baseRoot) !== path.resolve(resolution.repository_root))
      reject("repository ownership changed.");
    return await withIntegrationQueueMutex(baseRoot, async () => {
      const current = await opts.decide();
      if (
        current.task.id !== opts.task_id ||
        current.workflowStep.preconditionFingerprint.digest !==
          resolution.current_state_fingerprint ||
        path.resolve(current.workspace.baseCheckoutPath ?? opts.command.resolvedProject.gitRoot) !==
          path.resolve(baseRoot)
      ) {
        reject("the current task route changed.");
      }
      const queue = await readIntegrationQueue(baseRoot);
      if (queue.entries.some((item) => item.status === "claimed" || item.status === "handoff"))
        reject("the integration queue still has an active owner.");
      const entry = queue.entries.find((item) => item.task_id === opts.task_id);
      const expected = resolution.identity;
      if (
        entry?.branch !== expected.branch ||
        entry.base !== expected.base ||
        entry.head_sha !== expected.head_sha ||
        entry.base_sha !== expected.base_sha ||
        entry.pr_number !== expected.pr_number ||
        entry.pr_url !== expected.pr_url ||
        entry.claimed_by ||
        entry.claim_token ||
        entry.active_operation
      )
        reject("queue identity changed or retained a claim.");
      const observed = await observeExistingChangeRequestByNumber({
        gitRoot: baseRoot,
        prNumber: expected.pr_number,
        branch: expected.branch,
        baseBranch: expected.base,
      });
      if (observed.state !== "found") reject("fresh provider evidence is unavailable.");
      const pr = observed.pr;
      if (
        pr.prNumber !== expected.pr_number ||
        pr.prUrl !== expected.pr_url ||
        pr.headSha !== expected.head_sha ||
        pr.headRef !== expected.branch ||
        pr.base !== expected.base ||
        digestSupervisorEpisodeValue(pr.identity) !==
          digestSupervisorEpisodeValue(expected.provider)
      )
        reject("provider identity changed.");
      if (resolution.verdict === "not_applied") {
        if (
          pr.status !== "OPEN" ||
          pr.mergeCommit ||
          pr.mergedAt ||
          (entry.status !== "queued" && entry.status !== "rework") ||
          pr.baseSha !== expected.base_sha ||
          (await gitRevParse(baseRoot, [expected.base])) !== expected.base_sha ||
          (await gitRevParse(baseRoot, [expected.branch])) !== expected.head_sha
        )
          reject("the not_applied verdict contradicts provider, queue, or Git evidence.");
        const step = current.workflowStep;
        if (step.kind !== "agent_episode" || step.episode.purpose !== "implementation_rework")
          reject("the fresh route does not authorize semantic implementation rework.");
      } else if (
        pr.status !== "MERGED" ||
        !pr.mergeCommit ||
        !pr.mergedAt ||
        entry.status !== "done"
      ) {
        reject("the applied verdict lacks a completed merge and queue outcome.");
      }
      if (
        resolution.verdict === "applied" &&
        !(await gitIsAncestor(baseRoot, pr.mergeCommit!, expected.base))
      ) {
        reject("the provider merge is not present on the local integration base.");
      }
      const finalRoute = await opts.decide();
      if (
        finalRoute.workflowStep.preconditionFingerprint.digest !==
          resolution.current_state_fingerprint ||
        digestSupervisorEpisodeValue(await readIntegrationQueue(baseRoot)) !==
          digestSupervisorEpisodeValue(queue)
      ) {
        reject("the task route or queue changed during provider reconciliation.");
      }
      const running =
        journal.status === "stopped"
          ? reopenSupervisorExecutionEpisodeAfterEffectEvidence({
              journal,
              operation_key: operation.operation_key,
            })
          : journal;
      const completed = completeSupervisorExecutionEpisode({
        journal: running,
        operation_key: operation.operation_key,
        result,
        failed: resolution.verdict === "not_applied",
      });
      const next =
        resolution.verdict === "not_applied"
          ? prepareReplacementSupervisorExecutionEpisodeAfterFailure({
              journal: completed,
              state_fingerprint_digest: resolution.current_state_fingerprint,
            })
          : completed;
      if (!(await store.compareAndSwap(journal.digest, next)))
        reject("the journal changed before recovery could be committed.");
      return { ...output, replay: false };
    });
  } finally {
    await lease.release();
  }
}
