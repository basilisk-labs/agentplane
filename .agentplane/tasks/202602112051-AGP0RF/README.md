---
id: "202602112051-AGP0RF"
title: "Add schemas/agents sync checks to publish workflow"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602112051-0VZMVY"
tags:
  - "code"
  - "release"
  - "ci"
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
    body: "Start: Updating publish workflow with schema/agent drift checks before npm publish."
events:
  -
    type: "status"
    at: "2026-02-11T20:56:43.544Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Updating publish workflow with schema/agent drift checks before npm publish."
doc_version: 2
doc_updated_at: "2026-02-11T20:56:43.544Z"
doc_updated_by: "CODER"
description: "Add defense-in-depth checks in publish workflow so tag builds fail before npm publish when schema/agent templates drift."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bun run schemas:check
Expected: pass.
2) bun run agents:check
Expected: pass.
3) bunx vitest run packages/agentplane/src/commands/release/apply.test.ts
Expected: pass.
