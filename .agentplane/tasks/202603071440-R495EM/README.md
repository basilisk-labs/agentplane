---
id: "202603071440-R495EM"
title: "Separate non-happy-path flags from default flows"
result_summary: "Command and lifecycle docs now keep the happy path short while preserving manual finish flags in a dedicated fallback section."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-VDK1TB"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:20:55.111Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: keep rare flags out of the default docs flow."
verification:
  state: "ok"
  updated_at: "2026-03-07T16:25:06.635Z"
  updated_by: "REVIEWER"
  note: "Verified: default docs now separate normal direct finish flow from rare/manual flags and fallback paths."
commit:
  hash: "178288f1f3b2320c6de6a51fd56574ea684b3f89"
  message: "🩺 MJHV8H docs: clarify upgrade states and recovery hints"
comments:
  -
    author: "DOCS"
    body: "Start: move rare finish and upgrade flags out of the happy-path docs so the default agent flow stays short and obvious."
  -
    author: "DOCS"
    body: "Verified: default flow docs now isolate exceptional flags into separate non-happy-path sections."
events:
  -
    type: "status"
    at: "2026-03-07T16:20:55.466Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: move rare finish and upgrade flags out of the happy-path docs so the default agent flow stays short and obvious."
  -
    type: "verify"
    at: "2026-03-07T16:25:06.635Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: default docs now separate normal direct finish flow from rare/manual flags and fallback paths."
  -
    type: "status"
    at: "2026-03-07T16:25:14.676Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: default flow docs now isolate exceptional flags into separate non-happy-path sections."
doc_version: 3
doc_updated_at: "2026-03-07T16:25:14.676Z"
doc_updated_by: "DOCS"
description: "Move rare manual flags and exceptional recovery paths out of the main task flow into clearly separated sections."
id_source: "generated"
---
## Summary

Separate non-happy-path flags from default flows

Move rare manual flags and exceptional recovery paths out of the main task flow into clearly separated sections.

## Scope

- In scope: Move rare manual flags and exceptional recovery paths out of the main task flow into clearly separated sections..
- Out of scope: unrelated refactors not required for "Separate non-happy-path flags from default flows".

## Plan

1. Implement the change for "Separate non-happy-path flags from default flows".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T16:25:06.635Z — VERIFY — ok

By: REVIEWER

Note: Verified: default docs now separate normal direct finish flow from rare/manual flags and fallback paths.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:20:55.466Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
