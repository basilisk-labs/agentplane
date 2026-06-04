import type { TaskRouteDecision } from "./route-decision-types.js";

export type RouteOperatorGuidance = {
  schemaVersion: 1;
  canExecuteNow: boolean;
  shouldRunNextCommand: boolean;
  operatorAction: "run_exact_argv" | "provider_action" | "wait" | "stop";
  safeCommand: string | null;
  diagnosticCommand: string | null;
  sourceOfTruth: RouteSourceOfTruth;
  freshness: RouteFreshnessContext;
  repeatPolicy: RouteRepeatPolicy;
  fallback: RouteFallbackContext;
  runnerContext: RouteRunnerContext;
  stopReason: string | null;
  afterCommand: string;
  staleStateCheck: string;
  risks: RouteOperatorRisk[];
};

export type RouteOperatorRisk = {
  code: "pr_artifact_freshness_loop" | "git_hook_side_effect" | "runner_rail_confusion";
  summary: string;
  mitigationCommand: string;
  stopCondition: string;
};

export type RouteSourceOfTruth = {
  route: "task_next_action";
  state: "local_task_backend";
  remote: "remote_provider" | "not_checked";
  diagnostic: "task_next_action" | "pr_check" | "provider" | "runner_status";
};

export type RouteFreshnessContext = {
  route: string;
  remote: string;
  staleStateCheck: string;
};

export type RouteRepeatPolicy = {
  allowed: boolean;
  maxAttemptsBeforeRecompute: number;
  recomputeCommand: string;
  stopCondition: string;
};

export type RouteFallbackContext = {
  allowed: boolean;
  command: string | null;
  reason: string | null;
};

export type RouteRunnerContext = {
  runnerIsRequired: boolean;
  runnerIsAllowedNow: boolean;
  localWorkAllowedIfRunnerFails: boolean;
  runnerFailureMeans:
    | "not_runner_route"
    | "inspect_runner_artifacts"
    | "runner_infrastructure_or_task_unknown";
  returnControlWhen: string;
};

function commandTouchesGitHooks(command: string | null): boolean {
  const normalized = command?.trim() ?? "";
  return (
    /\b(agentplane|ap)\s+(pr\s+(open|update)|integrate|finish)\b/.test(normalized) ||
    /\b(agentplane|ap)\s+task\s+commit\b/.test(normalized) ||
    /\bgit\s+commit\b/.test(normalized)
  );
}

function artifactFreshnessRisk(decision: TaskRouteDecision): RouteOperatorRisk | null {
  if (
    decision.nextAction.code !== "update_pr_artifacts" &&
    decision.nextAction.code !== "verify_or_update_pr"
  ) {
    return null;
  }
  return {
    code: "pr_artifact_freshness_loop",
    summary:
      "route state may be driven by stale local PR artifacts; do not repeat PR updates blindly after a passing PR check",
    mitigationCommand: `agentplane pr check ${decision.task.id}`,
    stopCondition:
      "if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation",
  };
}

function gitHookRisk(decision: TaskRouteDecision): RouteOperatorRisk | null {
  if (!commandTouchesGitHooks(decision.oracle.nextCommand)) return null;
  return {
    code: "git_hook_side_effect",
    summary:
      "the next command may run git hooks; a hook wrapper failure is infrastructure evidence, not automatically a code failure",
    mitigationCommand: "agentplane doctor",
    stopCondition:
      "if hooks fail after direct validation passed, preserve the distinction between hook wrapper failure and task verification failure",
  };
}

function runnerRisk(decision: TaskRouteDecision): RouteOperatorRisk | null {
  const command = decision.oracle.nextCommand ?? "";
  const runnerRoute =
    decision.nextAction.code === "wait_runner" ||
    (decision.blockers ?? []).some((blocker) => blocker.code === "runner_alive") ||
    /\b(agentplane|ap)\s+task\s+run\b/.test(command);
  if (!runnerRoute) return null;
  return {
    code: "runner_rail_confusion",
    summary:
      "runner state is a separate execution rail; do not infer local lifecycle authority from runner output alone",
    mitigationCommand: `agentplane task run status ${decision.task.id}`,
    stopCondition:
      "if runner status is running, failed, blocked, or ambiguous, inspect runner artifacts before local mutation or verification",
  };
}

function operatorActionFor(
  actionKind: TaskRouteDecision["executionPacket"]["actionKind"],
): RouteOperatorGuidance["operatorAction"] {
  if (actionKind === "local_command") return "run_exact_argv";
  if (actionKind === "provider_action") return "provider_action";
  if (actionKind === "wait") return "wait";
  return "stop";
}

function taskScopedCandidate(candidate: string | null, taskId: string): string | null {
  return candidate?.replaceAll("<task-id>", taskId) ?? null;
}

function deriveSourceOfTruth(
  decision: TaskRouteDecision,
  risks: readonly RouteOperatorRisk[],
): RouteSourceOfTruth {
  const remote = decision.sourceConfidence?.remote?.freshness === "remote_live";
  const hasRunnerRisk = risks.some((risk) => risk.code === "runner_rail_confusion");
  const hasPrRisk = risks.some((risk) => risk.code === "pr_artifact_freshness_loop");
  return {
    route: "task_next_action",
    state: "local_task_backend",
    remote: remote ? "remote_provider" : "not_checked",
    diagnostic: hasRunnerRisk
      ? "runner_status"
      : hasPrRisk
        ? "pr_check"
        : remote
          ? "provider"
          : "task_next_action",
  };
}

function deriveRunnerContext(decision: TaskRouteDecision): RouteRunnerContext {
  const command = decision.oracle.nextCommand ?? "";
  const runnerIsAllowedNow =
    decision.executionPacket.actionKind === "local_command" &&
    decision.executionPacket.safeToMutate &&
    /\b(agentplane|ap)\s+task\s+run\b/.test(command);
  const runnerIsRequired =
    runnerIsAllowedNow ||
    decision.nextAction.code === "wait_runner" ||
    (decision.blockers ?? []).some((blocker) => blocker.code === "runner_alive");
  return {
    runnerIsRequired,
    runnerIsAllowedNow,
    localWorkAllowedIfRunnerFails: !runnerIsRequired && decision.executionPacket.safeToMutate,
    runnerFailureMeans: runnerIsRequired
      ? decision.nextAction.code === "wait_runner"
        ? "inspect_runner_artifacts"
        : "runner_infrastructure_or_task_unknown"
      : "not_runner_route",
    returnControlWhen: decision.executionPacket.returnControlWhen,
  };
}

export function deriveRouteOperatorGuidance(decision: TaskRouteDecision): RouteOperatorGuidance {
  const risks = [
    artifactFreshnessRisk(decision),
    gitHookRisk(decision),
    runnerRisk(decision),
  ].filter((risk): risk is RouteOperatorRisk => risk !== null);
  const artifactRisk = risks.find((risk) => risk.code === "pr_artifact_freshness_loop") ?? null;
  const hookRisk = risks.find((risk) => risk.code === "git_hook_side_effect") ?? null;
  const safeCommand = decision.executionPacket.exactArgv?.join(" ") ?? null;
  const canExecuteNow =
    decision.executionPacket.actionKind === "local_command" &&
    decision.executionPacket.safeToMutate &&
    safeCommand !== null;
  const diagnosticCommand =
    artifactRisk?.mitigationCommand ??
    taskScopedCandidate(decision.executionPacket.verificationCandidate, decision.task.id) ??
    risks.find((risk) => risk.code === "runner_rail_confusion")?.mitigationCommand ??
    null;
  const repeatAllowed = canExecuteNow && artifactRisk === null;
  return {
    schemaVersion: 1,
    canExecuteNow,
    shouldRunNextCommand: canExecuteNow,
    operatorAction: operatorActionFor(decision.executionPacket.actionKind),
    safeCommand,
    diagnosticCommand,
    sourceOfTruth: deriveSourceOfTruth(decision, risks),
    freshness: {
      route: decision.sourceConfidence?.route?.freshness ?? "unknown",
      remote: decision.sourceConfidence?.remote?.freshness ?? "unknown",
      staleStateCheck: decision.executionPacket.staleStateCheck,
    },
    repeatPolicy: {
      allowed: repeatAllowed,
      maxAttemptsBeforeRecompute: 1,
      recomputeCommand: decision.executionPacket.staleStateCheck,
      stopCondition: artifactRisk
        ? artifactRisk.stopCondition
        : "after any non-zero exit or completed mutation, recompute task next-action before a second step",
    },
    fallback: {
      allowed: hookRisk !== null,
      command: hookRisk?.mitigationCommand ?? null,
      reason: hookRisk?.summary ?? null,
    },
    runnerContext: deriveRunnerContext(decision),
    stopReason: canExecuteNow
      ? null
      : (decision.executionPacket.stopReason ??
        decision.oracle.blocker?.summary ??
        decision.nextAction.summary),
    afterCommand: decision.executionPacket.returnControlWhen,
    staleStateCheck: decision.executionPacket.staleStateCheck,
    risks,
  };
}
