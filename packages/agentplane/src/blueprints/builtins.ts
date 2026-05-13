import type { Blueprint } from "./model.js";
import { SPECIALIZED_CODE_BLUEPRINTS } from "./builtins-specialized.js";
import { blueprint, evidence, node } from "./builtin-builder.js";
import { codeBranchPrNodes } from "./builtin-routes.js";

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

const contextAssimilationNodes = [
  node({ kind: "intake", evidence: ["sources"] }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest", "sources"],
    policyModules: [".agentplane/policy/security.must.md", ".agentplane/policy/dod.core.md"],
  }),
  node({ kind: "work_unit", evidence: ["changed_paths", "artifact", "weak_links"] }),
  node({
    kind: "deterministic_check",
    evidence: ["check_result"],
    allowedCommands: [
      "agentplane context verify-task <task-id>",
      "agentplane context doctor",
      "agentplane context graph validate",
      "agentplane acr check <task-id>",
    ],
  }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["check_result"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
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
  ...SPECIALIZED_CODE_BLUEPRINTS,
  blueprint({
    id: "context.assimilation",
    title: "Context assimilation",
    description:
      "Assimilate selected raw sources into local wiki, optional capability proposals, and durable derived knowledge through an explicit CURATOR task.",
    taskKinds: ["context"],
    workflowModes: ["direct", "branch_pr"],
    allowedCommands: [
      "agentplane context verify-task <task-id>",
      "agentplane context doctor",
      "agentplane context graph validate",
      "agentplane context search <query> --format json",
      "agentplane acr generate <task-id> --write",
      "agentplane acr check <task-id>",
      "agentplane verify <task-id> --ok|--rework",
    ],
    policyModules: [".agentplane/policy/security.must.md", ".agentplane/policy/dod.core.md"],
    contextBudget: {
      maxPolicyModules: 2,
      maxPromptBlocks: 14,
      rationale:
        "Context assimilation needs source-set policy, mutation boundaries, and evidence checks without loading code or release policy by default.",
    },
    nodes: contextAssimilationNodes,
    requiredEvidence: [
      evidence("context.sources", "sources", "intake", "Selected raw source set and hashes."),
      evidence(
        "context.policies",
        "context_manifest",
        "context_resolve",
        "Context manifest and policy files read for the task.",
      ),
      evidence(
        "context.changed_paths",
        "changed_paths",
        "work_unit",
        "Wiki, derived, capability, task, and ACR paths changed by the assimilation.",
      ),
      evidence(
        "context.artifacts",
        "artifact",
        "artifact_write",
        "Updated wiki pages, facts/entities/edges/provenance rows, or capability proposals.",
      ),
      evidence(
        "context.verification",
        "check_result",
        "deterministic_check",
        "context verify-task, doctor, graph validation, search, and ACR check results.",
      ),
      evidence("context.commit", "commit", "finish", "Close or integration commit."),
    ],
    stopRules: [
      {
        id: "context_without_source_refs",
        severity: "stop",
        reason: "Context-derived claims require source_refs or an explicit no-source reason.",
      },
      {
        id: "context_forbidden_output",
        severity: "stop",
        reason:
          "Context tasks must not mutate raw sources or service projections unless explicitly allowed.",
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
