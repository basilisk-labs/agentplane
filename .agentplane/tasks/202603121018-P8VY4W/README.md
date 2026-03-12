---
id: "202603121018-P8VY4W"
title: "Remove stale lifecycle eslint directives"
result_summary: "remove stale lifecycle lint directives"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T10:19:23.269Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T10:21:23.100Z"
  updated_by: "CODER"
  note: "Lifecycle split files are now lint-clean without stale suppressions; scoped eslint and affected Vitest suites both pass."
commit:
  hash: "8bf70348c6167a76d4e1d81756d5573205d7471a"
  message: "🚧 P8VY4W test: remove stale lifecycle lint directives"
comments:
  -
    author: "CODER"
    body: "Start: remove the stale unused eslint-disable directives from the split lifecycle suites and confirm the files are lint-clean without changing test behavior."
  -
    author: "CODER"
    body: "Verified: the split lifecycle block-finish and verify suites no longer carry stale lint-suppression comments, and both scoped eslint and affected Vitest suites pass unchanged."
events:
  -
    type: "status"
    at: "2026-03-12T10:19:37.037Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the stale unused eslint-disable directives from the split lifecycle suites and confirm the files are lint-clean without changing test behavior."
  -
    type: "verify"
    at: "2026-03-12T10:21:23.100Z"
    author: "CODER"
    state: "ok"
    note: "Lifecycle split files are now lint-clean without stale suppressions; scoped eslint and affected Vitest suites both pass."
  -
    type: "status"
    at: "2026-03-12T10:21:34.551Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the split lifecycle block-finish and verify suites no longer carry stale lint-suppression comments, and both scoped eslint and affected Vitest suites pass unchanged."
doc_version: 3
doc_updated_at: "2026-03-12T10:21:34.551Z"
doc_updated_by: "CODER"
description: "Remove unused eslint-disable directives left behind after splitting lifecycle CLI test suites."
id_source: "generated"
---
## Summary

Remove unused eslint-disable directives from the split lifecycle test suites so the files are lint-clean without warnings.

## Scope

Touch only the split lifecycle test files and task-local README artifacts needed to remove stale lint suppression comments.

## Plan

Remove stale lifecycle eslint suppression comments without changing test behavior or runtime code.

## Verify Steps

1. Run `./node_modules/.bin/eslint packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts`.
2. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --hookTimeout 60000 --testTimeout 60000`.
3. Confirm no runtime files outside those test suites change.

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T10:21:23.100Z — VERIFY — ok

By: CODER

Note: Lifecycle split files are now lint-clean without stale suppressions; scoped eslint and affected Vitest suites both pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T10:19:37.037Z, excerpt_hash=sha256:9d721ec451d2f1dfb837445882f0945040a4d46d407010b2b9d3b3adfebce052

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the removed directives if lint warnings reappear because the files regain intentionally unused imports or type-only suppression needs.

## Findings

None yet.
