---
id: "202608221017-2HT3N7"
title: "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task."
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
  - "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T10:18:42.753Z"
  updated_by: "USER"
  note: "Approved clean recovery plan under the previously granted autonomous release authority; scope matches the blocked task fix."
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
      - "Port already proven release-blocking lifecycle fixes through a clean task-owned branch."
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
    at: "2026-08-22T10:19:00.088Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-22T10:19:00.088Z"
doc_updated_by: "CODER"
description: "A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests."
sections:
  Summary: |-
    Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

    A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
  Scope: |-
    - In scope: A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
    - Out of scope: unrelated refactors not required for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.".
  Plan: "Port the proven lifecycle quality-gate and canonical-plan fixes into one clean, schedulable branch_pr WorkItem."
  Verify Steps: |-
    PLANNER fallback scaffold for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:cba3cb1fcf1b4bd2c705c6f0fe99e66604d86573e4be5226dcdc2abdd523104f"
    grant_id: "5e963133-e9d6-4498-9ce1-876ead92e93f"
    issued_at: "2026-08-22T10:18:42.753Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:2f78abbdca6d4edbb1ffaa510e40458ed8e6e7dba083f68bc779f1633952e0a8"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608221017-2HT3N7"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T10:18:42.753Z"
        approved_by: "USER"
        approved_digest: "sha256:366fd98e153cbf154e8006694401cd8b22798ee857bdc30542c4cededbda61be"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T10:18:32.982Z"
      digest: "sha256:366fd98e153cbf154e8006694401cd8b22798ee857bdc30542c4cededbda61be"
      proposal:
        assumptions:
          - "The blocked task branch is evidence only; no task artifacts are copied."
        planning_baseline:
          captured_at: "2026-08-22T10:17:29.204Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:e738b06c1af6b4bfcd968cf8b176e9efac1f7df53e6b162225fea4a37cae502a"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221017-2HT3N7/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221017-2HT3N7"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
              id: "top-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "top-types"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "top-focused"
                - "top-types"
              description: "Focused tests and typecheck pass."
              id: "all"
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
                    - "focused"
                    - "types"
                  description: "Artifact-only descendants pass; semantic and unrelated drift fail; closure metadata stays lifecycle-only."
                  id: "quality"
                  required: true
                -
                  check_ids:
                    - "focused"
                  description: "Replacement canonical plans clear stale replan markers without weakening other state."
                  id: "replan"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                  - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
                  - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/commands/task/plan.unit.test.ts"
                symbol_hints:
                  - "resolveExpectedQualitySha"
                  - "taskReadmesHaveOnlyLifecycleDrift"
                  - "setTaskPlan"
              depends_on: []
              expected_outputs:
                - "source_change:lifecycle_quality_gate"
                - "regression_tests:lifecycle_quality_gate"
              id: "port-lifecycle-fixes"
              objective: "Port the reviewed quality ancestry, lifecycle metadata normalization, and canonical replan marker fixes with regression tests."
              optional: false
              priority: 100
              required_inputs: []
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
                    command: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "types"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "focused"
                      - "types"
                    description: "Run quality lifecycle regression coverage."
                    id: "quality"
                    required: true
                  -
                    check_ids:
                      - "focused"
                    description: "Run canonical plan replacement regression coverage."
                    id: "replan"
                    required: true
                evidence_fingerprint: "sha256:1e75328e03e5e2867fa4de035c84ab71bb81545e2cb7546c59d79e97aff3b43c"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221017-2HT3N7"
    event_cursor: 0
    final_validation: null
    id: "202608221017-2HT3N7"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-22T10:17:22.512Z"
      constraints: []
      request: |-
        Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

        A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
      task_id: "202608221017-2HT3N7"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T10:18:42.753Z"
    work_items:
      port-lifecycle-fixes:
        attempt: 0
        claim_id: null
        id: "port-lifecycle-fixes"
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

Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.

## Scope

- In scope: A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
- Out of scope: unrelated refactors not required for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.".

## Plan

Port the proven lifecycle quality-gate and canonical-plan fixes into one clean, schedulable branch_pr WorkItem.

## Verify Steps

PLANNER fallback scaffold for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
