import type { BlueprintNodeKind, EvidenceKind, WorkflowMode } from "../blueprints/model.js";

export type LifecycleRole = "ORCHESTRATOR" | "PLANNER" | "CODER" | "EVALUATOR" | "INTEGRATOR";
export type LifecycleCwd = "base_checkout" | "task_worktree" | "current_checkout";
export type LifecycleSideEffect = "none" | "task_state" | "git_local" | "git_remote";

export type LifecycleBlueprintNodeSpec = {
  kind: BlueprintNodeKind;
  evidence?: readonly EvidenceKind[];
  protected?: boolean;
  allowedCommands?: readonly string[];
  policyModules?: readonly string[];
};

export type LifecycleCommandStep = {
  id: string;
  command: string;
  role: LifecycleRole;
  cwd: LifecycleCwd;
  sideEffects: readonly LifecycleSideEffect[];
};

export type WorkflowLifecycleContract = {
  mode: WorkflowMode;
  blueprintId: "code.direct" | "code.branch_pr";
  blueprintNodes: readonly LifecycleBlueprintNodeSpec[];
  commandSteps: readonly LifecycleCommandStep[];
  gatewayCommandOrder: readonly string[];
  docsCommandOrder: readonly string[];
  quickstartCommandOrder: readonly string[];
};

const codePolicyModules = [
  ".agentplane/policy/security.must.md",
  ".agentplane/policy/dod.core.md",
  ".agentplane/policy/dod.code.md",
] as const;

export const CODE_WORKFLOW_LIFECYCLE_CONTRACTS = {
  direct: {
    mode: "direct",
    blueprintId: "code.direct",
    blueprintNodes: [
      { kind: "intake" },
      { kind: "scope", evidence: ["assumptions"] },
      { kind: "approval_gate", evidence: ["approval"], protected: true },
      {
        kind: "context_resolve",
        evidence: ["context_manifest"],
        policyModules: [...codePolicyModules, ".agentplane/policy/workflow.direct.md"],
      },
      { kind: "work_unit", evidence: ["changed_paths"] },
      {
        kind: "deterministic_check",
        evidence: ["check_result"],
        allowedCommands: ["agentplane task verify-show <task-id>", "project focused checks"],
      },
      { kind: "verify_record", evidence: ["check_result"], protected: true },
      {
        kind: "quality_gate",
        evidence: ["quality_report"],
        protected: true,
        allowedCommands: ["agentplane verify <task-id> --ok|--rework --by EVALUATOR"],
      },
      { kind: "finish", evidence: ["commit"], protected: true },
    ],
    commandSteps: [
      {
        id: "task_new",
        command: "agentplane task new",
        role: "ORCHESTRATOR",
        cwd: "current_checkout",
        sideEffects: ["task_state"],
      },
      {
        id: "plan_set",
        command: "agentplane task plan set",
        role: "PLANNER",
        cwd: "current_checkout",
        sideEffects: ["task_state"],
      },
      {
        id: "plan_approve",
        command: "agentplane task plan approve",
        role: "ORCHESTRATOR",
        cwd: "current_checkout",
        sideEffects: ["task_state"],
      },
      {
        id: "start_ready",
        command: "agentplane task start-ready",
        role: "CODER",
        cwd: "current_checkout",
        sideEffects: ["task_state"],
      },
      {
        id: "verify_show",
        command: "agentplane task verify-show",
        role: "CODER",
        cwd: "current_checkout",
        sideEffects: ["none"],
      },
      {
        id: "verify",
        command: "agentplane verify",
        role: "CODER",
        cwd: "current_checkout",
        sideEffects: ["task_state"],
      },
      {
        id: "quality_gate",
        command: "agentplane verify",
        role: "EVALUATOR",
        cwd: "current_checkout",
        sideEffects: ["task_state"],
      },
      {
        id: "finish",
        command: "agentplane finish",
        role: "CODER",
        cwd: "current_checkout",
        sideEffects: ["task_state", "git_local"],
      },
    ],
    gatewayCommandOrder: [
      "task new",
      "task plan set",
      "task plan approve",
      "task start-ready",
      "verify",
      "finish",
    ],
    docsCommandOrder: [
      "task plan approve",
      "task start-ready",
      "task verify-show",
      "verify",
      "verify --by EVALUATOR",
      "finish",
    ],
    quickstartCommandOrder: [
      "task new",
      "task plan set",
      "task plan approve",
      "task start-ready",
      "task verify-show",
    ],
  },
  branch_pr: {
    mode: "branch_pr",
    blueprintId: "code.branch_pr",
    blueprintNodes: [
      { kind: "intake" },
      { kind: "scope", evidence: ["assumptions"] },
      { kind: "approval_gate", evidence: ["approval"], protected: true },
      {
        kind: "context_resolve",
        evidence: ["context_manifest"],
        policyModules: [...codePolicyModules, ".agentplane/policy/workflow.branch_pr.md"],
      },
      {
        kind: "worktree_start",
        evidence: ["changed_paths"],
        protected: true,
        allowedCommands: [
          "agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree",
        ],
      },
      { kind: "work_unit", evidence: ["changed_paths"] },
      {
        kind: "fast_local_checks",
        evidence: ["check_result"],
        allowedCommands: ["agentplane task verify-show <task-id>", "project focused checks"],
      },
      {
        kind: "pr_artifact",
        evidence: ["artifact", "external_link"],
        allowedCommands: ["agentplane pr open <task-id> --branch <branch> --author <ROLE>"],
      },
      { kind: "verify_record", evidence: ["check_result"], protected: true },
      {
        kind: "quality_gate",
        evidence: ["quality_report"],
        protected: true,
        allowedCommands: ["agentplane verify <task-id> --ok|--rework --by EVALUATOR"],
      },
      { kind: "hosted_checks", evidence: ["check_result", "external_link"] },
      {
        kind: "publish_or_integrate",
        evidence: ["commit", "external_link"],
        protected: true,
        allowedCommands: ["agentplane integrate <task-id> --branch <branch> --run-verify"],
      },
      { kind: "finish", evidence: ["commit"], protected: true },
    ],
    commandSteps: [
      {
        id: "work_start",
        command: "agentplane work start",
        role: "ORCHESTRATOR",
        cwd: "base_checkout",
        sideEffects: ["git_local", "task_state"],
      },
      {
        id: "start_ready",
        command: "agentplane task start-ready",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["task_state"],
      },
      {
        id: "implementation_commit",
        command: "git commit",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["git_local"],
      },
      {
        id: "verify_show",
        command: "agentplane task verify-show",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["none"],
      },
      {
        id: "pr_open",
        command: "agentplane pr open",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["task_state", "git_local", "git_remote"],
      },
      {
        id: "pr_update",
        command: "agentplane pr update",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["task_state", "git_local"],
      },
      {
        id: "verify",
        command: "agentplane verify",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["task_state"],
      },
      {
        id: "quality_gate",
        command: "agentplane verify",
        role: "EVALUATOR",
        cwd: "task_worktree",
        sideEffects: ["task_state"],
      },
      {
        id: "hosted_checks",
        command: "bun run workflow:wait-remote-checks",
        role: "CODER",
        cwd: "task_worktree",
        sideEffects: ["none"],
      },
      {
        id: "integrate",
        command: "agentplane integrate",
        role: "INTEGRATOR",
        cwd: "base_checkout",
        sideEffects: ["git_local", "task_state"],
      },
      {
        id: "finish",
        command: "agentplane finish",
        role: "INTEGRATOR",
        cwd: "base_checkout",
        sideEffects: ["git_local", "task_state"],
      },
    ],
    gatewayCommandOrder: [
      "work start",
      "task start-ready",
      "git commit",
      "task verify-show",
      "pr open",
      "verify",
      "verify --by EVALUATOR",
      "integrate",
      "finish",
    ],
    docsCommandOrder: [
      "work start",
      "task start-ready",
      "git commit",
      "task verify-show",
      "pr open",
      "verify",
      "workflow:wait-remote-checks",
      "integrate",
      "finish",
    ],
    quickstartCommandOrder: ["branch_pr", "task worktree", "local PR artifacts", "INTEGRATOR"],
  },
} as const satisfies Record<WorkflowMode, WorkflowLifecycleContract>;

export function lifecycleBlueprintNodeKinds(mode: WorkflowMode): readonly BlueprintNodeKind[] {
  return CODE_WORKFLOW_LIFECYCLE_CONTRACTS[mode].blueprintNodes.map((node) => node.kind);
}
