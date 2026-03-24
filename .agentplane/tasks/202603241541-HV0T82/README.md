---
id: "202603241541-HV0T82"
title: "Add task runner context budget and compaction"
result_summary: "Runner task context is now bounded and explicit: long histories are compacted deterministically, recent evidence is preserved, and truncation metadata is surfaced in the bundle."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T15:51:27.279Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T15:59:16.525Z"
  updated_by: "CODER"
  note: "Verified: task context assembly now compacts long README/comments/events history deterministically, surfaces compaction metadata in the runner bundle, and the focused vitest slice plus agentplane build passed."
commit:
  hash: "325910e89a8a1c2052de1685a9678a13e50b136d"
  message: "✅ HV0T82 code: done"
comments:
  -
    author: "CODER"
    body: "Start: add deterministic task-context budgets and explicit truncation metadata so runner bundles stop shipping unbounded README, comments, and events history."
  -
    author: "CODER"
    body: "Verified: runner task context now applies deterministic budgets to README, sections, comments, and events, and the bundle exposes explicit compaction metadata instead of shipping unbounded history."
events:
  -
    type: "status"
    at: "2026-03-24T15:52:14.295Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add deterministic task-context budgets and explicit truncation metadata so runner bundles stop shipping unbounded README, comments, and events history."
  -
    type: "verify"
    at: "2026-03-24T15:59:16.525Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task context assembly now compacts long README/comments/events history deterministically, surfaces compaction metadata in the runner bundle, and the focused vitest slice plus agentplane build passed."
  -
    type: "status"
    at: "2026-03-24T15:59:36.834Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: runner task context now applies deterministic budgets to README, sections, comments, and events, and the bundle exposes explicit compaction metadata instead of shipping unbounded history."
doc_version: 3
doc_updated_at: "2026-03-24T15:59:36.835Z"
doc_updated_by: "CODER"
description: "Introduce deterministic budget and compaction for task bundle assembly so runner context stops shipping the full README/comments/events history without limits and exposes truncation metadata explicitly."
sections:
  Summary: |-
    Add task runner context budget and compaction
    
    Introduce deterministic budget and compaction for task bundle assembly so runner context stops shipping the full README/comments/events history without limits and exposes truncation metadata explicitly.
  Scope: |-
    - In scope: Introduce deterministic budget and compaction for task bundle assembly so runner context stops shipping the full README/comments/events history without limits and exposes truncation metadata explicitly.
    - Out of scope: unrelated refactors not required for "Add task runner context budget and compaction".
  Plan: |-
    1. Inspect task context assembly and identify where doc/comments/events currently ship without any size or recency budget.
    2. Add deterministic compaction with explicit metadata so the bundle carries a bounded task view plus truncation signals instead of the full history.
    3. Add runner context regressions and rerun the focused verification slice plus build.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts. Expected: bounded task context and truncation metadata are covered by passing regressions.
    2. Run bun run --filter=agentplane build. Expected: runner/context code still compiles cleanly.
    3. Inspect a prepared runner bundle for a long-history task. Expected: the task payload exposes explicit truncation metadata instead of shipping unbounded README/comments/events history.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T15:59:16.525Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: task context assembly now compacts long README/comments/events history deterministically, surfaces compaction metadata in the runner bundle, and the focused vitest slice plus agentplane build passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T15:52:14.299Z, excerpt_hash=sha256:d5c2d9c6be01c694d704f2d012aebf2984f1a499a076197c709c9d331a4ad253
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add task runner context budget and compaction

Introduce deterministic budget and compaction for task bundle assembly so runner context stops shipping the full README/comments/events history without limits and exposes truncation metadata explicitly.

## Scope

- In scope: Introduce deterministic budget and compaction for task bundle assembly so runner context stops shipping the full README/comments/events history without limits and exposes truncation metadata explicitly.
- Out of scope: unrelated refactors not required for "Add task runner context budget and compaction".

## Plan

1. Inspect task context assembly and identify where doc/comments/events currently ship without any size or recency budget.
2. Add deterministic compaction with explicit metadata so the bundle carries a bounded task view plus truncation signals instead of the full history.
3. Add runner context regressions and rerun the focused verification slice plus build.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts. Expected: bounded task context and truncation metadata are covered by passing regressions.
2. Run bun run --filter=agentplane build. Expected: runner/context code still compiles cleanly.
3. Inspect a prepared runner bundle for a long-history task. Expected: the task payload exposes explicit truncation metadata instead of shipping unbounded README/comments/events history.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T15:59:16.525Z — VERIFY — ok

By: CODER

Note: Verified: task context assembly now compacts long README/comments/events history deterministically, surfaces compaction metadata in the runner bundle, and the focused vitest slice plus agentplane build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T15:52:14.299Z, excerpt_hash=sha256:d5c2d9c6be01c694d704f2d012aebf2984f1a499a076197c709c9d331a4ad253

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
