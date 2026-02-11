---
id: "202602112051-0VZMVY"
title: "Add schemas/agents sync checks to GitHub CI"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602112051-V77CPV"
tags:
  - "code"
  - "ci"
  - "quality"
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
    body: "Start: Updating GitHub CI to include schema/agent drift checks and formatting gate."
events:
  -
    type: "status"
    at: "2026-02-11T20:55:14.141Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Updating GitHub CI to include schema/agent drift checks and formatting gate."
doc_version: 2
doc_updated_at: "2026-02-11T20:55:14.141Z"
doc_updated_by: "CODER"
description: "Ensure pull requests fail early when packages/spec schemas or assets/agents drift from repo runtime copies."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bun run format:check
Expected: pass.
2) bun run schemas:check
Expected: pass.
3) bun run agents:check
Expected: pass.
4) bun run test:critical
Expected: pass.
