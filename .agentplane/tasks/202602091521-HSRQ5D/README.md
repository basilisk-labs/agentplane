---
id: "202602091521-HSRQ5D"
title: "CLI/upgrade consistency hardening"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: break down and execute P1 consistency + P2 performance improvements for exit codes, upgrade safety, init backend stubs, and local backend task listing."
events:
  -
    type: "status"
    at: "2026-02-09T15:24:48.770Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: break down and execute P1 consistency + P2 performance improvements for exit codes, upgrade safety, init backend stubs, and local backend task listing."
doc_version: 2
doc_updated_at: "2026-02-09T15:24:48.770Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the per-task commits; upgrade behavior changes are covered by tests to avoid silent regressions.
