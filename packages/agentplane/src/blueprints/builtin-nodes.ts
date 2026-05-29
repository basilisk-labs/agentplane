import { node } from "./builtin-builder.js";

export const analysisNodes = [
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
  node({ kind: "quality_gate", evidence: ["quality_report"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

export const contentNodes = [
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
  node({ kind: "quality_gate", evidence: ["quality_report"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

export const docsNodes = [
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
  node({ kind: "quality_gate", evidence: ["quality_report"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

export const releaseNodes = [
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
  node({ kind: "quality_gate", evidence: ["quality_report"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;

export const opsNodes = [
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
  node({ kind: "quality_gate", evidence: ["quality_report"], protected: true }),
  node({ kind: "finish", evidence: ["final_output"], protected: true }),
] as const;

export const contextAssimilationNodes = [
  node({ kind: "intake", evidence: ["sources"] }),
  node({ kind: "scope", evidence: ["assumptions"] }),
  node({
    kind: "context_resolve",
    evidence: ["context_manifest", "sources"],
    policyModules: [
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/context.must.md",
    ],
  }),
  node({ kind: "work_unit", evidence: ["changed_paths", "artifact", "weak_links"] }),
  node({
    kind: "deterministic_check",
    evidence: ["check_result"],
    allowedCommands: [
      "agentplane context reindex --include-raw",
      "agentplane context wiki lint context/wiki",
      "agentplane context wiki index context/wiki",
      "agentplane context verify-task <task-id>",
      "agentplane context doctor",
      "agentplane context graph validate",
      "agentplane context search <query> --format json",
      "agentplane acr check <task-id>",
    ],
  }),
  node({ kind: "artifact_write", evidence: ["artifact"] }),
  node({ kind: "verify_record", evidence: ["check_result", "weak_links"], protected: true }),
  node({ kind: "quality_gate", evidence: ["quality_report"], protected: true }),
  node({ kind: "finish", evidence: ["commit"], protected: true }),
] as const;
