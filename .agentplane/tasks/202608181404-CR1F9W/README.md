---
id: "202608181404-CR1F9W"
title: "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "authority"
  - "release"
  - "rework"
  - "website"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "security"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-18T14:05:29.494Z"
  updated_by: "USER"
  note: "User approved all release-blocking remediation needed for 0.7.7, including generated website assets and the controlled authority-bound scope-extension fix."
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
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "material_requirements_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
      - "ci"
    writable_roots:
      - "docs/releases"
      - "packages/agentplane"
      - "packages/core"
      - "packages/spec"
      - "schemas"
      - "scripts"
      - "website/static/img/social"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "PR publication and integration remain supervisor-owned external effects after semantic implementation."
      - "The change alters authority and supervisor state-machine contracts and therefore requires branch_pr review and fail-closed tests."
      - "The generated website asset is required by the hosted docs contract for the 0.7.7 release note."
    repository_effects:
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "material"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/releases"
      - "packages/agentplane"
      - "packages/core"
      - "packages/spec"
      - "schemas"
      - "scripts"
      - "website/static/img/social"
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
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "material_requirements_uncertainty"
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
          - "docs/releases"
          - "packages/agentplane"
          - "packages/core"
          - "packages/spec"
          - "schemas"
          - "scripts"
          - "website/static/img/social"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "requirements_resolution"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "material"
          reversibility: "recovery_required"
      digest: "sha256:780ea628d5913a810162ad443a8cccf23349a435894193d044d667a9df1ee63c"
      escalation_reasons:
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "material_requirements_uncertainty"
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
        - "requirements_resolution"
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
      - "external_effect:network_read"
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "requirements_resolution"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-18T14:05:34.491Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-18T14:05:34.491Z"
doc_updated_by: "CODER"
description: "Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr."
sections:
  Summary: |-
    Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary

    Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr.
  Scope: |-
    - In scope: Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr.
    - Out of scope: unrelated refactors not required for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary".
  Plan: "Plan the release-blocking remediation in two bounded parts: first add a typed scope-extension request and state-bound USER approval route for blocked evaluator or implementation-rework results, including verification invalidation and a freshly scoped executor packet; then add the 0.7.7 release note and generate its canonical website social image and manifest. Verify schema, supervisor routing, focused regressions, docs site, full static contract, and hosted branch_pr checks before integration."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "f4fc869fd5ffbafb58c7e33c9f75ac762f3a242f"
    version: 1
id_source: "generated"
---
## Summary

Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary

Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr.

## Scope

- In scope: Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr.
- Out of scope: unrelated refactors not required for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary".

## Plan

Plan the release-blocking remediation in two bounded parts: first add a typed scope-extension request and state-bound USER approval route for blocked evaluator or implementation-rework results, including verification invalidation and a freshly scoped executor packet; then add the 0.7.7 release note and generate its canonical website social image and manifest. Verify schema, supervisor routing, focused regressions, docs site, full static contract, and hosted branch_pr checks before integration.

## Verify Steps

PLANNER fallback scaffold for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
