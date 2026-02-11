---
id: "202602101529-95KJE8"
title: "CI: fix coverage timeouts in slow tests"
result_summary: "Coverage runs are stable (timeouts mitigated) and exclude thin *.command.ts entrypoints; symlink safety tests cover internal/external targets"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "testing"
  - "ci"
  - "vitest"
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
  hash: "7742ebfa5eea95c6a65025fe8b05ef2595f0b178"
  message: "✅ 95KJE8 ci: stabilize coverage runs"
comments:
  -
    author: "CODER"
    body: "Start: raise per-test timeouts so coverage runs are stable"
  -
    author: "CODER"
    body: "Verified: bun run ci (format:check, typecheck, lint, coverage); bun run release:check"
events:
  -
    type: "status"
    at: "2026-02-10T15:29:42.166Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: raise per-test timeouts so coverage runs are stable"
  -
    type: "status"
    at: "2026-02-10T15:43:18.669Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run ci (format:check, typecheck, lint, coverage); bun run release:check"
doc_version: 2
doc_updated_at: "2026-02-10T15:43:18.669Z"
doc_updated_by: "CODER"
description: "bun run ci fails under coverage due to 5s vitest timeout in upgrade.agent-mode and exit-code.contract; raise per-test timeout to be robust."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

### Scope
- `packages/agentplane/src/commands/upgrade.agent-mode.test.ts`
- `packages/agentplane/src/cli/exit-code.contract.test.ts`

### Checks
- `bun run ci`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`

### Pass criteria
- `bun run ci` exits 0 (including coverage).
- No change in test semantics beyond higher timeout tolerance.
