---
id: "202603081643-813X8Y"
title: "Fix runtime command release-version assertions"
result_summary: "Replaced release-sensitive 0.3.2 literals in runtime.command.test.ts with dynamic repository-derived values so the 0.3.3 release commit can pass Core CI after version bump."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-08T16:44:56.083Z"
  updated_by: "CODER"
  note: "runtime.command.test.ts now derives release-sensitive version expectations from repository state; targeted vitest and lint both pass on the repaired assertions."
commit:
  hash: "2c3d777a2f4530a1dd312ac4d09467c16dfa6ba2"
  message: "🧪 813X8Y tests: derive runtime expectations from repo state"
comments:
  -
    author: "CODER"
    body: "Start: fill the missing verify contract, then replace the remaining 0.3.2 hardcodes in runtime.command.test.ts with dynamic repository-derived values so the v0.3.3 release SHA can pass Core CI."
  -
    author: "CODER"
    body: "Verified: runtime.command.test.ts no longer hardcodes the previous release version, the repaired assertions read repository state dynamically, and the targeted runtime-command gate is green again."
events:
  -
    type: "status"
    at: "2026-03-08T16:43:51.588Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fill the missing verify contract, then replace the remaining 0.3.2 hardcodes in runtime.command.test.ts with dynamic repository-derived values so the v0.3.3 release SHA can pass Core CI."
  -
    type: "verify"
    at: "2026-03-08T16:44:56.083Z"
    author: "CODER"
    state: "ok"
    note: "runtime.command.test.ts now derives release-sensitive version expectations from repository state; targeted vitest and lint both pass on the repaired assertions."
  -
    type: "status"
    at: "2026-03-08T16:45:09.174Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: runtime.command.test.ts no longer hardcodes the previous release version, the repaired assertions read repository state dynamically, and the targeted runtime-command gate is green again."
doc_version: 3
doc_updated_at: "2026-03-08T16:45:09.174Z"
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
#### 2026-03-08T16:44:56.083Z — VERIFY — ok

By: CODER

Note: runtime.command.test.ts now derives release-sensitive version expectations from repository state; targeted vitest and lint both pass on the repaired assertions.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T16:43:51.588Z, excerpt_hash=sha256:55f6e0d3356dfb0be58859cb44ced3b8a384bfaabd37a49c33d9d7c6af99ce98

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
