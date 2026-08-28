import {
  retireSupervisorExecutionEpisodeIntentAfterStateDrift,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  createSupervisorEpisodeStore,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { isExternalEvaluatorResultApplied } from "./external-agent-evaluator.js";
import { assertExternalAgentSupervisorIntent } from "./external-agent-exchange-authority.js";
import {
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  writeExternalAgentExchange,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

export function isStaleUnappliedEvaluatorCandidate(
  exchange: ExternalAgentExchange,
  currentFingerprint: string,
): boolean {
  return (
    exchange.purpose === "quality_review" &&
    exchange.role === "EVALUATOR" &&
    (exchange.status === "issued" || exchange.status === "result_received") &&
    exchange.state_fingerprint !== currentFingerprint
  );
}

/** Retire an obsolete review intent. Never apply or rewrite its semantic result. */
export async function retireStaleEvaluatorExchange(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  journal_path: string;
}): Promise<void> {
  const currentFingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  if (!isStaleUnappliedEvaluatorCandidate(opts.exchange, currentFingerprint)) return;
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opts.journal_path });
  if (!lease) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor owns evaluator recovery; retry after its operation completes.",
    });
  }
  try {
    const store = createSupervisorEpisodeStore(opts.journal_path);
    const rawJournal = await store.read();
    const exchange = await readExternalAgentExchange(opts.paths.exchange);
    if (!rawJournal || !exchange) return;
    const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
    const operation = journal.operations.at(-1);
    if (
      operation?.status !== "intent" ||
      operation.work_order_ref !== opts.paths.work_order ||
      exchange.transition_id !== opts.exchange.transition_id ||
      !isStaleUnappliedEvaluatorCandidate(exchange, currentFingerprint)
    )
      return;
    const workOrder = await readExternalAgentWorkOrder(opts.paths.work_order);
    assertExternalAgentSupervisorIntent({
      journal,
      exchange,
      paths: opts.paths,
      work_order: workOrder,
      task_id: opts.decision.task.id,
      state_fingerprint: opts.exchange.state_fingerprint,
    });
    // A crash after applying the review must resume its existing idempotent closeout.
    if (await isExternalEvaluatorResultApplied({ command: opts.command, exchange })) return;
    const retired = retireSupervisorExecutionEpisodeIntentAfterStateDrift({
      journal,
      state_fingerprint_digest: currentFingerprint,
      result: {
        classification: "evaluator_state_fingerprint_drift",
        transition_id: exchange.transition_id,
        previous_state_fingerprint: exchange.state_fingerprint,
        current_state_fingerprint: currentFingerprint,
      },
    });
    // Persist this first so existing retired-exchange recovery can finish a crash here.
    await writeExternalAgentExchange(opts.paths.exchange, {
      ...exchange,
      status: "retired",
      postcondition_fingerprint: currentFingerprint,
      updated_at: new Date().toISOString(),
    });
    if (!(await store.compareAndSwap(journal.digest, retired))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while retiring the stale evaluator result.",
      });
    }
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "The evaluator input changed. AgentPlane retired the stale result; run: " +
        `agentplane task advance ${exchange.task_id} --replacement --agent-json`,
      context: {
        task_id: exchange.task_id,
        exact_argv: [
          "agentplane",
          "task",
          "advance",
          exchange.task_id,
          "--replacement",
          "--agent-json",
        ],
      },
    });
  } finally {
    await lease.release();
  }
}
