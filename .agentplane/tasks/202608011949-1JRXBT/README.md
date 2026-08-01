---
id: "202608011949-1JRXBT"
title: "Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202607221908-PWFH5K"
  - "202607221854-4FNZPG"
tags:
  - "code"
  - "migration"
  - "release"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts"
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
  - "bun run typecheck"
  - "bun run test:critical"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T19:50:23.706Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T22:53:54.539Z"
  updated_by: "TESTER"
  note: "Verified implementation a65844caf03aaef728ad412c847d7e3967313dba after evaluator rework: bunx is allowlisted with direct process-start coverage; all declared checks passed; maintenance diff remains behavior-only and hosted CI remains the only external gate."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T22:45:49.318Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "e2acc9d90c46ace69c61fa45916570949a86cc8a"
  blueprint_digest: "f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461"
  evidence_refs:
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608011949-1JRXBT/README.md"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608011949-1JRXBT/quality/20260801-224451185-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The new verification executable allowlist rejects `bunx`, although the task’s first two mandatory Verify Steps invoke `bunx vitest`. Integration verification would therefore fail before starting those declared checks."
    - "Frozen observed-check evidence contains a verification summary but no verification records, runner history, or runtime evidence, so the claimed successful checks cannot be deterministically inspected at the evaluated SHA."
commit:
  hash: "a65844caf03aaef728ad412c847d7e3967313dba"
  message: "🐛 1JRXBT code: allow declared bunx checks"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: ported the missing v0.6.25-v0.6.26 terminal handoff, immutable finalization, and isolated bounded verification behavior into the typed 0.7 architecture; retained the stronger current cleanup path and extended the rc.2 release closure."
  -
    author: "CODER"
    body: "Implementation rework: allowlisted the approved bunx verification executable and added a process-start regression test for bunx vitest; semantic scope remains limited to the v0.6.25-v0.6.26 maintenance assimilation."
events:
  -
    type: "status"
    at: "2026-08-01T22:10:12.605Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T22:35:49.059Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: ported the missing v0.6.25-v0.6.26 terminal handoff, immutable finalization, and isolated bounded verification behavior into the typed 0.7 architecture; retained the stronger current cleanup path and extended the rc.2 release closure."
  -
    type: "verify"
    at: "2026-08-01T22:43:30.355Z"
    author: "TESTER"
    state: "ok"
    note: "Verified c288fab658399b7ecadb2bd5a50bbd0e021ab29d: focused unit suite 49/49; direct-closeout CLI 5/5; TypeScript typecheck passed; critical CLI 12/12 chunks passed; full ci:contract passed including RF-04 50-run baseline, architecture, lint, clone, knip, and coverage; ci:local:fast passed; task-state closure passed with 72 required tasks. Diff audit against v0.6.25-v0.6.26 ports terminal direct verification, immutable-head diffstat, streamed bounded verification output, and runtime provenance isolation; obsolete cleanup-race patch was not ported because 0.7 cleanup is stronger. Residual risk: hosted CI remains pending and is handled by the branch_pr hosted-check gate."
  -
    type: "status"
    at: "2026-08-01T22:49:14.649Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework: allowlisted the approved bunx verification executable and added a process-start regression test for bunx vitest; semantic scope remains limited to the v0.6.25-v0.6.26 maintenance assimilation."
  -
    type: "verify"
    at: "2026-08-01T22:53:54.539Z"
    author: "TESTER"
    state: "ok"
    note: "Verified implementation a65844caf03aaef728ad412c847d7e3967313dba after evaluator rework: bunx is allowlisted with direct process-start coverage; all declared checks passed; maintenance diff remains behavior-only and hosted CI remains the only external gate."
doc_version: 3
doc_updated_at: "2026-08-01T22:53:55.459Z"
doc_updated_by: "CODER"
description: "Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage."
sections:
  Summary: |-
    Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7

    Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.
  Scope: |-
    - In scope: Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.
    - Out of scope: unrelated refactors not required for "Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7".
  Plan: |-
    1. Reproduce the v0.6.25-v0.6.26 regressions against the refactored 0.7 route, integration, and verification boundaries.
    2. Port behavioral fixes rather than maintenance-branch commits: terminal direct runner handoff, immutable branch-head finalization, bounded streaming verify output, and runtime environment isolation.
    3. Retain the stronger 0.7 cleanup and route-state implementations where they supersede maintenance code.
    4. Add focused regression tests, then run critical and full contract gates.
    5. Add this repair task to the mandatory rc.2 dependency closure before integration.
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts`. Expected: terminal handoff, immutable diffstat, bounded streaming verification, environment isolation, visible failure tails, and direct supervisor closeout regressions pass.
    2. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts`. Expected: a terminal successful runner yields a TESTER verification episode with no executable `verify-show` transition.
    3. Run `bun run typecheck`. Expected: the typed WorkflowStep and runner-operation changes compile under the repository TypeScript contract.
    4. Run `bun run test:critical`. Expected: all critical CLI chunks pass.
    5. Run `bun run ci:contract`. Expected: contract, architecture, task-state, formatting, lint, and coverage ratchets pass.
    6. Inspect the final diff against the v0.6.25-v0.6.26 maintenance branch. Expected: only behavior missing from the refactored 0.7 architecture is ported; the stronger current cleanup implementation remains unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T22:43:30.355Z — VERIFY — ok

    By: TESTER

    Note: Verified c288fab658399b7ecadb2bd5a50bbd0e021ab29d: focused unit suite 49/49; direct-closeout CLI 5/5; TypeScript typecheck passed; critical CLI 12/12 chunks passed; full ci:contract passed including RF-04 50-run baseline, architecture, lint, clone, knip, and coverage; ci:local:fast passed; task-state closure passed with 72 required tasks. Diff audit against v0.6.25-v0.6.26 ports terminal direct verification, immutable-head diffstat, streamed bounded verification output, and runtime provenance isolation; obsolete cleanup-race patch was not ported because 0.7 cleanup is stronger. Residual risk: hosted CI remains pending and is handled by the branch_pr hosted-check gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T22:35:49.059Z, excerpt_hash=sha256:e05f258289d36b3cbda4636c84832a48240539a8f9b58f83bb74bd01632dc40b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608011949-1JRXBT-assimilate-v0-6-25-v0-6-26-maintenance-fixes-int/.agentplane/tasks/202608011949-1JRXBT/blueprint/resolved-snapshot.json
    - old_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
    - current_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608011949-1JRXBT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608011949-1JRXBT
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T22:53:54.539Z — VERIFY — ok

    By: TESTER

    Note: Verified implementation a65844caf03aaef728ad412c847d7e3967313dba after evaluator rework: bunx is allowlisted with direct process-start coverage; all declared checks passed; maintenance diff remains behavior-only and hosted CI remains the only external gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T22:49:14.649Z, excerpt_hash=sha256:e05f258289d36b3cbda4636c84832a48240539a8f9b58f83bb74bd01632dc40b

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts
    Result: pass
    Evidence: 6 test files and 50 tests passed; pr-meta regression proves bunx vitest reaches startProcess with argv preserved.
    Scope: terminal handoff, immutable diffstat, bounded streaming output, environment isolation, failure tails, direct closeout, and bunx allowlist

    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts
    Result: pass
    Evidence: 1 test file and 5 tests passed.
    Scope: terminal successful runner to TESTER verification episode without executable verify-show

    Command: bun run typecheck
    Result: pass
    Evidence: run-typescript-build.mjs exited 0.
    Scope: typed WorkflowStep, runner-operation, and verification process changes under the repository TypeScript contract

    Command: bun run test:critical
    Result: pass
    Evidence: all 12 critical-cli chunks passed.
    Scope: critical agent-efficiency, exit-code, git-edge, protected-path, scope-leak, symlink-root, and trust-boundary regressions

    Command: bun run ci:contract
    Result: pass
    Evidence: exit 0; RF-04 replay 50 runs and 70/70 outcomes; lifecycle, TypeScript 7/6 toolchain, lint, architecture, clone, knip, and coverage gates passed.
    Scope: full deterministic repository contract at implementation a65844caf03aaef728ad412c847d7e3967313dba

    Command: git diff --name-status b9b5b6fe22177e652b391bb068d7760535ba2ceb..a65844caf03aaef728ad412c847d7e3967313dba
    Result: pass
    Evidence: diff audit retained the stronger 0.7 cleanup and ported only missing terminal handoff, immutable finalization, isolated bounded verification, and bunx compatibility behavior.
    Scope: v0.6.25-v0.6.26 behavioral assimilation boundaries

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608011949-1JRXBT-assimilate-v0-6-25-v0-6-26-maintenance-fixes-int/.agentplane/tasks/202608011949-1JRXBT/blueprint/resolved-snapshot.json
    - old_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
    - current_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608011949-1JRXBT

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
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "f9997263341ca21006d9df679d646c7477db8747"
    version: 1
id_source: "generated"
---
## Summary

Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7

Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.

## Scope

- In scope: Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.
- Out of scope: unrelated refactors not required for "Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7".

## Plan

1. Reproduce the v0.6.25-v0.6.26 regressions against the refactored 0.7 route, integration, and verification boundaries.
2. Port behavioral fixes rather than maintenance-branch commits: terminal direct runner handoff, immutable branch-head finalization, bounded streaming verify output, and runtime environment isolation.
3. Retain the stronger 0.7 cleanup and route-state implementations where they supersede maintenance code.
4. Add focused regression tests, then run critical and full contract gates.
5. Add this repair task to the mandatory rc.2 dependency closure before integration.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts`. Expected: terminal handoff, immutable diffstat, bounded streaming verification, environment isolation, visible failure tails, and direct supervisor closeout regressions pass.
2. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts`. Expected: a terminal successful runner yields a TESTER verification episode with no executable `verify-show` transition.
3. Run `bun run typecheck`. Expected: the typed WorkflowStep and runner-operation changes compile under the repository TypeScript contract.
4. Run `bun run test:critical`. Expected: all critical CLI chunks pass.
5. Run `bun run ci:contract`. Expected: contract, architecture, task-state, formatting, lint, and coverage ratchets pass.
6. Inspect the final diff against the v0.6.25-v0.6.26 maintenance branch. Expected: only behavior missing from the refactored 0.7 architecture is ported; the stronger current cleanup implementation remains unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T22:43:30.355Z — VERIFY — ok

By: TESTER

Note: Verified c288fab658399b7ecadb2bd5a50bbd0e021ab29d: focused unit suite 49/49; direct-closeout CLI 5/5; TypeScript typecheck passed; critical CLI 12/12 chunks passed; full ci:contract passed including RF-04 50-run baseline, architecture, lint, clone, knip, and coverage; ci:local:fast passed; task-state closure passed with 72 required tasks. Diff audit against v0.6.25-v0.6.26 ports terminal direct verification, immutable-head diffstat, streamed bounded verification output, and runtime provenance isolation; obsolete cleanup-race patch was not ported because 0.7 cleanup is stronger. Residual risk: hosted CI remains pending and is handled by the branch_pr hosted-check gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T22:35:49.059Z, excerpt_hash=sha256:e05f258289d36b3cbda4636c84832a48240539a8f9b58f83bb74bd01632dc40b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608011949-1JRXBT-assimilate-v0-6-25-v0-6-26-maintenance-fixes-int/.agentplane/tasks/202608011949-1JRXBT/blueprint/resolved-snapshot.json
- old_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
- current_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608011949-1JRXBT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608011949-1JRXBT
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T22:53:54.539Z — VERIFY — ok

By: TESTER

Note: Verified implementation a65844caf03aaef728ad412c847d7e3967313dba after evaluator rework: bunx is allowlisted with direct process-start coverage; all declared checks passed; maintenance diff remains behavior-only and hosted CI remains the only external gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T22:49:14.649Z, excerpt_hash=sha256:e05f258289d36b3cbda4636c84832a48240539a8f9b58f83bb74bd01632dc40b

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts
Result: pass
Evidence: 6 test files and 50 tests passed; pr-meta regression proves bunx vitest reaches startProcess with argv preserved.
Scope: terminal handoff, immutable diffstat, bounded streaming output, environment isolation, failure tails, direct closeout, and bunx allowlist

Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts
Result: pass
Evidence: 1 test file and 5 tests passed.
Scope: terminal successful runner to TESTER verification episode without executable verify-show

Command: bun run typecheck
Result: pass
Evidence: run-typescript-build.mjs exited 0.
Scope: typed WorkflowStep, runner-operation, and verification process changes under the repository TypeScript contract

Command: bun run test:critical
Result: pass
Evidence: all 12 critical-cli chunks passed.
Scope: critical agent-efficiency, exit-code, git-edge, protected-path, scope-leak, symlink-root, and trust-boundary regressions

Command: bun run ci:contract
Result: pass
Evidence: exit 0; RF-04 replay 50 runs and 70/70 outcomes; lifecycle, TypeScript 7/6 toolchain, lint, architecture, clone, knip, and coverage gates passed.
Scope: full deterministic repository contract at implementation a65844caf03aaef728ad412c847d7e3967313dba

Command: git diff --name-status b9b5b6fe22177e652b391bb068d7760535ba2ceb..a65844caf03aaef728ad412c847d7e3967313dba
Result: pass
Evidence: diff audit retained the stronger 0.7 cleanup and ported only missing terminal handoff, immutable finalization, isolated bounded verification, and bunx compatibility behavior.
Scope: v0.6.25-v0.6.26 behavioral assimilation boundaries

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608011949-1JRXBT-assimilate-v0-6-25-v0-6-26-maintenance-fixes-int/.agentplane/tasks/202608011949-1JRXBT/blueprint/resolved-snapshot.json
- old_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
- current_digest: f5aaf5ba0767d140f868ee28428c69f45a5670cb00023d487128f9a0e1bec461
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608011949-1JRXBT

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
