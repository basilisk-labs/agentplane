---
id: "202602091218-BDKNWJ"
title: "upgrade: safety invariants and tests (never touch tasks)"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "upgrade"
  - "safety"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T14:22:38.894Z"
  updated_by: "TESTER"
  note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.safety.test.ts"
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Add safety regression tests proving upgrade never writes user-owned paths (e.g. .agentplane/tasks/**) even when upstream bundles include them."
events:
  -
    type: "status"
    at: "2026-02-09T14:21:37.043Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add safety regression tests proving upgrade never writes user-owned paths (e.g. .agentplane/tasks/**) even when upstream bundles include them."
  -
    type: "verify"
    at: "2026-02-09T14:22:38.894Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.safety.test.ts"
doc_version: 2
doc_updated_at: "2026-02-09T14:22:38.898Z"
doc_updated_by: "TESTER"
description: "Add denylist enforcement for .agentplane/tasks/** and .git/**; add tests that prove upgrade never writes user-owned data, even when upstream contains it."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T14:22:38.894Z — VERIFY — ok

By: TESTER

Note: bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.safety.test.ts

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T14:21:37.043Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
