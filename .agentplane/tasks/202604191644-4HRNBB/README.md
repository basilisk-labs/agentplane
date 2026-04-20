---
id: "202604191644-4HRNBB"
title: "Split Redmine backend mega-test and close TODO backlog"
result_summary: "Replaced the 2256-line Redmine backend test with five focused suites, each below 600 LoC; confirmed TODO matches are status literals, not inline backlog comments."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:52:42.343Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:56:37.910Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-4HRNBB; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/backends/task-backend.redmine.*.test.ts; Result: pass; Evidence: largest split file is 567 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts --reporter dot; Result: pass; Evidence: 5 files, 43 tests passed. Command: rg comment TODO/FIXME pattern; Result: pass; Evidence: no inline TODO/FIXME comments in split Redmine tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
commit:
  hash: "58f01fbdd94ee341efc6c969068f138397997e88"
  message: "🧪 4HRNBB test: split Redmine backend suites"
comments:
  -
    author: "CODER"
    body: "Start: Splitting the Redmine backend mega-test into focused resource and sync suites."
  -
    author: "CODER"
    body: "Verified: Redmine backend mega-test was split into focused suites and TODO-comment backlog is empty."
events:
  -
    type: "status"
    at: "2026-04-20T16:52:46.490Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting the Redmine backend mega-test into focused resource and sync suites."
  -
    type: "verify"
    at: "2026-04-20T16:56:37.910Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-4HRNBB; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/backends/task-backend.redmine.*.test.ts; Result: pass; Evidence: largest split file is 567 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts --reporter dot; Result: pass; Evidence: 5 files, 43 tests passed. Command: rg comment TODO/FIXME pattern; Result: pass; Evidence: no inline TODO/FIXME comments in split Redmine tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
  -
    type: "status"
    at: "2026-04-20T16:56:53.674Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Redmine backend mega-test was split into focused suites and TODO-comment backlog is empty."
doc_version: 3
doc_updated_at: "2026-04-20T16:56:53.674Z"
doc_updated_by: "CODER"
description: "Epic L. Break task-backend.redmine.test.ts into focused suites and close the outstanding inline TODO backlog."
sections:
  Summary: |-
    Split Redmine backend mega-test and close TODO backlog
    
    Epic L. Break task-backend.redmine.test.ts into focused suites and close the outstanding inline TODO backlog.
  Scope: |-
    - In scope: Epic L. Break task-backend.redmine.test.ts into focused suites and close the outstanding inline TODO backlog.
    - Out of scope: unrelated refactors not required for "Split Redmine backend mega-test and close TODO backlog".
  Plan: "Split packages/agentplane/src/backends/task-backend.redmine.test.ts into focused Redmine backend suites without changing assertions. Group by mapping/sync reads, write payloads and custom fields, remote helper/error behavior, canonical doc migration, and cache/export/unavailable paths. Audit inline TODO comments during the split; if none exist, record that the apparent TODO matches are status literals rather than backlog comments. Verification: agentplane task verify-show; wc -l confirms no resulting Redmine test file exceeds 2000 LoC; focused Vitest run for the new Redmine files passes; rg confirms no inline TODO/FIXME backlog remains in the split Redmine test files; bun run typecheck; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:56:37.910Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-4HRNBB; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/backends/task-backend.redmine.*.test.ts; Result: pass; Evidence: largest split file is 567 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts --reporter dot; Result: pass; Evidence: 5 files, 43 tests passed. Command: rg comment TODO/FIXME pattern; Result: pass; Evidence: no inline TODO/FIXME comments in split Redmine tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:52:46.497Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split Redmine backend mega-test and close TODO backlog

Epic L. Break task-backend.redmine.test.ts into focused suites and close the outstanding inline TODO backlog.

## Scope

- In scope: Epic L. Break task-backend.redmine.test.ts into focused suites and close the outstanding inline TODO backlog.
- Out of scope: unrelated refactors not required for "Split Redmine backend mega-test and close TODO backlog".

## Plan

Split packages/agentplane/src/backends/task-backend.redmine.test.ts into focused Redmine backend suites without changing assertions. Group by mapping/sync reads, write payloads and custom fields, remote helper/error behavior, canonical doc migration, and cache/export/unavailable paths. Audit inline TODO comments during the split; if none exist, record that the apparent TODO matches are status literals rather than backlog comments. Verification: agentplane task verify-show; wc -l confirms no resulting Redmine test file exceeds 2000 LoC; focused Vitest run for the new Redmine files passes; rg confirms no inline TODO/FIXME backlog remains in the split Redmine test files; bun run typecheck; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:56:37.910Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-4HRNBB; Result: pass; Evidence: verification contract reviewed. Command: wc -l packages/agentplane/src/backends/task-backend.redmine.*.test.ts; Result: pass; Evidence: largest split file is 567 LoC, below 2000. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts --reporter dot; Result: pass; Evidence: 5 files, 43 tests passed. Command: rg comment TODO/FIXME pattern; Result: pass; Evidence: no inline TODO/FIXME comments in split Redmine tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:52:46.497Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
