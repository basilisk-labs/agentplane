---
id: "202603071440-D5HPCE"
title: "Add agent onboarding smoke scenario"
result_summary: "The docs CI surface now includes a dedicated agent-onboarding scenario check so bootstrap, recovery, and close-flow guidance drift is caught automatically."
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603071440-MJHV8H"
  - "202603071440-VDK1TB"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:31:30.105Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add an onboarding smoke-check that covers bootstrap, recovery, and close-flow docs."
verification:
  state: "ok"
  updated_at: "2026-03-07T16:35:16.543Z"
  updated_by: "REVIEWER"
  note: "Verified: a dedicated onboarding smoke-check now validates bootstrap, ownership, recovery, lifecycle, and navigation surfaces together in CI."
commit:
  hash: "ddfa3f585f6fb9254874c18bfacc108f173ec05a"
  message: "🧭 2ZVTF7 docs: align agent-first onboarding IA"
comments:
  -
    author: "TESTER"
    body: "Start: add a scenario-based docs validation so bootstrap, recovery, and finish guidance drift is caught automatically in CI."
  -
    author: "TESTER"
    body: "Verified: added an onboarding smoke-check that guards bootstrap, recovery, lifecycle, and nav drift together."
events:
  -
    type: "status"
    at: "2026-03-07T16:31:30.228Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a scenario-based docs validation so bootstrap, recovery, and finish guidance drift is caught automatically in CI."
  -
    type: "verify"
    at: "2026-03-07T16:35:16.543Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: a dedicated onboarding smoke-check now validates bootstrap, ownership, recovery, lifecycle, and navigation surfaces together in CI."
  -
    type: "status"
    at: "2026-03-07T16:35:16.755Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added an onboarding smoke-check that guards bootstrap, recovery, lifecycle, and nav drift together."
doc_version: 2
doc_updated_at: "2026-03-07T16:35:16.755Z"
doc_updated_by: "TESTER"
description: "Create a scenario-based docs validation that exercises bootstrap, upgrade recovery, task execution, verification, and finish."
id_source: "generated"
---
## Summary

Add agent onboarding smoke scenario

Create a scenario-based docs validation that exercises bootstrap, upgrade recovery, task execution, verification, and finish.

## Scope

- In scope: Create a scenario-based docs validation that exercises bootstrap, upgrade recovery, task execution, verification, and finish..
- Out of scope: unrelated refactors not required for "Add agent onboarding smoke scenario".

## Plan

1. Add a scenario-based docs validation that exercises bootstrap, upgrade recovery, task work, verify, and finish. 2. Wire it into scripts/tests so agent onboarding drift is caught automatically. 3. Document the scenario briefly where bootstrap/recovery docs are referenced.

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
#### 2026-03-07T16:35:16.543Z — VERIFY — ok

By: REVIEWER

Note: Verified: a dedicated onboarding smoke-check now validates bootstrap, ownership, recovery, lifecycle, and navigation surfaces together in CI.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:31:30.228Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
