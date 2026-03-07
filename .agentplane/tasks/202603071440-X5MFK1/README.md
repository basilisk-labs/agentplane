---
id: "202603071440-X5MFK1"
title: "Align role help with bootstrap model"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071440-WCAH98"
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
doc_updated_at: "2026-03-07T14:43:07.312Z"
doc_updated_by: "CODER"
description: "Reduce role guidance drift by making role output reference the canonical bootstrap model instead of restating conflicting lifecycle instructions."
id_source: "generated"
---
## Summary

Align role help with the canonical bootstrap model instead of maintaining a parallel lifecycle narrative.

## Scope

Reduce duplicated lifecycle prose in role guidance and make role output point back to shared bootstrap guidance.

## Plan

1. Tighten role output to role-specific deltas. 2. Remove duplicate lifecycle narrative. 3. Keep direct and branch_pr specifics accurate.

## Risks

Over-trimming can make role help too sparse; under-trimming leaves drift intact.

## Verify Steps

1. Run role/command guide tests. 2. Inspect CODER and INTEGRATOR role output for drift against quickstart.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the prior role text if the new output stops being actionable or breaks CLI help expectations.
