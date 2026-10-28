import { isoTimestampSchema } from "@agentplaneorg/core/schemas";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { hostname, userInfo } from "node:os";
import { readKernelRecord, type KernelRecord } from "../../adapters/task-backend/kernel-record.js";
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
import {
  markQueueEntry,
  writeIntegrationQueue,
  readIntegrationQueue,
  withIntegrationQueueMutex,
  type IntegrationQueueEntry,
} from "../pr/integrate/queue-state.js";
import { observeExistingChangeRequestByNumber } from "../pr/internal/change-request-provider.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  exactProviderUpdateAfterFailedIntegration,
  providerIdentity,
} from "./external-agent-workflow-recovery-provider-update.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

const text = z.string().trim().min(1);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const sha = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
const identitySchema = z.strictObject({
  branch: text,
  head_sha: sha,
  base: text,
  base_sha: sha,
  pr_number: z.number().int().positive(),
  pr_url: text,
  provider: providerIdentity,
});
const resolutionSchema = z.strictObject({
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
  execution_receipt_ref: text.optional(),
  operator: z.strictObject({
    kind: z.literal("operator_decision"),
    actor: text.refine(
      (value) => !/^(agent|planner|executor|evaluator|coder|tester|orchestrator)$/iu.test(value),
    ),
    decision_ref: text,
    observed_at: isoTimestampSchema(),
  }),
  evidence: z
    .array(
      z.strictObject({
        ref: text,
        content: z.string().refine((value) => value.trim().length > 0),
        digest,
      }),
    )
    .min(1),
});
type WorkflowEffectResolution = z.infer<typeof resolutionSchema>;
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
      opts.decision.workflowStep.episode.purpose !== "implementation_rework") &&
    !exactProviderUpdateAfterFailedIntegration({ ...opts, latest })
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
      operation_identity: z.looseObject({
        id: z.literal("integration.run_next"),
        type: z.literal("integration_run_next"),
        params: z.object({ taskId: text }),
        preconditionFingerprint: z.object({ digest }),
        authorityRef: text,
        idempotencyKey: text,
      }),
      context: z.looseObject({
        schema_version: z.literal(1),
        kind: z.literal("integration_run_next"),
        task_id: text,
        repository_root: text,
        queue: z.looseObject({
          present: z.literal(true),
          branch: text,
          base: text,
          headSha: sha,
          baseSha: sha,
          prNumber: z.number().int().positive(),
        }),
        provider: z.object({
          state: z.literal("found"),
          pr: z.looseObject({
            identity: providerIdentity,
            prNumber: z.number().int().positive(),
            prUrl: text,
            headSha: sha,
            base: text,
          }),
        }),
      }),
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

// Historical process identity is explicit operator evidence, not retroactively
// native-authenticated provenance. Bind the complete retained receipt, never a
// caller-selected PID subset, and reject any live, reused or unobservable PID.
function assertAbandonedClaim(
  resolution: WorkflowEffectResolution,
  operation: Operation,
  entry: IntegrationQueueEntry,
  checkout: string,
): void {
  const evidence = resolution.evidence.find(
    (item) => item.ref === resolution.execution_receipt_ref,
  );
  if (!evidence || resolution.evidence.filter((item) => item.ref === evidence.ref).length !== 1)
    reject("one digest-bound execution receipt is required.");
  const processIdentity = z.looseObject({
    pid: z.number().int().positive(),
    ppid: z.number().int().nonnegative(),
    pgid: z.number().int().positive(),
    session: text,
    start: text,
  });
  const parsed = z
    .looseObject({
      journal_after: z.unknown(),
      queue_after: z.object({ schema_version: z.literal(1), entries: z.array(z.unknown()) }),
      steps: z.array(
        z.looseObject({
          argv: z.array(text),
          started_at: z.number().finite(),
          finished_at: z.number().finite(),
          pid: z.number().int().positive(),
          root_start_identity: processIdentity,
          owned_history: z.array(processIdentity).min(1),
          exit_code: z.number().int(),
          reaped: z.literal(true),
          reader_stopped: z.literal(true),
          remaining_owned: z.tuple([]),
        }),
      ),
    })
    .safeParse(JSON.parse(evidence.content));
  if (!parsed.success) reject("the execution receipt is incomplete.");
  const receipt = parsed.data;
  const original = validateSupervisorExecutionEpisodeJournal(receipt.journal_after);
  if (
    original.digest !== resolution.journal_digest ||
    unresolvedIntegrationIntent(original)?.operation_key !== operation.operation_key ||
    digestSupervisorEpisodeValue(original.operations.at(-1)?.recovery) !==
      digestSupervisorEpisodeValue(operation.recovery) ||
    receipt.queue_after.entries.filter(
      (item) => digestSupervisorEpisodeValue(item) === digestSupervisorEpisodeValue(entry),
    ).length !== 1
  )
    reject("the receipt does not bind the original intent and exact queue claim.");
  assertOriginalIdentity(original.operations.at(-1)!, resolution, checkout);
  const steps = receipt.steps.filter(
    (step) =>
      step.argv.length === 8 &&
      step.argv[2] === "--no-update-check" &&
      JSON.stringify(step.argv.slice(3)) ===
        JSON.stringify(["task", "advance", resolution.task_id, "--remote", "--agent-json"]),
  );
  const step = steps[0];
  if (
    steps.length !== 1 ||
    !step ||
    step.exit_code === 0 ||
    step.finished_at < step.started_at ||
    Date.parse(operation.started_at) < step.started_at * 1000 ||
    Date.parse(operation.started_at) > step.finished_at * 1000 ||
    entry.claimed_by !== `${userInfo().username}@${hostname()}` ||
    !entry.claim_token ||
    !entry.claimed_at ||
    !entry.lease_expires_at ||
    !Number.isFinite(Date.parse(entry.claimed_at)) ||
    !Number.isFinite(Date.parse(entry.lease_expires_at)) ||
    Date.parse(entry.claimed_at) < Date.parse(operation.started_at) ||
    Date.parse(entry.claimed_at) > step.finished_at * 1000 ||
    Date.parse(entry.lease_expires_at) > Date.now() ||
    Date.parse(entry.lease_expires_at) < Date.parse(entry.claimed_at) ||
    step.root_start_identity.pid !== step.pid ||
    step.root_start_identity.pgid !== step.pid ||
    step.owned_history.filter(
      (item) =>
        digestSupervisorEpisodeValue(item) ===
        digestSupervisorEpisodeValue(step.root_start_identity),
    ).length !== 1 ||
    new Set(step.owned_history.map((item) => item.pid)).size !== step.owned_history.length
  )
    reject("the receipt does not prove an expired, local, abandoned own claim.");
  for (const item of step.owned_history) {
    try {
      process.kill(item.pid, 0);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ESRCH") continue;
      reject("a receipt worker cannot be observed safely.");
    }
    reject("a receipt worker PID is live or reused.");
  }
}

export async function reconcileIntegrationEffect(opts: {
  command: CommandContext;
  task_id: string;
  input_path: string;
  decide: () => Promise<TaskRouteDecision>;
  canonical_record?: KernelRecord;
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
    const canonical = opts.canonical_record;
    const replay = operation.status !== "intent";
    if (replay && operation.result_digest !== digestSupervisorEpisodeValue(result))
      reject("the operation already has a different durable outcome.");
    if (replay && !canonical) return { ...output, replay: true };
    if (
      canonical &&
      replay &&
      (operation.status !== "failed" ||
        journal.operations.at(-1) !== operation ||
        journal.stop?.reason !== "operation_failed")
    )
      reject("only the exact terminalized integration intent may finish bookkeeping.");
    if (
      !replay &&
      (journal.digest !== resolution.journal_digest ||
        unresolvedIntegrationIntent(journal) !== operation)
    ) {
      reject("the journal changed or does not own this unresolved integration intent.");
    }
    const observedAt = Date.parse(resolution.operator.observed_at);
    if (observedAt < Date.parse(operation.started_at) || observedAt > Date.now())
      reject("operator evidence predates the intent or is future-dated.");
    // Queue ownership belongs to the base checkout even when the task is routed to a worktree.
    const initial = await opts.decide();
    const baseRoot = initial.workspace.baseCheckoutPath ?? opts.command.resolvedProject.gitRoot;
    if (path.resolve(baseRoot) !== path.resolve(resolution.repository_root))
      reject("repository ownership changed.");
    const checkout = canonical
      ? initial.workspace.taskWorktreePath
      : opts.command.resolvedProject.gitRoot;
    if (!checkout) reject("the authoritative Task checkout is unavailable.");
    const assertWorkspace = (route: TaskRouteDecision) => {
      if (
        canonical &&
        (route.task.id !== opts.task_id ||
          !route.workspace.taskWorktreePath ||
          path.resolve(route.workspace.taskWorktreePath) !== path.resolve(checkout) ||
          route.workspace.prBranch !== resolution.identity.branch ||
          path.resolve(route.workspace.baseCheckoutPath ?? opts.command.resolvedProject.gitRoot) !==
            path.resolve(baseRoot) ||
          (path.resolve(opts.command.resolvedProject.gitRoot) !== path.resolve(baseRoot) &&
            path.resolve(opts.command.resolvedProject.gitRoot) !== path.resolve(checkout)))
      )
        reject("the authoritative Task checkout ownership changed.");
    };
    assertWorkspace(initial);
    assertOriginalIdentity(operation, resolution, checkout);
    return await withIntegrationQueueMutex(baseRoot, async () => {
      const current = await opts.decide();
      assertWorkspace(current);
      if (
        current.task.id !== opts.task_id ||
        (!replay &&
          current.workflowStep.preconditionFingerprint.digest !==
            resolution.current_state_fingerprint) ||
        path.resolve(current.workspace.baseCheckoutPath ?? opts.command.resolvedProject.gitRoot) !==
          path.resolve(baseRoot)
      ) {
        reject("the current task route changed.");
      }
      const assertCompleted = async () => {
        if (!canonical) return;
        const task = await opts.command.taskBackend.getTask(opts.task_id);
        const read = task && readKernelRecord(task, canonical.repository_identity);
        if (
          read?.kind !== "canonical" ||
          read.record.aggregate.state !== "COMPLETED" ||
          read.record.digest !== canonical.digest ||
          resolution.verdict !== "not_applied"
        )
          reject("canonical recovery requires the same completed Task and not_applied only.");
        if (!operation.recovery) reject("canonical recovery requires the original snapshot.");
      };
      await assertCompleted();
      const queue = await readIntegrationQueue(baseRoot);
      if (
        queue.entries.some(
          (item) =>
            (item.status === "claimed" || item.status === "handoff") &&
            (!canonical || item.task_id !== opts.task_id),
        )
      )
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
        (!canonical && (entry.claimed_by || entry.claim_token || entry.active_operation))
      )
        reject("queue identity changed or retained a claim.");
      const releaseReason = `integration_not_applied:${digestSupervisorEpisodeValue(result)}`;
      const released =
        canonical &&
        replay &&
        entry.status === "queued" &&
        entry.reason === releaseReason &&
        !entry.claimed_by &&
        !entry.claim_token &&
        !entry.active_operation;
      if (canonical && !released) {
        if (
          (entry.status !== "claimed" && entry.status !== "handoff") ||
          entry.active_operation !== "integration"
        )
          reject("the exact integration claim is absent.");
        assertAbandonedClaim(resolution, operation, entry, checkout);
      }
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
          // GitHub reports a test merge SHA before an open PR is merged.
          (pr.provider !== "github" && pr.mergeCommit) ||
          pr.mergedAt ||
          (!canonical && entry.status !== "queued" && entry.status !== "rework") ||
          pr.baseSha !== expected.base_sha ||
          (await gitRevParse(baseRoot, [expected.base])) !== expected.base_sha ||
          (await gitRevParse(baseRoot, [expected.branch])) !== expected.head_sha
        )
          reject("the not_applied verdict contradicts provider, queue, or Git evidence.");
        const step = current.workflowStep;
        if (
          !canonical &&
          (step.kind !== "agent_episode" || step.episode.purpose !== "implementation_rework")
        )
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
      assertWorkspace(finalRoute);
      if (
        finalRoute.workflowStep.preconditionFingerprint.digest !==
          current.workflowStep.preconditionFingerprint.digest ||
        (!replay &&
          finalRoute.workflowStep.preconditionFingerprint.digest !==
            resolution.current_state_fingerprint) ||
        digestSupervisorEpisodeValue(await readIntegrationQueue(baseRoot)) !==
          digestSupervisorEpisodeValue(queue)
      ) {
        reject("the task route or queue changed during provider reconciliation.");
      }
      await assertCompleted();
      if (
        replay &&
        validateSupervisorExecutionEpisodeJournal(await store.read()).digest !== journal.digest
      )
        reject("the journal changed during bookkeeping recovery.");
      if (released) return { ...output, replay: true };
      if (canonical) assertAbandonedClaim(resolution, operation, entry, checkout);
      if (replay) {
        await writeIntegrationQueue(
          baseRoot,
          markQueueEntry(queue, opts.task_id, "queued", releaseReason),
        );
        return { ...output, replay: true };
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
        resolution.verdict === "not_applied" && !canonical
          ? prepareReplacementSupervisorExecutionEpisodeAfterFailure({
              journal: completed,
              state_fingerprint_digest: resolution.current_state_fingerprint,
            })
          : completed;
      if (!replay && !(await store.compareAndSwap(journal.digest, next)))
        reject("the journal changed before recovery could be committed.");
      // Persist the outcome first. A failed queue write retains the blocked
      // claim, and the same resolution may finish only this bookkeeping.
      if (canonical)
        await writeIntegrationQueue(
          baseRoot,
          markQueueEntry(queue, opts.task_id, "queued", releaseReason),
        );
      return { ...output, replay };
    });
  } finally {
    await lease.release();
  }
}
