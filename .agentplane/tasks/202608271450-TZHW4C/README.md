---
id: "202608271450-TZHW4C"
title: "Modernize structured planner-intent fixtures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202608271251-GHHA0Q"
tags:
  - "tests"
  - "architecture"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts --pool=threads --maxWorkers=2"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T14:52:00.194Z"
  updated_by: "USER"
  note: "The user explicitly authorized autonomous refactoring until completion and granted all permissions. Apply that authorization to this bounded three-file planner fixture modernization while preserving approval and safety gates."
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
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Test helper is classified as source_code but the bounded scope contains no production code."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
          - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
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
      digest: "sha256:7e6b95c44801b73084e60927ca798f6ea0182a9907c65d054a3a756af5be3a4a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
        - "central_component:packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
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
    at: "2026-08-27T14:52:20.838Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T14:52:20.838Z"
doc_updated_by: "CODER"
description: "Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI."
sections:
  Summary: |-
    Modernize structured planner-intent fixtures

    Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.
  Scope: |-
    - In scope: Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.
    - Out of scope: unrelated refactors not required for "Modernize structured planner-intent fixtures".
  Plan: "Modernize only the planner-intent test helper and its two consumers. Build a typed bounded TaskPlanProposal from each actual PLANNER work order with exact planning baseline and declared checks. Keep incomplete-intent negative coverage and never emit proposals for executor or evaluator results. Seed real Git bases before planning. Preserve one explicit user approval, forbidden-effect and network boundaries, route selection, work preservation and independent base tests. Repair isolated fake CI/provider fixture prerequisites if exposed. Run focused tests, lint, formatting and full CI."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts --pool=threads --maxWorkers=2. Expected: both suites pass without skipped tests; explicit approval, network and forbidden effects, missing intent, route selection and exact bases remain asserted.
    2. Run ESLint, Prettier and git diff --check on the three files. Expected: no errors and unchanged hotspot baseline.
    3. Run bun run ci:local:full. Expected: mandatory full CI passes.
    4. Review the diff. Expected: only three approved fixture files change; no product behavior, global helper semantics, CI gates, policy or release graph changes.
    5. Require hosted exact-head checks and supported integration before closure.
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
    digest: "sha256:640ed07621f22bc517ba494b3816075002f71cd323ed55343b26d47ec7a565d9"
    grant_id: "3bc47342-f3da-49ea-89c6-1b65accc1385"
    issued_at: "2026-08-27T14:52:00.194Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:65f5dfde0424cf3e08bd563b663bd33d50d5c5f405bdb5a5f449df7e744be75b"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608271450-TZHW4C"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T14:52:00.194Z"
        approved_by: "USER"
        approved_digest: "sha256:9649584b7fcb4c1c31925c5339cc703721aeecbb34870b0dd04f295b69b74322"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T14:51:30.936Z"
      digest: "sha256:9649584b7fcb4c1c31925c5339cc703721aeecbb34870b0dd04f295b69b74322"
      proposal:
        assumptions:
          - "Current canonical planning and real implementation identity are required prerequisites, not optional fixture shortcuts."
        planning_baseline:
          captured_at: "2026-08-27T14:50:41.340Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c1c4d80ed68bbbc7a3ea08877c2b48416e9c31fb41ec819571e5471cdfce4bf6"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608271450-TZHW4C/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "5fce04a8be14816be4cae236d2941dff7045e214"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608271450-TZHW4C"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts --pool=threads --maxWorkers=2"
              id: "scoped-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "scoped-tests"
                - "full-ci"
              description: "Both suites pass using exact-baseline structured plans. Explicit approval, forbidden effects, network approval, incomplete intent, route selection, independent Git bases and work preservation remain covered. No production or mandatory CI changes."
              id: "planner-intent-contract"
              required: true
          evidence_fingerprint: "sha256:c1c4d80ed68bbbc7a3ea08877c2b48416e9c31fb41ec819571e5471cdfce4bf6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "scoped-tests"
                    - "full-ci"
                  description: "Both suites pass using exact-baseline structured plans. Explicit approval, forbidden effects, network approval, incomplete intent, route selection, independent Git bases and work preservation remain covered. No production or mandatory CI changes."
                  id: "planner-intent-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                required_sources:
                  - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                symbol_hints:
                  - "TaskPlanProposal"
                  - "writePlannerResult"
              depends_on: []
              expected_outputs:
                - "artifact:planner-intent-fixture-report"
              id: "modernize-planner-intent-fixtures"
              objective: "Exercise actual structured planning, approval and bounded execution without legacy fixture shortcuts."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts --pool=threads --maxWorkers=2"
                    id: "scoped-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "scoped-tests"
                      - "full-ci"
                    description: "Both suites pass using exact-baseline structured plans. Explicit approval, forbidden effects, network approval, incomplete intent, route selection, independent Git bases and work preservation remain covered. No production or mandatory CI changes."
                    id: "planner-intent-contract"
                    required: true
                evidence_fingerprint: "sha256:c1c4d80ed68bbbc7a3ea08877c2b48416e9c31fb41ec819571e5471cdfce4bf6"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271450-TZHW4C"
    event_cursor: 0
    final_validation: null
    id: "202608271450-TZHW4C"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts --pool=threads --maxWorkers=2"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T14:50:25.302Z"
      constraints: []
      request: |-
        Modernize structured planner-intent fixtures

        Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.
      task_id: "202608271450-TZHW4C"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-27T14:52:00.194Z"
    work_items:
      modernize-planner-intent-fixtures:
        attempt: 0
        claim_id: null
        id: "modernize-planner-intent-fixtures"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "5fce04a8be14816be4cae236d2941dff7045e214"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "5fce04a8be14816be4cae236d2941dff7045e214"
    version: 1
id_source: "generated"
---
## Summary

Modernize structured planner-intent fixtures

Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.

## Scope

- In scope: Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.
- Out of scope: unrelated refactors not required for "Modernize structured planner-intent fixtures".

## Plan

Modernize only the planner-intent test helper and its two consumers. Build a typed bounded TaskPlanProposal from each actual PLANNER work order with exact planning baseline and declared checks. Keep incomplete-intent negative coverage and never emit proposals for executor or evaluator results. Seed real Git bases before planning. Preserve one explicit user approval, forbidden-effect and network boundaries, route selection, work preservation and independent base tests. Repair isolated fake CI/provider fixture prerequisites if exposed. Run focused tests, lint, formatting and full CI.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts --pool=threads --maxWorkers=2. Expected: both suites pass without skipped tests; explicit approval, network and forbidden effects, missing intent, route selection and exact bases remain asserted.
2. Run ESLint, Prettier and git diff --check on the three files. Expected: no errors and unchanged hotspot baseline.
3. Run bun run ci:local:full. Expected: mandatory full CI passes.
4. Review the diff. Expected: only three approved fixture files change; no product behavior, global helper semantics, CI gates, policy or release graph changes.
5. Require hosted exact-head checks and supported integration before closure.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
