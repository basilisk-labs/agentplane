---
id: "202604191644-4HRNBB"
title: "Split Redmine backend mega-test and close TODO backlog"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Splitting the Redmine backend mega-test into focused resource and sync suites."
events:
  -
    type: "status"
    at: "2026-04-20T16:52:46.490Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting the Redmine backend mega-test into focused resource and sync suites."
doc_version: 3
doc_updated_at: "2026-04-20T16:52:46.497Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
