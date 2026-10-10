import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import path from "node:path";
import {
  loadTaskFromContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { AgentActionPacket } from "./agent-action-packet.js";
import {
  externalAgentResultDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
} from "./external-agent-exchange.js";
import { readCompletedReworkRecord } from "./kernel-completed-external-rework.js";

/** Result acceptance already authenticated and consumed this exact exchange. */
export async function completedBlockerBoundary(opts: {
  command: CommandContext;
  result_path: string;
  decision: TaskRouteDecision;
}): Promise<AgentActionPacket | null> {
  const exchange = await readExternalAgentExchange(
    path.join(path.dirname(path.resolve(opts.result_path)), "exchange.json"),
  );
  if (
    exchange?.status !== "consumed" ||
    exchange.purpose !== "implementation_rework" ||
    exchange.result?.result.status !== "blocked"
  )
    return null;
  const order = await readExternalAgentWorkOrder(exchange.work_order_ref);
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: exchange.task_id });
  if (!(await readCompletedReworkRecord({ command: opts.command, task, work_order: order })))
    return null;
  return {
    schema_version: 1,
    task_id: task.id,
    transition_id: exchange.transition_id,
    state_fingerprint: opts.decision.workflowStep.preconditionFingerprint.digest,
    action: {
      kind: "human_input_required",
      instruction:
        "The blocked result is retained. Return control to the operator to resolve its recorded blocker before requesting another episode.",
    },
    authority: {
      role: order.role,
      mutation: "read_only",
      network: "deny",
      required: false,
      reference: null,
    },
    context_refs: [
      {
        kind: "source_artifact",
        ref: exchange.result_ref,
        digest: exchange.result_digest ?? undefined,
      },
    ],
    stop: { reason: "human_boundary", resume: "none" },
  };
}

/** A consumed blocker owns the unchanged native postcondition until operator recovery. */
export async function currentCompletedBlockerBoundary(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
}): Promise<AgentActionPacket | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: await resolveCommandGitCommonDir(opts.command),
    task_id: opts.decision.task.id,
  });
  const raw = await createSupervisorEpisodeStore(journalPath).read();
  if (!raw) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(raw);
  const operation = journal.operations.at(-1);
  if (
    journal.status !== "running" ||
    journal.cursor.phase !== "ready" ||
    operation?.status !== "completed" ||
    !operation.work_order_ref
  )
    return null;
  const exchange = await readExternalAgentExchange(
    path.join(path.dirname(operation.work_order_ref), "exchange.json"),
  );
  if (
    exchange?.task_id !== opts.decision.task.id ||
    exchange.work_order_ref !== operation.work_order_ref ||
    !exchange.result ||
    exchange.result_digest !== externalAgentResultDigest(exchange.result) ||
    operation.result_digest !==
      digestSupervisorEpisodeValue({
        work_order_id: exchange.work_order_id,
        semantic_status: exchange.result.result.status,
        result_digest: exchange.result_digest,
      }) ||
    operation.postcondition_fingerprint_digest !== exchange.postcondition_fingerprint ||
    exchange.postcondition_fingerprint !== opts.decision.workflowStep.preconditionFingerprint.digest
  )
    return null;
  return completedBlockerBoundary({ ...opts, result_path: exchange.result_ref });
}
