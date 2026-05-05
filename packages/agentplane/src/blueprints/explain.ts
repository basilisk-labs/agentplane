import type {
  BlueprintExplainNode,
  BlueprintExplainOutput,
  BlueprintResolveInput,
  ResolvedBlueprint,
  WorkflowMode,
} from "./model.js";
import { blueprintPlanEvidence, buildBlueprintPlanArtifact } from "./plan.js";

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
  return {
    blueprintId: opts.resolved.blueprint.id,
    blueprintVersion: opts.resolved.blueprint.version,
    title: opts.resolved.blueprint.title,
    ...(opts.workflowMode ? { workflowMode: opts.workflowMode } : {}),
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
  };
}

export function formatBlueprintExplain(output: BlueprintExplainOutput): string {
  const lines = [
    `blueprint_id: ${output.blueprintId}`,
    `blueprint_version: ${output.blueprintVersion}`,
    ...(output.workflowMode ? [`workflow_mode: ${output.workflowMode}`] : []),
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
    `rejected_recipe_extensions: ${output.rejectedRecipeExtensions.length}`,
    `stop_reasons: ${output.stopReasons.map((reason) => reason.id).join(", ") || "none"}`,
  ];
  return `${lines.join("\n")}\n`;
}
