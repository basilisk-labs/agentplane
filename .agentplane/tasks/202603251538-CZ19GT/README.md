---
id: "202603251538-CZ19GT"
title: "Split TaskBackend ports and separate summary/full task reads"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202603251535-H2EGEM"
tags:
  - "code"
  - "architecture"
  - "refactor"
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
doc_version: 3
doc_updated_at: "2026-03-25T15:38:26.792Z"
doc_updated_by: "CODER"
description: "Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface."
sections:
  Summary: |-
    Split TaskBackend ports and separate summary/full task reads
    
    Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.
  Scope: |-
    - In scope: Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.
    - Out of scope: unrelated refactors not required for "Split TaskBackend ports and separate summary/full task reads".
  Plan: |-
    1. Implement the change for "Split TaskBackend ports and separate summary/full task reads".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Split TaskBackend ports and separate summary/full task reads

Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.

## Scope

- In scope: Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.
- Out of scope: unrelated refactors not required for "Split TaskBackend ports and separate summary/full task reads".

## Plan

1. Implement the change for "Split TaskBackend ports and separate summary/full task reads".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
