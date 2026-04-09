---
id: "202604091257-GG6KJG"
title: "Prefer fresh branch PR artifacts in pr check when base snapshot is stale"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T12:58:24.674Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T14:20:05.416Z"
  updated_by: "CODER"
  note: "Rebased onto main after 75VJ4R, fixed Windows formatting drift in pr/check.ts, replaced incompatible vi.hoisted test harness in pr-paths.test.ts, and reran targeted pr-flow/pr-paths coverage."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement fresher branch/worktree PR artifact fallback in pr check and cover stale-local versus fresh-branch regression paths."
events:
  -
    type: "status"
    at: "2026-04-09T13:10:49.338Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement fresher branch/worktree PR artifact fallback in pr check and cover stale-local versus fresh-branch regression paths."
  -
    type: "verify"
    at: "2026-04-09T13:11:41.852Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x eslint packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/internal/pr-paths.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: eslint clean and targeted pr-check vitest passed including stale-local/fresh-branch fallback coverage. Scope: pr check artifact snapshot selection and helper path reads."
  -
    type: "verify"
    at: "2026-04-09T14:20:05.416Z"
    author: "CODER"
    state: "ok"
    note: "Rebased onto main after 75VJ4R, fixed Windows formatting drift in pr/check.ts, replaced incompatible vi.hoisted test harness in pr-paths.test.ts, and reran targeted pr-flow/pr-paths coverage."
doc_version: 3
doc_updated_at: "2026-04-09T14:20:05.421Z"
doc_updated_by: "CODER"
description: "Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state."
sections:
  Summary: |-
    Prefer fresh branch PR artifacts in pr check when base snapshot is stale
    
    Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state.
  Scope: |-
    - In scope: Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state.
    - Out of scope: unrelated refactors not required for "Prefer fresh branch PR artifacts in pr check when base snapshot is stale".
  Plan: "1. Reproduce pr check failure when main has stale local pr artifacts but task branch/worktree has fresher metadata. 2. Teach pr check to compare local and branch-backed artifacts, preferring the freshest consistent snapshot. 3. Add regression coverage for stale-local / fresh-branch validation."
  Verify Steps: |-
    1. Run targeted pr-check regression tests for stale-local versus fresh-branch snapshots. Expected: pr check accepts the fresher branch/worktree artifacts instead of failing on stale local base files.
    2. Run unit coverage for PR artifact path helpers. Expected: branch-backed artifact reads succeed when local task files are missing or outdated.
    3. Run focused lint on changed pr-check files. Expected: the new snapshot-selection flow passes lint without new violations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T13:11:41.852Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x eslint packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/internal/pr-paths.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: eslint clean and targeted pr-check vitest passed including stale-local/fresh-branch fallback coverage. Scope: pr check artifact snapshot selection and helper path reads.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:10:49.362Z, excerpt_hash=sha256:efa806729371604dbecd3259721b6273f5956e1b851d55136c9592d33984ed7a
    
    ### 2026-04-09T14:20:05.416Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased onto main after 75VJ4R, fixed Windows formatting drift in pr/check.ts, replaced incompatible vi.hoisted test harness in pr-paths.test.ts, and reran targeted pr-flow/pr-paths coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:11:41.861Z, excerpt_hash=sha256:efa806729371604dbecd3259721b6273f5956e1b851d55136c9592d33984ed7a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prefer fresh branch PR artifacts in pr check when base snapshot is stale

Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state.

## Scope

- In scope: Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state.
- Out of scope: unrelated refactors not required for "Prefer fresh branch PR artifacts in pr check when base snapshot is stale".

## Plan

1. Reproduce pr check failure when main has stale local pr artifacts but task branch/worktree has fresher metadata. 2. Teach pr check to compare local and branch-backed artifacts, preferring the freshest consistent snapshot. 3. Add regression coverage for stale-local / fresh-branch validation.

## Verify Steps

1. Run targeted pr-check regression tests for stale-local versus fresh-branch snapshots. Expected: pr check accepts the fresher branch/worktree artifacts instead of failing on stale local base files.
2. Run unit coverage for PR artifact path helpers. Expected: branch-backed artifact reads succeed when local task files are missing or outdated.
3. Run focused lint on changed pr-check files. Expected: the new snapshot-selection flow passes lint without new violations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T13:11:41.852Z — VERIFY — ok

By: CODER

Note: Command: bun x eslint packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/internal/pr-paths.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: eslint clean and targeted pr-check vitest passed including stale-local/fresh-branch fallback coverage. Scope: pr check artifact snapshot selection and helper path reads.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:10:49.362Z, excerpt_hash=sha256:efa806729371604dbecd3259721b6273f5956e1b851d55136c9592d33984ed7a

### 2026-04-09T14:20:05.416Z — VERIFY — ok

By: CODER

Note: Rebased onto main after 75VJ4R, fixed Windows formatting drift in pr/check.ts, replaced incompatible vi.hoisted test harness in pr-paths.test.ts, and reran targeted pr-flow/pr-paths coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:11:41.861Z, excerpt_hash=sha256:efa806729371604dbecd3259721b6273f5956e1b851d55136c9592d33984ed7a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
