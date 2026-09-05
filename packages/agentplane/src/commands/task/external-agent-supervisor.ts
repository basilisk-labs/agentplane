import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  validateAgentWorkOrderV2,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { createEvaluatorArtifactPreparationPort } from "../evaluator/evaluator-artifact-port.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import {
  loadCommandContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";

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
} from "./external-agent-exchange.js";
import {
  assertExternalAgentExchangeIdentity,
  assertExternalAgentSupervisorIntent,
  finalizeCompletedExternalAgentExchange,
} from "./external-agent-exchange-authority.js";
import { usesExternalImplementationAuthority } from "./external-agent-purpose.js";
import {
  bindPreparedEvaluatorState,
  evaluatorReturnFingerprint,
  isRecoverableAppliedEvaluatorResult,
} from "./external-agent-evaluator-recovery.js";
import {
  applyAcceptedExternalAgentResult,
  isExternalAgentResultAlreadyApplied,
} from "./external-agent-result-application.js";
import { superviseExternalAgentIssuance } from "./external-agent-supervisor-recovery.js";
import { recordIssuedExternalAgentEpisode } from "./external-agent-supervisor-episode.js";
import { assertExternalPlanningResultApplicable } from "./external-agent-planning-authority.js";
import {
  externalAgentResultIdentity,
  refreshExternalAgentRoute,
} from "./external-agent-result-routing.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";

export type IssuedExternalAgentExchange = {
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
};

function semanticPurpose(decision: TaskRouteDecision): ExternalAgentExchange["purpose"] | null {
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

async function commandContextForCheckout(opts: {
  command: CommandContext;
  checkout: string;
}): Promise<CommandContext> {
  return path.resolve(opts.checkout) === path.resolve(opts.command.resolvedProject.gitRoot)
    ? opts.command
    : await loadCommandContext({ cwd: opts.checkout, rootOverride: null });
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

async function issueExternalAgentExchangeUnlocked(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  replace_failed_operation: boolean;
  transition_identity: string | null;
}): Promise<IssuedExternalAgentExchange | null> {
  const step = opts.decision.workflowStep;
  const purpose = semanticPurpose(opts.decision);
  if (!purpose) return null;
  const transitionId = agentTransitionId(
    step.id,
    step.preconditionFingerprint.digest,
    opts.transition_identity ?? undefined,
  );
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const paths = await resolveExternalAgentExchangePaths({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
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
    const checkoutCommand = await commandContextForCheckout({ command: opts.command, checkout });
    await recordIssuedExternalAgentEpisode({
      command: checkoutCommand,
      decision: opts.decision,
      work_order: workOrder,
      work_order_ref: paths.work_order,
      purpose,
      issue_digest: externalAgentIssueDigest({ exchange: existing, work_order: workOrder }),
      replace_failed_operation: opts.replace_failed_operation,
    });
    const issuedExchange: ExternalAgentExchange =
      existing.status === "prepared"
        ? { ...existing, status: "issued", updated_at: new Date().toISOString() }
        : existing;
    if (issuedExchange !== existing) {
      await writeExternalAgentExchange(paths.exchange, issuedExchange);
    }
    return {
      exchange: issuedExchange,
      paths,
      work_order: workOrder,
    };
  }
  const checkoutCommand = await commandContextForCheckout({ command: opts.command, checkout });
  let workOrder = opts.work_order;
  let evaluatorWorkOrderRef: string | null = null;
  if (purpose === "quality_review") {
    const prepared = await prepareEvaluatorInput({
      ctx: { cwd: checkout },
      command: checkoutCommand,
      task_id: opts.decision.task.id,
      work_order: workOrder,
    });
    workOrder = bindPreparedEvaluatorState({
      work_order: prepared.work_order,
      before: opts.decision,
      after: await refreshExternalAgentRoute({
        cwd: checkout,
        task_id: opts.decision.task.id,
        include_remote: opts.decision.prFlow?.pr.source === "lookup",
      }),
    });
    evaluatorWorkOrderRef = prepared.evaluator_work_order_ref;
  }
  const [head, status] = await Promise.all([
    readDirectTaskHead(checkout),
    readDirectRepositoryStatus(checkout),
  ]);
  const at = new Date().toISOString();
  const preparedExchange: ExternalAgentExchange = {
    schema_version: 1,
    kind: "external_agent_exchange",
    issue_digest_version: 2,
    status: "prepared",
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
    baseline: {
      head,
      changed_paths: status?.lines ?? [],
      ...(workOrder.authority.sandbox === "workspace-write"
        ? { task_artifacts: await captureExternalTaskArtifacts(checkout, workOrder.task.id) }
        : {}),
    },
    result_digest: null,
    result: null,
    postcondition_fingerprint: null,
    created_at: at,
    updated_at: at,
  };
  await persistExternalAgentExchangeArtifacts({
    paths,
    work_order: workOrder,
    exchange: preparedExchange,
  });
  await recordIssuedExternalAgentEpisode({
    command: checkoutCommand,
    decision: opts.decision,
    work_order: workOrder,
    work_order_ref: paths.work_order,
    purpose,
    issue_digest: externalAgentIssueDigest({ exchange: preparedExchange, work_order: workOrder }),
    replace_failed_operation: opts.replace_failed_operation,
  });
  const exchange: ExternalAgentExchange = {
    ...preparedExchange,
    status: "issued",
    updated_at: new Date().toISOString(),
  };
  await writeExternalAgentExchange(paths.exchange, exchange);
  return { exchange, paths, work_order: workOrder };
}

export async function issueExternalAgentExchange(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  replace_failed_operation: boolean;
}): Promise<IssuedExternalAgentExchange | null> {
  const purpose = semanticPurpose(opts.decision);
  if (!purpose) return null;
  return await superviseExternalAgentIssuance({
    command: opts.command,
    decision: opts.decision,
    work_order: opts.work_order,
    purpose,
    issue: async (transitionIdentity) =>
      await issueExternalAgentExchangeUnlocked({
        ...opts,
        transition_identity: transitionIdentity,
      }),
  });
}

async function assertReadOnlyReturnFresh(opts: {
  exchange: ExternalAgentExchange;
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
      digestText(await readFile(opts.exchange.evaluator_work_order_ref, "utf8")) !== frozen?.digest
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "Frozen evaluator work order changed after issuance.",
      });
    }
  }
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
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const paths = await resolveExternalAgentExchangePaths({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
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
  if (initial.status === "retired") {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "This external-agent exchange was retired after state drift; discard its result and request the current task route.",
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
    common_git_dir: commonGitDir,
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
    const envelope = validateExternalAgentResultEnvelope({ raw, exchange, work_order: workOrder });
    const resultDigest = externalAgentResultDigest(envelope);
    if (exchange.status === "consumed") {
      if (exchange.result_digest !== resultDigest) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "A different result is already recorded for this external-agent exchange.",
        });
      }
      return await refreshExternalAgentRoute({
        cwd: exchange.checkout,
        task_id: opts.task_id,
        include_remote: opts.include_remote,
      });
    }
    const store = createSupervisorEpisodeStore(journalPath);
    const intent = assertExternalAgentSupervisorIntent({
      journal: await store.read(),
      exchange,
      paths,
      work_order: workOrder,
      task_id: opts.task_id,
      state_fingerprint: identity.state_fingerprint,
    });
    if (
      (exchange.status === "result_received" || exchange.status === "accepted") &&
      exchange.result_digest !== resultDigest
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "A different result is already recorded for this external-agent exchange.",
      });
    }
    if (
      intent.state === "issued_effect_in_doubt" &&
      !(await store.compareAndSwap(intent.persisted_journal_digest, intent.journal))
    ) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while reconciling the observed effect.",
      });
    }
    const { journal: issuedJournal, operation } = intent;
    const checkoutCommand = await loadCommandContext({
      cwd: exchange.checkout,
      rootOverride: null,
    });
    if (exchange.purpose === "planning") {
      await assertExternalPlanningResultApplicable({
        command: checkoutCommand,
        exchange,
        envelope,
        work_order: workOrder,
      });
    }
    if (exchange.status === "issued") {
      exchange = {
        ...exchange,
        status: "result_received",
        result_digest: resultDigest,
        result: envelope,
        updated_at: new Date().toISOString(),
      };
      await writeExternalAgentExchange(paths.exchange, exchange);
    }
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
      (exchange.status === "result_received" || exchange.status === "accepted") &&
      (await isExternalAgentResultAlreadyApplied({
        command: checkoutCommand,
        exchange,
        decision: current,
        envelope,
      }));
    if (
      alreadyApplied &&
      exchange.purpose === "quality_review" &&
      !(await isRecoverableAppliedEvaluatorResult({
        command: checkoutCommand,
        exchange,
        work_order: workOrder,
        decision: current,
      }))
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message:
          "The applied evaluator result is stale after additional state drift; request a fresh action packet.",
      });
    }
    if (
      !alreadyApplied &&
      !usesExternalImplementationAuthority(exchange.purpose, workOrder.authority.sandbox)
    ) {
      await assertReadOnlyReturnFresh({ exchange, work_order: workOrder, decision: current });
    }
    if (!(alreadyApplied && exchange.purpose === "planning")) {
      await applyAcceptedExternalAgentResult({
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
