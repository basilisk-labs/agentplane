---
id: "202608230020-TEK7WE"
title: "Stabilize full CI runtime claims under supervisor load"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "regression"
  - "runner"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-08-23T00:24:25.840Z"
  updated_by: "USER"
  note: "Approved under the user-authorized v0.7.8 regression-fix boundary for exact plan digest sha256:4940474adebd93d0fc8c4594d9757cc85c45d919a3220261854743a7e81d4fb7."
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
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
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
      escalation_reasons: []
      execution_groups:
        - "core"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-23T00:24:35.523Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-23T00:24:35.523Z"
doc_updated_by: "CODER"
description: "Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI."
sections:
  Summary: |-
    Stabilize full CI runtime claims under supervisor load

    Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.
  Scope: |-
    - In scope: Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.
    - Out of scope: unrelated refactors not required for "Stabilize full CI runtime claims under supervisor load".
  Plan: "Apply the two coupled, proven regression corrections atomically: isolate runtime before the remaining CI groups and widen only the test settlement observation window."
  Verify Steps: |-
    PLANNER fallback scaffold for "Stabilize full CI runtime claims under supervisor load". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Stabilize full CI runtime claims under supervisor load". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    completion_contract_digest: "sha256:fba971ef6a121384c40c5fc93d8592325723d6d58911d7f1df7633db663de72c"
    digest: "sha256:7f2433f7567a947d85e699b99142fb874111cd361fbc31dc71f66510e2605196"
    grant_id: "d7f091ed-3102-46a3-abb6-cb5f8a1d0257"
    issued_at: "2026-08-23T00:24:25.840Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e060a1e40eaf3b2f42148aca069e0f6f98b0727f8cb7393f0dbcab2135cd5243"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f2597e379e84d7b1cabc5d1fe65f4cdc98cc2387e3b61c1b60d7ce1c79cf0131"
    status: "active"
    task_id: "202608230020-TEK7WE"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-23T00:24:25.840Z"
        approved_by: "USER"
        approved_digest: "sha256:4940474adebd93d0fc8c4594d9757cc85c45d919a3220261854743a7e81d4fb7"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-23T00:22:00.550Z"
      digest: "sha256:4940474adebd93d0fc8c4594d9757cc85c45d919a3220261854743a7e81d4fb7"
      proposal:
        assumptions:
          - "Runtime-first isolation removes the proven CPU contention, and 5000 ms covers the remaining supervisor-only settlement variance without hiding a 60-second test hang."
        planning_baseline:
          captured_at: "2026-08-23T00:20:48.966Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a542361a9111ec5dcc63b85a23fad5396d3363b3db517b0487ca3a7d230f546a"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608230020-TEK7WE/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608230020-TEK7WE"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
              id: "check-focused"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-full"
              description: "The exact active-claim suite and full local CI both pass with only the two approved files changed."
              id: "criterion-coupled-regression-fixed"
              required: true
          evidence_fingerprint: "sha256:5e0f544847debe02623d69c88957d44816ccf44cd5e6df48428bf3a0092801b5"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-full"
                  description: "The runtime group completes before any docs-schema, core, or cli group starts; the remaining groups retain configured concurrency."
                  id: "criterion-runtime-isolated"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-full"
                  description: "The active-claim suite retains existing assertions and uses only a 5000 ms test settlement observation window."
                  id: "criterion-harness-stable"
                  required: true
                -
                  check_ids:
                    - "check-full"
                  description: "Selected groups, commands, timeouts, outputs, maximum concurrency metric, and fail aggregation are preserved."
                  id: "criterion-groups-preserved"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 196608
                optional_sources:
                  - "scripts/checks/run-local-ci-group.mjs"
                required_sources:
                  - "scripts/checks/run-local-ci.mjs"
                  - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts"
                symbol_hints:
                  - "runFullFastPath"
                  - "observeSettlement"
                  - "waitForStartedRun"
              depends_on: []
              expected_outputs:
                - "stable-supervisor-full-ci-runtime-claims"
              id: "stabilize-runtime-full-ci"
              objective: "Run runtime alone before a concurrency-two wave of all remaining verification groups and set the active-claim test-only settlement observation default to 5000 ms."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/run-local-ci.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
              risk: "medium"
              scope_roots:
                - "scripts/checks/run-local-ci.mjs"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-full"
                    description: "The runtime group completes before any docs-schema, core, or cli group starts; the remaining groups retain configured concurrency."
                    id: "criterion-runtime-isolated"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-full"
                    description: "The active-claim suite retains existing assertions and uses only a 5000 ms test settlement observation window."
                    id: "criterion-harness-stable"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "Selected groups, commands, timeouts, outputs, maximum concurrency metric, and fail aggregation are preserved."
                    id: "criterion-groups-preserved"
                    required: true
                evidence_fingerprint: "sha256:27f12d4e2de7e175102e193927ff201d8af01546f77a48304fd5a5e419d0d045"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608230020-TEK7WE"
    event_cursor: 0
    final_validation: null
    id: "202608230020-TEK7WE"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-23T00:20:40.836Z"
      constraints: []
      request: |-
        Stabilize full CI runtime claims under supervisor load

        Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.
      task_id: "202608230020-TEK7WE"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-23T00:24:25.840Z"
    work_items:
      stabilize-runtime-full-ci:
        attempt: 0
        claim_id: null
        id: "stabilize-runtime-full-ci"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    version: 1
id_source: "generated"
---
## Summary

Stabilize full CI runtime claims under supervisor load

Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.

## Scope

- In scope: Fix the proven coupled full-CI regression with one atomic change: run the runtime verification group alone before the remaining groups, and increase only the active-claim test harness settlement observation from 1500 ms to 5000 ms. Preserve all selected groups, commands, production behavior, max concurrency for the remaining wave, metrics, and fail aggregation. Prove the exact active-claim suite and full local CI.
- Out of scope: unrelated refactors not required for "Stabilize full CI runtime claims under supervisor load".

## Plan

Apply the two coupled, proven regression corrections atomically: isolate runtime before the remaining CI groups and widen only the test settlement observation window.

## Verify Steps

PLANNER fallback scaffold for "Stabilize full CI runtime claims under supervisor load". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Stabilize full CI runtime claims under supervisor load". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
