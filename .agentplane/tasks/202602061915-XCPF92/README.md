---
id: "202602061915-XCPF92"
title: "FIX2.md: контекст команд, policy, коммиты, распил"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "workflow"
  - "git"
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T20:36:00.372Z"
  updated_by: "USER"
  note: "Approved by user in chat on 2026-02-06."
verification:
  state: "ok"
  updated_at: "2026-02-06T20:36:11.296Z"
  updated_by: "TESTER"
  note: "Verified locally on 2026-02-06: FIX2.md work completed via subtasks; bun run lint, bun run test:core, bun run test:agentplane, and bun run test:cli are green."
commit:
  hash: "c8d553f5c49aff674b71db71f96d5d9c352bb2c4"
  message: "✅ D3QVVY close: record verification and closure"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Execute FIX2.md implementation as a tracked set of dependent tasks (context caching, policy unification, commit format, dedupe, and refactors) with verification via lint and tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Completed all FIX2.md scoped changes via tasks RNTNEP/FY8TYM/DZBAW0/DH1CKG/FXTNQ0/KNHP1Y/D3QVVY; repo is green on bun run lint, bun run test:core, bun run test:agentplane, and bun run test:cli."
  -
    author: "ORCHESTRATOR"
    body: "Note: Exported .agentplane/tasks.json snapshot after completing FIX2.md work."
doc_version: 2
doc_updated_at: "2026-02-06T20:38:23.739Z"
doc_updated_by: "ORCHESTRATOR"
description: "Реализовать пункты из FIX2.md: убрать повторные resolve/load в командах, унифицировать guard/hooks policy, стандартизовать commit message (без обратной совместимости), дедуп утилит и распил монолитов."
id_source: "generated"
---
## Summary


## Scope


## Plan

Work breakdown:
- 202602061915-RNTNEP (DONE): CommandContext + loadBackendTask context.
- 202602061915-FY8TYM (DONE): start/block/finish use CommandContext, avoid repeated backend loads.
- 202602061915-DZBAW0 (DONE): unify CommitPolicy across guard/hooks and harden allowlist matching.
- 202602061915-DH1CKG (DONE): new commit subject template + structured bodies, no backward-compat.
- 202602061915-FXTNQ0 (DONE): dedupe recipes.ts helpers via shared modules.
- 202602061915-KNHP1Y (DONE): split scenario command, colon-safe git log parsing, reduce duplicated utils.
- 202602061915-D3QVVY (DONE): tests for CommandContext + commit body generation.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T20:36:11.296Z — VERIFY — ok

By: TESTER

Note: Verified locally on 2026-02-06: FIX2.md work completed via subtasks; bun run lint, bun run test:core, bun run test:agentplane, and bun run test:cli are green.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
