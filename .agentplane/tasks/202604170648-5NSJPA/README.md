---
id: "202604170648-5NSJPA"
title: "Move recipe assets to markdown-first loading"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  updated_at: "2026-04-17T06:48:43.974Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T09:41:55.051Z"
  updated_by: "CODER"
  note: "Moved vendored recipe agents and skills to markdown-first loading and propagated text content through compiled recipe assets."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move vendored recipe agents and skills to markdown-first loading while preserving structured manifests only where schema is required."
events:
  -
    type: "status"
    at: "2026-04-17T09:28:18.820Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move vendored recipe agents and skills to markdown-first loading while preserving structured manifests only where schema is required."
  -
    type: "verify"
    at: "2026-04-17T09:41:55.051Z"
    author: "CODER"
    state: "ok"
    note: "Moved vendored recipe agents and skills to markdown-first loading and propagated text content through compiled recipe assets."
doc_version: 3
doc_updated_at: "2026-04-17T09:41:55.093Z"
doc_updated_by: "CODER"
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
    ### 2026-04-17T09:41:55.051Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved vendored recipe agents and skills to markdown-first loading and propagated text content through compiled recipe assets.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T09:28:18.832Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The weakest link was a split contract where manifest validation, compiled assets, and runner prompts still treated recipe agents and skills as JSON-shaped payloads.
      Impact: That legacy contract would strip or misread markdown prompt content and kept tests anchored to obsolete JSON fixtures.
      Resolution: Changed recipe agent and skill assets to markdown validation/loading, compiled their text into recipe-assets.json, and updated runner/tests to consume markdown-first content.
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
### 2026-04-17T09:41:55.051Z — VERIFY — ok

By: CODER

Note: Moved vendored recipe agents and skills to markdown-first loading and propagated text content through compiled recipe assets.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T09:28:18.832Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The weakest link was a split contract where manifest validation, compiled assets, and runner prompts still treated recipe agents and skills as JSON-shaped payloads.
  Impact: That legacy contract would strip or misread markdown prompt content and kept tests anchored to obsolete JSON fixtures.
  Resolution: Changed recipe agent and skill assets to markdown validation/loading, compiled their text into recipe-assets.json, and updated runner/tests to consume markdown-first content.
