---
id: "202608020432-CCE1A2"
title: "Allow qualification packets to ignore root lifecycle drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "release-gate"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T04:38:20.249Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T04:48:24.175Z"
  updated_by: "TESTER"
  note: "Verified the qualification root lifecycle fix on implementation bdfe5b8e3840; focused and full repository gates pass."
  attempts: 0
commit:
  hash: "bdfe5b8e384079bd8f70de6bd65c1eeaca3c018f"
  message: "🐛 CCE1A2 qualification: permit root lifecycle drift"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: qualification packet dependency traversal now uses the current root lifecycle task while preserving exact reviewed-SHA loading for every dependency and evidence artifact. Regression coverage reproduces post-review lifecycle drift. Checks passed: focused qualification suite 6/6, typecheck, policy routing, doctor, test:critical, and ci:contract."
events:
  -
    type: "status"
    at: "2026-08-02T04:39:09.864Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T04:47:18.255Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: qualification packet dependency traversal now uses the current root lifecycle task while preserving exact reviewed-SHA loading for every dependency and evidence artifact. Regression coverage reproduces post-review lifecycle drift. Checks passed: focused qualification suite 6/6, typecheck, policy routing, doctor, test:critical, and ci:contract."
  -
    type: "verify"
    at: "2026-08-02T04:48:24.175Z"
    author: "TESTER"
    state: "ok"
    note: "Verified the qualification root lifecycle fix on implementation bdfe5b8e3840; focused and full repository gates pass."
doc_version: 3
doc_updated_at: "2026-08-02T04:48:25.001Z"
doc_updated_by: "CODER"
description: "Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior."
sections:
  Summary: |-
    Allow qualification packets to ignore root lifecycle drift

    Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior.
  Scope: |-
    - In scope: Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior.
    - Out of scope: unrelated refactors not required for "Allow qualification packets to ignore root lifecycle drift".
  Plan: "1. Reproduce the false qualification failure where resolveQualityReviewTargetSha selects the pre-start implementation SHA but the current qualification root README contains only lifecycle changes. 2. Change dependency-closure construction to use the already-loaded current qualification root for its declared dependency IDs while continuing to load every dependency task and evidence artifact from the reviewed implementation SHA with exact-blob checks. 3. Add a focused regression test that performs start-ready-equivalent lifecycle drift before verification and proves packet creation succeeds, while existing dependency README, PR metadata, quality report, cycle, and incomplete-leaf rejection tests remain green. 4. Run the focused qualification suite, package typecheck, policy routing check, doctor, and the repository critical contract. 5. Record verification/evaluator evidence, open and merge the PR through the branch_pr queue, then resync and resume rc.2 qualification."
  Verify Steps: |-
    1. Run the focused qualification packet test that introduces lifecycle-only root-task drift after the reviewed implementation SHA. Expected: verification creates a SHA-bound packet and does not treat the root task README as a dependency artifact.
    2. Run the complete evaluator qualification packet test file. Expected: dependency README, PR metadata, quality report, missing leaf, incomplete leaf, cycle, and post-review tamper checks continue to fail closed as designed.
    3. Run package typecheck, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all pass without routing or type regressions.
    4. Run `bun run test:critical` and `bun run ci:contract`. Expected: both complete successfully.
    5. Re-run rc.2 `ap verify` after integration. Expected: qualification packet creation succeeds against the lifecycle-excluded reviewed SHA and preserves strict SHA binding for all dependency evidence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T04:48:24.175Z — VERIFY — ok

    By: TESTER

    Note: Verified the qualification root lifecycle fix on implementation bdfe5b8e3840; focused and full repository gates pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T04:47:18.255Z, excerpt_hash=sha256:8df2fb2790522e59ea2abcf3cfb4a53d0b96cd65634636512bac1675a35005df

    Details:

    Original failure: rc.2 verification rejected the current qualification root README because the reviewed implementation SHA preceded start-ready lifecycle state. Reproduction and focused check: evaluator-qualification-packet.test.ts now commits lifecycle-only root drift after the reviewed SHA; complete file passed 6/6, including dependency artifact tamper rejection. Matrix: dependency README, PR metadata, quality report, missing/incomplete leaf, cycle, and unverified implementation drift remain fail-closed. Tooling: typecheck, policy routing, and doctor passed after framework bootstrap. Full gates: test:critical passed 12/12 chunks; ci:contract passed formatting, schemas, compatibility, RF-04 baselines, architecture, clone, knip, and coverage thresholds. Flake classification: the first parallel typecheck started before doctor completed dependency bootstrap and failed on missing workspace modules; the immediate post-bootstrap rerun passed, so this is environment-ordering noise rather than product regression. Commit: bdfe5b8e384079bd8f70de6bd65c1eeaca3c018f. Downstream acceptance: the real rc.2 verify will be rerun after this PR is integrated; it remains the next qualification-task gate, not a pre-merge correctness claim.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020432-CCE1A2-allow-qualification-packets-to-ignore-root-lifec/.agentplane/tasks/202608020432-CCE1A2/blueprint/resolved-snapshot.json
    - old_digest: a4c56f74d4383dcfdb6e3a1e2210a147336c98db504306ba4b9bbfa39b9745e1
    - current_digest: a4c56f74d4383dcfdb6e3a1e2210a147336c98db504306ba4b9bbfa39b9745e1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608020432-CCE1A2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608020432-CCE1A2
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
    - Observation: Qualification dependency traversal treated the lifecycle-changing root task as if it were immutable dependency evidence.
      Impact: A valid qualification task could not record verification after start-ready even though all dependency artifacts matched the reviewed SHA.
      Resolution: Use the current root task only to resolve declared dependency IDs, while retaining exact reviewed-SHA reads for every dependency task and evidence artifact; cover the lifecycle drift path in the integration test.
extensions:
  workflow_route_baseline:
    start_head_sha: "a8c24ca31654bde6f54a6cf359f8b0499f06547b"
    version: 1
id_source: "generated"
---
## Summary

Allow qualification packets to ignore root lifecycle drift

Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior.

## Scope

- In scope: Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior.
- Out of scope: unrelated refactors not required for "Allow qualification packets to ignore root lifecycle drift".

## Plan

1. Reproduce the false qualification failure where resolveQualityReviewTargetSha selects the pre-start implementation SHA but the current qualification root README contains only lifecycle changes. 2. Change dependency-closure construction to use the already-loaded current qualification root for its declared dependency IDs while continuing to load every dependency task and evidence artifact from the reviewed implementation SHA with exact-blob checks. 3. Add a focused regression test that performs start-ready-equivalent lifecycle drift before verification and proves packet creation succeeds, while existing dependency README, PR metadata, quality report, cycle, and incomplete-leaf rejection tests remain green. 4. Run the focused qualification suite, package typecheck, policy routing check, doctor, and the repository critical contract. 5. Record verification/evaluator evidence, open and merge the PR through the branch_pr queue, then resync and resume rc.2 qualification.

## Verify Steps

1. Run the focused qualification packet test that introduces lifecycle-only root-task drift after the reviewed implementation SHA. Expected: verification creates a SHA-bound packet and does not treat the root task README as a dependency artifact.
2. Run the complete evaluator qualification packet test file. Expected: dependency README, PR metadata, quality report, missing leaf, incomplete leaf, cycle, and post-review tamper checks continue to fail closed as designed.
3. Run package typecheck, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all pass without routing or type regressions.
4. Run `bun run test:critical` and `bun run ci:contract`. Expected: both complete successfully.
5. Re-run rc.2 `ap verify` after integration. Expected: qualification packet creation succeeds against the lifecycle-excluded reviewed SHA and preserves strict SHA binding for all dependency evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T04:48:24.175Z — VERIFY — ok

By: TESTER

Note: Verified the qualification root lifecycle fix on implementation bdfe5b8e3840; focused and full repository gates pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T04:47:18.255Z, excerpt_hash=sha256:8df2fb2790522e59ea2abcf3cfb4a53d0b96cd65634636512bac1675a35005df

Details:

Original failure: rc.2 verification rejected the current qualification root README because the reviewed implementation SHA preceded start-ready lifecycle state. Reproduction and focused check: evaluator-qualification-packet.test.ts now commits lifecycle-only root drift after the reviewed SHA; complete file passed 6/6, including dependency artifact tamper rejection. Matrix: dependency README, PR metadata, quality report, missing/incomplete leaf, cycle, and unverified implementation drift remain fail-closed. Tooling: typecheck, policy routing, and doctor passed after framework bootstrap. Full gates: test:critical passed 12/12 chunks; ci:contract passed formatting, schemas, compatibility, RF-04 baselines, architecture, clone, knip, and coverage thresholds. Flake classification: the first parallel typecheck started before doctor completed dependency bootstrap and failed on missing workspace modules; the immediate post-bootstrap rerun passed, so this is environment-ordering noise rather than product regression. Commit: bdfe5b8e384079bd8f70de6bd65c1eeaca3c018f. Downstream acceptance: the real rc.2 verify will be rerun after this PR is integrated; it remains the next qualification-task gate, not a pre-merge correctness claim.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020432-CCE1A2-allow-qualification-packets-to-ignore-root-lifec/.agentplane/tasks/202608020432-CCE1A2/blueprint/resolved-snapshot.json
- old_digest: a4c56f74d4383dcfdb6e3a1e2210a147336c98db504306ba4b9bbfa39b9745e1
- current_digest: a4c56f74d4383dcfdb6e3a1e2210a147336c98db504306ba4b9bbfa39b9745e1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608020432-CCE1A2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608020432-CCE1A2
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

- Observation: Qualification dependency traversal treated the lifecycle-changing root task as if it were immutable dependency evidence.
  Impact: A valid qualification task could not record verification after start-ready even though all dependency artifacts matched the reviewed SHA.
  Resolution: Use the current root task only to resolve declared dependency IDs, while retaining exact reviewed-SHA reads for every dependency task and evidence artifact; cover the lifecycle drift path in the integration test.
