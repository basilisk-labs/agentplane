import type { TaskRouteDecision } from "./route-decision-types.js";

export type RouteOperatorGuidance = {
  schemaVersion: 1;
  canExecuteNow: boolean;
  shouldRunNextCommand: boolean;
  operatorAction: "run_exact_argv" | "provider_action" | "wait" | "stop";
  safeCommand: string | null;
  diagnosticCommand: string | null;
  stopReason: string | null;
  afterCommand: string;
  staleStateCheck: string;
  risks: RouteOperatorRisk[];
};

export type RouteOperatorRisk = {
  code: "pr_artifact_freshness_loop" | "git_hook_side_effect";
  summary: string;
  mitigationCommand: string;
  stopCondition: string;
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

export function deriveRouteOperatorGuidance(decision: TaskRouteDecision): RouteOperatorGuidance {
  const risks = [artifactFreshnessRisk(decision), gitHookRisk(decision)].filter(
    (risk): risk is RouteOperatorRisk => risk !== null,
  );
  const artifactRisk = risks.find((risk) => risk.code === "pr_artifact_freshness_loop") ?? null;
  const safeCommand = decision.executionPacket.exactArgv?.join(" ") ?? null;
  const canExecuteNow =
    decision.executionPacket.actionKind === "local_command" &&
    decision.executionPacket.safeToMutate &&
    safeCommand !== null;
  return {
    schemaVersion: 1,
    canExecuteNow,
    shouldRunNextCommand: canExecuteNow,
    operatorAction: operatorActionFor(decision.executionPacket.actionKind),
    safeCommand,
    diagnosticCommand:
      artifactRisk?.mitigationCommand ??
      taskScopedCandidate(decision.executionPacket.verificationCandidate, decision.task.id) ??
      null,
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
