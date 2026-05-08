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
    ],
  };
}

const analysisNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest", "sources"],
    policyModules: [],
  }),
  node({ kind: "work_unit", evidence: ["weak_links", "final_output"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["final_output"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

const contentNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest", "sources"],
    policyModules: [],
  }),
  node({ kind: "work_unit", evidence: ["artifact", "final_output"] }),
  node({ kind: "deterministic_check", evidence: ["check_result"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["final_output"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

const docsNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest"],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.docs.md",
    ],
  }),
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
  node({
    kind: "context_resolve",
    evidence: ["context_manifest"],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.direct.md",
    ],
  }),
  node({ kind: "work_unit", evidence: ["changed_paths"] }),
  node({
    kind: "deterministic_check",
    evidence: ["check_result"],
    allowedCommands: ["agentplane task verify-show <task-id>", "project focused checks"],
  }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

const codeBranchPrNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest"],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.branch_pr.md",
    ],
  }),
  node({
    kind: "worktree_start",
    evidence: ["changed_paths"],
    protected: true,
    allowedCommands: ["agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree"],
  }),
  node({ kind: "work_unit", evidence: ["changed_paths"] }),
  node({
    kind: "fast_local_checks",
    evidence: ["check_result"],
    allowedCommands: ["agentplane task verify-show <task-id>", "project focused checks"],
  }),
  node({
    kind: "pr_artifact",
    evidence: ["artifact", "external_link"],
    allowedCommands: ["agentplane pr open <task-id> --branch <branch> --author <ROLE>"],
  }),
  node({ kind: "hosted_checks", evidence: ["check_result", "external_link"] }),
  node({
    kind: "publish_or_integrate",
    evidence: ["commit", "external_link"],
    protected: true,
    allowedCommands: ["agentplane integrate <task-id> --branch <branch> --run-verify"],
  }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

function extendNodeEvidence(
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

const benchmarkNodes = extendNodeEvidence(codeBranchPrNodes, {
  work_unit: ["artifact"],
  verify_record: ["final_output"],
});

const regressionNodes = extendNodeEvidence(codeBranchPrNodes, {
  context_resolve: ["artifact"],
  work_unit: ["check_result"],
  verify_record: ["weak_links"],
});

const runnerNodes = extendNodeEvidence(codeBranchPrNodes, {
  context_resolve: ["artifact"],
  work_unit: ["artifact"],
  fast_local_checks: ["artifact"],
});

const releaseNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest"],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.release.md",
    ],
  }),
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
  node({
    kind: "context_resolve",
    evidence: ["context_manifest"],
    policyModules: [".agentplane/policy/security.must.md", ".agentplane/policy/dod.core.md"],
  }),
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
    allowedCommands: [],
    policyModules: [],
    contextBudget: {
      maxPolicyModules: 0,
      maxPromptBlocks: 6,
      rationale:
        "Lightweight analysis should load sources and task context without policy modules.",
    },
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
    allowedCommands: ["editorial or formatting checks"],
    policyModules: [],
    contextBudget: {
      maxPolicyModules: 0,
      maxPromptBlocks: 8,
      rationale:
        "Content work should favor source material and recipe context over workflow policy.",
    },
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
    allowedCommands: [
      "agentplane task verify-show <task-id>",
      "documentation checks",
      "agentplane verify <task-id> --ok|--rework",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.docs.md",
    ],
    contextBudget: {
      maxPolicyModules: 3,
      maxPromptBlocks: 10,
      rationale: "Documentation changes need docs DoD and minimal workflow/security policy.",
    },
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
    allowedCommands: [
      "agentplane task verify-show <task-id>",
      "project focused checks",
      "agentplane verify <task-id> --ok|--rework",
      "agentplane finish <task-id>",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.direct.md",
    ],
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 12,
      rationale: "Direct code work needs code DoD plus the active direct workflow contract.",
    },
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
    allowedCommands: [
      "agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree",
      "agentplane task verify-show <task-id>",
      "project focused checks",
      "agentplane pr open <task-id> --branch <branch> --author <ROLE>",
      "agentplane verify <task-id> --ok|--rework",
      "agentplane integrate <task-id> --branch <branch> --run-verify",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.branch_pr.md",
    ],
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 14,
      rationale: "Branch PR code work needs code DoD, branch_pr route policy, and evidence checks.",
    },
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
    id: "performance.benchmark",
    title: "Performance benchmark",
    description:
      "Code mutation that makes or protects performance claims and must prove baseline, method, threshold, and comparison quality.",
    taskKinds: ["code"],
    workflowModes: ["branch_pr"],
    allowedCommands: [
      "agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree",
      "agentplane task verify-show <task-id>",
      "benchmark baseline command",
      "benchmark comparison command",
      "project focused checks",
      "agentplane pr open <task-id> --branch <branch> --author <ROLE>",
      "agentplane verify <task-id> --ok|--rework",
      "agentplane integrate <task-id> --branch <branch> --run-verify",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.branch_pr.md",
    ],
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 16,
      rationale:
        "Benchmark work needs normal branch_pr code policy plus room for baseline and comparison artifacts.",
    },
    nodes: benchmarkNodes,
    requiredEvidence: [
      evidence("benchmark.baseline", "artifact", "work_unit", "Baseline measurement artifact."),
      evidence(
        "benchmark.method",
        "assumptions",
        "scope",
        "Benchmark method, environment, and warm/cold mode.",
      ),
      evidence(
        "benchmark.runs",
        "check_result",
        "fast_local_checks",
        "Run count and raw measurement results.",
      ),
      evidence(
        "benchmark.threshold",
        "assumptions",
        "scope",
        "Accepted threshold or noise tolerance.",
      ),
      evidence(
        "benchmark.comparison",
        "check_result",
        "hosted_checks",
        "Before/after comparison result.",
      ),
      evidence(
        "benchmark.verdict",
        "final_output",
        "verify_record",
        "Faster, slower, unchanged, or noisy verdict.",
      ),
      evidence("benchmark.commit", "commit", "publish_or_integrate", "Integration commit."),
    ],
    stopRules: [
      {
        id: "benchmark_without_baseline",
        severity: "stop",
        reason: "Performance claims require a baseline and comparison artifact.",
      },
      {
        id: "benchmark_noisy_without_verdict",
        severity: "approval_required",
        reason: "Noisy benchmark results require an explicit verifier verdict before finish.",
      },
    ],
  }),
  blueprint({
    id: "quality.regression",
    title: "Quality regression",
    description:
      "Code mutation that fixes, prevents, or classifies failing tests, CI, coverage, lint, knip, or flaky checks.",
    taskKinds: ["code"],
    workflowModes: ["branch_pr"],
    allowedCommands: [
      "agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree",
      "agentplane task verify-show <task-id>",
      "failure reproduction command",
      "focused regression check",
      "affected matrix or full relevant gate",
      "agentplane pr open <task-id> --branch <branch> --author <ROLE>",
      "agentplane verify <task-id> --ok|--rework",
      "agentplane integrate <task-id> --branch <branch> --run-verify",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.branch_pr.md",
    ],
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 16,
      rationale:
        "Regression work needs failure evidence, focused reproduction, and the relevant quality gate.",
    },
    nodes: regressionNodes,
    requiredEvidence: [
      evidence(
        "regression.original_failure",
        "artifact",
        "context_resolve",
        "Original failure log or check output.",
      ),
      evidence(
        "regression.reproduction",
        "check_result",
        "work_unit",
        "Local reproduction or explicit non-reproduction result.",
      ),
      evidence(
        "regression.focused_check",
        "check_result",
        "fast_local_checks",
        "Focused regression check.",
      ),
      evidence(
        "regression.matrix_or_scope",
        "assumptions",
        "scope",
        "Affected test/check matrix or bounded scope.",
      ),
      evidence(
        "regression.full_gate",
        "check_result",
        "hosted_checks",
        "Full relevant gate or hosted check evidence.",
      ),
      evidence(
        "regression.flake_classification",
        "weak_links",
        "verify_record",
        "Flake classification or residual risk.",
      ),
      evidence("regression.commit", "commit", "publish_or_integrate", "Integration commit."),
    ],
    stopRules: [
      {
        id: "regression_without_failure",
        severity: "warn",
        reason:
          "Regression work should preserve the original failure or explain why it cannot be reproduced.",
      },
      {
        id: "regression_gate_skipped",
        severity: "approval_required",
        reason: "Skipping the relevant quality gate requires explicit recorded approval.",
      },
    ],
  }),
  blueprint({
    id: "runner.execution",
    title: "Runner execution",
    description:
      "Code mutation in the runner execution subsystem that must prove bundle, invocation, manifest, trace, and replay/resume behavior.",
    taskKinds: ["code"],
    workflowModes: ["branch_pr"],
    allowedCommands: [
      "agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree",
      "agentplane task verify-show <task-id>",
      "runner bundle inspection",
      "runner execution/replay/resume check",
      "project focused checks",
      "agentplane pr open <task-id> --branch <branch> --author <ROLE>",
      "agentplane verify <task-id> --ok|--rework",
      "agentplane integrate <task-id> --branch <branch> --run-verify",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.branch_pr.md",
    ],
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 16,
      rationale:
        "Runner execution work needs branch_pr policy plus runner bundle and execution-state artifacts.",
    },
    nodes: runnerNodes,
    requiredEvidence: [
      evidence(
        "runner.bundle",
        "artifact",
        "context_resolve",
        "Runner context bundle or bundle inspection.",
      ),
      evidence(
        "runner.invocation",
        "artifact",
        "work_unit",
        "Invocation inputs and command or adapter capability.",
      ),
      evidence(
        "runner.result_manifest",
        "artifact",
        "work_unit",
        "Result manifest or manifest validation.",
      ),
      evidence("runner.trace", "artifact", "fast_local_checks", "Execution trace or log path."),
      evidence(
        "runner.execution_state",
        "check_result",
        "fast_local_checks",
        "Execution state transition evidence.",
      ),
      evidence(
        "runner.replay_or_resume",
        "check_result",
        "hosted_checks",
        "Replay or resume validation.",
      ),
      evidence("runner.commit", "commit", "publish_or_integrate", "Integration commit."),
    ],
    stopRules: [
      {
        id: "runner_without_manifest",
        severity: "stop",
        reason:
          "Runner execution changes require result manifest or equivalent execution artifact evidence.",
      },
      {
        id: "runner_replay_unverified",
        severity: "approval_required",
        reason: "Replay or resume behavior must be verified or explicitly waived.",
      },
    ],
  }),
  blueprint({
    id: "release.strict",
    title: "Strict release",
    description: "Version, package, publish, and distribution work.",
    taskKinds: ["release"],
    workflowModes: ["direct", "branch_pr"],
    allowedCommands: [
      "agentplane task verify-show <task-id>",
      "release gates",
      "publish commands after approval",
      "agentplane verify <task-id> --ok|--rework",
    ],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/workflow.release.md",
    ],
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 16,
      rationale:
        "Release work needs strict release policy, approval evidence, and rollback context.",
    },
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
    allowedCommands: [
      "agentplane task verify-show <task-id>",
      "approved operational command",
      "agentplane verify <task-id> --ok|--rework",
    ],
    policyModules: [".agentplane/policy/security.must.md", ".agentplane/policy/dod.core.md"],
    contextBudget: {
      maxPolicyModules: 2,
      maxPromptBlocks: 12,
      rationale: "Ops work needs security and rollback context before any external action.",
    },
    nodes: opsNodes,
    requiredEvidence: [
      evidence("ops.approval", "approval", "approval_gate", "Operational approval."),
      evidence("ops.rollback", "rollback", "scope", "Rollback or recovery path."),
      evidence("ops.action", "artifact", "work_unit", "Action log or operational artifact."),
      evidence("ops.check", "check_result", "deterministic_check", "Post-action check."),
    ],
  }),
] as const satisfies readonly Blueprint[];
