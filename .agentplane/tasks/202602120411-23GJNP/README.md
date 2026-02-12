---
id: "202602120411-23GJNP"
title: "Config/schema: primary tag model + workflow-mode status defaults"
result_summary: "Config/schema now supports primary-tag policy and workflow-mode status defaults"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "config"
  - "policy"
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
  hash: "28d1ab93d2bf312e425d32770f8c1af7de626396"
  message: "🛠️ 23GJNP config: add primary-tag schema and workflow status defaults"
comments:
  -
    author: "CODER"
    body: "Start: Adding config/schema support for primary-tag policy and workflow-mode status-commit defaults."
  -
    author: "CODER"
    body: "Verified: schemas:check, config tests, and init tests pass with new tasks.tags/verify fields and direct/branch_pr status defaults."
events:
  -
    type: "status"
    at: "2026-02-12T04:12:08.461Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding config/schema support for primary-tag policy and workflow-mode status-commit defaults."
  -
    type: "status"
    at: "2026-02-12T04:14:45.505Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: schemas:check, config tests, and init tests pass with new tasks.tags/verify fields and direct/branch_pr status defaults."
doc_version: 2
doc_updated_at: "2026-02-12T04:14:45.505Z"
doc_updated_by: "CODER"
description: "Add config fields for primary tag allowlist/strict fallback and verify-by-primary; set init defaults: direct=warn, branch_pr=confirm with finish_auto_status_commit true."
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
Expected: schema sync check passes.
2) bunx vitest run packages/core/src/config/config.test.ts
Expected: config defaults/validation tests pass with new fields.
3) bunx vitest run packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
Expected: init tests pass with workflow-mode status defaults.
