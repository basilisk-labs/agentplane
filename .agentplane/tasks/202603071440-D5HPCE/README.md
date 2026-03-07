---
id: "202603071440-D5HPCE"
title: "Add agent onboarding smoke scenario"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: add a scenario-based docs validation so bootstrap, recovery, and finish guidance drift is caught automatically in CI."
events:
  -
    type: "status"
    at: "2026-03-07T16:31:30.228Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a scenario-based docs validation so bootstrap, recovery, and finish guidance drift is caught automatically in CI."
doc_version: 2
doc_updated_at: "2026-03-07T16:31:30.228Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
