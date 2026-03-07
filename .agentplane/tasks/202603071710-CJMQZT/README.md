---
id: "202603071710-CJMQZT"
title: "Guarantee full local framework install for development"
status: "TODO"
priority: "high"
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
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-07T17:10:10.766Z"
doc_updated_by: "CODER"
description: "Make the framework development install flow guarantee that both agentplane and @agentplaneorg/core come from the current checkout, not from published registry resolution."
id_source: "generated"
---
## Summary

Guarantee full local framework install for development

Make the framework development install flow guarantee that both agentplane and @agentplaneorg/core come from the current checkout, not from published registry resolution.

## Scope

- In scope: Make the framework development install flow guarantee that both agentplane and @agentplaneorg/core come from the current checkout, not from published registry resolution..
- Out of scope: unrelated refactors not required for "Guarantee full local framework install for development".

## Plan

1. Implement the change for "Guarantee full local framework install for development".
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
