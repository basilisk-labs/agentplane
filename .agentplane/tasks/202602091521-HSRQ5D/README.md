---
id: "202602091521-HSRQ5D"
title: "CLI/upgrade consistency hardening"
result_summary: "CLI/upgrade hardening batch completed"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "upgrade"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:39:01.131Z"
  updated_by: "TESTER"
  note: "Verified: all dependent hardening tasks are closed and bun run lint + bun run test:full pass at HEAD."
commit:
  hash: "aef83e8543028307d7cc54368c31f5368d41bb6a"
  message: "✅ NMPVK1 close: Exit code mapping contract enforced (202602091522-NMPVK1) [cli,quality,testing]"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: break down and execute P1 consistency + P2 performance improvements for exit codes, upgrade safety, init backend stubs, and local backend task listing."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run lint and bun run test:full pass at HEAD. Completed: exit code alignment + contract test; upgrade manifest strict allow/deny; gated tarball fallback w/ codeload; streamed downloads + tuned timeouts; JSON merge canonicalization + regression test; init backend stubs cleaned; upgrade state ignored by git; local backend listTasks parallelized."
events:
  -
    type: "status"
    at: "2026-02-09T15:24:48.770Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: break down and execute P1 consistency + P2 performance improvements for exit codes, upgrade safety, init backend stubs, and local backend task listing."
  -
    type: "verify"
    at: "2026-02-09T16:39:01.131Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: all dependent hardening tasks are closed and bun run lint + bun run test:full pass at HEAD."
  -
    type: "status"
    at: "2026-02-09T16:39:01.277Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass at HEAD. Completed: exit code alignment + contract test; upgrade manifest strict allow/deny; gated tarball fallback w/ codeload; streamed downloads + tuned timeouts; JSON merge canonicalization + regression test; init backend stubs cleaned; upgrade state ignored by git; local backend listTasks parallelized."
doc_version: 2
doc_updated_at: "2026-02-09T16:39:01.277Z"
doc_updated_by: "ORCHESTRATOR"
description: "Tracking task for fixing exit code consistency, tightening upgrade allowlist/manifest + tarball safety, removing legacy backend stub fields, and improving performance (upgrade I/O and task listing concurrency)."
id_source: "generated"
---
## Summary

Fix P1 inconsistencies and P2 performance issues in the CLI upgrade path and task backend: exit code mapping consistency, safer upgrade application boundaries, and reduced I/O overhead.

## Scope

In scope: packages/agentplane/src/cli/*, packages/agentplane/src/commands/upgrade.ts, packages/agentplane/src/cli/http.ts, packages/agentplane/src/backends/task-backend/local-backend.ts, init backend stub writer, framework manifest + tests. Out of scope: releases/tags/publishing.

## Plan

Decompose into dependent atomic tasks: (1) exit code factory + enforcement; (2) init backend stub cleanup; (3) upgrade baseline isolation; (4) upgrade manifest/allowlist tightening; (5) tarball fallback hardening/removal; (6) upgrade perf + timeouts; (7) JSON merge stabilization; (8) local backend listTasks concurrency; run lint+test:full per task.

## Risks

Main risk is behavior changes in upgrade (which files are updated). Mitigation: strict allowlist + explicit tests for deny paths; keep default upgrade source local (npm assets).

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:39:01.131Z — VERIFY — ok

By: TESTER

Note: Verified: all dependent hardening tasks are closed and bun run lint + bun run test:full pass at HEAD.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T15:24:48.770Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the per-task commits; upgrade behavior changes are covered by tests to avoid silent regressions.
