import {
  AGENT_SEMANTIC_RESULT_STATUS_VALUES,
  buildAgentSemanticResultV2ValidFixtures,
} from "@agentplaneorg/core/schemas";

import type { RunnerContextBundle, RunnerInvocation } from "../types.js";

type EvaluatorSkepticismLevel = NonNullable<
  RunnerContextBundle["execution"]["evaluator_skepticism_level"]
>;

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

function renderEvaluatorSkepticismLines(level: EvaluatorSkepticismLevel): string[] {
  const common = [
    "Evaluator skepticism contract:",
    `- evaluator_skepticism_level: ${level}`,
    "- During evaluator or audit review, reconstruct the intended contract from the task, plan, Verify Steps, route decision, diff, and evidence; do not rely on the implementer's summary.",
    "- Treat passing technical checks as evidence, not proof. Look for broken invariants, missing negative cases, stale route assumptions, and untested concurrency or lifecycle edges.",
    "- If the run is evaluator-only, do not fix issues. Return findings, missing tests, hidden assumptions, residual risks, and a concrete rework packet for the parent runner.",
  ];
  if (level === "standard") {
    return [
      ...common,
      "- Standard review: focus on explicit scope, declared verification, and obvious missing evidence.",
    ];
  }
  if (level === "strict") {
    return [
      ...common,
      "- Strict review: actively search for counterexamples, happy-path-only tests, stale task/blueprint evidence, and category mismatches between requested behavior and implementation.",
      "- Use rework when correctness depends on an assumption the implementation did not prove.",
    ];
  }
  return [
    ...common,
    "- Paranoid review: assume the implementation is incomplete until each critical claim is backed by direct code, test, runtime, or task-artifact evidence.",
    "- Prefer rework over pass for ambiguous ownership, unverified negative cases, broad diffs without targeted evidence, or lifecycle state that could be stale.",
  ];
}

function objectField(
  source: Record<string, unknown> | undefined,
  field: string,
): Record<string, unknown> | undefined {
  const value = source?.[field];
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function stringField(
  source: Record<string, unknown> | undefined,
  field: string,
): string | undefined {
  const value = source?.[field];
  return typeof value === "string" ? value : undefined;
}

function booleanField(
  source: Record<string, unknown> | undefined,
  field: string,
): boolean | undefined {
  const value = source?.[field];
  return typeof value === "boolean" ? value : undefined;
}

function stringArrayField(source: Record<string, unknown> | undefined, field: string): string[] {
  const value = source?.[field];
  return Array.isArray(value) && value.every((entry) => typeof entry === "string") ? value : [];
}

function renderRunnerResultManifestExampleLines(workOrderId: string): string[] {
  const fixtures = buildAgentSemanticResultV2ValidFixtures(workOrderId);
  return AGENT_SEMANTIC_RESULT_STATUS_VALUES.map(
    (status) => `- ${status}: ${JSON.stringify(fixtures[status])}`,
  );
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
  const evaluatorSkepticismLevel =
    bundle.execution.evaluator_skepticism_level ?? ("standard" satisfies EvaluatorSkepticismLevel);
  const routeDecision = bundle.route_decision;
  const routeOracle = objectField(routeDecision, "oracle");
  const routeExecutionPacket = objectField(routeDecision, "executionPacket");
  const routeWorkspace = objectField(routeDecision, "workspace");
  const routeMustNot = stringArrayField(routeExecutionPacket, "mustNot");
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
    `- receipt_path: ${bundle.execution.artifact_paths.receipt_path}`,
    `- bootstrap_path: ${bundle.execution.artifact_paths.bootstrap_path}`,
    ...(routeDecision
      ? [
          `- checkout_role: ${stringField(routeWorkspace, "checkoutRole") ?? "unknown"}`,
          `- route_phase: ${stringField(routeOracle, "phase") ?? "unknown"}`,
          `- route_mutation_path_hint: ${stringField(routeOracle, "mutationPathHint") ?? "none"}`,
          `- route_safe_to_mutate: ${String(
            booleanField(routeExecutionPacket, "safeToMutate") ?? false,
          )}`,
          `- route_recommended_role: ${
            stringField(routeExecutionPacket, "recommendedRole") ?? "unknown"
          }`,
          `- route_must_run_from: ${stringField(routeExecutionPacket, "mustRunFrom") ?? "unknown"}`,
          `- route_return_control_when: ${
            stringField(routeExecutionPacket, "returnControlWhen") ??
            "after this run completes; return control to the parent supervisor"
          }`,
        ]
      : []),
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.",
    "Treat the rendered route fields as supervisor-resolved constraints. Do not recompute workflow state or invoke task lifecycle commands from this run.",
    "For file-edit tools that do not accept cwd/workdir, use absolute paths under route_mutation_path_hint when route_safe_to_mutate is true; otherwise stop before mutating files.",
    "Stop according to route_return_control_when; the parent supervisor owns the next state transition.",
    ...(routeMustNot.length > 0
      ? ["Route must-not rules:", ...routeMustNot.map((rule) => `- ${rule}`)]
      : []),
    "If the requested work cannot be completed without widening lifecycle authority or touching likely sibling-owned files, stop and write a blocked semantic result with blocker.summary and blocker.recommended_action; the supervisor owns path and conflict observation.",
    "",
    ...renderEvaluatorSkepticismLines(evaluatorSkepticismLevel),
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
    "Execute-mode runs must write a valid AgentSemanticResult v2 JSON manifest to result_path before exiting.",
    "Select the example matching the semantic outcome, keep work_order_id unchanged, and edit only semantic fields:",
    ...renderRunnerResultManifestExampleLines(invocation?.work_order_id ?? bundle.execution.run_id),
    "",
    "Prepared invocation:",
    "",
    invocation
      ? `- argv: ${invocation.argv.join(" ")}`
      : "- argv: <not prepared; preflight refused>",
  ].join("\n");
}
