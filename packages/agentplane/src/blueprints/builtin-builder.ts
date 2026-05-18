import type {
  Blueprint,
  BlueprintContextBudget,
  BlueprintEdge,
  BlueprintId,
  BlueprintNode,
  BlueprintNodeKind,
  EvidenceKind,
  EvidenceRequirement,
  StopRule,
  TaskKind,
  WorkflowMode,
} from "./model.js";

type NodeSpec = {
  kind: BlueprintNodeKind;
  mode?: BlueprintNode["mode"];
  evidence?: readonly EvidenceKind[];
  protected?: boolean;
  allowedCommands?: readonly string[];
  policyModules?: readonly string[];
};

const CORE_STOP_RULES: readonly StopRule[] = [
  {
    id: "required_evidence_missing",
    severity: "stop",
    reason: "Required blueprint evidence cannot be produced.",
  },
  {
    id: "protected_lifecycle_override",
    severity: "stop",
    reason: "A route or recipe attempts to override protected lifecycle behavior.",
  },
];

const NODE_MODE_BY_KIND = {
  intake: "agentic",
  scope: "deterministic",
  context_resolve: "deterministic",
  approval_gate: "approval",
  worktree_start: "deterministic",
  work_unit: "agentic",
  deterministic_check: "deterministic",
  fast_local_checks: "deterministic",
  artifact_write: "deterministic",
  pr_artifact: "deterministic",
  hosted_checks: "deterministic",
  publish_or_integrate: "deterministic",
  verify_record: "record",
  quality_gate: "agentic",
  handoff: "record",
  finish: "deterministic",
} as const satisfies Record<BlueprintNodeKind, BlueprintNode["mode"]>;

export function node(spec: NodeSpec): BlueprintNode {
  return {
    id: spec.kind,
    kind: spec.kind,
    mode: spec.mode ?? NODE_MODE_BY_KIND[spec.kind],
    required: true,
    ...(spec.protected ? { protected: true } : {}),
    ...(spec.allowedCommands ? { allowedCommands: spec.allowedCommands } : {}),
    ...(spec.policyModules ? { policyModules: spec.policyModules } : {}),
    ...(spec.evidence ? { evidence: spec.evidence } : {}),
  };
}

function edgesFor(nodes: readonly BlueprintNode[]): BlueprintEdge[] {
  return nodes.slice(0, -1).map((current, index) => {
    const next = nodes[index + 1];
    if (!next) {
      throw new Error(`Blueprint edge construction failed after ${current.id}`);
    }
    return { from: current.id, to: next.id };
  });
}

export function evidence(
  id: string,
  kind: EvidenceKind,
  producedBy: BlueprintNodeKind,
  description: string,
): EvidenceRequirement {
  return {
    id,
    kind,
    producedBy,
    required: true,
    description,
  };
}

export function blueprint(opts: {
  id: BlueprintId;
  title: string;
  description: string;
  taskKinds: readonly TaskKind[];
  workflowModes?: readonly WorkflowMode[];
  allowedCommands: readonly string[];
  policyModules: readonly string[];
  contextBudget: BlueprintContextBudget;
  nodes: readonly BlueprintNode[];
  requiredEvidence: readonly EvidenceRequirement[];
  stopRules?: readonly StopRule[];
}): Blueprint {
  return {
    id: opts.id,
    version: 1,
    title: opts.title,
    description: opts.description,
    taskKinds: opts.taskKinds,
    ...(opts.workflowModes ? { workflowModes: opts.workflowModes } : {}),
    allowedCommands: opts.allowedCommands,
    policyModules: opts.policyModules,
    contextBudget: opts.contextBudget,
    nodes: opts.nodes,
    edges: edgesFor(opts.nodes),
    requiredEvidence: opts.requiredEvidence,
    stopRules: [...CORE_STOP_RULES, ...(opts.stopRules ?? [])],
    recipeExtensionPoints: [
      {
        nodeKind: "context_resolve",
        allowed: ["context_hint", "risk_hint"],
        rejected: ["policy_override", "permission_bypass"],
      },
      {
        nodeKind: "work_unit",
        allowed: ["output_schema", "artifact_template"],
        rejected: ["lifecycle_replacement"],
      },
      {
        nodeKind: "deterministic_check",
        allowed: ["check_suggestion"],
        rejected: ["required_check_disable"],
      },
      {
        nodeKind: "verify_record",
        allowed: ["evidence_requirement"],
        rejected: ["verification_bypass"],
      },
      {
        nodeKind: "quality_gate",
        allowed: ["evidence_requirement", "risk_hint"],
        rejected: ["quality_bypass", "self_review"],
      },
    ],
  };
}

export function extendNodeEvidence(
  nodes: readonly BlueprintNode[],
  evidenceByKind: Partial<Record<BlueprintNodeKind, readonly EvidenceKind[]>>,
): BlueprintNode[] {
  return nodes.map((item) => {
    const extra = evidenceByKind[item.kind] ?? [];
    if (extra.length === 0) return item;
    return {
      ...item,
      evidence: [...new Set([...(item.evidence ?? []), ...extra])],
    };
  });
}
