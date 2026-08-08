import {
  advanceSupervisorExecutionEpisodeState,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  reopenCompletedSupervisorExecutionEpisodeAfterStaleState,
  startSupervisorExecutionEpisode,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

import type { ExternalAgentExchange } from "./external-agent-exchange.js";

export async function recordIssuedExternalAgentEpisode(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  work_order_ref: string;
  purpose: ExternalAgentExchange["purpose"];
  issue_digest: string;
  replace_failed_operation: boolean;
}): Promise<void> {
  const effectRef = `external-agent-issue:${opts.issue_digest}`;
  const fingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const opened = await openSupervisorExecutionEpisode({
      git_root: opts.command.resolvedProject.gitRoot,
      common_git_dir: await resolveCommandGitCommonDir(opts.command),
      task_id: opts.decision.task.id,
      task_revision: opts.work_order.task.revision,
      state_fingerprint_digest: fingerprint,
      recover_intent: false,
    });
    let journal = opened.journal;
    let replacementAuthorized = false;
    if (journal.status === "stopped" && journal.stop?.reason === "operation_failed") {
      if (!opts.replace_failed_operation) {
        throw new CliError({
          code: "E_RUNTIME",
          message:
            "External-agent supervisor is stopped (operation_failed); inspect the failed operation, then rerun task advance with --replacement to start a distinct exact-key successor.",
        });
      }
      const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
        journal,
        state_fingerprint_digest: fingerprint,
      });
      if (!(await opened.store.compareAndSwap(journal.digest, replacement))) continue;
      journal = replacement;
      replacementAuthorized = true;
    }
    if (journal.status === "stopped" && journal.stop?.reason === "stale_state") {
      const reopened = reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
        journal,
        state_fingerprint_digest: fingerprint,
      });
      if (!(await opened.store.compareAndSwap(journal.digest, reopened))) continue;
      journal = reopened;
    }
    if (journal.status === "stopped") {
      throw new CliError({
        code: "E_RUNTIME",
        message: `External-agent supervisor is stopped (${journal.stop?.reason ?? "unknown"}).`,
      });
    }
    if (opts.replace_failed_operation && !replacementAuthorized) {
      const latest = journal.operations.at(-1);
      const isIdempotentReplacement =
        journal.cursor.phase === "intent_recorded" &&
        latest?.status === "intent" &&
        typeof latest.replacement_of_operation_key === "string";
      if (!isIdempotentReplacement) {
        throw new CliError({
          code: "E_USAGE",
          message: "task advance --replacement requires a terminal failed operation.",
        });
      }
    }
    if (journal.cursor.phase === "completed") {
      const advanced = advanceSupervisorExecutionEpisodeState({
        journal,
        state_fingerprint_digest: fingerprint,
        route_observation: { step_id: opts.decision.workflowStep.id, surface: "task advance" },
      });
      if (!(await opened.store.compareAndSwap(journal.digest, advanced))) continue;
      journal = advanced;
    }
    if (journal.cursor.phase === "intent_recorded") {
      const latest = journal.operations.at(-1);
      if (
        latest?.status === "intent" &&
        latest.precondition_fingerprint_digest === fingerprint &&
        latest.work_order_ref === opts.work_order_ref &&
        latest.role === opts.work_order.role &&
        latest.effect_ref === effectRef
      ) {
        return;
      }
      throw new CliError({
        code: "E_RUNTIME",
        message: "Another unresolved external-agent episode already owns this task.",
      });
    }
    if (journal.cursor.phase !== "ready") {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor is not ready to issue a semantic work order.",
      });
    }
    const started = startSupervisorExecutionEpisode({
      journal,
      role: opts.work_order.role,
      kind: opts.purpose === "quality_review" ? "evaluator_episode" : "agent_episode",
      operation_identity: {
        workflow_step_id: opts.decision.workflowStep.id,
        purpose: opts.purpose,
        task_id: opts.decision.task.id,
      },
      precondition_fingerprint_digest: fingerprint,
      authority_ref: `external-agent:${opts.decision.task.id}:${opts.decision.workflowStep.id}`,
      authority_digest: fingerprint,
      work_order_ref: opts.work_order_ref,
      effect_ref: effectRef,
      ...(journal.cursor.replacement_of_operation_key
        ? { replacement_of_operation_key: journal.cursor.replacement_of_operation_key }
        : {}),
    });
    if (started.status === "stopped" && started.stop.reason === "stale_state") {
      const reopened = reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
        journal: started.journal,
        state_fingerprint_digest: fingerprint,
      });
      await opened.store.compareAndSwap(journal.digest, reopened);
      continue;
    }
    if (started.status !== "started") {
      await opened.store.write(started.journal);
      throw new CliError({
        code: "E_RUNTIME",
        message: `External-agent episode could not start (${started.status}).`,
      });
    }
    if (await opened.store.compareAndSwap(journal.digest, started.journal)) return;
  }
  throw new CliError({
    code: "E_RUNTIME",
    message: "External-agent supervisor changed concurrently while issuing the work order.",
  });
}
