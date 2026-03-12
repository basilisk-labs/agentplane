---
id: "202603120929-M5AFRC"
title: "Split guard CLI integration suite"
result_summary: "split guard CLI suites"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T09:38:09.915Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T09:41:09.979Z"
  updated_by: "CODER"
  note: "Guard suite split verified via targeted Vitest run across guard subcommands and commit-wrapper coverage."
commit:
  hash: "a6ae809749e9bdfc4609198764464283dedb4c07"
  message: "🚧 M5AFRC task: split guard CLI suites"
comments:
  -
    author: "CODER"
    body: "Verified: guard CLI integration coverage now lives in separate guard-subcommand and commit-wrapper suites with the same allowlist, reconcile, and diagnostic assertions."
events:
  -
    type: "verify"
    at: "2026-03-12T09:41:09.979Z"
    author: "CODER"
    state: "ok"
    note: "Guard suite split verified via targeted Vitest run across guard subcommands and commit-wrapper coverage."
  -
    type: "status"
    at: "2026-03-12T09:41:21.974Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: guard CLI integration coverage now lives in separate guard-subcommand and commit-wrapper suites with the same allowlist, reconcile, and diagnostic assertions."
doc_version: 3
doc_updated_at: "2026-03-12T09:41:21.974Z"
doc_updated_by: "CODER"
description: "Decompose the oversized guard integration test bucket by contract area without changing guard behavior."
id_source: "generated"
---
## Summary

Split the oversized guard CLI integration bucket by contract area without changing guard or commit behavior.

## Scope

Touch only guard integration tests and minimal shared helpers needed to separate contract-focused suites.

## Plan

Split guard integration coverage into contract-focused suites with unchanged guard semantics and equivalent regression coverage.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts --hookTimeout 60000 --testTimeout 60000` or the exact replacement test set.
2. Confirm allowlist, reconcile, and guard-diagnostic assertions are preserved after the split.
3. Run any additional targeted suite required by shared helper extraction.

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T09:41:09.979Z — VERIFY — ok

By: CODER

Note: Guard suite split verified via targeted Vitest run across guard subcommands and commit-wrapper coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T09:30:00.144Z, excerpt_hash=sha256:f59879ae6b93fcf6056ca54fdfb9dc969a292fcd982e4b5231f49cbb4f209a15

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the test file split and helper changes if any guard contract becomes weaker or moves out of coverage.

## Findings

None yet.
