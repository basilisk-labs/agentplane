---
id: "202607291449-FTHNAR"
title: "Permit evidence refresh after evaluator review gaps"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 53
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
  updated_at: "2026-07-29T17:25:29.043Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-29T17:21:54.179Z"
  updated_by: "TESTER"
  note: "Rework: integration queue on the base checkout cannot refresh a constrained-refspec task tracking ref; extend the existing source repair so protected integration validates the published head without manual fetch state."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-29T17:13:43.123Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "13d29967da9d6f5de77780ac92b3180916968b72"
  blueprint_digest: "2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e"
  evidence_refs:
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607291449-FTHNAR/README.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607291449-FTHNAR/verification/20260729171328722-3fe4fb9327f32a08.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-171342406-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The source repair is bounded to publication tracking and configured-upstream resolution; it does not mutate origin fetch configuration."
    - "The existing FTH semantic route binds evaluator freshness to the implementation SHA, which avoids artifact-only closure loops."
    - "The final primary plan accurately records #4673 as superseded rather than fabricating an invalid branch_pr batch."
commit: null
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
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Implementation: added the included constrained-refspec publication repair and regression coverage to the primary FTH branch."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Implementation: primary FTH rework packaging corrected; semantic implementation remains commit 13d29967da9d."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Start: extend the constrained-refspec tracking repair to protected integration preparation and prove the queue path from the base checkout."
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
  -
    type: "verify"
    at: "2026-07-29T16:30:20.448Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted verify-contract failed: workflow-step-branch.ts exceeds the enforced 600-line runtime-module limit (619 lines)."
  -
    type: "verify"
    at: "2026-07-29T16:36:44.768Z"
    author: "TESTER"
    state: "ok"
    note: "Verified b9e45a1: structural CI repair preserves quality-evidence routing and restores both hotspot budgets."
  -
    type: "status"
    at: "2026-07-29T16:38:49.869Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-29T17:06:00.534Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: include the dependent constrained-refspec publication repair so the FTH PR can complete its own evaluator and publication lifecycle without manual upstream mutation."
  -
    type: "status"
    at: "2026-07-29T17:08:50.038Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: added the included constrained-refspec publication repair and regression coverage to the primary FTH branch."
  -
    type: "verify"
    at: "2026-07-29T17:09:33.602Z"
    author: "TESTER"
    state: "ok"
    note: "Combined FTH and constrained-refspec regression checks passed before primary PR publication."
  -
    type: "status"
    at: "2026-07-29T17:10:28.513Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-29T17:11:50.510Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: correct the primary task plan after CLI rejected batch inclusion of the already-DONE R1 task; retain the tested source repair in FTH and supersede the duplicate PR."
  -
    type: "status"
    at: "2026-07-29T17:12:49.471Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: primary FTH rework packaging corrected; semantic implementation remains commit 13d29967da9d."
  -
    type: "verify"
    at: "2026-07-29T17:13:28.722Z"
    author: "TESTER"
    state: "ok"
    note: "Corrected primary packaging retains the same semantic implementation and all combined checks pass."
  -
    type: "status"
    at: "2026-07-29T17:14:11.516Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-29T17:21:54.179Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: integration queue on the base checkout cannot refresh a constrained-refspec task tracking ref; extend the existing source repair so protected integration validates the published head without manual fetch state."
  -
    type: "status"
    at: "2026-07-29T17:22:16.172Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: extend the constrained-refspec tracking repair to protected integration preparation and prove the queue path from the base checkout."
doc_version: 3
doc_updated_at: "2026-07-29T17:25:22.936Z"
doc_updated_by: "CODER"
description: "Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication."
sections:
  Summary: |-
    Permit evidence refresh after evaluator review gaps

    Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
  Scope: |-
    - In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
    - Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".
  Plan: "1. Preserve the approved evaluator evidence-refresh route and its stale-quality safeguards. 2. Extend the constrained-refspec repair with one reusable Git helper that refreshes a configured task tracking ref without changing remote.fetch. 3. Require protected integration preparation to use that helper before comparing the task branch head to upstream, so base checkout validation is independent of a broad fetch refspec. 4. Keep R1 and PR #4673 as superseded traceability; FTH #4672 remains the only merge target. 5. Re-run focused core, publication, and integration-preparation regression tests; typecheck, lint, structural policy checks; prove the real integration queue can enqueue #4672 from the constrained-refspec base checkout; then obtain a fresh evaluator review, hosted matrix, and integrate."
  Verify Steps: "1. Run bun test packages/agentplane/src/commands/shared/workflow-step.test.ts and bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts. Expected: evaluator evidence-refresh and stale-quality routing remain correct. 2. Run bun test packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: constrained-refspec publication and the reusable tracking-ref refresh resolve the configured upstream without changing remote.fetch. 3. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Expected: integration preparation refreshes the configured tracking ref before comparing the published branch head. 4. Run bun run typecheck. Expected: TypeScript typecheck passes. 5. Run bunx eslint packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/core/src/git/index.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/commands/shared/workflow-step-branch.ts. Expected: no lint errors in changed scope. 6. Run bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor. Expected: structural and policy gates pass without new workflow errors. 7. Publish FTH PR #4672 through agentplane pr open and run agentplane pr flow status 202607291449-FTHNAR --json. Expected: local, upstream, and hosted heads are aligned. 8. From a clean base checkout, run agentplane integrate queue enqueue 202607291449-FTHNAR --branch task/202607291449-FTHNAR/permit-evidence-refresh-after-evaluator-review-g. Expected: the queue accepts the published head under the constrained refspec. 9. Wait for the hosted matrix to settle. Expected: no failing required check. 10. Keep superseded PR #4673 closed without deleting its remote branch. Expected: duplicate traceability remains preserved while #4672 is the only merge target."
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

    ### 2026-07-29T16:30:20.448Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted verify-contract failed: workflow-step-branch.ts exceeds the enforced 600-line runtime-module limit (619 lines).
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:25:50.924Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: GitHub Actions Core CI / verify-contract (run 30470755976, job 90640167676)
    Result: fail
    Evidence: hotspot-report reports packages/agentplane/src/commands/shared/workflow-step-branch.ts at 619 lines; threshold is 600.
    Scope: structural extraction only; preserve FTHNAR recovery-route behavior and its existing tests.

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

    ### 2026-07-29T16:36:44.768Z — VERIFY — ok

    By: TESTER

    Note: Verified b9e45a1: structural CI repair preserves quality-evidence routing and restores both hotspot budgets.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:30:21.382Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
    Result: pass
    Evidence: focused unit output: 21 pass, 0 fail, 131 expectations.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: bun test packages/agentplane/src/commands/shared/workflow-step-quality.test.ts
    Result: pass
    Evidence: focused unit output: 4 pass, 0 fail; recovery refresh, artifact descendants, negative block, and EVALUATOR return covered.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: focused unit output: 10 pass, 0 fail, 11 expectations.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: focused Vitest output: 6 pass, 0 fail.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: bun run hotspots:check
    Result: pass
    Evidence: workflow-step-branch is 595 lines; oversized test baseline OK with 10 entries and 11370 total lines.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: node packages/agentplane/bin/agentplane.js doctor
    Result: pass
    Evidence: doctor OK; errors=0; warnings=2 are historical missing DONE-task commit hashes outside this task.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build check exited 0.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: bunx eslint packages/agentplane/src/commands/shared/workflow-step-branch.ts packages/agentplane/src/commands/shared/workflow-step-branch-state.ts packages/agentplane/src/commands/shared/workflow-step-quality.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts
    Result: pass
    Evidence: ESLint exited 0 for all changed implementation and test files.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

    Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts --pool=forks --maxWorkers 4 --testTimeout 120000 --hookTimeout 120000
    Result: pass
    Evidence: critical compatibility output: 7 pass, 0 fail.
    Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

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

    ### 2026-07-29T17:06:00.534Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: include the dependent constrained-refspec publication repair so the FTH PR can complete its own evaluator and publication lifecycle without manual upstream mutation.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:38:49.870Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

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

    ### 2026-07-29T17:09:33.602Z — VERIFY — ok

    By: TESTER

    Note: Combined FTH and constrained-refspec regression checks passed before primary PR publication.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:08:50.038Z, excerpt_hash=sha256:2b310ff575fa928cbad7ddd4bad6799aee203f633c02e39f394feb990260d820

    Details:

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts
    Result: pass
    Evidence: 46 tests passed, 0 failed.
    Scope: evaluator evidence-refresh, stale-quality routing, and constrained-refspec publication tracking.

    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx eslint packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/commands/shared/workflow-step-branch.ts; bun run hotspots:check; node .agentplane/policy/check-routing.mjs; agentplane doctor
    Result: pass
    Evidence: focused quality-route test, typecheck, lint, structural and policy gates completed; doctor reports no errors and only historical missing-commit warnings.
    Scope: combined primary PR source and workflow contract.

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

    ### 2026-07-29T17:11:50.510Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: correct the primary task plan after CLI rejected batch inclusion of the already-DONE R1 task; retain the tested source repair in FTH and supersede the duplicate PR.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:10:28.514Z, excerpt_hash=sha256:2b310ff575fa928cbad7ddd4bad6799aee203f633c02e39f394feb990260d820

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

    ### 2026-07-29T17:13:28.722Z — VERIFY — ok

    By: TESTER

    Note: Corrected primary packaging retains the same semantic implementation and all combined checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:12:49.471Z, excerpt_hash=sha256:4224e02e6626f82e3581ba675f45e8bb8d0d5e6704a3c49850d13c6eb39a6337

    Details:

    Command: bun test packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: 46 tests passed, 0 failed.
    Scope: constrained-refspec publication plus evaluator evidence-refresh and stale-quality routing.

    Command: bun run typecheck; bun run hotspots:check; node .agentplane/policy/check-routing.mjs; agentplane doctor
    Result: pass
    Evidence: typecheck, structural/policy gates, and doctor completed without errors; doctor retains only historical missing-commit warnings.
    Scope: combined primary FTH branch after packaging correction.

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

    ### 2026-07-29T17:21:54.179Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: integration queue on the base checkout cannot refresh a constrained-refspec task tracking ref; extend the existing source repair so protected integration validates the published head without manual fetch state.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:14:11.517Z, excerpt_hash=sha256:4224e02e6626f82e3581ba675f45e8bb8d0d5e6704a3c49850d13c6eb39a6337

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

    - Observation: The repaired FTH semantic route is required by the dependent publication fix, while the publication fix is required to publish FTH under this repository constrained origin refspec.
      Impact: Separate PRs form a lifecycle bootstrap cycle even though both changes are bounded to the same branch_pr correctness surface.
      Resolution: Carry R1N8C5 as an included task on FTH PR #4672 and add its tested source changes to the FTH rework branch.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The FTH evaluator freshness repair and constrained-refspec publication repair are jointly required for this repository task lifecycle.
      Impact: Either change alone leaves a valid primary PR unable to complete its own controlled closure and publication route.
      Resolution: The primary FTH PR now includes R1N8C5, with one combined verification contract and one serialized integration target.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Branch-pr batch validation rejects a DONE task absent from the primary worktree.
      Impact: Recording R1 as included would create an invalid lifecycle graph.
      Resolution: FTH remains the sole primary task carrying the code; #4673 will be closed as superseded after FTH publishes.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The final primary plan contains a single FTH task and explicitly supersedes the duplicate R1 PR rather than declaring an invalid batch.
      Impact: The primary PR can now satisfy branch_pr ownership rules without losing the constrained-refspec source repair.
      Resolution: Publish #4672 as the sole integration target, then close #4673 as superseded.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  implementation_commit:
    hash: "13d29967da9d6f5de77780ac92b3180916968b72"
    message: "♻️ FTHNAR pr: restore constrained-refspec head tracking"
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

1. Preserve the approved evaluator evidence-refresh route and its stale-quality safeguards. 2. Extend the constrained-refspec repair with one reusable Git helper that refreshes a configured task tracking ref without changing remote.fetch. 3. Require protected integration preparation to use that helper before comparing the task branch head to upstream, so base checkout validation is independent of a broad fetch refspec. 4. Keep R1 and PR #4673 as superseded traceability; FTH #4672 remains the only merge target. 5. Re-run focused core, publication, and integration-preparation regression tests; typecheck, lint, structural policy checks; prove the real integration queue can enqueue #4672 from the constrained-refspec base checkout; then obtain a fresh evaluator review, hosted matrix, and integrate.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/shared/workflow-step.test.ts and bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts. Expected: evaluator evidence-refresh and stale-quality routing remain correct. 2. Run bun test packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: constrained-refspec publication and the reusable tracking-ref refresh resolve the configured upstream without changing remote.fetch. 3. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Expected: integration preparation refreshes the configured tracking ref before comparing the published branch head. 4. Run bun run typecheck. Expected: TypeScript typecheck passes. 5. Run bunx eslint packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/core/src/git/index.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/commands/shared/workflow-step-branch.ts. Expected: no lint errors in changed scope. 6. Run bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor. Expected: structural and policy gates pass without new workflow errors. 7. Publish FTH PR #4672 through agentplane pr open and run agentplane pr flow status 202607291449-FTHNAR --json. Expected: local, upstream, and hosted heads are aligned. 8. From a clean base checkout, run agentplane integrate queue enqueue 202607291449-FTHNAR --branch task/202607291449-FTHNAR/permit-evidence-refresh-after-evaluator-review-g. Expected: the queue accepts the published head under the constrained refspec. 9. Wait for the hosted matrix to settle. Expected: no failing required check. 10. Keep superseded PR #4673 closed without deleting its remote branch. Expected: duplicate traceability remains preserved while #4672 is the only merge target.

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

### 2026-07-29T16:30:20.448Z — VERIFY — needs_rework

By: TESTER

Note: Hosted verify-contract failed: workflow-step-branch.ts exceeds the enforced 600-line runtime-module limit (619 lines).
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:25:50.924Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: GitHub Actions Core CI / verify-contract (run 30470755976, job 90640167676)
Result: fail
Evidence: hotspot-report reports packages/agentplane/src/commands/shared/workflow-step-branch.ts at 619 lines; threshold is 600.
Scope: structural extraction only; preserve FTHNAR recovery-route behavior and its existing tests.

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

### 2026-07-29T16:36:44.768Z — VERIFY — ok

By: TESTER

Note: Verified b9e45a1: structural CI repair preserves quality-evidence routing and restores both hotspot budgets.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:30:21.382Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
Result: pass
Evidence: focused unit output: 21 pass, 0 fail, 131 expectations.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: bun test packages/agentplane/src/commands/shared/workflow-step-quality.test.ts
Result: pass
Evidence: focused unit output: 4 pass, 0 fail; recovery refresh, artifact descendants, negative block, and EVALUATOR return covered.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: focused unit output: 10 pass, 0 fail, 11 expectations.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: focused Vitest output: 6 pass, 0 fail.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: bun run hotspots:check
Result: pass
Evidence: workflow-step-branch is 595 lines; oversized test baseline OK with 10 entries and 11370 total lines.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: node packages/agentplane/bin/agentplane.js doctor
Result: pass
Evidence: doctor OK; errors=0; warnings=2 are historical missing DONE-task commit hashes outside this task.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build check exited 0.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: bunx eslint packages/agentplane/src/commands/shared/workflow-step-branch.ts packages/agentplane/src/commands/shared/workflow-step-branch-state.ts packages/agentplane/src/commands/shared/workflow-step-quality.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts
Result: pass
Evidence: ESLint exited 0 for all changed implementation and test files.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts --pool=forks --maxWorkers 4 --testTimeout 120000 --hookTimeout 120000
Result: pass
Evidence: critical compatibility output: 7 pass, 0 fail.
Scope: implementation b9e45a1d9de7a5d0a52570d8e2c28d4a55e79345.

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

### 2026-07-29T17:06:00.534Z — VERIFY — needs_rework

By: TESTER

Note: Rework: include the dependent constrained-refspec publication repair so the FTH PR can complete its own evaluator and publication lifecycle without manual upstream mutation.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T16:38:49.870Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

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

### 2026-07-29T17:09:33.602Z — VERIFY — ok

By: TESTER

Note: Combined FTH and constrained-refspec regression checks passed before primary PR publication.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:08:50.038Z, excerpt_hash=sha256:2b310ff575fa928cbad7ddd4bad6799aee203f633c02e39f394feb990260d820

Details:

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts
Result: pass
Evidence: 46 tests passed, 0 failed.
Scope: evaluator evidence-refresh, stale-quality routing, and constrained-refspec publication tracking.

Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx eslint packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/commands/shared/workflow-step-branch.ts; bun run hotspots:check; node .agentplane/policy/check-routing.mjs; agentplane doctor
Result: pass
Evidence: focused quality-route test, typecheck, lint, structural and policy gates completed; doctor reports no errors and only historical missing-commit warnings.
Scope: combined primary PR source and workflow contract.

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

### 2026-07-29T17:11:50.510Z — VERIFY — needs_rework

By: TESTER

Note: Rework: correct the primary task plan after CLI rejected batch inclusion of the already-DONE R1 task; retain the tested source repair in FTH and supersede the duplicate PR.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:10:28.514Z, excerpt_hash=sha256:2b310ff575fa928cbad7ddd4bad6799aee203f633c02e39f394feb990260d820

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

### 2026-07-29T17:13:28.722Z — VERIFY — ok

By: TESTER

Note: Corrected primary packaging retains the same semantic implementation and all combined checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:12:49.471Z, excerpt_hash=sha256:4224e02e6626f82e3581ba675f45e8bb8d0d5e6704a3c49850d13c6eb39a6337

Details:

Command: bun test packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: 46 tests passed, 0 failed.
Scope: constrained-refspec publication plus evaluator evidence-refresh and stale-quality routing.

Command: bun run typecheck; bun run hotspots:check; node .agentplane/policy/check-routing.mjs; agentplane doctor
Result: pass
Evidence: typecheck, structural/policy gates, and doctor completed without errors; doctor retains only historical missing-commit warnings.
Scope: combined primary FTH branch after packaging correction.

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

### 2026-07-29T17:21:54.179Z — VERIFY — needs_rework

By: TESTER

Note: Rework: integration queue on the base checkout cannot refresh a constrained-refspec task tracking ref; extend the existing source repair so protected integration validates the published head without manual fetch state.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T17:14:11.517Z, excerpt_hash=sha256:4224e02e6626f82e3581ba675f45e8bb8d0d5e6704a3c49850d13c6eb39a6337

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

- Observation: The repaired FTH semantic route is required by the dependent publication fix, while the publication fix is required to publish FTH under this repository constrained origin refspec.
  Impact: Separate PRs form a lifecycle bootstrap cycle even though both changes are bounded to the same branch_pr correctness surface.
  Resolution: Carry R1N8C5 as an included task on FTH PR #4672 and add its tested source changes to the FTH rework branch.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The FTH evaluator freshness repair and constrained-refspec publication repair are jointly required for this repository task lifecycle.
  Impact: Either change alone leaves a valid primary PR unable to complete its own controlled closure and publication route.
  Resolution: The primary FTH PR now includes R1N8C5, with one combined verification contract and one serialized integration target.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Branch-pr batch validation rejects a DONE task absent from the primary worktree.
  Impact: Recording R1 as included would create an invalid lifecycle graph.
  Resolution: FTH remains the sole primary task carrying the code; #4673 will be closed as superseded after FTH publishes.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The final primary plan contains a single FTH task and explicitly supersedes the duplicate R1 PR rather than declaring an invalid batch.
  Impact: The primary PR can now satisfy branch_pr ownership rules without losing the constrained-refspec source repair.
  Resolution: Publish #4672 as the sole integration target, then close #4673 as superseded.
  Promotion: incident-candidate
  Fixability: repo-fixable
