---
id: "202603080848-TWS6R9"
title: "Remove ignored d.ts lint noise in local hooks"
status: "TODO"
priority: "low"
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
doc_updated_at: "2026-03-08T08:48:34.296Z"
doc_updated_by: "CODER"
description: "Stop local hook and targeted lint paths from printing ignored .d.ts warnings while preserving lint coverage for relevant runtime files."
id_source: "generated"
---
## Summary

Remove ignored d.ts lint noise in local hooks

Stop local hook and targeted lint paths from printing ignored .d.ts warnings while preserving lint coverage for relevant runtime files.

## Scope

- In scope: Stop local hook and targeted lint paths from printing ignored .d.ts warnings while preserving lint coverage for relevant runtime files..
- Out of scope: unrelated refactors not required for "Remove ignored d.ts lint noise in local hooks".

## Plan

1. Implement the change for "Remove ignored d.ts lint noise in local hooks".
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
