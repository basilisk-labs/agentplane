---
id: "202602061915-FXTNQ0"
title: "P0: Дедуп утилит в recipes.ts"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T20:09:20.440Z"
  updated_by: "USER"
  note: "Approved by user in chat on 2026-02-06; proceed without backward compatibility."
verification:
  state: "ok"
  updated_at: "2026-02-06T20:12:47.220Z"
  updated_by: "TESTER"
  note: "Verified locally on 2026-02-06: dedupe refactor in recipes.ts; bun run lint and bun run test:cli pass."
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
doc_version: 2
doc_updated_at: "2026-02-06T20:13:38.747Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Убрать локальные dedupeStrings/resolvePathFallback/isRecord из recipes.ts, вынести/использовать shared/core утилиты."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Remove local copies of dedupeStrings/resolvePathFallback/isRecord from recipes.ts.
2) Import canonical helpers from shared/core modules.
3) Ensure behavior and error messages remain consistent.
4) Run bun run lint + bun run test:cli.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T20:12:47.220Z — VERIFY — ok

By: TESTER

Note: Verified locally on 2026-02-06: dedupe refactor in recipes.ts; bun run lint and bun run test:cli pass.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
