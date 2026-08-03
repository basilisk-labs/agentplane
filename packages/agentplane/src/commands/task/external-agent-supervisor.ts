import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  validateAgentWorkOrderV2,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { createEvaluatorArtifactPreparationPort } from "../evaluator/evaluator-artifact-port.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  openSupervisorExecutionEpisode,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { agentTransitionId } from "./agent-action-packet.js";
import {
  externalAgentIssueDigest,
  externalAgentResultDigest,
  persistExternalAgentExchangeArtifacts,
  readExternalAgentExchange,
  readExternalAgentResult,
  readExternalAgentWorkOrder,
  resolveExternalAgentExchangePaths,
  validateExternalAgentResultEnvelope,
  writeExternalAgentExchange,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
  type ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import {
  assertExternalAgentExchangeIdentity,
  assertExternalAgentSupervisorIntent,
  finalizeCompletedExternalAgentExchange,
} from "./external-agent-exchange-authority.js";
import {
  applyExternalEvaluatorResult,
  isExternalEvaluatorResultApplied,
} from "./external-agent-evaluator.js";
import { applyExternalImplementationResult } from "./external-agent-implementation-authority.js";
import {
  externalAgentResultIdentity,
  refreshExternalAgentRoute,
} from "./external-agent-result-routing.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { cmdTaskComment } from "./comment.js";
import { setTaskPlan } from "./plan.js";

type ExternalSemanticPurpose = Extract<
  TaskRouteDecision["workflowStep"],
  { kind: "agent_episode" }
>["episode"]["purpose"];

export type IssuedExternalAgentExchange = {
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
};

function semanticPurpose(decision: TaskRouteDecision): ExternalSemanticPurpose | null {
  const step = decision.workflowStep;
  if (step.kind === "agent_episode") return step.episode.purpose;
  if (
    step.kind === "cli_operation" &&
    step.operation.id === "runner.follow" &&
    step.operation.params.mode === "run"
  ) {
    return "implementation";
  }
  return null;
}

function digestText(value: string): string {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function evaluatorInput(opts: {
  work_order: AgentWorkOrderV2;
  git_root: string;
  work_order_path: string;
  digest: string;
}): AgentWorkOrderV2 {
  const relative = path.relative(opts.git_root, opts.work_order_path).replaceAll("\\", "/");
  return validateAgentWorkOrderV2({
    ...opts.work_order,
    required_inputs: [
      ...opts.work_order.required_inputs,
      {
        id: "evaluator-work-order",
        kind: "source_artifact",
        description: "Frozen evaluator diff, checks, policy, and acceptance evidence.",
        path: relative,
        digest: opts.digest,
        required: true,
      },
    ],
  });
}

async function prepareEvaluatorInput(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  work_order: AgentWorkOrderV2;
}): Promise<{ work_order: AgentWorkOrderV2; evaluator_work_order_ref: string }> {
  const packet = await createEvaluatorArtifactPreparationPort(opts.command).prepare({
    ctx: opts.ctx,
    taskId: opts.task_id,
    evaluatorId: "recovery-context",
    provenance: "evaluator_supplied",
  });
  const prepared = packet.prepared;
  const serialized = await readFile(prepared.work_order_path, "utf8");
  return {
    work_order: evaluatorInput({
      work_order: opts.work_order,
      git_root: packet.git_root,
      work_order_path: prepared.work_order_path,
      digest: digestText(serialized),
    }),
    evaluator_work_order_ref: prepared.work_order_path,
  };
}

async function recordIssuedEpisode(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  work_order_ref: string;
  purpose: ExternalSemanticPurpose;
  issue_digest: string;
}): Promise<void> {
  const effectRef = `external-agent-issue:${opts.issue_digest}`;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const opened = await openSupervisorExecutionEpisode({
      git_root: opts.command.resolvedProject.gitRoot,
      task_id: opts.decision.task.id,
      task_revision: opts.work_order.task.revision,
      state_fingerprint_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
      recover_intent: false,
    });
    let journal = opened.journal;
    if (journal.status === "stopped") {
      throw new CliError({
        code: "E_RUNTIME",
        message: `External-agent supervisor is stopped (${journal.stop?.reason ?? "unknown"}).`,
      });
    }
    if (journal.cursor.phase === "completed") {
      const advanced = advanceSupervisorExecutionEpisodeState({
        journal,
        state_fingerprint_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
        route_observation: { step_id: opts.decision.workflowStep.id, surface: "task advance" },
      });
      if (!(await opened.store.compareAndSwap(journal.digest, advanced))) continue;
      journal = advanced;
    }
    if (journal.cursor.phase === "intent_recorded") {
      const latest = journal.operations.at(-1);
      if (
        latest?.status === "intent" &&
        latest.precondition_fingerprint_digest ===
          opts.decision.workflowStep.preconditionFingerprint.digest &&
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
      precondition_fingerprint_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
      authority_ref: `external-agent:${opts.decision.task.id}:${opts.decision.workflowStep.id}`,
      authority_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
      work_order_ref: opts.work_order_ref,
      effect_ref: effectRef,
    });
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

export async function issueExternalAgentExchange(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
}): Promise<IssuedExternalAgentExchange | null> {
  const step = opts.decision.workflowStep;
  const purpose = semanticPurpose(opts.decision);
  if (!purpose) return null;
  const transitionId = agentTransitionId(step.id);
  const paths = await resolveExternalAgentExchangePaths({
    git_root: opts.command.resolvedProject.gitRoot,
    task_id: opts.decision.task.id,
    transition_id: transitionId,
    state_fingerprint: step.preconditionFingerprint.digest,
  });
  const existing = await readExternalAgentExchange(paths.exchange);
  const checkout =
    opts.decision.executionPacket.mustRunFrom ?? opts.command.resolvedProject.gitRoot;
  if (existing) {
    const workOrder = await readExternalAgentWorkOrder(paths.work_order);
    assertExternalAgentExchangeIdentity({
      exchange: existing,
      paths,
      task_id: opts.decision.task.id,
      transition_id: transitionId,
      state_fingerprint: step.preconditionFingerprint.digest,
      work_order_id: opts.work_order.work_order_id,
      role: workOrder.role,
      purpose,
      checkout,
    });
    const checkoutCommand = await loadCommandContext({ cwd: checkout, rootOverride: null });
    await recordIssuedEpisode({
      command: checkoutCommand,
      decision: opts.decision,
      work_order: workOrder,
      work_order_ref: paths.work_order,
      purpose,
      issue_digest: externalAgentIssueDigest({ exchange: existing, work_order: workOrder }),
    });
    return {
      exchange: existing,
      paths,
      work_order: workOrder,
    };
  }
  const checkoutCommand = await loadCommandContext({ cwd: checkout, rootOverride: null });
  let workOrder = opts.work_order;
  let evaluatorWorkOrderRef: string | null = null;
  if (purpose === "quality_review") {
    const prepared = await prepareEvaluatorInput({
      ctx: { cwd: checkout },
      command: checkoutCommand,
      task_id: opts.decision.task.id,
      work_order: workOrder,
    });
    workOrder = prepared.work_order;
    evaluatorWorkOrderRef = prepared.evaluator_work_order_ref;
  }
  const [head, status] = await Promise.all([
    readDirectTaskHead(checkout),
    readDirectRepositoryStatus(checkout),
  ]);
  const at = new Date().toISOString();
  const exchange: ExternalAgentExchange = {
    schema_version: 1,
    kind: "external_agent_exchange",
    status: "issued",
    task_id: opts.decision.task.id,
    transition_id: transitionId,
    state_fingerprint: step.preconditionFingerprint.digest,
    role: workOrder.role,
    purpose,
    checkout,
    work_order_id: workOrder.work_order_id,
    work_order_ref: paths.work_order,
    result_schema_ref: paths.result_schema,
    result_ref: paths.result,
    evaluator_work_order_ref: evaluatorWorkOrderRef,
    baseline: { head, changed_paths: status?.lines ?? [] },
    result_digest: null,
    result: null,
    postcondition_fingerprint: null,
    created_at: at,
    updated_at: at,
  };
  await persistExternalAgentExchangeArtifacts({ paths, work_order: workOrder, exchange });
  await recordIssuedEpisode({
    command: checkoutCommand,
    decision: opts.decision,
    work_order: workOrder,
    work_order_ref: paths.work_order,
    purpose,
    issue_digest: externalAgentIssueDigest({ exchange, work_order: workOrder }),
  });
  return { exchange, paths, work_order: workOrder };
}

async function applyAcceptedResult(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  if (opts.exchange.purpose === "planning") {
    if (opts.envelope.result.status !== "completed") {
      await cmdTaskComment({
        ctx: opts.command,
        cwd: opts.exchange.checkout,
        taskId: opts.exchange.task_id,
        author: "PLANNER",
        body: `Planning returned ${opts.envelope.result.status}: ${opts.envelope.result.summary}`,
        quiet: true,
      });
      return;
    }
    await setTaskPlan({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      text: opts.envelope.result.summary,
      updatedBy: "PLANNER",
    });
    return;
  }
  if (
    opts.exchange.purpose === "implementation" ||
    opts.exchange.purpose === "implementation_rework"
  ) {
    await applyExternalImplementationResult(opts);
    return;
  }
  if (opts.exchange.purpose === "quality_review") {
    await applyExternalEvaluatorResult({
      command: opts.command,
      exchange: opts.exchange,
      semantic: opts.envelope.result,
    });
    return;
  }
  throw new CliError({
    code: "E_VALIDATION",
    message: `External semantic result cannot apply unsupported purpose ${opts.exchange.purpose}.`,
  });
}

function assertReadOnlyReturnFresh(opts: {
  exchange: ExternalAgentExchange;
  decision: TaskRouteDecision;
}): void {
  if (
    opts.decision.workflowStep.preconditionFingerprint.digest !== opts.exchange.state_fingerprint ||
    agentTransitionId(opts.decision.workflowStep.id) !== opts.exchange.transition_id
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result is stale; request a fresh action packet.",
    });
  }
}

async function isReadOnlyResultAlreadyApplied(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  decision: TaskRouteDecision;
}): Promise<boolean> {
  if (opts.exchange.purpose === "planning") {
    return (
      opts.decision.workflowStep.kind === "approval" &&
      opts.decision.workflowStep.request.type === "plan_approval"
    );
  }
  if (opts.exchange.purpose === "quality_review") {
    return await isExternalEvaluatorResultApplied({
      command: opts.command,
      exchange: opts.exchange,
    });
  }
  return false;
}

export async function acceptExternalAgentResult(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  result_path: string;
  include_remote: boolean;
}): Promise<TaskRouteDecision> {
  const raw = await readExternalAgentResult(path.resolve(opts.ctx.cwd, opts.result_path));
  const identity = externalAgentResultIdentity(raw);
  if (identity.task_id !== opts.task_id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Result task_id does not match command task id.",
    });
  }
  const paths = await resolveExternalAgentExchangePaths({
    git_root: opts.command.resolvedProject.gitRoot,
    task_id: identity.task_id,
    transition_id: identity.transition_id,
    state_fingerprint: identity.state_fingerprint,
  });
  const initial = await readExternalAgentExchange(paths.exchange);
  if (!initial) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "No issued external-agent exchange matches this result.",
    });
  }
  if (path.resolve(opts.ctx.cwd, opts.result_path) !== path.resolve(paths.result)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result must be returned through the issued result_ref.",
    });
  }
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    task_id: opts.task_id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor is applying this external result.",
    });
  }
  try {
    let exchange = (await readExternalAgentExchange(paths.exchange)) ?? initial;
    const workOrder = await readExternalAgentWorkOrder(paths.work_order);
    const store = createSupervisorEpisodeStore(journalPath);
    const intent = assertExternalAgentSupervisorIntent({
      journal: await store.read(),
      exchange,
      paths,
      work_order: workOrder,
      task_id: opts.task_id,
      state_fingerprint: identity.state_fingerprint,
    });
    const { journal: issuedJournal, operation } = intent;
    const envelope = validateExternalAgentResultEnvelope({ raw, exchange, work_order: workOrder });
    const resultDigest = externalAgentResultDigest(envelope);
    if (exchange.status === "accepted" && exchange.result_digest !== resultDigest) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "A different result is already accepted for this external-agent exchange.",
      });
    }
    if (exchange.status === "issued") {
      exchange = {
        ...exchange,
        status: "accepted",
        result_digest: resultDigest,
        result: envelope,
        updated_at: new Date().toISOString(),
      };
      await writeExternalAgentExchange(paths.exchange, exchange);
    }
    const checkoutCommand = await loadCommandContext({
      cwd: exchange.checkout,
      rootOverride: null,
    });
    const current = await refreshExternalAgentRoute({
      cwd: exchange.checkout,
      task_id: opts.task_id,
      include_remote: opts.include_remote,
    });
    if (
      await finalizeCompletedExternalAgentExchange({
        intent,
        store,
        exchange,
        paths,
        postcondition: current.workflowStep.preconditionFingerprint,
        postcondition_fingerprint: current.workflowStep.preconditionFingerprint.digest,
        route_step_id: current.workflowStep.id,
        work_order_id: exchange.work_order_id,
        semantic_status: envelope.result.status,
        result_digest: resultDigest,
      })
    ) {
      return current;
    }
    const alreadyApplied =
      exchange.status === "accepted" &&
      (await isReadOnlyResultAlreadyApplied({
        command: checkoutCommand,
        exchange,
        decision: current,
      }));
    if (
      !alreadyApplied &&
      exchange.purpose !== "implementation" &&
      exchange.purpose !== "implementation_rework"
    ) {
      assertReadOnlyReturnFresh({ exchange, decision: current });
    }
    if (!(alreadyApplied && exchange.purpose === "planning")) {
      await applyAcceptedResult({
        command: checkoutCommand,
        decision: current,
        exchange,
        work_order: workOrder,
        envelope,
      });
    }
    const after = await refreshExternalAgentRoute({
      cwd: exchange.checkout,
      task_id: opts.task_id,
      include_remote: opts.include_remote,
    });
    let journal = completeSupervisorExecutionEpisode({
      journal: issuedJournal,
      operation_key: operation.operation_key,
      result: {
        work_order_id: exchange.work_order_id,
        semantic_status: envelope.result.status,
        result_digest: resultDigest,
      },
      progress: after.workflowStep.preconditionFingerprint,
    });
    if (!(await store.compareAndSwap(issuedJournal.digest, journal))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while completing the semantic operation.",
      });
    }
    if (
      (journal.status === "running" && journal.cursor.phase === "completed") ||
      (journal.status === "stopped" &&
        journal.stop?.reason === "budget_exhausted" &&
        journal.cursor.phase === "stopped")
    ) {
      const completedDigest = journal.digest;
      journal = advanceSupervisorExecutionEpisodeState({
        journal,
        state_fingerprint_digest: after.workflowStep.preconditionFingerprint.digest,
        route_observation: { step_id: after.workflowStep.id, surface: "task advance result" },
      });
      if (!(await store.compareAndSwap(completedDigest, journal))) {
        throw new CliError({
          code: "E_RUNTIME",
          message: "External-agent supervisor changed while advancing the semantic operation.",
        });
      }
    }
    exchange = {
      ...exchange,
      status: "consumed",
      postcondition_fingerprint: after.workflowStep.preconditionFingerprint.digest,
      updated_at: new Date().toISOString(),
    };
    await writeExternalAgentExchange(paths.exchange, exchange);
    return after;
  } finally {
    await lease.release();
  }
}
