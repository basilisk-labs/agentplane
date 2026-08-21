---
id: "202608210853-0FYGE3"
title: "Fix local branch_pr status after merged cleanup"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-decision-next-action.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-21T08:59:52.340Z"
  updated_by: "USER"
  note: "User approved the prepared plan in the Codex task."
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/shared/route-decision-next-action.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "No network or external-system mutation is needed for implementation or focused verification."
      - "The branch_pr workflow isolates the code mutation and keeps integration provider-controlled."
      - "The defect is in local route-decision control flow and requires a source change plus regression coverage."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/route-decision-next-action.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
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
          - "packages/agentplane/src/commands/shared/route-decision-next-action.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:7af81b840d9c7e5502fedf6b6f167be06b98c07757eaf1cef0df53009ed0fc21"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/route-decision-next-action.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/route-decision.ts"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-21T09:00:40.045Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-21T09:00:40.045Z"
doc_updated_by: "CODER"
description: "Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup."
sections:
  Summary: |-
    Fix local branch_pr status after merged cleanup

    Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup.
  Scope: |-
    - In scope: Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup.
    - Out of scope: unrelated refactors not required for "Fix local branch_pr status after merged cleanup".
  Plan: "Plan: make local branch_pr route diagnostics recognize canonical task-close evidence on the base branch before stale OPEN/CLOSED PR metadata; preserve ordinary open-PR behavior when that evidence is absent; add regression coverage for merged cleanup with a deleted task branch; run the focused route-decision test suite."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix local branch_pr status after merged cleanup". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix local branch_pr status after merged cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "41f1b102afe74f56ec4b36d13a52476b8bcd40ee"
    version: 1
id_source: "generated"
---
## Summary

Fix local branch_pr status after merged cleanup

Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup.

## Scope

- In scope: Make local route diagnostics recognize canonical task closure on the base branch before trusting stale OPEN/CLOSED PR metadata, so a DONE task with a deleted merged branch does not emit false provider_pr_unavailable or verification_invalid_record blockers. Add regression coverage for merged cleanup without remote lookup.
- Out of scope: unrelated refactors not required for "Fix local branch_pr status after merged cleanup".

## Plan

Plan: make local branch_pr route diagnostics recognize canonical task-close evidence on the base branch before stale OPEN/CLOSED PR metadata; preserve ordinary open-PR behavior when that evidence is absent; add regression coverage for merged cleanup with a deleted task branch; run the focused route-decision test suite.

## Verify Steps

PLANNER fallback scaffold for "Fix local branch_pr status after merged cleanup". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix local branch_pr status after merged cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
