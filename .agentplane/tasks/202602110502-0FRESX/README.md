---
id: "202602110502-0FRESX"
title: "T8: Tune upgrade needsSemanticReview to reduce false positives"
result_summary: "Reduced upgrade semantic-review false positives and added regression test"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "upgrade"
  - "code"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T05:19:45.826Z"
  updated_by: "TESTER"
  note: "Verified: build(core+agentplane), lint, test:fast all pass including new upgrade baseline regression."
commit:
  hash: "b68fc16cf8b337bf3cffbb5961c8f7f60fc7301b"
  message: "🚧 0FRESX upgrade: tighten semantic review conflict predicate"
comments:
  -
    author: "CODER"
    body: "Start: tighten needsSemanticReview baseline conflict predicate and add non-conflict regression test."
  -
    author: "CODER"
    body: "Verified: needsSemanticReview now requires actual current-vs-incoming divergence with dual baseline deltas."
events:
  -
    type: "status"
    at: "2026-02-11T05:18:14.676Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten needsSemanticReview baseline conflict predicate and add non-conflict regression test."
  -
    type: "verify"
    at: "2026-02-11T05:19:45.826Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build(core+agentplane), lint, test:fast all pass including new upgrade baseline regression."
  -
    type: "status"
    at: "2026-02-11T05:19:45.974Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: needsSemanticReview now requires actual current-vs-incoming divergence with dual baseline deltas."
doc_version: 2
doc_updated_at: "2026-02-11T05:19:45.974Z"
doc_updated_by: "CODER"
description: "Refine baselineConflict criteria to require current!=incoming and both changed vs baseline; add tests; optionally expose currentDiffersFromIncoming in review.json."
id_source: "generated"
---
## Summary

Refine upgrade semantic-review signal to avoid false positives when current and incoming are identical relative to each other but both differ from baseline.

## Scope

In scope: needsSemanticReview/baselineConflict logic in upgrade command and related tests. Out of scope: task orchestration protocol and report format redesign.

## Plan

1) Update baseline conflict predicate to require current differs from incoming and both differ from baseline. 2) Surface currentDiffersFromIncoming in review output for diagnostics. 3) Add regression test where current==incoming!=baseline and assert needsSemanticReview=false.

## Risks

Risk: under-reporting semantic conflicts if predicate is too narrow. Mitigation: keep dual-change checks and add targeted regression tests for both conflict and non-conflict baselines.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T05:19:45.826Z — VERIFY — ok

By: TESTER

Note: Verified: build(core+agentplane), lint, test:fast all pass including new upgrade baseline regression.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T05:18:14.676Z, excerpt_hash=sha256:7a326f978ecd560719b1969c3975eb0346408f86731111f5f1a92578777fbfcd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore previous semantic-review behavior and test expectations.

## Verify Steps

- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build
- bun run lint
- bunx vitest run packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts
- bun run test:fast
