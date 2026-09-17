import type {
  NativeEvidenceKind,
  NativeEvidenceRequirement,
  NativeStopRule,
  NativeTaskProfile,
} from "./model.js";

export const PROFILE_REQUIRED_PROMPT_BLOCKS = {
  analysis: 6,
  content: 8,
  docs: 10,
  code: 14,
  benchmark: 16,
  regression: 16,
  context: 14,
  context_maximum: 16,
  post_run_review: 18,
  release: 16,
  ops: 12,
} as const satisfies Record<NativeTaskProfile, number>;

export const PROFILE_TASK_KINDS: Record<NativeTaskProfile, readonly string[]> = {
  analysis: ["analysis"],
  content: ["content"],
  docs: ["docs"],
  code: ["code"],
  benchmark: ["code"],
  regression: ["code"],
  context: ["context"],
  context_maximum: ["context"],
  post_run_review: ["code", "analysis"],
  release: ["release"],
  ops: ["ops"],
};

function evidence(
  id: string,
  kind: NativeEvidenceKind,
  description: string,
): NativeEvidenceRequirement {
  return { id, kind, required: true, description };
}

export function evidenceRequirements(
  profile: NativeTaskProfile,
  mode: "direct" | "branch_pr",
): NativeEvidenceRequirement[] {
  const branch = mode === "branch_pr";
  switch (profile) {
    case "analysis": {
      return [
        evidence("analysis.sources", "sources", "Sources used for analysis."),
        evidence("analysis.assumptions", "assumptions", "Assumptions and constraints."),
        evidence("analysis.weak_links", "weak_links", "Weak links or uncertainty."),
        evidence("analysis.final", "final_output", "Final answer or report."),
        evidence("analysis.quality", "quality_report", "Independent quality verdict."),
      ];
    }
    case "content": {
      return [
        evidence("content.sources", "sources", "Source or product facts used."),
        evidence("content.check", "check_result", "Style or editorial check."),
        evidence("content.final", "final_output", "Final content artifact."),
        evidence("content.quality", "quality_report", "Independent quality verdict."),
      ];
    }
    case "docs": {
      return [
        evidence("docs.paths", "changed_paths", "Changed documentation paths."),
        evidence("docs.check", "check_result", "Documentation checks."),
        evidence("docs.artifact", "artifact", "Updated documentation artifact."),
        evidence("docs.quality", "quality_report", "Independent quality verdict."),
      ];
    }
    case "code": {
      return branch
        ? [
            evidence("code_pr.paths", "changed_paths", "Changed source paths."),
            evidence("code_pr.fast_checks", "check_result", "Fast local checks."),
            evidence("code_pr.pr", "external_link", "Pull request artifact."),
            evidence("code_pr.verify", "check_result", "Task branch verification."),
            evidence("code_pr.quality", "quality_report", "Independent quality verdict."),
            evidence("code_pr.hosted", "check_result", "Hosted check evidence."),
            evidence("code_pr.commit", "commit", "Integration commit."),
          ]
        : [
            evidence("code_direct.paths", "changed_paths", "Changed source paths."),
            evidence("code_direct.check", "check_result", "Focused checks."),
            evidence("code_direct.commit", "commit", "Close commit."),
            evidence("code_direct.quality", "quality_report", "Independent quality verdict."),
          ];
    }
    case "benchmark": {
      return [
        evidence("benchmark.baseline", "artifact", "Baseline measurement artifact."),
        evidence("benchmark.method", "assumptions", "Benchmark method and environment."),
        evidence("benchmark.runs", "check_result", "Run count and raw measurements."),
        evidence("benchmark.threshold", "assumptions", "Accepted noise threshold."),
        evidence("benchmark.comparison", "check_result", "Before and after comparison."),
        evidence("benchmark.verdict", "final_output", "Performance verdict."),
        evidence("benchmark.quality", "quality_report", "Independent quality verdict."),
        evidence("benchmark.commit", "commit", "Integration commit."),
      ];
    }
    case "regression": {
      return [
        evidence("regression.original_failure", "artifact", "Original failure evidence."),
        evidence("regression.reproduction", "check_result", "Reproduction result."),
        evidence("regression.focused_check", "check_result", "Focused regression check."),
        evidence("regression.matrix_or_scope", "assumptions", "Affected check scope."),
        evidence("regression.full_gate", "check_result", "Full relevant gate."),
        evidence("regression.flake_classification", "weak_links", "Residual flake risk."),
        evidence("regression.quality", "quality_report", "Independent quality verdict."),
        evidence("regression.commit", "commit", "Integration commit."),
      ];
    }
    case "context": {
      return [
        evidence("context.sources", "sources", "Selected source set and hashes."),
        evidence("context.source_lock", "context_manifest", "Locked source manifest."),
        evidence("context.policies", "context_manifest", "Loaded context policy."),
        evidence("context.changed_paths", "changed_paths", "Changed context paths."),
        evidence("context.artifacts", "artifact", "Updated context artifacts."),
        evidence("context.verification", "check_result", "Context verification results."),
        evidence("context.recovery", "weak_links", "Recovery and conflict status."),
        evidence("context.quality", "quality_report", "Independent quality verdict."),
        evidence("context.commit", "commit", "Close or integration commit."),
      ];
    }
    case "context_maximum": {
      return [
        evidence("context_max.sources", "sources", "Selected source set and hashes."),
        evidence("context_max.coverage", "artifact", "Semantic coverage map."),
        evidence("context_max.addressing", "context_manifest", "Addressable provenance registry."),
        evidence("context_max.graph_first", "artifact", "Graph extraction before synthesis."),
        evidence("context_max.semantic_resolution", "artifact", "Semantic entity resolution."),
        evidence("context_max.topology", "artifact", "Source-shaped topology decision."),
        evidence("context_max.glossary", "artifact", "Canonical glossary."),
        evidence("context_max.obsidian", "artifact", "Obsidian metadata and source notes."),
        evidence("context_max.changed_paths", "changed_paths", "Changed context paths."),
        evidence("context_max.verification", "check_result", "Context verification results."),
        evidence("context_max.recovery", "weak_links", "Coverage and recovery gaps."),
        evidence("context_max.quality", "quality_report", "Independent quality verdict."),
        evidence("context_max.commit", "commit", "Close or integration commit."),
      ];
    }
    case "post_run_review": {
      return [
        evidence("post_run.work_log", "artifact", "Inspected work log or task transcript."),
        evidence("post_run.fixable_errors", "weak_links", "Repository-fixable failures."),
        evidence(
          "post_run.atomic_tasks",
          "artifact",
          "Atomic follow-up tasks or an explicit none result.",
        ),
        evidence("post_run.execute_or_defer_decision", "approval", "User execution decision."),
        evidence("post_run.review_verdict", "check_result", "Review completeness verdict."),
        evidence("post_run.quality", "quality_report", "Independent quality verdict."),
        evidence("post_run.handoff", "final_output", "Follow-up handoff."),
        evidence("post_run.commit", "commit", "Integrated review commit."),
      ];
    }
    case "release": {
      return [
        evidence("release.approval", "approval", "Release authority receipt."),
        evidence("release.plan", "artifact", "Release plan or candidate artifact."),
        evidence("release.check", "check_result", "Release gates."),
        evidence("release.publish", "external_link", "Publication evidence."),
        evidence("release.commit", "commit", "Release commit."),
        evidence("release.quality", "quality_report", "Independent quality verdict."),
        evidence("release.rollback", "rollback", "Release recovery path."),
      ];
    }
    case "ops": {
      return [
        evidence("ops.approval", "approval", "Operational authority receipt."),
        evidence("ops.rollback", "rollback", "Rollback or recovery path."),
        evidence("ops.action", "artifact", "Action log or operational artifact."),
        evidence("ops.check", "check_result", "Post-action check."),
        evidence("ops.quality", "quality_report", "Independent quality verdict."),
      ];
    }
  }
}

export const CORE_STOP_RULES: readonly NativeStopRule[] = [
  {
    id: "required_evidence_missing",
    severity: "stop",
    reason: "Required native verification evidence cannot be produced.",
  },
  {
    id: "protected_lifecycle_override",
    severity: "stop",
    reason: "A semantic episode or Recipe attempts to override protected lifecycle behavior.",
  },
  {
    id: "effect_in_doubt",
    severity: "stop",
    reason:
      "An unresolved external or repository effect requires supervisor recovery before progress.",
  },
];

export const PROFILE_STOP_RULES: Partial<Record<NativeTaskProfile, readonly NativeStopRule[]>> = {
  benchmark: [
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
  regression: [
    {
      id: "regression_without_failure",
      severity: "warn",
      reason: "Regression work must preserve the original failure or explain non-reproduction.",
    },
    {
      id: "regression_gate_skipped",
      severity: "approval_required",
      reason: "Skipping the relevant quality gate requires explicit recorded approval.",
    },
  ],
  post_run_review: [
    {
      id: "post_run_tasks_before_decision",
      severity: "stop",
      reason: "Follow-up tasks must not execute before the user chooses execute-now or defer.",
    },
    {
      id: "post_run_uninspected_logs",
      severity: "warn",
      reason: "The review must cite inspected work logs or state that none were available.",
    },
  ],
  context: [
    {
      id: "context_empty_source_set",
      severity: "stop",
      reason: "Context assimilation requires at least one selected source with a recorded hash.",
    },
    {
      id: "context_pipeline_order_skipped",
      severity: "stop",
      reason: "Source locking and pre-write reconciliation must happen before wiki edits.",
    },
    {
      id: "context_without_source_refs",
      severity: "stop",
      reason: "Context-derived claims require source references or an explicit no-source reason.",
    },
    {
      id: "context_reindex_missing_after_writes",
      severity: "stop",
      reason: "Context writes require a fresh context reindex before finish.",
    },
    {
      id: "context_empty_derived_outputs_without_reason",
      severity: "approval_required",
      reason: "Empty derived output requires an explicit reason.",
    },
    {
      id: "context_unresolved_conflict_candidate",
      severity: "approval_required",
      reason: "Conflict candidates require review before promotion or overwrite.",
    },
    {
      id: "context_agent_handoff_missing_after_stalled_work",
      severity: "stop",
      reason: "Stalled context work requires handoff evidence.",
    },
    {
      id: "context_forbidden_output",
      severity: "stop",
      reason: "Context work must not mutate sources or projections outside granted authority.",
    },
  ],
  context_maximum: [
    {
      id: "context_max_empty_source_set",
      severity: "stop",
      reason: "Maximum assimilation requires at least one selected source with a recorded hash.",
    },
    {
      id: "context_max_pipeline_order_skipped",
      severity: "stop",
      reason: "Graph and glossary extraction must happen before narrative synthesis.",
    },
    {
      id: "context_max_semantic_resolution_missing",
      severity: "stop",
      reason: "Every entity-bearing source term requires semantic resolution.",
    },
    {
      id: "context_max_semantic_merge_without_comparative_evidence",
      severity: "stop",
      reason: "Entity merges require comparative evidence and a reproducible rationale.",
    },
    {
      id: "context_max_forced_semantic_merge_under_uncertainty",
      severity: "approval_required",
      reason: "Uncertain identities must remain distinct or possibly related.",
    },
    {
      id: "context_max_missing_topology_decision",
      severity: "stop",
      reason: "Narrative synthesis requires a source-shaped topology decision.",
    },
    {
      id: "context_max_page_family_without_source_evidence",
      severity: "approval_required",
      reason: "New page families require source-backed evidence.",
    },
    {
      id: "context_max_missing_line_refs",
      severity: "stop",
      reason: "Derived claims and entities require line-addressed source references.",
    },
    {
      id: "context_max_broken_obsidian_wikilink_case",
      severity: "stop",
      reason: "Obsidian links must match canonical path, title, or alias case.",
    },
    {
      id: "context_max_missing_numeric_source_notes",
      severity: "approval_required",
      reason: "Source-backed prose requires numeric notes and trailing source links.",
    },
    {
      id: "context_max_coverage_gap_without_reason",
      severity: "approval_required",
      reason: "Every significant source span requires coverage, omission, or redaction evidence.",
    },
    {
      id: "context_max_glossary_conflict",
      severity: "approval_required",
      reason: "Glossary conflicts must remain explicit before normalization.",
    },
    {
      id: "context_max_missing_root_glossary_file",
      severity: "stop",
      reason: "Maximum assimilation requires context/wiki/glossary.md.",
    },
    {
      id: "context_max_raw_deletion_resilience_unproven",
      severity: "approval_required",
      reason: "Finish requires raw-deletion resilience evidence.",
    },
    {
      id: "context_max_sensitive_leakage",
      severity: "stop",
      reason: "Secrets and non-publishable source spans must not leak into maintained artifacts.",
    },
    {
      id: "context_max_reindex_missing_after_writes",
      severity: "stop",
      reason: "Context writes require a fresh context reindex before finish.",
    },
  ],
};
