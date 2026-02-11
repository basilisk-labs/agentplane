---
id: "202602112051-V77CPV"
title: "Align agentplane dependency on @agentplaneorg/core release version"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
  - "npm"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing dependency version parity in published package."
events:
  -
    type: "status"
    at: "2026-02-11T20:52:39.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing dependency version parity in published package."
doc_version: 2
doc_updated_at: "2026-02-11T20:52:39.904Z"
doc_updated_by: "CODER"
description: "Fix version drift where packages/agentplane pins @agentplaneorg/core older than current release; enforce parity for published installs."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bun run --filter=agentplane build
Expected: build succeeds.
2) bun run --filter=agentplane test packages/agentplane/src/commands/release/apply.test.ts
Expected: all tests pass.
3) cat packages/agentplane/package.json | rg "@agentplaneorg/core"
Expected: pinned to current release version.
