import { readCandidateReceipt, persistCandidateReceipt } from "./candidate-publication-receipt.js";
import path from "node:path";
import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
  type StateFingerprint,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import {
  publishNewStableRegularFileNoFollow,
  readStableRegularTextNoFollow,
} from "../../shared/stable-file.js";
import {
  createSupervisorEpisodeStore,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { evaluateWorkflowOperationAuthority } from "../shared/side-effect-authority.js";
import { candidatePublicationOperation } from "./candidate-publication-admission.js";
import {
  assertCandidateAttempt,
  candidatePublicationApprovalRequest,
  candidatePublicationRequestSchema,
  type CandidatePublicationRequest,
} from "./candidate-publication-request.js";
import { assertCandidateTree } from "./candidate-publication-tree.js";
import { createCandidateGitPort, type CandidateGitIdentity } from "./candidate-publication-git.js";

export type CandidatePublicationContext = {
  raw: unknown;
  record: KernelRecord;
  fingerprint: StateFingerprint;
  task: Pick<TaskData, "extensions">;
};

async function validateCandidateDispatch(opts: {
  root: string;
  request: CandidatePublicationRequest;
  context: CandidatePublicationContext;
}) {
  assertCandidateAttempt({ ...opts, ...opts.context });
  if (
    opts.context.fingerprint.task_id !== opts.request.task_id ||
    opts.context.fingerprint.task_revision !== opts.context.record.aggregate.revision ||
    opts.context.fingerprint.components.task.digest !==
      k.kernelDigest({
        state: "present",
        source: "canonical_task",
        value: opts.context.record.digest,
      })
  )
    throw new Error("Candidate dispatch fingerprint is not the current canonical record");
  await assertCandidateTree(opts.root, opts.request);
  const decision = evaluateWorkflowOperationAuthority({
    task: opts.context.task,
    operation: candidatePublicationOperation(opts.request),
    fingerprint: opts.context.fingerprint,
  });
  if (
    decision.state !== "allowed" ||
    decision.authority?.actor !== "USER" ||
    decision.authority.evidenceDigest !==
      candidatePublicationApprovalRequest(opts.request).approval_digest
  )
    throw new Error("Candidate publication approval is missing, revoked, expired, or stale");
  return decision.authority;
}

export type CandidatePublicationPort = {
  read: (identity: CandidateGitIdentity) => Promise<string | null>;
  create: (identity: CandidateGitIdentity) => Promise<void>;
};

/** Candidate publication records a provider effect, never a canonical semantic result. */
export async function publishCandidateWithJournal(opts: {
  root: string;
  directory: string;
  request: CandidatePublicationRequest;
  readContext: () => Promise<CandidatePublicationContext>;
  port?: CandidatePublicationPort;
}) {
  const request = candidatePublicationRequestSchema.parse(opts.request);
  const store = createSupervisorEpisodeStore(path.join(opts.directory, "journal.json"));
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: store.path });
  if (!lease) throw new Error("Candidate publication is already owned by another controller");
  const port = opts.port ?? createCandidateGitPort(opts.root);
  try {
    const context = await opts.readContext();
    const authority = await validateCandidateDispatch({ ...opts, request, context });
    const requestBytes = `${JSON.stringify(request)}\n`;
    const requestPath = path.join(opts.directory, "request.json");
    if (
      !(await publishNewStableRegularFileNoFollow(
        requestPath,
        requestBytes,
        "candidate publication request",
      )) &&
      (await readStableRegularTextNoFollow(requestPath, "candidate publication request")) !==
        requestBytes
    )
      throw new Error("Persisted candidate request changed");
    const previous = await store.read();
    let journal = previous
      ? validateSupervisorExecutionEpisodeJournal(previous)
      : createSupervisorExecutionEpisodeJournal({
          task_id: request.task_id,
          task_revision: context.record.aggregate.revision,
          state_fingerprint_digest: context.fingerprint.digest,
          budget: {
            max_episodes: 1,
            max_agent_runs: null,
            max_input_tokens: null,
            max_output_tokens: null,
            max_total_tokens: null,
            max_wall_time_ms: null,
            max_changed_files: null,
            max_diff_lines: null,
            max_no_progress_episodes: null,
          },
        });
    const identity = { operation: "candidate.publish", request_digest: request.digest };
    const last = journal.operations.at(-1);
    if (last) {
      if (
        last.effect_ref !== request.digest ||
        journal.task_id !== request.task_id ||
        last.authority_digest !== authority.digest
      )
        throw new Error("Candidate journal operation identity changed");
      if ((await port.read(request)) !== request.commit)
        throw new Error(
          "Candidate effect is unresolved or remote identity changed; publication will not be retried",
        );
      if (last.status === "completed") {
        const retained = await readCandidateReceipt(opts.directory, request, authority.digest);
        if (k.kernelDigest(retained) !== last.result_digest)
          throw new Error("Candidate receipt differs from completed journal result");
        return retained;
      }
      if (last.status !== "intent" || journal.cursor.phase !== "intent_recorded")
        throw new Error("Candidate journal cannot reconcile this operation state");
      const observed = await persistCandidateReceipt(
        opts.directory,
        request,
        authority.digest,
        true,
      );
      const completed = completeSupervisorExecutionEpisode({
        journal,
        operation_key: last.operation_key,
        result: observed,
      });
      if (!(await store.compareAndSwap(journal.digest, completed)))
        throw new Error("Candidate journal changed during reconciliation");
      return observed;
    }
    if ((await port.read(request)) !== null)
      throw new Error("Candidate destination must be absent before publication");
    const fresh = await opts.readContext();
    const freshAuthority = await validateCandidateDispatch({ ...opts, request, context: fresh });
    if (
      fresh.fingerprint.digest !== context.fingerprint.digest ||
      freshAuthority.digest !== authority.digest
    )
      throw new Error("Candidate publication authority or observed state changed before dispatch");
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "side_effect",
      operation_identity: identity,
      precondition_fingerprint_digest: fresh.fingerprint.digest,
      authority_ref: `authority:${authority.id}`,
      authority_digest: authority.digest,
      work_order_ref: request.work_order_digest,
      effect_ref: request.digest,
    });
    if (started.status !== "started")
      throw new Error("Candidate journal did not admit publication");
    if (!(await store.compareAndSwap(previous ? journal.digest : null, started.journal)))
      throw new Error("Candidate publication lost journal admission");
    journal = started.journal;
    const dispatchContext = await opts.readContext();
    const dispatchAuthority = await validateCandidateDispatch({
      ...opts,
      request,
      context: dispatchContext,
    });
    if (
      dispatchContext.fingerprint.digest !== fresh.fingerprint.digest ||
      dispatchAuthority.digest !== authority.digest
    )
      throw new Error("Candidate state changed after journal admission; no publication dispatched");
    // An exception leaves a durable intent. A later call may only reconcile exact remote truth.
    await port.create(request);
    if ((await port.read(request)) !== request.commit)
      throw new Error("Candidate publication readback did not match exact commit");
    const observed = await persistCandidateReceipt(
      opts.directory,
      request,
      authority.digest,
      false,
    );
    const completed = completeSupervisorExecutionEpisode({
      journal,
      operation_key: started.operation_key,
      result: observed,
    });
    if (!(await store.compareAndSwap(journal.digest, completed)))
      throw new Error("Candidate journal completion changed");
    return observed;
  } finally {
    await lease.release();
  }
}
