import type {
  AcceptedRecipeExtension,
  BlueprintExecutionCheckProblem,
  BlueprintExecutionCheckResult,
  BlueprintExecutionPlanArtifact,
  BlueprintExecutionPlanStep,
  BlueprintExecutionStateArtifact,
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

function checkProblem(
  code: BlueprintExecutionCheckProblem["code"],
  message: string,
  path?: string,
): BlueprintExecutionCheckProblem {
  return path ? { code, message, path } : { code, message };
}

const COMPLETE_STATUSES = new Set(["succeeded", "skipped"]);

function completedDependencies(
  step: BlueprintExecutionPlanStep,
  stateByNodeId: ReadonlyMap<string, BlueprintExecutionStateArtifact["nodes"][number]>,
): boolean {
  return step.dependsOn.every((nodeId) => {
    const dependency = stateByNodeId.get(nodeId);
    return dependency ? COMPLETE_STATUSES.has(dependency.status) : false;
  });
}

export function checkBlueprintExecutionReplay(opts: {
  executionPlan: BlueprintExecutionPlanArtifact;
  executionState: BlueprintExecutionStateArtifact;
}): BlueprintExecutionCheckResult {
  const problems: BlueprintExecutionCheckProblem[] = [];
  if (opts.executionPlan.blueprintId !== opts.executionState.blueprintId) {
    problems.push(
      checkProblem(
        "execution_blueprint_mismatch",
        "Execution state blueprint does not match the execution plan.",
        "blueprintId",
      ),
    );
  }
  if (opts.executionPlan.blueprintVersion !== opts.executionState.blueprintVersion) {
    problems.push(
      checkProblem(
        "execution_version_mismatch",
        "Execution state blueprint version does not match the execution plan.",
        "blueprintVersion",
      ),
    );
  }
  if ((opts.executionPlan.runId ?? "") !== (opts.executionState.runId ?? "")) {
    problems.push(
      checkProblem(
        "execution_run_mismatch",
        "Execution state run id does not match the execution plan.",
        "runId",
      ),
    );
  }
  if (opts.executionState.history.length === 0) {
    problems.push(
      checkProblem("execution_missing_history", "Execution state has no replayable history."),
    );
  }

  const expectedNodeIds = new Set(opts.executionPlan.steps.map((step) => step.nodeId));
  const seenNodeIds = new Set<string>();
  for (const [index, node] of opts.executionState.nodes.entries()) {
    if (!expectedNodeIds.has(node.nodeId)) {
      problems.push(
        checkProblem(
          "execution_unknown_node_state",
          `Execution state references unknown blueprint node ${JSON.stringify(node.nodeId)}.`,
          `nodes[${index}].nodeId`,
        ),
      );
    }
    if (seenNodeIds.has(node.nodeId)) {
      problems.push(
        checkProblem(
          "execution_duplicate_node_state",
          `Execution state contains duplicate node ${JSON.stringify(node.nodeId)}.`,
          `nodes[${index}].nodeId`,
        ),
      );
    }
    seenNodeIds.add(node.nodeId);
  }
  for (const [index, step] of opts.executionPlan.steps.entries()) {
    if (!seenNodeIds.has(step.nodeId)) {
      problems.push(
        checkProblem(
          "execution_missing_node_state",
          `Execution state is missing blueprint node ${JSON.stringify(step.nodeId)}.`,
          `steps[${index}].nodeId`,
        ),
      );
    }
  }

  return { ok: problems.length === 0, problems };
}

export function checkBlueprintExecutionResume(opts: {
  executionPlan: BlueprintExecutionPlanArtifact;
  executionState: BlueprintExecutionStateArtifact;
}): BlueprintExecutionCheckResult {
  const replay = checkBlueprintExecutionReplay(opts);
  const problems = [...replay.problems];
  if (problems.length > 0) return { ok: false, problems };

  const stateByNodeId = new Map(opts.executionState.nodes.map((node) => [node.nodeId, node]));
  for (const [index, step] of opts.executionPlan.steps.entries()) {
    const nodeState = stateByNodeId.get(step.nodeId);
    if (!nodeState) continue;
    if (nodeState.status === "ready" && completedDependencies(step, stateByNodeId)) {
      return { ok: true, problems: [], nextNodeId: step.nodeId };
    }
    if (nodeState.status === "ready") {
      problems.push(
        checkProblem(
          "execution_dependency_not_complete",
          `Ready node ${JSON.stringify(step.nodeId)} has incomplete dependencies.`,
          `steps[${index}].dependsOn`,
        ),
      );
    }
  }

  problems.push(
    checkProblem("execution_no_resumable_node", "Execution state has no resumable ready node."),
  );
  return { ok: false, problems };
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

export function buildBlueprintExecutionStateArtifact(opts: {
  plan: BlueprintPlanArtifact;
  executionPlan: BlueprintExecutionPlanArtifact;
  runId?: string;
  at: string;
}): BlueprintExecutionStateArtifact {
  return {
    schemaVersion: 1,
    artifactKind: "agentplane.blueprint.execution_state",
    blueprintId: opts.plan.blueprintId,
    blueprintVersion: opts.plan.blueprintVersion,
    ...(opts.plan.taskId ? { taskId: opts.plan.taskId } : {}),
    ...(opts.runId ? { runId: opts.runId } : {}),
    nodes: opts.executionPlan.steps.map((step, index) => ({
      nodeId: step.nodeId,
      status: index === 0 ? "ready" : "pending",
      evidenceRefs: [],
      updatedAt: opts.at,
      message:
        index === 0
          ? "Node is ready because all dependencies are satisfied."
          : "Node is pending until dependencies complete.",
    })),
    history: [
      {
        schemaVersion: 1,
        at: opts.at,
        type: "planned",
        message: "Blueprint execution state initialized from deterministic plan.",
      },
    ],
  };
}
