---
id: "202605251818-28Z5H1"
title: "Reduce redundancy in AgentPlane code"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T18:19:41.278Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved low-risk redundancy reductions in the dedicated branch_pr worktree, preserving public CLI behavior and using the declared architecture, clone, knip, focused test, and typecheck verification contract."
events:
  -
    type: "status"
    at: "2026-05-25T18:20:35.052Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved low-risk redundancy reductions in the dedicated branch_pr worktree, preserving public CLI behavior and using the declared architecture, clone, knip, focused test, and typecheck verification contract."
doc_version: 3
doc_updated_at: "2026-05-25T18:20:35.052Z"
doc_updated_by: "CODER"
description: "Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded."
sections:
  Summary: |-
    Reduce redundancy in AgentPlane code

    Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
  Scope: |-
    - In scope: Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
    - Out of scope: unrelated refactors not required for "Reduce redundancy in AgentPlane code".
  Plan: |-
    Atomic sequence:
    1. Establish baseline with existing architecture, clone, knip, and hotspot reports.
    2. Remove or replace prompt alias exports only if internal usage proves they are not public API critical.
    3. Centralize repeated task domain value sets used by task creation, backend record normalization, blueprint task input, and hooks task context.
    4. Extract common route/remote source-confidence construction and reuse it from task status/next-action and task brief.
    5. Reduce confirmed local clone clusters in release/check helpers only when the helper extraction stays narrow and covered by existing check scripts.
    6. Leave speculative public/barrel export deletions as classified findings unless current evidence proves safe removal.
    7. Run required checks and record verification evidence.
  Verify Steps: |-
    1. Run: bun run arch:deps. Expect no dependency violations or circular imports.
    2. Run: bun run knip:report. Expect no new high-confidence dead-code findings introduced by the refactor; classify remaining public/barrel findings if unchanged.
    3. Run: bun run clone:report. Expect clone percentage not to increase and target clone clusters reduced where touched.
    4. Run focused Vitest coverage for touched command/backend/route modules. Expect all targeted tests pass.
    5. Run: bun run typecheck. Expect TypeScript project references pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit on the task branch. If a shared helper introduces behavior drift, revert only that helper extraction and keep independent low-risk deletions that passed targeted tests."
  Findings: ""
id_source: "generated"
---
## Summary

Reduce redundancy in AgentPlane code

Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.

## Scope

- In scope: Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
- Out of scope: unrelated refactors not required for "Reduce redundancy in AgentPlane code".

## Plan

Atomic sequence:
1. Establish baseline with existing architecture, clone, knip, and hotspot reports.
2. Remove or replace prompt alias exports only if internal usage proves they are not public API critical.
3. Centralize repeated task domain value sets used by task creation, backend record normalization, blueprint task input, and hooks task context.
4. Extract common route/remote source-confidence construction and reuse it from task status/next-action and task brief.
5. Reduce confirmed local clone clusters in release/check helpers only when the helper extraction stays narrow and covered by existing check scripts.
6. Leave speculative public/barrel export deletions as classified findings unless current evidence proves safe removal.
7. Run required checks and record verification evidence.

## Verify Steps

1. Run: bun run arch:deps. Expect no dependency violations or circular imports.
2. Run: bun run knip:report. Expect no new high-confidence dead-code findings introduced by the refactor; classify remaining public/barrel findings if unchanged.
3. Run: bun run clone:report. Expect clone percentage not to increase and target clone clusters reduced where touched.
4. Run focused Vitest coverage for touched command/backend/route modules. Expect all targeted tests pass.
5. Run: bun run typecheck. Expect TypeScript project references pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit on the task branch. If a shared helper introduces behavior drift, revert only that helper extraction and keep independent low-risk deletions that passed targeted tests.

## Findings
