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

const branchPrPolicyModules = [
  ".agentplane/policy/security.must.md",
  ".agentplane/policy/dod.core.md",
  ".agentplane/policy/dod.code.md",
  ".agentplane/policy/workflow.branch_pr.md",
] as const;

const codeBranchPrNodes = [
  node({ kind: "intake" }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "approval_gate", evidence: ["approval"], protected: true }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest"],
    policyModules: branchPrPolicyModules,
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

const postRunImprovementNodes = [
  node({ kind: "intake", evidence: ["sources"] }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({ kind: "context_resolve", evidence: ["artifact"] }),
  node({ kind: "work_unit", evidence: ["weak_links"] }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "approval_gate", mode: "approval", evidence: ["approval"], protected: true }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "handoff", evidence: ["final_output"] }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

export const SPECIALIZED_CODE_BLUEPRINTS = [
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
    policyModules: branchPrPolicyModules,
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
    policyModules: branchPrPolicyModules,
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
    id: "post_run.improvement_review",
    title: "Post-run improvement review",
    description:
      "Post-complex-task review that analyzes work logs for code-fixable errors, creates atomic follow-up tasks, and asks whether to execute them now or defer.",
    taskKinds: ["code", "analysis"],
    workflowModes: ["branch_pr"],
    allowedCommands: [
      "agentplane task list --status DOING --status TODO",
      "work log or terminal history inspection",
      "agentplane task new --title <title> --description <description> --owner <ROLE> --tag <tag>",
      "agentplane task plan set <task-id> --text <plan>",
      "agentplane task plan approve <task-id> --by ORCHESTRATOR",
      "ask user whether to execute created tasks now or defer",
      "agentplane verify <task-id> --ok|--rework",
      "agentplane finish <task-id> --commit <git-rev>",
    ],
    policyModules: branchPrPolicyModules,
    contextBudget: {
      maxPolicyModules: 4,
      maxPromptBlocks: 18,
      rationale:
        "Post-run review needs the normal branch_pr policy plus enough context for logs, observed failures, and follow-up task graph evidence.",
    },
    nodes: postRunImprovementNodes,
    requiredEvidence: [
      evidence(
        "post_run.work_log",
        "artifact",
        "context_resolve",
        "Work log, terminal summary, PR/check history, or task transcript inspected.",
      ),
      evidence(
        "post_run.fixable_errors",
        "weak_links",
        "work_unit",
        "Concrete errors or workflow failures that are fixable in repository code.",
      ),
      evidence(
        "post_run.atomic_tasks",
        "artifact",
        "artifact_write",
        "Created atomic AgentPlane tasks for each fixable issue, or explicit no-fixable-issue evidence.",
      ),
      evidence(
        "post_run.execute_or_defer_decision",
        "approval",
        "approval_gate",
        "User decision to execute the created tasks immediately or defer them.",
      ),
      evidence(
        "post_run.review_verdict",
        "check_result",
        "verify_record",
        "Verification that the review inspected available logs and gated execution behind the user decision.",
      ),
      evidence(
        "post_run.handoff",
        "final_output",
        "handoff",
        "Summary of task ids, priorities, dependencies, and recommended next action.",
      ),
      evidence("post_run.commit", "commit", "finish", "Integrated review or blueprint commit."),
    ],
    stopRules: [
      {
        id: "post_run_tasks_before_decision",
        severity: "stop",
        reason:
          "The review may create follow-up tasks for fixable issues, but must not execute them before the user chooses execute-now or defer.",
      },
      {
        id: "post_run_uninspected_logs",
        severity: "warn",
        reason:
          "Post-run improvement review should cite inspected work logs or explicitly state that no logs were available.",
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
    policyModules: branchPrPolicyModules,
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
] as const satisfies readonly Blueprint[];
