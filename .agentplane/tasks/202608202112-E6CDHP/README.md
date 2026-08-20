---
id: "202608202112-E6CDHP"
title: "Fix live GitLab MR transport and provider-neutral mergeability validation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "pnpm --filter @agentplaneorg/agentplane test"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T21:18:00.049Z"
  updated_by: "USER"
  note: "Approved explicitly by Denis in Codex on 2026-08-21 after reviewing the live GitLab findings and remediation plan."
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
    - "effect_external_write"
    - "effect_publish"
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
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/internal"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Provider writes remain operator-controlled and will be performed only after local code verification."
      - "The requested GitLab support requires a reviewable branch because it changes hosted mutation and merge routing behavior."
      - "The two defects are narrowly reproduced and can be covered by existing GitLab transport and conflict-route test seams."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/internal"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
          - "packages/agentplane/src/commands/pr/conflict-rework.ts"
          - "packages/agentplane/src/commands/pr/internal"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:f5dc97b5706d81976944fc1bed745d482896061d7df775b0d6bfa88099fe2113"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
          - "packages/agentplane/src/commands/pr/conflict-rework.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "69eb542b0b7a12904f58c1f6b4cba9c082f46129"
  message: "🚧 E6CDHP task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 69eb542b0b7a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-20T21:18:16.765Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T21:31:34.442Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 69eb542b0b7a. CLI accepted one state-bound external-agent semantic result."
    commit: "69eb542b0b7a12904f58c1f6b4cba9c082f46129"
doc_version: 3
doc_updated_at: "2026-08-20T21:31:34.442Z"
doc_updated_by: "SUPERVISOR"
description: "Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary."
sections:
  Summary: |-
    Fix live GitLab MR transport and provider-neutral mergeability validation

    Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
  Scope: |-
    - In scope: Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
    - Out of scope: unrelated refactors not required for "Fix live GitLab MR transport and provider-neutral mergeability validation".
  Plan: "1. Make glab JSON-body mutations send Content-Type: application/json while retaining explicit --hostname. 2. Add provider-aware mergeability coherence so GitLab mergeable/non-conflicting observations are accepted without weakening GitHub validation. 3. Add focused transport, normalization, and routing regression tests. 4. Run focused tests and the package regression suite. 5. After local verification returns control to the operator, repeat MR readback/check/guarded-merge against the already-authorized private GitLab canary and record exact provider evidence."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix live GitLab MR transport and provider-neutral mergeability validation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix live GitLab MR transport and provider-neutral mergeability validation". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  implementation_commit:
    hash: "69eb542b0b7a12904f58c1f6b4cba9c082f46129"
  workflow_route_baseline:
    start_head_sha: "60be0145753e9e2aecf31f4bbd8471895db13395"
    version: 1
id_source: "generated"
---
## Summary

Fix live GitLab MR transport and provider-neutral mergeability validation

Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.

## Scope

- In scope: Repair the two defects reproduced against gitlab.nordavind.ru: glab JSON mutation requests omit Content-Type application/json and conflict preparation applies GitHub-only mergeability coherence rules to GitLab observations. Add focused regression tests, preserve GitHub behavior, and qualify the local implementation before repeating the authorized live canary.
- Out of scope: unrelated refactors not required for "Fix live GitLab MR transport and provider-neutral mergeability validation".

## Plan

1. Make glab JSON-body mutations send Content-Type: application/json while retaining explicit --hostname. 2. Add provider-aware mergeability coherence so GitLab mergeable/non-conflicting observations are accepted without weakening GitHub validation. 3. Add focused transport, normalization, and routing regression tests. 4. Run focused tests and the package regression suite. 5. After local verification returns control to the operator, repeat MR readback/check/guarded-merge against the already-authorized private GitLab canary and record exact provider evidence.

## Verify Steps

PLANNER fallback scaffold for "Fix live GitLab MR transport and provider-neutral mergeability validation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix live GitLab MR transport and provider-neutral mergeability validation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
