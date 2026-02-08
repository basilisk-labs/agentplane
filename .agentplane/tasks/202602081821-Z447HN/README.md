---
id: "202602081821-Z447HN"
title: "CLI: test guard help registry equals run registry"
result_summary: "Add registry drift test"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602081821-BGE8F0"
tags:
  - "cli"
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:27:52.490Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: add set-equality test; keep getCtx stubbed and unused."
verification:
  state: "ok"
  updated_at: "2026-02-08T18:28:59.460Z"
  updated_by: "TESTER"
  note: "bun run test:cli:core; bun run typecheck"
commit:
  hash: "fc1ebe86ba9132adedab5dfd0383615540587071"
  message: "✨ Z447HN cli: assert help/run registries match"
comments:
  -
    author: "TESTER"
    body: "Start: Add a core test that help-fast registry and run registry command ids stay identical to prevent drift."
  -
    author: "TESTER"
    body: "Verified: Added a core contract test ensuring help-fast and run registries expose the same command id set; lint and cli core tests pass."
events:
  -
    type: "status"
    at: "2026-02-08T18:27:57.986Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a core test that help-fast registry and run registry command ids stay identical to prevent drift."
  -
    type: "verify"
    at: "2026-02-08T18:28:59.460Z"
    author: "TESTER"
    state: "ok"
    note: "bun run test:cli:core; bun run typecheck"
  -
    type: "status"
    at: "2026-02-08T18:33:01.851Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added a core contract test ensuring help-fast and run registries expose the same command id set; lint and cli core tests pass."
doc_version: 2
doc_updated_at: "2026-02-08T18:33:01.851Z"
doc_updated_by: "TESTER"
description: "Add test that buildHelpFastRegistry().list() and buildRegistry(...).list() expose the same set of command ids."
id_source: "generated"
---
## Summary

Add regression test to ensure help-fast registry and run registry expose the same set of command ids (prevents drift between the two manual lists).

## Scope

- packages/agentplane/src/cli/run-cli/registry.ts\n- packages/agentplane/src/cli/run-cli.core.help-contract.test.ts (or similar core test)\nOut of scope: refactor registry implementation (handled by later tasks).

## Plan

1) Write a test that compares sets of command ids from buildHelpFastRegistry().list() and buildRegistry(getCtx).list().\n2) Use a minimal getCtx stub that should never be called.\n3) Run bun run test:cli:core and bun run typecheck.

## Risks

- Risk: test becomes brittle if registry intentionally diverges. Mitigation: treat divergence as a deliberate refactor (update test alongside registry changes).

## Verification

(pending)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T18:28:59.460Z — VERIFY — ok

By: TESTER

Note: bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:27:57.986Z, excerpt_hash=sha256:299a0f28deb4a9272b75f22fc299213a9601e87a8c5464302ee461c793053cd9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this test if it blocks planned registry refactors; update once registry becomes catalog-driven.

## Verify Steps

- bun run test:cli:core\n- bun run typecheck\nPass criteria: test fails if a command is present in only one of the registries.

## Notes

### Approvals / Overrides\n- 2026-02-08: no overrides.
