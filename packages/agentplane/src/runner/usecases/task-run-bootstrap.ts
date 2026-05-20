import type { RunnerContextBundle, RunnerInvocation } from "../types.js";

export function renderTaskRunnerBootstrap(
  bundle: RunnerContextBundle,
  invocation?: RunnerInvocation,
): string {
  const targetLabel =
    bundle.target.kind === "task"
      ? `task ${bundle.target.task_id}`
      : `recipe scenario ${bundle.target.recipe_id}:${bundle.target.scenario_id}`;
  const stopRules = bundle.blueprint?.stopReasons ?? [];
  const playbook = bundle.playbook?.selected_playbook;
  const verifierChecks = bundle.playbook?.final_verifier.checks ?? [];
  const routeDecision = bundle.route_decision as
    | {
        nextAction?: { code?: string; command?: string | null; summary?: string };
        workspace?: { checkoutRole?: string };
        approval?: { effectiveMutationApprovalRequired?: boolean };
      }
    | undefined;
  return [
    "# agentplane runner bootstrap",
    "",
    "This invocation is already inside an approved runner execution.",
    "- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.",
    "- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.",
    "- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.",
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
          `- route_next_action: ${routeDecision.nextAction?.code ?? "unknown"}`,
          `- route_next_command: ${routeDecision.nextAction?.command ?? "none"}`,
          `- effective_mutation_approval: ${String(
            routeDecision.approval?.effectiveMutationApprovalRequired ?? true,
          )}`,
        ]
      : []),
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.",
    "Follow route_decision in bundle.json unless local state has changed; if it may be stale, run `agentplane task next-action <task-id> --explain` before mutating.",
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
