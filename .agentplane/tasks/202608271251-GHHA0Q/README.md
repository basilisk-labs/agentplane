---
id: "202608271251-GHHA0Q"
title: "Replace obsolete CLI test expectations with architecture-aligned contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 25
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
  updated_at: "2026-08-27T13:15:01.947Z"
  updated_by: "USER"
  note: "User authorized autonomous in-scope test modernization and continuation. Preserve existing work; apply the pending exact prompt-fixture scope delta through the supported route."
verification:
  state: "ok"
  updated_at: "2026-08-27T13:25:32.555Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
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
      - "packages/agentplane/src/cli/prompts.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Preserve the original four-file scope until the supported pending scope-extension operation adds exactly the two prompt-test files. No source edits are allowed before that operation and a fresh executor packet."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/prompts.test.ts,packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts; repository_effects=tests"
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/prompts.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/prompts.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
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
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
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
          - "packages/agentplane/src/cli/prompts.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
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
      digest: "sha256:ce34330683b91bfc7c8d9b1a1617ed68d274b6c06da4730ce04424884cd98f18"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
        - "central_component:packages/agentplane/src/cli/prompts.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
        - "central_path:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
        - "central_path:packages/agentplane/src/cli/prompts.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
        - "unknown_path:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
          - "packages/agentplane/src/cli/prompts.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
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
commit:
  hash: "54ed013b9e52173795ee80b5acdb7b47913b8b4b"
  message: "🚧 GHHA0Q task: apply external agent result"
comments:
  -
    author: "PLANNER"
    body: "Planning returned blocked: The task was seeded with nonexistent bun run test:cli:core. Correct the task verification command before binding a structured plan. No implementation changes were made."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b2019d67041f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. All scoped tests pass. Required ci:local:full is blocked by five environment-dependent prompt test failures outside the four-file authority. No changes were made during this rework episode. Recommended action: Extend this approved test-modernization task to the two specified test files only. Clearset prompt-mode input inside their beforeEach hooks and restore the inherited value in afterEach. Preserve TTY mocking, explicit plain-mode checks, cancellation checks and all assertions. Add or parameterize checks proving both inherited modes cannot contaminate the interactive fixture. Do not alter production agent-mode, remove plain mode, unset parent runtime environment to evade CI, or weaken release gates. Then rerun both environment variants and full CI through the supervisor. Requested scope: roots=packages/agentplane/src/cli/prompts.test.ts,packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts; repository effects=tests; request digest=sha256:4c736da4891a551d6f4dad3d28802a3ae722984d3063746524af63afba0ea27f. Agentplane receipt: external-agent-blocker/tr_c4d1d6f511b30e9288174acf9922e983/sha256:f7c7d2a7d5511301c485977d5e762a41b56167bcbc3cef42b548d96db2e3ea60/sha256:4c736da4891a551d6f4dad3d28802a3ae722984d3063746524af63afba0ea27f."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/prompts.test.ts, packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 54ed013b9e52. CLI accepted one state-bound external-agent semantic result."
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
  -
    type: "status"
    at: "2026-08-27T13:00:27.793Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b2019d67041f. CLI accepted one state-bound external-agent semantic result."
    commit: "b2019d67041f6a90cf334e905ffc3dd94a9be63b"
  -
    type: "verify"
    at: "2026-08-27T13:06:52.681Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-27T13:08:17.452Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. All scoped tests pass. Required ci:local:full is blocked by five environment-dependent prompt test failures outside the four-file authority. No changes were made during this rework episode. Recommended action: Extend this approved test-modernization task to the two specified test files only. Clearset prompt-mode input inside their beforeEach hooks and restore the inherited value in afterEach. Preserve TTY mocking, explicit plain-mode checks, cancellation checks and all assertions. Add or parameterize checks proving both inherited modes cannot contaminate the interactive fixture. Do not alter production agent-mode, remove plain mode, unset parent runtime environment to evade CI, or weaken release gates. Then rerun both environment variants and full CI through the supervisor. Requested scope: roots=packages/agentplane/src/cli/prompts.test.ts,packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts; repository effects=tests; request digest=sha256:4c736da4891a551d6f4dad3d28802a3ae722984d3063746524af63afba0ea27f. Agentplane receipt: external-agent-blocker/tr_c4d1d6f511b30e9288174acf9922e983/sha256:f7c7d2a7d5511301c485977d5e762a41b56167bcbc3cef42b548d96db2e3ea60/sha256:4c736da4891a551d6f4dad3d28802a3ae722984d3063746524af63afba0ea27f."
  -
    type: "status"
    at: "2026-08-27T13:16:32.879Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 54ed013b9e52. CLI accepted one state-bound external-agent semantic result."
    commit: "54ed013b9e52173795ee80b5acdb7b47913b8b4b"
  -
    type: "verify"
    at: "2026-08-27T13:25:32.555Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-27T13:25:35.003Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority."
sections:
  Summary: |-
    Replace obsolete CLI test expectations with architecture-aligned contracts

    Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
  Scope: |-
    - In scope: Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
    - Out of scope: unrelated refactors not required for "Replace obsolete CLI test expectations with architecture-aligned contracts".
  Plan: "Replan a schedulable follow-up under the original execution scope. Apply the already pending two-file scope extension through its supported operator command before any prompt edit. Then isolate inherited AGENTPLANE_PROMPTS, preserve all assertions, and require focused tests plus full CI."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2. Expected: all scoped help and external-episode identity tests pass without skips.
    2. Run git diff --check and formatter checks on changed files. Expected: no errors.
    3. Retain mandatory repository and hosted checks. Full release:prepublish remains required for 0.7.8; this task does not qualify or publish that release.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-27T13:06:52.681Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6f7c22f11187f4e6615945c14619958e49fde3021520d38b5c6d54807062d1da, input_digest=sha256:f6627b5fffa20d92966571b8e9b5e17e02521bb416da49e33d0ac4b119057d5b

    Details:

    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271251-GHHA0Q declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271251-GHHA0Q declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271251-GHHA0Q-replace-obsolete-cli-test-expectations-with-arch/.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json
    - old_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
    - current_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271251-GHHA0Q

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

    ### 2026-08-27T13:25:32.555Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6f7c22f11187f4e6615945c14619958e49fde3021520d38b5c6d54807062d1da, input_digest=sha256:9c4ba3cf309d73f7d4073cdf9d053af930f4f962086bb83a8342c25461952a79

    Details:

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check full_regression

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271251-GHHA0Q-replace-obsolete-cli-test-expectations-with-arch/.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json
    - old_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
    - current_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271251-GHHA0Q

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
    digest: "sha256:a79e6379fc1f2afcf695f82fed57373f8a7afd9a8d2e07d2f0d8e3a123affa37"
    grant_id: "e6f9a3ef-f111-4ce6-9dac-4122bfaa2c9e"
    issued_at: "2026-08-27T13:15:01.947Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a058456c24312324ecfd5c4c32c26f4ad6e9ef2ecd13a184e1d38d31e9072fb6"
    plan_revision: 19
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608271251-GHHA0Q"
  agentplane.scope_extension_request:
    applied_at: "2026-08-27T13:15:21.997Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:f7c7d2a7d5511301c485977d5e762a41b56167bcbc3cef42b548d96db2e3ea60"
    kind: "task_scope_extension_request"
    request:
      rationale: "The mandatory full test run exposes a shared inherited-environment fixture flaw. A two-file test-only isolation fix is within the user's approved strategy and preserves all runtime and release guarantees."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/prompts.test.ts"
        - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
    request_digest: "sha256:4c736da4891a551d6f4dad3d28802a3ae722984d3063746524af63afba0ea27f"
    schema_version: 1
    status: "applied"
    transition_id: "tr_c4d1d6f511b30e9288174acf9922e983"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T13:15:21.997Z"
        approved_by: "USER"
        approved_digest: "sha256:330e5530b0f94e84902d4cfadda8646f4d9a3c9c1514741ef94bc6c2dc1f392b"
        policy_facts:
          - "state_bound_scope_extension:sha256:4c736da4891a551d6f4dad3d28802a3ae722984d3063746524af63afba0ea27f"
        state: "approved"
      created_at: "2026-08-27T13:15:21.997Z"
      digest: "sha256:330e5530b0f94e84902d4cfadda8646f4d9a3c9c1514741ef94bc6c2dc1f392b"
      proposal:
        assumptions:
          - "The committed first slice and its prior plan history remain preserved; no completed result is fabricated."
        planning_baseline:
          captured_at: "2026-08-27T13:14:29.986Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:680d369dcc1ec49765671ae704f9452ba6430870cb4ce299774cd0b87a7e1d61"
          dirty_paths:
            - ".agentplane/tasks/202608271251-GHHA0Q/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "5c2591c0e8534dc141cdacdedccd16f98e540dfe"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:18"
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
              description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
              id: "prompt-isolation"
              required: true
          evidence_fingerprint: "sha256:680d369dcc1ec49765671ae704f9452ba6430870cb4ce299774cd0b87a7e1d61"
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
                  description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                  id: "prompt-isolation"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 50000
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli/agent-mode.ts"
                required_sources:
                  - "packages/agentplane/src/cli/prompts.test.ts"
                  - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
                symbol_hints:
                  - "AGENTPLANE_PROMPTS"
              depends_on: []
              expected_outputs:
                - "artifact:isolated-prompt-tests"
              id: "isolate-prompt-test-environment"
              objective: "After the pending two-file scope extension is applied, isolate inherited prompt-test environment and run required validation. Preserve the committed first slice."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "read"
                  resource: "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                -
                  kind: "path"
                  mode: "read"
                  resource: "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                -
                  kind: "path"
                  mode: "read"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                -
                  kind: "path"
                  mode: "read"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/prompts.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                - "packages/agentplane/src/cli/prompts.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
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
                    description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                    id: "prompt-isolation"
                    required: true
                evidence_fingerprint: "sha256:680d369dcc1ec49765671ae704f9452ba6430870cb4ce299774cd0b87a7e1d61"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202608271251-GHHA0Q"
    event_cursor: 1
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
    plan_history:
      -
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
      -
        approval:
          approved_at: "2026-08-27T13:13:49.202Z"
          approved_by: "USER"
          approved_digest: "sha256:5acdfa49e79d457c12c5cd386785d018d351d27aaf9583714ac78c4f7ef8ff81"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-27T13:11:22.586Z"
        digest: "sha256:5acdfa49e79d457c12c5cd386785d018d351d27aaf9583714ac78c4f7ef8ff81"
        proposal:
          assumptions:
            - "The committed first slice and its prior plan history remain preserved; no completed result is fabricated."
          planning_baseline:
            captured_at: "2026-08-27T13:10:45.227Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:abc30e551d5c4464fff7775c9a5eb66f3b5d50c2448a585705c2a2087c79cba7"
            dirty_paths:
              - ".agentplane/tasks/202608271251-GHHA0Q/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "5c2591c0e8534dc141cdacdedccd16f98e540dfe"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:15"
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
                description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                id: "prompt-isolation"
                required: true
            evidence_fingerprint: "sha256:abc30e551d5c4464fff7775c9a5eb66f3b5d50c2448a585705c2a2087c79cba7"
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
                    description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                    id: "prompt-isolation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 50000
                  optional_sources:
                    - "packages/agentplane/src/cli/run-cli/agent-mode.ts"
                  required_sources:
                    - "packages/agentplane/src/cli/prompts.test.ts"
                    - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
                  symbol_hints:
                    - "AGENTPLANE_PROMPTS"
                depends_on: []
                expected_outputs:
                  - "artifact:isolated-prompt-tests"
                id: "isolate-prompt-test-environment"
                objective: "Isolate prompt test input mode from the invoking agent environment without changing prompt behavior."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/prompts.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
                risk: "low"
                scope_roots:
                  - "packages/agentplane/src/cli/prompts.test.ts"
                  - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
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
                      description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                      id: "prompt-isolation"
                      required: true
                  evidence_fingerprint: "sha256:abc30e551d5c4464fff7775c9a5eb66f3b5d50c2448a585705c2a2087c79cba7"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202608271251-GHHA0Q"
      -
        approval:
          approved_at: "2026-08-27T13:15:01.947Z"
          approved_by: "USER"
          approved_digest: "sha256:25edb33e35e36380e376060921496a1c08c81be7f69c3c02d03098208fc13be2"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-27T13:14:52.483Z"
        digest: "sha256:25edb33e35e36380e376060921496a1c08c81be7f69c3c02d03098208fc13be2"
        proposal:
          assumptions:
            - "The committed first slice and its prior plan history remain preserved; no completed result is fabricated."
          planning_baseline:
            captured_at: "2026-08-27T13:14:29.986Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:680d369dcc1ec49765671ae704f9452ba6430870cb4ce299774cd0b87a7e1d61"
            dirty_paths:
              - ".agentplane/tasks/202608271251-GHHA0Q/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "5c2591c0e8534dc141cdacdedccd16f98e540dfe"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:18"
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
                description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                id: "prompt-isolation"
                required: true
            evidence_fingerprint: "sha256:680d369dcc1ec49765671ae704f9452ba6430870cb4ce299774cd0b87a7e1d61"
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
                    description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                    id: "prompt-isolation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 50000
                  optional_sources:
                    - "packages/agentplane/src/cli/run-cli/agent-mode.ts"
                  required_sources:
                    - "packages/agentplane/src/cli/prompts.test.ts"
                    - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
                  symbol_hints:
                    - "AGENTPLANE_PROMPTS"
                depends_on: []
                expected_outputs:
                  - "artifact:isolated-prompt-tests"
                id: "isolate-prompt-test-environment"
                objective: "After the pending two-file scope extension is applied, isolate inherited prompt-test environment and run required validation. Preserve the committed first slice."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "read"
                    resource: "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                  -
                    kind: "path"
                    mode: "read"
                    resource: "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                  -
                    kind: "path"
                    mode: "read"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                  -
                    kind: "path"
                    mode: "read"
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
                      description: "Prompt tests pass with inherited plain mode and with no mode, preserve explicit input-mode behavior, and all scoped and mandatory full checks pass."
                      id: "prompt-isolation"
                      required: true
                  evidence_fingerprint: "sha256:680d369dcc1ec49765671ae704f9452ba6430870cb4ce299774cd0b87a7e1d61"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202608271251-GHHA0Q"
    revision: 25
    schema_version: 1
    updated_at: "2026-08-27T13:25:36.124Z"
    work_items:
      isolate-prompt-test-environment:
        attempt: 1
        claim_id: null
        id: "isolate-prompt-test-environment"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:6bfd386bbe5ef1d9876389863d10994eea29c4df6af81f746ad017998e8b728c"
            id: "artifact:isolated-prompt-tests"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202608271251-GHHA0Q"
              work_item_id: "isolate-prompt-test-environment"
            provenance:
              - "sha256:8f90a711c44ef9ed54ed2d8022482a7c829fdb43707036b81798350b470b028f"
              - ".agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d0342c9896f95f8ee60126f3379dbb1e000276cb96139b731972754c1d647dd1"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
              check_id: "scoped-tests"
              command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2"
              detail: "Observed by node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2."
              exit_code: 0
              observed_at: "2026-08-27T13:25:36.118Z"
              repository_snapshot_digest: "sha256:d0342c9896f95f8ee60126f3379dbb1e000276cb96139b731972754c1d647dd1"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-27T13:25:36.118Z"
              repository_snapshot_digest: "sha256:d0342c9896f95f8ee60126f3379dbb1e000276cb96139b731972754c1d647dd1"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608271251-GHHA0Q-executor-5865deee1457b6d7067f1499:
        aggregate_digest: "sha256:9d1af224b57a7bc7ef900d27b8e3dadcbef31e01af52f519d5ecb4c0c2973171"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T13:06:55.809Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_ebb22ffb99abbfc59506bff0"
          mutation_id: "external-result:work-order-202608271251-GHHA0Q-executor-5865deee1457b6d7067f1499"
          plan_digest: "sha256:d3c4a3c4bbdab44234a565caee7d12f4d3e8a7d378d518461825f2b490f871a3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271251-GHHA0Q"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "modernize-test-contracts"
        mutation_id: "external-result:work-order-202608271251-GHHA0Q-executor-5865deee1457b6d7067f1499"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202608271251-GHHA0Q"
      external-result:work-order-202608271251-GHHA0Q-executor-ba9bd3c5bf1b1d340c4e0692:
        aggregate_digest: "sha256:90e44b0a36332e3ed42fc5a0cf7f87222b1b1d2fe3feaeb8f0a9efc042427232"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T13:25:36.124Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_3aa344307e9cbddb8fdb4714"
          mutation_id: "external-result:work-order-202608271251-GHHA0Q-executor-ba9bd3c5bf1b1d340c4e0692"
          plan_digest: "sha256:330e5530b0f94e84902d4cfadda8646f4d9a3c9c1514741ef94bc6c2dc1f392b"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271251-GHHA0Q"
          task_revision: 24
          to: "COMPLETED"
          work_item_id: "isolate-prompt-test-environment"
        mutation_id: "external-result:work-order-202608271251-GHHA0Q-executor-ba9bd3c5bf1b1d340c4e0692"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202608271251-GHHA0Q"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "54ed013b9e52173795ee80b5acdb7b47913b8b4b"
  task_execution_context:
    base_ref: "main"
    base_sha: "74c39ba73325b0808c46bdd0accb46a5a6cf2c22"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
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

Replan a schedulable follow-up under the original execution scope. Apply the already pending two-file scope extension through its supported operator command before any prompt edit. Then isolate inherited AGENTPLANE_PROMPTS, preserve all assertions, and require focused tests plus full CI.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2. Expected: all scoped help and external-episode identity tests pass without skips.
2. Run git diff --check and formatter checks on changed files. Expected: no errors.
3. Retain mandatory repository and hosted checks. Full release:prepublish remains required for 0.7.8; this task does not qualify or publish that release.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-27T13:06:52.681Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6f7c22f11187f4e6615945c14619958e49fde3021520d38b5c6d54807062d1da, input_digest=sha256:f6627b5fffa20d92966571b8e9b5e17e02521bb416da49e33d0ac4b119057d5b

Details:

Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271251-GHHA0Q declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271251-GHHA0Q declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271251-GHHA0Q-replace-obsolete-cli-test-expectations-with-arch/.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json
- old_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
- current_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271251-GHHA0Q

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

### 2026-08-27T13:25:32.555Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6f7c22f11187f4e6615945c14619958e49fde3021520d38b5c6d54807062d1da, input_digest=sha256:9c4ba3cf309d73f7d4073cdf9d053af930f4f962086bb83a8342c25461952a79

Details:

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check full_regression

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271251-GHHA0Q Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271251-GHHA0Q-replace-obsolete-cli-test-expectations-with-arch/.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json
- old_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
- current_digest: f1b26b57f079cbc23ac19906eea9e1d366ecf04d70a161651377eaada92ae52b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271251-GHHA0Q

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
