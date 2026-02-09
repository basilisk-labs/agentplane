---
id: "202602091218-T4JSEV"
title: "upgrade: .agentplane/.upgrade state, baseline, and lock"
status: "DOING"
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
  updated_at: "2026-02-09T14:18:59.780Z"
  updated_by: "CODER"
  note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement .agentplane/.upgrade state (state.json, baseline snapshots, backups, lock) and migrate from legacy baseline path; ensure upgrade never writes into tasks backend data."
events:
  -
    type: "status"
    at: "2026-02-09T14:16:57.267Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement .agentplane/.upgrade state (state.json, baseline snapshots, backups, lock) and migrate from legacy baseline path; ensure upgrade never writes into tasks backend data."
  -
    type: "verify"
    at: "2026-02-09T14:18:59.780Z"
    author: "CODER"
    state: "ok"
    note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade"
doc_version: 2
doc_updated_at: "2026-02-09T14:18:59.783Z"
doc_updated_by: "CODER"
description: "Add .agentplane/.upgrade (state.json, baseline snapshots, backups, lock) and migrate from legacy baseline path; implement 3-way merges based on baseline."
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
#### 2026-02-09T14:18:59.780Z — VERIFY — ok

By: CODER

Note: bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T14:16:57.267Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
