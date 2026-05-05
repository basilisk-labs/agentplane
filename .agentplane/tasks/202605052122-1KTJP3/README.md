---
id: "202605052122-1KTJP3"
title: "Add structured blueprint intent contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T21:22:51.938Z"
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
    body: "Start: Implement structured blueprint intent fields, resolver precedence, commit-scope synchronization checks, and documentation in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-05T21:23:02.379Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement structured blueprint intent fields, resolver precedence, commit-scope synchronization checks, and documentation in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-05-05T21:23:02.379Z"
doc_updated_by: "CODER"
description: "Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint."
sections:
  Summary: |-
    Add structured blueprint intent contract
    
    Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
  Scope: |-
    - In scope: Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
    - Out of scope: unrelated refactors not required for "Add structured blueprint intent contract".
  Plan: "1. Add structured blueprint intent fields to the blueprint resolver model and normalize/validate them. 2. Make resolver prefer explicit task intent fields before tags/title/description while preserving keyword fallback. 3. Synchronize commit scope vocabulary with blueprint/task-kind semantics through reusable helpers and tests, without making commit subjects the initial selector. 4. Update blueprint/recipe documentation to describe task intent metadata, commit trailers, and the efficient blueprint authoring path. 5. Run targeted blueprint tests, lint/type checks available in the repo, policy routing, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
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

Add structured blueprint intent contract

Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.

## Scope

- In scope: Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
- Out of scope: unrelated refactors not required for "Add structured blueprint intent contract".

## Plan

1. Add structured blueprint intent fields to the blueprint resolver model and normalize/validate them. 2. Make resolver prefer explicit task intent fields before tags/title/description while preserving keyword fallback. 3. Synchronize commit scope vocabulary with blueprint/task-kind semantics through reusable helpers and tests, without making commit subjects the initial selector. 4. Update blueprint/recipe documentation to describe task intent metadata, commit trailers, and the efficient blueprint authoring path. 5. Run targeted blueprint tests, lint/type checks available in the repo, policy routing, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
