---
id: "202603141501-BKNZT8"
title: "Stabilize doctor historical archive timeout cases"
result_summary: "Stabilized the historical doctor archive cases under full release load by giving only those three tests an explicit long timeout budget."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:03:02.848Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for v0.3.7."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:18:47.255Z"
  updated_by: "CODER"
  note: "The three historical doctor archive failures were not semantic regressions; targeted repro shows those cases take about 1.5s, 1.5s, and 2.6s, but the full doctor.command suite is large enough that they were inheriting the default 30000ms budget under release:ci-base. Adding a dedicated 60s budget only to the three history/archive-heavy cases keeps the archive diagnostics unchanged while leaving the full doctor suite, tsc, and package builds green."
commit:
  hash: "e738769a75ee92d494f1f30a3085a83c1a56155b"
  message: "⏱️ BKNZT8 test: stabilize doctor archive timeout cases"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the three historical doctor archive timeout cases under isolated and full release-gate load, separate expensive git-history fixture setup from actual doctor diagnostics runtime, and patch the smallest coherent fix without weakening historical archive assertions."
  -
    author: "CODER"
    body: "Verified: the three historical doctor archive failures were aggregate-load timeout spills, not diagnostic regressions. Adding a dedicated 60s budget only to those history/archive-heavy cases keeps the assertions intact and leaves the full doctor suite, tsc, and package builds green."
events:
  -
    type: "status"
    at: "2026-03-14T15:16:52.104Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the three historical doctor archive timeout cases under isolated and full release-gate load, separate expensive git-history fixture setup from actual doctor diagnostics runtime, and patch the smallest coherent fix without weakening historical archive assertions."
  -
    type: "verify"
    at: "2026-03-14T15:18:47.255Z"
    author: "CODER"
    state: "ok"
    note: "The three historical doctor archive failures were not semantic regressions; targeted repro shows those cases take about 1.5s, 1.5s, and 2.6s, but the full doctor.command suite is large enough that they were inheriting the default 30000ms budget under release:ci-base. Adding a dedicated 60s budget only to the three history/archive-heavy cases keeps the archive diagnostics unchanged while leaving the full doctor suite, tsc, and package builds green."
  -
    type: "status"
    at: "2026-03-14T15:19:20.545Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the three historical doctor archive failures were aggregate-load timeout spills, not diagnostic regressions. Adding a dedicated 60s budget only to those history/archive-heavy cases keeps the assertions intact and leaves the full doctor suite, tsc, and package builds green."
doc_version: 3
doc_updated_at: "2026-03-14T15:19:20.547Z"
doc_updated_by: "CODER"
description: "Stabilize the historical README and archive diagnostic cases in doctor.command.test under full release load without weakening diagnostic assertions."
sections:
  Summary: |-
    Stabilize doctor historical archive timeout cases
    
    Stabilize the historical README and archive diagnostic cases in doctor.command.test under full release load without weakening diagnostic assertions.
  Scope: |-
    - In scope: Stabilize the historical README and archive diagnostic cases in doctor.command.test under full release load without weakening diagnostic assertions.
    - Out of scope: unrelated refactors not required for "Stabilize doctor historical archive timeout cases".
  Plan: |-
    1. Reproduce the three historical doctor archive timeout cases and separate expensive git-history fixture setup from actual doctor diagnostics time.
    2. Patch the smallest coherent timeout/fixture issue without weakening historical README/archive diagnostic assertions.
    3. Re-run doctor.command.test and tsc, and record any remaining aggregate-load caveat in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:18:47.255Z — VERIFY — ok
    
    By: CODER
    
    Note: The three historical doctor archive failures were not semantic regressions; targeted repro shows those cases take about 1.5s, 1.5s, and 2.6s, but the full doctor.command suite is large enough that they were inheriting the default 30000ms budget under release:ci-base. Adding a dedicated 60s budget only to the three history/archive-heavy cases keeps the archive diagnostics unchanged while leaving the full doctor suite, tsc, and package builds green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:16:52.107Z, excerpt_hash=sha256:4b58e15e768b32e81fd5a2cbc81bd09ba0827228d8744cda86e6fe717f3fb767
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize doctor historical archive timeout cases

Stabilize the historical README and archive diagnostic cases in doctor.command.test under full release load without weakening diagnostic assertions.

## Scope

- In scope: Stabilize the historical README and archive diagnostic cases in doctor.command.test under full release load without weakening diagnostic assertions.
- Out of scope: unrelated refactors not required for "Stabilize doctor historical archive timeout cases".

## Plan

1. Reproduce the three historical doctor archive timeout cases and separate expensive git-history fixture setup from actual doctor diagnostics time.
2. Patch the smallest coherent timeout/fixture issue without weakening historical README/archive diagnostic assertions.
3. Re-run doctor.command.test and tsc, and record any remaining aggregate-load caveat in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:18:47.255Z — VERIFY — ok

By: CODER

Note: The three historical doctor archive failures were not semantic regressions; targeted repro shows those cases take about 1.5s, 1.5s, and 2.6s, but the full doctor.command suite is large enough that they were inheriting the default 30000ms budget under release:ci-base. Adding a dedicated 60s budget only to the three history/archive-heavy cases keeps the archive diagnostics unchanged while leaving the full doctor suite, tsc, and package builds green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:16:52.107Z, excerpt_hash=sha256:4b58e15e768b32e81fd5a2cbc81bd09ba0827228d8744cda86e6fe717f3fb767

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
