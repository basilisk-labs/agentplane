---
id: "202608250040-QY7SRW"
title: "Release 0.6.27 with dead PID reclaim fix"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --pool=forks --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-25T00:40:54.324Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-25T01:05:30.489Z"
  updated_by: "REVIEWER"
  note: "Verified final branch_pr blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-25T01:05:32.962Z"
  updated_by: "EVALUATOR"
  note: "The final branch_pr blueprint is satisfied by the scoped dead-PID reclaim fix and complete local release evidence."
  evaluated_sha: "e0e3eda3f42811bf5f5551c5f6a6b4afe1156ebf"
  blueprint_digest: "f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19"
  evidence_refs:
    - ".agentplane/tasks/202608250040-QY7SRW/README.md"
    - ".agentplane/tasks/202608250040-QY7SRW/quality/20260825-010532962-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608250040-QY7SRW/quality/20260825-010532962-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608250040-QY7SRW/quality/20260825-010532962-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json"
    - "implementation commit e0e3eda3f"
    - "bun run release:prepublish: exit 0"
  findings:
    - "Absent valid PIDs are classified from ExecaError.exitCode=1, while live-process identity safeguards remain unchanged."
commit:
  hash: "e0e3eda3f42811bf5f5551c5f6a6b4afe1156ebf"
  message: "🐛 QY7SRW release: fix dead PID reclaim for v0.6.27"
comments:
  -
    author: "CODER"
    body: "Start: implement and qualify the isolated v0.6.27 reclaim fix, then publish only the exact maintenance-branch candidate after all release gates pass."
  -
    author: "INTEGRATOR"
    body: "Verified: manual maintenance closeout authorized because branch_pr finish incorrectly requires main or a generated task branch; implementation and release gates passed in the isolated 0.6.27 worktree."
events:
  -
    type: "status"
    at: "2026-08-25T00:40:54.960Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement and qualify the isolated v0.6.27 reclaim fix, then publish only the exact maintenance-branch candidate after all release gates pass."
  -
    type: "verify"
    at: "2026-08-25T01:02:46.377Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified dead-PID reclaim regression with a real exited child PID; direct PID 46382 probe returns alive=false and identity=null; focused tests, prettier, lint:core, release:parity, git diff --check, and full release:prepublish all passed on implementation commit e0e3eda3f."
  -
    type: "verify"
    at: "2026-08-25T01:03:54.610Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified after refreshed blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish."
  -
    type: "status"
    at: "2026-08-25T01:05:03.389Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: manual maintenance closeout authorized because branch_pr finish incorrectly requires main or a generated task branch; implementation and release gates passed in the isolated 0.6.27 worktree."
  -
    type: "verify"
    at: "2026-08-25T01:05:30.489Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified final branch_pr blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish."
doc_version: 3
doc_updated_at: "2026-08-25T01:05:32.482Z"
doc_updated_by: "INTEGRATOR"
description: "Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main."
sections:
  Summary: |-
    Release 0.6.27 with dead PID reclaim fix

    Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.
  Scope: |-
    - In scope: Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.
    - Out of scope: unrelated refactors not required for "Release 0.6.27 with dead PID reclaim fix".
  Plan: "Release plan: version=0.6.27, tag=v0.6.27, base=v0.6.26@3703e0d56a6454b7e76b407a85929ac11eeb9a68, branch=codex/release-v0.6.27-reclaim-fix. 1. Fix readObservedProcessIdentity so a valid absent PID returning ExecaError.exitCode=1 is treated as missing rather than fatal. 2. Replace the oversized-PID fixture with a real exited-process PID and retain live-process identity safeguards. 3. Run focused tests, formatting, lint/type/full release prepublish and parity gates. 4. Bump all release surfaces to 0.6.27 and add complete release notes. 5. Commit and push only this isolated maintenance branch, qualify its exact SHA with hosted CI without merging into main, tag that SHA, dispatch Publish to npm, and verify GitHub plus npm registry readback. Rollback: do not publish until all gates pass; before publication revert only this isolated branch; after publication issue a newer patch rather than rewriting v0.6.27."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --pool=forks --maxWorkers=1`; expect all reclaim and runner cancellation tests to pass.
    2. Run the direct PID probe for `readObservedProcessIdentity(46382)`; expect `pid_alive=false` and `identity=null` rather than an exception.
    3. Run `bunx prettier --check packages/agentplane/src/runner/process-supervision/signals.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`; expect formatting to pass.
    4. Run `bun run lint:core`, `bun run release:parity`, and `bun run release:prepublish`; expect all release gates to pass.
    5. Run `git diff --check` and inspect the complete branch diff from `v0.6.26`; expect only the scoped fix, test, task evidence, release notes, and 0.6.27 version surfaces.
    6. Confirm `agentplane@0.6.27` and all participant packages are absent before publication, then verify the exact GitHub release/tag SHA, successful Publish to npm workflow, and npm registry versions after publication.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-25T01:02:46.377Z — VERIFY — ok

    By: REVIEWER

    Note: Verified dead-PID reclaim regression with a real exited child PID; direct PID 46382 probe returns alive=false and identity=null; focused tests, prettier, lint:core, release:parity, git diff --check, and full release:prepublish all passed on implementation commit e0e3eda3f.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-25T01:02:23.033Z, excerpt_hash=sha256:76eafeacd80dcb284c654a9cab539ef7ff39739bfde418eeccabcd8823ba2ca4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane-v0.6.27-reclaim-fix/.agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json
    - old_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
    - current_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608250040-QY7SRW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202608250040-QY7SRW --agent CODER --slug release-0-6-27-with-dead-pid-reclaim-fix --worktree
    - diagnostic_command: agentplane work resume 202608250040-QY7SRW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    ### 2026-08-25T01:03:54.610Z — VERIFY — ok

    By: REVIEWER

    Note: Verified after refreshed blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-25T01:02:46.612Z, excerpt_hash=sha256:76eafeacd80dcb284c654a9cab539ef7ff39739bfde418eeccabcd8823ba2ca4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane-v0.6.27-reclaim-fix/.agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json
    - old_digest: 5c966bb07d9bae45c0e4e173e356d84b6448b4397f53ea651cb323ae2c951383
    - current_digest: 5c966bb07d9bae45c0e4e173e356d84b6448b4397f53ea651cb323ae2c951383
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608250040-QY7SRW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608250040-QY7SRW --result verified-202608250040-QY7SRW --commit e0e3eda3f42811bf5f5551c5f6a6b4afe1156ebf
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-25T01:05:30.489Z — VERIFY — ok

    By: REVIEWER

    Note: Verified final branch_pr blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-25T01:05:03.389Z, excerpt_hash=sha256:76eafeacd80dcb284c654a9cab539ef7ff39739bfde418eeccabcd8823ba2ca4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane-v0.6.27-reclaim-fix/.agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json
    - old_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
    - current_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608250040-QY7SRW

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
id_source: "generated"
---
## Summary

Release 0.6.27 with dead PID reclaim fix

Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.

## Scope

- In scope: Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.
- Out of scope: unrelated refactors not required for "Release 0.6.27 with dead PID reclaim fix".

## Plan

Release plan: version=0.6.27, tag=v0.6.27, base=v0.6.26@3703e0d56a6454b7e76b407a85929ac11eeb9a68, branch=codex/release-v0.6.27-reclaim-fix. 1. Fix readObservedProcessIdentity so a valid absent PID returning ExecaError.exitCode=1 is treated as missing rather than fatal. 2. Replace the oversized-PID fixture with a real exited-process PID and retain live-process identity safeguards. 3. Run focused tests, formatting, lint/type/full release prepublish and parity gates. 4. Bump all release surfaces to 0.6.27 and add complete release notes. 5. Commit and push only this isolated maintenance branch, qualify its exact SHA with hosted CI without merging into main, tag that SHA, dispatch Publish to npm, and verify GitHub plus npm registry readback. Rollback: do not publish until all gates pass; before publication revert only this isolated branch; after publication issue a newer patch rather than rewriting v0.6.27.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --pool=forks --maxWorkers=1`; expect all reclaim and runner cancellation tests to pass.
2. Run the direct PID probe for `readObservedProcessIdentity(46382)`; expect `pid_alive=false` and `identity=null` rather than an exception.
3. Run `bunx prettier --check packages/agentplane/src/runner/process-supervision/signals.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`; expect formatting to pass.
4. Run `bun run lint:core`, `bun run release:parity`, and `bun run release:prepublish`; expect all release gates to pass.
5. Run `git diff --check` and inspect the complete branch diff from `v0.6.26`; expect only the scoped fix, test, task evidence, release notes, and 0.6.27 version surfaces.
6. Confirm `agentplane@0.6.27` and all participant packages are absent before publication, then verify the exact GitHub release/tag SHA, successful Publish to npm workflow, and npm registry versions after publication.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-25T01:02:46.377Z — VERIFY — ok

By: REVIEWER

Note: Verified dead-PID reclaim regression with a real exited child PID; direct PID 46382 probe returns alive=false and identity=null; focused tests, prettier, lint:core, release:parity, git diff --check, and full release:prepublish all passed on implementation commit e0e3eda3f.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-25T01:02:23.033Z, excerpt_hash=sha256:76eafeacd80dcb284c654a9cab539ef7ff39739bfde418eeccabcd8823ba2ca4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane-v0.6.27-reclaim-fix/.agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json
- old_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
- current_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608250040-QY7SRW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202608250040-QY7SRW --agent CODER --slug release-0-6-27-with-dead-pid-reclaim-fix --worktree
- diagnostic_command: agentplane work resume 202608250040-QY7SRW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

### 2026-08-25T01:03:54.610Z — VERIFY — ok

By: REVIEWER

Note: Verified after refreshed blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-25T01:02:46.612Z, excerpt_hash=sha256:76eafeacd80dcb284c654a9cab539ef7ff39739bfde418eeccabcd8823ba2ca4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane-v0.6.27-reclaim-fix/.agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json
- old_digest: 5c966bb07d9bae45c0e4e173e356d84b6448b4397f53ea651cb323ae2c951383
- current_digest: 5c966bb07d9bae45c0e4e173e356d84b6448b4397f53ea651cb323ae2c951383
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608250040-QY7SRW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608250040-QY7SRW --result verified-202608250040-QY7SRW --commit e0e3eda3f42811bf5f5551c5f6a6b4afe1156ebf
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-25T01:05:30.489Z — VERIFY — ok

By: REVIEWER

Note: Verified final branch_pr blueprint snapshot: implementation commit e0e3eda3f passed realistic dead-PID regression, direct PID 46382 probe, lint:core, release:parity, git diff --check, and full release:prepublish.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-25T01:05:03.389Z, excerpt_hash=sha256:76eafeacd80dcb284c654a9cab539ef7ff39739bfde418eeccabcd8823ba2ca4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane-v0.6.27-reclaim-fix/.agentplane/tasks/202608250040-QY7SRW/blueprint/resolved-snapshot.json
- old_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
- current_digest: f4424de1bc517bb50522405eedc5ff4c0595d3ca65f2045e64a606b60aa90e19
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608250040-QY7SRW

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
