---
id: "202604062308-KMTE4J"
title: "Explain incident promotion no-op when findings are not promotable"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T23:08:44.375Z"
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
    author: "CODER"
    body: "Start: inspect the no-promotable incident path, distinguish plain Findings text from absent structured incident blocks, and add focused diagnostics plus tests for incidents collect and lifecycle output."
events:
  -
    type: "status"
    at: "2026-04-07T00:36:58.023Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the no-promotable incident path, distinguish plain Findings text from absent structured incident blocks, and add focused diagnostics plus tests for incidents collect and lifecycle output."
doc_version: 3
doc_updated_at: "2026-04-07T00:36:58.034Z"
doc_updated_by: "CODER"
description: "Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures."
sections:
  Summary: |-
    Explain incident promotion no-op when findings are not promotable
    
    Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures.
  Scope: |-
    - In scope: Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures.
    - Out of scope: unrelated refactors not required for "Explain incident promotion no-op when findings are not promotable".
  Plan: "1. Inspect current incident promotion logic and identify why lifecycle commands report unchanged without telling operators what is missing. 2. Add explicit diagnostics for the no-promotable path without mutating incidents.md outside finish/collect. 3. Lock the behavior with focused CLI/runtime tests and verify against realistic Findings blocks."
  Verify Steps: |-
    1. Run focused CLI/runtime tests for incident collection and lifecycle output. Expected: when Findings lack promotable external incident candidates, commands explain why the registry stayed unchanged instead of only printing a generic no-op.
    2. Run a targeted command-path reproduction with a task README that has plain Findings but no `Fixability: external` or `IncidentExternal`. Expected: the operator-facing output distinguishes missing promotable markers from a write failure.
    3. Run eslint on the touched incidents/lifecycle source and tests. Expected: lint exits 0.
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

Explain incident promotion no-op when findings are not promotable

Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures.

## Scope

- In scope: Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures.
- Out of scope: unrelated refactors not required for "Explain incident promotion no-op when findings are not promotable".

## Plan

1. Inspect current incident promotion logic and identify why lifecycle commands report unchanged without telling operators what is missing. 2. Add explicit diagnostics for the no-promotable path without mutating incidents.md outside finish/collect. 3. Lock the behavior with focused CLI/runtime tests and verify against realistic Findings blocks.

## Verify Steps

1. Run focused CLI/runtime tests for incident collection and lifecycle output. Expected: when Findings lack promotable external incident candidates, commands explain why the registry stayed unchanged instead of only printing a generic no-op.
2. Run a targeted command-path reproduction with a task README that has plain Findings but no `Fixability: external` or `IncidentExternal`. Expected: the operator-facing output distinguishes missing promotable markers from a write failure.
3. Run eslint on the touched incidents/lifecycle source and tests. Expected: lint exits 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
