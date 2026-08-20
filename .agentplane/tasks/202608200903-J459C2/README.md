---
id: "202608200903-J459C2"
title: "Make task execution authority local and direct execution workspace-safe"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "architecture"
  - "lifecycle"
  - "routing"
  - "multi-agent"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun run ci:local:fast"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T14:24:35.433Z"
  updated_by: "USER"
  note: "User explicitly approved plan J459C2 in chat on 2026-08-20; one AgentPlane-managed working branch for AP-0001 through AP-1004."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - ".agentplane/policy"
      - "AGENTS.md"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
  declaration:
    external_effects: []
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "One isolated branch_pr worktree is required because the change is cross-cutting and security-sensitive, while publication and provider effects remain separate lifecycle boundaries."
      - "The approved roadmap changes central lifecycle authority, persisted task compatibility, verification identity, workspace allocation, integration serialization, and managed-runner capability enforcement across source, tests, schemas, policy, and documentation."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/policy"
      - "AGENTS.md"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/policy"
          - "AGENTS.md"
          - "docs"
          - "packages/agentplane"
          - "packages/core"
        evidence_requirements:
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:a054ce75b5b18f44fa94e584a6b9560ae15a3bbfd10382eb8267c69eedd8975f"
      escalation_reasons:
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "3e09cc43f711a7c8d7596eb211b2ecb1594d1bcc"
  message: "🏗️ J459C2 task: localize execution authority"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-20T15:49:58.075Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T17:32:38.608Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "3e09cc43f711a7c8d7596eb211b2ecb1594d1bcc"
doc_version: 3
doc_updated_at: "2026-08-20T17:32:38.608Z"
doc_updated_by: "CODER"
description: "Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue."
sections:
  Summary: |-
    Make task execution authority local and direct execution workspace-safe

    Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.
  Scope: |-
    - In scope: Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.
    - Out of scope: unrelated refactors not required for "Make task execution authority local and direct execution workspace-safe".
  Plan: |-
    1. Establish test-first regression coverage for repository-direct/task-branch_pr finish, risk-driven route escalation, custom workflow_dir, frozen base identity, and parallel direct isolation; keep every published commit green rather than merging red tests.
    2. Add TaskExecutionContext and TaskCommandContext with one resolver. Bind selected route, route provenance, compatible task batch, authoritative task source, base_ref, and immutable base_sha without mutating CommandContext; retain only a deprecated compatibility wrapper and add static guards against lifecycle reads of repository workflow_mode.
    3. Make auto the creation default, remove user-facing repository route, normalize legacy records on read, unify create/new routing, and preserve branch_pr as the repository safety floor.
    4. Implement two-phase authoritative task loading and migrate route oracle, task run, PR lifecycle, quality/evaluator, verification, and finish callers to TaskCommandContext. Reject mixed-mode or mixed-base batches.
    5. Add WorkspaceAllocationContext and a route-independent allocator. Default automated direct and branch_pr execution to isolated worktrees; keep base checkout behind a single-writer lease. Persist leases and absolute paths only in private Git-common runtime state, preserve reachable implementation commits, and fail closed during cleanup.
    6. Introduce verification input identity v4 using TaskExecutionContext, base_ref plus base_sha, route/task digests, and workspace-neutral inputs. Migrate callers to assessment-first diagnostics with exact invalidation reasons and explicit v3 audit-only compatibility.
    7. Rebuild finish around the loaded task context and an idempotent CAS-backed closeout journal with prepared, task_state_written, close_commit_written, completed, and recovery_required phases. Route verification, close-tail selection, base validation, and direct-lock cleanup exclusively through selected_mode.
    8. Generalize the existing serialized integration queue for direct implementation candidates instead of creating a competing queue. Recheck base identity, conflicts, semantic equivalence, and verification freshness before integration; preserve explicit conflict_rework and parallel A/B/C coverage.
    9. Enforce declared capabilities before managed-runner invocation, retain post-run observation as defense in depth, and implement evidence-preserving direct-to-branch_pr escalation without unnecessary executor replay. Do not claim arbitrary shell execution is sandboxed.
    10. Delete migrated legacy runtime semantics, add read-time migration and architecture guards, record ADRs for task authority, workspace isolation, and serialized integration, then run focused suites, typecheck, policy routing, doctor, full local CI, independent evaluator review, and all ten end-to-end acceptance cases. Stop for any scope outside the declared roots, verification-contract weakening, destructive migration, credentials, deployment, publication, or provider action; require fresh approval at those boundaries.
  Verify Steps: |-
    PLANNER fallback scaffold for "Make task execution authority local and direct execution workspace-safe". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make task execution authority local and direct execution workspace-safe". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "292b232b3160b22c47c6cc206fade625e9377fed"
    version: 1
id_source: "generated"
---
## Summary

Make task execution authority local and direct execution workspace-safe

Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.

## Scope

- In scope: Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.
- Out of scope: unrelated refactors not required for "Make task execution authority local and direct execution workspace-safe".

## Plan

1. Establish test-first regression coverage for repository-direct/task-branch_pr finish, risk-driven route escalation, custom workflow_dir, frozen base identity, and parallel direct isolation; keep every published commit green rather than merging red tests.
2. Add TaskExecutionContext and TaskCommandContext with one resolver. Bind selected route, route provenance, compatible task batch, authoritative task source, base_ref, and immutable base_sha without mutating CommandContext; retain only a deprecated compatibility wrapper and add static guards against lifecycle reads of repository workflow_mode.
3. Make auto the creation default, remove user-facing repository route, normalize legacy records on read, unify create/new routing, and preserve branch_pr as the repository safety floor.
4. Implement two-phase authoritative task loading and migrate route oracle, task run, PR lifecycle, quality/evaluator, verification, and finish callers to TaskCommandContext. Reject mixed-mode or mixed-base batches.
5. Add WorkspaceAllocationContext and a route-independent allocator. Default automated direct and branch_pr execution to isolated worktrees; keep base checkout behind a single-writer lease. Persist leases and absolute paths only in private Git-common runtime state, preserve reachable implementation commits, and fail closed during cleanup.
6. Introduce verification input identity v4 using TaskExecutionContext, base_ref plus base_sha, route/task digests, and workspace-neutral inputs. Migrate callers to assessment-first diagnostics with exact invalidation reasons and explicit v3 audit-only compatibility.
7. Rebuild finish around the loaded task context and an idempotent CAS-backed closeout journal with prepared, task_state_written, close_commit_written, completed, and recovery_required phases. Route verification, close-tail selection, base validation, and direct-lock cleanup exclusively through selected_mode.
8. Generalize the existing serialized integration queue for direct implementation candidates instead of creating a competing queue. Recheck base identity, conflicts, semantic equivalence, and verification freshness before integration; preserve explicit conflict_rework and parallel A/B/C coverage.
9. Enforce declared capabilities before managed-runner invocation, retain post-run observation as defense in depth, and implement evidence-preserving direct-to-branch_pr escalation without unnecessary executor replay. Do not claim arbitrary shell execution is sandboxed.
10. Delete migrated legacy runtime semantics, add read-time migration and architecture guards, record ADRs for task authority, workspace isolation, and serialized integration, then run focused suites, typecheck, policy routing, doctor, full local CI, independent evaluator review, and all ten end-to-end acceptance cases. Stop for any scope outside the declared roots, verification-contract weakening, destructive migration, credentials, deployment, publication, or provider action; require fresh approval at those boundaries.

## Verify Steps

PLANNER fallback scaffold for "Make task execution authority local and direct execution workspace-safe". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make task execution authority local and direct execution workspace-safe". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
