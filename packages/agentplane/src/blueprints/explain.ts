import type {
  BlueprintExplainNode,
  BlueprintExplainOutput,
  BlueprintResolveInput,
  ResolvedBlueprint,
  WorkflowMode,
} from "./model.js";
import { SGR_CONTRACT_SCHEMA_VERSION } from "../runtime/sgr/index.js";
import {
  blueprintPlanEvidence,
  buildBlueprintPlanArtifact,
  workflowGitCapabilitiesForMode,
} from "./plan.js";
import { validateBlueprintRouteDecisionSgrResult } from "./sgr-decision.js";

function recipeContributionId(item: {
  recipeId: string;
  recipeVersion?: string;
  extensionId?: string;
}): string {
  return [
    item.recipeVersion ? `${item.recipeId}@${item.recipeVersion}` : item.recipeId,
    item.extensionId ?? "extension",
  ].join("/");
}

function explainNode(node: ResolvedBlueprint["activeNodes"][number]): BlueprintExplainNode {
  return {
    id: node.id,
    kind: node.kind,
    mode: node.mode,
    required: node.required,
    protected: node.protected ?? false,
    allowedCommands: [...(node.allowedCommands ?? [])],
    policyModules: [...(node.policyModules ?? [])],
  };
}

export function explainResolvedBlueprint(opts: {
  resolved: ResolvedBlueprint;
  input?: BlueprintResolveInput;
  workflowMode?: WorkflowMode;
}): BlueprintExplainOutput {
  const plan = buildBlueprintPlanArtifact(opts);
  const workflowMode = opts.workflowMode ?? opts.input?.workflowMode;
  const workflowGitCapabilities = workflowGitCapabilitiesForMode(workflowMode);
  const sgrDecision = validateBlueprintRouteDecisionSgrResult({
    schema_version: SGR_CONTRACT_SCHEMA_VERSION,
    kind: "blueprint_route_decision",
    facts: [
      {
        label: "task-input",
        summary: `tags=${opts.input?.tags.join(",") ?? "none"} mutation=${opts.input?.mutation ?? "unknown"}`,
      },
    ],
    inferences: opts.resolved.selectionReasons.map((reason, index) => ({
      label: `selection-reason-${index + 1}`,
      summary: reason,
    })),
    rejected_routes: opts.resolved.rejectedRecipeExtensions.map((item) => ({
      blueprint_id: opts.resolved.blueprint.id,
      reason: `recipe extension ${recipeContributionId(item)} rejected: ${item.reason}`,
    })),
    selected_route: {
      blueprint_id: opts.resolved.blueprint.id,
      task_kind: opts.input?.taskKind ?? opts.resolved.blueprint.taskKinds[0] ?? "analysis",
      rationale: opts.resolved.selectionReasons.join("; ") || "Blueprint selected by resolver.",
    },
    required_evidence: opts.resolved.requiredEvidence.map((evidence) => ({
      id: evidence.id,
      kind: evidence.kind,
      description: evidence.description,
    })),
    stop_rules: opts.resolved.stopReasons.map((reason) => ({
      id: reason.id,
      severity: reason.severity,
      reason: reason.reason,
    })),
    weak_links: opts.resolved.stopReasons
      .filter((reason) => reason.severity !== "warn")
      .map((reason) => reason.reason),
  });
  return {
    blueprintId: opts.resolved.blueprint.id,
    blueprintVersion: opts.resolved.blueprint.version,
    title: opts.resolved.blueprint.title,
    ...(workflowMode ? { workflowMode } : {}),
    ...(workflowGitCapabilities ? { workflowGitCapabilities } : {}),
    route: opts.resolved.activeNodes.map((node) => explainNode(node)),
    skippedNodes: [...opts.resolved.skippedNodes],
    requiredEvidence: opts.resolved.requiredEvidence.map((evidence) =>
      blueprintPlanEvidence(evidence),
    ),
    plan,
    selectionReasons: [...opts.resolved.selectionReasons],
    acceptedRecipeExtensions: [...opts.resolved.acceptedRecipeExtensions],
    rejectedRecipeExtensions: [...opts.resolved.rejectedRecipeExtensions],
    stopReasons: [...opts.resolved.stopReasons],
    sgrDecision,
  };
}

export function formatBlueprintExplain(output: BlueprintExplainOutput): string {
  const lines = [
    `blueprint_id: ${output.blueprintId}`,
    `blueprint_version: ${output.blueprintVersion}`,
    ...(output.workflowMode ? [`workflow_mode: ${output.workflowMode}`] : []),
    ...(output.workflowGitCapabilities
      ? [
          `workflow_git: implementation_commit_location=${output.workflowGitCapabilities.implementationCommitLocation} finish_commit_source=${output.workflowGitCapabilities.finishCommitSource} close_tail_required=${output.workflowGitCapabilities.closeTailRequired ? "yes" : "no"} lifecycle_comment_commit_location=${output.workflowGitCapabilities.lifecycleCommentCommitLocation} finish_commit_from_comment=${output.workflowGitCapabilities.finishCommitFromComment ? "yes" : "no"}`,
        ]
      : []),
    `route: ${output.route.map((node) => node.kind).join(" -> ")}`,
    `selection_reasons: ${output.selectionReasons.join("; ") || "none"}`,
    `policy_modules: ${output.plan.policyModules.join(", ") || "none"}`,
    `allowed_commands: ${output.plan.allowedCommands.join("; ") || "none"}`,
    `context_budget: max_policy_modules=${output.plan.contextBudget.maxPolicyModules}${
      output.plan.contextBudget.maxPromptBlocks
        ? ` max_prompt_blocks=${output.plan.contextBudget.maxPromptBlocks}`
        : ""
    }`,
    `context_manifest: ${output.plan.contextManifest.length}`,
    `required_evidence: ${output.requiredEvidence.map((item) => item.kind).join(", ")}`,
    `accepted_recipe_extensions: ${output.acceptedRecipeExtensions.length}`,
    ...output.acceptedRecipeExtensions.map(
      (item) =>
        `accepted_recipe_extension: ${recipeContributionId(item)} kind=${item.kind} node=${item.nodeKind} reason=${item.reason}`,
    ),
    `rejected_recipe_extensions: ${output.rejectedRecipeExtensions.length}`,
    ...output.rejectedRecipeExtensions.map(
      (item) =>
        `rejected_recipe_extension: ${recipeContributionId(item)} kind=${item.kind} node=${item.nodeKind ?? "none"} reason=${item.reason}`,
    ),
    `stop_reasons: ${output.stopReasons.map((reason) => reason.id).join(", ") || "none"}`,
    `sgr_decision: ${output.sgrDecision.kind} selected=${output.sgrDecision.selected_route.blueprint_id}`,
  ];
  return `${lines.join("\n")}\n`;
}
