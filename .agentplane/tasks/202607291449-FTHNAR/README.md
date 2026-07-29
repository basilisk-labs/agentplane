---
id: "202607291449-FTHNAR"
title: "Permit evidence refresh after evaluator review gaps"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T14:49:52.020Z"
  updated_by: "USER"
  note: "Standing approval granted by the user for the AgentPlane 0.7 refactor and recovery work."
verification:
  state: "ok"
  updated_at: "2026-07-29T16:23:18.461Z"
  updated_by: "TESTER"
  note: "Verified d96688db: fresh deterministic evidence covers all declared checks plus the independent blocked-quality-review regression."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-29T16:24:36.637Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "d96688db9606265c051cdeabb626925092a879ef"
  blueprint_digest: "2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e"
  evidence_refs:
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607291449-FTHNAR/README.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607291449-FTHNAR/verification/20260729162318461-c49689c994e9100c.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-162339466-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen diff and verification record show that deterministic-evidence refresh is restricted to a current evaluator-supplied deterministic_evidence_gap block, returns control to EVALUATOR after refresh, and preserves publication blockers."
commit:
  hash: "5faf3e2bac90d7730a254aaaccdb7c1d0794c6f7"
  message: "✅ FTHNAR verify: preserve semantic review target"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: added the bounded TESTER evidence-refresh route for current EVALUATOR blocks and its regression coverage."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Start: hosted CI exposed an unrecorded evaluator recovery-contract delta; restore the approved candidate and rerun the full gate."
  -
    author: "CODER"
    body: "Start: rework the deterministic-evidence refresh route so it compares the EVALUATOR SHA with the effective semantic target rather than a later artifact-only commit."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-29T14:50:37.293Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T15:00:05.355Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: added the bounded TESTER evidence-refresh route for current EVALUATOR blocks and its regression coverage."
  -
    type: "verify"
    at: "2026-07-29T15:01:06.145Z"
    author: "TESTER"
    state: "ok"
    note: "Verified bounded evidence-refresh routing and protected quality-review handoff."
  -
    type: "status"
    at: "2026-07-29T15:24:29.542Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-07-29T15:26:17.194Z"
    author: "TESTER"
    state: "ok"
    note: "Verified 9a4fc724: workflow route tests (24), route-decision tests (10), policy routing, and doctor passed."
  -
    type: "status"
    at: "2026-07-29T15:30:39.633Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-07-29T15:30:45.049Z"
    author: "TESTER"
    state: "ok"
    note: "Verified e9ef623: four declared checks passed with frozen command-level results."
  -
    type: "status"
    at: "2026-07-29T15:37:07.515Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-07-29T15:38:34.273Z"
    author: "TESTER"
    state: "ok"
    note: "Verified 36afba49: persisted recovery-boundary coverage and all declared checks passed."
  -
    type: "status"
    at: "2026-07-29T15:41:12.608Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-29T15:55:48.769Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Start: hosted CI exposed an unrecorded evaluator recovery-contract delta; restore the approved candidate and rerun the full gate."
  -
    type: "verify"
    at: "2026-07-29T16:10:55.644Z"
    author: "TESTER"
    state: "ok"
    note: "Verification: workflow-step 24/24, route-decision 10/10, SGR contracts 26/26, critical compatibility baseline 7/7, routing, doctor, Prettier, diff check, and SHA-bound compatibility ratchet passed."
  -
    type: "status"
    at: "2026-07-29T16:15:05.222Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: rework the deterministic-evidence refresh route so it compares the EVALUATOR SHA with the effective semantic target rather than a later artifact-only commit."
  -
    type: "verify"
    at: "2026-07-29T16:17:48.714Z"
    author: "TESTER"
    state: "ok"
    note: "Verification: semantic-target routing 25/25, evaluator calibration 11/11, quality-review blockers 6/6, route decision 10/10, policy routing, doctor, formatting, diff check, and compatibility ratchet passed."
  -
    type: "verify"
    at: "2026-07-29T16:23:18.461Z"
    author: "TESTER"
    state: "ok"
    note: "Verified d96688db: fresh deterministic evidence covers all declared checks plus the independent blocked-quality-review regression."
  -
    type: "status"
    at: "2026-07-29T16:25:50.923Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-29T16:25:50.924Z"
doc_updated_by: "CODER"
description: "Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication."
sections:
  Summary: |-
    Permit evidence refresh after evaluator review gaps

    Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
  Scope: |-
    - In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
    - Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".
  Plan: |-
    1. Identify the blocked-quality-review route that prevents a task from refreshing deterministic evidence requested by EVALUATOR.
    2. Add a bounded recovery transition that permits only task verification; preserve EVALUATOR as the sole semantic verdict owner and require a fresh quality review before PR publication.
    3. Add regression coverage for the blocked-to-verification route and verify that unrelated quality-review blocks remain non-mutating.
    4. Run the focused tests, policy routing validation, and doctor; record exact results.
    5. Obtain an independent EVALUATOR verdict, publish the narrow PR, wait for hosted checks, then integrate before resuming the beta.1 gate task.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/workflow-step.test.ts`. Expected: the current EVALUATOR-blocked review route delegates only to TESTER evidence refresh.
    2. Run `bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: existing stale-quality-review routing remains protected from PR publication.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after the command-route change.
    4. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: no new workflow health errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-29T15:01:06.145Z — VERIFY — ok

    By: TESTER

    Note: Verified bounded evidence-refresh routing and protected quality-review handoff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:00:05.355Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
    Result: pass
    Evidence: 22 pass; includes current EVALUATOR-blocked evidence-refresh route.
    Scope: route reducer and execution-packet behavior.

    Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: 10 pass; stale quality review remains ahead of PR-head publication.
    Scope: branch_pr publication safety.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway compatibility.

    Command: node packages/agentplane/bin/agentplane.js doctor
    Result: pass
    Evidence: 0 errors; two historical DONE-task commit warnings outside this task.
    Scope: repository workflow health.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-29T15:26:17.194Z — VERIFY — ok

    By: TESTER

    Note: Verified 9a4fc724: workflow route tests (24), route-decision tests (10), policy routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:24:29.542Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

    ### 2026-07-29T15:30:45.049Z — VERIFY — ok

    By: TESTER

    Note: Verified e9ef623: four declared checks passed with frozen command-level results.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:30:39.633Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
    Result: pass
    Evidence: 24 pass; 0 fail; 135 expectations
    Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

    Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: 10 pass; 0 fail; 11 expectations
    Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK
    Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

    Command: node packages/agentplane/bin/agentplane.js doctor
    Result: pass
    Evidence: doctor OK; errors=0; historical warnings=2
    Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-29T15:38:34.273Z — VERIFY — ok

    By: TESTER

    Note: Verified 36afba49: persisted recovery-boundary coverage and all declared checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:37:07.515Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: bun test packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts
    Result: pass
    Evidence: 11 pass; persisted positive and negative recovery-route cases covered
    Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
    Result: pass
    Evidence: 24 pass; 0 fail; 135 expectations
    Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

    Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: 10 pass; 0 fail; 11 expectations
    Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK
    Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

    Command: node packages/agentplane/bin/agentplane.js doctor
    Result: pass
    Evidence: doctor OK; errors=0; historical warnings=2
    Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

    ### 2026-07-29T16:10:55.644Z — VERIFY — ok

    By: TESTER

    Note: Verification: workflow-step 24/24, route-decision 10/10, SGR contracts 26/26, critical compatibility baseline 7/7, routing, doctor, Prettier, diff check, and SHA-bound compatibility ratchet passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:55:48.769Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

    ### 2026-07-29T16:17:48.714Z — VERIFY — ok

    By: TESTER

    Note: Verification: semantic-target routing 25/25, evaluator calibration 11/11, quality-review blockers 6/6, route decision 10/10, policy routing, doctor, formatting, diff check, and compatibility ratchet passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:15:05.222Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

    ### 2026-07-29T16:23:18.461Z — VERIFY — ok

    By: TESTER

    Note: Verified d96688db: fresh deterministic evidence covers all declared checks plus the independent blocked-quality-review regression.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:17:49.420Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
    Result: pass
    Evidence: focused unit output: 25 pass, 0 fail, 136 expectations; includes evidence-refresh routing.
    Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

    Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: focused unit output: 10 pass, 0 fail, 11 expectations; preserves stale-review publication block.
    Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: focused Vitest output: 6 pass, 0 fail; covers the unrelated blocked-quality-review guard.
    Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

    Command: node packages/agentplane/bin/agentplane.js doctor
    Result: pass
    Evidence: doctor OK; errors=0; warnings=2 are historical missing DONE-task commit hashes outside this task.
    Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
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
    - Observation: Explicit evaluator reason and review-versus-verification freshness prevent semantic-block refresh and refresh loops.
      Impact: TESTER may refresh only a current deterministic-evidence-gap block once before EVALUATOR re-review.
      Resolution: Typed recovery_reason is persisted from the read-only evaluator result and guarded by route tests.

    - Observation: The first recovery record lacked structured command evidence, so evaluator correctly blocked it.
      Impact: A passing status without check-level details cannot establish deterministic verification.
      Resolution: Fresh TESTER record freezes command, result, evidence summary, and evaluated SHA for all Verify Steps.

    - Observation: Evaluator rework required persistence-boundary coverage beyond synthetic route fixtures.
      Impact: A route field can be correct in memory yet fail after task serialization and normalization.
      Resolution: Integration calibration now applies typed results, reloads TaskData, and asserts positive and negative next-action routing.

    - Observation: Hosted CI exposed an unrecorded deterministic_evidence_gap contract delta.
      Impact: The protected PR could not merge while the candidate omitted the new public evaluator field.
      Resolution: Recorded FTHNAR provenance and exact digests in the cumulative candidate without changing the immutable v0.6.24 anchor.

    - Observation: The original evidence-refresh predicate compared against artifact HEAD instead of the resolver-selected semantic target.
      Impact: A valid deterministic evidence block could not reach TESTER after lifecycle artifacts were committed.
      Resolution: Route decision now supplies the shared semantic target; reducer coverage proves artifact-only commits keep the TESTER refresh handoff.
extensions:
  implementation_commit:
    hash: "d96688db9606265c051cdeabb626925092a879ef"
    message: "🐛 FTHNAR route: preserve semantic review target"
  workflow_route_baseline:
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Permit evidence refresh after evaluator review gaps

Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.

## Scope

- In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
- Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".

## Plan

1. Identify the blocked-quality-review route that prevents a task from refreshing deterministic evidence requested by EVALUATOR.
2. Add a bounded recovery transition that permits only task verification; preserve EVALUATOR as the sole semantic verdict owner and require a fresh quality review before PR publication.
3. Add regression coverage for the blocked-to-verification route and verify that unrelated quality-review blocks remain non-mutating.
4. Run the focused tests, policy routing validation, and doctor; record exact results.
5. Obtain an independent EVALUATOR verdict, publish the narrow PR, wait for hosted checks, then integrate before resuming the beta.1 gate task.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/workflow-step.test.ts`. Expected: the current EVALUATOR-blocked review route delegates only to TESTER evidence refresh.
2. Run `bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: existing stale-quality-review routing remains protected from PR publication.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after the command-route change.
4. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: no new workflow health errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-29T15:01:06.145Z — VERIFY — ok

By: TESTER

Note: Verified bounded evidence-refresh routing and protected quality-review handoff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:00:05.355Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
Result: pass
Evidence: 22 pass; includes current EVALUATOR-blocked evidence-refresh route.
Scope: route reducer and execution-packet behavior.

Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: 10 pass; stale quality review remains ahead of PR-head publication.
Scope: branch_pr publication safety.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway compatibility.

Command: node packages/agentplane/bin/agentplane.js doctor
Result: pass
Evidence: 0 errors; two historical DONE-task commit warnings outside this task.
Scope: repository workflow health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-29T15:26:17.194Z — VERIFY — ok

By: TESTER

Note: Verified 9a4fc724: workflow route tests (24), route-decision tests (10), policy routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:24:29.542Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

### 2026-07-29T15:30:45.049Z — VERIFY — ok

By: TESTER

Note: Verified e9ef623: four declared checks passed with frozen command-level results.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:30:39.633Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
Result: pass
Evidence: 24 pass; 0 fail; 135 expectations
Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: 10 pass; 0 fail; 11 expectations
Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK
Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

Command: node packages/agentplane/bin/agentplane.js doctor
Result: pass
Evidence: doctor OK; errors=0; historical warnings=2
Scope: implementation e9ef6239774c4e2cff481d200a369c22225b38a1

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-29T15:38:34.273Z — VERIFY — ok

By: TESTER

Note: Verified 36afba49: persisted recovery-boundary coverage and all declared checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:37:07.515Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: bun test packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts
Result: pass
Evidence: 11 pass; persisted positive and negative recovery-route cases covered
Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
Result: pass
Evidence: 24 pass; 0 fail; 135 expectations
Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: 10 pass; 0 fail; 11 expectations
Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK
Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

Command: node packages/agentplane/bin/agentplane.js doctor
Result: pass
Evidence: doctor OK; errors=0; historical warnings=2
Scope: implementation 36afba49f14321f1a12e00a902d63fcb5d3e2c3e

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

### 2026-07-29T16:10:55.644Z — VERIFY — ok

By: TESTER

Note: Verification: workflow-step 24/24, route-decision 10/10, SGR contracts 26/26, critical compatibility baseline 7/7, routing, doctor, Prettier, diff check, and SHA-bound compatibility ratchet passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:55:48.769Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

### 2026-07-29T16:17:48.714Z — VERIFY — ok

By: TESTER

Note: Verification: semantic-target routing 25/25, evaluator calibration 11/11, quality-review blockers 6/6, route decision 10/10, policy routing, doctor, formatting, diff check, and compatibility ratchet passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:15:05.222Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

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

### 2026-07-29T16:23:18.461Z — VERIFY — ok

By: TESTER

Note: Verified d96688db: fresh deterministic evidence covers all declared checks plus the independent blocked-quality-review regression.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:17:49.420Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
Result: pass
Evidence: focused unit output: 25 pass, 0 fail, 136 expectations; includes evidence-refresh routing.
Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: focused unit output: 10 pass, 0 fail, 11 expectations; preserves stale-review publication block.
Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: focused Vitest output: 6 pass, 0 fail; covers the unrelated blocked-quality-review guard.
Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

Command: node packages/agentplane/bin/agentplane.js doctor
Result: pass
Evidence: doctor OK; errors=0; warnings=2 are historical missing DONE-task commit hashes outside this task.
Scope: reviewed semantic target d96688db9606265c051cdeabb626925092a879ef.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
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

- Observation: Explicit evaluator reason and review-versus-verification freshness prevent semantic-block refresh and refresh loops.
  Impact: TESTER may refresh only a current deterministic-evidence-gap block once before EVALUATOR re-review.
  Resolution: Typed recovery_reason is persisted from the read-only evaluator result and guarded by route tests.

- Observation: The first recovery record lacked structured command evidence, so evaluator correctly blocked it.
  Impact: A passing status without check-level details cannot establish deterministic verification.
  Resolution: Fresh TESTER record freezes command, result, evidence summary, and evaluated SHA for all Verify Steps.

- Observation: Evaluator rework required persistence-boundary coverage beyond synthetic route fixtures.
  Impact: A route field can be correct in memory yet fail after task serialization and normalization.
  Resolution: Integration calibration now applies typed results, reloads TaskData, and asserts positive and negative next-action routing.

- Observation: Hosted CI exposed an unrecorded deterministic_evidence_gap contract delta.
  Impact: The protected PR could not merge while the candidate omitted the new public evaluator field.
  Resolution: Recorded FTHNAR provenance and exact digests in the cumulative candidate without changing the immutable v0.6.24 anchor.

- Observation: The original evidence-refresh predicate compared against artifact HEAD instead of the resolver-selected semantic target.
  Impact: A valid deterministic evidence block could not reach TESTER after lifecycle artifacts were committed.
  Resolution: Route decision now supplies the shared semantic target; reducer coverage proves artifact-only commits keep the TESTER refresh handoff.
