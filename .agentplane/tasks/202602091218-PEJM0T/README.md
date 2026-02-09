---
id: "202602091218-PEJM0T"
title: "upgrade: introduce framework manifest and strict allowlist"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
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
  updated_at: "2026-02-09T12:27:27.144Z"
  updated_by: "CODER"
  note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Define framework.manifest.json in package assets and implement strict manifest-based file selection for upgrade; no directory scans."
events:
  -
    type: "status"
    at: "2026-02-09T12:19:57.181Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Define framework.manifest.json in package assets and implement strict manifest-based file selection for upgrade; no directory scans."
  -
    type: "verify"
    at: "2026-02-09T12:27:27.144Z"
    author: "CODER"
    state: "ok"
    note: "bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade"
doc_version: 2
doc_updated_at: "2026-02-09T12:27:27.147Z"
doc_updated_by: "CODER"
description: "Add a framework.manifest.json defining the exact set of framework-managed files and merge strategies; upgrade applies only manifest paths."
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
#### 2026-02-09T12:27:27.144Z — VERIFY — ok

By: CODER

Note: bun run lint; bunx vitest run packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t upgrade

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T12:19:57.181Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
