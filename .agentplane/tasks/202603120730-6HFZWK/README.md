---
id: "202603120730-6HFZWK"
title: "Patch stabilization: make commit and finish diagnostics state-truthful"
result_summary: "phase-truthful lifecycle diagnostics"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/commands/guard/index.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T07:31:39.369Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved in chat for the next patch stabilization task graph."
verification:
  state: "ok"
  updated_at: "2026-03-12T07:39:07.057Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/guard/index.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 94 tests passed, including regressions for commit hook failures and finish close-commit hook failures; Scope: guard commit diagnostics and finish close-commit phase reporting."
commit:
  hash: "0a22db9a710046d2267c9eba2fbe1c344ed228a6"
  message: "✨ 6HFZWK cli: distinguish commit failure phases"
comments:
  -
    author: "CODER"
    body: "Start: make commit and finish diagnostics report the real failing lifecycle phase."
  -
    author: "CODER"
    body: "Verified: commit and finish diagnostics now report the real failing phase for normal task-scoped commits and deterministic close commits."
events:
  -
    type: "status"
    at: "2026-03-12T07:31:41.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make commit and finish diagnostics report the real failing lifecycle phase."
  -
    type: "verify"
    at: "2026-03-12T07:39:07.057Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/guard/index.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 94 tests passed, including regressions for commit hook failures and finish close-commit hook failures; Scope: guard commit diagnostics and finish close-commit phase reporting."
  -
    type: "status"
    at: "2026-03-12T07:40:09.449Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: commit and finish diagnostics now report the real failing phase for normal task-scoped commits and deterministic close commits."
doc_version: 3
doc_updated_at: "2026-03-12T07:40:09.449Z"
doc_updated_by: "CODER"
description: "Fix lifecycle mutation diagnostics so commit and finish failures report the real failing phase instead of collapsing into misleading close-commit wording."
id_source: "generated"
---
## Summary

Make commit- and finish-path failures report the real failing phase so contributors can distinguish hook failures, implementation-commit failures, and deterministic close-commit failures.

## Scope

In scope: guard/commit and finish diagnostics, related lifecycle regression tests, and any shared helper changes required to preserve truthful failure classification. Out of scope: unrelated task-doc UX redesign or release flow changes.

## Plan

1. Reproduce the misleading failure path around agentplane commit/finish.\n2. Refactor failure classification so diagnostics reflect the actual git phase that failed.\n3. Extend lifecycle/guard tests to cover implementation-commit failure versus close-commit failure and verify the emitted state text.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/guard/index.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: guard and lifecycle suites pass, and regression coverage distinguishes failing phases truthfully.
2. Reproduce the previously misleading failure path in an isolated test fixture. Expected: output names the actual failing phase instead of a generic/generated close-commit diagnosis.

## Verification

Pending implementation. Verification evidence will be recorded after the declared checks run.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T07:39:07.057Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/guard/index.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 94 tests passed, including regressions for commit hook failures and finish close-commit hook failures; Scope: guard commit diagnostics and finish close-commit phase reporting.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T07:33:54.972Z, excerpt_hash=sha256:9193c2037ba65bf39379bed55ac1eafbf24a188e1164f2133f7c633e07175245

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the guard/finish diagnostic changes and the related regression tests so lifecycle failure output returns to the previous behavior if the new classification introduces false positives or breaks expected hook output handling.

## Findings
