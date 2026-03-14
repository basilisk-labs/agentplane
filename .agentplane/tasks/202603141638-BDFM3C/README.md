---
id: "202603141638-BDFM3C"
title: "Stabilize verify rework reset regression for v0.3.7"
result_summary: "Raised the timeout budget only for the verify-rework test that fails under full release gate load."
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
  updated_at: "2026-03-14T16:40:00.100Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:49:11.943Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a verify-rework timeout budget increase for the single remaining full-gate case."
commit:
  hash: "4b3d1f2457c0bd84a25d2d67786a0e0af07ca9b1"
  message: "⏱️ BDFM3C test: widen verify rework timeout"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the remaining workflow verify rework full-gate timeout, inspect timeout binding and fixture behavior in workflow.verify-hooks.test.ts, and make the smallest workflow-scoped fix that explains the failure before rerunning the suite."
  -
    author: "CODER"
    body: "Verified: the workflow verify-hooks suite and task verify contract both passed after restricting the fix to the single verify-rework timeout case; no broader verify lifecycle regression was observed in isolated or whole-file runs."
events:
  -
    type: "status"
    at: "2026-03-14T16:48:07.912Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the remaining workflow verify rework full-gate timeout, inspect timeout binding and fixture behavior in workflow.verify-hooks.test.ts, and make the smallest workflow-scoped fix that explains the failure before rerunning the suite."
  -
    type: "verify"
    at: "2026-03-14T16:49:11.943Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a verify-rework timeout budget increase for the single remaining full-gate case."
  -
    type: "status"
    at: "2026-03-14T16:49:33.268Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the workflow verify-hooks suite and task verify contract both passed after restricting the fix to the single verify-rework timeout case; no broader verify lifecycle regression was observed in isolated or whole-file runs."
doc_version: 3
doc_updated_at: "2026-03-14T16:49:33.271Z"
doc_updated_by: "CODER"
description: "Isolate and fix the remaining full-gate timeout in task verify rework resetting commit and status to DOING, then confirm the workflow verify-hooks suite stays green under the release prepublish load."
sections:
  Summary: |-
    Stabilize verify rework reset regression for v0.3.7
    
    Isolate and fix the remaining full-gate timeout in task verify rework resetting commit and status to DOING, then confirm the workflow verify-hooks suite stays green under the release prepublish load.
  Scope: |-
    - In scope: Isolate and fix the remaining full-gate timeout in task verify rework resetting commit and status to DOING, then confirm the workflow verify-hooks suite stays green under the release prepublish load.
    - Out of scope: unrelated refactors not required for "Stabilize verify rework reset regression for v0.3.7".
  Plan: "Reproduce the remaining workflow verify rework full-gate timeout, determine whether the issue is timeout budgeting, task-doc fixture churn, or a real verify-rework lifecycle regression, fix only the workflow verify-hooks surface needed to explain the case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts`. Expected: the workflow verify-hooks suite passes, including the rework path that resets commit and status to DOING.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
    3. Review the changed verify-rework behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:49:11.943Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a verify-rework timeout budget increase for the single remaining full-gate case.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:49:11.710Z, excerpt_hash=sha256:3b5f41cac2babc17a24095d15d8afa4a68443d6824b36e7ff9dd1df60555f6b3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fact: the isolated `task verify rework resets commit and sets status to DOING` case passed in 7.82s total wall time, with the target test at 4.41s.
    - Fact: the full `packages/agentplane/src/commands/workflow.verify-hooks.test.ts` suite passed in 8.14s after the change, with the target rework case at 1.99s.
    - Inference: the remaining verify-rework failure under `release:prepublish` was timeout-budget drift under aggregate gate load, not a semantic regression in the verify rework lifecycle.
    - Change: added `VERIFY_REWORK_FULL_GATE_TIMEOUT_MS = 60_000` and applied it only to the `task verify rework resets commit and sets status to DOING` test in `packages/agentplane/src/commands/workflow.verify-hooks.test.ts`.
    - Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
id_source: "generated"
---
## Summary

Stabilize verify rework reset regression for v0.3.7

Isolate and fix the remaining full-gate timeout in task verify rework resetting commit and status to DOING, then confirm the workflow verify-hooks suite stays green under the release prepublish load.

## Scope

- In scope: Isolate and fix the remaining full-gate timeout in task verify rework resetting commit and status to DOING, then confirm the workflow verify-hooks suite stays green under the release prepublish load.
- Out of scope: unrelated refactors not required for "Stabilize verify rework reset regression for v0.3.7".

## Plan

Reproduce the remaining workflow verify rework full-gate timeout, determine whether the issue is timeout budgeting, task-doc fixture churn, or a real verify-rework lifecycle regression, fix only the workflow verify-hooks surface needed to explain the case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts`. Expected: the workflow verify-hooks suite passes, including the rework path that resets commit and status to DOING.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
3. Review the changed verify-rework behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:49:11.943Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a verify-rework timeout budget increase for the single remaining full-gate case.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:49:11.710Z, excerpt_hash=sha256:3b5f41cac2babc17a24095d15d8afa4a68443d6824b36e7ff9dd1df60555f6b3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fact: the isolated `task verify rework resets commit and sets status to DOING` case passed in 7.82s total wall time, with the target test at 4.41s.
- Fact: the full `packages/agentplane/src/commands/workflow.verify-hooks.test.ts` suite passed in 8.14s after the change, with the target rework case at 1.99s.
- Inference: the remaining verify-rework failure under `release:prepublish` was timeout-budget drift under aggregate gate load, not a semantic regression in the verify rework lifecycle.
- Change: added `VERIFY_REWORK_FULL_GATE_TIMEOUT_MS = 60_000` and applied it only to the `task verify rework resets commit and sets status to DOING` test in `packages/agentplane/src/commands/workflow.verify-hooks.test.ts`.
- Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
