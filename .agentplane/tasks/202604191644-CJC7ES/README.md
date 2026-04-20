---
id: "202604191644-CJC7ES"
title: "Tune coverage thresholds during large test split rollout"
result_summary: "Added a coverage threshold guard for the restored 80/80/72/80 thresholds and wired it into CI and release validation."
status: "DONE"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "ops"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T17:11:13.713Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T17:13:01.128Z"
  updated_by: "CODER"
  note: "Command: bun run coverage:thresholds:check; Result: pass; Evidence: guard confirmed lines=80 functions=80 branches=72 statements=80. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
commit:
  hash: "6f2ff91290f2ca8e1227da90cdbf943ec01781a0"
  message: "🧪 CJC7ES test: guard coverage thresholds"
comments:
  -
    author: "CODER"
    body: "Start: enforce restored coverage thresholds after the large test split rollout."
  -
    author: "CODER"
    body: "Verified: restored coverage thresholds are guarded in CI and release checks."
events:
  -
    type: "status"
    at: "2026-04-20T17:11:14.013Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce restored coverage thresholds after the large test split rollout."
  -
    type: "verify"
    at: "2026-04-20T17:13:01.128Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run coverage:thresholds:check; Result: pass; Evidence: guard confirmed lines=80 functions=80 branches=72 statements=80. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
  -
    type: "status"
    at: "2026-04-20T17:13:04.225Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: restored coverage thresholds are guarded in CI and release checks."
doc_version: 3
doc_updated_at: "2026-04-20T17:13:04.226Z"
doc_updated_by: "CODER"
description: "Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes."
sections:
  Summary: |-
    Tune coverage thresholds during large test split rollout
    
    Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.
  Scope: |-
    - In scope: Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.
    - Out of scope: unrelated refactors not required for "Tune coverage thresholds during large test split rollout".
  Plan: "Keep coverage thresholds at the restored target values after the large test split rollout and add an explicit guard so future temporary lowering is visible. Implement a small script that reads vitest.config.ts and asserts lines=80, functions=80, branches=72, statements=80, then wire it into CI/release checks. Verification: run the new guard, bun run typecheck, bun run lint:core, and bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T17:13:01.128Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run coverage:thresholds:check; Result: pass; Evidence: guard confirmed lines=80 functions=80 branches=72 statements=80. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T17:11:14.021Z, excerpt_hash=sha256:20d5a9c29f35550b72f1ab0b217d612e9a91ae66e2427a19316e5fc5cd9943b0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Tune coverage thresholds during large test split rollout

Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.

## Scope

- In scope: Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.
- Out of scope: unrelated refactors not required for "Tune coverage thresholds during large test split rollout".

## Plan

Keep coverage thresholds at the restored target values after the large test split rollout and add an explicit guard so future temporary lowering is visible. Implement a small script that reads vitest.config.ts and asserts lines=80, functions=80, branches=72, statements=80, then wire it into CI/release checks. Verification: run the new guard, bun run typecheck, bun run lint:core, and bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T17:13:01.128Z — VERIFY — ok

By: CODER

Note: Command: bun run coverage:thresholds:check; Result: pass; Evidence: guard confirmed lines=80 functions=80 branches=72 statements=80. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T17:11:14.021Z, excerpt_hash=sha256:20d5a9c29f35550b72f1ab0b217d612e9a91ae66e2427a19316e5fc5cd9943b0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
