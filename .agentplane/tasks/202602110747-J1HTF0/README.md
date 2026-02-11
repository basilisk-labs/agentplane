---
id: "202602110747-J1HTF0"
title: "Init: always add runtime .agentplane ignores"
result_summary: "Init now writes runtime .agentplane ignore entries by default"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "gitignore"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T07:50:43.369Z"
  updated_by: "TESTER"
  note: "Verified init now writes runtime .agentplane ignores by default; init gitignore tests plus build/lint/test:fast passed."
commit:
  hash: "c0a37496f3f3498ec6e82312bb51cb366920a745"
  message: "✅ J1HTF0 init: add runtime .agentplane paths to gitignore"
comments:
  -
    author: "CODER"
    body: "Start: ensure init writes runtime .agentplane ignore entries by default."
  -
    author: "CODER"
    body: "Verified: init now ensures runtime .agentplane paths are ignored, with optional agent prompt ignores under --gitignore-agents."
events:
  -
    type: "status"
    at: "2026-02-11T07:48:11.454Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: ensure init writes runtime .agentplane ignore entries by default."
  -
    type: "verify"
    at: "2026-02-11T07:50:43.369Z"
    author: "TESTER"
    state: "ok"
    note: "Verified init now writes runtime .agentplane ignores by default; init gitignore tests plus build/lint/test:fast passed."
  -
    type: "status"
    at: "2026-02-11T07:50:43.672Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init now ensures runtime .agentplane paths are ignored, with optional agent prompt ignores under --gitignore-agents."
doc_version: 2
doc_updated_at: "2026-02-11T07:50:43.672Z"
doc_updated_by: "CODER"
description: "Ensure  writes gitignore entries for runtime/transient .agentplane directories (.upgrade/.release/cache/recipes-cache/worktrees/legacy upgrade) so clean repos do not track operation artifacts."
id_source: "generated"
---
## Summary

Make init write .gitignore entries for runtime .agentplane artifacts so clean repositories do not track transient operational files.

## Scope

In scope: init gitignore writer and init tests. Out of scope: changing upgrade cleanup behavior itself.

## Plan

1) Extend init gitignore ensured lines with runtime paths. 2) Keep --gitignore-agents behavior for AGENTS.md and .agentplane/agents. 3) Update init tests to assert runtime entries.

## Risks

Risk: over-ignoring files users may want tracked. Mitigation: only add known transient/runtime paths already recommended in framework repo .gitignore.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T07:50:43.369Z — VERIFY — ok

By: TESTER

Note: Verified init now writes runtime .agentplane ignores by default; init gitignore tests plus build/lint/test:fast passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T07:48:11.454Z, excerpt_hash=sha256:c8a2900bd566f82d3bba86004a5fecd3f0d645ed671e31c29940f1df423bdb0c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert task commit to restore previous init gitignore behavior.

## Verify Steps

- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build
- bun run lint
- bunx vitest run packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
- bun run test:fast
