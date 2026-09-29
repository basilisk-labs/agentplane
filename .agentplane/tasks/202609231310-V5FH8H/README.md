---
id: "202609231310-V5FH8H"
title: "Complete explicit USER rejection authority through Task Kernel"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "authority"
  - "kernel"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
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
      - "security_boundary"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:a2eaeec8aaf4ec9c55cde5ace24e63cb1b95f7b63900c56e65861d66047ba824"
      escalation_reasons:
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "task_outcome"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-23T13:10:28.021Z"
doc_updated_by: "CODER"
description: "Fix the remaining end-to-end failure after PR #6012: a manual USER reject_plan reaches Task Kernel but is rejected by canonical_authority_lineage. Allow only the exact approved blocked-plan rejection exception, preserve canonical lineage, and add kernel plus command regression coverage."
sections:
  Summary: |-
    Complete explicit USER rejection authority through Task Kernel

    Fix the remaining end-to-end failure after PR #6012: a manual USER reject_plan reaches Task Kernel but is rejected by canonical_authority_lineage. Allow only the exact approved blocked-plan rejection exception, preserve canonical lineage, and add kernel plus command regression coverage.
  Scope: |-
    - In scope: Fix the remaining end-to-end failure after PR #6012: a manual USER reject_plan reaches Task Kernel but is rejected by canonical_authority_lineage. Allow only the exact approved blocked-plan rejection exception, preserve canonical lineage, and add kernel plus command regression coverage.
    - Out of scope: unrelated refactors not required for "Complete explicit USER rejection authority through Task Kernel".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Complete explicit USER rejection authority through Task Kernel". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Complete explicit USER rejection authority through Task Kernel". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "303a1cd05145999282d7494bf329205e56b5b9b3"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      controller_transfer: null
      current_plan: null
      effects: []
      final_validation: null
      id: "202609231310-V5FH8H"
      intent_digest: "sha256:224418bee1e67ffbf9b650223b4f4ed3fa7501ea61c8c83619b73d7e0200fa50"
      migration_receipts: []
      mutation_receipts:
        capture:202609231310-V5FH8H:
          after_revision: 1
          aggregate_digest: "sha256:467cfbf1d586e8e6d16ff9efb8f5dcabf88387e1c8cd335be8e6505724d9ed72"
          before_revision: 0
          command_digest: "sha256:89917f960994f534cb5e60faea7bc293d4eee56ab9e9f770fa78ad685d1cd222"
          effect_ids: []
          event_digests:
            - "sha256:5fa655c0587ab49b26995f657fb3fc80401b029d7310f3ebed52182be8f2de3b"
          mutation_id: "capture:202609231310-V5FH8H"
      plan_history: []
      revision: 1
      schema_version: 1
      state: "PLANNING"
      work_items: {}
    digest: "sha256:74625295f4fe247e36bf3cb8da6a686fa539194fec4f79b9827af507aced51de"
    documents:
      contracts: {}
      intent:
        context: "Fix the remaining end-to-end failure after PR #6012: a manual USER reject_plan reaches Task Kernel but is rejected by canonical_authority_lineage. Allow only the exact approved blocked-plan rejection exception, preserve canonical lineage, and add kernel plus command regression coverage."
        objective: "Complete explicit USER rejection authority through Task Kernel"
    events:
      -
        command_digest: "sha256:89917f960994f534cb5e60faea7bc293d4eee56ab9e9f770fa78ad685d1cd222"
        id: "capture:202609231310-V5FH8H:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231310-V5FH8H"
        occurred_at: "2026-09-23T13:10:27.997Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231310-V5FH8H"
        task_revision: 1
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Complete explicit USER rejection authority through Task Kernel

Fix the remaining end-to-end failure after PR #6012: a manual USER reject_plan reaches Task Kernel but is rejected by canonical_authority_lineage. Allow only the exact approved blocked-plan rejection exception, preserve canonical lineage, and add kernel plus command regression coverage.

## Scope

- In scope: Fix the remaining end-to-end failure after PR #6012: a manual USER reject_plan reaches Task Kernel but is rejected by canonical_authority_lineage. Allow only the exact approved blocked-plan rejection exception, preserve canonical lineage, and add kernel plus command regression coverage.
- Out of scope: unrelated refactors not required for "Complete explicit USER rejection authority through Task Kernel".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Complete explicit USER rejection authority through Task Kernel". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Complete explicit USER rejection authority through Task Kernel". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
