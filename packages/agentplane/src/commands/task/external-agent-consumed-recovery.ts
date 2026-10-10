import path from "node:path";
import {
  type AgentWorkOrderV2,
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import {
  createSupervisorEpisodeStore,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import {
  externalAgentIssueDigest,
  externalAgentResultDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";
import { assertExternalAgentExchangeIdentity } from "./external-agent-exchange-authority.js";

export function assertExternalAgentExchangeNotConsumed(exchange: ExternalAgentExchange): void {
  if (exchange.status !== "consumed" && exchange.status !== "retired") return;
  throw new CliError({
    code: "E_RUNTIME",
    message:
      "This external-agent observation was already consumed. Resolve its recorded operator blocker before requesting a fresh task action; the old WorkOrder cannot be reissued.",
    context: {
      task_id: exchange.task_id,
      result_path: exchange.result_ref,
      recovery: "operator_boundary",
    },
  });
}

/** Retire only the historical duplicate intent. Never apply or rewrite its consumed result. */
export async function recoverConsumedExternalAgentDuplicate(opts: {
  journal_path: string;
  paths: ExternalAgentExchangePaths;
  task_id: string;
  checkout: string;
  observed_fingerprint: string;
}): Promise<void> {
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opts.journal_path });
  if (!lease)
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor owns consumed exchange recovery.",
    });
  try {
    const store = createSupervisorEpisodeStore(opts.journal_path);
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = journal.operations.at(-1);
    if (operation?.status !== "intent") return;
    const previous = journal.operations.at(-2);
    const exchange = await readExternalAgentExchange(opts.paths.exchange);
    const order = await readExternalAgentWorkOrder(opts.paths.work_order);
    const invalid = () =>
      new CliError({
        code: "E_VALIDATION",
        message: "Consumed exchange has no authenticated duplicate-intent recovery proof.",
      });
    if (
      exchange?.status !== "consumed" ||
      !isReadOnlyWorktreeObservation({ exchange, work_order: order })
    )
      throw invalid();
    assertExternalAgentExchangeIdentity({
      exchange,
      paths: opts.paths,
      task_id: opts.task_id,
      transition_id: path.basename(path.dirname(opts.paths.directory)),
      state_fingerprint: order.state_fingerprint.digest,
      work_order_id: order.work_order_id,
      role: order.role,
      purpose: "task_worktree_resolution",
      checkout: opts.checkout,
    });
    if (
      order.task.id !== opts.task_id ||
      path.resolve(order.state_fingerprint.worktree ?? "") !== path.resolve(opts.checkout)
    )
      throw invalid();
    const retained = exchange.result;
    if (
      !retained ||
      !exchange.result_digest ||
      externalAgentResultDigest(retained) !== exchange.result_digest
    )
      throw invalid();
    const envelope = validateExternalAgentResultEnvelope({
      raw: JSON.parse(await readStableRegularTextNoFollow(opts.paths.result, "consumed result")),
      exchange,
      work_order: order,
    });
    if (externalAgentResultDigest(envelope) !== exchange.result_digest) throw invalid();
    const effect = `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: order })}`;
    if (
      journal.task_id !== opts.task_id ||
      journal.status !== "running" ||
      journal.cursor.phase !== "intent_recorded" ||
      journal.cursor.operation_key !== operation.operation_key ||
      previous?.status !== "completed" ||
      operation.sequence !== previous.sequence + 1 ||
      operation.kind !== "agent_episode" ||
      previous.kind !== operation.kind ||
      operation.role !== order.role ||
      previous.role !== operation.role ||
      operation.work_order_ref !== opts.paths.work_order ||
      previous.work_order_ref !== operation.work_order_ref ||
      operation.effect_ref !== effect ||
      previous.effect_ref !== effect ||
      operation.precondition_fingerprint_digest !== exchange.state_fingerprint ||
      previous.precondition_fingerprint_digest !== exchange.state_fingerprint ||
      operation.authority_ref !== `external-agent:${opts.task_id}:agent.task_worktree_resolution` ||
      previous.authority_ref !== operation.authority_ref ||
      operation.authority_digest !== exchange.state_fingerprint ||
      previous.authority_digest !== operation.authority_digest ||
      exchange.postcondition_fingerprint !== exchange.state_fingerprint ||
      previous.progress_digest !== digestSupervisorEpisodeValue(order.state_fingerprint) ||
      previous.postcondition_fingerprint_digest !== exchange.postcondition_fingerprint ||
      previous.result_digest !==
        digestSupervisorEpisodeValue({
          work_order_id: order.work_order_id,
          semantic_status: envelope.result.status,
          result_digest: exchange.result_digest,
        })
    )
      throw invalid();
    const failed = completeSupervisorExecutionEpisode({
      journal,
      operation_key: operation.operation_key,
      failed: true,
      result: {
        classification: "consumed_exchange_duplicate_intent",
        original_operation_key: previous.operation_key,
        original_completion_digest: previous.result_digest,
        result_digest: exchange.result_digest,
        original_postcondition: exchange.postcondition_fingerprint,
        observed_state_fingerprint: opts.observed_fingerprint,
      },
    });
    if (!(await store.compareAndSwap(journal.digest, failed)))
      throw new CliError({
        code: "E_RUNTIME",
        message: "Supervisor changed during consumed duplicate recovery.",
      });
    throw new CliError({
      code: "E_RUNTIME",
      message: `AgentPlane retired only the duplicate consumed-exchange intent; request a fresh replacement: agentplane task advance ${opts.task_id} --replacement --agent-json`,
      context: {
        task_id: opts.task_id,
        exact_argv: [
          "agentplane",
          "task",
          "advance",
          opts.task_id,
          "--replacement",
          "--agent-json",
        ],
      },
    });
  } finally {
    await lease.release();
  }
}

/** Only an observation with no mutation authority can retire without applying its report. */
export function isReadOnlyWorktreeObservation(opts: {
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}): boolean {
  const authority = opts.work_order.authority;
  return (
    opts.exchange.purpose === "task_worktree_resolution" &&
    authority.sandbox === "read-only" &&
    authority.writable_roots.length === 0 &&
    authority.external_side_effects.length === 0 &&
    authority.allowed_tool_classes.every((tool) =>
      [
        "repository_read",
        "git_read",
        "run_checks",
        "knowledge_read",
        "knowledge_request",
        "report_result",
        "report_blocker",
      ].includes(tool),
    )
  );
}
