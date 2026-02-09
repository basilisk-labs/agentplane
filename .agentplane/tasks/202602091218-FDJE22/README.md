---
id: "202602091218-FDJE22"
title: "upgrade: local framework source (npm-installed) by default"
result_summary: "Upgrade uses local package assets by default"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "upgrade"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T12:35:14.920Z"
  updated_by: "CODER"
  note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade"
commit:
  hash: "93d9e710896b47fd06562d707a48593a48f1bafd"
  message: "✅ FDJE22 upgrade: default to local framework assets"
comments:
  -
    author: "CODER"
    body: "Start: Change upgrade default upstream source to the locally installed framework snapshot (package assets), avoiding network by default; keep remote GitHub upgrade behind explicit opt-in."
  -
    author: "CODER"
    body: "Verified: bun run lint; targeted vitest upgrade suites. Added --remote flag; without it, upgrade reads framework templates from locally installed agentplane assets (no network). Remote hint flags now require --remote."
events:
  -
    type: "status"
    at: "2026-02-09T12:30:27.284Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Change upgrade default upstream source to the locally installed framework snapshot (package assets), avoiding network by default; keep remote GitHub upgrade behind explicit opt-in."
  -
    type: "verify"
    at: "2026-02-09T12:35:14.920Z"
    author: "CODER"
    state: "ok"
    note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade"
  -
    type: "status"
    at: "2026-02-09T12:36:45.905Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint; targeted vitest upgrade suites. Added --remote flag; without it, upgrade reads framework templates from locally installed agentplane assets (no network). Remote hint flags now require --remote."
doc_version: 2
doc_updated_at: "2026-02-09T12:36:45.905Z"
doc_updated_by: "CODER"
description: "Change upgrade to use locally installed package assets as the default upstream source (no network). Keep remote upgrade as an explicit opt-in."
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
#### 2026-02-09T12:35:14.920Z — VERIFY — ok

By: CODER

Note: bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T12:30:27.284Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
