---
id: "202603141501-8D60SX"
title: "Stabilize cleanup merged unknown-base timeout case"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:03:02.397Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for v0.3.7."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:16:14.351Z"
  updated_by: "CODER"
  note: "The unknown-base cleanup case was not functionally regressing; the cleanup-merged file runs in about 24s isolated and the failing case itself takes about 1.3s, so the failure under release:ci-base was another default 30000ms spill under aggregate load. Adding a dedicated 60s budget only to that case keeps cleanup semantics unchanged while leaving the isolated suite, tsc, and package builds green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the cleanup merged unknown-base timeout in isolation and under full release-gate load, determine whether the failure is budget-only or fixture-specific, and patch the smallest coherent fix without changing cleanup semantics."
events:
  -
    type: "status"
    at: "2026-03-14T15:14:39.834Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the cleanup merged unknown-base timeout in isolation and under full release-gate load, determine whether the failure is budget-only or fixture-specific, and patch the smallest coherent fix without changing cleanup semantics."
  -
    type: "verify"
    at: "2026-03-14T15:16:14.351Z"
    author: "CODER"
    state: "ok"
    note: "The unknown-base cleanup case was not functionally regressing; the cleanup-merged file runs in about 24s isolated and the failing case itself takes about 1.3s, so the failure under release:ci-base was another default 30000ms spill under aggregate load. Adding a dedicated 60s budget only to that case keeps cleanup semantics unchanged while leaving the isolated suite, tsc, and package builds green."
doc_version: 3
doc_updated_at: "2026-03-14T15:16:14.356Z"
doc_updated_by: "CODER"
description: "Stabilize the cleanup merged unknown-base rejection case under full release load without widening cleanup semantics."
sections:
  Summary: |-
    Stabilize cleanup merged unknown-base timeout case
    
    Stabilize the cleanup merged unknown-base rejection case under full release load without widening cleanup semantics.
  Scope: |-
    - In scope: Stabilize the cleanup merged unknown-base rejection case under full release load without widening cleanup semantics.
    - Out of scope: unrelated refactors not required for "Stabilize cleanup merged unknown-base timeout case".
  Plan: |-
    1. Reproduce the cleanup merged unknown-base timeout and confirm whether the stall is budget-only or due to extra git branch probing in the fixture.
    2. Patch only the unknown-base rejection coverage so cleanup semantics stay unchanged.
    3. Re-run the cleanup-merged suite and tsc, and note any remaining release-gate-only risk in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:16:14.351Z — VERIFY — ok
    
    By: CODER
    
    Note: The unknown-base cleanup case was not functionally regressing; the cleanup-merged file runs in about 24s isolated and the failing case itself takes about 1.3s, so the failure under release:ci-base was another default 30000ms spill under aggregate load. Adding a dedicated 60s budget only to that case keeps cleanup semantics unchanged while leaving the isolated suite, tsc, and package builds green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:14:39.836Z, excerpt_hash=sha256:6a53afd089fa997d757e7e499f36d25ad1c73572472faf6be640f5e541840a8e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize cleanup merged unknown-base timeout case

Stabilize the cleanup merged unknown-base rejection case under full release load without widening cleanup semantics.

## Scope

- In scope: Stabilize the cleanup merged unknown-base rejection case under full release load without widening cleanup semantics.
- Out of scope: unrelated refactors not required for "Stabilize cleanup merged unknown-base timeout case".

## Plan

1. Reproduce the cleanup merged unknown-base timeout and confirm whether the stall is budget-only or due to extra git branch probing in the fixture.
2. Patch only the unknown-base rejection coverage so cleanup semantics stay unchanged.
3. Re-run the cleanup-merged suite and tsc, and note any remaining release-gate-only risk in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:16:14.351Z — VERIFY — ok

By: CODER

Note: The unknown-base cleanup case was not functionally regressing; the cleanup-merged file runs in about 24s isolated and the failing case itself takes about 1.3s, so the failure under release:ci-base was another default 30000ms spill under aggregate load. Adding a dedicated 60s budget only to that case keeps cleanup semantics unchanged while leaving the isolated suite, tsc, and package builds green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:14:39.836Z, excerpt_hash=sha256:6a53afd089fa997d757e7e499f36d25ad1c73572472faf6be640f5e541840a8e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
