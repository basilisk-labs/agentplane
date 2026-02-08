---
id: "202602081437-D547F3"
title: "MONO2: Decompose remaining large production modules"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081437-TS9W64"
  - "202602081437-XJXVKN"
tags:
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T14:57:18.175Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: tracking only; verification is a full test suite pass."
verification:
  state: "ok"
  updated_at: "2026-02-08T14:57:32.729Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: dependent tasks TS9W64 and XJXVKN are DONE; bun run test:full PASS on main (vitest, 704 tests) after completing the final step."
commit:
  hash: "0a501ca9d0e0c38cb42b447dc6f19f300289a84f"
  message: "✅ XJXVKN close: record finish metadata"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: close MONO2 wave by confirming dependent tasks are DONE and full test suite passes on main."
  -
    author: "ORCHESTRATOR"
    body: "Verified: TS9W64 and XJXVKN are DONE; bun run test:full PASS on main (vitest, 704 tests). Epic closed without additional code changes."
doc_version: 2
doc_updated_at: "2026-02-08T14:57:40.064Z"
doc_updated_by: "ORCHESTRATOR"
description: "Decompose remaining large production modules (excluding tests) after the previous MONO wave, focusing on backends/task-backend/shared.ts and cli/run-cli/commands/init.ts."
id_source: "generated"
---
## Summary

Track the second MONO wave: decompose remaining large production modules (excluding tests) into smaller units with stable boundaries and no behavior regressions.

## Scope


## Plan

Close out MONO2 decomposition wave by completing TS9W64 and XJXVKN and verifying the full suite.\n\nSteps:\n1) Ensure TS9W64 and XJXVKN are DONE.\n2) Verify: bun run test:full on main.

## Risks

- Export surface regressions from shared.ts refactor.\n- Subtle init command output changes breaking tests.\n- Import cycles after extracting modules.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:57:32.729Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: dependent tasks TS9W64 and XJXVKN are DONE; bun run test:full PASS on main (vitest, 704 tests) after completing the final step.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:57:25.879Z, excerpt_hash=sha256:34902db45d3685353bb62f63afdcf4b8bb14f57361d065643af58522830e68c0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Rollback is per-task and per-commit.\n1. Revert the failing task's implementation commit.\n2. Re-run bun run test:full.\n3. If needed, revert the close metadata commit.

## Verify Steps

1. Ensure dependent tasks TS9W64 and XJXVKN are DONE.\nPass: agentplane task show reports status DONE for both.\n2. Run bun run test:full on main.\nPass: exit code 0.
