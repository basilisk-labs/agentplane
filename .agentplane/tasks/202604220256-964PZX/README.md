---
id: "202604220256-964PZX"
title: "Extract workflow transition ports to break task shared cycles"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604220256-YQQDSQ"
tags:
  - "architecture"
  - "deps"
  - "tasks"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:10.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T08:41:35.663Z"
  updated_by: "CODER"
  note: "Verified: extracted pure task transition rules into a dependency-inverted port, reduced dep-cruiser no-circular known baseline from 6 to 3, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect task shared transition cycles, extract stable ports, and lower dep-cruiser known baseline without changing lifecycle behavior."
events:
  -
    type: "status"
    at: "2026-04-22T08:30:19.795Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect task shared transition cycles, extract stable ports, and lower dep-cruiser known baseline without changing lifecycle behavior."
  -
    type: "verify"
    at: "2026-04-22T08:41:35.663Z"
    author: "CODER"
    state: "ok"
    note: "Verified: extracted pure task transition rules into a dependency-inverted port, reduced dep-cruiser no-circular known baseline from 6 to 3, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T08:41:35.670Z"
doc_updated_by: "CODER"
description: "Break dependency cycles around commands/task/shared transitions and workflow-transition-service by extracting stable types/ports."
sections:
  Summary: "Reduce known dep-cruiser cycles in task shared transition code without changing transition behavior."
  Scope: "Task shared transition modules and their imports. No lifecycle semantics change."
  Plan: |-
    1. Inspect known cycles involving task shared transition modules.
    2. Extract type-only ports or dependency-inverted interfaces.
    3. Rewire modules to depend inward on ports.
    4. Lower dep-cruiser known baseline if cycles are removed.
  Verify Steps: "Run arch:baseline && arch:deps, task lifecycle tests, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T08:41:35.663Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: extracted pure task transition rules into a dependency-inverted port, reduced dep-cruiser no-circular known baseline from 6 to 3, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:30:19.803Z, excerpt_hash=sha256:6e1da35e42d88fbf00da6d76fa12151c629cf84072e102576604a04a81516faf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous imports and dep-cruiser baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce known dep-cruiser cycles in task shared transition code without changing transition behavior.

## Scope

Task shared transition modules and their imports. No lifecycle semantics change.

## Plan

1. Inspect known cycles involving task shared transition modules.
2. Extract type-only ports or dependency-inverted interfaces.
3. Rewire modules to depend inward on ports.
4. Lower dep-cruiser known baseline if cycles are removed.

## Verify Steps

Run arch:baseline && arch:deps, task lifecycle tests, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T08:41:35.663Z — VERIFY — ok

By: CODER

Note: Verified: extracted pure task transition rules into a dependency-inverted port, reduced dep-cruiser no-circular known baseline from 6 to 3, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:30:19.803Z, excerpt_hash=sha256:6e1da35e42d88fbf00da6d76fa12151c629cf84072e102576604a04a81516faf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous imports and dep-cruiser baseline.

## Findings

None yet.
