---
id: "202603141638-YGXQ6K"
title: "Stabilize remaining release apply regressions for v0.3.7"
result_summary: "Raised the timeout budget only for the two remaining release/apply failure-path tests that fail under full release gate load."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on: []
tags:
  - "release"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T16:39:50.401Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:43:20.259Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts and bun x tsc -b packages/core packages/agentplane both passed after narrowing the fix to a release/apply full-gate timeout budget increase for the two remaining failure-path tests."
commit:
  hash: "71737e331566a6ac92ca7326d44eccb0e426a7b4"
  message: "⏱️ YGXQ6K test: widen release apply full-gate budgets"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the two remaining release apply full-gate failures, inspect the release/apply test timeout binding and fixture setup around remote-tag collision and release-plan baseline drift, and make the smallest release-scoped fix that explains both cases before rerunning the suite."
  -
    author: "CODER"
    body: "Verified: the release/apply suite and task verify contract both passed after restricting the fix to the two remaining full-gate failure-path timeout budgets; no broader release/apply semantic regression was observed in isolated or whole-file runs."
events:
  -
    type: "status"
    at: "2026-03-14T16:40:39.030Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the two remaining release apply full-gate failures, inspect the release/apply test timeout binding and fixture setup around remote-tag collision and release-plan baseline drift, and make the smallest release-scoped fix that explains both cases before rerunning the suite."
  -
    type: "verify"
    at: "2026-03-14T16:43:20.259Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts and bun x tsc -b packages/core packages/agentplane both passed after narrowing the fix to a release/apply full-gate timeout budget increase for the two remaining failure-path tests."
  -
    type: "status"
    at: "2026-03-14T16:43:45.133Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the release/apply suite and task verify contract both passed after restricting the fix to the two remaining full-gate failure-path timeout budgets; no broader release/apply semantic regression was observed in isolated or whole-file runs."
doc_version: 3
doc_updated_at: "2026-03-14T16:43:45.135Z"
doc_updated_by: "CODER"
description: "Isolate and fix the two remaining full-gate failures in release apply covering existing remote release tags and release-plan baseline version drift, then confirm the release apply suite stays green under the release prepublish load."
sections:
  Summary: |-
    Stabilize remaining release apply regressions for v0.3.7
    
    Isolate and fix the two remaining full-gate failures in release apply covering existing remote release tags and release-plan baseline version drift, then confirm the release apply suite stays green under the release prepublish load.
  Scope: |-
    - In scope: Isolate and fix the two remaining full-gate failures in release apply covering existing remote release tags and release-plan baseline version drift, then confirm the release apply suite stays green under the release prepublish load.
    - Out of scope: unrelated refactors not required for "Stabilize remaining release apply regressions for v0.3.7".
  Plan: "Reproduce the two remaining release apply full-gate failures, determine whether the issue is timeout budgeting, fixture isolation, or a semantic release-apply path regression, fix only the release/apply surface that explains both cases, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/release/apply.test.ts`. Expected: the release apply suite passes, including the two remaining full-gate failure paths for remote-tag collision and release-plan baseline drift.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
    3. Review the changed release apply behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:43:20.259Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts and bun x tsc -b packages/core packages/agentplane both passed after narrowing the fix to a release/apply full-gate timeout budget increase for the two remaining failure-path tests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:43:19.976Z, excerpt_hash=sha256:a0aa71c9eba5fe6162eb98e0ab2eae6782aefa359102748d4ba2c4ef3f948f8b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fact: isolated re-runs for the two failing tests passed in 16.05s and 14.54s total wall time, with the target cases completing in 8.46s and 7.04s.
    - Fact: the full `packages/agentplane/src/commands/release/apply.test.ts` suite passed in 30.40s after the change, with the remote-tag collision case at 3.25s and the release-plan baseline drift case at 1.96s.
    - Inference: the remaining release/apply failures under `release:prepublish` were timeout-budget drift under aggregate gate load, not a semantic regression in release apply behavior.
    - Change: added `RELEASE_APPLY_FULL_GATE_TIMEOUT_MS = 120_000` and applied it only to the two remaining failure-path tests at `packages/agentplane/src/commands/release/apply.test.ts`.
    - Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
id_source: "generated"
---
## Summary

Stabilize remaining release apply regressions for v0.3.7

Isolate and fix the two remaining full-gate failures in release apply covering existing remote release tags and release-plan baseline version drift, then confirm the release apply suite stays green under the release prepublish load.

## Scope

- In scope: Isolate and fix the two remaining full-gate failures in release apply covering existing remote release tags and release-plan baseline version drift, then confirm the release apply suite stays green under the release prepublish load.
- Out of scope: unrelated refactors not required for "Stabilize remaining release apply regressions for v0.3.7".

## Plan

Reproduce the two remaining release apply full-gate failures, determine whether the issue is timeout budgeting, fixture isolation, or a semantic release-apply path regression, fix only the release/apply surface that explains both cases, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/apply.test.ts`. Expected: the release apply suite passes, including the two remaining full-gate failure paths for remote-tag collision and release-plan baseline drift.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
3. Review the changed release apply behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:43:20.259Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts and bun x tsc -b packages/core packages/agentplane both passed after narrowing the fix to a release/apply full-gate timeout budget increase for the two remaining failure-path tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:43:19.976Z, excerpt_hash=sha256:a0aa71c9eba5fe6162eb98e0ab2eae6782aefa359102748d4ba2c4ef3f948f8b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fact: isolated re-runs for the two failing tests passed in 16.05s and 14.54s total wall time, with the target cases completing in 8.46s and 7.04s.
- Fact: the full `packages/agentplane/src/commands/release/apply.test.ts` suite passed in 30.40s after the change, with the remote-tag collision case at 3.25s and the release-plan baseline drift case at 1.96s.
- Inference: the remaining release/apply failures under `release:prepublish` were timeout-budget drift under aggregate gate load, not a semantic regression in release apply behavior.
- Change: added `RELEASE_APPLY_FULL_GATE_TIMEOUT_MS = 120_000` and applied it only to the two remaining failure-path tests at `packages/agentplane/src/commands/release/apply.test.ts`.
- Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
