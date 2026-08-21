---
id: "202608211010-X9X57M"
title: "Route new task creation to the primary checkout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/new*.test.ts"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-21T10:13:30.818Z"
  updated_by: "USER"
  note: "User explicitly approved plan X9X57M in Codex task on 2026-08-21."
verification:
  state: "pending"
  updated_at: "2026-08-21T10:46:58.222Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 1
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
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/begin.command.ts"
      - "packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
      - "packages/agentplane/src/commands/task/new.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "No network, provider, dependency, schema, or public API change is required."
      - "Repository branch_pr policy requires task artifacts to remain isolated by authoritative checkout."
      - "The defect spans command-context selection and task-creation integration behavior, so source changes and focused regression tests are required."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-guided.test.ts,packages/agentplane/src/commands/task/begin.command.ts; repository_effects=repository_write,source_code,tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/commands/task/new.primary-checkout.test.ts; repository_effects=repository_write,tests"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/begin.command.ts"
      - "packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
      - "packages/agentplane/src/commands/task/new.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/begin.command.ts"
      - "packages/agentplane/src/commands/task/new.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
          - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
          - "packages/agentplane/src/commands/task/begin.command.ts"
          - "packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
          - "packages/agentplane/src/commands/task/new.ts"
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
      digest: "sha256:80b204cbd03e8ef3ca1df609e59c5e4acfc640245db3f122093c5241f7c07cca"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
          - "packages/agentplane/src/commands/task/begin.command.ts"
          - "packages/agentplane/src/commands/task/new.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Implemented primary-checkout routing for branch_pr task creation through the local task store and added focused helper plus CLI regression coverage. Focused tests pass. Compatibility review found that task begin --plan performs a second task mutation through the invoking worktree context after creation; completing the fix without regressing that command requires two additional files outside the approved writable roots. Recommended action: Approve the narrow scope extension, route task begin's post-creation plan mutation through resolveTaskOwnerCommandContext, add a linked-worktree task begin --plan regression, then rerun all required checks. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-guided.test.ts,packages/agentplane/src/commands/task/begin.command.ts; repository effects=repository_write,source_code,tests; request digest=sha256:9d47a50e24052a56b1d604d9eac48d520e46a571de409571a0a6fd32ec3a6ad5. Agentplane receipt: external-agent-blocker/tr_946a86d5e9a85ee6f4200bf64c837c10/sha256:ae330482b009f8baafbdf0f97f24c30658d14bc7b2272a96c33e621036a11130/sha256:9d47a50e24052a56b1d604d9eac48d520e46a571de409571a0a6fd32ec3a6ad5."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-guided.test.ts, packages/agentplane/src/commands/task/begin.command.ts; repository effects: repository_write, source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5c561bc70225. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Implementation rework is blocked by the declared verification command: its new*.test.ts glob matches no file, the task document is protected during this semantic episode, and the current writable roots do not permit adding a matching regression test file. Recommended action: Approve the minimal scope extension, add packages/agentplane/src/commands/task/new.primary-checkout.test.ts, run the declared check and required repository checks, then resume the task lifecycle. Requested scope: roots=packages/agentplane/src/commands/task/new.primary-checkout.test.ts; repository effects=repository_write,tests; request digest=sha256:6dc06d68d86fd0130d9ca48472d8114a08ce5d5653ffd35efe46984811feef88. Agentplane receipt: external-agent-blocker/tr_62e7ce4306c819c883ddeee581756eb3/sha256:4eef279c29fde74c7b784480d0411af5a32c3f255ac2d984ab72f3825fa77767/sha256:6dc06d68d86fd0130d9ca48472d8114a08ce5d5653ffd35efe46984811feef88."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/commands/task/new.primary-checkout.test.ts; repository effects: repository_write, tests."
events:
  -
    type: "status"
    at: "2026-08-21T10:13:57.014Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-21T10:19:20.045Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Implemented primary-checkout routing for branch_pr task creation through the local task store and added focused helper plus CLI regression coverage. Focused tests pass. Compatibility review found that task begin --plan performs a second task mutation through the invoking worktree context after creation; completing the fix without regressing that command requires two additional files outside the approved writable roots. Recommended action: Approve the narrow scope extension, route task begin's post-creation plan mutation through resolveTaskOwnerCommandContext, add a linked-worktree task begin --plan regression, then rerun all required checks. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-guided.test.ts,packages/agentplane/src/commands/task/begin.command.ts; repository effects=repository_write,source_code,tests; request digest=sha256:9d47a50e24052a56b1d604d9eac48d520e46a571de409571a0a6fd32ec3a6ad5. Agentplane receipt: external-agent-blocker/tr_946a86d5e9a85ee6f4200bf64c837c10/sha256:ae330482b009f8baafbdf0f97f24c30658d14bc7b2272a96c33e621036a11130/sha256:9d47a50e24052a56b1d604d9eac48d520e46a571de409571a0a6fd32ec3a6ad5."
  -
    type: "status"
    at: "2026-08-21T10:28:13.913Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5c561bc70225. CLI accepted one state-bound external-agent semantic result."
    commit: "5c561bc702250c816bdc0460a7b1fd5636b5fa5d"
  -
    type: "verify"
    at: "2026-08-21T10:35:25.786Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/task/new*.test.ts"
  -
    type: "status"
    at: "2026-08-21T10:37:51.498Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Implementation rework is blocked by the declared verification command: its new*.test.ts glob matches no file, the task document is protected during this semantic episode, and the current writable roots do not permit adding a matching regression test file. Recommended action: Approve the minimal scope extension, add packages/agentplane/src/commands/task/new.primary-checkout.test.ts, run the declared check and required repository checks, then resume the task lifecycle. Requested scope: roots=packages/agentplane/src/commands/task/new.primary-checkout.test.ts; repository effects=repository_write,tests; request digest=sha256:6dc06d68d86fd0130d9ca48472d8114a08ce5d5653ffd35efe46984811feef88. Agentplane receipt: external-agent-blocker/tr_62e7ce4306c819c883ddeee581756eb3/sha256:4eef279c29fde74c7b784480d0411af5a32c3f255ac2d984ab72f3825fa77767/sha256:6dc06d68d86fd0130d9ca48472d8114a08ce5d5653ffd35efe46984811feef88."
doc_version: 3
doc_updated_at: "2026-08-21T10:37:51.498Z"
doc_updated_by: "SUPERVISOR"
description: "Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership."
sections:
  Summary: |-
    Route new task creation to the primary checkout

    Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership.
  Scope: |-
    - In scope: Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership.
    - Out of scope: unrelated refactors not required for "Route new task creation to the primary checkout".
  Plan: "Implement primary-checkout routing for task creation. Resolve the primary linked worktree before the creation lock and backend write, preserve behavior when already in the primary checkout or a standalone repository, and add an integration regression proving that task new invoked from task A's branch_pr worktree writes task B only under the primary checkout without dirtying task A. Verify focused task-creation and context-routing tests, typecheck, core lint, policy routing, and diff cleanliness."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/task/new*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-21T10:35:25.786Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/task/new*.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0d7c9f8d5b8d75c4eb706fdce0fff0d88ee1f31087b53324aa917113c92545b2, input_digest=sha256:59e5655af3a8eb0332ccc5755e81f97af06538125334b03ce05597023d660c4d

    Details:

    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202608211010-X9X57M/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608211010-X9X57M declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608211010-X9X57M/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608211010-X9X57M declared verification

    Command: bunx vitest run packages/agentplane/src/commands/task/new*.test.ts
    Result: fail
    Evidence: .agentplane/tasks/202608211010-X9X57M/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608211010-X9X57M declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608211010-X9X57M-route-new-task-creation-to-the-primary-checkout/.agentplane/tasks/202608211010-X9X57M/blueprint/resolved-snapshot.json
    - old_digest: 4390e05891ebc760850e21176b4159bea23f12e69ba23fe9efca44a4f1d80e71
    - current_digest: 4390e05891ebc760850e21176b4159bea23f12e69ba23fe9efca44a4f1d80e71
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608211010-X9X57M

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608211010-X9X57M
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
  agentplane.scope_extension_request:
    applied_at: "2026-08-21T10:46:58.222Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:4eef279c29fde74c7b784480d0411af5a32c3f255ac2d984ab72f3825fa77767"
    kind: "task_scope_extension_request"
    request:
      rationale: "Add one focused regression test file whose path is selected by the already-approved declared verification command. The task README is protected and must not be edited manually."
      repository_effects:
        - "repository_write"
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
    request_digest: "sha256:6dc06d68d86fd0130d9ca48472d8114a08ce5d5653ffd35efe46984811feef88"
    schema_version: 1
    status: "applied"
    transition_id: "tr_62e7ce4306c819c883ddeee581756eb3"
  implementation_commit:
    hash: "5c561bc702250c816bdc0460a7b1fd5636b5fa5d"
  task_execution_context:
    base_ref: "main"
    base_sha: "3e756cba6cfd6619327433c5fc38f6a52e79131d"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "3e756cba6cfd6619327433c5fc38f6a52e79131d"
    version: 1
id_source: "generated"
---
## Summary

Route new task creation to the primary checkout

Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership.

## Scope

- In scope: Prevent task new invoked from a branch_pr task worktree from writing the new task README into that worktree; route creation through the primary checkout and add regression coverage for isolated task ownership.
- Out of scope: unrelated refactors not required for "Route new task creation to the primary checkout".

## Plan

Implement primary-checkout routing for task creation. Resolve the primary linked worktree before the creation lock and backend write, preserve behavior when already in the primary checkout or a standalone repository, and add an integration regression proving that task new invoked from task A's branch_pr worktree writes task B only under the primary checkout without dirtying task A. Verify focused task-creation and context-routing tests, typecheck, core lint, policy routing, and diff cleanliness.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/task/new*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-21T10:35:25.786Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/commands/task/new*.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0d7c9f8d5b8d75c4eb706fdce0fff0d88ee1f31087b53324aa917113c92545b2, input_digest=sha256:59e5655af3a8eb0332ccc5755e81f97af06538125334b03ce05597023d660c4d

Details:

Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202608211010-X9X57M/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608211010-X9X57M declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608211010-X9X57M/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608211010-X9X57M declared verification

Command: bunx vitest run packages/agentplane/src/commands/task/new*.test.ts
Result: fail
Evidence: .agentplane/tasks/202608211010-X9X57M/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608211010-X9X57M declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608211010-X9X57M-route-new-task-creation-to-the-primary-checkout/.agentplane/tasks/202608211010-X9X57M/blueprint/resolved-snapshot.json
- old_digest: 4390e05891ebc760850e21176b4159bea23f12e69ba23fe9efca44a4f1d80e71
- current_digest: 4390e05891ebc760850e21176b4159bea23f12e69ba23fe9efca44a4f1d80e71
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608211010-X9X57M

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608211010-X9X57M
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
