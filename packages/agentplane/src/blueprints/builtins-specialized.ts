import type { Blueprint } from "./model.js";
import { blueprint, evidence, extendNodeEvidence, node } from "./builtin-builder.js";
import { branchPrPolicyModules, codeBranchPrNodes } from "./builtin-routes.js";

const benchmarkNodes = extendNodeEvidence(codeBranchPrNodes, {
  work_unit: ["artifact"],
  verify_record: ["final_output"],
});

const regressionNodes = extendNodeEvidence(codeBranchPrNodes, {
  context_resolve: ["artifact"],
  work_unit: ["check_result"],
  verify_record: ["weak_links"],
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
] as const satisfies readonly Blueprint[];
