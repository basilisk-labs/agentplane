---
id: "202604191644-CEMP5A"
title: "Split tasks query mega-test by query family"
result_summary: "Replaced the 3750-line tasks query mega-test with three focused files, each below 2000 LoC, plus shared support."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:47:25.069Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:51:53.968Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-CEMP5A; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.tasks.query-*.test.ts; Result: pass; Evidence: largest split file is 1521 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts --reporter dot; Result: pass; Evidence: 3 files, 43 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
commit:
  hash: "722bece85644fdbf84141ec322e3456d3594380d"
  message: "🧪 CEMP5A test: split tasks query scenarios"
comments:
  -
    author: "CODER"
    body: "Start: Splitting the tasks query mega-test into focused query-family files."
  -
    author: "CODER"
    body: "Verified: tasks query mega-test was split into query-family files and focused checks passed."
events:
  -
    type: "status"
    at: "2026-04-20T16:47:25.328Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting the tasks query mega-test into focused query-family files."
  -
    type: "verify"
    at: "2026-04-20T16:51:53.968Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-CEMP5A; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.tasks.query-*.test.ts; Result: pass; Evidence: largest split file is 1521 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts --reporter dot; Result: pass; Evidence: 3 files, 43 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
  -
    type: "status"
    at: "2026-04-20T16:52:08.161Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: tasks query mega-test was split into query-family files and focused checks passed."
doc_version: 3
doc_updated_at: "2026-04-20T16:52:08.162Z"
doc_updated_by: "CODER"
description: "Epic L. Break run-cli.core.tasks.query.test.ts into focused files grouped by query behavior."
sections:
  Summary: |-
    Split tasks query mega-test by query family
    
    Epic L. Break run-cli.core.tasks.query.test.ts into focused files grouped by query behavior.
  Scope: |-
    - In scope: Epic L. Break run-cli.core.tasks.query.test.ts into focused files grouped by query behavior.
    - Out of scope: unrelated refactors not required for "Split tasks query mega-test by query family".
  Plan: "Split packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts by query behavior without changing assertions. Extract shared imports, runner render helpers, and constants into a non-test support module; move task-run preparation/inspection, task-run execution lifecycle, and task next/search/doc/list query families into focused files; delete the mega-test. Verification: agentplane task verify-show; wc -l confirms no resulting tasks query test file exceeds 2000 LoC; focused Vitest run for the new files passes; bun run typecheck; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:51:53.968Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-CEMP5A; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.tasks.query-*.test.ts; Result: pass; Evidence: largest split file is 1521 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts --reporter dot; Result: pass; Evidence: 3 files, 43 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:47:25.335Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split tasks query mega-test by query family

Epic L. Break run-cli.core.tasks.query.test.ts into focused files grouped by query behavior.

## Scope

- In scope: Epic L. Break run-cli.core.tasks.query.test.ts into focused files grouped by query behavior.
- Out of scope: unrelated refactors not required for "Split tasks query mega-test by query family".

## Plan

Split packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts by query behavior without changing assertions. Extract shared imports, runner render helpers, and constants into a non-test support module; move task-run preparation/inspection, task-run execution lifecycle, and task next/search/doc/list query families into focused files; delete the mega-test. Verification: agentplane task verify-show; wc -l confirms no resulting tasks query test file exceeds 2000 LoC; focused Vitest run for the new files passes; bun run typecheck; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:51:53.968Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-CEMP5A; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/cli/run-cli.core.tasks.query-*.test.ts; Result: pass; Evidence: largest split file is 1521 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts --reporter dot; Result: pass; Evidence: 3 files, 43 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:47:25.335Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
