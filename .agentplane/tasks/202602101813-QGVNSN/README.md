---
id: "202602101813-QGVNSN"
title: "Policy/UX: make '1 task = 1 commit' ergonomic with finish/commit flow"
result_summary: "finish now persists final commit hash in task README within the same commit"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101802-XT4G13"
tags:
  - "workflow"
  - "git"
  - "cli"
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
commit:
  hash: "5f5f65e45f86259db02f0744788f58fd4704a9a9"
  message: "🛠 QGVNSN cli: refresh finish commit metadata in same commit"
comments:
  -
    author: "CODER"
    body: "Start: Implement finish commit-from-comment flow so task commit metadata can be finalized without manual extra steps."
  -
    author: "CODER"
    body: "Verified: implemented one-task-one-commit fix so finish refreshes commit metadata after commitFromComment and amends README into the same commit in local backend mode. Verified with focused unit tests, lint, test:fast, and required package builds."
events:
  -
    type: "status"
    at: "2026-02-11T04:28:18.493Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement finish commit-from-comment flow so task commit metadata can be finalized without manual extra steps."
  -
    type: "status"
    at: "2026-02-11T04:34:57.278Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: implemented one-task-one-commit fix so finish refreshes commit metadata after commitFromComment and amends README into the same commit in local backend mode. Verified with focused unit tests, lint, test:fast, and required package builds."
doc_version: 2
doc_updated_at: "2026-02-11T04:34:57.278Z"
doc_updated_by: "CODER"
description: "Design and implement a workflow where completing a task does not require a second 'close' commit solely to record README metadata. Prefer a single commit that includes both code changes and final task README updates, or a deterministic close commit integrated into the implementation commit flow."
id_source: "generated"
---
## Summary


## Scope

In-scope: packages/agentplane/src/commands/task/finish.ts, packages/agentplane/src/commands/shared/git-context.ts, related unit tests.

## Plan


## Risks

Risk: amend triggers hooks and may increase finish latency; mitigation: keep amend scoped to local backend and stage only task README.

## Verify Steps

- Run targeted tests: `bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/git-context.test.ts`.
- Run regression: `bunx vitest run packages/agentplane/src/commands/workflow.test.ts`.
- Build packages before commit: `bun run --filter=@agentplaneorg/core build` and `bun run --filter=agentplane build`.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore previous finish behavior and remove amend step.

## Context

Current flow writes DONE metadata before creating a finish commit, so README stores stale commit hash and users need an extra close commit. This task aligns finish behavior with the one-task-one-commit expectation.
