---
id: "202608021232-53WJMN"
title: "Audit GitHub issues and pull requests for v0.7.1"
status: "DOING"
priority: "high"
owner: "REVIEWER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "github-audit"
  - "v0.7.1"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "network"
blueprint_request: "release.strict"
verify:
  - "gh issue list --state open --limit 200"
  - "gh pr list --state open --limit 200"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T12:38:50.187Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T12:53:06.415Z"
  updated_by: "TESTER"
  note: "Verified corrected hosted inventory: only issues #4663/#4641 and external backlog PR #4752 remain, plus active audit PR #4754. Init 29/29, focused agentplane 86/86, CLI active 5/5, shared guards, trust ratchet, and release incident gate all pass."
  attempts: 0
commit:
  hash: "eae94f01fba02cebe9bbe146519fdf14aad7f104"
  message: "🚧 53WJMN task: align hosted inventory verification"
comments:
  -
    author: "REVIEWER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: recorded complete hosted inventory, reproducible issue evidence, PR dispositions, release blockers, and the coordinated post-release TypeScript 7 decision."
  -
    author: "CODER"
    body: "Rework: adjusted hosted PR acceptance to distinguish the external backlog from the active audit task PR."
events:
  -
    type: "status"
    at: "2026-08-03T12:39:16.295Z"
    author: "REVIEWER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T12:49:32.684Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: recorded complete hosted inventory, reproducible issue evidence, PR dispositions, release blockers, and the coordinated post-release TypeScript 7 decision."
  -
    type: "verify"
    at: "2026-08-03T12:51:48.983Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Behavioral evidence passed, but Verify Step 2 is stale after opening task PR #4754: it expects #4752 to be the only open PR."
  -
    type: "status"
    at: "2026-08-03T12:52:31.472Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: adjusted hosted PR acceptance to distinguish the external backlog from the active audit task PR."
  -
    type: "verify"
    at: "2026-08-03T12:53:06.415Z"
    author: "TESTER"
    state: "ok"
    note: "Verified corrected hosted inventory: only issues #4663/#4641 and external backlog PR #4752 remain, plus active audit PR #4754. Init 29/29, focused agentplane 86/86, CLI active 5/5, shared guards, trust ratchet, and release incident gate all pass."
doc_version: 3
doc_updated_at: "2026-08-03T12:53:07.355Z"
doc_updated_by: "CODER"
description: "Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision."
sections:
  Summary: |-
    Audit GitHub issues and pull requests for v0.7.1

    Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
  Scope: |-
    - In scope: Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
    - Out of scope: unrelated refactors not required for "Audit GitHub issues and pull requests for v0.7.1".
  Plan: "Audit GitHub truth against current main acf9af541: reproduce issues #4663 and #4641 with isolated fixtures and focused current-main tests; classify every open PR by hosted state, unique commits, conflict/check status, release relevance, and whether main already supersedes it; close or disposition only items with direct evidence; create bounded code follow-up tasks for confirmed release-relevant defects instead of editing implementation in this REVIEWER task; record all commands, results, residual risks, and release recommendations in the task artifact; finish only when the open issue/PR inventory is refreshed and every item has an explicit disposition."
  Verify Steps: |-
    1. Run gh issue list --state open --limit 200. Expected: only confirmed release issues #4663 and #4641 remain open.
    2. Run gh pr list --state open --limit 200. Expected: the external backlog contains only deferred dependency PR #4752; the active audit task PR #4754 may also be open until integration.
    3. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts. Expected: 29 current-main init tests pass while the audit records the missing .agentplane/tmp assertion as the #4663 gap.
    4. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts. Expected: 4 current-main integration tests pass, including the reproduced unauthenticated-receipt behavior for #4641.
    5. Run the focused provider, receipt, foreign-artifact, branch-snapshot, and active-task suites plus bun run guards:check and bun run release:incidents:check. Expected: current main passes and supports closure of superseded task PRs.
    6. Review Findings. Expected: each original open issue and PR has one explicit disposition, release blockers are bounded, and TypeScript 7 is excluded from v0.7.1.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T12:51:48.983Z — VERIFY — needs_rework

    By: TESTER

    Note: Behavioral evidence passed, but Verify Step 2 is stale after opening task PR #4754: it expects #4752 to be the only open PR.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T12:49:32.684Z, excerpt_hash=sha256:6454590c7ac0bb58ae945d3165b6adf0b30cf77e35a0c6ec1c74092e4de864ae

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021232-53WJMN-audit-github-issues-and-pull-requests-for-v0-7-1/.agentplane/tasks/202608021232-53WJMN/blueprint/resolved-snapshot.json
    - old_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
    - current_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021232-53WJMN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021232-53WJMN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T12:53:06.415Z — VERIFY — ok

    By: TESTER

    Note: Verified corrected hosted inventory: only issues #4663/#4641 and external backlog PR #4752 remain, plus active audit PR #4754. Init 29/29, focused agentplane 86/86, CLI active 5/5, shared guards, trust ratchet, and release incident gate all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T12:52:31.472Z, excerpt_hash=sha256:8ec800e5aa8c013d8458b917a878d87c4d6064e913707af9d8d9c38e463e4012

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021232-53WJMN-audit-github-issues-and-pull-requests-for-v0-7-1/.agentplane/tasks/202608021232-53WJMN/blueprint/resolved-snapshot.json
    - old_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
    - current_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021232-53WJMN

    DecisionContextRef:
    - operator_action: stop
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
  Findings: |-
    - Observation: Issue #4663 reproduces on main acf9af541: RUNTIME_GITIGNORE_LINES omits .agentplane/tmp, and the 29 passing init tests do not assert that runtime-temporary path.
      Impact: .agentplane/tmp can appear as untracked repository noise after normal AgentPlane operations.
      Resolution: Create a release-blocking code task that adds the canonical ignore entry and regression coverage for init and upgrade behavior.

    - Observation: Issue #4641 reproduces on main acf9af541: the built-in task run path persists an execution receipt that standalone context verify-task rejects as unauthenticated; the focused integration suite passes because it currently asserts that failure.
      Impact: The default managed-runner path can complete execution but leave its verification context unusable, breaking end-to-end task completion.
      Resolution: Create a release-blocking code task that unifies the default runner with live authenticated context supervision without trusting persisted receipt bytes or path/hash claims.

    - Observation: After enqueueing BPMM04, task next-action emitted integration_queue_wait and runner_route_active=true while no AgentPlane integration worker process existed; the task progressed only through the explicit operator run-next command.
      Impact: The route oracle can instruct an agent to wait forever, making the deterministic lifecycle non-terminating without hidden operator knowledge.
      Resolution: Create a release-blocking code task that proves worker liveness before returning a wait route and otherwise emits the exact operator command.

    - Observation: Pull requests #4623, #4625, #4626, and #4628 were superseded by main acf9af541. Current-main focused provider, foreign-artifact, branch-snapshot, and active-task suites passed 82 tests; CLI active passed 5 tests; guards and release incident checks passed.
      Impact: Keeping obsolete task PRs open obscured hosted release truth and suggested code gaps that no longer existed.
      Resolution: Commented with exact evidence and closed all four stale task PRs.

    - Observation: Dependency pull requests #4640, #4532, #4531, and #4529 were duplicate, conflicting, or non-release major upgrades and were closed with explicit disposition. PR #4752 remains open; its format check and CLI compatibility ratchet fail and its 26-update scope is not suitable for v0.7.1.
      Impact: Merging the dependency batch now would widen release scope and invalidate qualification evidence.
      Resolution: Exclude #4752 from v0.7.1; repair and rebase it as a dedicated post-release dependency task.

    - Observation: PR #4586 attempted a website-only TypeScript 7 migration while both root and website currently use TypeScript 6.0.3; it also failed frozen-lockfile validation.
      Impact: A partial TypeScript 7 migration would split compiler behavior and toolchain assumptions across workspaces without improving the v0.7.1 runtime.
      Resolution: Defer TypeScript 7 to one coordinated root, website, tooling, and compatibility task for the post-v0.7.1 roadmap.

    - Observation: Hosted inventory after disposition contains exactly issues #4663 and #4641 plus PR #4752.
      Impact: Every remaining hosted item now has an explicit release disposition, but three confirmed local defects must be fixed before provider qualification.
      Resolution: Create three bounded release-blocking repository tasks after this audit is integrated; keep TypeScript 7 and dependency modernization outside the v0.7.1 dependency graph.

    - Observation: Open PR inventory now contains the expected deferred PR #4752 and this audit task PR #4754.
      Impact: The literal acceptance text would fail even though the external backlog disposition is correct.
      Resolution: Amend Step 2 to exclude the active task PR from backlog inventory, commit the task artifact, republish, and rerun the inventory check.
extensions:
  workflow_route_baseline:
    start_head_sha: "acf9af541b44c6b7af8dd8c680927b1b0b736382"
    version: 1
id_source: "generated"
---
## Summary

Audit GitHub issues and pull requests for v0.7.1

Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.

## Scope

- In scope: Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
- Out of scope: unrelated refactors not required for "Audit GitHub issues and pull requests for v0.7.1".

## Plan

Audit GitHub truth against current main acf9af541: reproduce issues #4663 and #4641 with isolated fixtures and focused current-main tests; classify every open PR by hosted state, unique commits, conflict/check status, release relevance, and whether main already supersedes it; close or disposition only items with direct evidence; create bounded code follow-up tasks for confirmed release-relevant defects instead of editing implementation in this REVIEWER task; record all commands, results, residual risks, and release recommendations in the task artifact; finish only when the open issue/PR inventory is refreshed and every item has an explicit disposition.

## Verify Steps

1. Run gh issue list --state open --limit 200. Expected: only confirmed release issues #4663 and #4641 remain open.
2. Run gh pr list --state open --limit 200. Expected: the external backlog contains only deferred dependency PR #4752; the active audit task PR #4754 may also be open until integration.
3. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts. Expected: 29 current-main init tests pass while the audit records the missing .agentplane/tmp assertion as the #4663 gap.
4. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts. Expected: 4 current-main integration tests pass, including the reproduced unauthenticated-receipt behavior for #4641.
5. Run the focused provider, receipt, foreign-artifact, branch-snapshot, and active-task suites plus bun run guards:check and bun run release:incidents:check. Expected: current main passes and supports closure of superseded task PRs.
6. Review Findings. Expected: each original open issue and PR has one explicit disposition, release blockers are bounded, and TypeScript 7 is excluded from v0.7.1.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T12:51:48.983Z — VERIFY — needs_rework

By: TESTER

Note: Behavioral evidence passed, but Verify Step 2 is stale after opening task PR #4754: it expects #4752 to be the only open PR.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T12:49:32.684Z, excerpt_hash=sha256:6454590c7ac0bb58ae945d3165b6adf0b30cf77e35a0c6ec1c74092e4de864ae

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021232-53WJMN-audit-github-issues-and-pull-requests-for-v0-7-1/.agentplane/tasks/202608021232-53WJMN/blueprint/resolved-snapshot.json
- old_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
- current_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021232-53WJMN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021232-53WJMN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T12:53:06.415Z — VERIFY — ok

By: TESTER

Note: Verified corrected hosted inventory: only issues #4663/#4641 and external backlog PR #4752 remain, plus active audit PR #4754. Init 29/29, focused agentplane 86/86, CLI active 5/5, shared guards, trust ratchet, and release incident gate all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T12:52:31.472Z, excerpt_hash=sha256:8ec800e5aa8c013d8458b917a878d87c4d6064e913707af9d8d9c38e463e4012

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021232-53WJMN-audit-github-issues-and-pull-requests-for-v0-7-1/.agentplane/tasks/202608021232-53WJMN/blueprint/resolved-snapshot.json
- old_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
- current_digest: eee8fdb94a23b9f8b71d78fb33609825512b7a4bf70d2c4fca919eada7b3da92
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021232-53WJMN

DecisionContextRef:
- operator_action: stop
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

- Observation: Issue #4663 reproduces on main acf9af541: RUNTIME_GITIGNORE_LINES omits .agentplane/tmp, and the 29 passing init tests do not assert that runtime-temporary path.
  Impact: .agentplane/tmp can appear as untracked repository noise after normal AgentPlane operations.
  Resolution: Create a release-blocking code task that adds the canonical ignore entry and regression coverage for init and upgrade behavior.

- Observation: Issue #4641 reproduces on main acf9af541: the built-in task run path persists an execution receipt that standalone context verify-task rejects as unauthenticated; the focused integration suite passes because it currently asserts that failure.
  Impact: The default managed-runner path can complete execution but leave its verification context unusable, breaking end-to-end task completion.
  Resolution: Create a release-blocking code task that unifies the default runner with live authenticated context supervision without trusting persisted receipt bytes or path/hash claims.

- Observation: After enqueueing BPMM04, task next-action emitted integration_queue_wait and runner_route_active=true while no AgentPlane integration worker process existed; the task progressed only through the explicit operator run-next command.
  Impact: The route oracle can instruct an agent to wait forever, making the deterministic lifecycle non-terminating without hidden operator knowledge.
  Resolution: Create a release-blocking code task that proves worker liveness before returning a wait route and otherwise emits the exact operator command.

- Observation: Pull requests #4623, #4625, #4626, and #4628 were superseded by main acf9af541. Current-main focused provider, foreign-artifact, branch-snapshot, and active-task suites passed 82 tests; CLI active passed 5 tests; guards and release incident checks passed.
  Impact: Keeping obsolete task PRs open obscured hosted release truth and suggested code gaps that no longer existed.
  Resolution: Commented with exact evidence and closed all four stale task PRs.

- Observation: Dependency pull requests #4640, #4532, #4531, and #4529 were duplicate, conflicting, or non-release major upgrades and were closed with explicit disposition. PR #4752 remains open; its format check and CLI compatibility ratchet fail and its 26-update scope is not suitable for v0.7.1.
  Impact: Merging the dependency batch now would widen release scope and invalidate qualification evidence.
  Resolution: Exclude #4752 from v0.7.1; repair and rebase it as a dedicated post-release dependency task.

- Observation: PR #4586 attempted a website-only TypeScript 7 migration while both root and website currently use TypeScript 6.0.3; it also failed frozen-lockfile validation.
  Impact: A partial TypeScript 7 migration would split compiler behavior and toolchain assumptions across workspaces without improving the v0.7.1 runtime.
  Resolution: Defer TypeScript 7 to one coordinated root, website, tooling, and compatibility task for the post-v0.7.1 roadmap.

- Observation: Hosted inventory after disposition contains exactly issues #4663 and #4641 plus PR #4752.
  Impact: Every remaining hosted item now has an explicit release disposition, but three confirmed local defects must be fixed before provider qualification.
  Resolution: Create three bounded release-blocking repository tasks after this audit is integrated; keep TypeScript 7 and dependency modernization outside the v0.7.1 dependency graph.

- Observation: Open PR inventory now contains the expected deferred PR #4752 and this audit task PR #4754.
  Impact: The literal acceptance text would fail even though the external backlog disposition is correct.
  Resolution: Amend Step 2 to exclude the active task PR from backlog inventory, commit the task artifact, republish, and rerun the inventory check.
