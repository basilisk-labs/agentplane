import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { SupervisorEpisodeStore } from "../shared/supervisor-execution-episode.js";
import type { CommandContext } from "../shared/task-backend.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { applyAcceptedExternalAgentResult } from "./external-agent-result-application.js";
import type {
  ExternalAgentExchange,
  ExternalAgentExchangePaths,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { usesExternalImplementationAuthority } from "./external-agent-purpose.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import { failRejectedExternalAgentResult } from "./external-agent-supervisor-recovery.js";

type SupervisorIntent = {
  store: SupervisorEpisodeStore;
  journal: Parameters<typeof failRejectedExternalAgentResult>[0]["journal"];
  operation: { operation_key: string };
  paths: ExternalAgentExchangePaths;
};

function sameLines(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((line, index) => line === right[index]);
}

export async function applyExternalAgentResultWithRejectedResultRecovery(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  envelope: ExternalAgentResultEnvelope;
  supervisor: SupervisorIntent;
  include_remote: boolean;
  skip_application: boolean;
}): Promise<void> {
  if (opts.skip_application) return;
  const [applicationHead, applicationStatus] = await Promise.all([
    readDirectTaskHead(opts.exchange.checkout),
    readDirectRepositoryStatus(opts.exchange.checkout),
  ]);
  try {
    await applyAcceptedExternalAgentResult({
      command: opts.command,
      decision: opts.decision,
      exchange: opts.exchange,
      work_order: opts.work_order,
      envelope: opts.envelope,
    });
  } catch (error) {
    if (
      !(error instanceof CliError) ||
      error.code !== "E_VALIDATION" ||
      opts.exchange.status !== "result_received" ||
      !usesExternalImplementationAuthority(opts.exchange.purpose, opts.work_order.authority.sandbox)
    ) {
      throw error;
    }
    const [afterHead, afterStatus, afterDecision] = await Promise.all([
      readDirectTaskHead(opts.exchange.checkout),
      readDirectRepositoryStatus(opts.exchange.checkout),
      refreshExternalAgentRoute({
        cwd: opts.exchange.checkout,
        task_id: opts.exchange.task_id,
        include_remote: opts.include_remote,
      }),
    ]);
    if (
      applicationHead !== afterHead ||
      !sameLines(applicationStatus?.lines ?? [], afterStatus?.lines ?? []) ||
      opts.decision.workflowStep.preconditionFingerprint.digest !==
        afterDecision.workflowStep.preconditionFingerprint.digest
    ) {
      throw error;
    }
    await failRejectedExternalAgentResult({
      store: opts.supervisor.store,
      journal: opts.supervisor.journal,
      operation_key: opts.supervisor.operation.operation_key,
      exchange: opts.exchange,
      paths: opts.supervisor.paths,
      state_fingerprint_digest: afterDecision.workflowStep.preconditionFingerprint.digest,
      error,
    });
  }
}
