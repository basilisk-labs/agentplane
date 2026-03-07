---
id: "202603071440-MJHV8H"
title: "Link doctor diagnostics to recovery guidance"
result_summary: "Doctor now links incomplete managed-policy diagnostics to the recovery documentation so mixed upgrade states are actionable."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071440-C201X2"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:20:54.998Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: doctor should point directly to the recovery path."
verification:
  state: "ok"
  updated_at: "2026-03-07T16:25:06.636Z"
  updated_by: "REVIEWER"
  note: "Verified: doctor now points incomplete managed-policy diagnostics to the legacy upgrade recovery doc."
commit:
  hash: "178288f1f3b2320c6de6a51fd56574ea684b3f89"
  message: "🩺 MJHV8H docs: clarify upgrade states and recovery hints"
comments:
  -
    author: "CODER"
    body: "Start: make doctor diagnostics point directly to the new recovery guidance and exact upgrade commands for incomplete managed policy trees."
  -
    author: "CODER"
    body: "Verified: doctor recovery messaging now points directly to the legacy-upgrade recovery guide."
events:
  -
    type: "status"
    at: "2026-03-07T16:20:55.350Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make doctor diagnostics point directly to the new recovery guidance and exact upgrade commands for incomplete managed policy trees."
  -
    type: "verify"
    at: "2026-03-07T16:25:06.636Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: doctor now points incomplete managed-policy diagnostics to the legacy upgrade recovery doc."
  -
    type: "status"
    at: "2026-03-07T16:25:14.676Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor recovery messaging now points directly to the legacy-upgrade recovery guide."
doc_version: 2
doc_updated_at: "2026-03-07T16:25:14.676Z"
doc_updated_by: "CODER"
description: "Make doctor diagnostics point directly to the recovery commands and docs for missing managed policy trees and related hybrid states."
id_source: "generated"
---
## Summary

Link doctor diagnostics to recovery guidance

Make doctor diagnostics point directly to the recovery commands and docs for missing managed policy trees and related hybrid states.

## Scope

- In scope: Make doctor diagnostics point directly to the recovery commands and docs for missing managed policy trees and related hybrid states..
- Out of scope: unrelated refactors not required for "Link doctor diagnostics to recovery guidance".

## Plan

1. Implement the change for "Link doctor diagnostics to recovery guidance".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T16:25:06.636Z — VERIFY — ok

By: REVIEWER

Note: Verified: doctor now points incomplete managed-policy diagnostics to the legacy upgrade recovery doc.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:20:55.350Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
