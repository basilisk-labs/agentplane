import type {
  Blueprint,
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
  intake: "deterministic",
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
  handoff: "record",
  finish: "deterministic",
} as const satisfies Record<BlueprintNodeKind, BlueprintNode["mode"]>;

function node(spec: NodeSpec): BlueprintNode {
  return {
    id: spec.kind,
    kind: spec.kind,
    mode: spec.mode ?? NODE_MODE_BY_KIND[spec.kind],
    required: true,
    ...(spec.protected ? { protected: true } : {}),
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

function evidence(
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

function blueprint(opts: {
  id: BlueprintId;
  title: string;
  description: string;
  taskKinds: readonly TaskKind[];
  workflowModes?: readonly WorkflowMode[];
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
    ],
  };
}

const analysisNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "context_resolve", evidence: ["context_manifest", "sources"] }),
  node({ kind: "work_unit", evidence: ["weak_links", "final_output"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["final_output"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

const contentNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "context_resolve", evidence: ["context_manifest", "sources"] }),
  node({ kind: "work_unit", evidence: ["artifact", "final_output"] }),
  node({ kind: "deterministic_check", evidence: ["check_result"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["final_output"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

const docsNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "context_resolve", evidence: ["context_manifest"] }),
  node({ kind: "work_unit", evidence: ["changed_paths", "artifact"] }),
  node({ kind: "deterministic_check", evidence: ["check_result"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

const codeDirectNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({ kind: "context_resolve", evidence: ["context_manifest"] }),
  node({ kind: "work_unit", evidence: ["changed_paths"] }),
  node({ kind: "deterministic_check", evidence: ["check_result"] }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

const codeBranchPrNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({ kind: "context_resolve", evidence: ["context_manifest"] }),
  node({ kind: "worktree_start", evidence: ["changed_paths"], protected: true }),
  node({ kind: "work_unit", evidence: ["changed_paths"] }),
  node({ kind: "fast_local_checks", evidence: ["check_result"] }),
  node({ kind: "pr_artifact", evidence: ["artifact", "external_link"] }),
  node({ kind: "hosted_checks", evidence: ["check_result", "external_link"] }),
  node({ kind: "publish_or_integrate", evidence: ["commit", "external_link"], protected: true }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

const releaseNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({ kind: "context_resolve", evidence: ["context_manifest"] }),
  node({ kind: "work_unit", evidence: ["artifact"] }),
  node({ kind: "deterministic_check", evidence: ["check_result"] }),
  node({ kind: "publish_or_integrate", evidence: ["commit", "external_link"], protected: true }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

const opsNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions", "rollback"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({ kind: "context_resolve", evidence: ["context_manifest"] }),
  node({ kind: "work_unit", evidence: ["artifact", "rollback"] }),
  node({ kind: "deterministic_check", evidence: ["check_result"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

export const BUILTIN_BLUEPRINTS = [
  blueprint({
    id: "analysis.light",
    title: "Lightweight analysis",
    description: "Read-only analysis, research, review synthesis, and evidence-backed answers.",
    taskKinds: ["analysis"],
    nodes: analysisNodes,
    requiredEvidence: [
      evidence("analysis.sources", "sources", "context_resolve", "Sources used for analysis."),
      evidence("analysis.assumptions", "assumptions", "scope", "Assumptions and constraints."),
      evidence("analysis.weak_links", "weak_links", "work_unit", "Weak links or uncertainty."),
      evidence("analysis.final", "final_output", "work_unit", "Final answer or report."),
    ],
  }),
  blueprint({
    id: "content.light",
    title: "Lightweight content",
    description: "Content drafts and editorial artifacts that do not change product code.",
    taskKinds: ["content"],
    nodes: contentNodes,
    requiredEvidence: [
      evidence("content.sources", "sources", "context_resolve", "Source or product facts used."),
      evidence("content.check", "check_result", "deterministic_check", "Style or editorial check."),
      evidence("content.final", "final_output", "work_unit", "Final content artifact."),
    ],
  }),
  blueprint({
    id: "docs.change",
    title: "Documentation change",
    description: "Repository documentation and policy-adjacent prose changes.",
    taskKinds: ["docs"],
    workflowModes: ["direct", "branch_pr"],
    nodes: docsNodes,
    requiredEvidence: [
      evidence("docs.paths", "changed_paths", "work_unit", "Changed documentation paths."),
      evidence("docs.check", "check_result", "deterministic_check", "Documentation checks."),
      evidence("docs.artifact", "artifact", "artifact_write", "Updated documentation artifact."),
    ],
  }),
  blueprint({
    id: "code.direct",
    title: "Direct code change",
    description: "Code mutation in direct workflow mode.",
    taskKinds: ["code"],
    workflowModes: ["direct"],
    nodes: codeDirectNodes,
    requiredEvidence: [
      evidence("code_direct.paths", "changed_paths", "work_unit", "Changed source paths."),
      evidence("code_direct.check", "check_result", "deterministic_check", "Focused checks."),
      evidence("code_direct.commit", "commit", "finish", "Close commit."),
    ],
  }),
  blueprint({
    id: "code.branch_pr",
    title: "Branch PR code change",
    description: "Code mutation in branch PR workflow mode.",
    taskKinds: ["code"],
    workflowModes: ["branch_pr"],
    nodes: codeBranchPrNodes,
    requiredEvidence: [
      evidence("code_pr.paths", "changed_paths", "work_unit", "Changed source paths."),
      evidence("code_pr.fast_checks", "check_result", "fast_local_checks", "Fast local checks."),
      evidence("code_pr.pr", "external_link", "pr_artifact", "Pull request artifact."),
      evidence("code_pr.hosted", "check_result", "hosted_checks", "Hosted check evidence."),
      evidence("code_pr.commit", "commit", "publish_or_integrate", "Integration commit."),
    ],
  }),
  blueprint({
    id: "release.strict",
    title: "Strict release",
    description: "Version, package, publish, and distribution work.",
    taskKinds: ["release"],
    workflowModes: ["direct", "branch_pr"],
    nodes: releaseNodes,
    requiredEvidence: [
      evidence("release.approval", "approval", "approval_gate", "Release approval."),
      evidence("release.plan", "artifact", "work_unit", "Release plan or candidate artifact."),
      evidence("release.check", "check_result", "deterministic_check", "Release gates."),
      evidence("release.publish", "external_link", "publish_or_integrate", "Publish evidence."),
      evidence("release.commit", "commit", "publish_or_integrate", "Release commit."),
    ],
  }),
  blueprint({
    id: "ops.approval",
    title: "Approval-gated operations",
    description:
      "Operational changes touching external systems, credentials, deployments, or config.",
    taskKinds: ["ops"],
    nodes: opsNodes,
    requiredEvidence: [
      evidence("ops.approval", "approval", "approval_gate", "Operational approval."),
      evidence("ops.rollback", "rollback", "scope", "Rollback or recovery path."),
      evidence("ops.action", "artifact", "work_unit", "Action log or operational artifact."),
      evidence("ops.check", "check_result", "deterministic_check", "Post-action check."),
    ],
  }),
] as const satisfies readonly Blueprint[];
