import type {
  Blueprint,
  BlueprintNodeKind,
  BlueprintPlanArtifact,
  BlueprintPlanValidationProblem,
  BlueprintPlanValidationResult,
  BlueprintRegistry,
  BlueprintValidationProblem,
  BlueprintValidationResult,
  WorkflowMode,
} from "./model.js";

const REQUIRED_CORE_NODE_KINDS = [
  "intake",
  "scope",
  "context_resolve",
  "work_unit",
  "verify_record",
  "quality_gate",
  "finish",
] as const satisfies readonly BlueprintNodeKind[];

const ANALYSIS_CONTENT_DISALLOWED_NODE_KINDS = [
  "worktree_start",
  "fast_local_checks",
  "pr_artifact",
  "hosted_checks",
  "publish_or_integrate",
] as const satisfies readonly BlueprintNodeKind[];

function problem(
  code: BlueprintValidationProblem["code"],
  message: string,
  path?: string,
): BlueprintValidationProblem {
  return {
    code,
    message,
    ...(path ? { path } : {}),
  };
}

function planProblem(
  code: BlueprintPlanValidationProblem["code"],
  message: string,
  path?: string,
): BlueprintPlanValidationProblem {
  return {
    code,
    message,
    ...(path ? { path } : {}),
  };
}

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function findDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  return [...duplicates].toSorted();
}

function nodeKinds(blueprint: Blueprint): Set<BlueprintNodeKind> {
  return new Set(blueprint.nodes.map((node) => node.kind));
}

function nodeIds(blueprint: Blueprint): Set<string> {
  return new Set(blueprint.nodes.map((node) => node.id));
}

function collectEntryNodeIds(blueprint: Blueprint): string[] {
  const incoming = new Set(blueprint.edges.map((edge) => edge.to));
  return blueprint.nodes.map((node) => node.id).filter((id) => !incoming.has(id));
}

function hasCycle(blueprint: Blueprint): boolean {
  const adjacency = new Map<string, string[]>();
  for (const node of blueprint.nodes) {
    adjacency.set(node.id, []);
  }
  for (const edge of blueprint.edges) {
    adjacency.get(edge.from)?.push(edge.to);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();

  function visit(id: string): boolean {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;

    visiting.add(id);
    for (const next of adjacency.get(id) ?? []) {
      if (visit(next)) return true;
    }
    visiting.delete(id);
    visited.add(id);
    return false;
  }

  return blueprint.nodes.some((node) => visit(node.id));
}

function hasWorkflowModes(blueprint: Blueprint, expected: readonly WorkflowMode[]): boolean {
  const actual = blueprint.workflowModes ?? [];
  return actual.length === expected.length && expected.every((mode) => actual.includes(mode));
}

function hasApprovalGate(blueprint: Blueprint): boolean {
  return blueprint.nodes.some((node) => node.kind === "approval_gate");
}

function hasRollbackEvidence(blueprint: Blueprint): boolean {
  return blueprint.requiredEvidence.some((evidence) => evidence.kind === "rollback");
}

function evidenceKindsByProducer(blueprint: Blueprint): Map<string, Set<string>> {
  const byNode = new Map<string, Set<string>>();
  for (const node of blueprint.nodes) {
    byNode.set(node.id, node.evidence ? new Set(node.evidence) : new Set());
  }
  return byNode;
}

function validateRequiredText(blueprint: Blueprint, errors: BlueprintValidationProblem[]): void {
  if (!hasText(blueprint.id)) {
    errors.push(problem("empty_field", "Blueprint id must be non-empty.", "id"));
  }
  if (!hasText(blueprint.title)) {
    errors.push(problem("empty_field", "Blueprint title must be non-empty.", "title"));
  }
  if (!hasText(blueprint.description)) {
    errors.push(problem("empty_field", "Blueprint description must be non-empty.", "description"));
  }
  if (blueprint.taskKinds.length === 0) {
    errors.push(problem("empty_field", "Blueprint taskKinds must be non-empty.", "taskKinds"));
  }
  if (!hasText(blueprint.contextBudget.rationale)) {
    errors.push(
      problem(
        "empty_field",
        "Blueprint context budget rationale must be non-empty.",
        "contextBudget",
      ),
    );
  }
}

function validateGraph(blueprint: Blueprint, errors: BlueprintValidationProblem[]): void {
  const ids = nodeIds(blueprint);

  for (const duplicate of findDuplicates(blueprint.nodes.map((node) => node.id))) {
    errors.push(problem("duplicate_node_id", `Duplicate node id: ${duplicate}`, "nodes"));
  }

  for (const node of blueprint.nodes) {
    if (!hasText(node.id)) {
      errors.push(problem("empty_field", "Blueprint node id must be non-empty.", "nodes"));
    }
    if (node.protected && !node.required) {
      errors.push(
        problem("optional_protected_node", `Protected node must be required: ${node.id}`, "nodes"),
      );
    }
  }

  for (const edge of blueprint.edges) {
    if (!ids.has(edge.from)) {
      errors.push(
        problem("unknown_edge_node", `Edge references unknown from node: ${edge.from}`, "edges"),
      );
    }
    if (!ids.has(edge.to)) {
      errors.push(
        problem("unknown_edge_node", `Edge references unknown to node: ${edge.to}`, "edges"),
      );
    }
  }

  const entries = collectEntryNodeIds(blueprint);
  if (entries.length === 0) {
    errors.push(
      problem("missing_entry_node", "Blueprint graph must have one entry node.", "nodes"),
    );
  }
  if (entries.length > 1) {
    errors.push(
      problem(
        "multiple_entry_nodes",
        `Blueprint graph must have one entry node; found ${entries.join(", ")}.`,
        "nodes",
      ),
    );
  }

  if (hasCycle(blueprint)) {
    errors.push(problem("cycle", "Blueprint v0 graphs must be acyclic.", "edges"));
  }
}

function validateCoreNodes(blueprint: Blueprint, errors: BlueprintValidationProblem[]): void {
  const kinds = nodeKinds(blueprint);
  for (const kind of REQUIRED_CORE_NODE_KINDS) {
    if (!kinds.has(kind)) {
      errors.push(problem("missing_core_node", `Blueprint is missing required node kind: ${kind}`));
    }
  }
}

function validateEvidence(blueprint: Blueprint, errors: BlueprintValidationProblem[]): void {
  const ids = nodeIds(blueprint);
  const producerEvidence = evidenceKindsByProducer(blueprint);

  for (const duplicate of findDuplicates(blueprint.requiredEvidence.map((item) => item.id))) {
    errors.push(
      problem("duplicate_evidence_id", `Duplicate evidence requirement id: ${duplicate}`),
    );
  }

  for (const evidence of blueprint.requiredEvidence) {
    if (!hasText(evidence.id)) {
      errors.push(problem("empty_field", "Evidence requirement id must be non-empty."));
    }
    if (!hasText(evidence.description)) {
      errors.push(
        problem(
          "empty_field",
          `Evidence requirement description must be non-empty: ${evidence.id}`,
        ),
      );
    }
    if (!ids.has(evidence.producedBy)) {
      errors.push(
        problem(
          "unknown_evidence_producer",
          `Evidence ${evidence.id} references unknown producer node: ${evidence.producedBy}`,
        ),
      );
      continue;
    }
    if (!producerEvidence.get(evidence.producedBy)?.has(evidence.kind)) {
      errors.push(
        problem(
          "evidence_kind_not_produced",
          `Evidence ${evidence.id} requires ${evidence.kind} from ${evidence.producedBy}, but the node does not produce it.`,
        ),
      );
    }
  }
}

function validateStopRules(blueprint: Blueprint, errors: BlueprintValidationProblem[]): void {
  for (const duplicate of findDuplicates(blueprint.stopRules.map((rule) => rule.id))) {
    errors.push(problem("duplicate_stop_rule_id", `Duplicate stop rule id: ${duplicate}`));
  }

  for (const rule of blueprint.stopRules) {
    if (!hasText(rule.id)) {
      errors.push(problem("empty_field", "Stop rule id must be non-empty."));
    }
    if (!hasText(rule.reason)) {
      errors.push(problem("empty_field", `Stop rule reason must be non-empty: ${rule.id}`));
    }
  }
}

function validateSemanticRules(blueprint: Blueprint, errors: BlueprintValidationProblem[]): void {
  const kinds = nodeKinds(blueprint);

  if (blueprint.id === "analysis.light" || blueprint.id === "content.light") {
    for (const kind of ANALYSIS_CONTENT_DISALLOWED_NODE_KINDS) {
      if (kinds.has(kind)) {
        errors.push(
          problem(
            "disallowed_node_kind",
            `${blueprint.id} must not include code PR, CI, or publish node kind: ${kind}`,
          ),
        );
      }
    }
  }

  if (blueprint.id === "code.direct" && !hasWorkflowModes(blueprint, ["direct"])) {
    errors.push(
      problem("workflow_mode_mismatch", "code.direct must declare workflowModes: ['direct']."),
    );
  }

  if (blueprint.id === "code.branch_pr" && !hasWorkflowModes(blueprint, ["branch_pr"])) {
    errors.push(
      problem(
        "workflow_mode_mismatch",
        "code.branch_pr must declare workflowModes: ['branch_pr'].",
      ),
    );
  }

  if (blueprint.id === "release.strict" && !hasApprovalGate(blueprint)) {
    errors.push(problem("missing_approval_gate", "release.strict requires an approval gate."));
  }

  if (blueprint.id === "ops.approval") {
    if (!hasApprovalGate(blueprint)) {
      errors.push(problem("missing_approval_gate", "ops.approval requires an approval gate."));
    }
    if (!hasRollbackEvidence(blueprint)) {
      errors.push(problem("missing_rollback_evidence", "ops.approval requires rollback evidence."));
    }
  }
}

export function validateBlueprint(blueprint: Blueprint): BlueprintValidationResult {
  const errors: BlueprintValidationProblem[] = [];

  validateRequiredText(blueprint, errors);
  validateGraph(blueprint, errors);
  validateCoreNodes(blueprint, errors);
  validateEvidence(blueprint, errors);
  validateStopRules(blueprint, errors);
  validateSemanticRules(blueprint, errors);

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function validateBlueprintRegistry(registry: BlueprintRegistry): BlueprintValidationResult {
  const errors: BlueprintValidationProblem[] = [];

  for (const duplicate of findDuplicates(registry.blueprints.map((blueprint) => blueprint.id))) {
    errors.push(problem("duplicate_blueprint_id", `Duplicate blueprint id: ${duplicate}`));
  }

  for (const blueprint of registry.blueprints) {
    errors.push(...validateBlueprint(blueprint).errors);
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

function blueprintPolicyModuleSet(blueprint: Blueprint): Set<string> {
  return new Set([
    ...blueprint.policyModules,
    ...blueprint.nodes.flatMap((node) => node.policyModules ?? []),
  ]);
}

function entryNodeIds(blueprint: Blueprint): string[] {
  return collectEntryNodeIds(blueprint);
}

function hasEdge(blueprint: Blueprint, from: string, to: string): boolean {
  return blueprint.edges.some((edge) => edge.from === from && edge.to === to);
}

function isPolicyModulePath(value: string): boolean {
  return value.startsWith(".agentplane/policy/");
}

export function validateBlueprintPlanArtifact(opts: {
  blueprint: Blueprint;
  plan: BlueprintPlanArtifact;
}): BlueprintPlanValidationResult {
  const errors: BlueprintPlanValidationProblem[] = [];
  const allowedPolicyModules = blueprintPolicyModuleSet(opts.blueprint);
  const policyModules = opts.plan.policyModules.filter((item) => item.trim().length > 0);
  const policyManifestEntries = opts.plan.contextManifest.filter(
    (entry) => entry.kind === "policy_module" && isPolicyModulePath(entry.source ?? entry.id),
  );

  if (policyModules.length > opts.plan.contextBudget.maxPolicyModules) {
    errors.push(
      planProblem(
        "plan_policy_budget_exceeded",
        `Blueprint plan reports ${policyModules.length} policy modules, but the budget allows ${opts.plan.contextBudget.maxPolicyModules}.`,
        "policyModules",
      ),
    );
  }
  if (policyManifestEntries.length > opts.plan.contextBudget.maxPolicyModules) {
    errors.push(
      planProblem(
        "plan_policy_budget_exceeded",
        `Blueprint context manifest reports ${policyManifestEntries.length} policy modules, but the budget allows ${opts.plan.contextBudget.maxPolicyModules}.`,
        "contextManifest",
      ),
    );
  }

  for (const policyModule of policyModules) {
    if (!allowedPolicyModules.has(policyModule)) {
      errors.push(
        planProblem(
          "plan_unknown_policy_module",
          `Blueprint plan reports policy module outside the selected blueprint contract: ${policyModule}`,
          "policyModules",
        ),
      );
    }
  }
  for (const [index, entry] of policyManifestEntries.entries()) {
    const policyModule = entry.source ?? entry.id;
    if (!allowedPolicyModules.has(policyModule)) {
      errors.push(
        planProblem(
          "plan_unknown_context_policy_module",
          `Blueprint context manifest reports policy module outside the selected blueprint contract: ${policyModule}`,
          `contextManifest.${index}`,
        ),
      );
    }
  }

  const blueprintNodeIds = nodeIds(opts.blueprint);
  const seenStateIds = new Set<string>();
  const duplicateStateIds = new Set<string>();
  for (const state of opts.plan.states) {
    if (seenStateIds.has(state.id)) {
      duplicateStateIds.add(state.id);
    }
    seenStateIds.add(state.id);
    if (!blueprintNodeIds.has(state.id)) {
      errors.push(
        planProblem(
          "plan_unknown_state",
          `Blueprint plan state is not part of the selected blueprint graph: ${state.id}`,
          "states",
        ),
      );
    }
  }
  for (const duplicate of [...duplicateStateIds].toSorted()) {
    errors.push(
      planProblem("plan_duplicate_state", `Blueprint plan contains duplicate state: ${duplicate}`),
    );
  }

  for (const entryId of entryNodeIds(opts.blueprint)) {
    if (!seenStateIds.has(entryId)) {
      errors.push(
        planProblem(
          "plan_missing_entry_state",
          `Blueprint plan is missing entry state: ${entryId}`,
          "states",
        ),
      );
    }
  }
  const finishIds = opts.blueprint.nodes
    .filter((node) => node.kind === "finish")
    .map((node) => node.id);
  if (!finishIds.some((id) => seenStateIds.has(id))) {
    errors.push(
      planProblem(
        "plan_missing_finish_state",
        `Blueprint plan is missing finish state; expected one of: ${finishIds.join(", ")}`,
        "states",
      ),
    );
  }

  for (let index = 0; index < opts.plan.states.length - 1; index += 1) {
    const from = opts.plan.states[index]?.id;
    const to = opts.plan.states[index + 1]?.id;
    if (!from || !to || !blueprintNodeIds.has(from) || !blueprintNodeIds.has(to)) continue;
    if (!hasEdge(opts.blueprint, from, to)) {
      errors.push(
        planProblem(
          "plan_invalid_state_transition",
          `Blueprint plan transition is not allowed by the selected blueprint graph: ${from} -> ${to}`,
          `states.${index}`,
        ),
      );
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}
