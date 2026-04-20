---
id: "202604191642-C6ASHS"
title: "Document Biome deferral in ADR"
status: "DOING"
priority: "med"
owner: "PLANNER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "adr"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T13:52:00.807Z"
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
    author: "PLANNER"
    body: "Start: Record the Biome deferral decision as a concise ADR and link it from the ADR index, keeping this task docs-only."
events:
  -
    type: "status"
    at: "2026-04-20T13:52:11.099Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record the Biome deferral decision as a concise ADR and link it from the ADR index, keeping this task docs-only."
doc_version: 3
doc_updated_at: "2026-04-20T13:52:11.110Z"
doc_updated_by: "PLANNER"
description: "Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now."
sections:
  Summary: |-
    Document Biome deferral in ADR
    
    Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.
  Scope: |-
    - In scope: Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.
    - Out of scope: unrelated refactors not required for "Document Biome deferral in ADR".
  Plan: "Add a focused ADR documenting the decision to defer Biome migration and keep ESLint/Prettier for now. Include the concrete reasons, risks, and revisit criteria, then link it from the ADR index. No tooling/runtime changes in this task."
  Verify Steps: |-
    1. Review the requested outcome for "Document Biome deferral in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document Biome deferral in ADR

Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.

## Scope

- In scope: Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.
- Out of scope: unrelated refactors not required for "Document Biome deferral in ADR".

## Plan

Add a focused ADR documenting the decision to defer Biome migration and keep ESLint/Prettier for now. Include the concrete reasons, risks, and revisit criteria, then link it from the ADR index. No tooling/runtime changes in this task.

## Verify Steps

1. Review the requested outcome for "Document Biome deferral in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
