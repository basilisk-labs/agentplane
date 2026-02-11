---
id: "202602101258-TQQPV5"
title: "T14: Remove duplication of config.schema.json"
result_summary: "Added schema sync/check to prevent config.schema.json drift"
risk_level: "low"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on:
  - "202602101258-D78DYX"
tags:
  - "code"
  - "schemas"
  - "tooling"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:57:05.816Z"
  updated_by: "CODER"
  note: "lint OK; schemas:check OK; config schema dedupe enforced via canonical packages/spec and sync/check script"
commit:
  hash: "fe9b7cffda928bcbc492952f88cbbc2b6d3e5534"
  message: "🚧 TQQPV5 schemas: enforce config.schema.json sync"
comments:
  -
    author: "CODER"
    body: "Start: dedupe config.schema.json by making packages/spec canonical and adding a sync/check script for packages/core."
  -
    author: "CODER"
    body: "Verified: packages/spec is canonical for config.schema.json and divergence is enforced via scripts/sync-schemas.mjs; lint and schemas:check pass."
events:
  -
    type: "status"
    at: "2026-02-10T14:54:19.018Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: dedupe config.schema.json by making packages/spec canonical and adding a sync/check script for packages/core."
  -
    type: "verify"
    at: "2026-02-10T14:57:05.816Z"
    author: "CODER"
    state: "ok"
    note: "lint OK; schemas:check OK; config schema dedupe enforced via canonical packages/spec and sync/check script"
  -
    type: "status"
    at: "2026-02-10T14:58:10.080Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: packages/spec is canonical for config.schema.json and divergence is enforced via scripts/sync-schemas.mjs; lint and schemas:check pass."
doc_version: 2
doc_updated_at: "2026-02-10T14:58:10.080Z"
doc_updated_by: "CODER"
description: "Choose canonical schema source and add sync script + CI check/test to prevent drift."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- Config schema source of truth and sync/check between packages/spec and packages/core.\n\n### Checks\n- Lint\n- Schema sync check script passes\n\n### Evidence / Commands\n- bun run lint\n- bun run schemas:check\n\n### Pass criteria\n- Only one canonical config schema source is edited directly.\n- Check fails if packages/core schema diverges from packages/spec schema.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:57:05.816Z — VERIFY — ok

By: CODER

Note: lint OK; schemas:check OK; config schema dedupe enforced via canonical packages/spec and sync/check script

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:54:19.018Z, excerpt_hash=sha256:ec1ab57c9aca65da083684e7bd7a1b8773552ac4ef0a94eca419e10c1da4131b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
