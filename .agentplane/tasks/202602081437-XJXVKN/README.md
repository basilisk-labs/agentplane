---
id: "202602081437-XJXVKN"
title: "MONO2: Decompose cli/run-cli/commands/init.ts"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081437-TS9W64"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T14:48:34.847Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: refactor-only; Verify Steps defined; full suite required."
verification:
  state: "ok"
  updated_at: "2026-02-08T14:53:59.124Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor-only: split init command core into cli/run-cli/commands/init/* modules; preserved outputs and init-related tests."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: split init command implementation into smaller modules under cli/run-cli/commands/init/ and keep behavior stable."
doc_version: 2
doc_updated_at: "2026-02-08T14:53:59.125Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split cli/run-cli/commands/init.ts into smaller internal modules (prompts, file writes, git bootstrap, hooks, recipes validation) while preserving behavior and keeping init-related tests green."
id_source: "generated"
---
## Summary

Refactor cli/run-cli/commands/init.ts into smaller modules while preserving init behavior and keeping init-related tests green.

## Scope


## Plan

Refactor: split packages/agentplane/src/cli/run-cli/commands/init.ts into smaller internal modules under cli/run-cli/commands/init/ while keeping init.ts as a thin orchestrator.\n\nSteps:\n1) Extract cohesive helpers (prompts, filesystem writes, git bootstrap, hooks install, recipes validation).\n2) Preserve CLI outputs and error messages used by tests.\n3) Verify: bun run typecheck; bun run lint; bun run test:full.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:53:59.124Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor-only: split init command core into cli/run-cli/commands/init/* modules; preserved outputs and init-related tests.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:48:41.663Z, excerpt_hash=sha256:db2ae1bda353a0960967a41b20906757eddd7194a2fa421d43a7f1562aaae77f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commit and re-run bun run test:full.\n- If a regression is isolated to a single extracted module, inline it back into init.ts and retry extraction with clearer boundaries.

## Verify Steps

### Scope\n- Refactor-only: init behavior and outputs must remain unchanged.\n\n### Checks\n- bun run typecheck\n- bun run lint\n- bun run test:full\n\n### Evidence / Commands\n- Include the exact commands run in the verification note.\n- Pay special attention to: packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts\n\n### Pass criteria\n- typecheck/lint/test:full all pass.\n- init/upgrade/backend tests remain green with no output regressions.
