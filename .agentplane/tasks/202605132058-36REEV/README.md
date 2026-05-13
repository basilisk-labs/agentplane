---
id: "202605132058-36REEV"
title: "Split PR metadata helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T20:59:11.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T21:10:56.978Z"
  updated_by: "CODER"
  note: "Verified: pr-meta focused tests passed (16 tests); typecheck passed; hotspot threshold check passed with existing warning-only debt; Prettier matched files passed; policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Refactor approved PR metadata helper scope in the dedicated branch_pr worktree, preserving the existing public facade and running the declared focused tests."
events:
  -
    type: "status"
    at: "2026-05-13T20:59:53.073Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor approved PR metadata helper scope in the dedicated branch_pr worktree, preserving the existing public facade and running the declared focused tests."
  -
    type: "verify"
    at: "2026-05-13T21:10:56.978Z"
    author: "CODER"
    state: "ok"
    note: "Verified: pr-meta focused tests passed (16 tests); typecheck passed; hotspot threshold check passed with existing warning-only debt; Prettier matched files passed; policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-13T21:10:56.989Z"
doc_updated_by: "CODER"
description: "Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior."
sections:
  Summary: |-
    Split PR metadata helpers
    
    Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior.
  Scope: |-
    - In scope: Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior.
    - Out of scope: unrelated refactors not required for "Split PR metadata helpers".
  Plan: "1. Keep packages/agentplane/src/commands/shared/pr-meta.ts as the public compatibility facade. 2. Extract PR artifact lifecycle helpers, metadata builders/parsers, and verify shell/log helpers into focused modules under packages/agentplane/src/commands/shared/pr-meta/. 3. Preserve all existing public exports and behavior for downstream imports. 4. Run the focused pr-meta tests plus typecheck/hotspot checks relevant to this refactor."
  Verify Steps: |-
    - Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/pr-meta.test.ts
      Expected: pass; covers public PR metadata facade behavior after module split.
    - Command: bun run typecheck
      Expected: pass; covers TypeScript export/import compatibility across downstream callers.
    - Command: node scripts/hotspot-report.mjs --check
      Expected: pass; confirms the refactor does not introduce oversized runtime/test modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T21:10:56.978Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: pr-meta focused tests passed (16 tests); typecheck passed; hotspot threshold check passed with existing warning-only debt; Prettier matched files passed; policy routing passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:59:53.073Z, excerpt_hash=sha256:3b90158af095b5d43c514bd5aa45a50817d2db347520eb11f5aa22eafb035573
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132058-36REEV-split-pr-meta/.agentplane/tasks/202605132058-36REEV/blueprint/resolved-snapshot.json
    - old_digest: f32027a92b193786f2304c016a72f578a9dee6c8c7cdb601aa55e5eedcbcb949
    - current_digest: f32027a92b193786f2304c016a72f578a9dee6c8c7cdb601aa55e5eedcbcb949
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132058-36REEV
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split PR metadata helpers

Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior.

## Scope

- In scope: Refactor the shared branch_pr PR metadata helper into smaller compatibility-preserving modules without changing public imports or behavior.
- Out of scope: unrelated refactors not required for "Split PR metadata helpers".

## Plan

1. Keep packages/agentplane/src/commands/shared/pr-meta.ts as the public compatibility facade. 2. Extract PR artifact lifecycle helpers, metadata builders/parsers, and verify shell/log helpers into focused modules under packages/agentplane/src/commands/shared/pr-meta/. 3. Preserve all existing public exports and behavior for downstream imports. 4. Run the focused pr-meta tests plus typecheck/hotspot checks relevant to this refactor.

## Verify Steps

- Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/pr-meta.test.ts
  Expected: pass; covers public PR metadata facade behavior after module split.
- Command: bun run typecheck
  Expected: pass; covers TypeScript export/import compatibility across downstream callers.
- Command: node scripts/hotspot-report.mjs --check
  Expected: pass; confirms the refactor does not introduce oversized runtime/test modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T21:10:56.978Z — VERIFY — ok

By: CODER

Note: Verified: pr-meta focused tests passed (16 tests); typecheck passed; hotspot threshold check passed with existing warning-only debt; Prettier matched files passed; policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:59:53.073Z, excerpt_hash=sha256:3b90158af095b5d43c514bd5aa45a50817d2db347520eb11f5aa22eafb035573

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132058-36REEV-split-pr-meta/.agentplane/tasks/202605132058-36REEV/blueprint/resolved-snapshot.json
- old_digest: f32027a92b193786f2304c016a72f578a9dee6c8c7cdb601aa55e5eedcbcb949
- current_digest: f32027a92b193786f2304c016a72f578a9dee6c8c7cdb601aa55e5eedcbcb949
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132058-36REEV

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
