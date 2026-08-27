---
id: "202608271441-DVEMAE"
title: "Repair lifecycle fixture execution bases"
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
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --pool=threads --maxWorkers=2"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T14:45:50.821Z"
  updated_by: "USER"
  note: "The user explicitly instructed: Continue until refactoring is complete; all permissions are granted. Record that authorization for this bounded four-file lifecycle fixture repair, preserving all safety assertions and mandatory checks."
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
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Bounded test-only fixture maintenance on the integrated prerequisite base."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
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
      digest: "sha256:2164a747868530365896cd36fb95737621b4d3ce18337b64182dd21363dd6a08"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
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
    at: "2026-08-27T14:46:13.976Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T14:46:13.976Z"
doc_updated_by: "CODER"
description: "Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI."
sections:
  Summary: |-
    Repair lifecycle fixture execution bases

    Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.
  Scope: |-
    - In scope: Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.
    - Out of scope: unrelated refactors not required for "Repair lifecycle fixture execution bases".
  Plan: "Repair only the ten reproduced lifecycle test prerequisite failures. Use existing committed fixtures where execution identity is required. Bind start-ready baseline to the exact seed SHA. Preserve dependency, force approval, comment validation, status commit confirmation and incident assertions. Run focused tests, formatting, lint and mandatory full CI."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --pool=threads --maxWorkers=2. Expected: all 28 tests pass with dependency, force approval, comment validation, confirmation, incident and exact seed SHA assertions preserved.
    2. Run ESLint and Prettier on all four files and git diff --check. Expected: no errors.
    3. Run bun run ci:local:full. Expected: mandatory full CI succeeds.
    4. Review the diff. Expected: only the four scoped test files change, with no skips, weakened safety assertions, production or shared helper changes.
    5. Require hosted exact-head checks and supported integration before final closure.
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
    completion_contract_digest: "sha256:4b76aff3166ab28a7e6f189e5bd667185e4129d4dfb2ac2609242897865a0677"
    digest: "sha256:e48e884c09d5b6ee14cf33f24e7f53f1cfe55ffab69212b5e3b48b9c5d57f750"
    grant_id: "a7bb2854-9045-4dc7-b04d-72d4de96b2a0"
    issued_at: "2026-08-27T14:45:50.821Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:633a1c357f0c14105a90c5f9a7ca0007230809961913af17625dbb7202e2963c"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608271441-DVEMAE"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T14:45:50.821Z"
        approved_by: "USER"
        approved_digest: "sha256:ed05b2c841e190b91a71fa7f92a61f4d080a3b99786d64de2954faaf06e6ecb7"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T14:45:26.261Z"
      digest: "sha256:ed05b2c841e190b91a71fa7f92a61f4d080a3b99786d64de2954faaf06e6ecb7"
      proposal:
        assumptions:
          - "Only execution-dependent scenarios receive a committed fixture. Argument-validation fixtures remain unborn."
        planning_baseline:
          captured_at: "2026-08-27T14:41:52.205Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:ea87bcea56ec0989be884c94f7d0973bff0db2246d9b842c9474b901b6961144"
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
            - ".agentplane/tasks/202608271441-DVEMAE/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "5fce04a8be14816be4cae236d2941dff7045e214"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608271441-DVEMAE"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --pool=threads --maxWorkers=2"
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
              description: "All four lifecycle suites pass with exact real execution identity. Dependency, force approval, comment validation, confirmation and incident behavior assertions remain. No production behavior or mandatory gate changes."
              id: "lifecycle-fixture-contract"
              required: true
          evidence_fingerprint: "sha256:ea87bcea56ec0989be884c94f7d0973bff0db2246d9b842c9474b901b6961144"
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
                  description: "All four lifecycle suites pass with exact real execution identity. Dependency, force approval, comment validation, confirmation and incident behavior assertions remain. No production behavior or mandatory gate changes."
                  id: "lifecycle-fixture-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 90000
                optional_sources:
                  - "packages/testkit/src/cli-harness.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
                symbol_hints:
                  - "mkGitRepoRootWithCommit"
                  - "start_head_sha"
              depends_on: []
              expected_outputs:
                - "artifact:lifecycle-fixture-report"
              id: "repair-lifecycle-fixtures"
              objective: "Restore real Git execution prerequisites while preserving lifecycle safety and validation assertions."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --pool=threads --maxWorkers=2"
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
                    description: "All four lifecycle suites pass with exact real execution identity. Dependency, force approval, comment validation, confirmation and incident behavior assertions remain. No production behavior or mandatory gate changes."
                    id: "lifecycle-fixture-contract"
                    required: true
                evidence_fingerprint: "sha256:ea87bcea56ec0989be884c94f7d0973bff0db2246d9b842c9474b901b6961144"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271441-DVEMAE"
    event_cursor: 0
    final_validation: null
    id: "202608271441-DVEMAE"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --pool=threads --maxWorkers=2"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T14:41:11.638Z"
      constraints: []
      request: |-
        Repair lifecycle fixture execution bases

        Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.
      task_id: "202608271441-DVEMAE"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-27T14:45:50.821Z"
    work_items:
      repair-lifecycle-fixtures:
        attempt: 0
        claim_id: null
        id: "repair-lifecycle-fixtures"
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

Repair lifecycle fixture execution bases

Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.

## Scope

- In scope: Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.
- Out of scope: unrelated refactors not required for "Repair lifecycle fixture execution bases".

## Plan

Repair only the ten reproduced lifecycle test prerequisite failures. Use existing committed fixtures where execution identity is required. Bind start-ready baseline to the exact seed SHA. Preserve dependency, force approval, comment validation, status commit confirmation and incident assertions. Run focused tests, formatting, lint and mandatory full CI.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --pool=threads --maxWorkers=2. Expected: all 28 tests pass with dependency, force approval, comment validation, confirmation, incident and exact seed SHA assertions preserved.
2. Run ESLint and Prettier on all four files and git diff --check. Expected: no errors.
3. Run bun run ci:local:full. Expected: mandatory full CI succeeds.
4. Review the diff. Expected: only the four scoped test files change, with no skips, weakened safety assertions, production or shared helper changes.
5. Require hosted exact-head checks and supported integration before final closure.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
