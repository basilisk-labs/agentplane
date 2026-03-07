---
id: "202603071440-C201X2"
title: "Add recovery doc for upgraded legacy projects"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-WCAH98"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:57:55.337Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add a shortest-path recovery doc for mixed upgrade state."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document the shortest recovery path for legacy projects that ended up with a new gateway and an incomplete managed policy tree after upgrade."
events:
  -
    type: "status"
    at: "2026-03-07T14:57:55.700Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the shortest recovery path for legacy projects that ended up with a new gateway and an incomplete managed policy tree after upgrade."
doc_version: 2
doc_updated_at: "2026-03-07T14:57:55.700Z"
doc_updated_by: "DOCS"
description: "Document the shortest recovery path for old projects that have mixed gateway and managed policy state after upgrade."
id_source: "generated"
---
## Summary

Add recovery doc for upgraded legacy projects

Document the shortest recovery path for old projects that have mixed gateway and managed policy state after upgrade.

## Scope

- In scope: Document the shortest recovery path for old projects that have mixed gateway and managed policy state after upgrade..
- Out of scope: unrelated refactors not required for "Add recovery doc for upgraded legacy projects".

## Plan

1. Implement the change for "Add recovery doc for upgraded legacy projects".
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
