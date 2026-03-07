---
id: "202603071710-PQVS2V"
title: "Harden release preflight against burned versions"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071710-13WJ52"
tags:
  - "release"
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
doc_updated_at: "2026-03-07T17:10:12.544Z"
doc_updated_by: "CODER"
description: "Fail release preflight early on burned npm versions, tag/version drift, and missing publish preconditions before release apply mutates local state."
id_source: "generated"
---
## Summary

Harden release preflight against burned versions

Fail release preflight early on burned npm versions, tag/version drift, and missing publish preconditions before release apply mutates local state.

## Scope

- In scope: Fail release preflight early on burned npm versions, tag/version drift, and missing publish preconditions before release apply mutates local state..
- Out of scope: unrelated refactors not required for "Harden release preflight against burned versions".

## Plan

1. Implement the change for "Harden release preflight against burned versions".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
