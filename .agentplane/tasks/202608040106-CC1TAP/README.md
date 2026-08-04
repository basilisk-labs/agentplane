---
id: "202608040106-CC1TAP"
title: "Remove calendar-date flake from merge token-usage unit test"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "test"
  - "token-usage"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
verify:
  - "The assertion must still prove token_usage.updated_at is a valid observed timestamp rather than weakening coverage to mere presence."
  - "The exact hosted-merge-sync.token-usage test must fail before the change and pass afterward on any UTC calendar day."
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T01:06:30.775Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T01:09:05.747Z"
  updated_by: "TESTER"
  note: "Confirmed the CI failure was a UTC calendar-boundary assertion, then froze reconciliation time and proved exact timestamp semantics: focused 3/3 and nearby 16/16 tests plus TypeScript 7, ESLint, Prettier, and diff checks pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-04T01:09:31.409Z"
  updated_by: "HUMAN"
  note: "The test-only fix replaces a wall-clock calendar assumption with exact contract assertions: hosted and local-merged paths retain the merge timestamp, while locally-shipped reconciliation uses a frozen reconciliation timestamp."
  evaluated_sha: "c990de07359916f06cfd10aa916f3130bf1b8b10"
  blueprint_digest: "3f4ab56d84ca19770df0b28210820e875aaeca2088a0ca97d65b070dc7af4a94"
  evidence_refs:
    - ".agentplane/tasks/202608040106-CC1TAP/quality/20260804-010930845-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/20260804-010930845-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/objects/sha256/b4f51e1c9bda0caeab5505041f19e16d66597d63bf7fd90e8966f4696d391ce3.md"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/20260804-010930845-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/20260804-010930845-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608040106-CC1TAP/README.md"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/objects/sha256/32f9c3620a1c2cd8c902c61b31d9e6f6c18e1fed64ad3034035a7dffca1ab845.patch"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/objects/sha256/7e745c5820431c4f64be784a75baa346f4673bd2d158900b100347c317acb44f.json"
    - ".agentplane/tasks/202608040106-CC1TAP/verification/20260804010905747-6d2c58d0b6417c21.json"
    - ".agentplane/tasks/202608040106-CC1TAP/quality/objects/sha256/21ff819e70f534e91f1011c030c04e31428a6e7c49b6d8156b6bcbbed4add999.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts"
    - "https://github.com/basilisk-labs/agentplane/actions/runs/30867253711/job/91861754671"
  findings:
    - "The pre-fix failure reproduces after UTC midnight and is isolated to the hard-coded 2026-08-03 assertion; production token aggregation is unchanged."
    - "Fake time is scoped to one test and restored after every test, while all three paths now assert exact timestamps rather than weakening coverage."
commit:
  hash: "87fc9d132fe0253ba6b6cfcf6cbd96ab28f7a0e2"
  message: "🧪 CC1TAP task: stabilize token usage timestamp test"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "TESTER"
    body: "Implementation complete: exact test now freezes reconciliation time and asserts exact timestamps for hosted, local-merged, and locally-shipped projections; focused 3/3, nearby 16/16, TypeScript 7, lint, formatting, and diff checks pass."
events:
  -
    type: "status"
    at: "2026-08-04T01:06:51.986Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-04T01:08:39.901Z"
    author: "TESTER"
    from: "DOING"
    to: "DOING"
    note: "Implementation complete: exact test now freezes reconciliation time and asserts exact timestamps for hosted, local-merged, and locally-shipped projections; focused 3/3, nearby 16/16, TypeScript 7, lint, formatting, and diff checks pass."
  -
    type: "verify"
    at: "2026-08-04T01:09:05.747Z"
    author: "TESTER"
    state: "ok"
    note: "Confirmed the CI failure was a UTC calendar-boundary assertion, then froze reconciliation time and proved exact timestamp semantics: focused 3/3 and nearby 16/16 tests plus TypeScript 7, ESLint, Prettier, and diff checks pass."
doc_version: 3
doc_updated_at: "2026-08-04T01:09:06.702Z"
doc_updated_by: "TESTER"
description: "Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix."
sections:
  Summary: |-
    Remove calendar-date flake from merge token-usage unit test

    Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
  Scope: |-
    - In scope: Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
    - Out of scope: unrelated refactors not required for "Remove calendar-date flake from merge token-usage unit test".
  Plan: "1. Preserve the hosted PR #4769 failure and reproduce the exact test locally on current main. 2. Identify the real timestamp contract produced by merge reconciliation and replace only the fixed 2026-08-03 calendar assertion with a deterministic relationship or ISO-time invariant. 3. Run the focused test across an injected cross-midnight case if the fixture supports it, then run the nearby token-usage and merge-reconciliation suites plus formatting/static checks. 4. Record structured verification and independent quality evidence, publish a dedicated branch_pr, merge it into main, and update PR #4769 onto the repaired base."
  Verify Steps: |-
    1. Reproduce the exact pre-fix failure on current main. Expected: hosted-merge-sync.token-usage.test.ts fails only because the locally-shipped projection crosses the hard-coded 2026-08-03 UTC boundary.
    2. Run the focused hosted merge token-usage suite after the change. Expected: all three paths assert exact contract timestamps and pass independently of the wall-clock date.
    3. Run hosted merge reconciliation and token-usage unit suites. Expected: all nearby token aggregation, merge reconciliation, and replay-stability checks pass.
    4. Run TypeScript 7 typecheck plus touched ESLint, Prettier, and git diff checks. Expected: all pass with no production-code diff.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T01:09:05.747Z — VERIFY — ok

    By: TESTER

    Note: Confirmed the CI failure was a UTC calendar-boundary assertion, then froze reconciliation time and proved exact timestamp semantics: focused 3/3 and nearby 16/16 tests plus TypeScript 7, ESLint, Prettier, and diff checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T01:08:39.901Z, excerpt_hash=sha256:501984ba1bf0744c56f3422cd1716988f077af6e36b9cb1e5e316b5452b59023

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts
    Result: pass
    Evidence: packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts and GitHub Actions run 30867253711 job 91861754671
    Scope: reproduce the 2026-08-03 hard-coded UTC boundary failure and verify the deterministic exact-time replacement

    Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts
    Result: pass
    Evidence: 3 test files passed, 16 tests passed
    Scope: hosted, local-merged, locally-shipped token projection and replay stability

    Command: bun run typecheck && bunx eslint packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts && bunx prettier packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts --check && git diff --check
    Result: pass
    Evidence: TypeScript 7 build, touched lint and formatting, and whitespace checks completed successfully
    Scope: static and formatting validation for the test-only diff

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608040106-CC1TAP-fix-token-usage-date-flake/.agentplane/tasks/202608040106-CC1TAP/blueprint/resolved-snapshot.json
    - old_digest: 3f4ab56d84ca19770df0b28210820e875aaeca2088a0ca97d65b070dc7af4a94
    - current_digest: 3f4ab56d84ca19770df0b28210820e875aaeca2088a0ca97d65b070dc7af4a94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040106-CC1TAP

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
  workflow_route_baseline:
    start_head_sha: "bae47b05c31e7e489a1c49ce12f7a27d6f44486a"
    version: 1
id_source: "generated"
---
## Summary

Remove calendar-date flake from merge token-usage unit test

Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.

## Scope

- In scope: Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
- Out of scope: unrelated refactors not required for "Remove calendar-date flake from merge token-usage unit test".

## Plan

1. Preserve the hosted PR #4769 failure and reproduce the exact test locally on current main. 2. Identify the real timestamp contract produced by merge reconciliation and replace only the fixed 2026-08-03 calendar assertion with a deterministic relationship or ISO-time invariant. 3. Run the focused test across an injected cross-midnight case if the fixture supports it, then run the nearby token-usage and merge-reconciliation suites plus formatting/static checks. 4. Record structured verification and independent quality evidence, publish a dedicated branch_pr, merge it into main, and update PR #4769 onto the repaired base.

## Verify Steps

1. Reproduce the exact pre-fix failure on current main. Expected: hosted-merge-sync.token-usage.test.ts fails only because the locally-shipped projection crosses the hard-coded 2026-08-03 UTC boundary.
2. Run the focused hosted merge token-usage suite after the change. Expected: all three paths assert exact contract timestamps and pass independently of the wall-clock date.
3. Run hosted merge reconciliation and token-usage unit suites. Expected: all nearby token aggregation, merge reconciliation, and replay-stability checks pass.
4. Run TypeScript 7 typecheck plus touched ESLint, Prettier, and git diff checks. Expected: all pass with no production-code diff.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T01:09:05.747Z — VERIFY — ok

By: TESTER

Note: Confirmed the CI failure was a UTC calendar-boundary assertion, then froze reconciliation time and proved exact timestamp semantics: focused 3/3 and nearby 16/16 tests plus TypeScript 7, ESLint, Prettier, and diff checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T01:08:39.901Z, excerpt_hash=sha256:501984ba1bf0744c56f3422cd1716988f077af6e36b9cb1e5e316b5452b59023

Details:

Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts
Result: pass
Evidence: packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts and GitHub Actions run 30867253711 job 91861754671
Scope: reproduce the 2026-08-03 hard-coded UTC boundary failure and verify the deterministic exact-time replacement

Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts
Result: pass
Evidence: 3 test files passed, 16 tests passed
Scope: hosted, local-merged, locally-shipped token projection and replay stability

Command: bun run typecheck && bunx eslint packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts && bunx prettier packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts --check && git diff --check
Result: pass
Evidence: TypeScript 7 build, touched lint and formatting, and whitespace checks completed successfully
Scope: static and formatting validation for the test-only diff

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608040106-CC1TAP-fix-token-usage-date-flake/.agentplane/tasks/202608040106-CC1TAP/blueprint/resolved-snapshot.json
- old_digest: 3f4ab56d84ca19770df0b28210820e875aaeca2088a0ca97d65b070dc7af4a94
- current_digest: 3f4ab56d84ca19770df0b28210820e875aaeca2088a0ca97d65b070dc7af4a94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040106-CC1TAP

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
