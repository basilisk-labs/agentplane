---
id: "202604230838-T201MB"
title: "Improve lifecycle error guidance"
result_summary: "Improved structured comment diagnostics and finish missing-commit guidance without weakening lifecycle semantics."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604230838-X40R09"
tags:
  - "cli"
  - "code"
  - "ux"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:45.836Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T09:30:00.133Z"
  updated_by: "CODER"
  note: "Lifecycle diagnostics improved and verified: full cli-core lifecycle glob passed (12 files, 63 tests), finish validation unit passed, and format check passed."
commit:
  hash: "e5be20a6f87c2c31768bf524a987e6845c2effdf"
  message: "🧭 T201MB ux: improve lifecycle diagnostics"
comments:
  -
    author: "CODER"
    body: "Start: lifecycle error guidance work is ready after quickstart guidance completion."
  -
    author: "CODER"
    body: "Verified: full lifecycle glob, finish validation unit, and format check passed."
events:
  -
    type: "status"
    at: "2026-04-23T09:25:41.811Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: lifecycle error guidance work is ready after quickstart guidance completion."
  -
    type: "verify"
    at: "2026-04-23T09:30:00.133Z"
    author: "CODER"
    state: "ok"
    note: "Lifecycle diagnostics improved and verified: full cli-core lifecycle glob passed (12 files, 63 tests), finish validation unit passed, and format check passed."
  -
    type: "status"
    at: "2026-04-23T09:30:00.631Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: full lifecycle glob, finish validation unit, and format check passed."
doc_version: 3
doc_updated_at: "2026-04-23T09:30:00.632Z"
doc_updated_by: "CODER"
description: "Make common lifecycle errors actionable for start-ready and finish: show prefix and length diagnostics for structured comments and provide concrete commit-selection guidance when finish requires --commit."
sections:
  Summary: |-
    Improve lifecycle error guidance
    
    Make common lifecycle errors actionable for start-ready and finish: show prefix and length diagnostics for structured comments and provide concrete commit-selection guidance when finish requires --commit.
  Scope: "In scope: error-message and test improvements for start-ready/finish lifecycle guidance. Out of scope: weakening lifecycle requirements or reintroducing implicit HEAD fallback."
  Plan: |-
    1. Inspect structured comment validation and finish missing-commit validation paths.
    2. Replace terse errors with diagnostics that include actual length, expected prefix, minimum length, and a concrete corrected command shape.
    3. Add finish diagnostics that show how to select a valid commit without restoring implicit HEAD fallback.
    4. Add or update lifecycle tests for these error messages.
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: lifecycle validation coverage passes.
    2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks*.test.ts` if shared task command helpers are touched. Expected: affected CLI task suites pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T09:30:00.133Z — VERIFY — ok
    
    By: CODER
    
    Note: Lifecycle diagnostics improved and verified: full cli-core lifecycle glob passed (12 files, 63 tests), finish validation unit passed, and format check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:25:41.865Z, excerpt_hash=sha256:b2c989118020e1a5acaeaefd9ad080f063be3c406da2fd32f76ca0b91b5a5515
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert diagnostics and test expectation updates. Runtime lifecycle semantics should remain unchanged."
  Findings: ""
id_source: "generated"
---
## Summary

Improve lifecycle error guidance

Make common lifecycle errors actionable for start-ready and finish: show prefix and length diagnostics for structured comments and provide concrete commit-selection guidance when finish requires --commit.

## Scope

In scope: error-message and test improvements for start-ready/finish lifecycle guidance. Out of scope: weakening lifecycle requirements or reintroducing implicit HEAD fallback.

## Plan

1. Inspect structured comment validation and finish missing-commit validation paths.
2. Replace terse errors with diagnostics that include actual length, expected prefix, minimum length, and a concrete corrected command shape.
3. Add finish diagnostics that show how to select a valid commit without restoring implicit HEAD fallback.
4. Add or update lifecycle tests for these error messages.

## Verify Steps

1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: lifecycle validation coverage passes.
2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks*.test.ts` if shared task command helpers are touched. Expected: affected CLI task suites pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T09:30:00.133Z — VERIFY — ok

By: CODER

Note: Lifecycle diagnostics improved and verified: full cli-core lifecycle glob passed (12 files, 63 tests), finish validation unit passed, and format check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:25:41.865Z, excerpt_hash=sha256:b2c989118020e1a5acaeaefd9ad080f063be3c406da2fd32f76ca0b91b5a5515

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert diagnostics and test expectation updates. Runtime lifecycle semantics should remain unchanged.

## Findings
