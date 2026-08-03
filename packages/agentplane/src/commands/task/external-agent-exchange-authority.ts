import path from "node:path";

import {
  advanceSupervisorExecutionEpisodeState,
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { SupervisorEpisodeStore } from "../shared/supervisor-execution-episode.js";

import {
  externalAgentIssueDigest,
  writeExternalAgentExchange,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

function samePath(left: string, right: string): boolean {
  return path.resolve(left) === path.resolve(right);
}

export function assertExternalAgentExchangeIdentity(opts: {
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  work_order_id: string;
  role: AgentWorkOrderV2["role"];
  purpose: string;
  checkout: string;
}): void {
  if (
    opts.exchange.task_id !== opts.task_id ||
    opts.exchange.transition_id !== opts.transition_id ||
    opts.exchange.state_fingerprint !== opts.state_fingerprint ||
    opts.exchange.work_order_id !== opts.work_order_id ||
    opts.exchange.role !== opts.role ||
    opts.exchange.purpose !== opts.purpose ||
    !samePath(opts.exchange.checkout, opts.checkout) ||
    !samePath(opts.exchange.work_order_ref, opts.paths.work_order) ||
    !samePath(opts.exchange.result_schema_ref, opts.paths.result_schema) ||
    !samePath(opts.exchange.result_ref, opts.paths.result)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Persisted external-agent exchange does not match the current semantic boundary.",
    });
  }
}

export function assertExternalAgentSupervisorIntent(opts: {
  journal: unknown;
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
  task_id: string;
  state_fingerprint: string;
}): {
  state: "issued" | "completed_pending_exchange";
  journal: SupervisorExecutionEpisodeJournal;
  operation: SupervisorExecutionEpisodeJournal["operations"][number];
} {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const operation = journal.operations.at(-1);
  const expectedEffectRef = `external-agent-issue:${externalAgentIssueDigest({
    exchange: opts.exchange,
    work_order: opts.work_order,
  })}`;
  if (!operation) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent exchange or work order does not match the supervisor intent.",
    });
  }
  if (
    journal.task_id !== opts.task_id ||
    operation.precondition_fingerprint_digest !== opts.state_fingerprint ||
    operation.work_order_ref !== opts.paths.work_order ||
    operation.role !== opts.work_order.role ||
    operation.effect_ref !== expectedEffectRef
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent exchange or work order does not match the supervisor intent.",
    });
  }
  if (operation.status === "completed" && opts.exchange.status === "consumed") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result was already consumed; replay is refused.",
    });
  }
  if (
    operation.status === "completed" &&
    opts.exchange.status === "accepted" &&
    (journal.cursor.phase === "completed" ||
      journal.cursor.phase === "ready" ||
      (journal.cursor.phase === "stopped" && journal.stop?.reason === "budget_exhausted"))
  ) {
    return { state: "completed_pending_exchange", journal, operation };
  }
  if (
    journal.cursor.phase !== "intent_recorded" ||
    operation.status !== "intent" ||
    operation.operation_key !== journal.cursor.operation_key
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent supervisor has no matching issued operation intent.",
    });
  }
  if (opts.exchange.status !== "issued" && opts.exchange.status !== "accepted") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent exchange state is invalid for an issued operation intent.",
    });
  }
  return { state: "issued", journal, operation };
}

export async function finalizeCompletedExternalAgentExchange(opts: {
  intent: ReturnType<typeof assertExternalAgentSupervisorIntent>;
  store: SupervisorEpisodeStore;
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  postcondition_fingerprint: string;
  route_step_id: string;
  work_order_id: string;
  semantic_status: string;
  result_digest: string;
}): Promise<boolean> {
  if (opts.intent.state !== "completed_pending_exchange") return false;
  const expectedCompletionDigest = digestSupervisorEpisodeValue({
    work_order_id: opts.work_order_id,
    semantic_status: opts.semantic_status,
    result_digest: opts.result_digest,
  });
  if (opts.intent.operation.result_digest !== expectedCompletionDigest) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Completed external-agent operation does not match the accepted semantic result.",
    });
  }
  let journal = opts.intent.journal;
  if (journal.cursor.phase === "completed") {
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: opts.postcondition_fingerprint,
      route_observation: { step_id: opts.route_step_id, surface: "task advance recovery" },
    });
    if (!(await opts.store.compareAndSwap(journal.digest, advanced))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while recovering a completed result.",
      });
    }
    journal = advanced;
  }
  if (
    journal.cursor.phase === "ready" &&
    (journal.state_fingerprint_digest !== opts.postcondition_fingerprint ||
      opts.intent.operation.postcondition_fingerprint_digest !== opts.postcondition_fingerprint)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Completed external-agent result no longer matches the current task state.",
    });
  }
  await writeExternalAgentExchange(opts.paths.exchange, {
    ...opts.exchange,
    status: "consumed",
    postcondition_fingerprint: opts.postcondition_fingerprint,
    updated_at: new Date().toISOString(),
  });
  return true;
}
