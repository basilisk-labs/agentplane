---
id: "202603120730-ZTT2RR"
title: "Patch stabilization: add phase-visible lifecycle progress output"
result_summary: "phase-visible lifecycle progress output"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603120730-6HFZWK"
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T07:31:39.733Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved in chat for the next patch stabilization task graph."
verification:
  state: "ok"
  updated_at: "2026-03-12T07:43:46.372Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 72 tests passed, including start commit-from-comment progress, finish verification-comment progress, finish status-commit progress, and close-commit failure visibility; Scope: lifecycle phase-boundary stdout for start and finish paths."
commit:
  hash: "c3a1fb7f404250e518a9dfdbe38971ed73948a33"
  message: "✨ ZTT2RR cli: surface lifecycle commit phases"
comments:
  -
    author: "CODER"
    body: "Start: make long-running lifecycle commands expose explicit phase boundaries from validation through hooks and commit/close."
  -
    author: "CODER"
    body: "Verified: start and finish now emit explicit follow-up phase lines before commit-from-comment, status-commit, and deterministic close-commit work begins."
events:
  -
    type: "status"
    at: "2026-03-12T07:40:29.863Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make long-running lifecycle commands expose explicit phase boundaries from validation through hooks and commit/close."
  -
    type: "verify"
    at: "2026-03-12T07:43:46.372Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 72 tests passed, including start commit-from-comment progress, finish verification-comment progress, finish status-commit progress, and close-commit failure visibility; Scope: lifecycle phase-boundary stdout for start and finish paths."
  -
    type: "status"
    at: "2026-03-12T07:43:51.648Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: start and finish now emit explicit follow-up phase lines before commit-from-comment, status-commit, and deterministic close-commit work begins."
doc_version: 3
doc_updated_at: "2026-03-12T07:43:51.648Z"
doc_updated_by: "CODER"
description: "Expose explicit progress boundaries for long-running lifecycle mutations so users can see when commands move from validation to hooks, commit, and close phases."
id_source: "generated"
---
## Summary

Add explicit phase-visible progress output to long-running lifecycle mutations so users can see state boundaries before and after validation, hooks, implementation commit, and close handling.

## Scope

In scope: progress messaging for lifecycle mutation commands that still have meaningful follow-up phases after the main state transition. Out of scope: unrelated command copy edits or a full redesign of non-lifecycle command rendering.

## Plan

1. Audit current lifecycle mutation commands for hidden multi-phase behavior.\n2. Add explicit phase-visible progress lines at the meaningful state boundaries.\n3. Update lifecycle tests to assert the new progress output without weakening existing command contracts.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: lifecycle tests pass and assert the new progress boundaries.
2. Review one representative successful path and one failure path in test output. Expected: users can tell which phase completed and which phase is still running or failed.

## Verification

Pending implementation. Verification evidence will be recorded after the declared checks run.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T07:43:46.372Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 72 tests passed, including start commit-from-comment progress, finish verification-comment progress, finish status-commit progress, and close-commit failure visibility; Scope: lifecycle phase-boundary stdout for start and finish paths.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T07:40:29.863Z, excerpt_hash=sha256:f0732b2bdb4107f1e0a2d8c6217d327b1ace4eb3f5f67354f3e286f64f3c700c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the progress-line changes and lifecycle assertions so mutation commands return to the previous quieter output if the new wording causes snapshot churn or obscures existing diagnostics.

## Findings
