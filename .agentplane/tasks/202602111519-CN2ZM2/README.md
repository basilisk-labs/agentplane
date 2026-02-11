---
id: "202602111519-CN2ZM2"
title: "T3: Replace task set-status force block with approvals"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-6CT56C"
  - "202602111519-XP57PR"
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
  updated_at: "2026-02-11T15:34:30.698Z"
  updated_by: "CODER"
  note: "Verified: task set-status now routes --force through unified approval checks, adds --yes for explicit approval, and removes conservative env-var bypass logic. Ran core task CLI tests, lint, and package builds."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replacing local force blocking logic with unified approval checks in task set-status."
events:
  -
    type: "status"
    at: "2026-02-11T15:31:48.013Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replacing local force blocking logic with unified approval checks in task set-status."
  -
    type: "verify"
    at: "2026-02-11T15:34:30.698Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task set-status now routes --force through unified approval checks, adds --yes for explicit approval, and removes conservative env-var bypass logic. Ran core task CLI tests, lint, and package builds."
doc_version: 2
doc_updated_at: "2026-02-11T15:34:30.699Z"
doc_updated_by: "CODER"
description: "Remove conservative force forbid path and enforce approval requirement for --force via unified helper."
id_source: "generated"
---
## Summary

Replace the conservative hard block for task set-status --force with unified approval enforcement.

## Scope

In scope: packages/agentplane/src/commands/task/set-status.ts and related unit tests. Out of scope: other force-capable commands (handled in T4).

## Plan

1) Remove conservative force env gate from set-status implementation. 2) Call ensureActionApproved(action=force_action) when --force is used. 3) Keep existing transition/dependency checks unchanged. 4) Update tests to cover approval behavior.

## Risks

Risk: behavior change for conservative profile users. Mitigation: preserve explicit error path and test denial/approval semantics via helper coverage.

## Verify Steps

Run: bun run test:agentplane -- packages/agentplane/src/commands/task/set-status*.test.ts packages/agentplane/src/commands/shared/approval-requirements.test.ts ; bun run lint ; bun run --filter=@agentplaneorg/core build ; bun run --filter=agentplane build

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T15:34:30.698Z — VERIFY — ok

By: CODER

Note: Verified: task set-status now routes --force through unified approval checks, adds --yes for explicit approval, and removes conservative env-var bypass logic. Ran core task CLI tests, lint, and package builds.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T15:31:48.013Z, excerpt_hash=sha256:b8b92cadde6cc09ed1f112a24d96deb378faed644b5c881c1b4966cb7b2d98d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert this task commit and rerun set-status tests to restore previous behavior.

## Context

T1 introduced centralized approval checks and T2 added execution-driven escalation. task set-status still has bespoke AGENTPLANE_EXECUTION_FORCE_OK blocking logic and must be migrated.

## Notes

### Decisions
Use centralized approval helper instead of command-local env toggles.
