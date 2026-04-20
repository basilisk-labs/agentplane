---
id: "202604191642-VFS4NJ"
title: "Document custom CLI stack decision in ADR"
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
  updated_at: "2026-04-20T12:27:43.038Z"
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
    body: "Start: Record the custom CLI stack decision as an ADR and link it from the ADR index, without changing CLI runtime code."
events:
  -
    type: "status"
    at: "2026-04-20T12:27:53.976Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record the custom CLI stack decision as an ADR and link it from the ADR index, without changing CLI runtime code."
doc_version: 3
doc_updated_at: "2026-04-20T12:27:53.987Z"
doc_updated_by: "PLANNER"
description: "Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif."
sections:
  Summary: |-
    Document custom CLI stack decision in ADR
    
    Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.
  Scope: |-
    - In scope: Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.
    - Out of scope: unrelated refactors not required for "Document custom CLI stack decision in ADR".
  Plan: "Document the custom CLI stack decision in docs/adr: explain why Agentplane keeps its command catalog and parser instead of adopting commander/citty/oclif, capture tradeoffs, and link the decision from the ADR index."
  Verify Steps: |-
    1. Review the requested outcome for "Document custom CLI stack decision in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Document custom CLI stack decision in ADR

Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.

## Scope

- In scope: Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.
- Out of scope: unrelated refactors not required for "Document custom CLI stack decision in ADR".

## Plan

Document the custom CLI stack decision in docs/adr: explain why Agentplane keeps its command catalog and parser instead of adopting commander/citty/oclif, capture tradeoffs, and link the decision from the ADR index.

## Verify Steps

1. Review the requested outcome for "Document custom CLI stack decision in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
