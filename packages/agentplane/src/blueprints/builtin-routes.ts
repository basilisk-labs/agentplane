import { node } from "./builtin-builder.js";

export const branchPrPolicyModules = [
  ".agentplane/policy/security.must.md",
  ".agentplane/policy/dod.core.md",
  ".agentplane/policy/dod.code.md",
  ".agentplane/policy/workflow.branch_pr.md",
] as const;

export const codeBranchPrNodes = [
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
