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
  const taskTitle = compactGoalText(bundle.task?.narrative.title ?? "");
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

function renderRunnerResultManifestExampleLines(workOrderId: string): string[] {
  const fixtures = buildAgentSemanticResultV2ValidFixtures(workOrderId);
  return AGENT_SEMANTIC_RESULT_STATUS_VALUES.map(
    (status) => `- ${status}: ${JSON.stringify(fixtures[status])}`,
  );
}

function renderPhaseToolLines(bundle: RunnerContextBundle): string[] {
  const manifest = bundle.execution.phase_tools;
  if (!manifest) return [];
  const allowed = manifest.tools.filter((tool) => tool.allowed);
  const runScoped = allowed.filter((tool) => tool.transport === "run_scoped_command");
  const unavailable = manifest.tools.filter((tool) => !tool.allowed);
  return [
    "",
    "Run-scoped phase tool contract:",
    `- phase: ${manifest.phase}`,
    `- role: ${manifest.role}`,
    `- global_help_required: ${String(manifest.global_help_required)}`,
    `- repository_tool_classes: ${JSON.stringify(manifest.repository_tool_classes)}`,
    ...(runScoped.length > 0
      ? [
          "- The supervisor injects the signed token and a checkout-local broker channel through the process environment. Never print the token or pass it on argv.",
          "- For run_scoped_command tools, send one JSON object on stdin to the exact invocation below. Input schemas are in bundle.execution.phase_tools.tools.",
        ]
      : [
          "- This adapter exposes no run_scoped_command transport, so no phase-tool token or broker channel is injected. Use only the declared terminal result transport.",
        ]),
    ...allowed.map(
      (tool) =>
        `- ${tool.name}: transport=${tool.transport} enforcement=${tool.enforcement} invocation=${tool.invocation ?? "terminal AgentSemanticResult v2"}`,
    ),
    ...unavailable.map(
      (tool) =>
        `- ${tool.name}: unavailable (${tool.reason ?? "adapter/work-order capability not granted"})`,
    ),
    "- Lifecycle operations are never phase tools. An undeclared, expired, revoked, cross-run, cross-role, or tampered call returns a typed denial before target effects.",
    "- report_result and report_blocker are terminal: an accepted call revokes the token. request_knowledge, knowledge_search, and knowledge_show remain bounded to the current work-order context.",
  ];
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
  const route = bundle.route_decision;
  const workflowOperation =
    route?.workflowStep.kind === "cli_operation" ? route.workflowStep.operation : undefined;
  const routeMustNot = route?.executionPacket.mustNot ?? [];
  const sandboxPolicy = bundle.execution.sandbox_policy;
  const knowledgeRequestAuthorized =
    bundle.work_order?.authority.allowed_tool_classes.includes("knowledge_request");
  // Codex emits the typed result through its final structured response. The
  // supervisor persists that response because runner artifacts live under
  // `.git`, which is intentionally outside every Codex write sandbox.
  const supervisorOwnsSemanticResult = bundle.execution.adapter_id === "codex";
  const writeScope = bundle.execution.write_scope;
  const sandboxDecision = bundle.execution.policy_decision?.fields.sandbox;
  return [
    ...(codexGoalLine ? [codexGoalLine, ""] : []),
    "# agentplane runner bootstrap",
    "",
    "This invocation is already inside an approved runner execution.",
    "- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.",
    "- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.",
    "- Keep lifecycle authority with the parent AgentPlane workflow; do not open PRs, merge, release, push publication artifacts, or clean worktrees unless the bundle explicitly delegates that action.",
    "- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.",
    "- Do not invoke `ap` or `agentplane` for lifecycle, context preparation, repository diagnosis, or formal verification. The parent CLI owns those actions. The only exception is an exact run-scoped phase-tool invocation listed below.",
    "- Assume sibling runners may be executing concurrently. Keep writes inside the task scope, avoid broad refactors or shared policy edits, and report possible write conflicts in the result manifest instead of resolving them speculatively.",
    "- Open bundle.json immediately, execute the requested work directly, and stop when the requested outcome is satisfied.",
    "",
    `- target: ${targetLabel}`,
    `- adapter: ${bundle.execution.adapter_id}`,
    `- mode: ${bundle.execution.mode}`,
    `- run_id: ${bundle.execution.run_id}`,
    `- work_order_id: ${bundle.work_order?.work_order_id ?? invocation?.work_order_id ?? bundle.execution.run_id}`,
    `- bundle_path: ${bundle.execution.artifact_paths.bundle_path}`,
    `- result_path: ${bundle.execution.artifact_paths.result_path}`,
    `- receipt_path: ${bundle.execution.artifact_paths.receipt_path}`,
    `- bootstrap_path: ${bundle.execution.artifact_paths.bootstrap_path}`,
    `- sandbox_requested: ${sandboxPolicy?.requested ?? "unknown"}`,
    `- sandbox_source: ${sandboxPolicy?.source ?? "unknown"}`,
    `- execution_role: ${sandboxPolicy?.role ?? "unknown"}`,
    `- sandbox_enforcement: ${sandboxDecision?.status ?? "unknown"}`,
    `- writable_roots: ${JSON.stringify(writeScope?.writable_roots ?? [])}`,
    `- protected_paths: ${JSON.stringify(writeScope?.protected_paths ?? [])}`,
    ...(route
      ? [
          `- checkout_role: ${route.workspace.checkoutRole}`,
          `- route_phase: ${route.oracle.phase}`,
          `- workflow_step_kind: ${route.workflowStep.kind}`,
          `- workflow_step_id: ${route.workflowStep.id}`,
          `- workflow_operation_id: ${workflowOperation?.id ?? "none"}`,
          `- route_mutation_path_hint: ${route.oracle.mutationPathHint ?? "none"}`,
          `- route_safe_to_mutate: ${String(route.executionPacket.safeToMutate)}`,
          `- route_recommended_role: ${route.executionPacket.recommendedRole}`,
          `- route_must_run_from: ${route.executionPacket.mustRunFrom ?? "unknown"}`,
          `- route_return_control_when: ${route.executionPacket.returnControlWhen}`,
        ]
      : []),
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.",
    "Treat the rendered route fields as supervisor-resolved constraints. Do not recompute workflow state or invoke task lifecycle commands from this run.",
    "For file-edit tools that do not accept cwd/workdir, use absolute paths under route_mutation_path_hint when route_safe_to_mutate is true; otherwise stop before mutating files.",
    "Stop according to route_return_control_when; the parent supervisor owns the next state transition.",
    "Treat protected_paths as forbidden even when the native sandbox permits them. The supervisor evaluates actual writes after the run.",
    ...(routeMustNot.length > 0
      ? ["Route must-not rules:", ...routeMustNot.map((rule) => `- ${rule}`)]
      : []),
    ...(knowledgeRequestAuthorized
      ? [
          "When bounded task context is missing, return status=needs_context with a KnowledgeRequest v1 in the semantic result.",
          "KnowledgeRequest is limited to scope=task_context, a declared desired_kind, and blocking=true only when work cannot proceed without it.",
          "Do not use repository search or lifecycle commands to fill that gap; the parent CLI validates the request, retrieves digest-valid references, and records its audit.",
        ]
      : []),
    ...renderPhaseToolLines(bundle),
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
    supervisorOwnsSemanticResult
      ? "This is a Codex run. Do not attempt to write result_path. Return the AgentSemanticResult v2 object as the final structured response; the supervisor writes and validates result_path outside the sandbox."
      : "Execute-mode runs must write a valid AgentSemanticResult v2 JSON manifest to result_path before exiting.",
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
