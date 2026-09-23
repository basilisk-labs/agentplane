import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { finishExternalImplementationVerification } from "./external-agent-implementation-finalization.js";
import { recordDirectTaskVerification } from "./direct-task-verification-record.js";
import { projectKernelImplementationRework } from "./kernel-operational-projection.js";

/** Record repository rework as derived evidence without reopening a completed Kernel aggregate. */
export async function finalizeExternalCanonicalImplementationRework(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  envelope: ExternalAgentResultEnvelope;
  implementation_commit: string;
}): Promise<void> {
  const projected = await projectKernelImplementationRework({
    command: opts.command,
    task_id: opts.exchange.task_id,
    implementation_commit: opts.implementation_commit,
    projected_at: new Date().toISOString(),
  });
  const verification = await recordDirectTaskVerification({
    command: opts.command,
    checkout: opts.exchange.checkout,
    task: projected,
    work_order: opts.work_order,
    workflow: opts.decision.workflowMode === "branch_pr" ? "branch_pr" : "direct",
  });
  await finishExternalImplementationVerification({
    ...opts,
    semantic: opts.envelope.result,
    task: projected,
    verification,
    conflict: false,
  });
}
