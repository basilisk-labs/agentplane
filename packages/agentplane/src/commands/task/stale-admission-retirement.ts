import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  isoTimestampSchema,
  retireSupervisorExecutionEpisodeIntentAfterStateDrift,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  createSupervisorEpisodeStore,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import {
  observeStaleAdmission,
  readRetirementFile,
  retirementJournalPath,
  retirementRefusal,
  retirementRequestSchema,
  type RetirementContext,
  type RetirementImages,
  type RetirementRequest,
} from "./stale-admission-retirement-validation.js";
import {
  RetirementEvidence,
  type PreparedRetirement,
} from "./stale-admission-retirement-evidence.js";

function afterimages(before: RetirementImages, request: RetirementRequest, now: string) {
  isoTimestampSchema({ offset: true }).parse(now);
  const fingerprint = k.kernelDigest({
    kind: "explicit_operator_stale_admission_retirement",
    request,
    original_checkout_state: "absent",
  });
  const journal = retireSupervisorExecutionEpisodeIntentAfterStateDrift({
    journal: validateSupervisorExecutionEpisodeJournal(JSON.parse(before.journal)),
    state_fingerprint_digest: fingerprint,
    result: {
      classification: "operator_revoked_stale_semantic_admission",
      request_digest: k.kernelDigest(request),
      original_checkout_state: "absent",
      prior_effect_outcome: "unassessed",
    },
    now,
  });
  const exchange = {
    ...JSON.parse(before.exchange),
    status: "retired",
    postcondition_fingerprint: fingerprint,
    updated_at: now,
  };
  return {
    journal: JSON.stringify(journal, null, 2) + "\n",
    exchange: JSON.stringify(exchange, null, 2) + "\n",
  };
}

function assertAfterimages(prepared: PreparedRetirement, request: RetirementRequest): void {
  const now: unknown = JSON.parse(prepared.after_exchange).updated_at;
  if (typeof now !== "string") retirementRefusal("invalid prepared retirement timestamp.");
  const expected = afterimages(prepared.before, request, now);
  if (expected.journal !== prepared.after_journal || expected.exchange !== prepared.after_exchange)
    retirementRefusal("prepared afterimages are not the exact native retirement.");
}

export async function previewStaleAdmissionRetirement(ctx: RetirementContext) {
  const observation = await observeStaleAdmission(ctx);
  return { kind: "ready" as const, request: observation.request };
}

/** Revocation closes admission, without deciding what any historical agent actually did. */
export async function retireStaleAdmission(opts: {
  context: RetirementContext;
  request: unknown;
  /** @internal Deterministic interruption and drift injection for recovery tests. */
  boundary?: (phase: "prepared" | "exchange" | "journal" | "receipt") => Promise<void>;
}) {
  const ctx = opts.context;
  const request = retirementRequestSchema.parse(opts.request);
  if (ctx.task_id !== request.task_id) retirementRefusal("foreign request Task.");
  const journalPath = retirementJournalPath(ctx);
  // Validate containment before the existing lease implementation creates its sibling lock.
  await readRetirementFile(ctx.common_git_dir, journalPath);
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) retirementRefusal("an active supervisor owns this Task.");
  try {
    const evidence = new RetirementEvidence(ctx, request);
    let prepared = await evidence.readPrepared();
    const observe = async () => {
      const current = await observeStaleAdmission(ctx, prepared?.before);
      if (k.kernelDigest(current.request) !== k.kernelDigest(request))
        retirementRefusal("the preview binding changed.");
      return current;
    };
    const initial = await observe();
    if (!prepared) {
      const after = afterimages(initial.images, request, new Date().toISOString());
      prepared = await evidence.prepare(initial.images, after.journal, after.exchange);
    }
    const transaction = prepared;
    assertAfterimages(transaction, request);
    await opts.boundary?.("prepared");
    const status = await evidence.receipt(transaction, false);
    const inspect = async () => {
      const current = await observe();
      const journalBefore = current.current_journal === transaction.before.journal;
      const exchangeBefore = current.current_exchange === transaction.before.exchange;
      const journalAfter = current.current_journal === transaction.after_journal;
      const exchangeAfter = current.current_exchange === transaction.after_exchange;
      if (
        (!journalBefore && !journalAfter) ||
        (!exchangeBefore && !exchangeAfter) ||
        (journalAfter && !exchangeAfter) ||
        (status.present && (!journalAfter || !exchangeAfter))
      )
        retirementRefusal("unknown or changed partial retirement; no writes are permitted.");
      return { current, journalBefore, exchangeBefore, journalAfter, exchangeAfter };
    };
    let state = await inspect();
    if (state.exchangeBefore) {
      await writeTextIfChanged(initial.exchange_path, transaction.after_exchange, {
        containedRoot: ctx.common_git_dir,
        label: "retired semantic admission",
        beforePublication: async () => {
          const fresh = await inspect();
          if (!fresh.exchangeBefore || !fresh.journalBefore)
            retirementRefusal("the exchange changed before native publication.");
        },
      });
    }
    await opts.boundary?.("exchange");
    state = await inspect();
    if (state.journalBefore) {
      const before = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(transaction.before.journal),
      );
      const after = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(transaction.after_journal),
      );
      if (!(await createSupervisorEpisodeStore(journalPath).compareAndSwap(before.digest, after)))
        retirementRefusal("the journal changed before native CAS.");
    }
    await opts.boundary?.("journal");
    state = await inspect();
    if (!state.journalAfter || !state.exchangeAfter)
      retirementRefusal("native afterimages were not retained.");
    const result = await evidence.receipt(transaction, true);
    await opts.boundary?.("receipt");
    return {
      kind: status.present ? ("already_retired" as const) : ("retired" as const),
      receipt: result.receipt,
      receipt_path: result.path,
      evidence_directory: evidence.directory,
    };
  } finally {
    await lease.release();
  }
}
