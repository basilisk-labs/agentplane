---
id: "202603061410-XHB9JA"
title: "Sync policy mirrors and publish site"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T14:10:49.984Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: sync policy mirrors required by pre-push, then push main and verify website publication workflows."
events:
  -
    type: "status"
    at: "2026-03-06T14:10:55.806Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: sync policy mirrors required by pre-push, then push main and verify website publication workflows."
doc_version: 2
doc_updated_at: "2026-03-06T14:10:55.806Z"
doc_updated_by: "ORCHESTRATOR"
description: "Sync mirrored policy templates required by pre-push after batched task-doc policy update, then push main and verify Docs CI / Pages Deploy for the website publication."
id_source: "generated"
---
## Summary

Sync policy mirrors and publish site

Sync mirrored policy templates required by pre-push after batched task-doc policy update, then push main and verify Docs CI / Pages Deploy for the website publication.

## Scope

- In scope: Sync mirrored policy templates required by pre-push after batched task-doc policy update, then push main and verify Docs CI / Pages Deploy for the website publication..
- Out of scope: unrelated refactors not required for "Sync policy mirrors and publish site".

## Plan

1. Sync mirrored policy templates so pre-push policy/template enforcement passes after the batched task-doc policy wording change.\n2. Run the required repository checks for the touched policy/documentation surface.\n3. Push main and confirm Docs CI plus Pages Deploy succeeded for the current website state.

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
