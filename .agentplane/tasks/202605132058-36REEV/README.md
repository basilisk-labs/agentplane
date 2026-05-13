---
id: "202605132058-36REEV"
title: "Split PR metadata helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-05-13T20:59:53.073Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
