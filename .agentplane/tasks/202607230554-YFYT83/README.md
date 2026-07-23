---
id: "202607230554-YFYT83"
title: "Make branch_pr publication and cleanup state-safe"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221846-YGWMA2"
tags:
  - "branch-pr"
  - "cleanup"
  - "integration-queue"
  - "milestone-alpha1"
  - "refactor"
  - "trust-boundary"
  - "v0.7"
  - "workflow"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:cli:check"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T05:56:55.195Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T09:03:18.965Z"
  updated_by: "TESTER"
  note: "Verified 79ebefac117b: full local CI passed (383 files, 2334 tests), all 8 critical CLI chunks, 91 platform tests, significant coverage, TypeScript, lint, docs, workflows, compatibility, RF-04 efficiency baseline, live dirty-worktree stop, and final independent audit without P0/P1/P2 findings."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-23T09:04:01.962Z"
  updated_by: "EVALUATOR"
  note: "The reviewed branch_pr refactor satisfies the approved exact-head, lifecycle serialization, semantic-role, and task-scoped cleanup contract without unresolved P0, P1, or P2 findings."
  evaluated_sha: "79ebefac117b2169f1c60ae3b35af5cb3edc3b13"
  blueprint_digest: "bd89742580af112e31a00a36ad85e3f614bd079e9034b47b3c5f5cd9d18b3e1a"
  evidence_refs:
    - ".agentplane/tasks/202607230554-YFYT83/README.md"
    - ".agentplane/tasks/202607230554-YFYT83/quality/20260723-090401962-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607230554-YFYT83/quality/20260723-090401962-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607230554-YFYT83/quality/20260723-090401962-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607230554-YFYT83/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
    - "bun run ci:local:full: 383 test files and 2334 tests passed"
    - "https://github.com/basilisk-labs/agentplane/pull/4601"
  findings:
    - "Publication, queue claim/reservation, prepare, local merge, and protected-base provider merge all fail closed on stale heads, dirty task worktrees, unavailable provider truth, or pending verification."
    - "Every GitHub merge PUT is guarded immediately before mutation; guard failures propagate without transport fallback, while the exact expected SHA remains pinned in the provider request."
    - "Task-scoped cleanup requires an exact provider merge receipt and closure identity, uses atomic ref deletion, preserves dirty or advanced worktrees, and cannot expand to unrelated historical candidates."
    - "Route packets now keep formal preparation in the CLI and hand verification, semantic rework, and quality judgement to TESTER, CODER, and EVALUATOR without synthesizing verdicts."
commit:
  hash: "79ebefac117b2169f1c60ae3b35af5cb3edc3b13"
  message: "✨ YFYT83 task: make branch_pr publication state-safe"
comments:
  -
    author: "CODER"
    body: "Start: reproduce and repair branch publication, exact-head integration, stale closure, remote freshness, and task-scoped merged cleanup failures."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-23T05:57:56.540Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and repair branch publication, exact-head integration, stale closure, remote freshness, and task-scoped merged cleanup failures."
  -
    type: "verify"
    at: "2026-07-23T09:03:18.965Z"
    author: "TESTER"
    state: "ok"
    note: "Verified 79ebefac117b: full local CI passed (383 files, 2334 tests), all 8 critical CLI chunks, 91 platform tests, significant coverage, TypeScript, lint, docs, workflows, compatibility, RF-04 efficiency baseline, live dirty-worktree stop, and final independent audit without P0/P1/P2 findings."
  -
    type: "status"
    at: "2026-07-23T09:04:29.817Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-23T09:04:29.818Z"
doc_updated_by: "CODER"
description: "Repair the branch_pr lifecycle so task and pre-merge closure commits are published before queueing, enqueue and integration fail closed when local, upstream, or hosted PR heads disagree, evaluator rework invalidates stale closure evidence, remote freshness telemetry reports checked truth, and cleanup can safely target provider-merged rebase or squash branches without deleting unrelated worktrees."
sections:
  Summary: |-
    Make branch_pr publication and cleanup state-safe

    Repair the branch_pr lifecycle so task and pre-merge closure commits are published before queueing, enqueue and integration fail closed when local, upstream, or hosted PR heads disagree, evaluator rework invalidates stale closure evidence, remote freshness telemetry reports checked truth, and cleanup can safely target provider-merged rebase or squash branches without deleting unrelated worktrees.
  Scope: |-
    - In scope: branch_pr route publication state; local, upstream, and hosted PR head agreement at enqueue, claim, run-next, and integrate; pre-merge closure invalidation after rework or branch advancement; truthful remote freshness telemetry; provider-confirmed task-scoped cleanup for merged rebase or squash PRs; focused CLI documentation, roadmap, and regression tests.
    - Out of scope: changing provider merge authority, auto-merging without the integration lane, deleting unrelated historical cleanup candidates, RF04 replay work, or any mutation of agentplane-loops.
  Plan: |-
    1. Reproduce the unpublished-closure, stale-closure-after-rework, remote-head mismatch, and rebase-merge cleanup failures in isolated branch_pr fixtures.
    2. Introduce one typed publication/head state shared by task next-action and the integration lane, using local branch, upstream ref, and hosted PR head evidence without semantic inference.
    3. Route DONE tasks with unpublished task or closure commits to the AgentPlane-owned publish action before enqueue.
    4. Reject enqueue, claim, run-next, and integrate when the queued or hosted head is not the current local task head; return the exact recovery action.
    5. Invalidate or reject pre-merge closure evidence when evaluator rework or a newer branch state makes its basis stale.
    6. Report remote lookup attempts and freshness truthfully in route packets, including negative hosted PR lookup.
    7. Add task-scoped cleanup that confirms the requested task and provider merge receipt, supports rebase and squash merges, and cannot delete unrelated worktrees.
    8. Update CLI references and the v0.7 roadmap, then run focused, critical, type, docs, routing, and full local gates.
    9. Publish through a task PR, require independent evaluator evidence, stable hosted checks, pre-merge closure on the exact published head, serialized integration, hosted close, and targeted cleanup.
  Verify Steps: |-
    1. Exercise a DONE task whose local branch contains a newer pre-merge closure than origin and the hosted PR head. Expected: next-action emits the AgentPlane-owned publish command; enqueue and integration actions are unavailable until all three heads agree.
    2. Exercise enqueue, claim, run-next, and direct integrate with local/upstream/hosted head mismatches. Expected: each path fails closed with a typed blocker and exact recovery command, while a matched exact head proceeds.
    3. Record evaluator rework and then advance the task branch after a prior closure. Expected: the old closure cannot authorize queue or merge; a new verification, quality review, and closure basis are required.
    4. Exercise remote lookup with no hosted PR and with a merged rebase or squash PR. Expected: source confidence says remote was checked, negative truth is explicit, and provider merge receipt identifies the exact task head.
    5. Run task-scoped cleanup for a merged rebase fixture alongside unrelated eligible worktrees. Expected: only the requested task branch/worktree is removed; dirty, current, outside-root, unmerged, or head-mismatched targets fail closed.
    6. Run the declared focused Vitest suite, bun run test:critical, bun run typecheck, bun run docs:cli:check, node .agentplane/policy/check-routing.mjs, and the full local CI gate. Expected: all pass on one reviewed SHA and the compatibility ratchet records only intentional additive CLI changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T09:03:18.965Z — VERIFY — ok

    By: TESTER

    Note: Verified 79ebefac117b: full local CI passed (383 files, 2334 tests), all 8 critical CLI chunks, 91 platform tests, significant coverage, TypeScript, lint, docs, workflows, compatibility, RF-04 efficiency baseline, live dirty-worktree stop, and final independent audit without P0/P1/P2 findings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T09:00:33.176Z, excerpt_hash=sha256:255a6844a7f60879c5658d7b2f39c924917ed67b03563c962a7f237e96adfcaa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607230554-YFYT83-make-branch-pr-publication-and-cleanup-state-saf/.agentplane/tasks/202607230554-YFYT83/blueprint/resolved-snapshot.json
    - old_digest: bd89742580af112e31a00a36ad85e3f614bd079e9034b47b3c5f5cd9d18b3e1a
    - current_digest: bd89742580af112e31a00a36ad85e3f614bd079e9034b47b3c5f5cd9d18b3e1a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607230554-YFYT83

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607230554-YFYT83
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commits and restore the previous route, queue, closure, telemetry, and cleanup behavior together.
    - Rebuild the repo-local CLI and rerun focused branch_pr and cleanup tests plus type and docs checks.
    - Preserve task/PR evidence and any still-orphaned worktree; never compensate by deleting unrelated candidates manually.
  Findings: |-
    - Observation: During YGWMA2, the local task branch advanced after pre-merge closure while the hosted PR still pointed at an older head; next-action offered queue enqueue and the queue did not reject the mismatch.
      Impact: The integration lane could merge a stale remote head that omitted the latest verification or closure evidence.
      Resolution: Require an explicit AgentPlane-owned publication step and exact local, upstream, and hosted head agreement before queue ownership or merge.

    - Observation: After PR 4600 was rebase-merged, hosted-close correctly no-oped on pre-merge closure but tracked PR metadata stayed OPEN; cleanup merged skipped YGWMA2 and next-action counted unrelated global cleanup candidates.
      Impact: A correctly merged task could retain an orphan worktree while the route recommended a non-targeted destructive command affecting unrelated candidates.
      Resolution: Carry exact provider merge truth into task-scoped cleanup and bind cleanup guidance to the requested task.

    - Observation: Immediately after work start created the dedicated branch and worktree, next-action still reported missing_pr_branch and attempted to repeat work start until PR metadata existed.
      Impact: The route oracle could encourage duplicate bootstrap actions and operator reconstruction.
      Resolution: Derive task checkout and branch presence from live Git state and route local artifacts without remote identity to the single AgentPlane-owned publish path.

    - Observation: A clean base checkout could enqueue an immutable old task HEAD while the actual task worktree contained staged, unstaged, or untracked implementation changes.
      Impact: Publication and integration could omit the implementation while reporting a coherent local, upstream, and hosted SHA.
      Resolution: Probe the registered task worktree and fail closed in next-action, enqueue, claim, reservation, critical-section, prepare, verification, provider merge, and local merge paths; pending verification now hands control to TESTER without enqueue argv.

    - Observation: The protected-base path originally checked cleanliness before provider observation, leaving a TOCTOU window before GitHub merge PUT requests.
      Impact: The worktree could become dirty during provider preflight while the still-valid committed SHA was merged.
      Resolution: Propagate a pre-mutation guard to the transport layer, run it immediately before every gh and REST merge PUT, and rethrow guard failures without transport fallback.

    - Observation: The first live route probe on the completed implementation reported task_worktree_dirty for 75 changed paths and exposed no publication, queue, or integration command.
      Impact: The implemented contract demonstrably minimizes executor reconstruction and prevents lifecycle advancement from incomplete local state.
      Resolution: Preserve this behavior with route, queue, direct integration, transport, fake-provider, compatibility, and full-CI regression coverage; the final audit found no P0, P1, or P2 issue.
id_source: "generated"
---
## Summary

Make branch_pr publication and cleanup state-safe

Repair the branch_pr lifecycle so task and pre-merge closure commits are published before queueing, enqueue and integration fail closed when local, upstream, or hosted PR heads disagree, evaluator rework invalidates stale closure evidence, remote freshness telemetry reports checked truth, and cleanup can safely target provider-merged rebase or squash branches without deleting unrelated worktrees.

## Scope

- In scope: branch_pr route publication state; local, upstream, and hosted PR head agreement at enqueue, claim, run-next, and integrate; pre-merge closure invalidation after rework or branch advancement; truthful remote freshness telemetry; provider-confirmed task-scoped cleanup for merged rebase or squash PRs; focused CLI documentation, roadmap, and regression tests.
- Out of scope: changing provider merge authority, auto-merging without the integration lane, deleting unrelated historical cleanup candidates, RF04 replay work, or any mutation of agentplane-loops.

## Plan

1. Reproduce the unpublished-closure, stale-closure-after-rework, remote-head mismatch, and rebase-merge cleanup failures in isolated branch_pr fixtures.
2. Introduce one typed publication/head state shared by task next-action and the integration lane, using local branch, upstream ref, and hosted PR head evidence without semantic inference.
3. Route DONE tasks with unpublished task or closure commits to the AgentPlane-owned publish action before enqueue.
4. Reject enqueue, claim, run-next, and integrate when the queued or hosted head is not the current local task head; return the exact recovery action.
5. Invalidate or reject pre-merge closure evidence when evaluator rework or a newer branch state makes its basis stale.
6. Report remote lookup attempts and freshness truthfully in route packets, including negative hosted PR lookup.
7. Add task-scoped cleanup that confirms the requested task and provider merge receipt, supports rebase and squash merges, and cannot delete unrelated worktrees.
8. Update CLI references and the v0.7 roadmap, then run focused, critical, type, docs, routing, and full local gates.
9. Publish through a task PR, require independent evaluator evidence, stable hosted checks, pre-merge closure on the exact published head, serialized integration, hosted close, and targeted cleanup.

## Verify Steps

1. Exercise a DONE task whose local branch contains a newer pre-merge closure than origin and the hosted PR head. Expected: next-action emits the AgentPlane-owned publish command; enqueue and integration actions are unavailable until all three heads agree.
2. Exercise enqueue, claim, run-next, and direct integrate with local/upstream/hosted head mismatches. Expected: each path fails closed with a typed blocker and exact recovery command, while a matched exact head proceeds.
3. Record evaluator rework and then advance the task branch after a prior closure. Expected: the old closure cannot authorize queue or merge; a new verification, quality review, and closure basis are required.
4. Exercise remote lookup with no hosted PR and with a merged rebase or squash PR. Expected: source confidence says remote was checked, negative truth is explicit, and provider merge receipt identifies the exact task head.
5. Run task-scoped cleanup for a merged rebase fixture alongside unrelated eligible worktrees. Expected: only the requested task branch/worktree is removed; dirty, current, outside-root, unmerged, or head-mismatched targets fail closed.
6. Run the declared focused Vitest suite, bun run test:critical, bun run typecheck, bun run docs:cli:check, node .agentplane/policy/check-routing.mjs, and the full local CI gate. Expected: all pass on one reviewed SHA and the compatibility ratchet records only intentional additive CLI changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T09:03:18.965Z — VERIFY — ok

By: TESTER

Note: Verified 79ebefac117b: full local CI passed (383 files, 2334 tests), all 8 critical CLI chunks, 91 platform tests, significant coverage, TypeScript, lint, docs, workflows, compatibility, RF-04 efficiency baseline, live dirty-worktree stop, and final independent audit without P0/P1/P2 findings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T09:00:33.176Z, excerpt_hash=sha256:255a6844a7f60879c5658d7b2f39c924917ed67b03563c962a7f237e96adfcaa

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607230554-YFYT83-make-branch-pr-publication-and-cleanup-state-saf/.agentplane/tasks/202607230554-YFYT83/blueprint/resolved-snapshot.json
- old_digest: bd89742580af112e31a00a36ad85e3f614bd079e9034b47b3c5f5cd9d18b3e1a
- current_digest: bd89742580af112e31a00a36ad85e3f614bd079e9034b47b3c5f5cd9d18b3e1a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607230554-YFYT83

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607230554-YFYT83
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commits and restore the previous route, queue, closure, telemetry, and cleanup behavior together.
- Rebuild the repo-local CLI and rerun focused branch_pr and cleanup tests plus type and docs checks.
- Preserve task/PR evidence and any still-orphaned worktree; never compensate by deleting unrelated candidates manually.

## Findings

- Observation: During YGWMA2, the local task branch advanced after pre-merge closure while the hosted PR still pointed at an older head; next-action offered queue enqueue and the queue did not reject the mismatch.
  Impact: The integration lane could merge a stale remote head that omitted the latest verification or closure evidence.
  Resolution: Require an explicit AgentPlane-owned publication step and exact local, upstream, and hosted head agreement before queue ownership or merge.

- Observation: After PR 4600 was rebase-merged, hosted-close correctly no-oped on pre-merge closure but tracked PR metadata stayed OPEN; cleanup merged skipped YGWMA2 and next-action counted unrelated global cleanup candidates.
  Impact: A correctly merged task could retain an orphan worktree while the route recommended a non-targeted destructive command affecting unrelated candidates.
  Resolution: Carry exact provider merge truth into task-scoped cleanup and bind cleanup guidance to the requested task.

- Observation: Immediately after work start created the dedicated branch and worktree, next-action still reported missing_pr_branch and attempted to repeat work start until PR metadata existed.
  Impact: The route oracle could encourage duplicate bootstrap actions and operator reconstruction.
  Resolution: Derive task checkout and branch presence from live Git state and route local artifacts without remote identity to the single AgentPlane-owned publish path.

- Observation: A clean base checkout could enqueue an immutable old task HEAD while the actual task worktree contained staged, unstaged, or untracked implementation changes.
  Impact: Publication and integration could omit the implementation while reporting a coherent local, upstream, and hosted SHA.
  Resolution: Probe the registered task worktree and fail closed in next-action, enqueue, claim, reservation, critical-section, prepare, verification, provider merge, and local merge paths; pending verification now hands control to TESTER without enqueue argv.

- Observation: The protected-base path originally checked cleanliness before provider observation, leaving a TOCTOU window before GitHub merge PUT requests.
  Impact: The worktree could become dirty during provider preflight while the still-valid committed SHA was merged.
  Resolution: Propagate a pre-mutation guard to the transport layer, run it immediately before every gh and REST merge PUT, and rethrow guard failures without transport fallback.

- Observation: The first live route probe on the completed implementation reported task_worktree_dirty for 75 changed paths and exposed no publication, queue, or integration command.
  Impact: The implemented contract demonstrably minimizes executor reconstruction and prevents lifecycle advancement from incomplete local state.
  Resolution: Preserve this behavior with route, queue, direct integration, transport, fake-provider, compatibility, and full-CI regression coverage; the final audit found no P0, P1, or P2 issue.
