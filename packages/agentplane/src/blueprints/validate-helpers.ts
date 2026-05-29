import type {
  Blueprint,
  BlueprintNodeKind,
  BlueprintValidationProblem,
  WorkflowMode,
} from "./model.js";
import type { BlueprintPlanValidationProblem } from "./model-core.js";

export function problem(
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

export function planProblem(
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

export function hasText(value: string): boolean {
  return value.trim().length > 0;
}

export function findDuplicates(values: readonly string[]): string[] {
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

export function nodeKinds(blueprint: Blueprint): Set<BlueprintNodeKind> {
  return new Set(blueprint.nodes.map((node) => node.kind));
}

export function nodeIds(blueprint: Blueprint): Set<string> {
  return new Set(blueprint.nodes.map((node) => node.id));
}

export function collectEntryNodeIds(blueprint: Blueprint): string[] {
  const incoming = new Set(blueprint.edges.map((edge) => edge.to));
  return blueprint.nodes.map((node) => node.id).filter((id) => !incoming.has(id));
}

export function hasCycle(blueprint: Blueprint): boolean {
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

export function evidenceKindsByProducer(blueprint: Blueprint): Map<string, Set<string>> {
  const byNode = new Map<string, Set<string>>();
  for (const node of blueprint.nodes) {
    byNode.set(node.id, node.evidence ? new Set(node.evidence) : new Set());
  }
  return byNode;
}

export function blueprintPolicyModuleSet(blueprint: Blueprint): Set<string> {
  return new Set([
    ...blueprint.policyModules,
    ...blueprint.nodes.flatMap((node) => node.policyModules ?? []),
  ]);
}

export function hasEdge(blueprint: Blueprint, from: string, to: string): boolean {
  return blueprint.edges.some((edge) => edge.from === from && edge.to === to);
}

export function isPolicyModulePath(value: string): boolean {
  return value.startsWith(".agentplane/policy/");
}

export function hasWorkflowModes(blueprint: Blueprint, expected: readonly WorkflowMode[]): boolean {
  const actual = blueprint.workflowModes ?? [];
  return actual.length === expected.length && expected.every((mode) => actual.includes(mode));
}

export function hasApprovalGate(blueprint: Blueprint): boolean {
  return blueprint.nodes.some((node) => node.kind === "approval_gate");
}

export function hasRollbackEvidence(blueprint: Blueprint): boolean {
  return blueprint.requiredEvidence.some((evidence) => evidence.kind === "rollback");
}
