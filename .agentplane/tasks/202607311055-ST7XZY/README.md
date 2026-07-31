---
id: "202607311055-ST7XZY"
title: "Eliminate direct workflow state-neutral routing loops"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "release"
  - "routing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T10:55:47.088Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T11:17:47.894Z"
  updated_by: "EVALUATOR"
  note: "Command: bun run hotspots:check; direct route-decision test file; bun run typecheck; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: oversized baseline OK at 1170 lines/11423 total, route-decision 11/11, typecheck and routing OK. Scope: hosted verify-contract rework only; production routing diff unchanged."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-31T11:17:50.290Z"
  updated_by: "EVALUATOR"
  note: "Hosted contract rework passed without changing the production routing fix or oversized-test baseline."
  evaluated_sha: "1997cf25e0076fe47889c3b3576d789c8f8f8993"
  blueprint_digest: "063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d"
  evidence_refs:
    - ".agentplane/tasks/202607311055-ST7XZY/README.md"
    - ".agentplane/tasks/202607311055-ST7XZY/quality/20260731-111750290-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311055-ST7XZY/quality/20260731-111750290-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311055-ST7XZY/quality/20260731-111750290-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
  findings:
    - "The oversized route test is now below its existing 1171-line baseline and the full file passes 11/11 tests."
    - "Production routing evidence remains covered by the prior 57 focused, 204 significant, and 16 release-critical passing tests."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit direct route transitions, eliminate state-neutral loops, and add deterministic task artifact persistence recovery for the v0.6.26 maintenance patch."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Start: apply the hosted contract rework by shrinking the route regression without changing production behavior or the oversized-test baseline."
events:
  -
    type: "status"
    at: "2026-07-31T10:56:26.039Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit direct route transitions, eliminate state-neutral loops, and add deterministic task artifact persistence recovery for the v0.6.26 maintenance patch."
  -
    type: "verify"
    at: "2026-07-31T11:12:03.380Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: focused Vitest route/runner suite; bun run coverage:significant-suite; bun run test:release:critical; bun run typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane release plan --patch. Result: pass. Evidence: focused 11 files/57 tests, significant 19 files/204 tests, release-critical 4 files/16 tests, typecheck and routing OK, doctor errors=0, next tag v0.6.26. Scope: direct routing, runner handoff, guided begin, untracked canonical task persistence, release readiness."
  -
    type: "status"
    at: "2026-07-31T11:12:31.520Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-31T11:17:00.628Z"
    author: "EVALUATOR"
    state: "needs_rework"
    note: "Hosted verify-contract found only an oversized-test budget regression: route-decision.test.ts grew 2 lines beyond its existing baseline. Production behavior and focused tests remained correct; reduce the test without updating the baseline, then rerun verification."
  -
    type: "status"
    at: "2026-07-31T11:17:04.207Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: apply the hosted contract rework by shrinking the route regression without changing production behavior or the oversized-test baseline."
  -
    type: "verify"
    at: "2026-07-31T11:17:47.894Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: bun run hotspots:check; direct route-decision test file; bun run typecheck; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: oversized baseline OK at 1170 lines/11423 total, route-decision 11/11, typecheck and routing OK. Scope: hosted verify-contract rework only; production routing diff unchanged."
doc_version: 3
doc_updated_at: "2026-07-31T11:17:48.102Z"
doc_updated_by: "CODER"
description: "Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main."
sections:
  Summary: |-
    Eliminate direct workflow state-neutral routing loops

    Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main.
  Scope: |-
    - In scope: v0.6.25 direct route selection, execution-packet safety, runner guidance, exact-state and analogous route regressions, untracked canonical task-artifact detection/recovery, and v0.6.26 maintenance release evidence.
    - Out of scope: main, agentplane-loops, unrelated 0.7 work, provider redesign, and automatic commits that bypass configured approval policy.
  Plan: |-
    1. Reproduce the reported DOING + verification pending + absent runner loop on the v0.6.25 runtime and inventory all successful state-neutral next-action commands.
    2. Trace route selection through handoff, oracle, execution packet, guidance, and blocker derivation; classify analogous loops and persistence gaps.
    3. Route executable direct tasks to task run, use explicit blocked recovery where execution is unavailable, and surface deterministic persistence recovery for untracked canonical task artifacts.
    4. Add exact-state, recompute, adjacent-state, argv-safety, and untracked-artifact regressions.
    5. Run focused tests, routing checks, significant/release-critical suites, evaluator, integration verification, then publish v0.6.26 from the maintenance line with exact-SHA proof.
  Verify Steps: |-
    1. Run the direct-route regression suite covering DOING + verification=pending + no runner state. Expected: next-action emits argv-safe `agentplane task run <task-id>`, runner execution is allowed, and recompute does not repeat a successful state-neutral diagnostic.
    2. Run route-decision, execution-packet, route-guidance, task-handoff, and task-run focused tests. Expected: all direct runner terminal/absent states have a mutating transition or explicit blocked recovery; no unsafe placeholder command is emitted.
    3. Run the untracked task-artifact regression. Expected: canonical `.agentplane/tasks/<task-id>/` drift is detected and the route emits a deterministic task-scoped persistence command without auto-committing unrelated files.
    4. Run `node .agentplane/policy/check-routing.mjs`, `agentplane doctor`, the canonical significant suite, release-critical suite, and `agentplane release plan --patch`. Expected: all pass and target version is 0.6.26.
    5. Verify GitHub/npm/tag after publication. Expected: v0.6.26 tag, GitHub release, publish workflow, and npm `gitHead` resolve to the same maintenance SHA; that SHA is not an ancestor of main.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T11:12:03.380Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: focused Vitest route/runner suite; bun run coverage:significant-suite; bun run test:release:critical; bun run typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane release plan --patch. Result: pass. Evidence: focused 11 files/57 tests, significant 19 files/204 tests, release-critical 4 files/16 tests, typecheck and routing OK, doctor errors=0, next tag v0.6.26. Scope: direct routing, runner handoff, guided begin, untracked canonical task persistence, release readiness.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T11:07:50.558Z, excerpt_hash=sha256:04fe9431887a0f0ee3fc83f28eb32cf1b871fe0b630097a592813372cdcc6120

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311055-ST7XZY-eliminate-direct-workflow-state-neutral-routing/.agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json
    - old_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
    - current_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311055-ST7XZY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607311055-ST7XZY --branch task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
    - diagnostic_command: agentplane pr check 202607311055-ST7XZY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-31T11:17:00.628Z — VERIFY — needs_rework

    By: EVALUATOR

    Note: Hosted verify-contract found only an oversized-test budget regression: route-decision.test.ts grew 2 lines beyond its existing baseline. Production behavior and focused tests remained correct; reduce the test without updating the baseline, then rerun verification.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T11:12:31.521Z, excerpt_hash=sha256:04fe9431887a0f0ee3fc83f28eb32cf1b871fe0b630097a592813372cdcc6120

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311055-ST7XZY-eliminate-direct-workflow-state-neutral-routing/.agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json
    - old_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
    - current_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311055-ST7XZY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607311055-ST7XZY --branch task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
    - diagnostic_command: agentplane pr check 202607311055-ST7XZY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-31T11:17:47.894Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: bun run hotspots:check; direct route-decision test file; bun run typecheck; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: oversized baseline OK at 1170 lines/11423 total, route-decision 11/11, typecheck and routing OK. Scope: hosted verify-contract rework only; production routing diff unchanged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T11:17:04.207Z, excerpt_hash=sha256:04fe9431887a0f0ee3fc83f28eb32cf1b871fe0b630097a592813372cdcc6120

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311055-ST7XZY-eliminate-direct-workflow-state-neutral-routing/.agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json
    - old_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
    - current_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311055-ST7XZY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607311055-ST7XZY --branch task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
    - diagnostic_command: agentplane pr check 202607311055-ST7XZY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the routing/persistence implementation and regression commits on the maintenance branch.
    - Republish only through a later patch; never retag or overwrite v0.6.26 after publication.
    - Re-run the exact-state and release verification suites after rollback.
  Findings: |-
    - Observation: Direct route selection gated runner hints on run_id/status presence, so the handoff's valid absent-state run transition was discarded and replaced with verify-show.
      Impact: DOING tasks with pending verification and no runner state entered a successful state-neutral recompute loop.
      Resolution: Use runner next_action/next_command semantics directly; absent, retry, and resume states now route to task run.

    - Observation: Terminal successful runner handoff encoded verify-show as next_command even though verify-show only reads the acceptance contract.
      Impact: Completed runner work with pending verification could enter the same state-neutral loop through a second route surface.
      Resolution: Terminal success now emits no executable command and next-action exposes an explicit verification evidence gate.

    - Observation: Direct artifact blockers inspected staged and unstaged tracked paths only; active untracked canonical task artifacts were invisible to routing.
      Impact: Workspace recreation could discard the operational task source before runner execution, and untracked DONE archives could be declared terminal.
      Resolution: Detect task-scoped untracked artifacts, persist them with a guarded allow-tasks commit before runner work, and include untracked DONE artifacts in cleanup routing.

    - Observation: The guided task begin shortcut bypassed next-action and returned verify-show directly.
      Impact: The documented fast path reproduced the same diagnostic-as-transition category mismatch.
      Resolution: Direct task begin now hands control to task next-action --explain so persistence, runner, verification, and closeout gates stay centralized.

    - Observation: v0.6.25 used successful read-only verify-show output as an executable transition in absent and terminal runner states.
      Impact: Strict recompute rails could loop forever and active untracked task truth could be lost on workspace recreation.
      Resolution: Runner transitions now mutate or stop explicitly; untracked task truth gets a guarded persistence route before execution.
extensions:
  implementation_commit:
    hash: "d60e737bb85a8252367b8203074719531811764b"
    message: "🐛 ST7XZY routing: eliminate state-neutral direct loops"
id_source: "generated"
---
## Summary

Eliminate direct workflow state-neutral routing loops

Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main.

## Scope

- In scope: v0.6.25 direct route selection, execution-packet safety, runner guidance, exact-state and analogous route regressions, untracked canonical task-artifact detection/recovery, and v0.6.26 maintenance release evidence.
- Out of scope: main, agentplane-loops, unrelated 0.7 work, provider redesign, and automatic commits that bypass configured approval policy.

## Plan

1. Reproduce the reported DOING + verification pending + absent runner loop on the v0.6.25 runtime and inventory all successful state-neutral next-action commands.
2. Trace route selection through handoff, oracle, execution packet, guidance, and blocker derivation; classify analogous loops and persistence gaps.
3. Route executable direct tasks to task run, use explicit blocked recovery where execution is unavailable, and surface deterministic persistence recovery for untracked canonical task artifacts.
4. Add exact-state, recompute, adjacent-state, argv-safety, and untracked-artifact regressions.
5. Run focused tests, routing checks, significant/release-critical suites, evaluator, integration verification, then publish v0.6.26 from the maintenance line with exact-SHA proof.

## Verify Steps

1. Run the direct-route regression suite covering DOING + verification=pending + no runner state. Expected: next-action emits argv-safe `agentplane task run <task-id>`, runner execution is allowed, and recompute does not repeat a successful state-neutral diagnostic.
2. Run route-decision, execution-packet, route-guidance, task-handoff, and task-run focused tests. Expected: all direct runner terminal/absent states have a mutating transition or explicit blocked recovery; no unsafe placeholder command is emitted.
3. Run the untracked task-artifact regression. Expected: canonical `.agentplane/tasks/<task-id>/` drift is detected and the route emits a deterministic task-scoped persistence command without auto-committing unrelated files.
4. Run `node .agentplane/policy/check-routing.mjs`, `agentplane doctor`, the canonical significant suite, release-critical suite, and `agentplane release plan --patch`. Expected: all pass and target version is 0.6.26.
5. Verify GitHub/npm/tag after publication. Expected: v0.6.26 tag, GitHub release, publish workflow, and npm `gitHead` resolve to the same maintenance SHA; that SHA is not an ancestor of main.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T11:12:03.380Z — VERIFY — ok

By: EVALUATOR

Note: Command: focused Vitest route/runner suite; bun run coverage:significant-suite; bun run test:release:critical; bun run typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane release plan --patch. Result: pass. Evidence: focused 11 files/57 tests, significant 19 files/204 tests, release-critical 4 files/16 tests, typecheck and routing OK, doctor errors=0, next tag v0.6.26. Scope: direct routing, runner handoff, guided begin, untracked canonical task persistence, release readiness.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T11:07:50.558Z, excerpt_hash=sha256:04fe9431887a0f0ee3fc83f28eb32cf1b871fe0b630097a592813372cdcc6120

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311055-ST7XZY-eliminate-direct-workflow-state-neutral-routing/.agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json
- old_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
- current_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311055-ST7XZY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607311055-ST7XZY --branch task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
- diagnostic_command: agentplane pr check 202607311055-ST7XZY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-31T11:17:00.628Z — VERIFY — needs_rework

By: EVALUATOR

Note: Hosted verify-contract found only an oversized-test budget regression: route-decision.test.ts grew 2 lines beyond its existing baseline. Production behavior and focused tests remained correct; reduce the test without updating the baseline, then rerun verification.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T11:12:31.521Z, excerpt_hash=sha256:04fe9431887a0f0ee3fc83f28eb32cf1b871fe0b630097a592813372cdcc6120

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311055-ST7XZY-eliminate-direct-workflow-state-neutral-routing/.agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json
- old_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
- current_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311055-ST7XZY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607311055-ST7XZY --branch task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
- diagnostic_command: agentplane pr check 202607311055-ST7XZY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-31T11:17:47.894Z — VERIFY — ok

By: EVALUATOR

Note: Command: bun run hotspots:check; direct route-decision test file; bun run typecheck; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: oversized baseline OK at 1170 lines/11423 total, route-decision 11/11, typecheck and routing OK. Scope: hosted verify-contract rework only; production routing diff unchanged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T11:17:04.207Z, excerpt_hash=sha256:04fe9431887a0f0ee3fc83f28eb32cf1b871fe0b630097a592813372cdcc6120

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311055-ST7XZY-eliminate-direct-workflow-state-neutral-routing/.agentplane/tasks/202607311055-ST7XZY/blueprint/resolved-snapshot.json
- old_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
- current_digest: 063e7e1f0341562eb9e07c2b80ba05c375a57b35daffc47085e954e5030ecd3d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311055-ST7XZY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607311055-ST7XZY --branch task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
- diagnostic_command: agentplane pr check 202607311055-ST7XZY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the routing/persistence implementation and regression commits on the maintenance branch.
- Republish only through a later patch; never retag or overwrite v0.6.26 after publication.
- Re-run the exact-state and release verification suites after rollback.

## Findings

- Observation: Direct route selection gated runner hints on run_id/status presence, so the handoff's valid absent-state run transition was discarded and replaced with verify-show.
  Impact: DOING tasks with pending verification and no runner state entered a successful state-neutral recompute loop.
  Resolution: Use runner next_action/next_command semantics directly; absent, retry, and resume states now route to task run.

- Observation: Terminal successful runner handoff encoded verify-show as next_command even though verify-show only reads the acceptance contract.
  Impact: Completed runner work with pending verification could enter the same state-neutral loop through a second route surface.
  Resolution: Terminal success now emits no executable command and next-action exposes an explicit verification evidence gate.

- Observation: Direct artifact blockers inspected staged and unstaged tracked paths only; active untracked canonical task artifacts were invisible to routing.
  Impact: Workspace recreation could discard the operational task source before runner execution, and untracked DONE archives could be declared terminal.
  Resolution: Detect task-scoped untracked artifacts, persist them with a guarded allow-tasks commit before runner work, and include untracked DONE artifacts in cleanup routing.

- Observation: The guided task begin shortcut bypassed next-action and returned verify-show directly.
  Impact: The documented fast path reproduced the same diagnostic-as-transition category mismatch.
  Resolution: Direct task begin now hands control to task next-action --explain so persistence, runner, verification, and closeout gates stay centralized.

- Observation: v0.6.25 used successful read-only verify-show output as an executable transition in absent and terminal runner states.
  Impact: Strict recompute rails could loop forever and active untracked task truth could be lost on workspace recreation.
  Resolution: Runner transitions now mutate or stop explicitly; untracked task truth gets a guarded persistence route before execution.
