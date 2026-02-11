---
id: "202602111519-RPGFGN"
title: "T4: Enforce force_action approvals across all --force commands"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-CN2ZM2"
tags:
  - "cli"
  - "policy"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T15:45:18.472Z"
  updated_by: "CODER"
  note: "Verified: Added force-action approval checks and --yes flags across lifecycle/task/branch force paths, with conservative-profile regression tests for start/finish and existing set-status coverage. Ran core CLI tests, lint, and builds."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: applying force approval checks across all commands that expose --force."
events:
  -
    type: "status"
    at: "2026-02-11T15:40:34.836Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: applying force approval checks across all commands that expose --force."
  -
    type: "verify"
    at: "2026-02-11T15:45:18.472Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Added force-action approval checks and --yes flags across lifecycle/task/branch force paths, with conservative-profile regression tests for start/finish and existing set-status coverage. Ran core CLI tests, lint, and builds."
doc_version: 2
doc_updated_at: "2026-02-11T15:45:18.473Z"
doc_updated_by: "CODER"
description: "Apply unified force approval checks to every command supporting --force and standardize error/help text."
id_source: "generated"
---
## Summary

Apply unified force-action approval checks across commands exposing --force flags.

## Scope

In scope: lifecycle commands (start/block/finish), branch remove, and task scaffold/migrate/normalize force paths plus tests/help contract updates.

## Plan

1) Add --yes option to force-capable command specs. 2) Invoke ensureActionApproved(action=force_action) in each force path. 3) Add conservative profile force approval coverage tests. 4) Run lifecycle/CLI tests, lint, and builds.

## Risks

Risk: CLI UX changes for commands that previously accepted --force silently. Mitigation: explicit --yes options and regression tests for conservative profile.

## Verify Steps

Run: bun run test:cli:core -- packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts ; bun run lint ; bun run --filter=@agentplaneorg/core build ; bun run --filter=agentplane build

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T15:45:18.472Z — VERIFY — ok

By: CODER

Note: Verified: Added force-action approval checks and --yes flags across lifecycle/task/branch force paths, with conservative-profile regression tests for start/finish and existing set-status coverage. Ran core CLI tests, lint, and builds.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T15:40:34.836Z, excerpt_hash=sha256:7b6c058f8b98246e635611d15be29e1a1920c28feb21be6822a112b0c1f34b6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert this task commit and rerun CLI lifecycle tests to restore previous force behavior.

## Context

After T3, only task set-status used centralized approval gating. Remaining --force flags must enforce the same policy for conservative execution profile.

## Notes

### Decisions
Force approval is standardized via ensureActionApproved and command-local --yes flags.
