---
id: "202602081548-A43H23"
title: "Finish metadata: persist result_summary/risk_level/breaking in task README"
result_summary: "Persist finish metadata fields in task README frontmatter"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "code"
  - "tasks"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:48:45.881Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T15:55:47.889Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run test:full. Finish metadata now round-trips via TaskStore/frontmatter conversion and is asserted by lifecycle regression tests."
commit:
  hash: "2fec66eb2e3ce320d4ea5269176c2a8688fef14c"
  message: "✨ A43H23 tasks: persist finish metadata in frontmatter"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: fix TaskStore and TaskRecord conversions so finish metadata (result_summary/risk_level/breaking) persists in frontmatter and round-trips."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:full; TaskStore/frontmatter mapping now includes result_summary/risk_level/breaking and TaskRecord parsing round-trips them; added lifecycle regression coverage."
events:
  -
    type: "verify"
    at: "2026-02-08T15:55:47.889Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: bun run test:full. Finish metadata now round-trips via TaskStore/frontmatter conversion and is asserted by lifecycle regression tests."
  -
    type: "status"
    at: "2026-02-08T15:55:54.324Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run test:full; TaskStore/frontmatter mapping now includes result_summary/risk_level/breaking and TaskRecord parsing round-trips them; added lifecycle regression coverage."
doc_version: 2
doc_updated_at: "2026-02-08T15:55:54.324Z"
doc_updated_by: "ORCHESTRATOR"
description: "Fix TaskStore and TaskRecord mapping so finish metadata fields are persisted in frontmatter and available to commit --close builder."
id_source: "generated"
---
## Summary


## Scope


## Plan

Update TaskStore frontmatter mapping and TaskRecord parsing to include result_summary/risk_level/breaking; add regression tests; run full suite.

## Risks

- Risk of breaking backwards compatibility with existing task README frontmatter.
- Risk of inconsistent ordering or missing defaults across backends.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T15:55:47.889Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run test:full. Finish metadata now round-trips via TaskStore/frontmatter conversion and is asserted by lifecycle regression tests.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:48:50.543Z, excerpt_hash=sha256:8e8ca9edb555c57bb0777a28ea7245f99c73b48e8af9ab96bbcdce7e8cc48481

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope
- Ensure finish metadata is persisted and round-trips through parsing.

### Checks
- bun run typecheck
- bun run lint
- bun run test:full

### Pass criteria
- All checks pass.
- New regression tests prove persistence of result_summary/risk_level/breaking.
