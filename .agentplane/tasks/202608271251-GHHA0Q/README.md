---
id: "202608271251-GHHA0Q"
title: "Replace obsolete CLI test expectations with architecture-aligned contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "tests"
  - "architecture"
task_kind: "code"
mutation_scope: "code"
verify:
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T12:55:37.441Z"
  updated_by: "USER"
  note: "User instructed: Продолжай тогда, following the architecture-aligned test audit, and previously authorized autonomous in-scope work. This approval covers the four-file test-only slice, not skipped checks, product behavior changes, publication, or roadmap dependency changes."
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
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The user approved architecture-aligned test modernization. This first slice changes only four test files and retains all release and safety gates."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
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
          - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
          - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
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
      digest: "sha256:4a67c00b25789f69567fab83878ae91e8b86c19eb8299e6535693d6f570b4519"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
        - "central_component:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
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
    author: "PLANNER"
    body: "Planning returned blocked: The task was seeded with nonexistent bun run test:cli:core. Correct the task verification command before binding a structured plan. No implementation changes were made."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "comment"
    at: "2026-08-27T12:52:55.434Z"
    author: "PLANNER"
    body: "Planning returned blocked: The task was seeded with nonexistent bun run test:cli:core. Correct the task verification command before binding a structured plan. No implementation changes were made."
  -
    type: "status"
    at: "2026-08-27T12:55:50.220Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T12:55:50.220Z"
doc_updated_by: "CODER"
description: "Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority."
sections:
  Summary: |-
    Replace obsolete CLI test expectations with architecture-aligned contracts

    Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
  Scope: |-
    - In scope: Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
    - Out of scope: unrelated refactors not required for "Replace obsolete CLI test expectations with architecture-aligned contracts".
  Plan: "Update four test-owned files for current route help and external-episode contracts. First update the retired repository-route help snapshot and assert current route semantics. Then repair the two worktree tests only where obsolete identity expectations or invalid test setup prevent them from exercising the intended contract. Assert packet/exchange/journal identity agreement and semantic authority; keep stale-result, replay, worktree isolation and no-mutation recovery checks. Run the declared three-file Vitest command and formatter/diff checks. Do not skip tests, change production code, alter shared unborn fixtures, weaken CI, publish a release or modify roadmap dependencies. Stop if remaining failures require a product decision or files outside the four declared roots."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2. Expected: all scoped help and external-episode identity tests pass without skips.
    2. Run git diff --check and formatter checks on changed files. Expected: no errors.
    3. Retain mandatory repository and hosted checks. Full release:prepublish remains required for 0.7.8; this task does not qualify or publish that release.
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
    digest: "sha256:3ac26c0ddae3dfd2afc1c1604918ef0988dc71acc04f0f658e1e6d264a3703fd"
    grant_id: "971582fb-3c63-40de-a146-952a49511f3c"
    issued_at: "2026-08-27T12:55:37.441Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c0a70e58010bd344863437b65272c20177230b44e0aab4ab4695d536b727b4d7"
    plan_revision: 6
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608271251-GHHA0Q"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T12:55:37.441Z"
        approved_by: "USER"
        approved_digest: "sha256:d3c4a3c4bbdab44234a565caee7d12f4d3e8a7d378d518461825f2b490f871a3"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T12:55:21.896Z"
      digest: "sha256:d3c4a3c4bbdab44234a565caee7d12f4d3e8a7d378d518461825f2b490f871a3"
      proposal:
        assumptions:
          - "Provider integration and final release evidence remain supervisor/operator phases and are not replaced by local test success."
        planning_baseline:
          captured_at: "2026-08-27T12:54:49.879Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:91ef39731d6e3bb96b0753d57792a12ae4437001eff3bd080ea4289247469c03"
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
            - ".agentplane/tasks/202608271251-GHHA0Q/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "74c39ba73325b0808c46bdd0accb46a5a6cf2c22"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:5"
        schema_version: 1
        task_id: "202608271251-GHHA0Q"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
              id: "scoped-tests"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "scoped-tests"
              description: "Help uses auto/direct/branch_pr without the retired repository route. Both task-advance tests preserve worktree, authority, frozen identity, replay and recovery guarantees using valid fixtures and persisted exchange identity rather than obsolete internal sequencing."
              id: "current-contracts"
              required: true
          evidence_fingerprint: "sha256:91ef39731d6e3bb96b0753d57792a12ae4437001eff3bd080ea4289247469c03"
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
                  description: "Help uses auto/direct/branch_pr without the retired repository route. Both task-advance tests preserve worktree, authority, frozen identity, replay and recovery guarantees using valid fixtures and persisted exchange identity rather than obsolete internal sequencing."
                  id: "current-contracts"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "docs/adr/0014-task-execution-authority.md"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                symbol_hints:
                  - "agentTransitionId"
                  - "superviseExternalAgentIssuance"
              depends_on: []
              expected_outputs:
                - "artifact:modernized-cli-contract-tests"
              id: "modernize-test-contracts"
              objective: "Modernize the scoped help and worktree tests without removing their durable guarantees."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
                    id: "scoped-tests"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "scoped-tests"
                    description: "Help uses auto/direct/branch_pr without the retired repository route. Both task-advance tests preserve worktree, authority, frozen identity, replay and recovery guarantees using valid fixtures and persisted exchange identity rather than obsolete internal sequencing."
                    id: "current-contracts"
                    required: true
                evidence_fingerprint: "sha256:91ef39731d6e3bb96b0753d57792a12ae4437001eff3bd080ea4289247469c03"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271251-GHHA0Q"
    event_cursor: 0
    final_validation: null
    id: "202608271251-GHHA0Q"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-27T12:53:44.863Z"
      constraints: []
      request: |-
        Replace obsolete CLI test expectations with architecture-aligned contracts

        Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
      task_id: "202608271251-GHHA0Q"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 6
    schema_version: 1
    updated_at: "2026-08-27T12:55:37.441Z"
    work_items:
      modernize-test-contracts:
        attempt: 0
        claim_id: null
        id: "modernize-test-contracts"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "74c39ba73325b0808c46bdd0accb46a5a6cf2c22"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "74c39ba73325b0808c46bdd0accb46a5a6cf2c22"
    version: 1
id_source: "generated"
---
## Summary

Replace obsolete CLI test expectations with architecture-aligned contracts

Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.

## Scope

- In scope: Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
- Out of scope: unrelated refactors not required for "Replace obsolete CLI test expectations with architecture-aligned contracts".

## Plan

Update four test-owned files for current route help and external-episode contracts. First update the retired repository-route help snapshot and assert current route semantics. Then repair the two worktree tests only where obsolete identity expectations or invalid test setup prevent them from exercising the intended contract. Assert packet/exchange/journal identity agreement and semantic authority; keep stale-result, replay, worktree isolation and no-mutation recovery checks. Run the declared three-file Vitest command and formatter/diff checks. Do not skip tests, change production code, alter shared unborn fixtures, weaken CI, publish a release or modify roadmap dependencies. Stop if remaining failures require a product decision or files outside the four declared roots.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2. Expected: all scoped help and external-episode identity tests pass without skips.
2. Run git diff --check and formatter checks on changed files. Expected: no errors.
3. Retain mandatory repository and hosted checks. Full release:prepublish remains required for 0.7.8; this task does not qualify or publish that release.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
