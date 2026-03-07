---
id: "202603071440-ZFZKKS"
title: "Define canonical agent bootstrap path"
status: "DOING"
priority: "med"
owner: "PLANNER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:43:10.092Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: bootstrap-doc agent-first cleanup batch."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: define the canonical bootstrap path and encode it before updating the gateway or CLI help surfaces."
events:
  -
    type: "status"
    at: "2026-03-07T14:43:10.809Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the canonical bootstrap path and encode it before updating the gateway or CLI help surfaces."
doc_version: 2
doc_updated_at: "2026-03-07T14:43:10.809Z"
doc_updated_by: "CODER"
description: "Choose the single canonical startup flow for agents and document it so every other entrypoint can point to one path."
id_source: "generated"
---
## Summary

Define the single canonical bootstrap path agents should follow before any other docs surface.

## Scope

Select one startup path and encode it as the source for gateway and startup help surfaces.

## Plan

1. Define canonical bootstrap stages. 2. Encode the contract in shared source. 3. Update gateway references to point to the same path.

## Risks

If the bootstrap path is too abstract, quickstart and AGENTS may still drift or become harder to scan.

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

Revert the gateway/bootstrap source files and generated startup docs if the new path adds ambiguity or breaks checks.
