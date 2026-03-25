---
id: "202603251311-E7NRK6"
title: "Make Redmine live backend suite opt-in for fast CI"
result_summary: "integrate: squash task/202603251311-E7NRK6/redmine-live-optin"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tests"
  - "ci"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T13:11:56.660Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T13:16:54.019Z"
  updated_by: "CODER"
  note: "Checks passed: Redmine live test file now runs only gating assertions by default and skips live cases without the opt-in flag; bun run test:backend:redmine-live passes with the explicit opt-in path; bun run test:fast passes end-to-end with redmine/live.test.ts reporting 2 skipped live cases; eslint and agentplane build passed on the task diff."
commit:
  hash: "5e59d98de7cab1a861b56838ce334df9bdb3199c"
  message: "✨ E7NRK6 test: refresh local PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: making the Redmine live backend suite opt-in so local fast CI and pre-push stay deterministic even when local AGENTPLANE_REDMINE_* credentials exist, while preserving the dedicated live-suite entrypoint for explicit backend checks."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603251311-E7NRK6/pr."
events:
  -
    type: "status"
    at: "2026-03-25T13:12:14.601Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: making the Redmine live backend suite opt-in so local fast CI and pre-push stay deterministic even when local AGENTPLANE_REDMINE_* credentials exist, while preserving the dedicated live-suite entrypoint for explicit backend checks."
  -
    type: "verify"
    at: "2026-03-25T13:16:54.019Z"
    author: "CODER"
    state: "ok"
    note: "Checks passed: Redmine live test file now runs only gating assertions by default and skips live cases without the opt-in flag; bun run test:backend:redmine-live passes with the explicit opt-in path; bun run test:fast passes end-to-end with redmine/live.test.ts reporting 2 skipped live cases; eslint and agentplane build passed on the task diff."
  -
    type: "status"
    at: "2026-03-25T13:19:11.254Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603251311-E7NRK6/pr."
doc_version: 3
doc_updated_at: "2026-03-25T13:19:11.254Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent local fast CI and pre-push from silently running the live Redmine backend suite whenever AGENTPLANE_REDMINE_* env vars exist. Keep the dedicated live suite working via an explicit opt-in path."
sections:
  Summary: |-
    Make Redmine live backend suite opt-in for fast CI
    
    Prevent local fast CI and pre-push from silently running the live Redmine backend suite whenever AGENTPLANE_REDMINE_* env vars exist. Keep the dedicated live suite working via an explicit opt-in path.
  Scope: |-
    - In scope: Prevent local fast CI and pre-push from silently running the live Redmine backend suite whenever AGENTPLANE_REDMINE_* env vars exist. Keep the dedicated live suite working via an explicit opt-in path.
    - Out of scope: unrelated refactors not required for "Make Redmine live backend suite opt-in for fast CI".
  Plan: |-
    1. Gate the Redmine live backend suite behind an explicit opt-in so ordinary fast CI skips it even when local Redmine env vars exist.
    2. Keep the dedicated live-suite entrypoint working by exporting the opt-in flag from the backend live suite script.
    3. Run targeted Redmine/live tests, rerun the local fast CI path, then integrate and retry push.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/backends/task-backend/redmine/live.test.ts --testTimeout 60000 --hookTimeout 60000` without the opt-in flag. Expected: only the local gating assertions run and the live Redmine tests are skipped.
    2. Run `bun run test:backend:redmine-live`. Expected: the dedicated live-suite entrypoint still enables and executes the Redmine live tests through its explicit opt-in path.
    3. Run `bun run ci:local:fast` or the equivalent pre-push fast path. Expected: fast CI no longer blocks on implicit Redmine live-suite timeouts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T13:16:54.019Z — VERIFY — ok
    
    By: CODER
    
    Note: Checks passed: Redmine live test file now runs only gating assertions by default and skips live cases without the opt-in flag; bun run test:backend:redmine-live passes with the explicit opt-in path; bun run test:fast passes end-to-end with redmine/live.test.ts reporting 2 skipped live cases; eslint and agentplane build passed on the task diff.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T13:12:14.606Z, excerpt_hash=sha256:d0182efe3c55e08efb19603b2bed030edffba0c19e5d8735be3082ef059d2acd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make Redmine live backend suite opt-in for fast CI

Prevent local fast CI and pre-push from silently running the live Redmine backend suite whenever AGENTPLANE_REDMINE_* env vars exist. Keep the dedicated live suite working via an explicit opt-in path.

## Scope

- In scope: Prevent local fast CI and pre-push from silently running the live Redmine backend suite whenever AGENTPLANE_REDMINE_* env vars exist. Keep the dedicated live suite working via an explicit opt-in path.
- Out of scope: unrelated refactors not required for "Make Redmine live backend suite opt-in for fast CI".

## Plan

1. Gate the Redmine live backend suite behind an explicit opt-in so ordinary fast CI skips it even when local Redmine env vars exist.
2. Keep the dedicated live-suite entrypoint working by exporting the opt-in flag from the backend live suite script.
3. Run targeted Redmine/live tests, rerun the local fast CI path, then integrate and retry push.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/backends/task-backend/redmine/live.test.ts --testTimeout 60000 --hookTimeout 60000` without the opt-in flag. Expected: only the local gating assertions run and the live Redmine tests are skipped.
2. Run `bun run test:backend:redmine-live`. Expected: the dedicated live-suite entrypoint still enables and executes the Redmine live tests through its explicit opt-in path.
3. Run `bun run ci:local:fast` or the equivalent pre-push fast path. Expected: fast CI no longer blocks on implicit Redmine live-suite timeouts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T13:16:54.019Z — VERIFY — ok

By: CODER

Note: Checks passed: Redmine live test file now runs only gating assertions by default and skips live cases without the opt-in flag; bun run test:backend:redmine-live passes with the explicit opt-in path; bun run test:fast passes end-to-end with redmine/live.test.ts reporting 2 skipped live cases; eslint and agentplane build passed on the task diff.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T13:12:14.606Z, excerpt_hash=sha256:d0182efe3c55e08efb19603b2bed030edffba0c19e5d8735be3082ef059d2acd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
