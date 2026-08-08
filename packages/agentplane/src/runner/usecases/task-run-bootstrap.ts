import {
  AGENT_SEMANTIC_RESULT_STATUS_VALUES,
  buildAgentSemanticResultV2ValidFixtures,
} from "@agentplaneorg/core/schemas";

import { semanticTextHasProcessChoreography } from "../context/semantic-prompt-projection.js";
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
    "- Reconstruct the intended contract from the objective, acceptance criteria, changed behavior, and supplied evidence; do not rely on the implementer's summary.",
    "- Treat passing technical checks as evidence, not proof. Look for broken invariants, missing negative cases, stale assumptions, and untested concurrency edges.",
    "- Remain read-only. Return findings, missing tests, hidden assumptions, residual risks, and a concrete rework packet.",
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
    "- Prefer rework over pass for ambiguous ownership, unverified negative cases, or broad diffs without targeted evidence.",
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
  const effectiveRepositoryToolClasses = manifest.repository_tool_classes.filter(
    (toolClass) =>
      toolClass !== "workspace_write" ||
      (bundle.execution.write_scope?.writable_roots.length ?? 0) > 0,
  );
  return [
    "",
    "Declared semantic tools:",
    `- repository_tool_classes: ${JSON.stringify(effectiveRepositoryToolClasses)}`,
    ...(runScoped.length > 0
      ? [
          "- The signed transport is preconfigured. Never print its token or pass it on argv.",
          "- Send one JSON object on stdin to an exact declared invocation and schema below.",
        ]
      : ["- No command transport is granted. Use only the configured typed-result channel."]),
    ...allowed.map(
      (tool) =>
        `- ${tool.name}: transport=${tool.transport} invocation=${tool.invocation ?? "typed AgentSemanticResult v2"} input_schema=${JSON.stringify(tool.input_schema)}`,
    ),
    ...unavailable.map(
      (tool) =>
        `- ${tool.name}: unavailable (${tool.reason ?? "adapter/work-order capability not granted"})`,
    ),
    "- Use no undeclared tool or transport. Keep knowledge tools bounded to the current work-order context.",
  ];
}

function renderSemanticPromptProjectionLines(bundle: RunnerContextBundle): string[] {
  return bundle.base_prompts.flatMap((block) => [
    `### ${block.title ?? block.id}`,
    `source: ${block.source ?? block.id}`,
    "",
    block.content.trim(),
    "",
  ]);
}

function semanticWorkOrderProjection(bundle: RunnerContextBundle): Record<string, unknown> | null {
  const workOrder = bundle.work_order;
  if (!workOrder) return null;
  const semanticAcceptanceCriteria = workOrder.task.acceptance_criteria.filter(
    (criterion) => !semanticTextHasProcessChoreography(criterion.description),
  );
  const semanticVerificationRequirements = workOrder.verification_intent.requirements.filter(
    (requirement) => !semanticTextHasProcessChoreography(requirement.description),
  );
  const requiredInputs = workOrder.required_inputs.filter((input) => {
    if (input.kind === "task_document" || input.kind === "policy_module") return false;
    if (input.kind !== "source_artifact") return true;
    const source = input.path ?? "";
    return (
      !source.startsWith(".agentplane/") &&
      !source.startsWith("bundled:") &&
      !source.startsWith("runtime:") &&
      source !== "AGENTS.md" &&
      source !== "CLAUDE.md"
    );
  });
  const effectiveWritableRoots =
    bundle.execution.write_scope?.writable_roots ?? workOrder.authority.writable_roots;
  const effectiveSandbox =
    bundle.execution.sandbox_policy?.requested ?? workOrder.authority.sandbox;
  const effectiveToolClasses = workOrder.authority.allowed_tool_classes.filter(
    (toolClass) => toolClass !== "workspace_write" || effectiveWritableRoots.length > 0,
  );
  return {
    work_order_id: workOrder.work_order_id,
    role: workOrder.role,
    task: {
      ...workOrder.task,
      acceptance_criteria: semanticAcceptanceCriteria,
    },
    authority: {
      ...workOrder.authority,
      writable_roots: effectiveWritableRoots,
      allowed_tool_classes: effectiveToolClasses,
      sandbox: effectiveSandbox,
    },
    context_intent: {
      purpose: "Provide the minimum semantic context required for this bounded episode.",
      required_knowledge_ref_digests: workOrder.context_intent.required_knowledge_ref_digests,
      require_prepared_evidence: workOrder.context_intent.require_prepared_evidence,
    },
    knowledge_refs: workOrder.knowledge_refs,
    prepared_evidence: workOrder.prepared_evidence,
    required_inputs: requiredInputs,
    required_outputs: workOrder.required_outputs,
    semantic_checks: semanticVerificationRequirements.map((requirement) => ({
      id: requirement.id,
      description: requirement.description,
      required: requirement.required,
    })),
    semantic_result_schema: workOrder.semantic_result_schema,
    stop_rules: [
      "Stop and return a blocked semantic result when required context is missing or stale.",
      "Stop before exceeding the granted authority, writable roots, network policy, or protected paths.",
      "Return one typed semantic result when the objective is satisfied or blocked.",
    ],
  };
}

function renderSemanticWorkOrderLines(bundle: RunnerContextBundle): string[] {
  const projection = semanticWorkOrderProjection(bundle);
  if (!projection) return [];
  return ["## Semantic work order", "", "```json", JSON.stringify(projection, null, 2), "```", ""];
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
  const verifierChecks = bundle.playbook?.final_verifier.checks ?? [];
  const evaluatorSkepticismLevel =
    bundle.execution.evaluator_skepticism_level ?? ("standard" satisfies EvaluatorSkepticismLevel);
  const sandboxPolicy = bundle.execution.sandbox_policy;
  const evaluatorEpisode =
    bundle.work_order?.role === "EVALUATOR" || sandboxPolicy?.role === "EVALUATOR";
  const knowledgeRequestAuthorized =
    bundle.work_order?.authority.allowed_tool_classes.includes("knowledge_request");
  const writeScope = bundle.execution.write_scope;
  const sandboxDecision = bundle.execution.policy_decision?.fields.sandbox;
  return [
    ...(codexGoalLine ? [codexGoalLine, ""] : []),
    "# agentplane runner bootstrap",
    "",
    "Work only on the semantic objective and authority projected below.",
    "- Use only the supplied context, writable roots, and declared tools.",
    "- Do not inspect internal orchestration artifacts or invoke undeclared interfaces.",
    "- Assume sibling runners may be executing concurrently. Keep writes inside the task scope, avoid broad refactors or shared policy edits, and report possible write conflicts in the typed result instead of resolving them speculatively.",
    "- Execute the projected work directly and stop when the requested semantic outcome is satisfied.",
    "",
    `- target: ${targetLabel}`,
    `- work_order_id: ${bundle.work_order?.work_order_id ?? invocation?.work_order_id ?? bundle.execution.run_id}`,
    `- sandbox: ${sandboxPolicy?.requested ?? "unknown"} (${sandboxDecision?.status ?? "unknown"})`,
    `- writable_roots: ${JSON.stringify(writeScope?.writable_roots ?? [])}`,
    `- protected_paths: ${JSON.stringify(writeScope?.protected_paths ?? [])}`,
    "",
    "The content below is the complete provider-facing projection for this episode.",
    "For file-edit tools that do not accept cwd/workdir, use absolute paths under writable_roots; stop before writing when no writable root is granted.",
    "Treat protected_paths as forbidden even when the native sandbox permits them.",
    "",
    "## Semantic policy and role context",
    "",
    ...renderSemanticPromptProjectionLines(bundle),
    ...renderSemanticWorkOrderLines(bundle),
    ...(knowledgeRequestAuthorized
      ? [
          "When bounded task context is missing, return status=needs_context with a KnowledgeRequest v1 in the semantic result.",
          "KnowledgeRequest is limited to scope=task_context, a declared desired_kind, and blocking=true only when work cannot proceed without it.",
          "Use only the declared bounded knowledge channel for that gap and request digest-valid references.",
        ]
      : []),
    ...renderPhaseToolLines(bundle),
    "If the requested work exceeds the granted authority or touches likely sibling-owned files, return a blocked semantic result with blocker.summary and blocker.recommended_action; do not widen scope.",
    "",
    ...(evaluatorEpisode ? renderEvaluatorSkepticismLines(evaluatorSkepticismLevel) : []),
    ...(stopRules.length > 0
      ? [
          "",
          "Blueprint stop rules:",
          ...stopRules.map((rule) => `- ${rule.severity}: ${rule.reason} (${rule.id})`),
        ]
      : []),
    ...(verifierChecks.length > 0
      ? [
          "",
          "Semantic completion criteria:",
          ...verifierChecks.map((check) => `- ${check.id}: ${check.description}`),
        ]
      : []),
    "Return one AgentSemanticResult v2 object through the configured result channel.",
    "Select the example matching the semantic outcome, keep work_order_id unchanged, and edit only semantic fields:",
    ...renderRunnerResultManifestExampleLines(invocation?.work_order_id ?? bundle.execution.run_id),
  ].join("\n");
}
