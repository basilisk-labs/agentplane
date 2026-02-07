---
id: "202602051415-V40XE1"
title: "AP-070b: Backend docs and tests"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags:
  - "roadmap"
  - "backend"
  - "docs"
verify:
  - "bun run lint"
  - "bun run test:fast"
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
commit:
  hash: "f51118d0e7df71f0e94a0d1ee84149e17f7efa4b"
  message: "📝 V40XE1 update backend docs and init tests"
comments:
  -
    author: "TESTER"
    body: "Start: update backend docs and add init tests for backend selection."
  -
    author: "TESTER"
    body: "Verified: bun run lint/test:fast; docs and init tests updated for backend selection."
doc_version: 2
doc_updated_at: "2026-02-05T14:21:24.946Z"
doc_updated_by: "TESTER"
description: "Update docs to clarify backends are first-class (not recipes) and add init tests for backend selection."
id_source: "generated"
---
## Summary

Update backend docs and add init tests for backend selection.

## Scope

Update docs to state backends are first-class; add init tests for --backend flag and config paths.

## Risks

Docs/tests may drift if init defaults change; keep assertions minimal and resilient.

## Verify Steps

- Run bun run lint.\n- Run bun run test:fast.\n- Confirm init backend tests pass and docs updated.

## Verification

Verified on 2026-02-05: bun run lint, bun run test:fast; init tests and backend docs updated.

## Rollback Plan

Revert docs and tests for backend selection changes.

## Plan
