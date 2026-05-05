import type {
  BlueprintExplainEvidence,
  BlueprintExplainNode,
  BlueprintExplainOutput,
  ResolvedBlueprint,
  WorkflowMode,
} from "./model.js";

function explainNode(node: ResolvedBlueprint["activeNodes"][number]): BlueprintExplainNode {
  return {
    id: node.id,
    kind: node.kind,
    mode: node.mode,
    required: node.required,
    protected: node.protected ?? false,
  };
}

function explainEvidence(
  evidence: ResolvedBlueprint["requiredEvidence"][number],
): BlueprintExplainEvidence {
  return {
    id: evidence.id,
    kind: evidence.kind,
    producedBy: evidence.producedBy,
    required: evidence.required,
    description: evidence.description,
  };
}

export function explainResolvedBlueprint(opts: {
  resolved: ResolvedBlueprint;
  workflowMode?: WorkflowMode;
}): BlueprintExplainOutput {
  return {
    blueprintId: opts.resolved.blueprint.id,
    blueprintVersion: opts.resolved.blueprint.version,
    title: opts.resolved.blueprint.title,
    ...(opts.workflowMode ? { workflowMode: opts.workflowMode } : {}),
    route: opts.resolved.activeNodes.map((node) => explainNode(node)),
    skippedNodes: [...opts.resolved.skippedNodes],
    requiredEvidence: opts.resolved.requiredEvidence.map((evidence) => explainEvidence(evidence)),
    selectionReasons: [...opts.resolved.selectionReasons],
    acceptedRecipeExtensions: [...opts.resolved.acceptedRecipeExtensions],
    rejectedRecipeExtensions: [...opts.resolved.rejectedRecipeExtensions],
    stopReasons: [...opts.resolved.stopReasons],
  };
}

export function formatBlueprintExplain(output: BlueprintExplainOutput): string {
  const lines = [
    `blueprint_id: ${output.blueprintId}`,
    `blueprint_version: ${output.blueprintVersion}`,
    ...(output.workflowMode ? [`workflow_mode: ${output.workflowMode}`] : []),
    `route: ${output.route.map((node) => node.kind).join(" -> ")}`,
    `selection_reasons: ${output.selectionReasons.join("; ") || "none"}`,
    `required_evidence: ${output.requiredEvidence.map((item) => item.kind).join(", ")}`,
    `accepted_recipe_extensions: ${output.acceptedRecipeExtensions.length}`,
    `rejected_recipe_extensions: ${output.rejectedRecipeExtensions.length}`,
    `stop_reasons: ${output.stopReasons.map((reason) => reason.id).join(", ") || "none"}`,
  ];
  return `${lines.join("\n")}\n`;
}
