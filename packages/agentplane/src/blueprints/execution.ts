import type {
  AcceptedRecipeExtension,
  BlueprintExecutionPlanArtifact,
  BlueprintExecutionPlanStep,
  BlueprintNodeExecutionContract,
  BlueprintPlanArtifact,
  StopReason,
} from "./model.js";

function previousStepIds(
  steps: readonly BlueprintPlanArtifact["states"][number][],
  index: number,
): string[] {
  if (index <= 0) return [];
  const previous = steps[index - 1];
  return previous ? [previous.id] : [];
}

export function blueprintExecutionPlanStep(
  state: BlueprintPlanArtifact["states"][number],
  dependsOn: readonly string[] = [],
): BlueprintExecutionPlanStep {
  return {
    nodeId: state.id,
    nodeKind: state.kind,
    mode: state.mode,
    required: state.required,
    protected: state.protected,
    dependsOn: [...dependsOn],
    allowedCommands: [...state.allowedCommands],
    policyModules: [...state.policyModules],
    expectedEvidence: [...state.evidenceKinds],
  };
}

export function blueprintNodeExecutionContract(opts: {
  plan: BlueprintPlanArtifact;
  step: BlueprintExecutionPlanStep;
  runId?: string;
  acceptedRecipeExtensions?: readonly AcceptedRecipeExtension[];
  stopReasons?: readonly StopReason[];
}): BlueprintNodeExecutionContract {
  return {
    schemaVersion: 1,
    artifactKind: "agentplane.blueprint.node_execution_contract",
    blueprintId: opts.plan.blueprintId,
    blueprintVersion: opts.plan.blueprintVersion,
    ...(opts.plan.taskId ? { taskId: opts.plan.taskId } : {}),
    ...(opts.runId ? { runId: opts.runId } : {}),
    step: opts.step,
    acceptedRecipeExtensions: [...(opts.acceptedRecipeExtensions ?? [])],
    stopReasons: [...(opts.stopReasons ?? [])],
  };
}

export function buildBlueprintExecutionPlanArtifact(opts: {
  plan: BlueprintPlanArtifact;
  runId?: string;
  generatedAt: string;
}): BlueprintExecutionPlanArtifact {
  const steps = opts.plan.states.map((state, index) =>
    blueprintExecutionPlanStep(state, previousStepIds(opts.plan.states, index)),
  );
  return {
    schemaVersion: 1,
    artifactKind: "agentplane.blueprint.execution_plan",
    blueprintId: opts.plan.blueprintId,
    blueprintVersion: opts.plan.blueprintVersion,
    ...(opts.plan.taskId ? { taskId: opts.plan.taskId } : {}),
    ...(opts.runId ? { runId: opts.runId } : {}),
    generatedAt: opts.generatedAt,
    steps,
    nodeContracts: steps.map((step) =>
      blueprintNodeExecutionContract({
        plan: opts.plan,
        step,
        runId: opts.runId,
        acceptedRecipeExtensions: opts.plan.acceptedRecipeExtensions,
        stopReasons: opts.plan.stopReasons,
      }),
    ),
  };
}
