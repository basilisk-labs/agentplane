import {
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";

import {
  externalAgentIssueDigest,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

export function assertExternalAgentSupervisorIntent(opts: {
  journal: unknown;
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
  task_id: string;
  state_fingerprint: string;
}): {
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
  return { journal, operation };
}
