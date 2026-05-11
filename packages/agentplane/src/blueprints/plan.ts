import type {
  BlueprintContextManifestEntry,
  BlueprintExplainEvidence,
  BlueprintPlanArtifact,
  BlueprintPlanState,
  BlueprintResolveInput,
  BlueprintTaskIntent,
  ResolvedBlueprint,
  WorkflowGitCapabilities,
  WorkflowMode,
} from "./model.js";
import { validateBlueprintPlanArtifact } from "./validate.js";

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))].toSorted();
}

function taskIntentFromInput(input?: BlueprintResolveInput): BlueprintTaskIntent {
  if (!input) return {};
  return {
    ...(input.taskKind ? { taskKind: input.taskKind } : {}),
    ...((input.mutationScope ?? input.mutation)
      ? { mutationScope: input.mutationScope ?? input.mutation }
      : {}),
    ...(input.riskFlags && input.riskFlags.length > 0 ? { riskFlags: input.riskFlags } : {}),
    ...((input.blueprintRequest ?? input.explicitBlueprintId)
      ? { blueprintRequest: input.blueprintRequest ?? input.explicitBlueprintId }
      : {}),
  };
}

export function workflowGitCapabilitiesForMode(
  workflowMode: WorkflowMode | undefined,
): WorkflowGitCapabilities | undefined {
  if (workflowMode === "branch_pr") {
    return {
      workflowMode,
      implementationCommitLocation: "task_worktree",
      finishCommitSource: "explicit_hash",
      closeTailRequired: true,
      lifecycleCommentCommitLocation: "task_worktree",
      finishCommitFromComment: false,
    };
  }
  if (workflowMode === "direct") {
    return {
      workflowMode,
      implementationCommitLocation: "current_checkout",
      finishCommitSource: "explicit_hash_or_comment_commit",
      closeTailRequired: false,
      lifecycleCommentCommitLocation: "current_checkout",
      finishCommitFromComment: true,
    };
  }
  return undefined;
}

export function blueprintPlanState(
  node: ResolvedBlueprint["activeNodes"][number],
): BlueprintPlanState {
  return {
    id: node.id,
    kind: node.kind,
    mode: node.mode,
    required: node.required,
    protected: node.protected ?? false,
    allowedCommands: [...(node.allowedCommands ?? [])],
    policyModules: [...(node.policyModules ?? [])],
    evidenceKinds: [...(node.evidence ?? [])],
  };
}

export function blueprintPlanEvidence(
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

export function buildBlueprintPlanArtifact(opts: {
  resolved: ResolvedBlueprint;
  input?: BlueprintResolveInput;
  workflowMode?: WorkflowMode;
  contextManifest?: readonly BlueprintContextManifestEntry[];
}): BlueprintPlanArtifact {
  const statePolicyModules = opts.resolved.activeNodes.flatMap((node) => node.policyModules ?? []);
  const stateCommands = opts.resolved.activeNodes.flatMap((node) => node.allowedCommands ?? []);
  const workflowMode = opts.workflowMode ?? opts.input?.workflowMode;
  const workflowGitCapabilities = workflowGitCapabilitiesForMode(workflowMode);
  const plan: BlueprintPlanArtifact = {
    schemaVersion: 1,
    blueprintId: opts.resolved.blueprint.id,
    blueprintVersion: opts.resolved.blueprint.version,
    title: opts.resolved.blueprint.title,
    ...(opts.input?.taskId ? { taskId: opts.input.taskId } : {}),
    ...(workflowMode ? { workflowMode } : {}),
    ...(workflowGitCapabilities ? { workflowGitCapabilities } : {}),
    taskIntent: taskIntentFromInput(opts.input),
    whySelected: [...opts.resolved.selectionReasons],
    states: opts.resolved.activeNodes.map((node) => blueprintPlanState(node)),
    requiredEvidence: opts.resolved.requiredEvidence.map((evidence) =>
      blueprintPlanEvidence(evidence),
    ),
    policyModules: uniqueSorted([...opts.resolved.blueprint.policyModules, ...statePolicyModules]),
    allowedCommands: uniqueSorted([...opts.resolved.blueprint.allowedCommands, ...stateCommands]),
    contextBudget: opts.resolved.blueprint.contextBudget,
    contextManifest: [...(opts.contextManifest ?? [])],
    acceptedRecipeExtensions: [...opts.resolved.acceptedRecipeExtensions],
    rejectedRecipeExtensions: [...opts.resolved.rejectedRecipeExtensions],
    stopReasons: [...opts.resolved.stopReasons],
  };
  const validation = validateBlueprintPlanArtifact({
    blueprint: opts.resolved.blueprint,
    plan,
  });
  if (!validation.ok) {
    throw new Error(
      `Invalid blueprint plan for ${opts.resolved.blueprint.id}: ${validation.errors
        .map((error) => error.code)
        .join(", ")}`,
    );
  }
  return plan;
}
