---
id: "202603072032-1BC7VQ"
title: "Snapshot watched runtime files in build manifest"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202603072032-2M0V8V"
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
doc_updated_at: "2026-03-07T20:32:38.363Z"
doc_updated_by: "CODER"
description: "Record watched runtime file state during build so stale-dist freshness can be compared against built source instead of git dirtiness alone."
id_source: "generated"
---
## Summary

Snapshot watched runtime files in build manifest

Record watched runtime file state during build so stale-dist freshness can be compared against built source instead of git dirtiness alone.

## Scope

- In scope: Record watched runtime file state during build so stale-dist freshness can be compared against built source instead of git dirtiness alone..
- Out of scope: unrelated refactors not required for "Snapshot watched runtime files in build manifest".

## Plan

1. Implement the change for "Snapshot watched runtime files in build manifest".
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
