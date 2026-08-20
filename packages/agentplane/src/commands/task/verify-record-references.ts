import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  deriveRouteOperatorGuidance,
  routeRunnerContextIsRelevant,
} from "../shared/route-guidance.js";
import type { CommandContext } from "../shared/task-backend.js";

function appendDetailsBlock(details: string | null | undefined, lines: readonly string[]): string {
  const existing = (details ?? "").trim();
  return [existing, lines.join("\n")].filter(Boolean).join("\n\n");
}

export async function appendBlueprintSnapshotReference(
  details: string | null | undefined,
  opts: {
    ctx: CommandContext;
    task: Parameters<typeof checkTaskBlueprintSnapshotDrift>[0]["task"];
  },
): Promise<string> {
  try {
    const snapshot = await checkTaskBlueprintSnapshotDrift(opts);
    return appendDetailsBlock(details, [
      "BlueprintSnapshotRef:",
      `- state: ${snapshot.state}`,
      `- path: ${snapshot.path}`,
      `- old_digest: ${snapshot.previous.digest ?? "none"}`,
      `- current_digest: ${snapshot.current.digest}`,
      `- route_changed: ${
        snapshot.routeChanged === null ? "unknown" : snapshot.routeChanged ? "yes" : "no"
      }`,
      `- safe_command: ${snapshot.safeCommand}`,
    ]);
  } catch (err) {
    const message = err instanceof Error && err.message.trim() ? err.message.trim() : String(err);
    return appendDetailsBlock(details, [
      "BlueprintSnapshotRef:",
      "- state: unavailable",
      `- error: ${message}`,
      `- safe_command: agentplane blueprint snapshot ${opts.task.id}`,
    ]);
  }
}

export async function appendDecisionContextReference(
  details: string | null | undefined,
  opts: { ctx: CommandContext; cwd: string; rootOverride?: string; taskId: string },
): Promise<string> {
  try {
    const decision = await buildTaskRouteDecision({
      ctx: opts.ctx,
      cwd: opts.cwd,
      includeRemote: false,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    const guidance = deriveRouteOperatorGuidance(decision);
    const runnerLines = routeRunnerContextIsRelevant(guidance)
      ? [
          `- runner_required: ${String(guidance.runnerContext.runnerIsRequired)}`,
          `- runner_failure_means: ${guidance.runnerContext.runnerFailureMeans}`,
        ]
      : [];
    return appendDetailsBlock(details, [
      "DecisionContextRef:",
      `- operator_action: ${guidance.operatorAction}`,
      `- can_execute_now: ${String(guidance.canExecuteNow)}`,
      `- safe_command: ${guidance.safeCommand ?? "none"}`,
      `- diagnostic_command: ${guidance.diagnosticCommand ?? "none"}`,
      `- source_of_truth: route=${guidance.sourceOfTruth.route} diagnostic=${guidance.sourceOfTruth.diagnostic} remote=${guidance.sourceOfTruth.remote}`,
      `- freshness: route=${guidance.freshness.route} remote=${guidance.freshness.remote}`,
      `- repeat_allowed: ${String(guidance.repeatPolicy.allowed)}`,
      `- repeat_stop_condition: ${guidance.repeatPolicy.stopCondition}`,
      ...runnerLines,
      `- risks: ${guidance.risks.map((risk) => risk.code).join(", ") || "none"}`,
    ]);
  } catch (err) {
    const message = err instanceof Error && err.message.trim() ? err.message.trim() : String(err);
    return appendDetailsBlock(details, [
      "DecisionContextRef:",
      "- state: unavailable",
      `- error: ${message}`,
      `- safe_command: agentplane task next-action ${opts.taskId} --explain`,
    ]);
  }
}
