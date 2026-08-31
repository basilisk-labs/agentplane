import {
  applyExternalPlanRefinement,
  isExternalPlanRefinementApplied,
} from "./external-agent-plan-refinement.js";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";

import {
  type ExternalAgentExchange,
  type ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import {
  applyExternalEvaluatorResult,
  isExternalEvaluatorResultApplied,
} from "./external-agent-evaluator.js";
import {
  applyExternalImplementationResult,
  applyExternalReadOnlyWorktreeObservation,
} from "./external-agent-implementation-authority.js";
import {
  applyExternalPlanningResult,
  isExternalPlanningResultApplied,
} from "./external-agent-planning-authority.js";
import { usesExternalImplementationAuthority } from "./external-agent-purpose.js";
import {
  applyExternalVerificationResult,
  isExternalVerificationResultApplied,
} from "./external-agent-verification-result.js";

export async function applyAcceptedExternalAgentResult(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  if (opts.exchange.purpose === "planning") {
    await applyExternalPlanningResult({
      command: opts.command,
      exchange: opts.exchange,
      envelope: opts.envelope,
      work_order: opts.work_order,
    });
    return;
  }
  if (
    usesExternalImplementationAuthority(opts.exchange.purpose, opts.work_order.authority.sandbox)
  ) {
    if (await applyExternalPlanRefinement(opts)) return;
    await applyExternalImplementationResult(opts);
    return;
  }
  if (opts.exchange.purpose === "task_worktree_resolution") {
    await applyExternalReadOnlyWorktreeObservation({
      command: opts.command,
      exchange: opts.exchange,
      envelope: opts.envelope,
    });
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
  if (opts.exchange.purpose === "verification") {
    await applyExternalVerificationResult({
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

export async function isExternalAgentResultAlreadyApplied(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  decision: TaskRouteDecision;
  envelope: ExternalAgentResultEnvelope;
}): Promise<boolean> {
  if (
    usesExternalImplementationAuthority(opts.exchange.purpose, "workspace-write") &&
    opts.envelope.result.plan_refinement
  ) {
    return isExternalPlanRefinementApplied(opts);
  }
  if (opts.exchange.purpose === "planning") {
    return await isExternalPlanningResultApplied({
      command: opts.command,
      exchange: opts.exchange,
      decision: opts.decision,
      envelope: opts.envelope,
    });
  }
  if (opts.exchange.purpose === "quality_review") {
    return await isExternalEvaluatorResultApplied({
      command: opts.command,
      exchange: opts.exchange,
    });
  }
  if (opts.exchange.purpose === "verification") {
    return await isExternalVerificationResultApplied({
      command: opts.command,
      exchange: opts.exchange,
      semantic: opts.envelope.result,
    });
  }
  return false;
}
