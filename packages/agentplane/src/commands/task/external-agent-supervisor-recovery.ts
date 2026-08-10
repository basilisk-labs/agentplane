import { access } from "node:fs/promises";
import path from "node:path";

import {
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

import {
  externalAgentIssueDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  writeExternalAgentExchange,
  writeExternalAgentResult,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

export type RecoverableExternalAgentExchange = {
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
};

export function exchangePathsFromWorkOrderRef(workOrderRef: string): ExternalAgentExchangePaths {
  const directory = path.dirname(workOrderRef);
  return {
    directory,
    exchange: path.join(directory, "exchange.json"),
    work_order: workOrderRef,
    result_schema: path.join(directory, "result-schema.json"),
    semantic_result_schema: path.join(directory, "semantic-result.schema.json"),
    result: path.join(directory, "result.json"),
  };
}

export async function unresolvedExternalAgentExchange(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  purpose: ExternalAgentExchange["purpose"];
  common_git_dir: string;
}): Promise<RecoverableExternalAgentExchange | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: opts.common_git_dir,
    task_id: opts.decision.task.id,
  });
  const rawJournal = await createSupervisorEpisodeStore(journalPath).read();
  if (!rawJournal) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
  const operation = journal.operations.at(-1);
  const unresolved =
    operation?.status === "intent" &&
    ((journal.cursor.phase === "intent_recorded" &&
      journal.cursor.operation_key === operation.operation_key) ||
      (journal.status === "stopped" &&
        journal.stop?.reason === "effect_in_doubt" &&
        journal.stop.operation_key === operation.operation_key));
  if (!unresolved || !operation.work_order_ref) return null;

  const paths = exchangePathsFromWorkOrderRef(operation.work_order_ref);
  const exchange = await readExternalAgentExchange(paths.exchange);
  if (!exchange) {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "The unresolved external-agent supervisor intent has no exchange artifacts; recover the recorded intent before requesting a new packet.",
      context: { task_id: opts.decision.task.id, work_order_ref: operation.work_order_ref },
    });
  }
  const workOrder = await readExternalAgentWorkOrder(paths.work_order);
  const checkout =
    opts.decision.executionPacket.mustRunFrom ?? opts.command.resolvedProject.gitRoot;
  const matchesCurrentBoundary =
    exchange.task_id === opts.decision.task.id &&
    exchange.state_fingerprint === opts.decision.workflowStep.preconditionFingerprint.digest &&
    exchange.work_order_id === opts.work_order.work_order_id &&
    exchange.role === opts.work_order.role &&
    exchange.purpose === opts.purpose &&
    path.resolve(exchange.checkout) === path.resolve(checkout) &&
    operation.effect_ref ===
      `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: workOrder })}`;
  if (!matchesCurrentBoundary) {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "A previous external-agent episode still owns this task; AgentPlane kept its original result path and did not create a fresh packet.",
      context: {
        task_id: opts.decision.task.id,
        state_fingerprint: exchange.state_fingerprint,
        result_path: exchange.result_ref,
        resume_argv: [
          "agentplane",
          "task",
          "advance",
          opts.decision.task.id,
          "--result",
          exchange.result_ref,
          "--agent-json",
        ],
      },
    });
  }
  if (exchange.status === "consumed") {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "A consumed external-agent exchange is still bound to an unresolved supervisor intent.",
    });
  }
  const issuedExchange =
    exchange.status === "prepared"
      ? { ...exchange, status: "issued" as const, updated_at: new Date().toISOString() }
      : exchange;
  if (issuedExchange !== exchange) {
    await writeExternalAgentExchange(paths.exchange, issuedExchange);
  }
  return { exchange: issuedExchange, paths, work_order: workOrder };
}

export async function externalAgentReplacementIdentity(opts: {
  command: CommandContext;
  task_id: string;
  common_git_dir: string;
}): Promise<string | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: opts.common_git_dir,
    task_id: opts.task_id,
  });
  const rawJournal = await createSupervisorEpisodeStore(journalPath).read();
  if (!rawJournal) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
  return journal.status === "running" && journal.cursor.phase === "ready"
    ? (journal.cursor.replacement_of_operation_key ?? null)
    : null;
}

export async function superviseExternalAgentIssuance(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  purpose: ExternalAgentExchange["purpose"];
  issue: (transitionIdentity: string | null) => Promise<RecoverableExternalAgentExchange | null>;
}): Promise<RecoverableExternalAgentExchange | null> {
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
    task_id: opts.decision.task.id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor is issuing or applying an external-agent exchange.",
    });
  }
  try {
    const unresolved = await unresolvedExternalAgentExchange({
      command: opts.command,
      decision: opts.decision,
      work_order: opts.work_order,
      purpose: opts.purpose,
      common_git_dir: commonGitDir,
    });
    const transitionIdentity = await externalAgentReplacementIdentity({
      command: opts.command,
      task_id: opts.decision.task.id,
      common_git_dir: commonGitDir,
    });
    return unresolved ?? (await opts.issue(transitionIdentity));
  } finally {
    await lease.release();
  }
}

export async function recoverPendingExternalAgentResult(opts: {
  command: CommandContext;
  task_id: string;
  accept_result: (input: { cwd: string; result_path: string }) => Promise<TaskRouteDecision>;
}): Promise<TaskRouteDecision | null> {
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
    task_id: opts.task_id,
  });
  const rawJournal = await createSupervisorEpisodeStore(journalPath).read();
  if (!rawJournal) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
  const operation = journal.operations.at(-1);
  if (
    !operation?.work_order_ref ||
    (operation.status !== "intent" && operation.status !== "completed")
  ) {
    return null;
  }
  const paths = exchangePathsFromWorkOrderRef(operation.work_order_ref);
  const exchange = await readExternalAgentExchange(paths.exchange);
  if (exchange?.task_id !== opts.task_id || exchange.status === "consumed") return null;

  if (exchange.status === "result_received" || exchange.status === "accepted") {
    if (!exchange.result || !exchange.result_digest) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "The received external-agent result is missing its durable recovery payload.",
      });
    }
    try {
      await access(exchange.result_ref);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
      await writeExternalAgentResult(exchange.result_ref, exchange.result);
    }
  } else if (exchange.status === "issued") {
    try {
      await access(exchange.result_ref);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
      throw error;
    }
  } else {
    return null;
  }

  return await opts.accept_result({ cwd: exchange.checkout, result_path: exchange.result_ref });
}
