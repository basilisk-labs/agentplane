import type { RunnerContextBundle, RunnerInvocation } from "../types.js";

function compactGoalText(value: string): string {
  return value.replaceAll(/\s+/g, " ").trim();
}

function truncateGoalText(value: string, maxLength = 320): string {
  const compact = compactGoalText(value);
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 3).trimEnd()}...`;
}

function renderCodexGoalLine(bundle: RunnerContextBundle, targetLabel: string): string | null {
  if (bundle.execution.adapter_id !== "codex") return null;
  const taskTitle = compactGoalText(bundle.task?.data.title ?? "");
  const recipeGoal =
    typeof bundle.recipe?.scenario?.goal === "string"
      ? compactGoalText(bundle.recipe.scenario.goal)
      : "";
  const recipeSummary =
    typeof bundle.recipe?.scenario?.summary === "string"
      ? compactGoalText(bundle.recipe.scenario.summary)
      : "";
  const objective = taskTitle || recipeGoal || recipeSummary || targetLabel;
  return `/goal ${truncateGoalText(`Execute AgentPlane ${targetLabel}: ${objective}`)}`;
}

export function renderTaskRunnerBootstrap(
  bundle: RunnerContextBundle,
  invocation?: RunnerInvocation,
): string {
  const targetLabel =
    bundle.target.kind === "task"
      ? `task ${bundle.target.task_id}`
      : `recipe scenario ${bundle.target.recipe_id}:${bundle.target.scenario_id}`;
  const codexGoalLine = renderCodexGoalLine(bundle, targetLabel);
  const stopRules = bundle.blueprint?.stopReasons ?? [];
  const playbook = bundle.playbook?.selected_playbook;
  const verifierChecks = bundle.playbook?.final_verifier.checks ?? [];
  const routeDecision = bundle.route_decision as
    | {
        oracle?: {
          phase?: string;
          authoritativeCheckout?: string;
          blocker?: { code?: string; summary?: string } | null;
          nextCommand?: string | null;
        };
        nextAction?: { code?: string; command?: string | null; summary?: string };
        workspace?: { checkoutRole?: string };
        approval?: { effectiveMutationApprovalRequired?: boolean };
      }
    | undefined;
  return [
    ...(codexGoalLine ? [codexGoalLine, ""] : []),
    "# agentplane runner bootstrap",
    "",
    "This invocation is already inside an approved runner execution.",
    "- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.",
    "- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.",
    "- Keep lifecycle authority with the parent AgentPlane workflow; do not open PRs, merge, release, push publication artifacts, or clean worktrees unless the bundle explicitly delegates that action.",
    "- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.",
    "- Assume sibling runners may be executing concurrently. Keep writes inside the task scope, avoid broad refactors or shared policy edits, and report possible write conflicts in the result manifest instead of resolving them speculatively.",
    "- Open bundle.json immediately, execute the requested work directly, and stop when the requested outcome is satisfied.",
    "",
    `- target: ${targetLabel}`,
    `- adapter: ${bundle.execution.adapter_id}`,
    `- mode: ${bundle.execution.mode}`,
    `- run_id: ${bundle.execution.run_id}`,
    `- bundle_path: ${bundle.execution.artifact_paths.bundle_path}`,
    `- result_path: ${bundle.execution.artifact_paths.result_path}`,
    `- bootstrap_path: ${bundle.execution.artifact_paths.bootstrap_path}`,
    ...(routeDecision
      ? [
          `- checkout_role: ${routeDecision.workspace?.checkoutRole ?? "unknown"}`,
          `- route_phase: ${routeDecision.oracle?.phase ?? "unknown"}`,
          `- route_authoritative_checkout: ${
            routeDecision.oracle?.authoritativeCheckout ??
            routeDecision.workspace?.checkoutRole ??
            "unknown"
          }`,
          `- route_next_action: ${routeDecision.nextAction?.code ?? "unknown"}`,
          `- route_next_command: ${
            routeDecision.oracle?.nextCommand ?? routeDecision.nextAction?.command ?? "none"
          }`,
          `- route_primary_blocker: ${
            routeDecision.oracle?.blocker
              ? `${routeDecision.oracle.blocker.code ?? "unknown"}: ${
                  routeDecision.oracle.blocker.summary ?? "blocked"
                }`
              : "none"
          }`,
          `- effective_mutation_approval: ${String(
            routeDecision.approval?.effectiveMutationApprovalRequired ?? true,
          )}`,
        ]
      : []),
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.",
    "Follow route_decision in bundle.json unless local state has changed; if it may be stale, run `agentplane task next-action <task-id> --explain` before mutating.",
    "Route oracle contract: follow the rendered route_next_command, run it from route_authoritative_checkout, treat route_primary_blocker as the current stop reason, and use route_phase instead of manually reconstructing branch/worktree/PR state.",
    "When reading bundle.json directly, use camelCase JSON paths: route_decision.oracle.nextCommand, route_decision.oracle.authoritativeCheckout, route_decision.oracle.blocker, and route_decision.oracle.phase.",
    "If the requested work cannot be completed without widening lifecycle authority or touching likely sibling-owned files, stop and write a blocked result manifest with the conflict, affected paths, and recommended parent action.",
    ...(stopRules.length > 0
      ? [
          "",
          "Blueprint stop rules:",
          ...stopRules.map((rule) => `- ${rule.severity}: ${rule.reason} (${rule.id})`),
        ]
      : []),
    ...(bundle.playbook
      ? [
          "",
          "Execution playbook contract:",
          `- blueprint_result: ${bundle.playbook.execution_blueprint.id}`,
          `- selected_playbook: ${playbook?.id ?? "none"}`,
          `- runtime: ${bundle.playbook.runtime_capabilities.runtime_id}`,
          "- final verifier blocks success when required state is missing.",
          ...(verifierChecks.length > 0
            ? [
                "Required final state:",
                ...verifierChecks.map((check) => `- ${check.id}: ${check.description}`),
              ]
            : []),
        ]
      : []),
    "Execute-mode runs must write a valid JSON result manifest to result_path before exiting.",
    "Minimal manifest example:",
    '{"schema_version":1,"status":"success","summary":"Completed.","capabilities_used":["runner.exec"]}',
    "",
    "Prepared invocation:",
    "",
    invocation
      ? `- argv: ${invocation.argv.join(" ")}`
      : "- argv: <not prepared; preflight refused>",
  ].join("\n");
}
