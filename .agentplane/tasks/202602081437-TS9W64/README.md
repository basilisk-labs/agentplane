---
id: "202602081437-TS9W64"
title: "MONO2: Decompose backends/task-backend/shared.ts"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T14:39:04.688Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: refactor-only; Verify Steps defined; full suite required."
verification:
  state: "ok"
  updated_at: "2026-02-08T14:44:27.692Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor-only: split task-backend/shared.ts into backends/task-backend/shared/* and preserved existing exports."
commit:
  hash: "5a88092191d610067457692087d96ba9b385964d"
  message: "✨ TS9W64 backend: decompose task-backend shared helpers"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: split task-backend/shared.ts into smaller modules with stable exports and keep the full test suite green."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor-only: split task-backend/shared.ts into backends/task-backend/shared/*, kept shared.ts as stable re-export layer, and preserved behavior."
doc_version: 2
doc_updated_at: "2026-02-08T14:46:56.110Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split backends/task-backend/shared.ts into smaller modules (types, id/doc helpers, concurrency utils, errors) with stable exports and no behavior changes."
id_source: "generated"
---
## Summary

Refactor backends/task-backend/shared.ts into smaller modules with stable exports and no behavior changes.

## Scope

In scope:\n- packages/agentplane/src/backends/task-backend/shared.ts (split into multiple files)\n- New modules under packages/agentplane/src/backends/task-backend/shared/\n- Import rewires across the codebase (no public API changes)\n\nOut of scope:\n- Behavior changes\n- CLI changes\n- Task backend semantics changes

## Plan

Refactor: split packages/agentplane/src/backends/task-backend/shared.ts into smaller modules under backends/task-backend/shared/ and keep shared.ts as a stable re-export layer.\n\nSteps:\n1) Extract cohesive groups (types/constants, id/doc helpers, doc_updated_by resolution, misc utils, concurrency utils, backend errors).\n2) Keep exported names stable.\n3) Verify: bun run typecheck; bun run lint; bun run test:full.

## Risks

- Export surface regression: missing/renamed exports can break downstream imports.\n- Subtle runtime changes (e.g., Task ID regex, doc metadata defaults).\n- Import cycles if modules depend on each other without a clear direction.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:44:27.692Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor-only: split task-backend/shared.ts into backends/task-backend/shared/* and preserved existing exports.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:39:09.955Z, excerpt_hash=sha256:9aba55bd36b97ed4f21ba3a78d72711c2b7d9ec0d78428ff863bbd1ce4cb22a6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commit and re-run bun run test:full.\n- If export breakage occurs, restore a barrel re-export from shared.ts to preserve the old surface.

## Verify Steps

### Scope\n- Refactor-only: exports and behavior must remain stable.\n\n### Checks\n- bun run typecheck\n- bun run lint\n- bun run test:full\n\n### Evidence / Commands\n- Include the exact commands run in the verification note.\n\n### Pass criteria\n- typecheck/lint/test:full all pass.\n- No public export breaks (compilation covers this) and no snapshot regressions.
