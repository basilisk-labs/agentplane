---
id: "202604170645-W4TWSA"
title: "Move recipe assets to markdown-first loading"
result_summary: "Closed as duplicate of 202604170648-5NSJPA."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T06:46:00.522Z"
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
    body: |-
      Verified: 202604170645-W4TWSA is a bookkeeping duplicate of 202604170648-5NSJPA (Move recipe assets to markdown-first loading); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed markdown-first-assets task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:56.775Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170645-W4TWSA is a bookkeeping duplicate of 202604170648-5NSJPA (Move recipe assets to markdown-first loading); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed markdown-first-assets task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:56.775Z"
doc_updated_by: "ORCHESTRATOR"
description: "Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required."
sections:
  Summary: |-
    Move recipe assets to markdown-first loading
    
    Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required.
  Scope: |-
    - In scope: Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required.
    - Out of scope: unrelated refactors not required for "Move recipe assets to markdown-first loading".
  Plan: "1. Move recipe-owned agents and skills to markdown-first loading. 2. Keep structured manifests only where schema is required. 3. Verify validation and runtime loading preserve recipe asset content."
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

Move recipe assets to markdown-first loading

Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required.

## Scope

- In scope: Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required.
- Out of scope: unrelated refactors not required for "Move recipe assets to markdown-first loading".

## Plan

1. Move recipe-owned agents and skills to markdown-first loading. 2. Keep structured manifests only where schema is required. 3. Verify validation and runtime loading preserve recipe asset content.

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
