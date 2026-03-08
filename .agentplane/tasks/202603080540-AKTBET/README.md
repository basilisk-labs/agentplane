---
id: "202603080540-AKTBET"
title: "P1: optimize doctor archive scan and heavy-path performance"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
doc_version: 2
doc_updated_at: "2026-03-08T05:40:02.846Z"
doc_updated_by: "CODER"
description: "Reduce doctor latency on large archives via clearer archive boundaries, optional deeper modes, and cheap-path shortcuts after module extraction."
id_source: "generated"
---
## Summary

P1: optimize doctor archive scan and heavy-path performance

Reduce doctor latency on large archives via clearer archive boundaries, optional deeper modes, and cheap-path shortcuts after module extraction.

## Scope

- In scope: Reduce doctor latency on large archives via clearer archive boundaries, optional deeper modes, and cheap-path shortcuts after module extraction..
- Out of scope: unrelated refactors not required for "P1: optimize doctor archive scan and heavy-path performance".

## Plan

1. Implement the change for "P1: optimize doctor archive scan and heavy-path performance".
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
