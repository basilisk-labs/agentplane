---
id: "202602061915-FXTNQ0"
title: "P0: Deduplicate utilities in recipes.ts"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
depends_on: []
tags:
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T20:09:20.440Z"
  updated_by: "USER"
  note: "Approved by user in chat on 2026-02-06T20:09:20.440Z; proceed without backward compatibility."
verification:
  state: "ok"
  updated_at: "2026-02-06T20:12:47.220Z"
  updated_by: "TESTER"
  note: "Verified locally on 2026-02-06T20:12:47.220Z: dedupe refactor in recipes.ts; bun run lint and bun run test:cli pass."
  attempts: 0
commit:
  hash: "7a2d76c247220cbb6bc94d3e00330d8a8ba69f68"
  message: "✨ FXTNQ0 refactor"
comments:
  -
    author: "CODER"
    body: "Start: Deduplicate recipes.ts helper functions by importing shared/core utilities; keep behavior stable and cover with lint+CLI tests."
  -
    author: "CODER"
    body: "Verified: Removed duplicate helpers from recipes.ts by reusing shared utility modules (isRecord/dedupeStrings/resolvePathFallback) and kept behavior stable; ran bun run lint and bun run test:cli."
events: []
doc_version: 3
doc_updated_at: "2026-02-06T20:13:38.747Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Remove local dedupeStrings/resolvePathFallback/isRecord helpers from recipes.ts and move to or reuse shared/core utilities."
sections:
  Summary: |-
    P0: Deduplicate utilities in recipes.ts

    (Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Remove local dedupeStrings/resolvePathFallback/isRecord helpers from recipes.ts and move to or reuse shared/core utilities.
  Scope: |-
    - In scope: (Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Remove local dedupeStrings/resolvePathFallback/isRecord helpers from recipes.ts and move to or reuse shared/core utilities.
    - Out of scope: unrelated changes outside this task.
  Plan: |-
    1) Remove local copies of dedupeStrings/resolvePathFallback/isRecord from recipes.ts.
    2) Import canonical helpers from shared/core modules.
    3) Ensure behavior and error messages remain consistent.
    4) Run bun run lint + bun run test:cli.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-02-06T20:12:47.220Z — VERIFY — ok

    By: TESTER

    Note: Verified locally on 2026-02-06: dedupe refactor in recipes.ts; bun run lint and bun run test:cli pass.

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

P0: Deduplicate utilities in recipes.ts

(Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Remove local dedupeStrings/resolvePathFallback/isRecord helpers from recipes.ts and move to or reuse shared/core utilities.

## Scope

- In scope: (Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Remove local dedupeStrings/resolvePathFallback/isRecord helpers from recipes.ts and move to or reuse shared/core utilities.
- Out of scope: unrelated changes outside this task.

## Plan

1) Remove local copies of dedupeStrings/resolvePathFallback/isRecord from recipes.ts.
2) Import canonical helpers from shared/core modules.
3) Ensure behavior and error messages remain consistent.
4) Run bun run lint + bun run test:cli.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T20:12:47.220Z — VERIFY — ok

By: TESTER

Note: Verified locally on 2026-02-06: dedupe refactor in recipes.ts; bun run lint and bun run test:cli pass.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Risks
