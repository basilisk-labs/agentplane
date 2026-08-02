---
id: "202608020432-CCE1A2"
title: "Allow qualification packets to ignore root lifecycle drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-02T04:39:09.864Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T04:39:09.864Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
