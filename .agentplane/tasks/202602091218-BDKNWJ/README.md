---
id: "202602091218-BDKNWJ"
title: "upgrade: safety invariants and tests (never touch tasks)"
result_summary: "Safety regression test: upgrade never writes tasks"
status: "DONE"
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
commit:
  hash: "aaa8bf0aff0640b281c2e46884c5f6da75cc58b1"
  message: "✅ BDKNWJ tests: upgrade never touches tasks"
comments:
  -
    author: "TESTER"
    body: "Start: Add safety regression tests proving upgrade never writes user-owned paths (e.g. .agentplane/tasks/**) even when upstream bundles include them."
  -
    author: "TESTER"
    body: "Verified: bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.safety.test.ts; ensures .agentplane/tasks/** is never modified by upgrade even if present in upstream bundle."
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
  -
    type: "status"
    at: "2026-02-09T14:25:12.234Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.safety.test.ts; ensures .agentplane/tasks/** is never modified by upgrade even if present in upstream bundle."
doc_version: 2
doc_updated_at: "2026-02-09T14:25:12.234Z"
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
