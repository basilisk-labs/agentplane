import { readFile } from "node:fs/promises";
import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { evaluatorReturnFingerprint } from "./external-agent-evaluator-recovery.js";
import { externalAgentExchangeDigest } from "./external-agent-exchange.js";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { loadTaskFromContext } from "../shared/task-backend.js";
import { readCompletedReworkRecord } from "./kernel-completed-external-rework.js";
import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskComment } from "./comment.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import type * as ExternalAgent from "./external-agent-exchange.js";
import { hasChangedTaskArtifacts } from "./external-agent-implementation-finalization.js";

export async function applyExternalReadOnlyWorktreeObservation(opts: {
  command: CommandContext;
  exchange: ExternalAgent.ExternalAgentExchange;
  envelope: ExternalAgent.ExternalAgentResultEnvelope;
  work_order: AgentWorkOrderV2;
}): Promise<void> {
  const completed = await readCompletedReworkRecord({
    command: opts.command,
    task: await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id }),
    work_order: opts.work_order,
  });
  // The supervisor authenticates the issued read-only result and persists its
  // exchange and exactly-once receipt. Observation must not mutate a terminal
  // canonical task through the legacy comment/commit owners. A retry has no
  // repository effect and must still pass the unchanged fingerprint checks.
  if (completed) return;
  await cmdTaskComment({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    author: "SUPERVISOR",
    body:
      `Read-only worktree observation (${opts.envelope.result.status}): ` +
      opts.envelope.result.summary,
    quiet: true,
  });
  const status = await readDirectRepositoryStatus(opts.exchange.checkout);
  if (!hasChangedTaskArtifacts(status?.lines ?? [], opts.exchange.task_id)) return;
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record worktree observation`,
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) throw new Error(`External worktree observation commit exited ${exitCode}.`);
}

export async function assertReadOnlyReturnFresh(opts: {
  exchange: ExternalAgent.ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  decision: TaskRouteDecision;
}): Promise<void> {
  if (
    opts.decision.workflowStep.preconditionFingerprint.digest !==
    evaluatorReturnFingerprint({
      exchange: opts.exchange,
      work_order: opts.work_order,
    })
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result is stale; request a fresh action packet.",
    });
  }
  if (opts.exchange.purpose === "quality_review") {
    const frozen = opts.work_order.required_inputs.find(
      (input) => input.id === "evaluator-work-order",
    );
    if (
      !opts.exchange.evaluator_work_order_ref ||
      externalAgentExchangeDigest(
        await readFile(opts.exchange.evaluator_work_order_ref, "utf8"),
      ) !== frozen?.digest
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "Frozen evaluator work order changed after issuance.",
      });
    }
  }
}
