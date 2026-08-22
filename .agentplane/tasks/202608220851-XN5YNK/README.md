---
id: "202608220851-XN5YNK"
title: "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish."
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T09:30:57.245Z"
  updated_by: "USER"
  note: "User explicitly approved plan sha256:bda2dff9cb96b08c3eaf203c67503b58e14409708e4525574fb1520f294a6f47 in Codex task 01a0267d-9ca7-7521-aec7-4fa3902bb965."
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
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The release blocker requires a narrow lifecycle implementation change and a regression test proving the quality gate remains strict for semantic changes."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task"
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
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
          - "packages/agentplane/src/commands/task"
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
      digest: "sha256:df2c5eed8cc378dfecd3d023e8b17db6e5b412254c2d71b6e143576fbc1646fa"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.ts"
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
    at: "2026-08-22T09:31:10.981Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-22T09:31:10.981Z"
doc_updated_by: "CODER"
description: "Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance."
sections:
  Summary: |-
    Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.

    Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.
  Scope: |-
    - In scope: Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.
    - Out of scope: unrelated refactors not required for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.".
  Plan: "Make pre-merge closure treat an EVALUATOR pass on a proven task-artifact-only descendant as coverage of its resolved implementation commit, while retaining strict rejection for semantic drift."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:78dbcf7f73ac01d305cd5475495cc8b87ed399e432a77bcddffa84b7d8f1c61c"
    grant_id: "e8e18298-ea30-4648-ac83-2231cb1870b3"
    issued_at: "2026-08-22T09:30:57.245Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:770dccbeea9b800299025ed1e873b580f89344cb1fb97672e9eb24856b45babe"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608220851-XN5YNK"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T09:30:57.245Z"
        approved_by: "USER"
        approved_digest: "sha256:bda2dff9cb96b08c3eaf203c67503b58e14409708e4525574fb1520f294a6f47"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T08:54:06.017Z"
      digest: "sha256:bda2dff9cb96b08c3eaf203c67503b58e14409708e4525574fb1520f294a6f47"
      proposal:
        assumptions:
          - "Existing task-artifact-only classification is authoritative and strict enough to distinguish generated or lifecycle-managed evidence from semantic code changes."
          - "No quality gate should accept a reviewed SHA merely because it is an ancestor or descendant without the task-artifact-only proof."
        planning_baseline:
          captured_at: "2026-08-22T08:51:40.871Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b477844bf2b68532bf1df22269bb4688618344a891788756a18ba0a42bd1a669"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608220851-XN5YNK/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608220851-XN5YNK"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
              id: "top-focused-finish-test"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "top-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "top-focused-finish-test"
                - "top-typecheck"
              description: "The regression test covers both accepted artifact-only review heads and rejected semantic drift, and repository typecheck succeeds."
              id: "quality-gate-correctness"
              required: true
          evidence_fingerprint: "sha256:f5f67f2b63232e8e7f88771295082f981f3687623660914cccf23ba8d75e7957"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-finish-test"
                    - "typecheck"
                  description: "Pre-merge finish accepts review evidence when evaluated_sha is a proven task-artifact-only descendant of the resolved implementation commit."
                  id: "artifact-head-accepted"
                  required: true
                -
                  check_ids:
                    - "focused-finish-test"
                  description: "The same gate continues to reject reviews that do not cover the implementation or whose descendant contains reviewable semantic changes."
                  id: "semantic-drift-rejected"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/finish-execute-commit.ts"
                  - "packages/agentplane/src/commands/task/quality-review-gate.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                  - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                symbol_hints:
                  - "resolveImplementationCommitInfo"
                  - "assertFreshQualityReview"
                  - "isTaskArtifactOnlyAdvance"
              depends_on: []
              expected_outputs:
                - "source_change:quality_review_artifact_equivalence"
                - "regression_test:evaluator_artifact_head_followed_by_finish"
              id: "artifact-review-equivalence"
              objective: "Accept a fresh EVALUATOR pass anchored on a proven task-artifact-only descendant when finish resolves the same underlying implementation commit, and keep rejecting semantic or unrelated drift."
              optional: false
              priority: 100
              required_inputs:
                - "packages/agentplane/src/commands/task/finish-execute-commit.ts"
                - "packages/agentplane/src/commands/task/quality-review-gate.ts"
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                    id: "focused-finish-test"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "focused-finish-test"
                      - "typecheck"
                    description: "Exercise the accepted task-artifact-only review-head case and validate the TypeScript graph."
                    id: "artifact-head-accepted"
                    required: true
                  -
                    check_ids:
                      - "focused-finish-test"
                    description: "Exercise rejection when the reviewed relationship includes semantic or unrelated drift."
                    id: "semantic-drift-rejected"
                    required: true
                evidence_fingerprint: "sha256:1e75328e03e5e2867fa4de035c84ab71bb81545e2cb7546c59d79e97aff3b43c"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608220851-XN5YNK"
    event_cursor: 0
    final_validation: null
    id: "202608220851-XN5YNK"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun test packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-22T08:51:32.426Z"
      constraints: []
      request: |-
        Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.

        Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.
      task_id: "202608220851-XN5YNK"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T09:30:57.245Z"
    work_items:
      artifact-review-equivalence:
        attempt: 0
        claim_id: null
        id: "artifact-review-equivalence"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
    version: 1
id_source: "generated"
---
## Summary

Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.

Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.

## Scope

- In scope: Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.
- Out of scope: unrelated refactors not required for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.".

## Plan

Make pre-merge closure treat an EVALUATOR pass on a proven task-artifact-only descendant as coverage of its resolved implementation commit, while retaining strict rejection for semantic drift.

## Verify Steps

PLANNER fallback scaffold for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
