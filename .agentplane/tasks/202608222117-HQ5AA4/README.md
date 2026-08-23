---
id: "202608222117-HQ5AA4"
title: "Migrate blocked-result CLI fixture to structured task plan"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "regression"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "quality.regression"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T21:19:18.104Z"
  updated_by: "USER"
  note: "Approved under the user's autonomous regression-fix and v0.7.8 release authorization; exact plan digest sha256:a5680b8d99a69febdb2fa547ec5cd76cc81c098e70d9b581e29baf972f1b1a77."
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
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "One-file test-only isolation prevents production behavior changes."
      - "The failing fixture and expected task-centric migration are directly reproduced."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
  observed:
    authority_violations:
      - "verification:recorded-check-3:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "fail"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:d7fcd7ff61c8b70fdbb2c4e249251add91b0d5c1dafa87f4a54e5f1855f6065b"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "tests"
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
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:recorded-check-3"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 87b699240f13. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-22T21:19:32.197Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-23T07:04:17.355Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 87b699240f13. CLI accepted one state-bound external-agent semantic result."
    commit: "87b699240f1320337b68be21e0339c3ab7c2651c"
  -
    type: "verify"
    at: "2026-08-23T07:05:41.546Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
doc_version: 3
doc_updated_at: "2026-08-23T07:05:43.775Z"
doc_updated_by: "SUPERVISOR"
description: "Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation."
sections:
  Summary: |-
    Migrate blocked-result CLI fixture to structured task plan

    Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.
  Scope: |-
    - In scope: Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.
    - Out of scope: unrelated refactors not required for "Migrate blocked-result CLI fixture to structured task plan".
  Plan: "Migrate only the blocked-result integration fixture from legacy plan text to a baseline-bound structured TaskPlanProposal."
  Verify Steps: |-
    PLANNER fallback scaffold for "Migrate blocked-result CLI fixture to structured task plan". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Migrate blocked-result CLI fixture to structured task plan". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-23T07:05:41.546Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9cc780db964b3beb8fa827a03129e041edf1255f1784b8ce01bb045acb7ab944, input_digest=sha256:2fe68d49ab7c6b342f959ad45dfd3b9da81f0399d052090122ececee433bd33c

    Details:

    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608222117-HQ5AA4 declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608222117-HQ5AA4 declared verification

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts
    Result: fail
    Evidence: .agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608222117-HQ5AA4 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608222117-HQ5AA4-migrate-blocked-result-cli-fixture-to-structured/.agentplane/tasks/202608222117-HQ5AA4/blueprint/resolved-snapshot.json
    - old_digest: a9c8bab8a5dcc4767fb2769b57e335385abc0d8d6bbf3d1fd3e2d2cade2c3ad6
    - current_digest: a9c8bab8a5dcc4767fb2769b57e335385abc0d8d6bbf3d1fd3e2d2cade2c3ad6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608222117-HQ5AA4

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
    completion_contract_digest: "sha256:4b76aff3166ab28a7e6f189e5bd667185e4129d4dfb2ac2609242897865a0677"
    digest: "sha256:188700fde51040e1be0c662585e9e6c3ec4cbbb6d29b9f34f7f7309d9559724f"
    grant_id: "6ff309c1-a174-4391-aa97-587cd5b3d7d8"
    issued_at: "2026-08-22T21:19:18.104Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:d83445b1c3c0df3b29fcffad4418cbdd7142a81a89cecb564dfb24758c1d0e0e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608222117-HQ5AA4"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T21:19:18.104Z"
        approved_by: "USER"
        approved_digest: "sha256:a5680b8d99a69febdb2fa547ec5cd76cc81c098e70d9b581e29baf972f1b1a77"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T21:19:08.940Z"
      digest: "sha256:a5680b8d99a69febdb2fa547ec5cd76cc81c098e70d9b581e29baf972f1b1a77"
      proposal:
        assumptions:
          - "The integration harness exposes the same planner exchange contract already exercised by the critical task-centric E2E."
        planning_baseline:
          captured_at: "2026-08-22T21:17:48.903Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:5b0eb8e2e72e936d7eebf46a6b4126ad469546e9604c122312a271a6a47e5252"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608222117-HQ5AA4/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608222117-HQ5AA4"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              id: "check-suite"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-lint"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-suite"
                - "check-lint"
                - "check-typecheck"
              description: "The blocked-result suite, core lint, and typecheck pass with no production code change."
              id: "criterion-fixture-regression-fixed"
              required: true
          evidence_fingerprint: "sha256:352424c295a6806727534285d37b67a1507d31b97d2db9257ad5d3261ec135de"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-blocked-result-suite"
                  description: "The fixture obtains the live planning baseline and submits a schema-valid TaskPlanProposal before plan approval."
                  id: "criterion-structured-plan"
                  required: true
                -
                  check_ids:
                    - "check-blocked-result-suite"
                  description: "All nine blocked-result cases reach and retain their original lifecycle assertions."
                  id: "criterion-existing-behavior"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                symbol_hints:
                  - "prepareBlockedResultTask"
                  - "writeBlockedResult"
                  - "TaskPlanProposal"
              depends_on: []
              expected_outputs:
                - "task-centric-blocked-result-fixture"
              id: "migrate-blocked-result-plan-fixture"
              objective: "Teach prepareBlockedResultTask to submit a schema-valid baseline-bound single-WorkItem TaskPlanProposal before approving the plan, preserving every blocked-result assertion."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                    id: "check-blocked-result-suite"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-blocked-result-suite"
                    description: "The fixture obtains the live planning baseline and submits a schema-valid TaskPlanProposal before plan approval."
                    id: "criterion-structured-plan"
                    required: true
                  -
                    check_ids:
                      - "check-blocked-result-suite"
                    description: "All nine blocked-result cases reach and retain their original lifecycle assertions."
                    id: "criterion-existing-behavior"
                    required: true
                evidence_fingerprint: "sha256:528a60367bceeb1349084310b2d9113794df32001313d02125ea43b7eb360731"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608222117-HQ5AA4"
    event_cursor: 0
    final_validation: null
    id: "202608222117-HQ5AA4"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-22T21:17:42.169Z"
      constraints: []
      request: |-
        Migrate blocked-result CLI fixture to structured task plan

        Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.
      task_id: "202608222117-HQ5AA4"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-08-23T07:05:45.292Z"
    work_items:
      migrate-blocked-result-plan-fixture:
        attempt: 1
        claim_id: null
        id: "migrate-blocked-result-plan-fixture"
        last_failure:
          cause_refs:
            - "criterion-structured-plan"
            - "criterion-existing-behavior"
          code: "validation_failed"
          kind: "validation"
          message: "The existing dirty task workspace is intentional: it contains only the scoped blocked-result fixture modernization and task-owned artifacts, so the implementation episode can proceed without discarding work."
          retryable: true
        output_manifests:
          -
            digest: "sha256:4d13aed1afa556576c8f7e54c5c7895fc6c8f46651b37812fc83965589e2dc6c"
            id: "task-centric-blocked-result-fixture"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608222117-HQ5AA4"
              work_item_id: "migrate-blocked-result-plan-fixture"
            provenance:
              - "sha256:5b2416e9cf09a4b7002bd5b2dd6c2144dc42d5233483f9db971843671db7329c"
              - ".agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:c468bdf38c584f58bdac47ce7f99deaef0303d11966fa0f27bf1765a39c8ecf1"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json"
              check_id: "check-blocked-result-suite"
              command_identity: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              detail: "Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              exit_code: 1
              observed_at: "2026-08-23T07:05:45.289Z"
              repository_snapshot_digest: "sha256:c468bdf38c584f58bdac47ce7f99deaef0303d11966fa0f27bf1765a39c8ecf1"
              status: "failed"
          schema_version: 1
          stale_evidence: []
          status: "failed"
          unsatisfied_criteria:
            - "criterion-structured-plan"
            - "criterion-existing-behavior"
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608222117-HQ5AA4-executor-2d18cd4643c7c80779f45f91:
        aggregate_digest: "sha256:f07ffca38c9c66393d8bc1ceb36e39051b0f7db7c743bad3fa6be0c054f62f43"
        event:
          actor_id: "agentplane"
          at: "2026-08-23T07:05:45.292Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_7661e6ca5f17f2b01a2a5f8e"
          mutation_id: "external-result:work-order-202608222117-HQ5AA4-executor-2d18cd4643c7c80779f45f91"
          plan_digest: "sha256:a5680b8d99a69febdb2fa547ec5cd76cc81c098e70d9b581e29baf972f1b1a77"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608222117-HQ5AA4"
          task_revision: 7
          to: "REWORK_READY"
          work_item_id: "migrate-blocked-result-plan-fixture"
        mutation_id: "external-result:work-order-202608222117-HQ5AA4-executor-2d18cd4643c7c80779f45f91"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608222117-HQ5AA4"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    version: 1
id_source: "generated"
---
## Summary

Migrate blocked-result CLI fixture to structured task plan

Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.

## Scope

- In scope: Repair the proven task-centric regression in packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts: prepareBlockedResultTask seeds and approves only legacy plan text, so task advance re-enters PLANNER and all nine blocked-result cases fail before exercising their intended behavior. Change only this test fixture to install a schema-valid baseline-bound TaskPlanProposal before approval. Do not change production lifecycle, scope-extension semantics, context behavior, release behavior, or Knowledge Assimilation.
- Out of scope: unrelated refactors not required for "Migrate blocked-result CLI fixture to structured task plan".

## Plan

Migrate only the blocked-result integration fixture from legacy plan text to a baseline-bound structured TaskPlanProposal.

## Verify Steps

PLANNER fallback scaffold for "Migrate blocked-result CLI fixture to structured task plan". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Migrate blocked-result CLI fixture to structured task plan". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-23T07:05:41.546Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9cc780db964b3beb8fa827a03129e041edf1255f1784b8ce01bb045acb7ab944, input_digest=sha256:2fe68d49ab7c6b342f959ad45dfd3b9da81f0399d052090122ececee433bd33c

Details:

Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608222117-HQ5AA4 declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608222117-HQ5AA4 declared verification

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts
Result: fail
Evidence: .agentplane/tasks/202608222117-HQ5AA4/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608222117-HQ5AA4 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608222117-HQ5AA4-migrate-blocked-result-cli-fixture-to-structured/.agentplane/tasks/202608222117-HQ5AA4/blueprint/resolved-snapshot.json
- old_digest: a9c8bab8a5dcc4767fb2769b57e335385abc0d8d6bbf3d1fd3e2d2cade2c3ad6
- current_digest: a9c8bab8a5dcc4767fb2769b57e335385abc0d8d6bbf3d1fd3e2d2cade2c3ad6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608222117-HQ5AA4

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
