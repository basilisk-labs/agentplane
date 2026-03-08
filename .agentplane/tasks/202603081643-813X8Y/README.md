---
id: "202603081643-813X8Y"
title: "Fix runtime command release-version assertions"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fill the missing verify contract, then replace the remaining 0.3.2 hardcodes in runtime.command.test.ts with dynamic repository-derived values so the v0.3.3 release SHA can pass Core CI."
events:
  -
    type: "status"
    at: "2026-03-08T16:43:51.588Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fill the missing verify contract, then replace the remaining 0.3.2 hardcodes in runtime.command.test.ts with dynamic repository-derived values so the v0.3.3 release SHA can pass Core CI."
doc_version: 3
doc_updated_at: "2026-03-08T16:43:51.588Z"
doc_updated_by: "CODER"
description: "Make runtime.command tests version-agnostic so release commits do not fail Core CI after version bumps."
id_source: "generated"
---
## Summary

Fix runtime command release-version assertions

Make runtime.command tests version-agnostic so release commits do not fail Core CI after version bumps.

## Scope

- In scope: Make runtime.command tests version-agnostic so release commits do not fail Core CI after version bumps.
- Out of scope: unrelated refactors not required for "Fix runtime command release-version assertions".

## Plan

1. Inspect runtime.command tests and identify which expectations incorrectly depend on the previous released version instead of the current repository state.
2. Replace those assertions with dynamic repository-derived version values while preserving the intent of the runtime explain contract.
3. Run targeted runtime-command tests and the Core CI-equivalent fast gate for the touched path, then push the fix so the 0.3.3 release can be repaired in place.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts. Expected: all runtime.command tests pass with repository-derived version assertions.
2. Run bun run lint:core -- packages/agentplane/src/commands/runtime.command.test.ts. Expected: no lint errors in the touched runtime command test file.
3. Confirm the test no longer hardcodes the previous release version in repository-state assertions. Expected: release-sensitive expectations derive the current version dynamically from repo state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
