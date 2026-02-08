---
id: "202602081505-X2E2QD"
title: "Docs: TS ESM import specifiers (.js in TS source)"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:07:25.114Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T15:09:40.690Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: added docs/developer/typescript-esm-imports.mdx and linked from docs/docs.json; bun run typecheck PASS; bun run lint PASS."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: document why TS sources import with .js specifiers in Node ESM builds, and how editors should interpret it."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T15:09:40.692Z"
doc_updated_by: "ORCHESTRATOR"
description: "Document why TS sources import with .js specifiers in NodeNext/ESM builds, and how editors should interpret it; reduce confusion from IDE warnings."
id_source: "generated"
---
## Summary

(See title/description.)

## Scope

(See description.)

## Plan

(See task README Plan section.)

## Risks

- Regressions in CLI behavior or tests due to contract changes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T15:09:40.690Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: added docs/developer/typescript-esm-imports.mdx and linked from docs/docs.json; bun run typecheck PASS; bun run lint PASS.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:08:34.390Z, excerpt_hash=sha256:a456e06b5a873345e0038646f8f08bd48c77d8cce1e444c0787c845fe05cb86a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commit and re-run bun run test:full.

## Verify Steps

### Scope\n- See task description.\n\n### Checks\n- bun run typecheck\n- bun run lint\n- bun run test:full\n\n### Pass criteria\n- All checks pass.
